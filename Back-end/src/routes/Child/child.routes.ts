import {Router} from 'express';
import * as childCtrl from './child.controller';

const router = Router();

//agregar nuevo lactante
router.post('/child', );

//modificar Lactante
router.put('/child/:id, ')

//eliminar Lactante
router.delete('/child/:id')

//obtener Lactante
router.get('/child/:id')

//obtener Lista Lactantes
router.get('/child')

export default router