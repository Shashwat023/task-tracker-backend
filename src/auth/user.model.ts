import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document; // Type that represents one document (like a row)

@Schema() // Declares a Mongo schema
export class User {
  @Prop({ required: true, unique: true }) // @Prop - Declares fields (like columns)
  username: string; // Will be unique per user

  @Prop({ required: true })
  password: string; // Stores hashed password (bcrypt)
}

export const UserSchema = SchemaFactory.createForClass(User); // UserSchema -  Used by Nest to inject Mongoose model
