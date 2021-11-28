import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: string;
  name: string;
  rut: string;
  password: string;
  mail: string;
  permission_level: number;
  encrypPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
};

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  rut: {
    required: true,
    type: String,
    trim: true,
  },
  password: {
    required: true,
    type: String,
    trim: true,
  },
  mail: {
    required: true,
    type: String,
    trim: true,
  },
  permission_level: {
      type: Number,
      required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

userSchema.methods.encrypPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);
