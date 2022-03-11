export default {
    //json web token
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',

    SECONDS_MINUTE : 60,                    //variable utilizada para convertir ciertos parametros numericos 
    SECONDS_DAY: 86400,                     //variable utilizada para generar token en el endpoint signUp
}