import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Task {
  @Prop()
  userId: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
