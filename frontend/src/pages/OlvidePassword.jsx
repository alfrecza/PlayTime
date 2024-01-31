import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import Alerta from "../components/Alerta"

const OlvidePassword = () => {
  const [alerta, setAlerta] = useState({})
  const [email, setEmail] = useState('')
  const [emailEnviado, setEmailEnviado] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if(email === '') {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios/olvide-password`, {email})
      setAlerta({
        msg: data.msg,
        error: false
      })
      setEmailEnviado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

  return (
    <div>
        <h1 className="font-bold capitalize text-5xl text-white bg-opacity-90 mb-10">Recupera tu acceso y no pierdas <span className="text-green-500">tus beneficios</span></h1>
        {msg && <Alerta alerta={alerta}/>}
        {emailEnviado ? (
          <div className="flex justify-center">
          <Link to={'/'} className="text-green-500 py-5 text-sm uppercase">Inicia sesión</Link>
          </div> 
        ) 
        : (
          <>
            <form action="" className="bg-white w-full py-8 px-10 mt-5" onSubmit={handleSubmit}>
              <div className="">
                  <label htmlFor="email" className="block text-gray-600 uppercase text-lg font-bold">Email</label>
                  <input className="w-full p-4 bg-gray-200 outline-green-500" type="email" id="email" placeholder="Introduce tu email de registro" value={email} onChange={e => setEmail(e.target.value)}/>
              </div>
              <input type="submit" className="w-2/3 bg-green-500 p-4 uppercase font-bold text-lg mx-auto block text-white mt-10 cursor-pointer rounded hover:bg-green-600" value={"Enviar instrucciones"}/>
            </form>
            <div className="flex justify-center">
            <Link to={'/registrar'} className="text-green-500 py-5 text-sm uppercase">¿No tienes una cuenta? Regístrate</Link>
            </div>     
          </>     
        )}

    </div>
  )
}

export default OlvidePassword
