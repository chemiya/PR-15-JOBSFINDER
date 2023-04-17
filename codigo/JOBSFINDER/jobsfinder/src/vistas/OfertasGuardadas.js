import axios from 'axios';
import { Col, Container, Row } from 'reactstrap';
import Cookies from 'universal-cookie';

import React, { useEffect, useState } from 'react'


import CartaOferta from './CartaOferta';



const OfertasGuardadas = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        obtenerGuardadasUsuario();
      }, []); //al cargar busco todos los usuarios
      const cookies = new Cookies();

      const [guardadas, setGuardadas] = useState([])

      const obtenerGuardadasUsuario = async () => {
        try {
          axios.post(`http://localhost/php/JOBSFINDER/guardadaDAO/obtenerGuardadasUsuario.php`, {
            idUsuario: cookies.get("idUsuario")
          })
            .then(res => {//peticion a la api
                console.log(cookies.get("idUsuario"))
                console.log(res.data.guardadas.userdata)
              setGuardadas(res.data.guardadas.userdata);//guardo los usuarios en la variable
             
    
            })
        } catch (error) { throw error; }
      }
 

  return (
    <div>

    <Container>
        <Row>
            <Col>
            <h1 className="text-center">Ofertas guardadas</h1>
            </Col>
        </Row>{/**titulo */}

        <Row>
        {guardadas.map((item, index) => (
            <CartaOferta item={item}/>
            
        ))}
            
        </Row>{/**ofertas */}

    </Container>

      


    </div>//div exterior
  )
}

export default OfertasGuardadas