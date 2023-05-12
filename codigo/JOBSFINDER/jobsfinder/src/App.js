import logo from './logo.svg';
import './App.css';
import { Route, Routes,Navigate } from "react-router-dom";
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
import CerrarOferta from "./vistas/CerrarOferta";

import DetalleOfertaVista from "./vistas/DetalleOfertaVista";
import DetalleUsuarioVista from "./vistas/DetalleUsuarioVista";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'JobsFinder';
  }, []);


  return (
    <div className='app'>{/**efino las rutas y los componentes a los que voy */}
      <Routes>
      <Route path="*" element={<Navigate to='/principal' />} />
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
        <Route path="/cerrarOferta/:id" element={<CerrarOferta/>} />
        <Route path="/detalleOferta/:id" element={<DetalleOfertaVista/>} />
        <Route path="/detalleUsuario/:id" element={<DetalleUsuarioVista/>} />
   
      </Routes>

      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={true}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </div>
  );
}

export default App;
