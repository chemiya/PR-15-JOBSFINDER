<?php
require './../db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->idUsuario) 
	&& !empty(trim($data->idUsuario))
	){//comprueba que este el id
		$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));//quita carac especiales
		$allEmpresas = mysqli_query($db_conn,"SELECT * FROM empresa where idUsuario='$idUsuario'");//hace consulta para buscar uno
		

		
		if(mysqli_num_rows($allEmpresas) > 0){//si obteiene mas de 1
			
			while($row = mysqli_fetch_array($allEmpresas)){//coge uno del array
				$viewjson["idEmpresa"] = $row['idEmpresa'];//va guardando los campos
				$viewjson["idUsuario"] = $row['idUsuario'];
				$viewjson["sedeCentral"] = $row['sedeCentral'];
				$viewjson["url"] = $row['url'];
				$viewjson["nombre"] = $row['nombre'];
				$viewjson["estructuraJuridica"] = $row['estructuraJuridica'];
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