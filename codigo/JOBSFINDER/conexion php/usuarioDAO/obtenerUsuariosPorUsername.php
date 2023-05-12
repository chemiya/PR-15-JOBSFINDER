<?php
require './../db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->username) 
&& isset($data->tipoUsuario) 
	&& !empty(trim($data->username))
	&& !empty(trim($data->tipoUsuario))
	){//comprueba que este el id
		$username = mysqli_real_escape_string($db_conn, trim($data->username));//quita carac especiales
		$tipoUsuario = mysqli_real_escape_string($db_conn, trim($data->tipoUsuario));//quita carac especiales
		$username=$username."%";
		$allUsers = mysqli_query($db_conn,"SELECT * FROM usuario where tipoUsuario='$tipoUsuario' and username like '$username' ;");//hace consulta para buscar uno
		

		
		if(mysqli_num_rows($allUsers) > 0){//si obteiene mas de 1
			
			while($row = mysqli_fetch_array($allUsers)){//coge uno del array
				$viewjson["idUsuario"] = $row['idUsuario'];//va guardando los campos
				$viewjson["username"] = $row['username'];
				$viewjson["email"] = $row['email'];
				$viewjson["telefono"] = $row['telefono'];
				$viewjson["descripcion"] = $row['descripcion'];
				$viewjson["tipoUsuario"] = $row['tipoUsuario'];
				$json_array["userdata"][] = $viewjson;//junta todos
				  }
				  echo json_encode(["success"=>true,"userlist"=>$json_array]);//lo devuelve
				  return;
					  
			  }
			  else{
				echo json_encode(["success"=>0]);
				return;
			}


		
}


?>