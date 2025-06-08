import { Controller, Get, Post, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('tasks')
@UseGuards(AuthGuard('jwt'))

export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Req() req) {
    const userId = req.user.userId;
    return this.tasksService.getTasks(userId);
  }

  @Post()
  createTask(@Req() req, @Body('text') text: string) {
    const userId = req.user.userId;
    return this.tasksService.createTask(userId, text);
  }

  @Patch(':id/toggle')
  toggleTask(@Req() req, @Param('id') taskId: string) {
    const userId = req.user.userId;
    return this.tasksService.toggleTask(userId, taskId);
  }
}
