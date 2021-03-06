import {Router} from 'express';
import * as motherCtrl from './mother.controller';

const router = Router();

//agregar nueva asesorada 
router.post('/mother', motherCtrl.newMother);

//modificar una asesorada
router.put('/mother/:id', motherCtrl.editMother);

//eliminar una asesorada
router.delete('/mother/:id', motherCtrl.deleteMother);

//obtener asesorada detallada (panel completo)
router.get('/mother/:id', motherCtrl.getDetailedMother);

//obtener todas las asesoradas
router.get('/mother', motherCtrl.getMothers);

export default router
