import { Col, Container, Row, Input,Button } from 'reactstrap';

import React, { useState, useEffect ,} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';


  import 'react-toastify/dist/ReactToastify.css';

const EditarPerfil = () => {

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  


  const cookies = new Cookies();
  useEffect(() => {
    window.scrollTo(0, 0);

    obtenerUsuarioPorId();


  }, []); //al cargar busco todos los usuarios

  const [values, setValues] = useState({
    descripcionNueva: '',
    emailNuevo: '',
    telefonoNuevo: ""

  })

  const [validations, setValidations] = useState({
    descripcionNueva: '',
    emailNuevo: '',
    telefonoNuevo: ""


  })
  const navigate = useNavigate();//para navegar

  const validateAll = () => {
    const { descripcionNueva, emailNuevo, telefonoNuevo } = values
    const validations = { descripcionNueva: '', emailNuevo: '', telefonoNuevo: "" }
    let isValid = true

    if (!descripcionNueva) {
      validations.descripcionNueva = 'La descripcion es obligatoria'
      isValid = false
    }

    if (descripcionNueva && descripcionNueva.length > 3000) {
      validations.descripcionNueva = 'La descripcion debe contener como maximo 3000 caracteres'
      isValid = false
    }

    if (!emailNuevo) {
      validations.emailNuevo = 'El email es obligatorio'
      isValid = false
    }

    if (emailNuevo && emailNuevo.length > 100) {
      validations.emailNuevo = 'El email debe contener como maximo 100 caracteres'
      isValid = false
    }



    if (emailNuevo && !/\S+@\S+\.\S+/.test(emailNuevo)) {
      validations.emailNuevo = 'El email debe tener un formato valido'
      isValid = false
    }


    if (!telefonoNuevo) {
      validations.telefonoNuevo = 'El telefono es obligatorio'
      isValid = false
    }

    let regex = new RegExp("^[9|6|7][0-9]{8}$");

    if (telefonoNuevo && !regex.test(telefonoNuevo)) {
      validations.telefonoNuevo = 'El telefono debe contener 9 numeros y comenzar por 6,7 o 9'
      isValid = false
    }



    if (!isValid) {
      setValidations(validations)
    }

    return isValid
  }

  const validateOne = (e) => {
    const { name } = e.target
    const value = values[name]
    let message = ''

    if (!value && name === 'descripcionNueva') {
      message = `La descripcion es obligatoria`
    }

    if (!value && name === 'emailNuevo') {
      message = `El email es obligatorio`
    }

    if (!value && name === 'telefonoNuevo') {
      message = `El telefono es obligatorio`
    }

    if (value && name === 'descripcionNueva' && value.length > 3000) {
      message = 'La descripcion debe contener como maximo 3000 caracteres'
    }

    if (value && name === 'emailNuevo' && value.length > 100) {
      message = 'El email debe contener como maximo 100 caracteres'
    }

    let regex = new RegExp("^[9|6|7][0-9]{8}$");
    if (value && name === 'telefonoNuevo' && !regex.test(value)) {
      message = 'El telefono debe contener 9 numeros y comenzar por 6,7 o 9'
    }

   



    if (value && name === 'emailNuevo' && !/\S+@\S+\.\S+/.test(value)) {
      message = 'El email debe tener un formato valido'
    }

    setValidations({ ...validations, [name]: message })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const notify = () =>{ toast.success("Se han guardado los datos de tu perfil", {
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

  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = validateAll()

    if (!isValid) {
      return false
    }


if(image!=undefined){
  const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "wrp2ia46")
    data.append("cloud_name", "dg8yqncy0")
    fetch("https://api.cloudinary.com/v1_1/dg8yqncy0/image/upload", {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
      
        

        axios.post(`http://localhost:8080/php/JOBSFINDER/usuarioDAO/editarUsuario.php`, { //llamo a la  api para qu elo guarde en la base datos
      descripcion: values.descripcionNueva,
      telefono: values.telefonoNuevo,
      email: values.emailNuevo,
      idUsuario: cookies.get("idUsuario"),
      fotoRuta:data.url

    })
      .then(res => {

        console.log(res.data)
        if (res.data.success == 1) {
          notify();
          navigate(`/vistaUsuario`);//navego a la riuta
        }





        return;
      })
        
      })
      .catch(err => console.log(err))
}




  


  }

  const { descripcionNueva, telefonoNuevo, emailNuevo } = values

  const {
    descripcionNueva: descripcionNuevaVal,
    telefonoNuevo: telefonoNuevoVal,
    emailNuevo: emailNuevoVal


  } = validations


  const [usuario, setUsuario] = useState([]);//para guardar los usuaurios

  const obtenerUsuarioPorId = async () => {

    try {
      axios.post(`http://localhost:8080/php/JOBSFINDER/usuarioDAO/obtenerUsuarioPorId.php`, {
        idUsuario: cookies.get("idUsuario")
      })
        .then(res => {//peticion a la api
          console.log(res.data.usuario.userdata)
          setUsuario(res.data.usuario.userdata[0]);//guardo los usuarios en la variable

          //setValues(...values,{ ["emailNuevo"]: res.data.usuario.userdata[0].email })
          //setValues(...values,{ ["telefonoNuevo"]: res.data.usuario.userdata[0].telefono })
          //setValues(...values,{ ["descripcionNueva"]: res.data.usuario.userdata[0].descripcion })

          values.emailNuevo=res.data.usuario.userdata[0].email
          values.telefonoNuevo=res.data.usuario.userdata[0].telefono
          values.descripcionNueva=res.data.usuario.userdata[0].descripcion



        })
    } catch (error) { throw error; }
  }

  return (
    <div className='p-1'>
      <Container>
      <Row className='mt-3 mb-5'>
          <Col>
          <div class="eight">
  <h1>Editar perfil</h1>
</div>
          </Col>
        </Row>{/**titulo */}

        <form onSubmit={handleSubmit}>
    <Row>
      <Col>
      <Row>
        <Col>
        <h3>Foto de perfil</h3>
        </Col>
      </Row>
      <Row>
<Col>
<input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
</Col>
      </Row>
      </Col>
    </Row>



        <Row>
          <Col md="6" sm="12" className='pt-3' >
            <div className="div-descripcion-usuario  h-100 d-flex flex-column justify-content-center align-items-center">
              <FontAwesomeIcon icon={faBook} className="icono-vistaUsuario" />
              <h3>Descripcion del perfil</h3>
              <textarea className='w-100 h-100'
                name="descripcionNueva"
                value={descripcionNueva}
                onChange={handleChange}
                onBlur={validateOne}
              />
              
              <p className="alerta">{descripcionNuevaVal}</p>

            </div>
          </Col>{/**descripcion */}

          <Col md="6" sm="12" >



            <Row>
              <Col className="div-descripcion-usuario mt-3">
                <Row>
                  <Col className="d-flex justify-content-center">
                    <FontAwesomeIcon icon={faEnvelope} className="icono-vistaUsuario" />
                  </Col>
                  <Col>
                    <div className="d-flex flex-column">
                      <h3>Email</h3>
                      <Input
                        id="username"
                        name="emailNuevo"

                        type="text"
                        value={emailNuevo}
                        onChange={handleChange}
                        onBlur={validateOne}
                      />
                      <p className="alerta">{emailNuevoVal}</p>
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
                    <div className="d-flex flex-column">
                      <h3>Telefono</h3>
                      <Input
                        id="username"
                        name="telefonoNuevo"

                        type="text"
                        value={telefonoNuevo}
                        onChange={handleChange}
                        onBlur={validateOne}
                      />
                      <p className="alerta">{telefonoNuevoVal}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>{/**tipo usuario */}


          </Col>{/**tipousuario, email, telefono */}
        </Row>

        <Row className='mt-5'>
          <Col className='d-flex justify-content-center'>
          <Button className="boton-aplicacion" type="submit">Guardar datos</Button>
          </Col>
        </Row>
</form>

      </Container>




    </div>//div exterior
  )
}

export default EditarPerfil