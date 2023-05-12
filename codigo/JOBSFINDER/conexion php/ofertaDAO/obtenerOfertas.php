<?php
require './../db_connection.php';//llamamos la conexion
	$allOfertas= mysqli_query($db_conn,"SELECT o.idOferta as idOferta,o.descripcion as descripcion, o.estado as estado, u.username as username, u.fotoRuta as fotoRuta  FROM oferta o, usuario u where o.idUsuario=u.idUsuario");//busca todos
		if(mysqli_num_rows($allOfertas) > 0){//recorre el array
			while($row = mysqli_fetch_array($allOfertas)){//por cada uno coge los campos
				$viewjson["descripcion"] = $row['descripcion'];//va guardando los campos
				$viewjson["username"] = $row['username'];
				$viewjson["estado"] = $row['estado'];
				$viewjson["idOferta"] = $row['idOferta'];
				$viewjson["fotoRuta"] = $row['fotoRuta'];
			
				$json_array["userdata"][] = $viewjson;//los va almacenado 
			}
			echo json_encode(["success"=>true,"ofertas"=>$json_array]);//devuelve el array
			return;
		}
		else{
			echo json_encode(["success"=>false]);
			return;
		}
?>