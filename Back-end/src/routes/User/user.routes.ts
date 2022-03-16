import { Router } from 'express';
import * as userCtrl from './user.controller';

const router = Router();

// Agregar un nuevo usuario
router.post('/user/signup', userCtrl.signUp);

// Obtener la informacion de un usuario(Nombre Header)
router.get('/user/:id', userCtrl.getUserName);

// Editar usuario
router.put('/user/:id', userCtrl.editUser);

// Eliminar usuario
router.delete('/user/:id', userCtrl.deleteUser);

// Inicia sesión
router.post('/user/signin', userCtrl.signIn);

//Obtener lista usuarios
router.get('/user', userCtrl.getUsers);

// Recuperar contraseña
router.post('/user/forgotPassword', userCtrl.forgotPassword );

// Reiniciar o crear contraseña
router.put('/user/resetPassword/:token', userCtrl.newPassword );

export default router;
