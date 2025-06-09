import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/taskdb'),
    AuthModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){
    console.log('AppModule');
  }
}
