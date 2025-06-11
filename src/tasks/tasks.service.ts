import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class TasksService {
    constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument> // @InjectModel - to inject the Task model
  ) {}

  // Get tasks by user - Finds all tasks where userId = current user
  async getTasks(userId: string) {
    return this.taskModel.find({ userId: new Types.ObjectId(userId) }).exec();
  }

  // Create task - Adds new task in DB
  async createTask(userId: string, text: string) {
    const newTask = new this.taskModel({
      text,
      userId: new Types.ObjectId(userId), // to safely store Mongo ref
      completed: false,
    });
    return newTask.save();
  }

  // Toggle completion - Flips completed value for a given task
  async toggleTask(userId: string, taskId: string) {
    const task = await this.taskModel.findOne({ _id: taskId, userId: new Types.ObjectId(userId) });

    if (!task) {
      return { error: 'Task not found or unauthorized' };
    }

    task.completed = !task.completed;
    return task.save();
  }
}