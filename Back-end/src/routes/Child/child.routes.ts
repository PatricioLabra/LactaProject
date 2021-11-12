import {Router} from 'express';
import * as childCtrl from './child.controller';

const router = Router();

//agregar nuevo lactante
router.post('/child/:idMother');

//modificar Lactante
router.put('/child/:idLactante');

//eliminar Lactante en la lista de la madre
router.delete('/child/:idLactante/:idMother');

//obtener lista Lactante resumido(idMother)
router.get('/child/:idMother');

//obtener Lactante completo
router.get('/child/profile/:idLactante');

export default router
