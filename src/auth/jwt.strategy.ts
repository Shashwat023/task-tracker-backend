import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; // Ye devDependency hota hai — TypeScript ko samajhne me help karta hai, runtime pe koi kaam nahi.

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'salesineSecretKey',
    });
  }

  async validate(payload: any) {
    // JWT decode hone ke baad yeh data req.user me chala jaata hai
    return { userId: payload.userId };
  }
}
