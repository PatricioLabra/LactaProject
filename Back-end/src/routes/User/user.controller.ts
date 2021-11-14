import { RequestHandler } from "express";
import { createHmac } from "crypto";
import User from './user.model';
import { signToken } from "../jwt";
import { Types } from "mongoose";

export const signUp: RequestHandler = async (req, res) => {
    const { name, rut ,password, mail, permission_level} = req.body;

    if(!rut || !password || !name || !mail || !permission_level){
        return res.status(400).send({ succes: false, data:{}, message: 'Error: datos inválidos'+ req.body });
    }

    const userFound = await User.findOne({ name });

    if(userFound){
        return res.status(301).send({ succes: false, data:{}, message: 'Error: el usuario ingresado ya existe en el sistema.' });
    }

    const newUser = new User(req.body);

    await newUser.save();

    const token = signToken(newUser._id);

    return res.status(201).send({ success: true, data: { token }, message: 'Se ha creado correctamente el nuevo usuario.' });
}

export const getUserName: RequestHandler = async (req, res) => {
    const _id = req.params.id;
    const userFound = await User.findById( _id);
    if(!userFound){
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario ingresado no existe en el sistema.' });                   
    }

    const userInfo = userFound.name;

	return res.status(200).send({
		success:true, 
		data: userInfo,
        message: 'Se obtuvo exitosamente el nombre del usuario.'
	});
}

export const editUser: RequestHandler = async (req, res) => {
    const _id = req.params.id;
    const updateUser = req.body;
     
    //se valida el id
    if ( !Types.ObjectId.isValid( _id)){
        return res.status(400).send({ succes: false, data:{}, message: 'Error: el id ingresado no es valido.' });
    }

    const userFound = await User.findById(_id);

    //se valida si es que existe el usuario
    if(!userFound){
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario no existe en el sistema.' });
    }

    await User.findByIdAndUpdate(_id, updateUser);

    return res.status(200).send({ sucess: true, data:{}, message: 'Se modifico exitosamente al usuario!' });
}

export const deleteUser: RequestHandler = async (req, res) => {
    const _id = req.params.id;

    //se valida el id
    if ( !Types.ObjectId.isValid( _id)){
        return res.status(400).send({ succes: false, data:{}, message: 'Error: el id ingresado no es valido.' });
    }

    await User.findByIdAndDelete(_id);

    return res.status(200).send({ succes: true, data:{}, message: 'Se elimino exitosamente el usuario.' });
}

export const signIn: RequestHandler = async (req, res) => {
    const { rut, password } = req.body;
    const user = await User.findOne({ rut });
    
    if(!user){
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario ingresado no existe en el sistema.' });
    }

    if (user.password !== password){
        return res.status(400).send({ success:false, data:{}, message: 'Error: la password ingresada no es válida.' });
    }

    const token = signToken(user._id);

    return res.status(200).send({ succes: true, data:{ token }, message: 'Se ingreso correctamente.' });
}

export const searchUser: RequestHandler = async (req, res) => {

}

export const getPass: RequestHandler = async (req, res) => {

}

export const getUsers: RequestHandler = async (req, res) => {
    const users = await User.find();

    if(!users){
        return res.status(200).send({ success: true, data:{}, message: 'No se encontro ningun usuario en el sistema.' });
    }

    const nameUsers = users.map(user => { return { name: user.name, rut: user.rut }});
    
    return res.status(200).send({
		success:true, 
		data: nameUsers,
        message: 'Se obtuvo los usuarios se manera exitosa.'
	});
}

export const changePass: RequestHandler = async (req, res) => {

}
