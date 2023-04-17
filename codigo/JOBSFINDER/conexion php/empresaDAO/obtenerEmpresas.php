<?php
require './../db_connection.php';//llamamos la conexion
	$allEmpresas= mysqli_query($db_conn,"SELECT * FROM empresa");//busca todos
		if(mysqli_num_rows($allEmpresas) > 0){//recorre el array
			while($row = mysqli_fetch_array($allEmpresas)){//por cada uno coge los campos
				$viewjson["idEmpresa"] = $row['idEmpresa'];//va guardando los campos
				$viewjson["idUsuario"] = $row['idUsuario'];
				$viewjson["sedeCentral"] = $row['sedeCentral'];
				$viewjson["url"] = $row['url'];
				$viewjson["nombre"] = $row['nombre'];
				$viewjson["estructuraJuridica"] = $row['estructuraJuridica'];
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