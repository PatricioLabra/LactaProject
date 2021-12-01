import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Obtiene un token usando como payload el id, y como clave una variable de entorno
 * @param id Id del usuario, sobre el cual se obtendra el token
 * @returns token del usuario
 */
export function signToken(id: any) {
	const token = jwt.sign({ _id: id }, process.env.TOKEN_SECRET || 'secret_key');
	return token;
}

/**
 * Middleware que maneja la validacion del token del usuario (solo valida que se mande un token)
 * @param req Request de la peticion, se espera que tenga el headers authorization
 * @param res Response, si algo falla con el token, retorna el mensaje de error
 * @param next Siguiente handler a cargar
 */
 export const verifyToken: RequestHandler = (req, res, next) => {
	if (!req.headers.authorization)
		return res.status(400).send({ success: false, message: 'Headers dont have authorization param' });

	const token = req.headers.authorization.split(' ')[1];

	if (!token)
		return res.status(400).send({ success: false, message: 'Bad syntax header authorization' });

	const payload: any = jwt.verify(token, process.env.SECRET_KEY || 'secret_key');
	req.body._id = payload._id;

	next();
}