import {Router} from 'express';
import * as motherCtrl from './mother.controller';
import { verifyToken } from '../jwt';

const router = Router();

//agregar nueva asesorada 
router.post('/mother',  verifyToken, motherCtrl.newMother);

//modificar una asesorada
router.put('/mother/:id', verifyToken, motherCtrl.editMother);

//eliminar una asesorada
router.delete('/mother/:id', verifyToken, motherCtrl.deleteMother);

//obtener asesorada detallada (panel completo)
router.get('/mother/:id', verifyToken, motherCtrl.getDetailedMother);

//obtener todas las asesoradas
router.get('/mother', verifyToken, motherCtrl.getMothers);

export default router;
