import { RequestHandler } from "express";
import Graphic from './graphic.model';

/**
 * Función que maneja la petición de obtener un objeto con sus datos para una posterior grafica de ellos.
 * @route Get /graphic/:keyword
 * @param req Request de la petición, se espera que tenga la la información del objeto.
 * @param res Response, retorna un un object con success:true, data:{ object:{}} y un message: "String" del objeto obtenido.
 */
export const getDataGraphic: RequestHandler = async (req, res) => {
    const name_data = req.params.keyword;

    if(!name_data){
        return res.send(400).send({ success: false, data:{}, message: 'ERROR: parametro ingresado invalido ' });
    }

    const dataFound = await Graphic.findOne({ name_data: req.params.keyword });
    
    if(!dataFound){
        return res.status(404).send({ success: false, data:{}, message: 'Error: el grafico ingresado no existe en el sistema.' });
    }

    if(name_data == "has_suplement"){
        const query = { "name_data": "why_recived_suplement" };
        const recived_suplement = await Graphic.findOne(query);

        const why_recived_suplement = destructureData(recived_suplement);
        const has_suplement = destructureData(dataFound);
        
        return res.status(200).send({ success: true, data:{ has_suplement, why_recived_suplement }, message: 'Se envia exitosamente el grafico solicitado.' });
    }

    const data = destructureData( dataFound );

    return res.status(200).send({ success: true, data:{ data }, message: 'Se envia exitosamente el grafico solicitado.' });
}

/**
 * Extrae los atributos especificos necesarios para que utilice el front-end
 * @param dataFound informacion del grafico extraido de la base de datos
 * @returns Object con los atributos necesarios para graficar
 */
function destructureData( dataFound: any ){
    
    let options:any = [];

    if (Array.isArray(dataFound.options)){
        for (let i = 0; i < dataFound.options.length; i++){
            options[i] = {"name": dataFound.options[i].name, "value": dataFound.options[i].value};
        } 
    }else{
        options[0] = {"name": dataFound.options.name, "value": dataFound.options.value};
    }

    const dataFiltered = {
        name_data: dataFound.name_data,
        options: options
    };
 
    return dataFiltered;
}
