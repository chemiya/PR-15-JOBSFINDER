import { Col, Container, Row } from 'reactstrap';

import React, { useState } from 'react';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useNavigate } from 'react-router-dom';


const CartaOferta = ({ item }) => {
  const navigate = useNavigate();//para navegar
const clickOferta=(id)=>{
  
navigate("/detalleOferta/"+id)
}

  return (
    <Col md="4"className='' onClick={() => clickOferta(item.idOferta)}>
      <div className="d-flex flex-column align-items-center carta-oferta h-100">


        <div className="carta-oferta-arriba">
          <div className='carta-oferta-linea d-flex'>
            <div className='w-50 d-flex justify-content-center align-items-center '>
              <FontAwesomeIcon icon={faBriefcase} className="icono-cartaOferta" />
            </div>

            <div className='w-50 justify-content-center d-flex align-items-center '>
              <div>{item.username}</div>

            </div>
          </div>

          <div className='carta-oferta-linea d-flex mt-2'>
            <div className='w-50 d-flex justify-content-center align-items-center '>
              <FontAwesomeIcon icon={faUnlock} className="icono-cartaOferta" />
            </div>

            <div className='w-50 justify-content-center d-flex align-items-center '>
              <div>{item.estado}</div>

            </div>
          </div>

        </div>

        <div className="carta-oferta-abajo mt-2">
          <p>{item.descripcion}</p>
        </div>
      </div>
    </Col>
  )
}

export default CartaOferta