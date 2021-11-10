import {Router} from 'express';
import * as controlCtrl from './control.controller';

const router = Router();

//agregar nuevo control
router.post('/control/:idChild');

//modificar control
router.put('/control/:idControl');

//eliminar control
router.delete('/control/:idControl');

//obtener lista controles pendientes resumidos por madre(id)
router.get('/control/:idMother');

//obtener controles pasados resumido por madre(id)
router.get('/control/pasado/:idMother');

//obtener informacion control pendiente detallada(idControlPasado_)
router.get('/control/:idControl');

// Obtener barra de busqueda, keyword: name, date. 
router.post('/control/:idMother/:keyword/:lower_limit/:upper_limit');

export default router
