import axios from 'axios';
import { Col, Container, Row } from 'reactstrap';
import Cookies from 'universal-cookie';

import React, { useEffect, useState } from 'react'

import FooterPagina from './FooterPagina';
import CartaOferta from './CartaOferta';





const OfertasInscritas = () => {

 

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerInscritasUsuario();
  }, []); //al cargar busco todos los usuarios
  const cookies = new Cookies();

  const [inscritas, setInscritas] = useState([])
  const [sinInscritas, setSinInscritas] = useState(false)

  const obtenerInscritasUsuario = async () => {
    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/inscritaDAO/obtenerInscritasUsuario.php`, {
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api

          console.log(res.data)

          if (res.data.success == 0) {
            setSinInscritas(true)
          } else {
            setInscritas(res.data.inscritas.userdata);//guardo los usuarios en la variable
            setSinInscritas(false)
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
  <h1>Ofertas inscritas</h1>
</div>
        </Col>
    </Row>{/**titulo */}

    <Row>
    {sinInscritas == true ? (
          <Row><h3 className='text-center'>No tienes ninguna oferta inscrita</h3></Row>
        ) : (
          <Row>{inscritas.map((item, index) => (
            <CartaOferta item={item} />

          ))}</Row>
        )}
        
    </Row>{/**ofertas */}

</Container>

  
<FooterPagina></FooterPagina>

</div>//div exterior
)
}

export default OfertasInscritas