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
  try {
    const token = await this.authService.signup(body.username, body.password);
    return res.status(HttpStatus.CREATED).json({ token });
  } catch (err) {
    return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
  }
}

  @Post('login')
async login(@Body() body: any, @Res() res: Response) {
  try {
    const token = await this.authService.login(body.username, body.password);
    return res.status(HttpStatus.OK).json({ token });
  } catch (err) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ error: err.message });
  }
}
}
