<?php
require './../db_connection.php';//llamamos la conexion
	$allAreasInteresado= mysqli_query($db_conn,"SELECT * FROM areaInteresado");//busca todos
		if(mysqli_num_rows($allAreasInteresado) > 0){//recorre el array
			while($row = mysqli_fetch_array($allAreasInteresado)){//por cada uno coge los campos
				$viewjson["idArea"] = $row['idArea'];//va guardando los campos
				$viewjson["idUsuario"] = $row['idUsuario'];
				
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