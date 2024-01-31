import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import Alerta from "../components/Alerta"

const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    
    if([nombre,email,password,repetirPassword].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }

    if(!emailRegex.test(email)) {
      setAlerta({
        msg: "El email introducido no es válido",
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
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios`, {nombre, password, email})
      setAlerta({
        msg: data.msg,
        error: false
      })
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
        <h1 className="font-bold capitalize text-5xl text-white bg-opacity-90 mb-10">Registrate para comenzar agendando turnos y <span className="text-green-500">conocer tus beneficios</span></h1>
        {msg && <Alerta alerta={alerta}/>}
        <form action="" className="bg-white w-full py-8 px-10 mt-5" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="nombre" className="block text-gray-600 uppercase text-lg font-bold">Nombre</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="text" id="nombre" placeholder="Introduce tu nombre" onChange={e => setNombre(e.target.value)} value={nombre}/>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block text-gray-600 uppercase text-lg font-bold">Email</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="email" id="email" placeholder="Introduce tu email " onChange={e => setEmail(e.target.value)} value={email}/>
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block text-gray-600 uppercase text-lg font-bold">Password</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="password" id="password" placeholder="Introduce tu password" onChange={e => setPassword(e.target.value)} value={password}/>
            </div>
            <div className="">
                <label htmlFor="repetirPassword" className="block text-gray-600 uppercase text-lg font-bold">Repetir password</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="password" id="repetirPassword" placeholder="Repite tu password" onChange={e => setRepetirPassword(e.target.value)} value={repetirPassword}/>
            </div>
            <input type="submit" className="w-2/3 bg-green-500 p-4 uppercase font-bold text-lg mx-auto block text-white mt-10 cursor-pointer rounded hover:bg-green-600" value={"Crear cuenta"}/>
        </form>
        <div className="flex justify-between">
          <Link to={'/'} className="text-green-500 py-5 text-sm uppercase">¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link to={'/olvide-password'} className="text-green-500 py-5 text-sm uppercase">Olvide mi password</Link>
        </div>
    </div>
  )
}

export default Registrar
