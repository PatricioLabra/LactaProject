import { RequestHandler } from "express";
import { createHmac } from "crypto";
import User from './user.model';
import { signToken } from "../jwt";
import { Types } from "mongoose";

export const signUp: RequestHandler = async (req, res) => {
    const { name, rut ,password, mail, permission_level} = req.body;

    if(!rut || !password || !name || !mail || !permission_level){
        return res.status(400).send({ succes: false, message: 'Error: datos inválidos'+ req.body });
    }

    const userFound = await User.findOne({ name });

    if(userFound){
        return res.status(301).send({ succes: false, message: 'Error: el usuario ingresado ya existe en el sistema.' });
    }

    const newUser = new User(req.body);

    await newUser.save();

    const token = signToken(newUser._id);

    return res.status(201).send({ success: true,token });
}

export const getUserName: RequestHandler = async (req, res) => {
    const userFound = await User.findOne({ nombre: req.params.name });

    if(!userFound){
        return res.status(404).send({ success: false, message: 'Error: el usuario ingresado no existe en el sistema.'});                   
    }

    const userInfo = destructureUser(userFound)

	return res.status(200).send({
		success:true, 
		userInfo: userInfo
	});

}

export const editUser: RequestHandler = async (req, res) => {
    const _id = req.params.id;
    const updateUser = req.body;
     
    //se valida el id
    if ( !Types.ObjectId.isValid( _id)){
        return res.status(400).send({ succes: false, message:'Error: el id ingresado no es valido.' });
    }

    const userFound = await updateUser.findById( _id);

    //se valida si es que existe el usuario
    if(!userFound){
        return res.status(404).send({ success: false, message:'Error: el usuario no existe en el sistema.' });
    }

    await User.findByIdAndUpdate(_id, updateUser);

    return res.status(200).send({ sucess: true, message:'Se modifico exitosamente al usuario!'});
}

export const deleteUser: RequestHandler = async (req, res) => {
    const _id = req.params.id;

    //se valida el id
    if ( !Types.ObjectId.isValid( _id)){
        return res.status(400).send({ succes: false, message:'Error: el id ingresado no es valido.' });
    }

    await User.findByIdAndDelete(_id);

    return res.status(200).send({ succes: true, message:'Se elimino exitosamente el usuario!' });

}

export const signIn: RequestHandler = async (req, res) => {
    const { rut, password } = req.body;
    const user = await User.findOne({ rut });
    console.log("error");
    if(!user){
        return res.status(404).send({ success: false, message: 'Error: el usuario ingresado no existe en el sistema.' });
    }
    console.log("error");
    if (user.password !== password){
        return res.status(400).send({ success:false, message: 'Error: la password ingresada no es válida.' });
    }
    console.log("error");
    const token = signToken(user._id);
    console.log("error");
    return res.status(200).send({ succes: true, token, message: "Se ingreso correctamente! =D"});
}

export const searchUser: RequestHandler = async (req, res) => {

}

export const getPass: RequestHandler = async (req, res) => {

}

export const getUsers: RequestHandler = async (req, res) => {
    const users = await User.find();

    if(!users){
        return res.status(200).send({ success: true, message:'No se encontro ningun usuario en el sistema :(.'}) ;
    }
    
    return res.status(200).send({
		success:true, 
		userInfo: users
	});
}

export const changePass: RequestHandler = async (req, res) => {

}

function destructureUser(user:any){
	const { name } = user;

	return {
		name
	};
}
