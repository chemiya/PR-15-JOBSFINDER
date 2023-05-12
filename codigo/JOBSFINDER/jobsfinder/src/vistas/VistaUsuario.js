import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Container, Row } from 'reactstrap';
import Cookies from 'universal-cookie';
import DetalleUsuarioCarta from './DetalleUsuarioCarta';
import Swal from 'sweetalert2';
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


  const mostrarAlerta=()=>{
    /* Swal.fire({
       title: "Good job!",
       html: "You clicked the button!",
       icon: 'success'
     })*/
   
     Swal.fire({
       title: "Cerrar sesión",
       html: "¿Seguro que quieres cerrar sesión?",
       icon: 'info',
       showDenyButton:true,
       denyButtonText:"No",
       confirmButtonText:"Si",
       confirmButtonColor:"#008000",
       denyButtonColor:"#FF0000"
     }).then(response=>{
       if(response.isConfirmed){
         cerrarSesion();
       }else if(response.isDenied){
         console.log("denegado")
       }
     })
   }

  const [usuario, setUsuario] = useState([]);//para guardar los usuaurios
  const [persona, setPersona] = useState([]);//para guardar los usuaurios
  const [empresa, setEmpresa] = useState([]);//para guardar los usuaurios

  const obtenerUsuarioPorId = async () => {
   
    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/usuarioDAO/obtenerUsuarioPorId.php`, {
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api
          console.log(res.data.usuario.userdata)
          setUsuario(res.data.usuario.userdata[0]);//guardo los usuarios en la variable
          
        
          if(res.data.tipo==0){
            console.log(res.data.persona.userdata)
            setPersona(res.data.persona.userdata[0])
          }else{
            console.log(res.data.empresa.userdata)
            setEmpresa(res.data.empresa.userdata[0])
          }
        

       

        })
    } catch (error) { throw error; }
  }


  const obtenerPersonaPorId = async () => {
    

    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/personaDAO/obtenerPersonaPorId.php`, { 
        idUsuario: usuario.idUsuario
      })//haces peticion a la api con el id
      .then(res => {
        console.log(res.data.userlist.userdata)
        setPersona(res.data.userlist.userdata[0]);//lo guardas en la variable del usuario
        
      })
    } catch (error) { throw error;}    
  }

  const obtenerEmpresaPorId = async () => {
    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/empresaDAO/obtenerEmpresaPorId.php`, { 
        idUsuario: usuario.idUsuario
      })//haces peticion a la api con el id
      .then(res => {
        console.log(res.data.userlist.userdata)
        setEmpresa(res.data.userlist.userdata[0]);//lo guardas en la variable del usuario
        
      })
    } catch (error) { throw error;}    
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

  const cerrarSesion=()=>{
    cookies.remove('username',  { path: '/' });
    cookies.remove('email',  { path: '/' });
    cookies.remove('telefono',  { path: '/' });
    cookies.remove('descripcion', { path: '/' });
    cookies.remove('idUsuario',  { path: '/' });
    navigate("/principal")
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
              <NavLink href="/buscarUsuario" className="me-2 mt-2 p-3" ><div className="button_slide slide_right">Buscar usuario</div></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/buscarOferta" className=" me-2 mt-2 p-3"><div className="button_slide slide_right">Buscar oferta</div></NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/editarPerfil" className=" me-2 mt-2 p-3"><div className="button_slide slide_right">Editar perfil</div></NavLink>
            </NavItem>

            <NavItem>
              <NavLink  className=" me-2 mt-2 p-3" onClick={mostrarAlerta}><div className="button_slide slide_right">Cerrar sesión</div></NavLink>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>{/**navbar */}

      <DetalleUsuarioCarta usuarioId={cookies.get("idUsuario")}/>


    

      

      <Container className="container-botones-abajo-vistaUsuario">
        <Row className='d-flex justify-content-around p-3'>
          <Col className="col-boton-abajo-vistaUsuario m-2 " md="5" sm="12" >
            {usuario.tipoUsuario == "PERSONA" ? (
              <div className="d-flex flex-column align-items-center" onClick={navegarGuardadas}>
                <FontAwesomeIcon icon={faFloppyDisk} className="icono-vistaUsuario" />
                <h3 className='text-center'>Mis ofertas guardadas</h3>

              </div>
            ) : (
              <div className="d-flex flex-column align-items-center" onClick={navegarPublicadas}>
                <FontAwesomeIcon icon={faUpload} className="icono-vistaUsuario" />
                <h3 className='text-center'>Mis ofertas publicadas</h3>

              </div>

            )}
          </Col>{/**primer boton */}

          <Col className="col-boton-abajo-vistaUsuario m-2" md="5" sm="12">
            {usuario.tipoUsuario == "PERSONA" ? (
              <div className="d-flex flex-column align-items-center" onClick={navegarInscritas}>
                <FontAwesomeIcon icon={faMessage} className="icono-vistaUsuario" />
                <h3 className='text-center'>Mis ofertas inscritas</h3>

              </div>
            ) : (
              <div className="d-flex flex-column align-items-center" onClick={navegarCrearOferta}>
                <FontAwesomeIcon icon={faPlus} className="icono-vistaUsuario" />
                <h3 className='text-center'>Crear oferta</h3>

              </div>

            )}
          </Col>{/**segundo boton */}
        </Row>

      </Container>{/**botones abajo */}

      <FooterPagina></FooterPagina>

    </div>//div exterior
  )
}

export default VistaUsuario