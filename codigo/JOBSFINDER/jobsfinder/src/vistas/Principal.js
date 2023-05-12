import { Col, Container, Row } from 'reactstrap';

import React, { useState } from 'react';
import {
  Navbar,
  NavItem,
  NavbarToggler,
  Collapse,
  NavLink,
  Nav,
  NavbarBrand
} from 'reactstrap';

import FooterPagina from './FooterPagina';
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { faCommentDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icono from './../imagenes/icono.JPG'
import Programador from './../imagenes/iconoProgramador.png'
import Amazon from './../imagenes/amazon.jpg'
import Google from './../imagenes/google.jpg'
import Microsoft from './../imagenes/microsoft.png'
import Meta from './../imagenes/meta.png'

import Angular from './../imagenes/angular.png'
import Python from './../imagenes/python.png'
import ReactIcono from './../imagenes/react.JPG'
import Java from './../imagenes/java.JPG'

const Principal = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>


      <Navbar className="navbar-principal" light expand="md">

        {/**icono */}
        <NavbarBrand href="/"> <img src={Icono} className='imagen-icono' /></NavbarBrand>

        {/**boton responsive */}
        <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />

        {/**enlaces */}
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto d-flex align-items-start" navbar>
            <NavItem >
              <NavLink href="/identificacion" className="me-2 mt-2 p-3" ><div className="button_slide slide_right">Iniciar sesión</div></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/registro" className=" me-2 mt-2 p-3"><div className="button_slide slide_right">Unirse ahora</div></NavLink>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>{/**navbar */}

      <Container className='mt-5'>
        <Row className='d-flex align-items-center'>
          <Col md="6" sm="12">
            <h1 className="h1-banner">Jobsfinder facilita
              el proceso para
              encontrar trabajo
              como programador</h1>

          </Col>{/**texto */}

          <Col md="6" sm="12" className='d-flex align-items-center justify-content-center'>
            <img src={Programador} className="imagen-banner" />

          </Col>{/**imagen */}
        </Row>

      </Container>{/**container banner*/}


      <div className="div-exterior-azul">
        <Container>
          <Row>
            <Col>
              <h1 className='titulo-principal'>Si eres <span className="fancy">programador</span>...</h1>
            </Col>
          </Row>{/**titulo */}


          <Row className='d-flex align-items-center mt-5'>
            <Col md="6" sm="12">
              <Row >
                <Col md="6" sm="12" className='p-2'>
                  <div className='div-interior-imagen d-flex justify-content-center'>
                    <img src={Microsoft} className="imagen-compania" />
                  </div>
                </Col>



                <Col md="6" sm="12" className='p-2'>
                  <div className='div-interior-imagen d-flex justify-content-center'>
                    <img src={Amazon} className="imagen-compania" />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md="6" sm="12" className='p-2'>
                  <div className='div-interior-imagen d-flex justify-content-center'>
                    <img src={Google} className="imagen-compania" />
                  </div>
                </Col>


                <Col md="6" sm="12" className='p-2'>
                  <div className='div-interior-imagen d-flex justify-content-center'>
                    <img src={Meta} className="imagen-compania" />
                  </div>
                </Col>
              </Row>
            </Col>{/**iconos */}

            <Col md="6" sm="12">
              <h1 className='text-end'>Busca ofertas de las mayores empresas del sector </h1>
            </Col>{/**texto programador */}

          </Row>
        </Container>{/**container programador */}

      </div>{/**div exterior azul programador*/}



      <div className="div-exterior-azul">
        <Container>
          <Row>
            <Col>
              <h1 className='text-end titulo-principal'>Si eres una <span className="fancy">empresa</span>...</h1>
            </Col>
          </Row>{/**titulo */}


          <Row className='d-flex align-items-center mt-5'>
            <Col md="6" sm="12">
              <h1>Encuentra la
                persona adecuada
                para tu puesto</h1>
            </Col>{/**texto programador */}


            <Col md="6" sm="12">
              <Row >
                <Col md="6" sm="12" className='p-2'>
                  <div className='div-interior-imagen d-flex justify-content-center'>
                    <img src={Angular} className="imagen-compania" />
                  </div>
                </Col>



                <Col md="6" sm="12" className='p-2'>
                  <div className='div-interior-imagen d-flex justify-content-center'>
                    <img src={Python} className="imagen-compania" />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md="6" sm="12" className='p-2'>
                  <div className='div-interior-imagen d-flex justify-content-center'>
                    <img src={ReactIcono} className="imagen-compania" />
                  </div>
                </Col>


                <Col md="6" sm="12" className='p-2'>
                  <div className='div-interior-imagen d-flex justify-content-center'>
                    <img src={Java} className="imagen-compania" />
                  </div>
                </Col>
              </Row>
            </Col>{/**iconos */}



          </Row>
        </Container>{/**containerempresa */}

      </div>{/**div exterior azul empresa*/}


      <Container className='mt-5 container-principal-fin'>
        <Row>
          <Col>
            <h1 className="text-center">JobsFinder
              hace que la comunicación
              entre las empresas y los programadores sea rápida</h1>
          </Col>
        </Row>

        <Row className="mt-2 mb-2">
          <Col md="4" sm="12" >
         
          <div className="col-principal-cartas d-flex flex-column justify-content-center align-items-center">
          <FontAwesomeIcon icon={faComment} className="icono-principal"/>
          <h3>Rápida comunicación</h3>
          </div>
         
          </Col>

          <Col md="4" sm="12" >
          <div className="col-principal-cartas d-flex flex-column justify-content-center align-items-center">
          <FontAwesomeIcon icon={faAddressBook} className="icono-principal"/>
          <h3>Contactos eficaces</h3>
          </div>
          </Col>

          <Col>

          <div className="col-principal-cartas d-flex flex-column justify-content-center align-items-center">
          <FontAwesomeIcon icon={faCommentDollar} className="icono-principal"/>
          <h3>Ofertas variadas</h3>
          </div>

          </Col>
        </Row>
      </Container>

      <FooterPagina></FooterPagina>


    </div>//div exterior
  )
}

export default Principal