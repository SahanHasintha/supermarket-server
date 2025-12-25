import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    /*
      payload is the decoded JWT payload.
      Example:
      {
        sub: "userId",
        email: "test@mail.com",
        role: "admin",
        iat: 123456,
        exp: 123999
      }
    */

    if (!payload) {
      throw new UnauthorizedException();
    }

    // This object will be attached to req.user
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
