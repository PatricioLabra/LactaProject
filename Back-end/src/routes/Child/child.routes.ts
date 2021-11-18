import {Router} from 'express';
import * as childCtrl from './child.controller';

const router = Router();

//agregar nuevo lactante
router.post('/child/:idMother', childCtrl.newChild);

//modificar Lactantee
router.put('/child/:idLactante', childCtrl.editChild);

//eliminar Lactante en la lista de la madre
router.delete('/child/:idLactante', childCtrl.deleteChild);

//obtener lista Lactante resumido(idMother)
router.get('/child/:idMother', childCtrl.getResumeChild);

//obtener Lactante completo
router.get('/child/profile/:idLactante', childCtrl.getChild);

export default router
