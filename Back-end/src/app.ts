import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Config variables
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

export default app;