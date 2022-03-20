import {Router} from 'express';
import * as motherCtrl from './mother.controller';
import { isRol } from "../../middlewares/authRoles";
import passport from 'passport';

const router = Router();

//agregar nueva asesorada 
router.post('/mother', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, motherCtrl.newMother);

//modificar una asesorada
router.put('/mother/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, motherCtrl.editMother);

//eliminar una asesorada
router.delete('/mother/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, motherCtrl.deleteMother);

//obtener asesorada detallada (panel completo)
router.get('/mother/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, motherCtrl.getDetailedMother);

//obtener todas las asesoradas
router.get('/mother', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol,  motherCtrl.getMothers);

export default router;
