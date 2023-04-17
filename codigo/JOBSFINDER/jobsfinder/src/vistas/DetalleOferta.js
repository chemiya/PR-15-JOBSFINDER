import { Col, Container, Row } from 'reactstrap';

import React, { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import axios from 'axios';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { faAward } from '@fortawesome/free-solid-svg-icons'
import { faComputer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DetalleOferta = () => {

  const [oferta, setOferta] = useState()

  let params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerOfertaPorId();
  }, []); //al cargar busco todos los usuarios

  const obtenerOfertaPorId = () => {
    try {
      axios.post(`http://localhost/php/JOBSFINDER/ofertaDAO/obtenerOfertaPorId.php`, {
        idOferta: params.id
      })
        .then(res => {//peticion a la api

          setOferta(res.data.userlist.userdata[0]);//guardo los usuarios en la variable



        })
    } catch (error) { throw error; }
  }

  return (
    <div className='div-exterior-detalle-oferta'>
      <Container>
        <Row>
          <Col className="div-descripcion-detalleOferta m-3">
            <Row>
              <Col className="d-flex justify-content-center">
                <FontAwesomeIcon icon={faBriefcase} className="icono-vistaUsuario" />
              </Col>
              <Col>
                <div claasName="d-flex flex-column">
                  <h3>Creador</h3>
                  <p>{oferta.username}</p>
                </div>
              </Col>
            </Row>
          </Col>

          <Col className="div-descripcion-detalleOferta m-3">
                <Row>
                  <Col className="d-flex justify-content-center">
                    <FontAwesomeIcon icon={faDollar} className="icono-vistaUsuario" />
                  </Col>
                  <Col>
                    <div claasName="d-flex flex-column">
                      <h3>Estado</h3>
                      <p>{oferta.estado}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
        </Row>


        <Row>
        <Col className="div-descripcion-detalleOferta m-3">
                <Row>
                  <Col className="d-flex justify-content-center">
                    <FontAwesomeIcon icon={faDollar} className="icono-vistaUsuario" />
                  </Col>
                  <Col>
                    <div claasName="d-flex flex-column">
                      <h3>Descripcion de la oferta</h3>
                      <p>{oferta.descripcion}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
        </Row>

      </Container>{/**container */}




    </div>//div exterior
  )
}

export default DetalleOferta