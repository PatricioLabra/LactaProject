import { RequestHandler } from "express";
import { Types } from "mongoose";
import Mother from '../Mother/mother.model';
import Control from './control.model';
import Child from '../Child/child.model';



/**
 * Función que maneja la petición de agregar a un nuevo control al sistema.
 * @route Post /control/
 * @param req Request de la petición, se espera que tenga la información del nuevo control + el id Del child
 * @param res Response, retorna un un object con success:true, data:{ _id: ObjectId() } y un message: "String" del nuevo control si todo sale bien
 */
export const newControl: RequestHandler = async (req, res) => {
    const { id_child, newControl } = req.body;

    //se valida el Id del Child
    if ( !Types.ObjectId.isValid(id_child) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const childFound = await Child.findById(id_child);

    //se valida la existencia del Child
    if ( !childFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El lactante ingresado no existe en el sistema.' });

    //se validan los campos required del control
    if ( !newControl.child_name || !newControl.consultation_place || !newControl.monitoring_medium || !newControl.date_control )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: Los datos del control no son válidos.' + req.body });


}

export const editControl: RequestHandler = async (req, res) => {

}

export const deleteControl: RequestHandler = async (req, res) => {

}

export const getControl: RequestHandler = async (req, res) => {

}

export const getPassControl: RequestHandler = async (req, res) => {

}

export const getDetailedPassControl: RequestHandler = async (req, res) => {

}

export const getSeach: RequestHandler = async (req, res) => {

}

export const getLastControl: RequestHandler = async (req, res) => {

}

export const getNextControl: RequestHandler = async (req, res) => {

}
