const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

/**
 * Envía un correo al usuario notificandole la solicitud de cambio de contraseña.
 * @param user -> el cual contiene todos los datos del usuario.
 */
export async function sendEmailForgotPassword( user: any , token: any){
    try {
        const contentHTML = `     
        <h1>Solicitud de cambio de contraseña de la cuenta de LactaPlanet</h1>
        <p> Estimado/a ${user.name}:</p>
        <p> Hemos recibido una solicitud para recuperar el acceso a la cuenta de LactaPlanet ${user.mail}.</p>
        <p>Si la has enviado tú, puedes clickear el siguiente enlace que tiene una duración de 10 minutos, para poder generar una nueva contraseña. </p>
        <p>https://compact-citizen-346817.rj.r.appspot.com/user/resetPassword/${token}</p>
        <p>Gracias por su paciencia.</p>
        <p>Saludos coordiales.</p> 
        `;

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"LactaPlanet" <lactaproject@gmail.com>', // sender address
            to: user.mail, // list of receivers
            subject: "Alerta de seguridad crítica", // Subject line
            html: contentHTML, // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.log(error);
    }
}

/**
 * Envía un correo al usuario indicando que su contraseña ha sido actualizada.
 * @param user -> el cual contiene todos los datos del usuario.
 */
 export async function sendEmailNewPassword( user: any ){
    try {
        const contentHTML = `
        <h1>Solicitud de cambio de contraseña de la cuenta de LactaPlanet</h1>
        <p> Estimado/a ${user.name}:</p>
        <p> Su contraseña asociada a su cuenta: ${user.mail}, ha sido actualizada de manera exitosa.</p>
        <p>Por favor, cuide de sus contraseñas.</p>
        <p>Gracias por su paciencia. Saludos Coordiales.</p>
        `;

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"LactaPlanet" <lactaproject@gmail.com>', // sender address
            to: user.mail, // list of receivers
            subject: "Actualización de contraseña", // Subject line
            html: contentHTML, // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.log(error);
    }
}