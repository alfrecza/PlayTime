import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import OlvidePassword from './pages/OlvidePassword'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'

function App() {
  return (
    <div class="absolute top-0 z-[-2] min-h-full w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(74,222,128,0.2),rgba(255,255,255,0))]">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path='registrar' element={<Registrar/>}/>
              <Route path='olvide-password' element={<OlvidePassword/>}/>
              <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
              <Route path='/confirmar/:id' element={<ConfirmarCuenta/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
