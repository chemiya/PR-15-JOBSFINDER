<?php
require './../db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->idUsuario) 
&& isset($data->idOferta) 
	&& !empty(trim($data->idUsuario))
 && !empty(trim($data->idOferta))
	){//comprueba que este el id
		$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));//quita carac especiales
		$idOferta = mysqli_real_escape_string($db_conn, trim($data->idOferta));//quita carac especiales
		$allOfertas = mysqli_query($db_conn,"SELECT i.idUsuario,i.idOferta FROM inscripcion i  where i.idUsuario='$idUsuario' and i.idOferta='$idOferta'");//hace consulta para buscar uno
		

		
		if(mysqli_num_rows($allOfertas) > 0){//si obteiene mas de 1
			
			while($row = mysqli_fetch_array($allOfertas)){//coge uno del array
				$viewjson["idOferta"] = $row['idOferta'];//va guardando los campos
				$viewjson["idUsuario"] = $row['idUsuario'];
				
				
				$json_array["userdata"][] = $viewjson;//junta todos
				  }
				  echo json_encode(["success"=>1]);//lo devuelve
				  return;
					  
			  }
			  else{
				echo json_encode(["success"=>0]);
				return;
			}


		
}


?>