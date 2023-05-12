<?php
require './../db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->idOferta) 
	&& !empty(trim($data->idOferta))
	){//comprueba que este el id
		$idOferta = mysqli_real_escape_string($db_conn, trim($data->idOferta));//quita carac especiales
		$allOfertas = mysqli_query($db_conn,"SELECT u.idUsuario as idUsuario,u.username as username,u.email as email, u.telefono as telefono  FROM inscripcion i,  usuario u  where i.idOferta='$idOferta' and i.idUsuario=u.idUsuario ");//hace consulta para buscar uno
		

		
		if(mysqli_num_rows($allOfertas) > 0){//si obteiene mas de 1
			
			while($row = mysqli_fetch_array($allOfertas)){//coge uno del array
				$viewjson["idUsuario"] = $row['idUsuario'];//va guardando los campos
				$viewjson["username"] = $row['username'];
				$viewjson["telefono"] = $row['telefono'];
				$viewjson["email"] = $row['email'];
				
				
				$json_array["userdata"][] = $viewjson;//junta todos
				  }
				  echo json_encode(["success"=>1,"inscritas"=>$json_array]);//lo devuelve
				  return;
					  
			  }
			  else{
				echo json_encode(["success"=>0]);
				return;
			}


		
}


?>