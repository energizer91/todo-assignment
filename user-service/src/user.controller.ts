import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response, Request } from 'express';
import { UserRequest } from './types/user-request.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() body, @Res() res: Response) {
    const { email, password } = body;
    const user = await this.userService.register(email, password);
    res.status(201).json(user);
  }

  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    const { email, password } = body;
    const token = await this.userService.login(email, password);
    res.cookie('access_token', token, { httpOnly: true, sameSite: 'strict' });
    res.json({ access_token: token });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.json({ message: 'Logged out successfully' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  async deleteUser(@Req() req: UserRequest, @Res() res: Response) {
    const userId = req.user.id;
    const deletedUser = await this.userService.delete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  }
}
