import {Router} from 'express';
import * as controlCtrl from './control.controller';

const router = Router();

//agregar nuevo control
router.post('/control');

//modificar control
router.put('/control/:id');

//eliminar control
router.delete('/control/:id');

//obtener lista controles pendientes resumidos por madre(id)
router.get('/control/:id');

//obtener controles pasados resumido por madre(id)
router.get('/control/pasado/:id');

//obtener informacion control pendiente detallada(idControlPasado_)
router.get('/control/:idControl');

// Obtener barra de busqueda, keyword: name, date. 
router.post('/control/:idMother/:keyword/:lower_limit/:upper_limit');

export default router
