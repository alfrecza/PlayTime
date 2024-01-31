import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
const app = express()
app.use(express.json())

dotenv.config()
conectarDB()


//Configurar cors 

const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)) {
            //puede consultar la api
            callback(null, true)
        } else {
            //No puede consultar la api
            callback(new Error("Error de cors"))
        }
    }
}

app.use(cors(corsOptions))

//Routing
app.use('/api/usuarios', usuarioRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('Servidor iniciado correctamente')
})


