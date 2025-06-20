import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
    constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async hashPassword(password: string): Promise<string> { // Securely hashes password before saving to DB
    return await bcrypt.hash(password, 10);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> { // Compares input password with hashed one (during login)
    return await bcrypt.compare(password, hash);
  }

  generateToken(userId: string) { // Creates JWT token with payload { userId }
    return this.jwtService.sign({ userId });
  }

  // Signup: Create new user with hashed password
  async signup(username: string, password: string): Promise<string> {
    const existing = await this.userModel.findOne({ username });
    if (existing) throw new Error('User already exists');

    const hash = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({ username, password: hash });

    return this.jwtService.sign({ userId: newUser._id });
  }

  // Login: Validate password and return token
  async login(username: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return this.jwtService.sign({ userId: user._id });
  }
}

/*
Function   	Kaam

signup()	- Checks if username exists
          - Hashes password
          - Saves new user
          - Returns token

login()	- Fetches user by username
        - Compares password
        - Returns token if correct */