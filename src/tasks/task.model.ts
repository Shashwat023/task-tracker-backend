import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  text: string; // Actual task content

  @Prop({ default: false })
  completed: boolean; // Checkbox: done or not (default: false)

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // With ref: 'User', Nest knows this is a relational field
  userId: Types.ObjectId; // Link to User model (foreign key)
}

export const TaskSchema = SchemaFactory.createForClass(Task);
