import {Router} from 'express';
import * as controlCtrl from './control.controller';
import { verifyToken } from '../jwt';

const router = Router();

//agregar nuevo control
router.post('/control', verifyToken, controlCtrl.newControl);

//modificar control
router.put('/control/:idControl', verifyToken, controlCtrl.editControl);

//eliminar control
router.delete('/control/:idControl', verifyToken, controlCtrl.deleteControl);

//obtener lista controles pendientes resumidos por madre(id)
router.get('/control/:idMother', verifyToken, controlCtrl.getNextControls);

//obtener controles pasados resumido por madre(id)
router.get('/control/past/:idMother', verifyToken, controlCtrl.getPassControls);

//obtener informacion control pasado detallado(idControlPasado_)
router.get('/control/profile/:idControl', verifyToken, controlCtrl.getDetailedPassControl);

// Obtener lista controles filtrada por nombre y fechas
router.get('/controlsFiltered', verifyToken, controlCtrl.getSearchControlFiltered);

//Obtener el ultimo y próximo control asociado a una madre
router.get('/control/lastAndNext/:idMother', verifyToken, controlCtrl.getLastAndNextControl);

//Obtener cantidad controles de 1 lactante
router.get('/control/quantity/:idChild',controlCtrl.getFirstControl);

export default router;
