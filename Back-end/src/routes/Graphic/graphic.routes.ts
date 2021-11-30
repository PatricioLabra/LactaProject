import {Router} from 'express';
import * as graphicCtrl from './graphic.controller';

const router = Router();

//Obtener objeto con los datos a graficar
router.get('/graphic/:keyword',graphicCtrl.getDataGraphic);

export default router;
