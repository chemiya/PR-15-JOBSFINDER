<?php
require './../db_connection.php';
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega





if(isset($data->idUsuario) 
&& isset($data->idOferta) 
	&& !empty(trim($data->idUsuario))
 && !empty(trim($data->idOferta))
	){//comprueba que este el id
		$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));//quita carac especiales
		$idOferta = mysqli_real_escape_string($db_conn, trim($data->idOferta));//quita carac especiales
		$allOfertas = mysqli_query($db_conn,"delete FROM guardada g  where g.idUsuario='$idUsuario' and g.idOferta='$idOferta'");//hace consulta para buscar uno
		
		if($allOfertas==true){
			echo json_encode(["success"=>1]);
		}else{
			echo json_encode(["success"=>0]);
		}
		
		/*if(mysqli_num_rows($allOfertas) > 0){//si obteiene mas de 1
			
			
				  echo json_encode(["success"=>1]);//lo devuelve
				  return;
					  
			  }
			  else{
				echo json_encode(["success"=>0]);
				return;
			}*/


		
}


?>