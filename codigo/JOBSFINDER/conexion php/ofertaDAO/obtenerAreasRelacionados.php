<?php
require './../db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->idOferta) 
	&& !empty(trim($data->idOferta))
	){//comprueba que este el id
		$idOferta = mysqli_real_escape_string($db_conn, trim($data->idOferta));//quita carac especiales
		$allOfertas = mysqli_query($db_conn,"SELECT  a.nombre as nombre FROM area a, areaRequerido ar  where ar.idOferta='$idOferta' and ar.idArea=a.idArea ");//hace consulta para buscar uno
		

		
		if(mysqli_num_rows($allOfertas) > 0){//si obteiene mas de 1
			
			while($row = mysqli_fetch_array($allOfertas)){//coge uno del array
				$viewjson["nombre"] = $row['nombre'];//va guardando los campos
				
			
				
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