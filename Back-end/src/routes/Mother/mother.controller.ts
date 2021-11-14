import { RequestHandler } from "express";
import Mother from './mother.model';
import { Types } from "mongoose";

export const newMother: RequestHandler = async (req, res) => {
    
}




































/**
 * Función que maneja la petición de editar a una madre registrada en el sistema.
 * @route Put /mother
 * @param req Request de la petición, se espera que tenga la información editada de una madre existente
 * @param res Response, retorna un un object con succes:true, data:{} y un message: "String" de la madre editada si todo sale bien
 */
export const editMother: RequestHandler = async (req, res) => {
    const _id = req.params.id;
    const updatedMother = req.body;

    //se valida el _id de la madre ingresada
    if ( !Types.ObjectId.isValid(_id) )
        return res.status(400).send({ succes: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });
    
    const motherFound = await Mother.findById( _id );

    //se valida la existencia de la madre en el sistema
    if ( motherFound ) 
        return res.status(404).send({ succes: false, data:{}, message: 'ERROR: La madre ingresada no existe en el sistema.' });

    //se actualiza la madre en el sistema
    await Mother.findByIdAndUpdate( _id, updatedMother);

    return res.status(200).send({ succes: true, data:{}, message: 'Madre editada de manera correcta.' });
}

export const deleteMother: RequestHandler = async (req, res) => {
    
}

export const getDetailedMother: RequestHandler = async (req, res) => {
    
}

export const getMothers: RequestHandler = async (req, res) => {
    
}

export const getMother: RequestHandler = async (req, res) => {
    
}

export const getSearch: RequestHandler = async (req, res) => {
    
}
