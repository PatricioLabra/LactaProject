import { Schema, model } from "mongoose";

const userSchema = new Schema({
	rut: {
    required: true,
    type: String,
    trim: true,
    min: 12,
  },
  name: {
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

export default model('User', userSchema);
