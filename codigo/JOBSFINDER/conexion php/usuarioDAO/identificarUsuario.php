<?php
require './../db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->username) 
	&& isset($data->password) 
	&& !empty(trim($data->username))
    && !empty(trim($data->password))
	){//comprueba que este el id
		$username = mysqli_real_escape_string($db_conn, trim($data->username));//quita carac especiales
        $password = mysqli_real_escape_string($db_conn, trim($data->password));//quita carac especiales
		$identificacion = mysqli_query($db_conn,"SELECT * FROM usuario where username='$username' and password='$password'");//hace consulta para buscar uno
		

		
		if(mysqli_num_rows($identificacion) > 0){//si obteiene mas de 1
			
			while($row = mysqli_fetch_array($identificacion)){//coge uno del array
				$viewjson["idUsuario"] = $row['idUsuario'];//va guardando los campos
				$viewjson["username"] = $row['username'];
				$viewjson["email"] = $row['email'];
				$viewjson["telefono"] = $row['telefono'];
				$viewjson["descripcion"] = $row['descripcion'];
				$viewjson["tipoUsuario"] = $row['tipoUsuario'];
				$json_array["userdata"][] = $viewjson;//junta todos
				  }
				  echo json_encode(["success"=>true,"usuario"=>$json_array]);//lo devuelve
				  return;
					  
			  }
			  else{
				echo json_encode(["success"=>false]);
				return;
			}


		
}


?>