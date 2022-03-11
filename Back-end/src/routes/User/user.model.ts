import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: string;
  name: string;
  rut: string;
  password: string;
  mail: string;
  permission_level: number;
  encryptPassword(password: string): Promise<string>;
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
  },
  resetToken: {
    type: String,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
});

/**
 * Funcion que se encarga de encriptar la password
 * @param password contraseña del usuario
 * @returns la password del usuario encriptada
 */
 userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compara la password ingresada por el usuario y la valida
 * @param password password del usuario
 * @returns devuelve un true/false de la comparación entre passwords
 */
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);
