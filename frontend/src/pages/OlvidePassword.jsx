import { Link } from "react-router-dom"


const OlvidePassword = () => {
  return (
    <div>
        <h1 className="font-bold capitalize text-5xl text-white bg-opacity-90">Recupera tu acceso y no pierdas <span className="text-green-500">tus beneficios</span></h1>
        <form action="" className="bg-white w-full py-8 px-10 mt-10">
            <div className="">
                <label htmlFor="email" className="block text-gray-600 uppercase text-lg font-bold">Email</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="email" id="email" placeholder="Introduce tu email de registro"/>
            </div>
            <input type="submit" className="w-2/3 bg-green-500 p-4 uppercase font-bold text-lg mx-auto block text-white mt-10 cursor-pointer rounded hover:bg-green-600" value={"Enviar instrucciones"}/>
        </form>
        <div className="flex justify-between">
        <Link to={'/registrar'} className="text-green-500 py-5 text-sm uppercase">¿No tienes una cuenta? Regístrate</Link>
        <Link to={'/registrar'} className="text-green-500 py-5 text-sm uppercase">¿No tienes una cuenta? Regístrate</Link>
        </div>
    </div>
  )
}

export default OlvidePassword
