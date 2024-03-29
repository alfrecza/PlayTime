import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js"

const registrar = async (req, res) => {

    const {email} = req.body
    const existe = await Usuario.findOne({email})
    console.log(existe)
    
    if(existe) {
        const error = new Error('El usuario ya se encuentra registrado')
        return res.status(400).json({msg: error.message})
    }
    
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        const usuarioAlmacenado = await usuario.save()
        emailRegistro(usuario)
        res.json({msg: "Se envió un email para confirmar tu cuenta"})
    } catch (error) {
        console.log(error)
    }

}

const autenticar = async (req, res) => {

    const {email, password} = req.body

    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})

    if(!usuario) {
        const error = new Error("El usuario no existe")
        return res.status(402).json({msg: error.message})
    }

    //Comprobar si el usuario esta confirmado
    if(!usuario.confirmado) {
        const error = new Error("El usuario no esta confirmado")
        return res.status(403).json({msg: error.message})
    }

    //Comprobar password

    if(await usuario.comprobarPassword(password)) {
        res.json({
            _id : usuario._id,
            nombre: usuario.nombre,
            email : usuario.email,
            token: generarJWT(usuario._id)
        })
    } else {
        const error = new Error("El password es incorrecto")
        return res.status(404).json({msg: error.message})
    }

}

const confirmar = async (req,res) => {
    const {token} = req.params

    const usuarioConfirmar = await Usuario.findOne({token})
    if(!usuarioConfirmar) {
        const error = new Error("El token no es válido")
        return res.status(402).json({msg: error.message})
    }

    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ''
        await usuarioConfirmar.save()
        res.json({msg: "Usuario confirmado correctamente"})
    } catch (error) {
        console.log(error)
    }
}

const olvidePassword = async (req,res) => {
    const {email} = req.body
    const usuario = await Usuario.findOne({email})
    
    if(!usuario) {
        const error = new Error("El usuario no existe")
        return res.status(404).json({msg: error.message})
    }

    try {
        usuario.token = generarId()
        await usuario.save()
        await emailOlvidePassword(usuario)
        res.json({msg: "Hemos enviado un mail con las intrucciones"})
    } catch (error) {
        console.log(error)
    }
}

const confirmarToken = async (req, res) => {
    const {token} = req.params
    const existe = await Usuario.findOne({token})

    if(!existe) {
        const error = new Error("El token introducido no es valido")
        return res.status(403).json({msg: error.message})
    }

    res.json({msg: "Token confirmado correctamente"})
}

const nuevoPassword = async (req, res) => {
    const {password} = req.body
    const {token} = req.params

    const usuario = await Usuario.findOne({token})

    if(usuario) {
        usuario.password = password
        usuario.token = ''
        try {
            await usuario.save()
            res.json({msg: "Password modificada correctamente"})
        } catch (error) {
            console.log("error")
        }
    } else {
        const error = new Error("El token introducido no es válido")
        return res.status(403).json({msg: error.message})
    }

    
}

const perfil = async (req, res) => {
    const {usuario} = req.body
    res.json(usuario)
}

export {registrar, autenticar, confirmar, olvidePassword, confirmarToken, nuevoPassword, perfil}