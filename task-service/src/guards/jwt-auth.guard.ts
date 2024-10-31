import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['access_token'];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      request.user = this.jwtService.verify(token);
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
