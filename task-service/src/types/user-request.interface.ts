import { Request } from 'express';

export interface UserPayload {
  id: string;
  role: string;
}

export interface UserRequest extends Request {
  user?: UserPayload;
}
