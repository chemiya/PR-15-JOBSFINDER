import { Col, Container, Row } from 'reactstrap';

import React, { useState } from 'react';

import DetalleUsuarioCarta from './DetalleUsuarioCarta';
import { useParams } from "react-router-dom";


const DetalleUsuarioVista = () => {

 

  let params = useParams();
 

  return (
    <div className=' pb-5'>

   
      <DetalleUsuarioCarta usuarioId={params.id}/>
    
      

    </div>//div exterior
  )
}

export default DetalleUsuarioVista