import {Router} from 'express';
import * as controlCtrl from './control.controller';

const router = Router();

//agregar nuevo control
router.post('/control', );

//modificar control
router.put('/control/:id, ')

//eliminar control
router.delete('/control/:id')

//obtener control
router.get('/control/:id')

//obtener todos los controles
router.get('/control')

export default router