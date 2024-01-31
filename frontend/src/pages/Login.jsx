import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"


const Login = () => {
  
  const [alerta, setAlerta] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async e => {
    e.preventDefault() 
    if([email, password].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }

    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios/login`, {email, password})
      console.log(data)
      localStorage.setItem('token', data.token)
      setAlerta({})
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
        <h1 className="font-bold capitalize text-5xl text-white bg-opacity-90 mb-10">Inicia sesión para comenzar agendando turnos y <span className="text-green-500">conocer tus beneficios</span></h1>

        {msg && <Alerta alerta={alerta}/>}

        <form action="" className="bg-white w-full py-8 px-10 mt-5" onSubmit={handleSubmit}>
            <div className="">
                <label htmlFor="email" className="block text-gray-600 uppercase text-lg font-bold">Email</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="email" id="email" placeholder="Introduce tu email de registro" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="mt-5">
                <label htmlFor="email" className="block text-gray-600 uppercase text-lg font-bold">Password</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="password" id="password" placeholder="Introduce tu password de registro" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <input type="submit" className="w-2/3 bg-green-500 p-4 uppercase font-bold text-lg mx-auto block text-white mt-10 cursor-pointer rounded hover:bg-green-600" value={"Iniciar sesión"}/>
        </form>
        <div className="flex justify-between">
          <Link to={'/registrar'} className="text-green-500 py-5 text-sm uppercase">¿No tienes una cuenta? Regístrate</Link>
          <Link to={'/olvide-password'} className="text-green-500 py-5 text-sm uppercase">Olvide mi password</Link>
        </div>
    </div>
  )
}

export default Login
