import { Col, Container, Row } from 'reactstrap';

import React, { useState, useEffect } from 'react';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useNavigate } from 'react-router-dom';


const CartaOferta = ({ item }) => {
  const navigate = useNavigate();//para navegar
  const clickOferta = (id) => {

    navigate("/detalleOferta/" + id)
  }

  const [mensaje, setMensaje] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0);

    comprobarMensaje();


  }, []); //al cargar busco todos los usuarios

  const comprobarMensaje = () => {
    if (item.mensaje != undefined) {
      setMensaje(true)
      if (item.mensaje == "La empresa no ha cerrado la oferta") {
        setStyleMensaje("carta-oferta-abajo-pendiente")
      } else if (item.mensaje == "Enhorabuena has sido aceptado para la oferta") {
        setStyleMensaje("carta-oferta-abajo-aceptada")
      } else {
        setStyleMensaje("carta-oferta-abajo-rechazada")
      }

    }
  }

  const [styleMensaje, setStyleMensaje] = useState();

  return (
    <Col md="4" className='mt-3' onClick={() => clickOferta(item.idOferta)}>
      <div className="d-flex flex-column align-items-center justify-content-between carta-oferta h-100">



        <div className="carta-oferta-arriba">
          <div className='div-foto-usuario d-flex justify-content-center'>
            <img src={item.fotoRuta} className='fotoPequena-usuario' />
          </div>
          <div className='carta-oferta-linea d-flex mt-2'>
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



        {mensaje && <div className={styleMensaje}>
          <p>{item.mensaje}</p>
        </div>}

      </div>
    </Col>
  )
}

export default CartaOferta