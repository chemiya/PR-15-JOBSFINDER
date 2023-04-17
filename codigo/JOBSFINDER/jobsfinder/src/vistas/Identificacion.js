import { Col, Container, Row, Input,Button } from 'reactstrap';
import "./../App.css"
import Icono from './../imagenes/icono.JPG'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Identificacion = () => {

  const cookies = new Cookies();

  const navigate = useNavigate();//para navegar

  const [values, setValues] = useState({
    username: '',
    password: ''
  
  })

  const [validations, setValidations] = useState({
    username: '',
    password: ''
    
  })

  const validateAll = () => {
    const { username, password } = values
    const validations = { username: '', password: '' }
    let isValid = true
    
    if (!username) {
      validations.username = 'El username es obligatorio'
      isValid = false
    }
    
    if (username && username.length < 3 || username.length > 50) {
      validations.username = 'El username debe contener entre 5 y 50 caracteres'
      isValid = false
    }
    
    if (!password) {
      validations.password = 'La contraseña es obligatoria'
      isValid = false
    }

    if (password && password.length < 3 || password.length > 50) {
      validations.password = 'La contraseña debe contener entre 5 y 50 caracteres'
      isValid = false
    }
    
    /*if (email && !/\S+@\S+\.\S+/.test(email)) {
      validations.email = 'Email format must be as example@mail.com'
      isValid = false
    }*/
    
    
    
    if (!isValid) {
      setValidations(validations)
    }
    
    return isValid
  }


  const validateOne = (e) => {
    const { name } = e.target
    const value = values[name]
    let message = ''
    
    if (!value && name === 'username') {
      message = `El username es obligatorio`
    }

    if (!value && name === 'password') {
      message = `La contraseña es obligatoria`
    }
    
    if (value && name === 'username' && (value.length < 3 || value.length > 50)) {
      message = 'El username debe contener entre 5 y 50 caracteres'
    }

    if (value && name === 'password' && (value.length < 3 || value.length > 50)) {
      message = 'La contraseña debe contener entre 5 y 50 caracteres'
    }

    /*if (value && name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      message = 'Email format must be as example@mail.com'
    }*/
    
    setValidations({...validations, [name]: message })
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = validateAll()
    
    if (!isValid) {
      return false
    }

    
    axios.post(`http://localhost/php/JOBSFINDER/usuarioDAO/identificarUsuario.php`, { //llamo a la  api para qu elo guarde en la base datos
    username: values.username,
    password: values.password,//le paso los datos
  })
  .then(res => {
  
      cookies.set('username', res.data.usuario.userdata[0].username, { path: '/' });
      cookies.set('email', res.data.usuario.userdata[0].email, { path: '/' });
      cookies.set('telefono', res.data.usuario.userdata[0].telefono, { path: '/' });
      cookies.set('descripcion', res.data.usuario.userdata[0].descripcion, { path: '/' });
      cookies.set('idUsuario', res.data.usuario.userdata[0].idUsuario, { path: '/' });
      navigate(`/vistaUsuario`);//navego a la riuta
  
    
   

    return;
   })


  }
  
  const { username,password } = values

  const { 
    username: usernameVal, 
    password: passwordVal
    
  } = validations

  return (
    <div className="div-exterior">
      <Container className="contenedor-identificacion" >
        {/*<Row>
          <Col md="6" sm="12" className="bg-primary border d-flex justify-content-center">
            .col
          </Col>
        </Row>*/}

        <Row className="d-flex justify-content-center">
          <Col md="6" className="columna-identificacion p-3 ">
            <Row>
              <Col md="12" className="d-flex justify-content-center">
                <img src={Icono} className='imagen-icono' />
              </Col>
            </Row>{/*icono */}

            <Row>
              <Col md="12">
                <h2 className="text-center">Identificate en JobsFinder</h2>
              </Col>
            </Row>{/*titulo */}


            <form onSubmit={handleSubmit}>
            <Row>
              <Col md="12">
                <Input
                  id="username"
                  name="username"
                  placeholder="username"
                  type="text"
                  value={username} 
              onChange={handleChange}
              onBlur={validateOne}
                />
                <p className="alerta">{usernameVal}</p>
              </Col>
            </Row>{/*username */}

            <Row>
              <Col md="12" className="mt-3">
                <Input
                  id="password"
                  name="password"
                  placeholder="contraseña"
                  type="password"
                  value={password} 
              onChange={handleChange}
              onBlur={validateOne}
                />
                <p className="alerta">{passwordVal}</p>
              </Col>
            </Row>{/*username */}


            <Row>
              <Col md="12" className="mt-3 d-flex justify-content-center">
                <Button className="boton-aplicacion" type="submit">Entrar</Button>
                
              </Col>
            </Row>{/*boton */}
          </form>


          </Col>
        </Row>







      </Container>


      


    </div>//div exterior
  )




 
}

export default Identificacion