import { Col, Container, Row } from 'reactstrap';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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


const DetalleUsuarioCarta = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);

    obtenerUsuarioPorId();


  }, []); //al cargar busco todos los usuarios

  const [usuario, setUsuario] = useState([]);//para guardar los usuaurios
  const [persona, setPersona] = useState([]);//para guardar los usuaurios
  const [empresa, setEmpresa] = useState([]);//para guardar los usuaurios

  const obtenerUsuarioPorId = async () => {

    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/usuarioDAO/obtenerUsuarioPorId.php`, {
        idUsuario: props.usuarioId
      })
        .then(res => {//peticion a la api
          console.log(res.data.usuario.userdata)
          setUsuario(res.data.usuario.userdata[0]);//guardo los usuarios en la variable


          if (res.data.tipo == 0) {
            console.log(res.data.persona.userdata)
            setPersona(res.data.persona.userdata[0])
          } else {
            console.log(res.data.empresa.userdata)
            setEmpresa(res.data.empresa.userdata[0])
          }




        })
    } catch (error) { throw error; }
  }



  return (
    <div className='p-1'>
      <Container className="container-primero-vistaUsuario">
        <Row>
          <Col>
            <h1 class="text-center">Perfil de {usuario.username}</h1>
          </Col>
        </Row>{/**titulo */}

        <Row>
          <Col className='d-flex justify-content-center'>
          <img src={usuario.fotoRuta} className='fotoGrande-usuario'/>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col md="6" sm="12" className='pt-3' >
            <div className="div-descripcion-usuario  h-100 d-flex flex-column justify-content-center align-items-center">
              <FontAwesomeIcon icon={faBook} className="icono-vistaUsuario" />
              <h3>Descripción del perfil</h3>
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
                      <h3>Teléfono</h3>
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
                    <Col md="6" sm="12">
                      <Col className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faAddressCard} className="icono-vistaUsuario" />
                      </Col>
                    </Col>
                    <Col md="6" sm="12">
                      <div className="d-flex flex-column carta-detalle">
                        <h3>Nombre</h3>
                        <p>{persona.nombre}</p>
                      </div>
                    </Col>
                  </Row>

                ) : (
                  <Row>
                    <Col md="6" sm="12">
                      <Col className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faLocation} className="icono-vistaUsuario" />
                      </Col>
                    </Col>
                    <Col md="6" sm="12">
                      <div className="d-flex flex-column carta-detalle">
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
                    <Col md="6" sm="12">
                      <Col className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faFingerprint} className="icono-vistaUsuario" />
                      </Col>
                    </Col>
                    <Col md="6" sm="12">
                      <div className="d-flex flex-column carta-detalle">
                        <h3>Apellidos</h3>
                        <p>{persona.apellidos}</p>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col md="6" sm="12">
                      <Col className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faAddressCard} className="icono-vistaUsuario" />
                      </Col>
                    </Col>
                    <Col md="6" sm="12">
                      <div className="d-flex flex-column carta-detalle">
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
                    <Col md="6" sm="12">
                      <Col className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faCalendar} className="icono-vistaUsuario" />
                      </Col>
                    </Col>
                    <Col md="6" sm="12">
                      <div className="d-flex flex-column carta-detalle">
                        <h3>Fecha de <br></br> nacimiento</h3>
                        <p>{persona.fechaNacimiento}</p>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col md="6" sm="12">
                      <Col className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faGlobe} className="icono-vistaUsuario" />
                      </Col>
                    </Col>
                    <Col md="6" sm="12">
                      <div className="d-flex flex-column carta-detalle">
                        <h3>Página web</h3>
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
                    <Col md="6" sm="12">
                      <Col className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faPersonHalfDress} className="icono-vistaUsuario" />
                      </Col>
                    </Col>
                    <Col md="6" sm="12">
                      <div className="d-flex flex-column carta-detalle">
                        <h3>Género</h3>
                        <p>{persona.sexo}</p>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col md="6" sm="12">
                      <Col className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faGavel} className="icono-vistaUsuario" />
                      </Col>
                    </Col>
                    <Col md="6" sm="12">
                      <div className="d-flex flex-column carta-detalle">
                        <h3>Estructura <br></br> jurídica</h3>
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



    </div>//div exterior
  )
}

export default DetalleUsuarioCarta