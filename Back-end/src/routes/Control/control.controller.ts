import { RequestHandler } from "express";
import { Types } from "mongoose";
import Control from './control.model';
import Child from '../Child/child.model';


/**
 * Función que maneja la petición de agregar a un nuevo control al sistema.
 * @route Post /control/
 * @param req Request de la petición, se espera que tenga la información del nuevo control + el id Del child
 * @param res Response, retorna un un object con success:true, data:{ _id: ObjectId() } y un message: "String" del nuevo control si todo sale bien
 */
export const newControl: RequestHandler = async (req, res) => {
    const { id_child, dataNewControl } = req.body;

    //se valida el Id del Child
    if ( !Types.ObjectId.isValid(id_child) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const childFound = await Child.findById(id_child);

    //se valida la existencia del Child
    if ( !childFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El lactante ingresado no existe en el sistema.' });


    //se obtienen la cantidad de controles del child
    const controls = await Control.count(id_child);

    if ( controls == 0 ) {

        //se validan los campos required de la primera cita (todos)
        if ( !dataNewControl.consultation_place || !dataNewControl.monitoring_medium || !dataNewControl.date_control 
            || !dataNewControl.weights || !dataNewControl.reason_of_consultation || !dataNewControl.accompanied_by
            || !dataNewControl.emotional_status || !dataNewControl.observations || !dataNewControl.indications )
            return res.status(400).send({ success: false, data:{}, message: 'ERROR: Los datos del control no son válidos.' + req.body });
    
    } else {

        //se validan los campos required del proximo control
        if ( !dataNewControl.consultation_place || !dataNewControl.monitoring_medium || !dataNewControl.date_control )
            return res.status(400).send({ success: false, data:{}, message: 'ERROR: Los datos del control no son válidos.' + req.body });
    }

    const newControl = {
        child_name: childFound.name,
        consultation_place: dataNewControl.consultation_place,
        monitoring_medium: dataNewControl.monitoring_medium,
        date_control: dataNewControl.date_control,
        weight: dataNewControl.weight,
        reason_of_consultation: dataNewControl.reason_of_consultation,
        accompanied_by: dataNewControl.accompanied_by,
        emotional_status: dataNewControl.emotional_status,
        observations: dataNewControl.observations,
        indications: dataNewControl.indications,
        id_child,
        id_mother: childFound.id_mother
    }

    //se almacena el control en el sistema
    const controlSaved = new Control(newControl);
    await controlSaved.save();

    return res.status(201).send({ success: true, data: { _id: controlSaved._id }, message: 'Control agregado con éxito al sistema.' });
}

/**
 * Función que maneja la petición de editar un control al sistema.
 * @route Put /control/:idControl
 * @param req Request de la petición, se espera que tenga la información del control editado
 * @param res Response, retorna un un object con success:true, data:{} y un message: "String" del control editado si todo sale bien
 */
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
