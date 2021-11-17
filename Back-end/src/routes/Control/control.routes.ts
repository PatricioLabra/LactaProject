import {Router} from 'express';
import * as controlCtrl from './control.controller';

const router = Router();

//agregar nuevo control
router.post('/control', controlCtrl.newControl);

//modificar control
router.put('/control/:idControl', controlCtrl.editControl);

//eliminar control
router.delete('/control/:idControl', controlCtrl.deleteControl);

//obtener lista controles pendientes resumidos por madre(id)
router.get('/control/:idMother', controlCtrl.getNextControls);

//obtener controles pasados resumido por madre(id)
router.get('/control/past/:idMother', controlCtrl.getPassControls);

//obtener informacion control pasado detallado(idControlPasado_)
router.get('/control/profile/:idControl', controlCtrl.getDetailedPassControl);

// Obtener barra de busqueda, keyword: name, date. 
router.post('/control/:idMother/:keyword/:lower_limit/:upper_limit', controlCtrl.getSeach);

//Obtener el ultimo y próximo control asociado a una madre
router.get('/control/lastAndNext/:idMother', controlCtrl.getLastAndNextControl);


export default router;
