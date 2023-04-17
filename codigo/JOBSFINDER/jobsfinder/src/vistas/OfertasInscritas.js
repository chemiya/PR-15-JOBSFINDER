import axios from 'axios';
import { Col, Container, Row } from 'reactstrap';
import Cookies from 'universal-cookie';

import React, { useEffect, useState } from 'react'


import CartaOferta from './CartaOferta';





const OfertasInscritas = () => {

 

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerInscritasUsuario();
  }, []); //al cargar busco todos los usuarios
  const cookies = new Cookies();

  const [inscritas, setInscritas] = useState([])

  const obtenerInscritasUsuario = async () => {
    try {
      axios.post(`http://localhost/php/JOBSFINDER/inscritaDAO/obtenerInscritasUsuario.php`, {
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api
            console.log(cookies.get("idUsuario"))
            console.log(res.data.inscritas.userdata)
          setInscritas(res.data.inscritas.userdata);//guardo los usuarios en la variable
         

        })
    } catch (error) { throw error; }
  }


return (
<div>

<Container>
    <Row>
        <Col>
        <h1 className="text-center">Ofertas inscritas</h1>
        </Col>
    </Row>{/**titulo */}

    <Row>
    {inscritas.map((item, index) => (
        <CartaOferta item={item}/>
        
    ))}
        
    </Row>{/**ofertas */}

</Container>

  


</div>//div exterior
)
}

export default OfertasInscritas