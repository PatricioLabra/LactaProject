import { Router } from 'express';
import * as userCtrl from './user.controller';
import { verifyToken } from '../jwt';

const router = Router();

// Agregar un nuevo usuario
router.post('/user/signup', verifyToken, userCtrl.signUp);

// Obtener la informacion de un usuario(Nombre Header)
router.get('/user/:id', verifyToken, userCtrl.getUserName);

// Editar usuario
router.put('/user/:id', verifyToken, userCtrl.editUser);

// Eliminar usuario
router.delete('/user/:id', verifyToken, userCtrl.deleteUser);

// Inicia sesión
router.post('/user/signin', userCtrl.signIn);

// Recuperar password
router.get('/user/pass/:rut', userCtrl.getPass);

//Obtener lista usuarios
router.get('/user', verifyToken, userCtrl.getUsers);

//Cambiar password
router.put('/user/change/pass/:id', verifyToken, userCtrl.changePass);

export default router;
