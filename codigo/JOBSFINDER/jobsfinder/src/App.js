import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Principal from "./vistas/Principal";
import Identificacion from "./vistas/Identificacion";
import Registro from "./vistas/Registro";
import VistaUsuario from "./vistas/VistaUsuario";
import BuscarUsuario from "./vistas/BuscarUsuario";
import BuscarOferta from "./vistas/BuscarOferta";
import EditarPerfil from "./vistas/EditarPerfil";
import OfertasGuardadas from "./vistas/OfertasGuardadas";
import OfertasInscritas from "./vistas/OfertasInscritas";
import OfertasPublicadas from "./vistas/OfertasPublicadas";
import CrearOferta from "./vistas/CrearOferta";
import DetalleOferta from "./vistas/DetalleOferta";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='app'>{/**efino las rutas y los componentes a los que voy */}
      <Routes>
        <Route path="/principal" element={<Principal />} />
        <Route path="/identificacion" element={<Identificacion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/vistaUsuario" element={<VistaUsuario />} />
        <Route path="/buscarUsuario" element={<BuscarUsuario />} />
        <Route path="/buscarOferta" element={<BuscarOferta />} />
        <Route path="/editarPerfil" element={<EditarPerfil />} />
        <Route path="/ofertasGuardadas" element={<OfertasGuardadas />} />
        <Route path="/ofertasPublicadas" element={<OfertasPublicadas />} />
        <Route path="/ofertasInscritas" element={<OfertasInscritas />} />
        <Route path="/ofertasGuardadas" element={<OfertasGuardadas/>} />
        <Route path="/crearOferta" element={<CrearOferta/>} />
        <Route path="/detalleOferta/:id" element={<DetalleOferta/>} />
   
      </Routes>
    </div>
  );
}

export default App;
