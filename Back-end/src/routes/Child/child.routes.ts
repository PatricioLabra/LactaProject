import {Router} from 'express';
import * as childCtrl from './child.controller';
import { isRol } from "../../middlewares/authRoles";
import passport from 'passport';

const router = Router();

//agregar nuevo lactante
router.post('/child/:idMother', passport.authenticate('jwt', {session: false, failureRedirect: '/' }), isRol, childCtrl.newChild);

//modificar Lactantee
router.put('/child/:idLactante', passport.authenticate('jwt', {session: false, failureRedirect: '/' }), isRol, childCtrl.editChild);

//eliminar Lactante en la lista de la madre
router.delete('/child/:idLactante', passport.authenticate('jwt', {session: false, failureRedirect: '/' }), isRol, childCtrl.deleteChild);

//obtener lista Lactante resumido(idMother)
router.get('/child/:idMother', passport.authenticate('jwt', {session: false, failureRedirect: '/' }), isRol, childCtrl.getResumeChild);

//obtener Lactante completo
router.get('/child/profile/:idLactante', passport.authenticate('jwt', {session: false, failureRedirect: '/' }), isRol, childCtrl.getChild);

export default router
