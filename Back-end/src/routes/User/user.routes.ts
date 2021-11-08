import { Router } from 'express';
import * as userCtrl from './user.controller';

const router = Router();

// Agregar un nuevo usuario
router.post('/admin/signup', userCtrl.signUp);

// Obtener la informacion de un usuario
router.get('/admin/:nick');

// Inicia sesión
router.post('/admin/signin');

export default router;
