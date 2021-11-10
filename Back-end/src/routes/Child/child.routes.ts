import {Router} from 'express';
import * as childCtrl from './child.controller';

const router = Router();

//agregar nuevo lactante
router.post('/child');

//modificar Lactante
router.put('/child/:id');

//eliminar Lactante
router.delete('/child/:id');

//obtener Lactante resumido
router.get('/child/:id');

//obtener Lactante completo
router.get('/child/profile/:id');

export default router
