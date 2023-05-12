import axios from 'axios';
import { Col, Container, Row } from 'reactstrap';
import Cookies from 'universal-cookie';

import React, { useEffect, useState } from 'react'


import CartaOferta from './CartaOferta';





const BuscarOferta = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerTodasOfertas();
  }, []); //al cargar busco todos los usuarios
  const cookies = new Cookies();

  const [ofertas, setOfertas] = useState([])

  const obtenerTodasOfertas = async () => {
    try {
      axios.get(`http://localhost:8080/php/JOBSFINDER/ofertaDAO/obtenerOfertas.php`, {

      })
        .then(res => {//peticion a la api

          console.log(res.data.ofertas.userdata)
          setOfertas(res.data.ofertas.userdata);//guardo los usuarios en la variable


        })
    } catch (error) { throw error; }
  }



  return (
    <div>
      <Container>
        <Row className='mt-3 mb-5'>
          <Col>
            <div class="eight">
              <h1>Buscador ofertas</h1>
            </div>
          </Col>
        </Row>{/**titulo */}



        <Row>
          <Row>
            {ofertas.map((item, index) => (
              <CartaOferta item={item} />

            ))}

          </Row>{/**ofertas */}

        </Row>
      </Container>




    </div>//div exterior
  )
}

export default BuscarOferta