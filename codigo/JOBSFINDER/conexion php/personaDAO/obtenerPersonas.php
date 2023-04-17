<?php
require './../db_connection.php';//llamamos la conexion
	$allUsers = mysqli_query($db_conn,"SELECT * FROM persona");//busca todos
		if(mysqli_num_rows($allUsers) > 0){//recorre el array
			while($row = mysqli_fetch_array($allUsers)){//por cada uno coge los campos
				$viewjson["idUsuario"] = $row['idUsuario'];
				$viewjson["idPersona"] = $row['idPersona'];
				$viewjson["nombre"] = $row['nombre'];
				$viewjson["apellidos"] = $row['apellidos'];
				$viewjson["sexo"] = $row['sexo'];
				$viewjson["fechaNacimiento"] = $row['fechaNacimiento'];
				$json_array["userdata"][] = $viewjson;//los va almacenado 
			}
			echo json_encode(["success"=>true,"userlist"=>$json_array]);//devuelve el array
			return;
		}
		else{
			echo json_encode(["success"=>false]);
			return;
		}
?>