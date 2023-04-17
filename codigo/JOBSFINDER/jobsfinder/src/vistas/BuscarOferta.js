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
      axios.get(`http://localhost/php/JOBSFINDER/ofertaDAO/obtenerOfertas.php`, {
        
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
        <Row>
          <Col>
          <h1 className='text-center'>Buscador de ofertas</h1>
          </Col>
        </Row>{/**titulo */}



        <Row>
        <Row>
        {ofertas.map((item, index) => (
            <CartaOferta item={item}/>
            
        ))}
            
        </Row>{/**ofertas */}
          
        </Row>
      </Container>


      

    </div>//div exterior
  )
}

export default BuscarOferta