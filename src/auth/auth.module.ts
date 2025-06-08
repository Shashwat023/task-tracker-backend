import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service'; // Contains logic to sign token, validate user
import { AuthController } from './auth.controller'; // Handles HTTP routes like /signup, /login
import { JwtStrategy } from './jwt.strategy'; // Validates token and extracts req.user
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ // Allows us to use jwtService.sign() to generate JWTs
      secret: process.env.JWT_SECRET || 'salesineSecretKey', // Comes from .env file
      signOptions: { expiresIn: '1d' }
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
