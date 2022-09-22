import { RequestHandler } from "express";
import { Types } from "mongoose";
import Control from './control.model';
import Child from '../Child/child.model';
import Mother from '../Mother/mother.model';
import { addDataGraphic , deleteDataGraphic } from "../../libs/generate.graphics";


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
    const controls = await Control.find( {id_child} ).count();

    //se validan los campos required de la primera cita (todos)
    if ( !dataNewControl.consultation_place || !dataNewControl.monitoring_medium || !dataNewControl.date_control )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: Los datos del control no son válidos.' + req.body });


    const newControl = {
        child_name: childFound.name,
        consultation_place: dataNewControl.consultation_place,
        monitoring_medium: dataNewControl.monitoring_medium,
        date_control: dataNewControl.date_control,
        age: dataNewControl.age,
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

    if ( controls == 0 ){
        //Se almacenan los datos a graficar de los controles en el sistema
        addControlGraphic(controlSaved);
    }

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
    const _id = req.params.idControl;
    const updatedControl = req.body;

    //se valida el _id de la madre ingresada
    if ( !Types.ObjectId.isValid( _id) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const controlFound = await Control.findById( _id );

    //se valida la existencia del control en el sistema
    if ( !controlFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El control ingresado no existe en el sistema.' });
    
    //se actualiza el control en el sistema
    await Control.findByIdAndUpdate( _id, updatedControl );

    const current_date = new Date();

    /*se valida que el control sea de la fecha actual (planilla seguimiento) y que tenga al menos uno de los datos obligatorios rellenados
    * esto con el fin de solo almacenar plantillas de seguimiento y no proximos controles*/
    if ( controlFound.date_control.toISOString().substring(0,10) == current_date.toISOString().substring(0,10) && updatedControl.reason_of_consultation != null ){
        addControlGraphic( updatedControl );
    }

    return res.status(200).send({ success: true, data:{}, message: 'Control editado de manera correcta.' });
}

/**
 * Función que maneja la petición de eliminar un control del sistema
 * @route Delete /control/:idControl
 * @param req Request de la petición, se espera que tenga el id del control a eliminar
 * @param res Response, retorna un un object con success:true, data:{} y un message: "String" del control editado si todo sale bien
 */
export const deleteControl: RequestHandler = async (req, res) => {
    const _id = req.params.idControl;

    //se valida el id del control
    if( !Types.ObjectId.isValid(_id) ){
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });
    }
    
    const controlFound = await Control.findById(_id);

    if( !controlFound ){
        return res.status(404).send({ success: false, data:{}, message:'Error: El control solicitado no existe en el sistema.' });
    }

    //se eliminan los datos del lactante asociados a los graphic
    deleteControlGraphic(controlFound);

    //Se busca el control y se elimina
    await Control.findByIdAndDelete(_id);

    return res.status(200).send({ success: true, data:{}, message: 'Control eliminado de manera correcta.' });
}

/**
 * Función que maneja la petición de obtener una lista de los controles proximos
 * @route Get /control/:idMother
 * @param req Request de la petición, se espera que tenga el id de la madre
 * @param res Response, retorna un un object con success:true, data:{ controls: [{},{}] } y un message: "String" de la lista de controles si todo sale bien
 */
export const getNextControls: RequestHandler = async (req, res) => {
    const idMother = req.params.idMother;

    //se valida el _id de la madre ingresada
    if ( !Types.ObjectId.isValid( idMother ))
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const mother = await Mother.findById( idMother );

    //se valida la existencia de la madre en el sistema
    if ( !mother )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La madre ingresada no existe en el sistema.' });

    //obtenemos la fecha actual
    const date = new Date();
    
    //se setea la hora 
    dateInitializer(date);

    //se obtiene la lista de controles proximos, ordenados del más reciente al último
    const nextControls = await Control.find( { "id_mother": idMother, "date_control": {"$gte": date}} ).sort({date_control: 1}); 

    //se filtran los datos a enviar al front
    const nextControlsFiltered = nextControls.map( control => { return {
         _id: control.id,  
         child_name: control.child_name, 
         consultation_place: control.consultation_place,
         monitoring_medium: control.monitoring_medium,
         date_control: control.date_control.toISOString().substring(0,10)
        }});

    return res.status(200).send({ success: true, data:{ nextControlsFiltered }, message: 'Lista de controles obtenida de manera correcta' });
}

/**
 * Función que maneja la petición de obtener una lista de los controles pasados
 * @route Get /control/:idMother
 * @param req Request de la petición, se espera que tenga el id de la madre
 * @param res Response, retorna un un object con success:true, data:{ controls: [{},{}] } y un message: "String" de la lista de controles si todo sale bien
 */
export const getPassControls: RequestHandler = async (req, res) => {
    const idMother = req.params.idMother;

    //se valida el _id de la madre ingresada
    if ( !Types.ObjectId.isValid( idMother ))
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const mother = await Mother.findById( idMother );

    //se valida la existencia de la madre en el sistema
    if ( !mother )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La madre ingresada no existe en el sistema.' });

    //obtenemos la fecha actual
    const date = new Date();
    
    //se setea la hora 
    dateInitializer(date);

    //se obtiene la lista de controles proximos, ordenados del más reciente al último
    const passControls = await Control.find( { "id_mother": idMother, "date_control": {"$lt": date}} ).sort({date_control: -1}); 

    //se filtran los datos a enviar al front
    const passControlsFiltered = passControls.map( control => { return {
         _id: control.id,  
         child_name: control.child_name, 
         consultation_place: control.consultation_place,
         monitoring_medium: control.monitoring_medium,
         date_control: control.date_control.toISOString().substring(0,10),
         completed: isCompleted(control.weight)
        }});

    return res.status(200).send({ success: true, data:{ passControlsFiltered }, message: 'Lista de controles obtenida de manera correcta' });
}

/**
 * Funcion que maneja la peticion de toda la informacion de un control en especifico del sistema
 * @route Get /control/:idControl
 * @param req Request, se espera que tenga el id del control a mostrar
 * @param res Response, returna true, informacion del control y un mensaje de confirmacion
 */
export const getDetailedPassControl: RequestHandler = async (req, res) => {
    const _id = req.params.idControl;
 
    //se valida el _id ingresado
    if ( !Types.ObjectId.isValid(_id) ){
        return res.status(400).send({ success: false, data:{}, message:'Error: El id ingresado no es válido.' });
    }

    const controlFound = await Control.findById(_id);

    //Se valida que el control ingresado para mostrar existe
    if( !controlFound ){
        return res.status(404).send({ success: false, data:{}, message:'Error: El control solicitado no existe en el sistema.' });
    }

    //Se guardan solo los parametros que se van a mostrar en el front
    const controlFiltered = destructureControl(controlFound);

    //Se retorna los datos del usuario buscado
    return res.status(200).send({
        success:true,
        data: controlFiltered,
        messagge: 'Se obtuvo exitosamente la informacion del control'
    });
}

/**
 * Función que maneja la petición de obtener una lista de controles asociados al nombre de un lactante y a un rango de fechas
 * @route Get /controlsFiltered
 * @param req Request de la petición, se espera que tenga un JSON con los filtros
 * @param res Response, retorna un un object con success:true, data:{} con la lista y un message: "String" de confirmacion
 */
export const getSearchControlFiltered: RequestHandler = async (req, res) => {
    const { id_mother, child_name, init_date, end_date } = req.body;
    let list_controls;

    //se valida el id_mother ingresado
    if ( !Types.ObjectId.isValid(id_mother) ){
        return res.status(400).send({ success: false, data:{}, message:'Error: El id_mother ingresado no es válido.' });
    }

    //se valida que se ingresaron parámetros
    if ( !child_name && !init_date && !end_date ) {
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: No se ingresaron parámetros para filtrar.' })
    } else {
        //se busca por end_date
        if ( !child_name && !init_date && end_date) {
            list_controls = await Control.find({ "id_mother": id_mother, "date_control":{"$lte": end_date }}).sort({date_control: -1});
        } else {
            //se busca por init_date
            if ( !child_name && init_date && !end_date) {
                list_controls = await Control.find({ "id_mother": id_mother, "date_control":{"$gte": init_date}}).sort({date_control: -1});
            } else {
                //se busca por child_name y la fecha actual
                if ( child_name && !init_date && !end_date ) {
                    const date_now = new Date();
                    dateInitializer(date_now);
                    list_controls = await Control.find({ "child_name": child_name, "date_control":{"$lt":date_now }}).sort({date_control: -1});
                } else {
                    //se busca por child_name y end_date
                    if ( child_name && !init_date && end_date ){
                        list_controls = await Control.find({ "child_name": child_name, "date_control":{"$lte":end_date }}).sort({date_control: -1});
                    } else {
                        //se busca por child_name y init_date
                        if ( child_name && init_date && !end_date ){
                            list_controls = await Control.find({ "child_name": child_name, "date_control":{"$gte": init_date}}).sort({date_control: -1});
                        } else {
                            //se valida que init no sea mayor que end
                            if ( init_date > end_date )
                                return res.status(400).send({ success: true, data:{}, message: 'ERROR: las fechas son inválidas.'});
                            
                            //se busca por el rango de fechas solamente
                            if ( !child_name && init_date && end_date ){
                                list_controls = await Control.find({ "id_mother": id_mother, "date_control":{"$gte": init_date,"$lte":end_date }}).sort({date_control: -1});
                            } else {
                                //se busca con todos los filtros
                                list_controls = await Control.find({ "child_name": child_name, "date_control":{"$gte": init_date,"$lte":end_date }}).sort({date_control: -1});
                            }
                        }
                    }
                }
            }
        }
    }

    //se filtran los datos a retornar
    const list_controls_filtered = list_controls.map( control => { return {
        _id: control.id,  
        child_name: control.child_name, 
        consultation_place: control.consultation_place,
        monitoring_medium: control.monitoring_medium,
        date_control: control.date_control.toISOString().substring(0,10),
        completed: isCompleted(control.weight)
       }});

    return res.status(200).send({ success: true, data:{ list_controls_filtered }, message: 'Controles encontrados'} );
}

/**
 * Función que maneja la petición de mostrar el ultimo y proximo control de una madre
 * @route Get /control/lastAndNext/:idMother
 * @param req Request de la petición, se espera que tenga el id de la madre 
 * @param res Response, retorna un un object con success:true, data:{} con la fecha y un message: "String" de confirmacion
 */
 export const getLastAndNextControl: RequestHandler = async (req, res) => {
    const _id = req.params.idMother;

    //se valida el _id de la madre ingresada
    if ( !Types.ObjectId.isValid( _id) )
    return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const motherFound = await Mother.findById(_id);

    if ( !motherFound ){
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La madre ingresada no existe en el sistema.' });
    }

    //se obtiene la fecha actual
    const date = new Date();

    //se setea la hora 
    dateInitializer(date);

    const lastControl = await Control.findOne( { "id_mother": _id, "date_control": {"$lt": date}} ).sort({date_control: -1});
    const nextControl = await Control.findOne( { "id_mother": _id, "date_control": {"$gte": date}} ).sort({date_control: 1});
    
    //se cambia el formato de la fecha por string yyyy-mm-dd
    const last_control = lastControl?.date_control.toISOString().substring(0,10);
    const next_control = nextControl?.date_control.toISOString().substring(0,10);

    return res.status(200).send({ success: true, data:{ "last_control": last_control, "next_control": next_control }, message: 'Se muestran el ultimo y proximo control exitosamente.' });
}

/**
 * Función que maneja la petición de obtener la cantidad de controles asociados a un lactante
 * @route Get /control/quantity/:idChild
 * @param req Request de la petición, se espera que tenga el id del lactante
 * @param res Response, retorna un un object con success:true, data:{"string":Bool} con la fecha y un message: "String" de confirmacion
 */
 export const getFirstControl: RequestHandler = async (req, res) => {
    const id_child = req.params.idChild;

    //se valida el _id de la madre ingresada
    if ( !Types.ObjectId.isValid( id_child) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const childFound = await Child.findById(id_child);

    //se valida la existencia del lactante
    if ( !childFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: No existe un lactante asociado al id ingresado.'});


    const quantityControl = await Control.find( {id_child} ).count();

    //se verifica la cantidad de controles encontrados
    if ( quantityControl == 0 ){
        return res.status(200).send({ success: false, data:{"moreControls": false }, message: 'Es el primer control del lactante.'} )
    } 

    return res.status(200).send({ success: false, data:{"moreControls": true }, message: 'Ya existe un primer control registrado.'} )
}

/**
 * Extrae los atributos publicos del control obtenido desde la base de datos
 * @param controlFound control extraido de la base de datos
 * @returns Object con los atributos del control a enviar al front
 */
function destructureControl ( controlFound: any ){
    const controlFiltered ={
        _id: controlFound._id,
        date_control: controlFound.date_control.toISOString().substring(0,10),
        age: controlFound.age,
        child_name: controlFound.child_name,
        consultation_place: controlFound.consultation_place,
        monitoring_medium: controlFound.monitoring_medium,
        weight: controlFound.weight,
        reason_of_consultation: controlFound.reason_of_consultation,
        accompanied_by: controlFound.accompanied_by,
        emotional_status: controlFound.emotional_status,
        observations: controlFound.observations,
        indications: controlFound.indications
    }

    return controlFiltered;
}

/**
 * Fija la hora en las 0:00:00.000+00:00
 * @param date fecha en formato UTC
 */
function dateInitializer (date: any){
    date.setUTCHours(3);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
}

/**
 * Retorna true o false en caso de que sea haya completado o no el control
 * @param weightChild peso del lactante, se usa como parametro de validación.
 * @returns True or False, True = se completó el control, False: no se completó el control.
 */
 function isCompleted (weightChild:any ){
    if ( weightChild == null ){
        return false;
    }

    return true;
}

/**
 * Esta encargada de mantener un llamado a la función auxiliar de todos los datos a almacenar en la colección Graphics
 * @param ControlSaved Control con todos los datos a guardar en la BD
 */
 function addControlGraphic( control: any ) {
    addDataGraphic("consultation_place",control.consultation_place);
    addDataGraphic("monitoring_medium", control.monitoring_medium);
    addDataGraphic("reason_of_consultation", control.reason_of_consultation);
    addDataGraphic("accompanied_by", control.accompanied_by);

    //se valida que el arreglo no venga vacío
    if ( control.indications.length > 0 ){
        addDataGraphic("indications", control.indications);
    }
}

/**
 * Esta encargada de mantener un llamado a la función auxiliar de todos los datos a eliminar en la colección Graphics
 * @param control Control con todos los datos a eliminar en la BD
 */
export function deleteControlGraphic( control: any ) {
    if ( control.consultation_place ){ deleteDataGraphic("consultation_place",control.consultation_place.toString()); };
    if ( control.monitoring_medium ){ deleteDataGraphic("monitoring_medium", control.monitoring_medium.toString()); };
    if ( control.reason_of_consultation ){ deleteDataGraphic("reason_of_consultation", control.reason_of_consultation.toString()); };
    if ( control.accompanied_by ){ deleteDataGraphic("accompanied_by", control.accompanied_by.toString()); };
  
    //se valida que el arreglo no venga vacío
    if ( control.indications.length > 0 ){
        deleteDataGraphic("indications", control.indications);
    }
}
