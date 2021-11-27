import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

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

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export default model('User', userSchema);
