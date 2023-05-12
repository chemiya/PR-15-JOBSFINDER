<?php
require './../db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->idOferta) 
	&& !empty(trim($data->idOferta))
	){//comprueba que este el id
		$idOferta = mysqli_real_escape_string($db_conn, trim($data->idOferta));//quita carac especiales
		$allOfertas = mysqli_query($db_conn,"update oferta set estado='CERRADA' where idOferta='$idOferta' ");//hace consulta para buscar uno
		


		$allOfertas=true;
		if($allOfertas==true){

			$idsUsuariosAceptados=$data->idsUsuariosAceptados;	
			$idsUsuariosRechazados=$data->idsUsuariosRechazados;


			
			if($idsUsuariosAceptados[0]!="Vacio"){
				foreach($idsUsuariosAceptados as $idAceptado){
					$inscripcion = mysqli_query($db_conn,"update inscripcion set mensaje='Enhorabuena has sido aceptado para la oferta' where idOferta='$idOferta' and idUsuario='$idAceptado' ");
				}
			}

			if($idsUsuariosRechazados[0]!="Vacio"){
				foreach($idsUsuariosRechazados as $idRechazado){
					$inscripcion = mysqli_query($db_conn,"update inscripcion set mensaje='Lo sentimos no has sido seleccionado para la oferta' where idOferta='$idOferta' and idUsuario='$idRechazado' ");
				}
			}

			

			




			echo json_encode(["success"=>1]);
		}else{
			echo json_encode(["success"=>0]);
		}
		
				
			


		
}


?>