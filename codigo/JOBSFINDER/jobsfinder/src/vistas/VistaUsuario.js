import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Container, Row } from 'reactstrap';
import Cookies from 'universal-cookie';

import {
  Navbar,
  NavItem,
  NavbarToggler,
  Collapse,
  NavLink,
  Nav,
  NavbarBrand
} from 'reactstrap';
import Icono from './../imagenes/icono.JPG'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faFingerprint } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faPersonHalfDress } from '@fortawesome/free-solid-svg-icons'
import { faLocation } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGavel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const VistaUsuario = () => {
  const cookies = new Cookies();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const formularioEmpresa = {
    pos11: "Nombre",
    pos21: "Pagina web",
    pos12: "Sede central",
    pos22: "Estructura juridica"
  }

  const formularioPersona = {
    pos11: "Nombre",
    pos21: "Apellidos",
    pos12: "Fecha de nacimiento",
    pos22: "Genero"
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerUsuarioPorId();
  }, []); //al cargar busco todos los usuarios

  const [usuario, setUsuario] = useState([]);//para guardar los usuaurios
  const [persona, setPersona] = useState([]);//para guardar los usuaurios
  const [empresa, setEmpresa] = useState([]);//para guardar los usuaurios
  const obtenerUsuarioPorId = async () => {
    try {
      axios.post(`http://localhost/php/JOBSFINDER/usuarioDAO/obtenerUsuarioPorId.php`, {
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api

          setUsuario(res.data.userlist.userdata[0]);//guardo los usuarios en la variable
          console.log(usuario.idUsuario)
          if (res.data.userlist.userdata[0].tipoUsuario == "PERSONA") {
            try {
              axios.post(`http://localhost/php/JOBSFINDER/personaDAO/obtenerPersonaPorId.php`, {
                idUsuario: usuario.idUsuario
              })
                .then(res => {//peticion a la api
                  console.log(res.data.userlist.userdata[0])
                  setPersona(res.data.userlist.userdata[0]);//guardo los usuarios en la variable


                })
            } catch (error) { throw error; }
          } else {
            try {
              axios.post(`http://localhost/php/JOBSFINDER/empresaDAO/obtenerEmpresaPorId.php`, {
                idUsuario: usuario.idUsuario
              })
                .then(res => {//peticion a la api
                  console.log(res.data.userlist.userdata[0])
                  setEmpresa(res.data.userlist.userdata[0]);//guardo los usuarios en la variable


                })
            } catch (error) { throw error; }
          }

        })
    } catch (error) { throw error; }
  }

  const navigate = useNavigate();//para navegar
  const navegarGuardadas=()=>{
    navigate("/ofertasGuardadas")
  }

  const navegarInscritas=()=>{
    navigate("/ofertasInscritas")
  }

  const navegarPublicadas=()=>{
    navigate("/ofertasPublicadas")
  }

  const navegarCrearOferta=()=>{
    navigate("/crearOferta")
  }



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
              <NavLink href="/buscarUsuario" className="boton-principal me-2 mt-2 p-3" >Buscar usuario</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/buscarOferta" className="boton-principal me-2 mt-2 p-3">Buscar oferta</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/editarPerfil" className="boton-principal me-2 mt-2 p-3">Editar perfil</NavLink>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>{/**navbar */}


      <Container className="container-primero-vistaUsuario">
        <Row>
          <Col>
            <h1 class="text-center">Bienvenido a JobsFinder, {usuario.username}</h1>
          </Col>
        </Row>{/**titulo */}

        <Row>
          <Col md="6" sm="12" className='pt-3' >
            <div className="div-descripcion-usuario  h-100 d-flex flex-column justify-content-center align-items-center">
              <FontAwesomeIcon icon={faBook} className="icono-vistaUsuario" />
              <h3>Descripcion del perfil</h3>
              <p>{usuario.descripcion}</p>
            </div>
          </Col>{/**descripcion */}

          <Col md="6" sm="12" >
            <Row>
              <Col className="div-descripcion-usuario mt-3">
                <Row>
                  <Col className="d-flex justify-content-center">
                    <FontAwesomeIcon icon={faUserTie} className="icono-vistaUsuario" />
                  </Col>
                  <Col>
                    <div claasName="d-flex flex-column">
                      <h3>Tipo de usuario</h3>
                      <p>{usuario.tipoUsuario}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>{/**tipo usuario */}


            <Row>
              <Col className="div-descripcion-usuario mt-3">
                <Row>
                  <Col className="d-flex justify-content-center">
                    <FontAwesomeIcon icon={faEnvelope} className="icono-vistaUsuario" />
                  </Col>
                  <Col>
                    <div className="d-flex flex-column">
                      <h3>Email</h3>
                      <p>{usuario.email}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>{/**tipo usuario */}


            <Row>
              <Col className="div-descripcion-usuario mt-3">
                <Row>
                  <Col className="d-flex justify-content-center">
                    <FontAwesomeIcon icon={faPhone} className="icono-vistaUsuario" />
                  </Col>
                  <Col>
                    <div claasName="d-flex flex-column">
                      <h3>Telefono</h3>
                      <p>{usuario.telefono}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>{/**tipo usuario */}


          </Col>{/**tipousuario, email, telefono */}
        </Row>

      </Container>{/**contianer primera informacion*/}

      <Container className="container-informacion-adicional-vistaUsuario">
        <Row>
          <Col className="div-descripcion-usuario m-3">
            <Row>

              <Col>

                {usuario.tipoUsuario == "PERSONA" ? (
                  <Row>
                    <Col>
                      <Col className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faAddressCard} className="icono-vistaUsuario" />
                      </Col>
                    </Col>
                    <Col>
                      <div className="d-flex flex-column">
                        <h3>Nombre</h3>
                        <p>{persona.nombre}</p>
                      </div>
                    </Col>
                  </Row>

                ) : (
                  <Row>
                  <Col>
                    <Col className="d-flex justify-content-center">
                      <FontAwesomeIcon icon={faLocation} className="icono-vistaUsuario" />
                    </Col>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column">
                      <h3>Sede central</h3>
                      <p>{empresa.sedeCentral}</p>
                    </div>
                  </Col>
                </Row>

                )}

              </Col>
            </Row>
          </Col>
          <Col className="div-descripcion-usuario m-3">
            <Row>

              <Col>
                {usuario.tipoUsuario == "PERSONA" ? (
                   <Row>
                   <Col>
                     <Col className="d-flex justify-content-center">
                       <FontAwesomeIcon icon={faFingerprint} className="icono-vistaUsuario" />
                     </Col>
                   </Col>
                   <Col>
                     <div className="d-flex flex-column">
                       <h3>Apellidos</h3>
                       <p>{persona.apellidos}</p>
                     </div>
                   </Col>
                 </Row>
                ) : (
                  <Row>
                  <Col>
                    <Col className="d-flex justify-content-center">
                      <FontAwesomeIcon icon={faAddressCard} className="icono-vistaUsuario" />
                    </Col>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column">
                      <h3>Nombre</h3>
                      <p>{empresa.nombre}</p>
                    </div>
                  </Col>
                </Row>

                )}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col className="div-descripcion-usuario m-3">
            <Row>
             
              <Col>
                {usuario.tipoUsuario == "PERSONA" ? (
                   <Row>
                   <Col>
                     <Col className="d-flex justify-content-center">
                       <FontAwesomeIcon icon={faCalendar} className="icono-vistaUsuario" />
                     </Col>
                   </Col>
                   <Col>
                     <div className="d-flex flex-column">
                       <h3>Fecha de nacimiento</h3>
                       <p>{persona.fechaNacimiento}</p>
                     </div>
                   </Col>
                 </Row>
                ) : (
                  <Row>
                    <Col>
                      <Col className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faGlobe} className="icono-vistaUsuario" />
                      </Col>
                    </Col>
                    <Col>
                      <div className="d-flex flex-column">
                        <h3>Pagina web</h3>
                        <p>{empresa.url}</p>
                      </div>
                    </Col>
                  </Row>

                )}
              </Col>
            </Row>
          </Col>
          <Col className="div-descripcion-usuario m-3">
            <Row>
              
              <Col>
                {usuario.tipoUsuario == "PERSONA" ? (
                  <Row>
                  <Col>
                    <Col className="d-flex justify-content-center">
                      <FontAwesomeIcon icon={faPersonHalfDress} className="icono-vistaUsuario" />
                    </Col>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column">
                      <h3>Genero</h3>
                      <p>{persona.sexo}</p>
                    </div>
                  </Col>
                </Row>
                ) : (
                  <Row>
                    <Col>
                      <Col className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faGavel} className="icono-vistaUsuario" />
                      </Col>
                    </Col>
                    <Col>
                      <div className="d-flex flex-column">
                        <h3>Estructura juridica</h3>
                        <p>{empresa.estructuraJuridica}</p>
                      </div>
                    </Col>
                  </Row>

                )}
              </Col>
            </Row>
          </Col>
        </Row>

      </Container>{/**container segunda informacion */}

      <Container className="container-botones-abajo-vistaUsuario">
        <Row>
          <Col className="col-boton-abajo-vistaUsuario m-3" >
            {usuario.tipoUsuario == "PERSONA" ? (
              <div className="d-flex flex-column align-items-center" onClick={navegarGuardadas}>
                <FontAwesomeIcon icon={faFloppyDisk} className="icono-vistaUsuario" />
                <h3>Mis ofertas guardadas</h3>

              </div>
            ) : (
              <div className="d-flex flex-column align-items-center" onClick={navegarPublicadas}>
                <FontAwesomeIcon icon={faUpload} className="icono-vistaUsuario" />
                <h3>Mis ofertas publicadas</h3>

              </div>

            )}
          </Col>{/**primer boton */}

          <Col className="col-boton-abajo-vistaUsuario m-3">
            {usuario.tipoUsuario == "PERSONA" ? (
              <div className="d-flex flex-column align-items-center" onClick={navegarInscritas}>
                <FontAwesomeIcon icon={faMessage} className="icono-vistaUsuario" />
                <h3>Mis ofertas inscritas</h3>

              </div>
            ) : (
              <div className="d-flex flex-column align-items-center" onClick={navegarCrearOferta}>
                <FontAwesomeIcon icon={faPlus} className="icono-vistaUsuario" />
                <h3>Crear oferta</h3>

              </div>

            )}
          </Col>{/**segundo boton */}
        </Row>

      </Container>{/**botones abajo */}

    </div>//div exterior
  )
}

export default VistaUsuario