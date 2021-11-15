import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Child from './child.model';

export const newChild: RequestHandler = async (req, res) => {
    
}

export const editChild: RequestHandler = async (req, res) => {
    
}

export const deleteChild: RequestHandler = async (req, res) => {
    
}

/**
 * Funcion que maneja la peticion de obtener una lista de los lactante de una madre
 * @route Get /child/:idMother
 * @param req Request de la peticion
 * @param res Response, retorna un object con una lista de los lactantes relacionados a la madre con el id ingresado
 */
export const getResumeChild: RequestHandler = async (req, res) => {
    const _idMother = req.params.idMother
    
    if (!Types.ObjectId.isValid(_idMother))
        return res.status(400).send({ success: false, data: {}, message: 'ERROR: La madre ingresada no existe en el sistema.'});

    const listChilds = await Child.find({ id_mother: _idMother });
    const childsFiltered = listChilds.map(child => { return { id: child.id, name: child.name, birth: child.birth_data.birthday }});

    return res.status(200).send({ success: true, data: { childsFiltered }, message: 'Lista de los lactactes solicitados.'});
}

export const getChild: RequestHandler = async (req, res) => {
    
}
