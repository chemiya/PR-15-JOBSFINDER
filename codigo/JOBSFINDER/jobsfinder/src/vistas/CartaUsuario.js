import { Col, Container, Row } from 'reactstrap';

import React, { useState } from 'react';

import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { faPhone } from '@fortawesome/free-solid-svg-icons'


const CartaUsuario = ({item}) => {

 

  return (
    <Col md="4" className='mt-3'>
           <div className="carta-usuario">
             <div className='carta-usuario-interior p-2'>
            
               <h3 className='text-center'>{item.username}</h3>

               <div className='carta-usuario-interior-fila w-100 d-flex justify-content-center align-items-center'>
                 <div className='w-50 d-flex justify-content-center align-items-center'>
                   <FontAwesomeIcon icon={faEnvelope} className="icono-cartaUsuario"/>
                 </div>
                 <div className='w-50 d-flex justify-content-center align-items-center'>
                   <p>{item.email}</p>
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
             

           </div>
         </Col>
  )
}

export default CartaUsuario