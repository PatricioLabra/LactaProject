export default {
    //json web token
    jwtSecret: process.env.TOKEN_SECRET  || 'secret_key',

    SECONDS_MINUTE : 60,                    //variable utilizada para convertir ciertos parametros numericos 
    SECONDS_DAY: 86400,                     //variable utilizada para generar token en el endpoint signUp

    //Roles
    USER:0,
    ADMIN:1
}