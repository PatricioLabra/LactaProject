import Graphic from "./graphic.model";

/**
 * Encargada de verificar si existe algun dato guardado anteriormente en la colección Graphics.
 * Si no encuentra un dato, lo crea y lo inicializa con value = 1
 * Si encuentra un dato, busca las opciones que coincidan. Si hay coincidencias, el value aumenta en 1. En caso contrario, 
 * crea la nueva option y la inserta en el array de options, iniciandola en value = 1.
 * Esta función se apoya de la función auxiliar "insertDataInOptions"
 * @param name_data Nombre del dato a almacenar en la colección.
 * @param name Nombre de las Options, este puede ser un string o un array de strings.
 */
 export async function addDataGraphic( name_data:any , name: string  ){

    const query = {"name_data": name_data};

    //se obtiene el dato desde la collection
    let dataFound = await Graphic.findOne(query);

    //si no existe
    if( !dataFound ){
        let options:any = [];

        if (Array.isArray(name)){
            for (let i = 0; i < name.length; i++){
                options[i] = {"name": name[i], "value": 1};
            } 

        }else{
            options[0] = {"name": name, "value": 1};
        }

        //se crea
        const newData = {
            "name_data": query.name_data,
            "options": options
        }

       ///se guarda en la bd
        const dataSaved = new Graphic(newData);
        await dataSaved.save();


    //si existe
    } else {
        let option;
        
        //trabajamos con múltiples options
        if ( Array.isArray(name) ){
            for ( let i = 0; i < name.length; i++ ){
                option = dataFound.options.find((object: { name: string; }) => object.name === name[i]);

                insertDataInOptions(option,name[i],dataFound);
            } 

        //se trabaja con 1 solo option
        }else{
            option = dataFound.options.find((object: { name: string; }) => object.name === name);
            
            insertDataInOptions(option,name,dataFound);
        }
    }
}

/**
 * Función auxiliar que apoya a "addDataGraphic". Se encarga de aumentar el value cuando la option 
 * ya exista en la base de datos. En caso contrario, se encarga de crear una nueva y inicializarla en value = 1.
 * @param option variable option a aumentarle el value.
 * @param name Nombre de 1 option.
 * @param dataFound dato actual a editar obtenido desde la BD, el cual se planea reeingresar a la BD ya actualizado.
 */
async function insertDataInOptions( option: any, name: string, dataFound: any ) {
    //si el dato está, se le suma 1 al value
    if ( option ){
        var position: number = dataFound.options.findIndex((object: { name: string; }) => object.name === name);

        //se edita el value
        dataFound.options[position].value = dataFound.options[position].value + 1;

        //se actualiza en la BD
        await Graphic.findByIdAndUpdate(dataFound._id, dataFound);
    
    //si no existe
    } else {
        //se crea
        const newOption = {"name": name, "value": 1}
        
        //se inserta en el arreglo
        dataFound.options.push(newOption);

        //se actualiza en la BD
        await Graphic.findByIdAndUpdate(dataFound._id, dataFound);
    }
}
