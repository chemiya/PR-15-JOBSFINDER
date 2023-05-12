import { Col, Container, Row,Button } from 'reactstrap';

import React, { useState,useEffect } from 'react';

import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const CartaUsuario = ({item,botonesCerrar,permitirDetalle,clickVerPerfil,clickAceptar,clickRechazar,devolverInscrito,clickDevolverInscrito}) => {
  const navigate = useNavigate();//para navegar
  const clickUsuario=(id)=>{
  if(permitirDetalle){
    navigate("/detalleUsuario/"+id)
  }
}

useEffect(() => {
  
  cortarEmail()
}, []); //al cargar busco todos los usuarios


const [emailCorto, setEmailCorto] = useState();
 const cortarEmail=()=>{
var emailCortado=item.email.substring(0,12)
emailCortado=emailCortado+"..."
setEmailCorto(emailCortado);
console.log(emailCortado)
 }

  return (
    <Col md="4" className='mt-3' onClick={() => clickUsuario(item.idUsuario)}>
           <div className="carta-usuario">
             <div className='carta-usuario-interior p-2'>
            
               <h3 className='text-center'>{item.username}</h3>

               <div className='carta-usuario-interior-fila w-100 d-flex justify-content-center align-items-center'>
                 <div className='w-50 d-flex justify-content-center align-items-center'>
                   <FontAwesomeIcon icon={faEnvelope} className="icono-cartaUsuario"/>
                 </div>
                 <div className='w-50 d-flex justify-content-center align-items-center'>
                   <p>{emailCorto}</p>
                  
                 </div>
               </div>

               <div className='carta-usuario-interior-fila w-100 mt-2 d-flex justify-content-center align-items-center'>
                 <div className='w-50 d-flex justify-content-center align-items-center'>
                   <FontAwesomeIcon icon={faPhone} className="icono-cartaUsuario"/>
                 </div>
                 <div className='w-50 d-flex justify-content-center align-items-center'>
                   <p>{item.telefono}</p>
                 </div>
               </div>

               </div>

              

               {botonesCerrar &&
                <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className='mt-2'><Button className='boton-aplicacion' onClick={() => clickVerPerfil(item.idUsuario)}>Ver perfil</Button></div>
                <div className='mt-2'><Button className='boton-aceptar' onClick={() => clickAceptar(item)}>Aceptar</Button></div>
                <div className='mt-2'><Button className='boton-rechazar' onClick={() => clickRechazar(item)}>Rechazar</Button></div>
                </div>
              }

              {devolverInscrito &&
              <div className='d-flex flex-column justify-content-center align-items-center'>
<div className='mt-2'><Button className='boton-aplicacion' onClick={() => clickDevolverInscrito(item)}>Devolver a inscritos</Button></div>
                </div>}
             

           </div>
         </Col>
  )
}

export default CartaUsuario