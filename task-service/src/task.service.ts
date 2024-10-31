import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(
    userId: string,
    title: string,
    description: string,
  ): Promise<Task> {
    const newTask = new this.taskModel({ userId, title, description });
    return newTask.save();
  }

  async getTasks(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId });
  }

  async updateTask(id: string, updateData): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteTask(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id);
  }
}
