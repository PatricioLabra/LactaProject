import {Router} from 'express';
import * as motherlCtrl from './profesional.controller';

const router = Router();

//agregar nuevo profesional 
router.post('/profesional');

//modificar un profesional
router.put('/profesional/:id');

//eliminar un profesional
router.delete('/profesional/:id');

//obtener profesional
router.get('/profesional/:id');

//obtener lista profesionales
router.get('/profesional');

export default router
