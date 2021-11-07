import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ncdk5.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
    .connect(uri)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))