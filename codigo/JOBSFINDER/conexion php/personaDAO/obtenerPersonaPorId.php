<?php
require './../db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->idUsuario) 
	&& !empty(trim($data->idUsuario))
	){//comprueba que este el id
		$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));//quita carac especiales
		$allUsers = mysqli_query($db_conn,"SELECT * FROM persona where idUsuario='$idUsuario'");//hace consulta para buscar uno
		

		
		if(mysqli_num_rows($allUsers) > 0){//si obteiene mas de 1
			
			while($row = mysqli_fetch_array($allUsers)){//coge uno del array
				$viewjson["idPersona"] = $row['idPersona'];//va guardando los campos
				$viewjson["idUsuario"] = $row['idUsuario'];
				$viewjson["nombre"] = $row['nombre'];
				$viewjson["apellidos"] = $row['apellidos'];
				$viewjson["sexo"] = $row['sexo'];
				$viewjson["fechaNacimiento"] = $row['fechaNacimiento'];
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