import {Router} from 'express';
import * as childCtrl from './child.controller';
import { verifyToken } from '../jwt';

const router = Router();

//agregar nuevo lactante
router.post('/child/:idMother', verifyToken, childCtrl.newChild);

//modificar Lactante
router.put('/child/:idLactante', verifyToken, childCtrl.editChild);

//eliminar Lactante en la lista de la madre
router.delete('/child/:idLactante', verifyToken, childCtrl.deleteChild);

//obtener lista Lactante resumido(idMother)
router.get('/child/:idMother', verifyToken, childCtrl.getResumeChild);

//obtener Lactante completo
router.get('/child/profile/:idLactante', verifyToken, childCtrl.getChild);

export default router
