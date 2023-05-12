import { Col, Container, Row, Input, Button, Label } from 'reactstrap';
import "./../App.css"
import Icono from './../imagenes/icono.JPG'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';

const Registro = () => {
  const [selectOpcion, setSelectOpcion] = useState("PERSONA");
  const [areaSeleccion, setAreaSeleccion] = useState("Fullstack");

  const [avisoRepetido, setAvisoRepetido] = useState(false);

  const [mas0Areas, setMas0Areas] = useState(false);
  const navigate = useNavigate();//para navegar
  const formularioEmpresa = {
    pos11: "Nombre",
    pos21: "Página web",
    pos12: "Sede central",
    pos22: "Estructura jurídica"
  }

  const formularioPersona = {
    pos11: "Nombre",
    pos21: "Apellidos",
    pos12: "Fecha de nacimiento",
    pos22: "Género"
  }

  const [areas, setAreas] = useState([])

  const changeSelect = (e) => {
    setSelectOpcion(e.target.value)

  }

  const guardarArea = () => {


    const valor = areaSeleccion
    const repetidos = areas.filter(areaRecorrida => areaRecorrida == valor)
    if (repetidos.length > 0) {
      setAvisoRepetido(true)
    } else {
      setAreas([...areas, valor])
      setAvisoRepetido(false)
      setMas0Areas(true)
    }


  }

 


  const eliminarArea = (datosHijo) => {

    const nuevos = (areas.filter(areaRecorrida => areaRecorrida != datosHijo))
    setAreas(nuevos)
    if (nuevos.length == 0) {
      setMas0Areas(false)
    }
  }

  const seleccionArea = (e) => {

   
 

  setAreaSeleccion(e.target.value)
 
    
  }

  const [valuesBasicos, setValuesBasicos] = useState({
    username: '',
    email: '',
    password: '',
    telefono: ''

  })

  const [validationsBasicos, setValidationsBasicos] = useState({
    username: '',
    email: '',
    password: '',
    telefono: ''

  })

  const [valuesPersona, setValuesPersona] = useState({
    nombrePersona: '',
    apellidos: '',
    fechaNacimiento: '',
    genero: 'MASCULINO'

  })

  const [validationsPersona, setValidationsPersona] = useState({
    nombrePersona: '',
    apellidos: '',
    fechaNacimiento: '',
    genero: ''

  })


  const [valuesEmpresa, setValuesEmpresa] = useState({
    nombreEmpresa: '',
    sedeCentral: '',
    url: '',
    estructuraJuridica: 'Empresario individual'

  })

  const [validationsEmpresa, setValidationsEmpresa] = useState({
    nombreEmpresa: '',
    sedeCentral: '',
    url: '',
    estructuraJuridica: 'Empresario individual'

  })

  const validateAllBasicos = () => {
    const { username, password, email, telefono } = valuesBasicos
    const validationsBasicos = { username: '', password: '', email: '', telefono: '' }
    let isValid = true

    if (!username) {
      validationsBasicos.username = 'El username es obligatorio'
      isValid = false
    }
    if (!password) {
      validationsBasicos.password = 'La contraseña es obligatoria'
      isValid = false
    }
    if (!email) {
      validationsBasicos.email = 'El email es obligatorio'
      isValid = false
    }
    if (!telefono) {
      validationsBasicos.telefono = 'El telefono es obligatorio'
      isValid = false
    }




    if (username && (username.length < 5 || username.length > 100)) {
      validationsBasicos.username = 'El username debe contener entre 5 y 100 caracteres'
      isValid = false
    }



    if (password && (password.length < 5 || password.length > 100)) {
      validationsBasicos.password = 'La contraseña debe contener entre 5 y 100 caracteres'
      isValid = false
    }

    if (email && email.length > 100) {
      validationsBasicos.email = 'El email debe contener como maximo 100 caracteres'
      isValid = false
    }

    let regex = new RegExp("^[9|6|7][0-9]{8}$");

    if (telefono && !regex.test(telefono)) {
      validationsBasicos.telefono = 'El telefono debe contener 9 números y comenzar por 6,7 o 9'
      isValid = false
    }


    if (email && !/\S+@\S+\.\S+/.test(email)) {
      validationsBasicos.email = 'El email debe tener un formato válido'
      isValid = false
    }



    if (!isValid) {
      setValidationsBasicos(validationsBasicos)
    }

    return isValid
  }


  const validateAllPersona = () => {
    const { nombrePersona, apellidos, fechaNacimiento, genero } = valuesPersona
    const validationsPersona = { nombrePersona: '', apellidos: '', fechaNacimiento: '', genero: '' }
    let isValid = true

    if (!nombrePersona) {
      validationsPersona.nombrePersona = 'El nombre es obligatorio'
      isValid = false
    }
    if (!apellidos) {
      validationsPersona.apellidos = 'Los apellidos son obligatorios'
      isValid = false
    }
    if (!fechaNacimiento) {
      validationsPersona.fechaNacimiento = 'La fecha de nacimiento es obligatoria'
      isValid = false
    }





    if (nombrePersona && username.length > 500) {
      validationsPersona.nombrePersona = 'El nombre debe contener como maximo 500 caracteres'
      isValid = false
    }



    if (apellidos && apellidos.length > 500) {
      validationsPersona.apellidos = 'Los apellidos deben contener como maixmo 500 caracteres'
      isValid = false
    }










    if (!isValid) {
      setValidationsPersona(validationsPersona)
    }

    return isValid
  }

  const notify = () =>{ toast.success(' Te has registrado con éxito', {
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


  const validateAllEmpresa = () => {
    const { nombreEmpresa, sedeCentral, url, estructuraJuridica } = valuesEmpresa
    const validationsEmpresa = { nombreEmpresa: '', sedeCentral: '', url: '', estructuraJuridica: '' }
    let isValid = true

    if (!nombreEmpresa) {
      validationsEmpresa.nombreEmpresa = 'El nombre es obligatorio'
      isValid = false
    }
    if (!sedeCentral) {
      validationsEmpresa.sedeCentral = 'La sede central es obligatoria'
      isValid = false
    }
    if (!url) {
      validationsEmpresa.url = 'La pagina web es obligatoria'
      isValid = false
    }





    if (nombreEmpresa && nombreEmpresa.length > 500) {
      validationsEmpresa.nombreEmpresa = 'El nombre debe contener como maximo 500 caracteres'
      isValid = false
    }



    if (sedeCentral && sedeCentral.length > 500) {
      validationsEmpresa.sedeCentral = 'La sede central debe contener como maximo 500 caracteres'
      isValid = false
    }

    if (url && url.length > 500) {
      validationsEmpresa.url = 'La pagina web debe contener como maximo 500 caracteres'
      isValid = false
    }










    if (!isValid) {
      setValidationsEmpresa(validationsEmpresa)
    }

    return isValid
  }


  const validateOneBasicos = (e) => {
    const { name } = e.target
    const value = valuesBasicos[name]
    let message = ''

    if (!value && name === 'username') {
      message = `El username es obligatorio`
    }

    if (!value && name === 'password') {
      message = `La contraseña es obligatoria`
    }

    if (!value && name === 'telefono') {
      message = `El telefono es obligatorio`
    }

    if (!value && name === 'email') {
      message = `El email es obligatorio`
    }

    if (value && name === 'username' && (value.length < 5 || value.length > 100)) {
      message = 'El username debe contener entre 5 y 100 caracteres'
    }

    if (value && name === 'password' && (value.length < 5 || value.length > 100)) {
      message = 'La contraseña debe contener entre 5 y 100 caracteres'
    }

    if (value && name === 'email' && value.length > 100) {
      message = 'El email debe contener como maximo 100 caracteres'
    }



    let regex = new RegExp("^[9|6|7][0-9]{8}$");

    


    if (value && name === 'telefono' && !regex.test(telefono)) {
      message = 'El telefono debe contener 9 números y comenzar por 6,7 o 9'
    }

    

    if (value && name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      message = 'El email debe tener un formato valido'
    }

    setValidationsBasicos({ ...validationsBasicos, [name]: message })
  }

  const validateOnePersona = (e) => {
    const { name } = e.target
    const value = valuesPersona[name]
    let message = ''

    if (!value && name === 'nombrePersona') {
      message = `El nombre es obligatorio`
    }

    if (!value && name === 'apellidos') {
      message = `Los apellidos son obligatorios`
    }

    if (!value && name === 'fechaNacimiento') {
      message = `La fecha de nacimiento es obligatoria`
    }



    if (value && name === 'nombrePersona' && (value.length > 500)) {
      message = 'El nombre debe contener como maximo 500 caracteres'
    }

    if (value && name === 'apellidos' && (value.length > 500)) {
      message = 'Los apellidos deben contener como maximo 500 caracteres'
    }







    setValidationsPersona({ ...validationsPersona, [name]: message })
  }


  const validateOneEmpresa = (e) => {
    const { name } = e.target
    const value = valuesEmpresa[name]
    let message = ''

    if (!value && name === 'nombreEmpresa') {
      message = `El nombre es obligatorio`
    }

    if (!value && name === 'sedeCentral') {
      message = `La sede central es obligatoria`
    }

    if (!value && name === 'url') {
      message = `La pagina web es obligatoria`
    }



    if (value && name === 'nombreEmpresa' && (value.length > 500)) {
      message = 'El nombre debe contener como maximo 500 caracteres'
    }

    if (value && name === 'sedeCentral' && (value.length > 500)) {
      message = 'La sede central contener como maximo 500 caracteres'
    }

    if (value && name === 'url' && (value.length > 500)) {
      message = 'La url debe contener como maximo 500 caracteres'
    }







    setValidationsEmpresa({ ...validationsEmpresa, [name]: message })
  }



  const handleChangeBasicos = (e) => {
    const { name, value } = e.target
    setValuesBasicos({ ...valuesBasicos, [name]: value })
  }

  const handleChangePersona = (e) => {
    const { name, value } = e.target
    setValuesPersona({ ...valuesPersona, [name]: value })
  }

  const handleChangeEmpresa = (e) => {
    const { name, value } = e.target
    setValuesEmpresa({ ...valuesEmpresa, [name]: value })
  }

  const handleSubmit = () => {
    console.log(areas.length)
    if(areas.length>0){

    console.log(areas)

    
    const isValidBasicos = validateAllBasicos()

    if (!isValidBasicos) {
      return false
    }
    
    
    if(selectOpcion=="PERSONA"){
      console.log(selectOpcion)
      const isValidPersona = validateAllPersona()
      if ( !isValidPersona) {
        return false
      }
    }else{
      const isValidEmpresa = validateAllEmpresa()
      if (!isValidBasicos || !isValidEmpresa) {
        return false
      }
    }

var campos;
var url;
    if(selectOpcion=="PERSONA"){
     
       url=`http://localhost:8080/php/JOBSFINDER/usuarioDAO/crearUsuarioPersona.php`

       axios.post(url, { //llamo a la  api para qu elo guarde en la base datos
        username: valuesBasicos.username,
          password: valuesBasicos.password,//le paso los datos
          telefono: valuesBasicos.telefono,
          email: valuesBasicos.email,
          nombre:valuesPersona.nombrePersona,
          apellidos:valuesPersona.apellidos,
          genero:valuesPersona.genero,
          fechaNacimiento:valuesPersona.fechaNacimiento,
          areas:areas
      })
        .then(res => {
          notify();
          console.log(res.data)
          navigate(`/principal`);//navego a la riuta
  
  
  
  
          return;
        })


    }else{
      
       url=`http://localhost:8080/php/JOBSFINDER/usuarioDAO/crearUsuarioEmpresa.php`

       axios.post(url, { //llamo a la  api para qu elo guarde en la base datos
        username: valuesBasicos.username,
        password: valuesBasicos.password,//le paso los datos
        telefono: valuesBasicos.telefono,
        email: valuesBasicos.email,
        nombre:valuesEmpresa.nombreEmpresa,
        sedeCentral:valuesEmpresa.sedeCentral,
        url:valuesEmpresa.url,
        estructuraJuridica:valuesEmpresa.estructuraJuridica,
        areas:areas
      })
        .then(res => {
          notify();
          console.log(res.data)
          navigate(`/principal`);//navego a la riuta
  
  
  
  
          return;
        })
    }
  



  }


  }

  const { username, password, email, telefono } = valuesBasicos

  const {
    username: usernameVal,
    password: passwordVal,
    email: emailVal,
    telefono: telefonoVal

  } = validationsBasicos


  const { nombrePersona, apellidos, fechaNacimiento, genero } = valuesPersona

  const {
    nombrePersona: nombrePersonaVal,
    apellidos: apellidosVal,
    fechaNacimiento: fechaNacimientoVal,
    genero: generoVal

  } = validationsPersona


  const { nombreEmpresa, sedeCentral, url, estructuraJuridica } = valuesEmpresa

  const {
    nombreEmpresa: nombreEmpresaVal,
    sedeCentral: sedeCentralVal,
    url: urlVal,
    estructuraJuridica: EstructuraJuridicaVal

  } = validationsEmpresa


  return (
    <div className='div-exterior-registro'>
      
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <img src={Icono} className='imagen-icono' />
          </Col>
        </Row>{/*icono */}

        <Row>
          <Col>
            <h1 className="text-center titulo-registro">Registro en JobsFinder</h1>
          </Col>
        </Row>{/*titulo*/}


        <Row className="fila-registro mt-3">
          <Col>

            <Row>
              <Col>
                <h3 className="text-center">Rellena la información básica sobre tu perfil</h3>
              </Col>
            </Row>{/*titulo */}

            <Row>
              <Col md="6" className="p-3">
                <Label for="username">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"

                  type="text"
                  value={username}
                  onChange={handleChangeBasicos}
                  onBlur={validateOneBasicos}
                />
                <p className="alerta">{usernameVal}</p>
              </Col>{/*primera entrada */}

              <Col md="6" className="p-3">
                <Label for="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"

                  type="text"
                  value={email}
                  onChange={handleChangeBasicos}
                  onBlur={validateOneBasicos}
                />
                <p className="alerta">{emailVal}</p>
              </Col>{/*segunda entrada */}

            </Row>{/*primera fila */}


            <Row>
              <Col md="6" className="p-3">
                <Label for="password">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"

                  type="password"
                  value={password}
                  onChange={handleChangeBasicos}
                  onBlur={validateOneBasicos}
                />
                <p className="alerta">{passwordVal}</p>
              </Col>{/*primera entrada */}

              <Col md="6" className="p-3">
                <Label for="telefono">
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  name="telefono"

                  type="text"
                  value={telefono}
                  onChange={handleChangeBasicos}
                  onBlur={validateOneBasicos}
                />
                <p className="alerta">{telefonoVal}</p>
              </Col>{/*segunda entrada */}
            </Row>{/*segunda fila */}


          </Col>

        </Row>{/*formulario */}




      </Container>{/**container primeros datos */}



      <Container className='container-registro-decision'>

        <Row>
          <Col>
            <h3 className="text-center titulo-registro">¿Eres persona o empresa?</h3>
          </Col>
        </Row>

        <Row>
          <Col className='d-flex justify-content-center'>
            <select value={selectOpcion} onChange={changeSelect}>
              <option value="PERSONA">Persona</option>
              <option value="EMPRESA">Empresa</option>
            </select>
          </Col>
        </Row>





        {selectOpcion == "EMPRESA" ? (
          <Row className="fila-registro mt-3">
            <Col>

              <Row>
                <Col>
                  <h3 className="text-center">Rellena la información específica sobre tu perfil</h3>
                </Col>
              </Row>{/*titulo */}

              <Row>
                <Col md="6" className="p-3">
                  <Label for="nombre">
                    {formularioEmpresa.pos11}
                  </Label>
                  <Input
                    id="nombre"
                    name="nombreEmpresa"

                    type="text"
                    value={nombreEmpresa}
                    onChange={handleChangeEmpresa}
                    onBlur={validateOneEmpresa}
                  />
                  <p className="alerta">{nombreEmpresaVal}</p>
                </Col>{/*primera entrada */}

                <Col md="6" className="p-3">
                  <Label for="sedeCentral">
                    {formularioEmpresa.pos12}
                  </Label>
                  <Input
                    id="sedeCentral"
                    name="sedeCentral"

                    type="text"
                    value={sedeCentral}
                    onChange={handleChangeEmpresa}
                    onBlur={validateOneEmpresa}
                  />
                  <p className="alerta">{sedeCentralVal}</p>
                </Col>{/*segunda entrada */}

              </Row>{/*primera fila */}


              <Row>
                <Col md="6" className="p-3">
                  <Label for="paginaWeb">
                    {formularioEmpresa.pos21}
                  </Label>
                  <Input
                    id="url"
                    name="url"

                    type="text"
                    value={url}
                    onChange={handleChangeEmpresa}
                    onBlur={validateOneEmpresa}
                  />
                  <p className="alerta">{urlVal}</p>
                </Col>{/*primera entrada */}

                <Col md="6" className="p-3">
                  <p>
                    {formularioEmpresa.pos22}
                  </p>
                  <select className="w-100" name="estructuraJuridica" value={estructuraJuridica} onChange={handleChangeEmpresa}
                    onBlur={validateOneEmpresa}>
                    <option value="Empresario individual">Empresario individual</option>
                    <option value="Sociedad Limitada">Sociedad Limitada</option>
                    <option value="Sociedad Anónima">Sociedad Anónima</option>
                    <option value="Asociaciones sin ánimo de lucro">Asociaciones sin ánimo de lucro</option>
                    <option value="Sociedad Colectiva">Sociedad Colectiva</option>
                    <option value="Sociedad Comanditaria">Sociedad Comanditaria</option>
                    <option value="Comunidad de Bienes">Comunidad de Bienes</option>
                    <option value="Sociedad Cooperativa">Sociedad Cooperativa</option>
                  </select>
                </Col>{/*segunda entrada */}
              </Row>{/*segunda fila */}


            </Col>
            {/*formulario */}
          </Row>
        ) : (
          <Row className="fila-registro mt-3">
            <Col>

              <Row>
                <Col>
                  <h3 className="text-center">Rellena la informacion específica sobre tu perfil</h3>
                </Col>
              </Row>{/*titulo */}

              <Row>
                <Col md="6" className="p-3">
                  <Label for="nombre">
                    {formularioPersona.pos11}
                  </Label>
                  <Input
                    id="nombre"
                    name="nombrePersona"

                    type="text"
                    value={nombrePersona}
                    onChange={handleChangePersona}
                    onBlur={validateOnePersona}
                  />
                  <p className="alerta">{nombrePersonaVal}</p>

                </Col>{/*primera entrada */}

                <Col md="6" className="p-3">
                  <Label for="fechaNacimiento">
                    {formularioPersona.pos12}
                  </Label>
                  <Input
                    id="fechaNacimiento"
                    name="fechaNacimiento"

                    type="date"
                    value={fechaNacimiento}
                    onChange={handleChangePersona}
                    onBlur={validateOnePersona}
                  />
                  <p className="alerta">{fechaNacimientoVal}</p>
                </Col>{/*segunda entrada */}

              </Row>{/*primera fila */}


              <Row>
                <Col md="6" className="p-3">
                  <Label for="apellidos">
                    {formularioPersona.pos21}
                  </Label>
                  <Input
                    id="apellidos"
                    name="apellidos"

                    type="text"
                    value={apellidos}
                    onChange={handleChangePersona}
                    onBlur={validateOnePersona}
                  />
                  <p className="alerta">{apellidosVal}</p>
                </Col>{/*primera entrada */}

                <Col md="6" className="p-3">
                  <p>
                    {formularioPersona.pos22}
                  </p>
                  <select className="w-100" name="genero" value={genero} onChange={handleChangePersona}
                    onBlur={validateOnePersona}>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMENINO">Femenino</option>
                  </select>
                </Col>{/*segunda entrada */}
              </Row>{/*segunda fila */}


            </Col>
            {/*formulario */}
          </Row>)}





      </Container>






      <Container className="container-areas">
        <Row className="mt-3 fila-registro">
          <Col>
            <Row>
              <Col>
                <h3 className='text-center'>Por último, selecciona los áreas en los que estas interesado</h3>
              </Col>
            </Row>


            <Row>
              <Col className='d-flex justify-content-center'>
                <select onChange={seleccionArea} >
                  <option value="Fullstack">Fullstack</option>
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Devops">Devops</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Testing">Testing</option>
                  <option value="Network">Network</option>
                  <option value="Databases">Databases</option>
                  <option value="Operating Systems">Operating Systems</option>
                  <option value="Videogames">Videogames</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Other">Other</option>
                </select>
                <Button className='ms-3 boton-aplicacion' onClick={guardarArea}>Seleccionar</Button>
              </Col>
            </Row>

            <Row>
              <Col>
                {avisoRepetido && <p className="alerta text-center">Ya has añadido este área</p>}
              </Col>
            </Row>

            <Row className='fila-area-seleccion mt-3'>

              {mas0Areas == true ? (
                <Col>
                  <Row>
                    {areas.map((item, index) => (
                      <Col md="4" className="div-area-seleccion" key={index}>
                        <div className="interior-div-area-seleccion d-flex justify-content-around align-items-center">
                          <div >{item}</div>
                          <a>
                            <FontAwesomeIcon icon={faTrash} className="icono" onClick={() => eliminarArea(item)} /></a>
                        </div>

                      </Col>
                    ))}
                  </Row>
                </Col>
              ) : (
                <Col><Row><Col><h5 className='text-center'>Para poder registrarte, añade algún área</h5></Col></Row></Col>)}




            </Row>



          </Col>
        </Row>




        <Row className="mt-3 mb-3">
          <Col className="d-flex justify-content-center">
            <Button className="boton-aplicacion-registro" type="submit" onClick={()=>handleSubmit()}>Registrarse</Button>

          </Col>
        </Row>{/**boton */}
       
      </Container>

      

    </div>//div exterior
  )
}

export default Registro