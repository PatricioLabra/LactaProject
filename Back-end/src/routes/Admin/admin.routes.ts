import { Router } from 'express';
import * as adminCtrl from './admin.controller';


const router = Router();

// Agregar un nuevo admin
router.post('/admin/signup',);

// Obtener la informacion de un admin
router.get('/admin/:nick',);

// Inicia sesión
router.post('/admin/signin', );

export default router;