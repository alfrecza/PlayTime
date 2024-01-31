



const Alerta = ({alerta}) => {

    const {msg, error} = alerta

    return (
        <div>
            <p className={`${error ? 'from-red-500 to-red-600'  : 'from-green-500 to-green-700'} bg-gradient-to-br text-center font-semibold uppercase text-white py-4`}>{msg}</p>
        </div>
    )
}

export default Alerta