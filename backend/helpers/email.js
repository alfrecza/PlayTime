import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    const {email, nombre, token} = datos

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "549e5f4e2f461d",
          pass: "51cf9a3a3461b6"
        }
    });

    const info = await transport.sendMail({
        from: '"PlayTime - Administrador de turnos" <cuentas@playtime.com>',
        to:email,
        subject:"PlayTime - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en PlayTime",
        html: `
            <p>Hola: ${nombre} Comprueba tu cuenta en PlayTime</p>
            <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: </p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes eliminar este mensaje</p>
        `
    })
    

}

export const emailOlvidePassword = async (datos) => {
    const {email, nombre, token} = datos
  
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "549e5f4e2f461d",
          pass: "51cf9a3a3461b6"
        }
      });
  
    //Informacion del email
    const info = await transport.sendMail({
        from: '"PlayTime - Administrador de Proyectos" <cuentas@playtime.com>',
        to:email,
        subject:"PlayTime - Restablece tu Password",
        text: "Restablece tu Password",
        html: `
            <p>Hola: ${nombre} has solicitado restablecer tu password</p>
            <p>Sigue el siguiente enlace para generar el nuevo password:</p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a>
            <p>Si tu no solicitaste este email, puedes ignorar este mensaje</p>
        `
    })
  }