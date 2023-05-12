import { Col, Container, Row, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';

const OfertasInscritas = () => {
  const cookies = new Cookies();
  const [values, setValues] = useState({
    descripcion: '',
    detallesSueldo: '',
    detallesExperiencia: '',
    detallesFormato: ''

  })

  const navigate = useNavigate();//para navegar
  const [validations, setValidations] = useState({
    descripcion: '',
    detallesSueldo: '',
    detallesExperiencia: '',
    detallesFormato: ''

  })

  const [areaSeleccion, setAreaSeleccion] = useState("Fullstack");

 
  const [avisoRepetido, setAvisoRepetido] = useState(false);

  const [mas0Areas, setMas0Areas] = useState(false);

  const manejarGuardarArea = (datosHijo) => {


    const valor = datosHijo
    const repetidos = areas.filter(areaRecorrida => areaRecorrida == valor)
    if (repetidos.length > 0) {
      setAvisoRepetido(true)
    } else {
      setAreas([...areas, valor])
      setAvisoRepetido(false)
      setMas0Areas(true)
    }


  }

  const [areas, setAreas] = useState([])

  

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

  const notify = () =>{ toast.success('Se ha creado la oferta', {
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

  const validateAll = () => {
    const { descripcion, detallesSueldo, detallesExperiencia, detallesFormato } = values
    const validations = { descripcion: '', detallesSueldo: '', detallesExperiencia: '', detallesFormato: '' }
    let isValid = true

    if (!descripcion) {
      validations.descripcion = 'La descripción es obligatoria'
      isValid = false
    }

    if (!detallesSueldo) {
      validations.detallesSueldo = 'Los detalles sobre el sueldo son obligatorios'
      isValid = false
    }

    if (!detallesExperiencia) {
      validations.detallesExperiencia = 'Los detalles sobre la experiencia son obligatorios'
      isValid = false
    }

    if (!detallesFormato) {
      validations.detallesFormato = 'Los detalles sobre el formato son obligatorios'
      isValid = false
    }

    if (descripcion && descripcion.length > 3000) {
      validations.descripcion = 'La descripción puede tener como maximo 3000 caracteres'
      isValid = false
    }

    if (detallesSueldo && detallesSueldo.length > 1000) {
      validations.detallesSueldo = 'Los detalles del sueldo pueden tener como maximo 1000 caracteres'
      isValid = false
    }

    if (detallesExperiencia && detallesExperiencia.length > 1000) {
      validations.detallesExperiencia = 'Los detalles de la experiencia pueden tener como maximo 1000 caracteres'
      isValid = false
    }

    if (detallesFormato && detallesFormato.length > 1000) {
      validations.detallesFormato = 'Los detalles del formato pueden tener como maximo 1000 caracteres'
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

    if (!value && name === 'descripcion') {
      message = `La descripción es obligatoria`
    }

    if (!value && name === 'detallesSueldo') {
      message = `Los detalles sobre el sueldo son obligatorios`
    }

    if (!value && name === 'detallesExperiencia') {
      message = `Los detalles sobre la experiencia son obligatorios`
    }

    if (!value && name === 'detallesFormato') {
      message = `Los detalles sobre el formato son obligatorios`
    }



    if (value && name === 'descripcion' && value.length > 3000) {
      message = 'La descripción puede tener como maximo 3000 caracteres'
    }

    if (value && name === 'detallesSueldo' && value.length > 1000) {
      message = 'Los detalles del sueldo pueden tener como maximo 1000 caracteres'
    }

    if (value && name === 'detallesExperiencia' && value.length > 1000) {
      message = 'Los detalles de la experiencia pueden tener como maximo 1000 caracteres'
    }

    if (value && name === 'detallesFormato' && value.length > 1000) {
      message = 'Los detalles del formato pueden tener como maximo 1000 caracteres'
    }





    setValidations({ ...validations, [name]: message })
  }

  const handleChange = (e) => {
   
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = validateAll()

    if (!isValid) {
      return false
    }

    console.log(values.descripcion)
    console.log(values.detallesSueldo)
    console.log(values.detallesExperiencia)
    console.log(values.detallesFormato)
    console.log(cookies.get("idUsuario"))

    console.log(areas)

    if(areas.length>0){

    axios.post(`http://localhost:8080/php/JOBSFINDER/ofertaDAO/crearOferta.php`, { //llamo a la  api para qu elo guarde en la base datos
      descripcion: values.descripcion,
      detallesSueldo: values.detallesSueldo,
      detallesExperiencia: values.detallesExperiencia,
      detallesFormato: values.detallesFormato,
      idUsuario:cookies.get("idUsuario"),
      areas:areas

    })
      .then(res => {
notify();
        console.log(res.data)
        navigate(`/vistaUsuario`);//navego a la riuta




        return;
      })

    }
  }

  const { descripcion, detallesFormato, detallesSueldo, detallesExperiencia } = values

  const {
    descripcion: descripcionVal,
    detallesFormato: detallesFormatoVal,
    detallesExperiencia: detallesExperienciaVal,
    detallesSueldo: detallesSueldoVal

  } = validations


  return (
    <div className="div-exterior-crear">
      <Container className='container-interior-crear-oferta'>
        <Row>
          <Col className='d-flex justify-content-center'>
        <div className='titulo-interior p-2'>
        <h1 className='text-center'>Crear una oferta</h1>
        </div>
          
         
            
          </Col>
        </Row>
        <form onSubmit={handleSubmit}>
        <Row className='mt-5'>
          <Col>
            <Row>
              <Col>
                <h3>Descripción de la oferta</h3>
              </Col>

            </Row>
            <Row>
              <Col >
                <textarea className='w-100' value={descripcion}
                  onChange={handleChange} name="descripcion"
                  onBlur={validateOne} rows="4"></textarea>
                <p className="alerta">{descripcionVal}</p>
              </Col>
            </Row>
          </Col>
        </Row>


        <Row className='mt-5'>
          <Col md="4" >
            <h3>Detalles sobre <br></br> el sueldo</h3>
            <textarea className='w-100' value={detallesSueldo}
                  onChange={handleChange} name="detallesSueldo"
                  onBlur={validateOne} rows="7"></textarea>
                <p className="alerta">{detallesSueldoVal}</p>

          </Col>
          <Col md="4" >
            <h3>Detalles sobre <br></br> la experiencia</h3>
            <textarea className='w-100' value={detallesExperiencia}
                  onChange={handleChange} name="detallesExperiencia"
                  onBlur={validateOne} rows="7"></textarea>
                <p className="alerta">{detallesExperienciaVal}</p>

          </Col>
          <Col md="4" >
            <h3>Detalles sobre <br></br> el formato</h3>
            <textarea className='w-100' value={detallesFormato}
                  onChange={handleChange} name="detallesFormato"
                  onBlur={validateOne} rows="7"></textarea>
                <p className="alerta">{detallesFormatoVal}</p>

          </Col>

        </Row>


        <Row className='p-3'>
        <Col>
            <Row>
              <Col>
                <h3 className='text-center'>Por último, selecciona los áreas relacionados con la oferta</h3>
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
                <Col><Row><Col><h5 className='text-center'>Para poder crear la oferta, añade algun área</h5></Col></Row></Col>)}




            </Row>



          </Col>
        </Row>
       

        <Row>
          <Col className='d-flex justify-content-center mt-4'>
            <Button className="boton-aplicacion " type="submit">Crear oferta</Button>
          </Col>
        </Row>
        </form>

      </Container>




    </div>//div exterior
  )
}

export default OfertasInscritas