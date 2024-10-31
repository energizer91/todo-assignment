import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { UserRequest } from './types/user-request.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@Req() req: UserRequest) {
    return this.taskService.getTasks(req.user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Req() req: UserRequest, @Body() body) {
    return this.taskService.createTask(
      req.user?.id,
      body.title,
      body.description,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() body) {
    return this.taskService.updateTask(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
