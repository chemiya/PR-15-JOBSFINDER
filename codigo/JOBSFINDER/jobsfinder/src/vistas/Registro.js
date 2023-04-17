import { Col, Container, Row, Input, Button, Label } from 'reactstrap';
import "./../App.css"
import Icono from './../imagenes/icono.JPG'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Registro = () => {
  const [selectOpcion, setSelectOpcion] = useState("persona");
  const [areaSeleccion, setAreaSeleccion] = useState();

  const [avisoRepetido, setAvisoRepetido] = useState(false);

  const [mas0Areas, setMas0Areas] = useState(false);

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


  const eliminarArea = (area) => {

    const nuevos = (areas.filter(areaRecorrida => areaRecorrida != area))
    setAreas(nuevos)
    if (nuevos.length == 0) {
      setMas0Areas(false)
    }
  }

  const seleccionArea = (e) => {


    setAreaSeleccion(e.target.value)
  }

  return (
    <div>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <img src={Icono} className='imagen-icono' />
          </Col>
        </Row>{/*icono */}

        <Row>
          <Col>
            <h1 className="text-center">Registro en JobsFinder</h1>
          </Col>
        </Row>{/*titulo*/}


        <Row className="fila-registro mt-3">
          <Col>

            <Row>
              <Col>
                <h3 className="text-center">Rellena la informacion basica sobre tu perfil</h3>
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
                />
              </Col>{/*primera entrada */}

              <Col md="6" className="p-3">
                <Label for="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                />
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
                />
              </Col>{/*primera entrada */}

              <Col md="6" className="p-3">
                <Label for="telefono">
                  Telefono
                </Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="telefono"
                />
              </Col>{/*segunda entrada */}
            </Row>{/*segunda fila */}


          </Col>

        </Row>{/*formulario */}




      </Container>{/**container primeros datos */}



      <Container className='container-registro-decision'>

        <Row>
          <Col>
            <h3 className="text-center">¿Eres persona o empresa</h3>
          </Col>
        </Row>

        <Row>
          <Col className='d-flex justify-content-center'>
            <select value={selectOpcion} onChange={changeSelect}>
              <option value="persona">Persona</option>
              <option value="empresa">Empresa</option>
            </select>
          </Col>
        </Row>





        {selectOpcion == "empresa" ? (
          <Row className="fila-registro mt-3">
            <Col>

              <Row>
                <Col>
                  <h3 className="text-center">Rellena la informacion basica sobre tu perfil</h3>
                </Col>
              </Row>{/*titulo */}

              <Row>
                <Col md="6" className="p-3">
                  <Label for="nombre">
                    {formularioEmpresa.pos11}
                  </Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                  />
                </Col>{/*primera entrada */}

                <Col md="6" className="p-3">
                  <Label for="sedeCentral">
                    {formularioEmpresa.pos12}
                  </Label>
                  <Input
                    id="sedeCentral"
                    name="sedeCentral"
                    type="text"
                  />
                </Col>{/*segunda entrada */}

              </Row>{/*primera fila */}


              <Row>
                <Col md="6" className="p-3">
                  <Label for="paginaWeb">
                    {formularioEmpresa.pos21}
                  </Label>
                  <Input
                    id="paginaWeb"
                    name="paginaWeb"
                    type="text"
                  />
                </Col>{/*primera entrada */}

                <Col md="6" className="p-3">
                  <p>
                    {formularioEmpresa.pos22}
                  </p>
                  <select className="w-100">
                    <option>Empresario individual</option>
                    <option>Sociedad Limitada</option>
                    <option>Sociedad Anónima</option>
                    <option>Asociaciones sin ánimo de lucro</option>
                    <option>Sociedad Colectiva</option>
                    <option>Sociedad Comanditaria</option>
                    <option>Comunidad de Bienes</option>
                    <option>Sociedad Cooperativa</option>
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
                  <h3 className="text-center">Rellena la informacion basica sobre tu perfil</h3>
                </Col>
              </Row>{/*titulo */}

              <Row>
                <Col md="6" className="p-3">
                  <Label for="nombre">
                    {formularioPersona.pos11}
                  </Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                  />
                </Col>{/*primera entrada */}

                <Col md="6" className="p-3">
                  <Label for="fechaNacimiento">
                    {formularioPersona.pos12}
                  </Label>
                  <Input
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    type="date"
                  />
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
                  />
                </Col>{/*primera entrada */}

                <Col md="6" className="p-3">
                  <p>
                    {formularioPersona.pos22}
                  </p>
                  <select className="w-100">
                    <option>Masculino</option>
                    <option>Femenino</option>
                  </select>
                </Col>{/*segunda entrada */}
              </Row>{/*segunda fila */}


            </Col>
            {/*formulario */}
          </Row>)}


       


      </Container>


      <Container className="container-areas">
      <Row className="mt-3">
          <Col>
            <Row>
              <Col>
                <h3 className='text-center'>Por ultimo, selecciona los areas en los que estas interesado</h3>
              </Col>
            </Row>{/**titulo */}


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
                {avisoRepetido && <p className="alerta text-center">Ya has añadido este area</p>}
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
                     <FontAwesomeIcon icon={faTrash} className="icono" onClick={()=>eliminarArea(item)} /></a>
                      </div>

                  </Col>
              ))}
                  </Row>
                </Col>
              ) : (
                <Col><Row><Col><h3 className='text-center'>Añade algun area</h3></Col></Row></Col>)}

              


            </Row>{/*mostrar aras */}



          </Col>
        </Row>{/**areas intersado */}




        <Row className="mt-3 mb-3">
          <Col className="d-flex justify-content-center">
            <Button className="boton-aplicacion" type="submit">Registrarse</Button>

          </Col>
        </Row>{/**boton */}

      </Container>



    </div>//div exterior
  )
}

export default Registro