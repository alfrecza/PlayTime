import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import { Link } from "react-router-dom"

const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [tokenConfirmado, setTokenConfirmado] = useState(false)
  const [passwordCambiada, setPasswordCambiada] = useState(false)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const {token} = params

  

  useEffect(() => {
    const validarToken = async () => {
      try {
        const respuesta = await axios(`${import.meta.env.VITE_BACKEND_URL}/usuarios/olvide-password/${token}`)
        setTokenConfirmado(true)
      } catch (error) {
        setTokenConfirmado(false)
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    validarToken()
  }, [])

  const {msg} = alerta

  const handleSubmit = async e => {
    e.preventDefault()

    if([password, repetirPassword].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }

    if(password !== repetirPassword) {
      setAlerta({
        msg: "Los password deben coincidir",
        error: true
      })
      return
    }

    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios/olvide-password/${token}`, {password})
      
      setPasswordCambiada(true)
      setAlerta({
        msg: "Password modificada correctamente",
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <div>
        <h1 className="font-bold capitalize text-5xl text-white bg-opacity-90 mb-10">Recupera tu acceso y no pierdas <span className="text-green-500">tus beneficios</span></h1>

        {alerta.error && <Alerta alerta={alerta}/>}

        {tokenConfirmado && !passwordCambiada ? (
          <form action="" className="bg-white w-full py-8 px-10 mt-5" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="password" className="block text-gray-600 uppercase text-lg font-bold">Nueva Password</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="password" id="password" placeholder="Introduce tu nueva password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="">
                <label htmlFor="repetirPassword" className="block text-gray-600 uppercase text-lg font-bold">Repetir password</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="password" id="repetirPassword" placeholder="Repite tu password" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)}/>
            </div>
            <input type="submit" className="w-2/3 bg-green-500 p-4 uppercase font-bold text-lg mx-auto block text-white mt-10 cursor-pointer rounded hover:bg-green-600" value={"Crear cuenta"}/>
          </form>  
                  
        ) : ''}

        {alerta.error === false && (
          <Alerta alerta={alerta}/>
        )}
        
        {passwordCambiada && tokenConfirmado ? (
          <Link to={'/'} className="text-green-500 py-5 text-sm uppercase flex justify-center mt-5">Inicia Sesión</Link>
        ) : ''}

    </div>
  )
}

export default NuevoPassword
