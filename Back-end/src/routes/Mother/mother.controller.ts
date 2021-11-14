import { RequestHandler } from "express";
import Mother from './mother.model';
import { Types } from "mongoose";


/**
 * Función que maneja la petición de agregar a una nueva madre al sistema.
 * @route Post /mother
 * @param req Request de la petición, se espera que tenga la información de la nueva madre
 * @param res Response, retorna un un object con succes:true, data:{ _id: ObjectId() } y un message: "String" de la nueva madre si todo sale bien
 */
export const newMother: RequestHandler = async (req, res) => {
    const {
        name, rut, commune, phone_number, mail, birth, 
        ocupation, studies, marital_status, forecast,
        chronic_diseases, number_of_living_children, childs
    } = req.body;

    //se valida si alguno de los atributos required no son válidos
    if ( !name || !rut || !commune || !phone_number || !birth || !ocupation || !studies || 
        !marital_status || !forecast || !chronic_diseases || number_of_living_children < 0)
        return res.status(400).send({ succes: false, data:{}, message:'ERROR: Datos inválidos' + req.body });

    const motherFound = await Mother.findOne({ rut });

    //se valida la existencia de la madre en el sistema
    if ( motherFound )
        return res.status(301).send({ succes: false, data:{}, message:'ERROR: La madre ya está registrada en el sistema.' });
    
    const newMother = {
        name, rut, commune, phone_number, mail, birth, 
        ocupation, studies, marital_status, forecast,
        chronic_diseases, number_of_living_children, childs : [] 
    }

    //se almacena la madre en el sistema
    const motherSaved = new Mother(newMother);
    await motherSaved.save();

    return res.status(201).send({ succes: true, data: { _id: motherSaved._id }, message: 'Madre agregada con éxito al sistema.' });
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
    if ( !motherFound ) 
        return res.status(404).send({ succes: false, data:{}, message: 'ERROR: La madre ingresada no existe en el sistema.' });

    //se actualiza la madre en el sistema
    await Mother.findByIdAndUpdate( _id, updatedMother );

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