import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Mother from '../Mother/mother.model';
import Child from './child.model';


/**
 * Funcion que maneja la peticion de agregar un nuevo usuario al sistema
 * @route Post '/child/:idMother'
 * @param req req Request, Se espera que contengar el id de la madre 
 * @param res Response, retornará object con success true, data: { _id: ObjectId() } y un mensaje de confirmacion de creacion
 */
export const newChild: RequestHandler = async (req, res) => {
    
}

/**
 * Funcion que maneja la peticion de editar el lactante
 * @route Put /child/:idLactante
 * @param req Request, se espera que tenga archivo json con el usuario editado
 * @param res Response, returna true, el nuevo usuario y un mensaje de confirmacion
 */
export const editChild: RequestHandler = async (req, res) => {
    const _id = req.params.idLactante;
    const updatedChild = req.body;

    //se valida el _id del lactante ingresado
    if ( !Types.ObjectId.isValid(_id) ){
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });
    }

    const childFound = await Child.findById( _id );

    //se valida la existencia del lactante
    if ( !childFound ){
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El lactante ingresado no existe en el sistema.' });
    }

    //se actualiza el lactante
    await Child.findByIdAndUpdate( _id, updatedChild );

    return res.status(200).send({ success: true, data:{ updatedChild }, messagge: 'Lactante editado exitosamente' });
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

/**
 * Funcion que maneja la peticion de toda la informacion de un lactante en especifico del sistema
 * @route Get /child/profile/:idLactante
 * @param req Request, se espera que tenga el id del usuario
 * @param res Response, returna true, informacion del usuario y un mensaje de confirmacion
 */
export const getChild: RequestHandler = async (req, res) => {
    const _id = req.params.idLactante;

    //se válida el _id ingresado
    if ( !Types.ObjectId.isValid( _id ))
    return res.status(400).send({ success: false, data:{}, message:'Error: El id ingresado no es válido.' });

    const childFound = await Child.findById(_id);

    //Se valida el lactante ingresado por su id
    if( !childFound ){
        return res.status(404).send({ success: false, data:{}, message:'Error: El lactante solicitado no existe en el sistema.' });
    }

    //Se guardan solo los atributos que se van a mostrar en el found
    const childFiltered = destructureChild( childFound );

    //Se retorna los datos del usuario buscado
    return res.status(200).send({
        success:true,
        data: childFiltered,
        messagge: 'Se obtuvo exitosamente la informacion del lactante.'
    });
}

function destructureChild( childFound: any ){
    const childFiltered ={
        _id: childFound._id,
        name: childFound.name,
        gestacion_data: childFound.gestacion_data,
        birth_data: childFound.birth_data
    };

    return childFiltered;
}
