import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: any, @Res() res: Response) {
    const { username, password } = body;

    // Hash the password
    const hashedPassword = await this.authService.hashPassword(password);

    // Save user to DB (we’ll add real DB later)
    // For now, simulate success
    const dummyUserId = '123abc';

    // Create JWT token
    const token = this.authService.generateToken(dummyUserId);

    return res.status(HttpStatus.CREATED).json({ token });
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    const { username, password } = body;

    // Dummy logic to validate user (DB check aayega baad me)
    const storedHash = await this.authService.hashPassword(password); // simulate existing hash
    const isValid = await this.authService.validatePassword(password, storedHash);

    if (!isValid) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Invalid credentials' });
    }

    // Token
    const token = this.authService.generateToken('123abc');

    return res.status(HttpStatus.OK).json({ token });
  }
}
