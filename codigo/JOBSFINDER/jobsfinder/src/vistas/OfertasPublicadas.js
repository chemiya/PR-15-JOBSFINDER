import axios from 'axios';
import { Col, Container, Row } from 'reactstrap';
import Cookies from 'universal-cookie';

import React, { useEffect, useState } from 'react'


import CartaOferta from './CartaOferta';

import FooterPagina from './FooterPagina';



const OfertasPublicadas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerPublicadasUsuario();
  }, []); //al cargar busco todos los usuarios
  const cookies = new Cookies();

  const [publicadas, setPublicadas] = useState([])
  const [sinPublicadas, setSinPublicadas] = useState(false)

  const obtenerPublicadasUsuario = async () => {
    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/ofertaDAO/obtenerPublicadasUsuario.php`, {
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api

          console.log(res.data)

          if (res.data.success == 0) {
            setSinPublicadas(true)
          } else {
            setPublicadas(res.data.publicadas.userdata);//guardo los usuarios en la variable
            setSinPublicadas(false)
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
  <h1>Ofertas publicadas</h1>
</div>
        </Col>
    </Row>{/**titulo */}

    <Row>
    {sinPublicadas == true ? (
          <Row><h3 className='text-center'>No tienes ninguna oferta publicada</h3></Row>
        ) : (
          <Row>{publicadas.map((item, index) => (
            <CartaOferta item={item} />

          ))}</Row>
        )}
        
    </Row>{/**ofertas */}

</Container>

      
<FooterPagina></FooterPagina>

    </div>//div exterior
  )
}

export default OfertasPublicadas