<?php
require './../db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->idUsuario) 
	&& !empty(trim($data->idUsuario))
	){//comprueba que este el id
		$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));//quita carac especiales
		$allUsers = mysqli_query($db_conn,"SELECT * FROM usuario where idUsuario='$idUsuario'");//hace consulta para buscar uno
		

		
		if(mysqli_num_rows($allUsers) > 0){//si obteiene mas de 1
			
			while($row = mysqli_fetch_array($allUsers)){//coge uno del array
				$viewjson["idUsuario"] = $row['idUsuario'];//va guardando los campos
				$viewjson["username"] = $row['username'];
				$viewjson["email"] = $row['email'];
				$viewjson["telefono"] = $row['telefono'];
				$viewjson["descripcion"] = $row['descripcion'];
				$viewjson["tipoUsuario"] = $row['tipoUsuario'];
				$viewjson["fotoRuta"] = $row['fotoRuta'];
				$json_array["userdata"][] = $viewjson;//junta todos
			}

			

			if($viewjson["tipoUsuario"]=="PERSONA"){
				$allUsers = mysqli_query($db_conn,"SELECT * FROM persona where idUsuario='$idUsuario'");
				while($row = mysqli_fetch_array($allUsers)){//coge uno del array
					$viewjsonPersona["idPersona"] = $row['idPersona'];//va guardando los campos
					$viewjsonPersona["idUsuario"] = $row['idUsuario'];
					$viewjsonPersona["nombre"] = $row['nombre'];
					$viewjsonPersona["apellidos"] = $row['apellidos'];
					$viewjsonPersona["sexo"] = $row['sexo'];
					$viewjsonPersona["fechaNacimiento"] = $row['fechaNacimiento'];
					$json_arrayPersona["userdata"][] = $viewjsonPersona;//junta todos
				}
				echo json_encode(["tipo"=>0,"usuario"=>$json_array,"persona"=>$json_arrayPersona]);//lo devuelve
				  return;
			}else{
				$allUsers = mysqli_query($db_conn,"SELECT * FROM empresa where idUsuario='$idUsuario'");
				while($row = mysqli_fetch_array($allUsers)){//coge uno del array
					$viewjsonEmpresa["idEmpresa"] = $row['idEmpresa'];//va guardando los campos
					$viewjsonEmpresa["idUsuario"] = $row['idUsuario'];
					$viewjsonEmpresa["sedeCentral"] = $row['sedeCentral'];
					$viewjsonEmpresa["url"] = $row['url'];
					$viewjsonEmpresa["nombre"] = $row['nombre'];
					$viewjsonEmpresa["estructuraJuridica"] = $row['estructuraJuridica'];
					$json_arrayEmpresa["userdata"][] = $viewjsonEmpresa;//junta todos
					  }

					  echo json_encode(["tipo"=>1,"usuario"=>$json_array,"empresa"=>$json_arrayEmpresa]);//lo devuelve
				  return;
			}

			



				  
					  
				}
			  else{
				echo json_encode(["success"=>false]);
				return;
			}


		
}


?>