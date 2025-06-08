import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';


@Module({
  imports: [AuthModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){
    console.log('AppModule');
  }
}
