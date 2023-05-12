import { Col, Container, Row, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { faAward } from '@fortawesome/free-solid-svg-icons'
import { faComputer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';



const DetalleOfertaCarta = (props) => {
  const notify = (mensaje) =>{ toast.success(mensaje, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  }
 
  const navigate = useNavigate();//para navegar

  const [inscrito, setInscrito] = useState(false)
  const [guardada, setGuardada] = useState(false)
  const [cerrar, setCerrar] = useState(false)
  const [cerrada, setCerrada] = useState(false)

  const cookies = new Cookies();

 
  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerOfertaPorId();
    comprobarInscripcionUsuario();
    comprobarGuardadaUsuario();
    obtenerAreasRelacionados();
  }, []); //al cargar busco todos los usuarios

  


  const [oferta, setOferta] = useState([]);//creas variables con el usuario
  const [areasRelacionados, setAreasRelacionados] = useState([]);

  const obtenerOfertaPorId = async () => {
    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/ofertaDAO/obtenerOfertaPorId.php`, {
        idOferta: props.ofertaId
      })//haces peticion a la api con el id
        .then(res => {
          console.log(res.data.userlist.userdata)
          setOferta(res.data.userlist.userdata[0]);//lo guardas en la variable del usuario

          if (res.data.userlist.userdata[0].idUsuario == cookies.get("idUsuario")) {
            setCerrar(true)

          }

          if(res.data.userlist.userdata[0].estado=="CERRADA"){
            setCerrada(true)
          }

        })
    } catch (error) { throw error; }
  }

  const obtenerAreasRelacionados = async () => {
    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/ofertaDAO/obtenerAreasRelacionados.php`, {
        idOferta: props.ofertaId
      })//haces peticion a la api con el id
        .then(res => {
          console.log(res.data.userlist.userdata)
        setAreasRelacionados(res.data.userlist.userdata)

        })
    } catch (error) { throw error; }
  }


  const comprobarInscripcionUsuario = () => {
    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/inscritaDAO/comprobarInscripcionUsuario.php`, {
        idOferta: props.ofertaId,
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api

          console.log(res.data.success)
          if (res.data.success == 1) {
            setInscrito(true)
          } else {
            setInscrito(false)
          }

        })
    } catch (error) { throw error; }
  }

  const comprobarGuardadaUsuario = () => {
    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/guardadaDAO/comprobarGuardadaUsuario.php`, {
        idOferta: props.ofertaId,
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api

          console.log(res.data.success)
          if (res.data.success == 1) {
            setGuardada(true)
          } else {
            setGuardada(false)
          }

        })
    } catch (error) { throw error; }
  }

  const inscribirse = () => {
    console.log("usuario:" + cookies.get("idUsuario") + " oferta:" + props.ofertaId)

    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/inscritaDAO/crearInscripcion.php`, {
        idOferta: props.ofertaId,
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api

          if (res.data.success == 1) {
            setInscrito(true)
            notify("Te has inscrito a la oferta")
          }

        })
    } catch (error) { throw error; }
  }

  const eliminarGuardada = () => {
    console.log("usuario:" + cookies.get("idUsuario") + " oferta:" + props.ofertaId)

    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/guardadaDAO/eliminarGuardada.php`, {
        idOferta: props.ofertaId,
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api

          if (res.data.success == 1) {
            setGuardada(false)
            notify("La oferta se ha eliminado de tus guardadas")
          }

        })
    } catch (error) { throw error; }
  }

  const cerrarOferta = (id) => {
    navigate("/cerrarOferta/"+id)
  }


  const eliminarInscripcion = () => {
    console.log("usuario:" + cookies.get("idUsuario") + " oferta:" + props.ofertaId)

    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/inscritaDAO/eliminarInscripcion.php`, {
        idOferta: props.ofertaId,
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api

          if (res.data.success == 1) {
            setInscrito(false)
            notify("Has eliminado tu inscripcion a la oferta")
          }

        })
    } catch (error) { throw error; }
  }

  const guardarOferta = () => {
    console.log("usuario:" + cookies.get("idUsuario") + " oferta:" + props.ofertaId)

    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/guardadaDAO/crearGuardada.php`, {
        idOferta: props.ofertaId,
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api

          if (res.data.success == 1) {
            setGuardada(true)
            notify("Se ha guardado la oferta")
          }

        })
    } catch (error) { throw error; }

  }


  return (
    
      <Container className='p-1'>
        <Row>
          <Col className="div-descripcion-detalleOferta m-3">
            <Row>
              <Col className="d-flex justify-content-center">
                <FontAwesomeIcon icon={faBriefcase} className="icono-vistaUsuario" />
              </Col>
              <Col>
                <div claasName="d-flex flex-column">
                  <h3>Creador</h3>

                  <p>{oferta.username}</p>
                  

                </div>
              </Col>
            </Row>
          </Col>

          <Col className="div-descripcion-detalleOferta m-3">
            <Row>
              <Col className="d-flex justify-content-center">
                <FontAwesomeIcon icon={faUnlock} className="icono-vistaUsuario" />
              </Col>
              <Col>
                <div claasName="d-flex flex-column">
                  <h3>Estado</h3>
                  <p>{oferta.estado}</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>


        <Row>
          <Col className="div-descripcion-detalleOferta m-3">
            <Row>

              <Col>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h3>Descripcion de la oferta</h3>
                  <p>{oferta.descripcion}</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>


        <Row className='row-detalles-oferta mt-5 '>
          <Col md="4">
            <Row className="p-3 h-100">
              <Col className='col-detalles-oferta p-3'>
                <Row>
                  <Col className='d-flex justify-content-center'>
                    <FontAwesomeIcon icon={faDollar} className="icono-vistaUsuario" />
                  </Col>
                </Row>{/**icono */}

                <Row>
                  <Col>
                    <h3>Detalles sobre el sueldo</h3>
                  </Col>
                </Row>{/**titulo */}

                <Row>
                  <Col>
                    <p>{oferta.detallesSueldo}</p>
                  </Col>
                </Row>{/**titulo */}

              </Col>
            </Row>

          </Col>

          <Col md="4">
            <Row className="p-3 h-100">
              <Col className='col-detalles-oferta p-3'>
                <Row>
                  <Col className='d-flex justify-content-center'>
                    <FontAwesomeIcon icon={faAward} className="icono-vistaUsuario" />
                  </Col>
                </Row>{/**icono */}

                <Row>
                  <Col>
                    <h3>Detalles sobre la experiencia</h3>
                  </Col>
                </Row>{/**titulo */}

                <Row>
                  <Col>
                    <p>{oferta.detallesExperiencia}</p>
                  </Col>
                </Row>{/**titulo */}

              </Col>
            </Row>

          </Col>

          <Col md="4">
            <Row className="p-3 h-100">
              <Col className='col-detalles-oferta p-3'>
                <Row>
                  <Col className='d-flex justify-content-center'>
                    <FontAwesomeIcon icon={faComputer} className="icono-vistaUsuario" />
                  </Col>
                </Row>{/**icono */}

                <Row>
                  <Col>
                    <h3>Detalles sobre el formato</h3>
                  </Col>
                </Row>{/**titulo */}

                <Row>
                  <Col>
                    <p>{oferta.detallesFormato}</p>
                  </Col>
                </Row>{/**titulo */}

              </Col>
            </Row>

          </Col>
        </Row>


        <Row className='fila-detalles-tecnologias'>
          <Col className='col-detalles-oferta mt-3 p-3'>
          <Row>
            <Col>
            <h3 className='text-center'>Áreas relacionados con la oferta</h3>
            </Col>
          </Row>

          <Row>
          {areasRelacionados.map((item, index) => (
                      <Col md="4" className="div-area-seleccion" key={index}>
                        <div className="interior-div-area-seleccion-detalle d-flex justify-content-around align-items-center">
                          <div >{item.nombre}</div>
                          
                        </div>

                      </Col>
                    ))}
          </Row>
          </Col>
        </Row>

       {!cerrada && <Row>
          <Col>
          {cerrar == true ? (
          <Row className='mt-5'>
            <Col  className='d-flex justify-content-center'>
          {props.mostrarCerrar &&  <Button className="boton-aplicacion" onClick={() => cerrarOferta(oferta.idOferta)}>Cerrar Oferta</Button>}   
            </Col>
          </Row>

        ) : (
          <Row className='mt-5'>
            <Col md="6" className='d-flex justify-content-center mt-2'>
              {inscrito == true ? (
                <Button className="boton-aplicacion" onClick={eliminarInscripcion}>Anular inscripcion</Button>
              ) : (
                <Button className="boton-aplicacion" onClick={inscribirse}>Inscribirse</Button>
              )}

            </Col>
            <Col md="6" className='d-flex justify-content-center mt-2'>
              {guardada == true ? (
                <Button className="boton-aplicacion" onClick={eliminarGuardada}>Borrar oferta guardada</Button>
              ) : (
                <Button className="boton-aplicacion" onClick={guardarOferta}>Guardar oferta</Button>
              )}
            </Col>
          </Row>
        )}

          </Col>
        </Row>
}
       


      </Container>




    
  )
}

export default DetalleOfertaCarta