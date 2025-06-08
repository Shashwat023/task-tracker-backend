import { Injectable } from '@nestjs/common';

// TEMP: In-memory DB replacement (use real DB later)
const tasksDB = new Map<string, any[]>(); // userId → tasks[]

@Injectable()
export class TasksService {
  getTasks(userId: string) {
    return tasksDB.get(userId) || [];
  }

  createTask(userId: string, text: string) {
    const task = {
      id: Date.now().toString(), // temp ID
      text,
      completed: false,
    };

    const tasks = tasksDB.get(userId) || [];
    tasks.push(task);
    tasksDB.set(userId, tasks);

    return task;
  }

  toggleTask(userId: string, taskId: string) {
    const tasks = tasksDB.get(userId) || [];
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
    return task || { error: 'Task not found' };
  }
}