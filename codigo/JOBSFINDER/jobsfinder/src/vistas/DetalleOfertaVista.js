
import DetalleOfertaCarta from './DetalleOfertaCarta';

import { Col, Container, Row, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import axios from 'axios';



const DetalleOfertaVista = () => {

  let params = useParams();
 

  return (
    <div className='div-exterior-detalle-oferta pb-5'>

    
      <DetalleOfertaCarta ofertaId={params.id} mostrarCerrar={true}/>
    
      

    </div>//div exterior
  )
}

export default DetalleOfertaVista