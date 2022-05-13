import {Router} from 'express';
import * as graphicCtrl from './graphic.controller';
import { isAdmin , isRol } from "../../middlewares/authRoles";
import passport from 'passport';

const router = Router();

//Obtener objeto con los datos a graficar
router.get('/graphic/:keyword', passport.authenticate('jwt', {session: false, failureRedirect: '/' }), isRol, graphicCtrl.getDataGraphic);

export default router;
