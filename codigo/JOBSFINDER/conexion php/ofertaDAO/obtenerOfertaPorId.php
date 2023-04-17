<?php
require './../db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->idOferta) 
	&& !empty(trim($data->idOferta))
	){//comprueba que este el id
		$idOferta = mysqli_real_escape_string($db_conn, trim($data->idOferta));//quita carac especiales
		$allOfertas = mysqli_query($db_conn,"SELECT o.descripcion as descripcion,o.idUsuario as idUsuario, o.estado as estado, o.detallesSueldo as detallesSueldo, o.detallesFormato as detallesFormato,o.detallesExperiencia as detallesExperiencia, u.username as username FROM oferta o, usuario u where o.idOferta='$idOferta' and u.idUsuario=o.idUsuario ");//hace consulta para buscar uno
		

		
		if(mysqli_num_rows($allOfertas) > 0){//si obteiene mas de 1
			
			while($row = mysqli_fetch_array($allOfertas)){//coge uno del array
				$viewjson["descripcion"] = $row['descripcion'];//va guardando los campos
				$viewjson["idUsuario"] = $row['idUsuario'];
				$viewjson["estado"] = $row['estado'];
				$viewjson["detallesSueldo"] = $row['detallesSueldo'];
				$viewjson["detallesFormato"] = $row['detallesFormato'];
				$viewjson["detallesExperiencia"] = $row['detallesExperiencia'];
				$viewjson["username"] = $row['username'];
				
				$json_array["userdata"][] = $viewjson;//junta todos
				  }
				  echo json_encode(["success"=>true,"userlist"=>$json_array]);//lo devuelve
				  return;
					  
			  }
			  else{
				echo json_encode(["success"=>false]);
				return;
			}


		
}


?>