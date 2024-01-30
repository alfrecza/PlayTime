import { Link } from "react-router-dom"


const Registrar = () => {
  
  return (
    <div>
        <h1 className="font-bold capitalize text-5xl text-white bg-opacity-90">Registrate para comenzar agendando turnos y <span className="text-green-500">conocer tus beneficios</span></h1>
        <form action="" className="bg-white w-full py-8 px-10 mt-10">
            <div className="mb-5">
                <label htmlFor="nombre" className="block text-gray-600 uppercase text-lg font-bold">Nombre</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="text" id="nombre" placeholder="Introduce tu nombre"/>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block text-gray-600 uppercase text-lg font-bold">Email</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="email" id="email" placeholder="Introduce tu email "/>
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block text-gray-600 uppercase text-lg font-bold">Password</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="password" id="password" placeholder="Introduce tu password"/>
            </div>
            <div className="">
                <label htmlFor="repetirPassword" className="block text-gray-600 uppercase text-lg font-bold">Repetir password</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="password" id="repetirPassword" placeholder="Repite tu password"/>
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
