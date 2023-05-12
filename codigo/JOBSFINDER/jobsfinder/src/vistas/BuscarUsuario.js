import axios from 'axios';
import { Col, Container, Row, Input, Button } from 'reactstrap';
import Cookies from 'universal-cookie';

import React, { useEffect, useState } from 'react'

import CartaUsuario from './CartaUsuario';
import FooterPagina from './FooterPagina';


const BuscarUsuario = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerUsuarios();
  }, []); //al cargar busco todos los usuarios
  const cookies = new Cookies();

  const [usuarios, setUsuarios] = useState([])
  const [resultadoVacio, setResultadoVacio] = useState(0)

  const [validations, setValidations] = useState({
    username: '',


  })


  const obtenerUsuarios = async () => {
    try {
      axios.get(`http://localhost:8080/php/JOBSFINDER/usuarioDAO/obtenerUsuarios.php`, {

      })
        .then(res => {//peticion a la api
          console.log(res.data.userlist.userdata)
          setUsuarios(res.data.userlist.userdata);//guardo los usuarios en la variable


        })
    } catch (error) { throw error; }
  }


  const validateAll = () => {
    const { username } = values
    const validations = { username: '' }
    let isValid = true

    if (!username) {
      validations.username = 'El username es obligatorio'
      isValid = false
    }








    if (!isValid) {
      setValidations(validations)
    }

    return isValid
  }

  const buscar = () => {

    const isValid = validateAll()
    console.log(isValid)

    if (!isValid) {
      return false
    }

    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/usuarioDAO/obtenerUsuariosPorUsername.php`, {
        username: values["username"],
        tipoUsuario: selectTipoUsuario
      })
        .then(res => {//peticion a la api
          if (res.data.success == 0) {
            setResultadoVacio(1)
          } else {
            setResultadoVacio(0)
            setUsuarios(res.data.userlist.userdata);//guardo los usuarios en la variable
          }



        })
    } catch (error) { throw error; }


  }

  const [selectTipoUsuario, setTipoUsuario] = useState("persona");

  const seleccionTipoUsuario = (e) => {


    setTipoUsuario(e.target.value)
  }

  const [values, setValues] = useState({
    username: ''


  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const validateUsername = (e) => {
    const { name } = e.target
    const value = values[name]
    let message = ''

    if (!value && name === 'username') {
      message = `El username es obligatorio`
    }







    setValidations({ ...validations, [name]: message })
  }


  const { username } = values

  const {
    username: usernameVal,


  } = validations

  return (
    <div className='p-1'>

      <Container>
        <Row className='mt-3 mb-5'>
          <Col>
            <div class="eight">
              <h1>Buscador usuarios</h1>
            </div>
          </Col>
        </Row>{/**titulo */}

        <Row className='row-buscador-campos'>
          <Col>
            <Row>
              <Col md="6">
                <h3 className='text-center'>Tipo de usuario</h3>
              </Col>
              <Col md="6" className="d-flex justify-content-center align-items-center">
                <select className="w-50" onChange={seleccionTipoUsuario}>
                  <option value="PERSONA">Persona</option>
                  <option value="EMPRESA">Empresa</option>
                </select>
              </Col>

            </Row>{/**tipo usuario */}


            <Row className='mt-5 d-flex justify-content-center'>
              <Col md="6">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Introduce el username" onChange={handleChange} onBlur={validateUsername}
                />
                <p className="alerta">{usernameVal}</p>
              </Col>

            </Row>{/**input */}


            <Row className='mt-4'>
              <Col className='d-flex justify-content-center'>
                <Button className='boton-aplicacion' onClick={buscar}>Buscar</Button>
              </Col>
            </Row>{/**boton */}


          </Col>




        </Row>






      </Container>


      <Container className='mt-5'>
        {resultadoVacio == 0 ? (
          <Row>
            {usuarios.map((item, index) => (
              <CartaUsuario item={item} botonesCerrar={false} permitirDetalle={1} />

            ))}{/**carta usuario resultado busqueda */}
          </Row>
        ) : (
          <Row>
            <Col>
              <h3 className='text-center'>No se ha encontrado ningún usuario con ese username</h3>
            </Col>
          </Row>
        )}



      </Container>

      <FooterPagina></FooterPagina>


    </div>//div exterior
  )
}

export default BuscarUsuario