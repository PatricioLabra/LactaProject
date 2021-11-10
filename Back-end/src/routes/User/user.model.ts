import { Schema, model } from "mongoose";

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
    min: 12,
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

export default model('User', userSchema);
