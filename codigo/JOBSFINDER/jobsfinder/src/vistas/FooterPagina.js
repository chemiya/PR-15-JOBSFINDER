import axios from 'axios';
import { Col, Container, Row } from 'reactstrap';
import Cookies from 'universal-cookie';

import React, { useEffect, useState } from 'react'



import Icono from './../imagenes/icono.JPG'




const FooterPagina = () => {
  



 

  return (
    <div className='footer-div-exterior'>
      <Container>
        <Row>
          <Col>
          <div className='d-flex justify-content-center'>
            <img src={Icono} className="imagen-icono"/>
          </div>
          <h2 className='text-center'>José María Lozano Olmedo</h2>
          <h3 className='text-center'>All Right Reserved &copy; 2023</h3>
          </Col>
        
          
        </Row>
      </Container>


      

    </div>//div exterior
  )
}

export default FooterPagina