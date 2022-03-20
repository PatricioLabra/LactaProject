import {Router} from 'express';
import * as controlCtrl from './control.controller';
import { isRol } from "../../middlewares/authRoles";
import passport from 'passport';

const router = Router();

//agregar nuevo control
router.post('/control', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, controlCtrl.newControl);

//modificar control
router.put('/control/:idControl', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, controlCtrl.editControl);

//eliminar control
router.delete('/control/:idControl', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, controlCtrl.deleteControl);

//obtener lista controles pendientes resumidos por madre(id)
router.get('/control/:idMother', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, controlCtrl.getNextControls);

//obtener controles pasados resumido por madre(id)
router.get('/control/past/:idMother', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, controlCtrl.getPassControls);

//obtener informacion control pasado detallado(idControlPasado_)
router.get('/control/profile/:idControl', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, controlCtrl.getDetailedPassControl);

// Obtener lista controles filtrada por nombre y fechas
router.get('/controlsFiltered', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, controlCtrl.getSearchControlFiltered);

//Obtener el ultimo y próximo control asociado a una madre
router.get('/control/lastAndNext/:idMother', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, controlCtrl.getLastAndNextControl);

//Obtener cantidad controles de 1 lactante
router.get('/control/quantity/:idChild', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, controlCtrl.getFirstControl);

export default router;
