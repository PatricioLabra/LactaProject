import { RequestHandler } from "express";
import { Types } from "mongoose";
import Control from './control.model';
import Child from '../Child/child.model';
import Mother from '../Mother/mother.model';


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

    if ( controls == 0 ) {

        //se validan los campos required de la primera cita (todos)
        if ( !dataNewControl.consultation_place || !dataNewControl.monitoring_medium || !dataNewControl.date_control 
            || !dataNewControl.weight || !dataNewControl.reason_of_consultation || !dataNewControl.accompanied_by
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
    
    const controlFound = Control.findById(_id);

    if( !controlFound ){
        return res.status(404).send({ success: false, data:{}, message:'Error: El control solicitado no existe en el sistema.' });
    }

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

    const dateFormat = DateToFormattedString(date);

    //se obtiene la lista de controles proximos, ordenados del más reciente al último
    const nextControls = await Control.find( { "id_mother": idMother, "date_control": {"$gte": date}} ).sort({date_control: 1}); 

    //se filtran los datos a enviar al front
    const nextControlsFiltered = nextControls.map( control => { return {
         _id: control.id,  
         child_name: control.child_name, 
         consultation_place: control.consultation_place,
         monitoring_medium: control.monitoring_medium,
         date_control: DateToFormattedString(control.date_control)
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

    const dateFormat = DateToFormattedString(date);

    //se obtiene la lista de controles proximos, ordenados del más reciente al último
    const passControls = await Control.find( { "id_mother": idMother, "date_control": {"$lt": date}} ).sort({date_control: -1}); 

    //se filtran los datos a enviar al front
    const passControlsFiltered = passControls.map( control => { return {
         _id: control.id,  
         child_name: control.child_name, 
         consultation_place: control.consultation_place,
         monitoring_medium: control.monitoring_medium,
         date_control: DateToFormattedString(control.date_control)
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
 * @route Get /control/:child_name/:init_date/:end_date
 * @param req Request de la petición, se espera que tenga el child_name, la fecha como limite inferior y la fecha de limite superior
 * @param res Response, retorna un un object con success:true, data:{} con la lista y un message: "String" de confirmacion
 */
export const getSearchPassControls: RequestHandler = async (req, res) => {
    const { id_mother, child_name, init_date, end_date } = req.body;
    let list_controls;

    if ( !child_name && !init_date && !end_date ){
        //se retorna sin hacer nada
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: No se ingresaron parámetros para filtrar.' })
    } 

    if ( !child_name && !init_date ){
        //se busca hasta end_date con el id_mother
        list_controls = await Control.find({ "id_mother": id_mother, "date_control":{"$lte":end_date }}).sort({date_control: -1});
    }

    if ( !child_name && !end_date ){
        //se busca desde init_date con el id_mother
        list_controls = await Control.find({ "id_mother": id_mother, "date_control":{"$gte": init_date}}).sort({date_control: -1});
    }

    if ( !init_date ){
        //se busca con child_name y hasta end_date
        list_controls = await Control.find({ "child_name": child_name, "date_control":{"$lte":end_date }}).sort({date_control: -1});
    }

    if ( !end_date ){
        //se busca con child_name y desde init_date
        list_controls = await Control.find({ "child_name": child_name, "date_control":{"$gte": init_date}}).sort({date_control: -1});
    }

    if ( child_name && init_date && end_date ){
    //se busca con el child_name y el margen de busqueda (init & end)
        list_controls = await Control.find({ "child_name": child_name, "date_control":{"$gte": init_date,"$lte":end_date }}).sort({date_control: -1});
    }

    //se filtran los datos a retornar
    
    //se retorna la lista
    return res.status(200).send({ success: true, data:{list_controls},messagge: 'controles encontrados'} );
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
    
    //se cambia el formato de la fecha por string yyyy/mm/dd
    const last_control = DateToFormattedString(lastControl.date_control);
    const next_control = DateToFormattedString(nextControl.date_control);

    return res.status(200).send({ success: true, data:{ "last_control": last_control, "next_control": next_control }, message: 'Se muestran el ultimo y proximo control exitosamente.' });
}

/**
 * Función que maneja la petición de obtener la cantidad de controles asociados a un lactante
 * @route Get /control/quantity/:idChild
 * @param req Request de la petición, se espera que tenga el id del lactante
 * @param res Response, retorna un un object con success:true, data:{"string":Bool} con la fecha y un message: "String" de confirmacion
 */
 export const getQuantityControl: RequestHandler = async (req, res) => {
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
 * Convierte un date_control de UTC a yyyy/mm/dd (string)
 * @param motherFound Madre extraida de la base de datos
 * @returns Object con los atributos de la madre a enviar al front
 */
function DateToFormattedString(date:any) {         
                                 
    var yyyy = date.getFullYear().toString();                                    
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based         
    var dd  = date.getDate().toString();             
                         
    return yyyy + '/' + (mm[1]?mm:"0"+mm[0]) + '/' + (dd[1]?dd:"0"+dd[0]);
}  

/**
 * Extrae los atributos publicos del control obtenido desde la base de datos
 * @param controlFound control extraido de la base de datos
 * @returns Object con los atributos del control a enviar al front
 */
function destructureControl ( controlFound: any ){
    const controlFiltered ={
        _id: controlFound._id,
        date_control: DateToFormattedString(controlFound.date_control),
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
