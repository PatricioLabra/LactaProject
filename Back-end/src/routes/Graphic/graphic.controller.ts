import { RequestHandler } from "express";
import Graphic from './graphic.model';
import { Types } from "mongoose";

/**
 * Función que maneja la petición de obtener un objeto con sus datos para una posterior grafica de ellos.
 * @route Get /graphic/:keyword
 * @param req Request de la petición, se espera que tenga la la información del objeto.
 * @param res Response, retorna un un object con success:true, data:{ object:{}} y un message: "String" del objeto obtenido.
 */
 export const getDataGraphic: RequestHandler = async (req, res) => {

 }
