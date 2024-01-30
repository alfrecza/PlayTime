
const NuevoPassword = () => {
  return (
    <div>
        <h1 className="font-bold capitalize text-5xl text-white bg-opacity-90">Recupera tu acceso y no pierdas <span className="text-green-500">tus beneficios</span></h1>
        <form action="" className="bg-white w-full py-8 px-10 mt-10">
            <div className="mb-5">
                <label htmlFor="password" className="block text-gray-600 uppercase text-lg font-bold">Nueva Password</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="password" id="password" placeholder="Introduce tu nueva password"/>
            </div>
            <div className="">
                <label htmlFor="repetirPassword" className="block text-gray-600 uppercase text-lg font-bold">Repetir password</label>
                <input className="w-full p-4 bg-gray-200 outline-green-500" type="password" id="repetirPassword" placeholder="Repite tu password"/>
            </div>
            <input type="submit" className="w-2/3 bg-green-500 p-4 uppercase font-bold text-lg mx-auto block text-white mt-10 cursor-pointer rounded hover:bg-green-600" value={"Crear cuenta"}/>
        </form>
    </div>
  )
}

export default NuevoPassword
