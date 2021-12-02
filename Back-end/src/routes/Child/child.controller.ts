import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Mother from '../Mother/mother.model';
import Child from './child.model';
import Control from '../Control/control.model';
import { addDataGraphic, deleteDataGraphic } from "../Graphic/generate.graphics";

/**
 * Funcion que maneja la peticion de agregar un nuevo usuario al sistema
 * @route Post '/child/:idMother'
 * @param req req Request, Se espera que contengar el id de la madre 
 * @param res Response, retornará object con success true, data: { _id: ObjectId() } y un mensaje de confirmacion de creacion
 */
export const newChild: RequestHandler = async (req, res) => {
    const _idMother = req.params.idMother;

    //se valida el id de la madre
    if ( !Types.ObjectId.isValid(_idMother) )
    return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const { name, gestacion_data:{ diseases_during_pregnancy, nutritional_status_mother, planned_pregnancy, assisted_fertilization, previous_lactaction,
        duration_of_past_lactaction_in_months, breastfeeding_education }, birth_data:{ birthplace, type_of_birth, birthday,
        gestional_age, gender, birth_weight, skin_to_skin_contact, breastfeeding_b4_2hours, has_suplement, why_recived_suplement,
        joint_accommodation, use_of_pacifier, post_discharge_feeding, last_weight_control }} = req.body;

    const newChild = {
        name, gestacion_data: { diseases_during_pregnancy, nutritional_status_mother, planned_pregnancy, assisted_fertilization, previous_lactaction,
        duration_of_past_lactaction_in_months, breastfeeding_education }, birth_data:{ birthplace, type_of_birth, birthday, gestional_age, gender,
        birth_weight, skin_to_skin_contact, breastfeeding_b4_2hours, has_suplement, why_recived_suplement, joint_accommodation,
        use_of_pacifier, post_discharge_feeding, last_weight_control }, id_mother: _idMother
    }
    
    //validacion de los parametros
    /*if( !newChild.name || !newChild.gestacion_data.diseases_during_pregnancy || !newChild.gestacion_data.nutritional_status_mother ||
        newChild.gestacion_data.planned_pregnancy == null || newChild.gestacion_data.assisted_fertilization == null || 
        !newChild.gestacion_data.previous_lactaction || newChild.gestacion_data.duration_of_past_lactaction_in_months < 0 || 
        newChild.gestacion_data.breastfeeding_education == null || !newChild.birth_data.birthplace || !newChild.birth_data.type_of_birth ||  
        !newChild.birth_data.birthday || newChild.birth_data.gestional_age < 0 || !newChild.birth_data.gender || newChild.birth_data.birth_weight < 0 || 
        newChild.birth_data.skin_to_skin_contact == null || newChild.birth_data.breastfeeding_b4_2hours == null || 
        newChild.birth_data.has_suplement == null  || newChild.birth_data.joint_accommodation == null ||
        newChild.birth_data.use_of_pacifier == null || !newChild.birth_data.post_discharge_feeding || newChild.birth_data.last_weight_control < 0 ){
        return res.status(400).send({ success: false, data:{}, message:'Error: Datos inválidos' + req.body });
    }*/

    const motherFound = await Mother.findById(_idMother);

    //se valida la existencia de la madre en el sistema
    if( !motherFound ){
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La madre ingresada no existe en el sistema.' });
    }

    const ChildFound = await Child.findOne({ name });

    //se valida si existe el lactante en el sistema
    if(ChildFound){
        return res.status(301).send({ success: false, data:{}, message:'ERROR: El lactante ya está registrado en el sistema.' });
    }

    //Se guarda el nuevo lactante con sus datos
    const childSaved = new Child(newChild);

    //se almacenan los datos a graficar del lacatnte en el sistema
    addChildGraphic(childSaved);

    //await childSaved.save();

    return res.status(201).send({ success: true, data: { _id: childSaved._id }, message: 'Lactante agregado con éxito al sistema.' });
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

    const childControls = await Control.find( {id_child: _id} ).count();

    //se valida la existencia de controles asociados al child
    if ( childControls != 0 ){
        await Control.updateMany( { id_child: _id }, { child_name: updatedChild.name } );
    }

    //se eliminan los datos del child antigüos de la colección Graphic
    deleteChildGraphic(childFound);

    //se actualiza el lactante
    await Child.findByIdAndUpdate( _id, updatedChild );

    //se obtiene el child actualizado para agregar los nuevos datos a la colección Graphics
    const childFoundUpdated = await Child.findById( _id );
    addChildGraphic(childFoundUpdated);

    return res.status(200).send({ success: true, data:{}, messagge: 'Lactante editado exitosamente' });
}

/**
 * Funcion que maneja la eliminacion de un lactante en el sistema
 * @route Delete /child/:idLactante
 * @param req Request, se espera que tenga el id del lactante a eliminar
 * @param res Response, returna true, un data vacio y un mensaje de confirmacion
 */
 export const deleteChild: RequestHandler = async (req, res) => {
    const id_child = req.params.idLactante;

    //se valida el id
    if ( !Types.ObjectId.isValid(id_child) ){
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: el id ingresado no es valido.' });
    }

    const childFound = await Child.findById(id_child);
    const controlsFound = await Control.find({ id_child });

    //Se valida la existencia del lactante
    if ( !childFound ){
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El lactante ingresado no existe en el sistema.' });
    }

    //Se verifica si el lactante tiene controles, y se eliminan
    if ( controlsFound ){
        await Control.deleteMany({ id_child });
    }

    //se eliminan los datos del lactante asociados a los graphic
    deleteChildGraphic(childFound);

    //Se elimina el lactante del sistema
    await Child.findByIdAndDelete(id_child);

    return res.status(200).send({ success: true, data:{}, message: 'Se elimino exitosamente el lactante.' });
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

    const motherFound = await Mother.findById(_idMother);

    //se valida la existencia de la madre en el sistema
    if( !motherFound ){
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La madre ingresada no existe en el sistema.' });
    }

    const listChilds = await Child.find({ id_mother: _idMother });
    const childsFiltered = listChilds.map(child => { return { _id: child.id, name: child.name, birth: child.birth_data.birthday.toISOString().substring(0,10) }});

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
        return res.status(404).send({ success: false, data:{}, message:'ERROR: El lactante solicitado no existe en el sistema.' });
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

/**
 * Extrae los atributos publicos del control obtenido desde la base de datos
 * @param childFound control extraido de la base de datos
 * @returns Object con los atributos del control a enviar al front
 */
function destructureChild( childFound: any ){
    const childFiltered ={
        _id: childFound._id,
        name: childFound.name,
        gestacion_data: childFound.gestacion_data,
        birth_data: {
            birthplace: childFound.birth_data.birthplace,
            type_of_birth: childFound.birth_data.type_of_birth,
            birthday: childFound.birth_data.birthday.toISOString().substring(0,10),
            gestional_age: childFound.birth_data.gestional_age,
            gender: childFound.birth_data.gender,
            birth_weight: childFound.birth_data.birth_weight,
            skin_to_skin_contact: childFound.birth_data.skin_to_skin_contact,
            breastfeeding_b4_2hours: childFound.birth_data.breastfeeding_b4_2hours,
            has_suplement: childFound.birth_data.has_suplement,
            why_recived_suplement: childFound.birth_data.why_recived_suplement,
            joint_accommodation: childFound.birth_data.joint_accommodation,
            use_of_pacifier: childFound.birth_data.use_of_pacifier,
            post_discharge_feeding: childFound.birth_data.post_discharge_feeding,
            last_weight_control: childFound.birth_data.last_weight_control
        }
    };
    return childFiltered;
}

/**
 * Esta encargada de mantener un llamado a la función auxiliar de todos los datos a almacenar en la colección Graphics
 * @param child Lactante con todos los datos a guardar en la BD
 */
 function addChildGraphic( child: any ) {
    addDataGraphic("birthplace", child.birth_data.birthplace);
    addDataGraphic("type_of_birth", child.birth_data.type_of_birth);
    addDataGraphic("gestional_age", child.birth_data.gestional_age.toString());
    addDataGraphic("gender", child.birth_data.gender);
    addDataGraphic("birth_weight", child.birth_data.birth_weight.toString());
    addDataGraphic("skin_to_skin_contact", isTrueOrFalse(child.birth_data.skin_to_skin_contact));
    addDataGraphic("breastfeeding_b4_2hours", isTrueOrFalse(child.birth_data.breastfeeding_b4_2hours));
    addDataGraphic("use_of_pacifier", isTrueOrFalse(child.birth_data.use_of_pacifier));
    addDataGraphic("post_discharge_feeding", child.birth_data.post_discharge_feeding.toString());
    addDataGraphic("joint_accommodation", isTrueOrFalse(child.birth_data.joint_accommodation));
    addDataGraphic("has_suplement", isTrueOrFalse(child.birth_data.has_suplement));
    addDataGraphic("why_recived_suplement", child.birth_data.why_recived_suplement);
    addDataGraphic("planned_pregnancy", isTrueOrFalse(child.gestacion_data.planned_pregnancy));
    addDataGraphic("assisted_fertilization", isTrueOrFalse(child.gestacion_data.assisted_fertilization));
    addDataGraphic("previous_lactaction", child.gestacion_data.previous_lactaction);
    addDataGraphic("duration_of_past_lactaction_in_months", child.gestacion_data.duration_of_past_lactaction_in_months.toString());
    addDataGraphic("breastfeeding_education", isTrueOrFalse(child.gestacion_data.breastfeeding_education));
    addDataGraphic("nutritional_status_mother", child.gestacion_data.nutritional_status_mother);

    //se valida que el arreglo no venga vacío
    if ( child.gestacion_data.diseases_during_pregnancy.length > 0 ){
        addDataGraphic("diseases_during_pregnancy", child.gestacion_data.diseases_during_pregnancy);
    }
}

/**
 * Esta encargada de mantener un llamado a la función auxiliar de todos los datos a eliminar en la colección Graphics
 * @param child Madre con todos los datos a eliminar en la BD
 */
 function deleteChildGraphic( child: any ) {
    deleteDataGraphic("birthplace",child.birth_data.birthplace);
    deleteDataGraphic("type_of_birth", child.birth_data.type_of_birth);
    deleteDataGraphic("gestional_age", child.birth_data.gestional_age.toString());
    deleteDataGraphic("gender", child.birth_data.gender);
    deleteDataGraphic("birth_weight", child.birth_data.birth_weight.toString());
    deleteDataGraphic("skin_to_skin_contact", isTrueOrFalse(child.birth_data.skin_to_skin_contact));
    deleteDataGraphic("breastfeeding_b4_2hours", isTrueOrFalse(child.birth_data.breastfeeding_b4_2hours));
    deleteDataGraphic("use_of_pacifier", isTrueOrFalse(child.birth_data.use_of_pacifier));
    deleteDataGraphic("post_discharge_feeding", child.birth_data.post_discharge_feeding.toString());
    deleteDataGraphic("joint_accommodation", isTrueOrFalse(child.birth_data.joint_accommodation));
    deleteDataGraphic("has_suplement", isTrueOrFalse(child.birth_data.has_suplement));
    deleteDataGraphic("why_recived_suplement", child.birth_data.why_recived_suplement);
    deleteDataGraphic("planned_pregnancy", isTrueOrFalse(child.gestacion_data.planned_pregnancy));
    deleteDataGraphic("assisted_fertilization", isTrueOrFalse(child.gestacion_data.assisted_fertilization));
    deleteDataGraphic("previous_lactaction", child.gestacion_data.previous_lactaction);
    deleteDataGraphic("duration_of_past_lactaction_in_months", child.gestacion_data.duration_of_past_lactaction_in_months.toString());
    deleteDataGraphic("breastfeeding_education", isTrueOrFalse(child.gestacion_data.breastfeeding_education));
    deleteDataGraphic("nutritional_status_mother", child.gestacion_data.nutritional_status_mother);

    //se valida que el arreglo no venga vacío
    if ( child.gestacion_data.diseases_during_pregnancy.length > 0 ){
        deleteDataGraphic("diseases_during_pregnancy", child.gestacion_data.diseases_during_pregnancy);
    }
}

/**
 * Esta encargada de devolver el valor de un booleano pero cambiado a "si" o "no"
 * @param option valor booleano que se va a ingresar a la condicional if
 */
function isTrueOrFalse(option: any){
    if(option){
        return "Si";
    }else{
        return "No";
    }
}
