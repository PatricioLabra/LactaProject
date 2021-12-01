import {Router} from 'express';
import * as graphicCtrl from './graphic.controller';
import { verifyToken } from '../jwt';

const router = Router();

//Obtener objeto con los datos a graficar
router.get('/graphic/:keyword', verifyToken, graphicCtrl.getDataGraphic);

export default router;
