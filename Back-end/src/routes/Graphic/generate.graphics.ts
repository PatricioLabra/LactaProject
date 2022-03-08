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

    } else {
        let option;
        
        //trabajamos con múltiples options
        if ( Array.isArray(name) ){
            for ( let i = 0; i < name.length; i++ ){
                option = dataFound.options.find((object:any) =>  object.name.toUpperCase() === name[i].toUpperCase());

                insertDataInOptions(option, name[i], dataFound);
            } 

        //se trabaja con 1 solo option
        } else {
            option = dataFound.options.find((object:any ) => object.name.toUpperCase() === name.toUpperCase());
            
            insertDataInOptions(option, name, dataFound);
        }

        //se actualiza en la BD
        await Graphic.findByIdAndUpdate(dataFound._id, dataFound);
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
    
    if ( option ){
        var position: number = dataFound.options.findIndex((object:any ) => object.name.toUpperCase() === name.toUpperCase());

        //se le suma 1 al value
        dataFound.options[position].value = dataFound.options[position].value + 1;
  
    } else {

        //se crea
        const newOption = {"name": name, "value": 1}
        
        //se inserta en el arreglo
        dataFound.options.push(newOption);
    }
}

/**
 * Encargada de eliminar de la colección Graphic lo que sea solicitado e ingresado.
 * Elimina 1 dato individual (String) o un array de String
 * @param name_data Nombre del dato a obtener de la colección
 * @param name Nombre de las Options a eliminar
 */
export async function deleteDataGraphic( name_data: string , name: string  ){

    const query = {"name_data": name_data};

    //se obtiene el dato de la colección
    let dataFound = await Graphic.findOne(query);

    if ( dataFound ){
        let option;

        //si es un array a eliminar
        if ( Array.isArray(name) ){

            for ( let i = 0; i < name.length; i++ ){
                option = dataFound.options.find( (object:any) =>  object.name.toUpperCase() === name[i].toUpperCase());
                
                deleteDataInOptions(option, name[i], dataFound);
            } 

        //si es 1 solo dato
        } else {
            option = dataFound.options.find( (object:any ) => object.name.toUpperCase() === name.toUpperCase());
            
            deleteDataInOptions(option, name, dataFound);
        }

        //se actualiza en la BD
        await Graphic.findByIdAndUpdate(dataFound._id, dataFound);
    }
}

/**
 * Función auxiliar que apoya a "deleteDataGraphic". Esta se encarga de eliminar (en caso de que value = 1) o descontar el value 
 * (en caso de que sea > 1) del array options.
 * @params dataFound, Dato de la colección a editar
 * @params name, nombre de la opción a eliminar del arreglo options del dataFound
 * @params option, objeto del arreglo (options) del dataFound
 */
async function deleteDataInOptions( option: any, name: string, dataFound: any ) {

    if ( option ){
        var position: number = dataFound.options.findIndex( (object:any) => object.name.toUpperCase() === name.toUpperCase());

        //si el value es igual a 1 
        if (option.value === 1){

            //se elimina la opción del arreglo
            position !== -1 && dataFound.options.splice( position,1);

        } else {

            //si es mayor a uno 
            if (option.value > 1){

                //se le resta uno al value
                dataFound.options[position].value = dataFound.options[position].value - 1;
            }
        }
    } 
}
