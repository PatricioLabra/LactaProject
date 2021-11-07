import { RequestHandler } from "express";
import { createHmac } from "crypto";

export const signUp: RequestHandler = async (req, res) => {
    return res.send('todo ok prueba');   
}
