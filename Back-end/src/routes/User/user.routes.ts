import { Router } from 'express';
import * as userCtrl from './user.controller';

const router = Router();

// Agregar un nuevo usuario
router.post('/user/signup', userCtrl.signUp);

// Obtener la informacion de un usuario
router.get('/user/:id');

// Editar usuario
router.put('/user/:id');

// Eliminar usuario
router.delete('/user/:id');

// Inicia sesión
router.post('/user/signin');

// Obtener barra de busqueda, keyword: name, rut
router.post('/user/:keyword');

// Recuperar password
router.get('/user/:rut');

//Obtener lista usuarios
router.get('/user');

export default router;
