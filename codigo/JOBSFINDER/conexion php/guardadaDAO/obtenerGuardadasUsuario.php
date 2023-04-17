<?php
require './../db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->idUsuario) 
	&& !empty(trim($data->idUsuario))
	){//comprueba que este el id
		$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));//quita carac especiales
		$allOfertas = mysqli_query($db_conn,"SELECT o.idOferta as idOferta, o.descripcion as descripcion, o.estado as estado, u.username as username FROM guardada g, oferta o, usuario u  where g.idUsuario='$idUsuario' and g.idOferta=o.idOferta and o.idUsuario=u.idUsuario");//hace consulta para buscar uno
		

		
		if(mysqli_num_rows($allOfertas) > 0){//si obteiene mas de 1
			
			while($row = mysqli_fetch_array($allOfertas)){//coge uno del array
				$viewjson["idOferta"] = $row['idOferta'];//va guardando los campos
				$viewjson["descripcion"] = $row['descripcion'];
				$viewjson["estado"] = $row['estado'];
				$viewjson["username"] = $row['username'];
				
				$json_array["userdata"][] = $viewjson;//junta todos
				  }
				  echo json_encode(["success"=>true,"guardadas"=>$json_array]);//lo devuelve
				  return;
					  
			  }
			  else{
				echo json_encode(["success"=>false]);
				return;
			}


		
}


?>