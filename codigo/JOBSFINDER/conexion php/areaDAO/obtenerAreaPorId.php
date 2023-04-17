<?php
require './../db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->idArea) 
	&& !empty(trim($data->idArea))
	){//comprueba que este el id
		$idArea = mysqli_real_escape_string($db_conn, trim($data->idArea));//quita carac especiales
		$allAreas = mysqli_query($db_conn,"SELECT * FROM area where idArea='$idArea'");//hace consulta para buscar uno
		

		
		if(mysqli_num_rows($allAreas) > 0){//si obteiene mas de 1
			
			while($row = mysqli_fetch_array($allAreas)){//coge uno del array
				$viewjson["idArea"] = $row['idArea'];//va guardando los campos
				$viewjson["nombre"] = $row['nombre'];
			
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