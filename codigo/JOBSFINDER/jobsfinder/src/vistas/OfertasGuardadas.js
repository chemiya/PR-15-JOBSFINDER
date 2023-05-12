import axios from 'axios';
import { Col, Container, Row } from 'reactstrap';
import Cookies from 'universal-cookie';

import React, { useEffect, useState } from 'react'
import FooterPagina from './FooterPagina';

import CartaOferta from './CartaOferta';



const OfertasGuardadas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerGuardadasUsuario();
  }, []); //al cargar busco todos los usuarios
  const cookies = new Cookies();

  const [guardadas, setGuardadas] = useState([])
  const [sinGuardadas, setSinGuardadas] = useState(false)

  const obtenerGuardadasUsuario = async () => {
    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/guardadaDAO/obtenerGuardadasUsuario.php`, {
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api

          console.log(res.data)

          if (res.data.success == 0) {
            setSinGuardadas(true)
          } else {
            setGuardadas(res.data.guardadas.userdata);//guardo los usuarios en la variable
            setSinGuardadas(false)
          }




        })
    } catch (error) { throw error; }
  }


  return (
    <div>

      <Container>
        <Row className='mt-3 mb-5'>
          <Col>
          <div class="eight">
  <h1>Ofertas guardadas</h1>
</div>
          </Col>
        </Row>{/**titulo */}




        {sinGuardadas == true ? (
          <Row><h3 className='text-center'>No tienes ninguna oferta guardada</h3></Row>
        ) : (
          <Row>{guardadas.map((item, index) => (
            <CartaOferta item={item} />

          ))}</Row>
        )}





      </Container>


      <FooterPagina></FooterPagina>

    </div>//div exterior
  )
}

export default OfertasGuardadas