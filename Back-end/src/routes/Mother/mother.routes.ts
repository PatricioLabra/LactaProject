import {Router} from 'express';
import * as motherlCtrl from './mother.controller';

const router = Router();

//agregar nueva asesorada 
router.post('/mother');

//modificar una asesorada
router.put('/mother/:id');

//eliminar una asesorada
router.delete('/mother/:id');

//obtener asesorada
router.get('/mother/:id');

//obtener todas las asesoradas
router.get('/mother');

export default router
