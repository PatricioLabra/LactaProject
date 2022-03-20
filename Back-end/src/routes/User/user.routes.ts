import { Router } from 'express';
import * as userCtrl from './user.controller';
import { isAdmin , isRol } from "../../middlewares/authRoles";
import passport from 'passport';

const router = Router();

// Agregar un nuevo usuario
router.post('/user/signup', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isAdmin, userCtrl.signUp);

// Obtener la informacion de un usuario(Nombre Header)
router.get('/user/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, userCtrl.getUserName);

// Editar usuario
router.put('/user/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isAdmin, userCtrl.editUser);

// Eliminar usuario
router.delete('/user/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isAdmin, userCtrl.deleteUser);

// Inicia sesión
router.post('/user/signin', userCtrl.signIn);

//Obtener lista usuarios
router.get('/user', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isAdmin, userCtrl.getUsers);

// Recuperar contraseña
router.post('/user/forgotPassword', userCtrl.forgotPassword );

// Reiniciar o crear contraseña
router.put('/user/resetPassword/:token', userCtrl.newPassword );

//Obtener la informacion del Usuario (Sin password)
router.get('/user/info/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isAdmin, userCtrl.getUserInfo);

export default router;
