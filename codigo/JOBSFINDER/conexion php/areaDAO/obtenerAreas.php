<?php
require './../db_connection.php';//llamamos la conexion
	$allAreas= mysqli_query($db_conn,"SELECT * FROM area");//busca todos
		if(mysqli_num_rows($allAreas) > 0){//recorre el array
			while($row = mysqli_fetch_array($allAreas)){//por cada uno coge los campos
				$viewjson["idArea"] = $row['idArea'];//va guardando los campos
				$viewjson["nombre"] = $row['nombre'];
				
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