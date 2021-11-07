import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.vtdaa.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

export async function startConnection() {
    try {
      const db = await mongoose.connect(uri);
      console.log('Database is connected');
    } catch (error) {
      console.log(error);
    }
  }
