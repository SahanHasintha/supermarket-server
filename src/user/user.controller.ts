import { Controller, Post, Body, ValidationPipe, HttpStatus, HttpCode, Res, UnauthorizedException, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/create-user.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    console.log("createUserDto", createUserDto);
    return this.userService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body(ValidationPipe) loginDto: LoginDto, @Res({ passthrough: true }) res: Response,) {
    const userData = await this.userService.login(loginDto.email, loginDto.password);
    const { accessToken, refreshToken, ...user } = userData;
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return {
      accessToken,
      user: {
        id: user.user.id,
        email: user.user.email,
      },
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response,) {
    const refreshTokenOld = req.cookies.refreshToken;
    if (!refreshTokenOld) {
      throw new UnauthorizedException('No refresh token provided');
    }
    const userData = await this.userService.refreshToken(refreshTokenOld);
    const { accessToken, refreshToken, ...user } = userData;
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return {
      accessToken,
      user: {
        id: user.user.id,
        email: user.user.email,
      },
    };
  }

}
