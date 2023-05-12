import { Col, Container, Row, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DetalleOfertaCarta from './DetalleOfertaCarta';
import axios from 'axios';
import { useParams } from "react-router-dom";
import CartaUsuario from './CartaUsuario';
import DetalleUsuarioCarta from './DetalleUsuarioCarta';
import { ToastContainer, toast } from 'react-toastify';
const CerrarOferta = () => {
  const navigate = useNavigate();//para navegar
  let params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerUsuariosIncritosOferta();
  }, []); //al cargar busco todos los usuarios

  const manejarVerPerfil = (datosHijo) => {
    setMostrarPerfil({ ["mostrar"]: true })

    mostrarPerfil.idUsuario = datosHijo



  }

  const cierreOferta = () => {
    if (usuariosInscritos.length > 0) {
      setAvisoInscritos(true)
    } else {
      var idsUsuariosAceptados = [];
      var idsUsuariosRechazados = [];


      if (usuariosAceptados.length > 0) {
        usuariosAceptados.forEach(usuario => idsUsuariosAceptados.push(usuario.idUsuario))
      } else {
        idsUsuariosAceptados.push("Vacio")
      }
      if (usuariosRechazados.length > 0) {
        usuariosRechazados.forEach(usuario => idsUsuariosRechazados.push(usuario.idUsuario))
      } else {
        idsUsuariosRechazados.push("Vacio")
      }






      try {
        axios.post(`http://localhost:8080/php/JOBSFINDER/ofertaDAO/cerrarOferta.php`, {
          idOferta: params.id,
          idsUsuariosAceptados: idsUsuariosAceptados,
          idsUsuariosRechazados: idsUsuariosRechazados
        })//haces peticion a la api con el id
          .then(res => {
            console.log(res.data)
            if (res.data.success == 1) {
              notify()
              navigate(`/vistaUsuario`);
            }



          })
      } catch (error) { throw error; }
    }

  }

  const notify = () =>{ toast.success('Se ha cerrado la oferta', {
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

  const manejarAceptar = (datosHijo) => {
    console.log(datosHijo)
    setUsuariosAceptados([...usuariosAceptados, datosHijo])
    const nuevos = (usuariosInscritos.filter(usuarios => usuarios.idUsuario != datosHijo.idUsuario))
    setUsuariosInscritos(nuevos)

    if (nuevos.length == 0) {

      setResultadoVacio(1)
      setAvisoInscritos(false)
    }

    setAceptadosVacio(false)

  }

  const manejarRechazar = (datosHijo) => {
    console.log(datosHijo)
    setUsuariosRechazados([...usuariosRechazados, datosHijo])
    const nuevos = (usuariosInscritos.filter(usuarios => usuarios.idUsuario != datosHijo.idUsuario))
    setUsuariosInscritos(nuevos)
    if (nuevos.length == 0) {
      setResultadoVacio(1)
      setAvisoInscritos(false)
    }

    setRechazadosVacio(false)
  }

  const manejarDevolverInscritoRechazar = (datosHijo) => {
    console.log(datosHijo)
    setUsuariosInscritos([...usuariosInscritos, datosHijo])
    const nuevos = (usuariosRechazados.filter(usuarios => usuarios.idUsuario != datosHijo.idUsuario))
    setUsuariosRechazados(nuevos)
    if (nuevos.length == 0) {
      setRechazadosVacio(true)
    }

    setResultadoVacio(0)
  }

  const manejarDevolverInscritoAceptar = (datosHijo) => {
    console.log(datosHijo)
    setUsuariosInscritos([...usuariosInscritos, datosHijo])
    const nuevos = (usuariosAceptados.filter(usuarios => usuarios.idUsuario != datosHijo.idUsuario))
    setUsuariosAceptados(nuevos)
    if (nuevos.length == 0) {
      setAceptadosVacio(true)
    }

    setResultadoVacio(0)
  }


  const [usuariosInscritos, setUsuariosInscritos] = useState([]);//creas variables con el usuario
  const [resultadoVacio, setResultadoVacio] = useState(0);
  const [aceptadosVacio, setAceptadosVacio] = useState(true);
  const [rechazadosVacio, setRechazadosVacio] = useState(true);
  const [avisoInscritos, setAvisoInscritos] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState({
    mostrar: false,
    idUsuario: 0

  })

  const [usuariosAceptados, setUsuariosAceptados] = useState([]);//creas variables con el usuario
  const [usuariosRechazados, setUsuariosRechazados] = useState([]);//creas variables con el usuario


  const obtenerUsuariosIncritosOferta = async () => {
    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/inscritaDAO/obtenerUsuariosInscritosOferta.php`, {
        idOferta: params.id
      })//haces peticion a la api con el id
        .then(res => {
          console.log(res.data.inscritas.userdata)

          if (res.data.success == 0) {
            setResultadoVacio(1)
          } else {
            setResultadoVacio(0)
            setUsuariosInscritos(res.data.inscritas.userdata);//guardo los usuarios en la variable
          }

        })
    } catch (error) { throw error; }
  }


  return (
    <div >
      <Container>
        <Row className='mt-3 mb-5'>
          <Col>
            <div class="eight">
              <h1>Cerrar oferta</h1>
            </div>
          </Col>
        </Row>{/**titulo */}

      </Container>

      <div className='div-exterior-detalle-oferta pb-5'>
        <DetalleOfertaCarta ofertaId={params.id} mostrarCerrar={false} />
      </div>

      <div className='div-exterior-inscritos pb-3'>
        <Container className='container-usuarios-inscritos'>
          <Row>
            <Col>

              <h1 className='text-center'>Lista de usuarios inscritos</h1>



            </Col>
          </Row>

          {avisoInscritos && <Row><Col><p className="alerta text-center">Para cerrar la oferta debes aceptar o rechazar todos los usuarios inscritos</p></Col></Row>}

          {resultadoVacio == 0 ? (
            <Row>
              {usuariosInscritos.map((item, index) => (
                <CartaUsuario item={item} botonesCerrar={true} permitirDetalle={0} clickVerPerfil={manejarVerPerfil} clickAceptar={manejarAceptar} clickRechazar={manejarRechazar} />

              ))}{/**carta usuario resultado busqueda */}
            </Row>
          ) : (
            <Row>
              <Col>
                <h3 className='text-center'>No hay inscrito ningun usuario</h3>
              </Col>
            </Row>
          )}
        </Container>

      </div>


      {mostrarPerfil.mostrar && <div className='t-5'>
        <DetalleUsuarioCarta usuarioId={params.id} />
      </div>}

      <div className='div-exterior-aceptados-rechazados'>
        <Container className='container-aceptados-rechazados'>
          <Row>
            <Col>
              <h3 className="text-center">Usuarios aceptados</h3>
            </Col>
          </Row>
          <Row>
            {aceptadosVacio && <Col><h3 className='text-center'>No hay ningun usuario aceptado</h3></Col>}
            {usuariosAceptados.map((item, index) => (
              <CartaUsuario item={item} botonesCerrar={false} permitirDetalle={0} devolverInscrito={true} clickDevolverInscrito={manejarDevolverInscritoAceptar} />

            ))}
          </Row>
        </Container>

        <Container className='container-aceptados-rechazados mt-5'>
          <Row>
            <Col>
              <h3 className="text-center">Usuarios rechazados</h3>
            </Col>
          </Row>

          <Row>
            {rechazadosVacio && <Col><h3 className='text-center'>No hay ningun usuario rechazado</h3></Col>}
            {usuariosRechazados.map((item, index) => (
              <CartaUsuario item={item} botonesCerrar={false} permitirDetalle={0} devolverInscrito={true} clickDevolverInscrito={manejarDevolverInscritoRechazar} />

            ))}
          </Row>
        </Container>

        <Container className='mt-5'>
          <Row>
            <Col className='d-flex justify-content-center'>
              <Button className="boton-aplicacion" onClick={cierreOferta}>
                Confirmar cierre de oferta
              </Button>
            </Col>
          </Row>
        </Container>




      </div>





    </div>//div exterior
  )
}

export default CerrarOferta