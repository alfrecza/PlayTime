import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'
import { Link } from 'react-router-dom'

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({})
  const params = useParams()
  const {id} = params

  useEffect(() => {
    const validarToken = async () => {
      try {
        const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/usuarios/confirmar/${id}`)
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
    validarToken()
  }, [])

  const {msg} = alerta

  return (
    <div>
      <h1 className="font-bold capitalize text-5xl text-white bg-opacity-90 mb-10">Confirma tu cuenta y comienza a  <span className="text-green-500">agendar turnos</span></h1>
      {msg && <Alerta alerta={alerta}/>}
      {!alerta.error && (
        <Link to={'/'} className="text-green-500 py-5 text-sm uppercase flex justify-center mt-5">Inicia Sesión</Link>
      )}

    </div>
  )
}

export default ConfirmarCuenta
