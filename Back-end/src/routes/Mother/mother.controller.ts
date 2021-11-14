import { RequestHandler } from "express";
import Mother from './mother.model';
import Types from "moongose";


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
        !marital_status || !forecast || !chronic_diseases || !childs || number_of_living_children < 0)
        return res.status(400).send({ succes: false, data:{}, message:'ERROR: Datos inválidos' + req.body });

    const motherFound = await Mother.findOne({ rut });

    //se valida la existencia de la madre en el sistema
    if ( motherFound )
        return res.status(301).send({ succes: false, data:{}, message:'ERROR: La madre ya está registrada en el sistema.' });
    
    const newMother = {
        name, rut, commune, phone_number, mail, birth, 
        ocupation, studies, marital_status, forecast,
        chronic_diseases, number_of_living_children, childs
    }

    //se almacena la madre en el sistema
    const motherSaved = new Mother(newMother);
    await motherSaved.save();

    return res.status(201).send({ succes: true, data: { _id: motherSaved._id }, message: 'Madre agregada con éxito al sistema.' });
}

export const editMother: RequestHandler = async (req, res) => {
    
}

export const deleteMother: RequestHandler = async (req, res) => {
    
}

/**
 * Función que maneja la petición de obtener a una madre con sus datos de manera detallada del sistema.
 * @route Get /mother/:id
 * @param req Request de la petición, se espera que tenga la información de la madre obtenida
 * @param res Response, retorna un un object con succes:true, data:{  mother:{} } y un message: "String" de la madre obtenida si todo sale bien
 */
export const getDetailedMother: RequestHandler = async (req, res) => {
    const _id: req.params.id;

    //se valida el _id ingresado
    if ( !Types.ObjecId.isValid( _id ))

}

export const getMothers: RequestHandler = async (req, res) => {
    
}


export const getSearch: RequestHandler = async (req, res) => {
    
}
