import { Router } from 'express';
import * as userCtrl from './user.controller';

const router = Router();

// Agregar un nuevo usuario
router.post('/user/signup', userCtrl.signUp);

// Obtener la informacion de un usuario
router.get('/user/_id');

// Editar usuario

router.put('/user/:_id');

// Eliminar usuario

router.delete('/user/:_id');

// Inicia sesión
router.post('/user/signin');

// Obtener barra de busqueda
router.post('/user/:keyword');

export default router;
