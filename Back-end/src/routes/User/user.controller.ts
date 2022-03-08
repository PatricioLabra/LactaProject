import { RequestHandler } from "express";
import { createHmac } from "crypto";
import User, { IUser } from './user.model';
import { signToken } from "../jwt";
import { Types } from "mongoose";

/**
 * Funcion que maneja la peticion de agregar un nuevo usuario al sistema
 * @route Post '/user/signUp'
 * @param req req Request de la petición, se espera que tenga la información del nuevo usuario
 * @param res Response, retornará el token del usuario con un mensaje de creacion correcta mas un mensaje true
 */
export const signUp: RequestHandler = async (req, res) => {
    const { name, rut ,password, mail, permission_level} = req.body;

    //Se valida que los atributos sean validos
    if( !rut || !password || !name || !mail || !permission_level ){
        return res.status(400).send({ success: false, data:{}, message: 'Error: datos inválidos'+ req.body });
    }

    const userFound = await User.findOne({ rut });

    //Se valida la existencia de algun usuario con el nombre ingresado
    if( userFound ){
        return res.status(301).send({ success: false, data:{}, message: 'Error: el usuario ingresado ya existe en el sistema.' });
    }

    // Saving a new User

    const newUser: IUser = new User({
        name: req.body.name,
        rut: req.body.rut,
        password: req.body.password,
        mail: req.body.mail,
        permission_level: req.body.permission_level
    });
    
    newUser.password = await newUser.encrypPassword(newUser.password);
    const savedUser = await newUser.save();

    const token = signToken(savedUser._id);

    return res.status(201).send({ success: true, data: { token }, message: 'Se ha creado correctamente el nuevo usuario.' });
}

/**
 * Funcion que maneja la peticion del nombre de un usuario en particular del sistema
 * @route Get /user/:id
 * @param req Request, se espera que tenga el id del usuario
 * @param res Response, returna true, el nombre del usuario ingresado por id y un mensaje de confirmacion
 */
export const getUserName: RequestHandler = async (req, res) => {

    const _id = req.params.id;
    const userFound = await User.findById(_id);

    //Se valida el _id ingresado
    if( !userFound ){
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario ingresado no existe en el sistema.' });                   
    }

    //Se guarda el nombre del usuario ingresado
    const userInfo = userFound.name;

	return res.status(200).send({
		success:true, 
		data: userInfo,
        message: 'Se obtuvo exitosamente el nombre del usuario.'
	});
}

/**
 * Funcion que maneja la peticion de actualizar un usuario en el sistema
 * @route Put /user/:id
 * @param req Request, se espera que tenga la informacion del usuario modificada
 * @param res Response, returna true, un data vacio y un mensaje de confirmacion
 */
export const editUser: RequestHandler = async (req, res) => {
    const _id = req.params.id;
    const updateUser = req.body;
     
    //se valida el id
    if ( !Types.ObjectId.isValid(_id) ){
        return res.status(400).send({ success: false, data:{}, message: 'Error: el id ingresado no es valido.' });
    }

    const userFound = await User.findById(_id);

    //se valida si es que existe el usuario
    if( !userFound ){
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario no existe en el sistema.' });
    }

    //Se realiza el cambio
    await User.findByIdAndUpdate(_id, updateUser);

    return res.status(200).send({ success: true, data:{}, message: 'Se modifico exitosamente al usuario!' });
}

/**
 * Funcion que maneja la eliminacion de un usuario en el sistema
 * @route Delete /user/:id
 * @param req Request, se espera que tenga el id del usuario a eliminar
 * @param res Response, returna true, un data vacio y un mensaje de confirmacion
 */
export const deleteUser: RequestHandler = async (req, res) => {
    const _id = req.params.id;

    //se valida el id
    if ( !Types.ObjectId.isValid(_id) ){
        return res.status(400).send({ success: false, data:{}, message: 'Error: el id ingresado no es valido.' });
    }

    const userFound = User.findById(_id);

    if( !userFound ){
        return res.status(404).send({ success: false, data:{}, message:'Error: El usuario solicitado no existe en el sistema.' });
    }

    //Se busca el usuario y se elimina
    await User.findByIdAndDelete(_id);

    return res.status(200).send({ success: true, data:{}, message: 'Se elimino exitosamente el usuario.' });
}

/**
 * Funcion que maneja el inicio de sesion de un Usuario del sistema
 * @route Post /user/signin
 * @param req Request, se espera que tenga el id del usuario a eliminar
 * @param res Response, returna true, el token del usuario y un mensaje de confirmacion
 */
export const signIn: RequestHandler = async (req, res) => {
    const userFound = await User.findOne({ rut: req.body.rut });

    //Se valida si existe el usuario
    if( !userFound ){
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario ingresado no existe en el sistema.' });
    }

    const correctPassword: boolean = await userFound.validatePassword(req.body.password);
    if(!correctPassword) return res.status(400).send({ success: false, data:{}, message: 'Error: clave invalida.' });

    const token = signToken(userFound._id);

    const userInfo = {
        name: userFound.name,
        rut: userFound.rut,
        mail: userFound.mail,
        permission_level: userFound.permission_level
    };

    return res.status(200).send({ success: true, data:{ token, userInfo }, message: 'Se ingreso correctamente.' });
}

export const getPass: RequestHandler = async (req, res) => {

}

/**
 * Funcion que maneja la peticion de obtener todos los usuarios del sistema por su nombre y rut
 * @route Get /user
 * @param req Request, no contiene nada
 * @param res Response, returna true, los nombres y rut de todos los usuarios y un mensaje de confirmacion
 */
export const getUsers: RequestHandler = async (req, res) => {
    const users = await User.find();

    //Se valida la existencia del usuario
    if( !users ){
        return res.status(200).send({ success: true, data:{}, message: 'No se encontro ningun usuario en el sistema.' });
    }
    
    //Se guarda el nombre y rut de todos los usuarios
    const nameUsers = users.map(user => { return { name: user.name, rut: user.rut, id: user._id }});
    
    return res.status(200).send({
		success:true, 
		data: nameUsers,
        message: 'Se obtuvo los usuarios se manera exitosa.'
	});
}

/**
 * Funcion que maneja la peticion de cambiar la password actual del usuario
 * @route Put user/change/pass/:id
 * @param req Request, el id del usuario a modificar la password
 * @param res Response, returna true, el token del usuario y un mensaje de confirmacion
 */
export const changePass: RequestHandler = async (req, res) => {
    const id = req.params.id;
    const userFound = await User.findById(id);
    const new_password = req.body.new_password;

    //se valida el id
    if ( !Types.ObjectId.isValid(id) ){
         return res.status(400).send({ success: false, data:{}, message: 'Error: el id ingresado no es valido.' });
    }

    //Se valida si existe el usuario
    if( !userFound ){
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario ingresado no existe en el sistema.' });
    }

    const correctPassword: boolean = await userFound.validatePassword(req.body.password);
    if(!correctPassword) return res.status(400).send({ success: false, data:{}, message: 'Error: clave invalida.' });

    userFound.password = await userFound.encrypPassword(new_password);

    //Se realiza el cambio
    await User.findByIdAndUpdate(req.params.id, userFound);

    const token = signToken(req.params.id);

    return res.status(200).send({ success: true, data:{ token }, message: 'Se modifico la password correctamente.' });
}
