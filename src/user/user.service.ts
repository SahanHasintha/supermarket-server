import { Injectable, ConflictException, BadRequestException, NotFoundException, UnauthorizedException, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { users } from 'src/database/tables';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @Inject('DRIZZLE') private readonly db: NodePgDatabase
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { name, email, password, role } = createUserDto;
    
      // Check if user already exists
      console.log("email ", email);
      const existingUser = await this.db
        .select()
        .from(users)
        .where(eq(users.email, email));
    
        console.log("existingUser ", existingUser);
      if (existingUser.length > 0) {
        throw new ConflictException('User with this email already exists');
      }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
  
      // Insert user
      const user = await this.db
        .insert(users)
        .values({
          name,
          email,
          password: hashedPassword,
          role: role ?? 'CLIENT',
        })
        .returning({
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        })
        .execute();; // <- returns inserted row
  
      return {
        success: true,
        message: 'User registered successfully',
        data: user,
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new BadRequestException('Failed to create user');
    }
  }
  

  async login(email: string, password: string) {
    // Find user using Drizzle
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      accessToken,
      refreshToken,
      user: userWithoutPassword,
    };
  }

  async refreshToken(refreshToken: string) {
    const decoded = await this.jwtService.verifyAsync(refreshToken);
    console.log("decoded ", decoded);
    
    // Find user using Drizzle
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, decoded.sub))
      .limit(1);

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
    
    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      accessToken,
      refreshToken,
      user: userWithoutPassword,
    };
  }
}
