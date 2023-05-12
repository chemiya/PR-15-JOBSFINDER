<?php 
require './../db_connection.php';

$data = json_decode(file_get_contents("php://input"));
//Convierte un string codificado en JSON a una variable de PHP

if(isset($data->idOferta)
	&& isset($data->idUsuario) 
	
	&& !empty(trim($data->idOferta))
	&& !empty(trim($data->idUsuario))
	
	
	){//trim quitas los espacios en blanco al principio y final, comprueba que de lo recibido esta todo completo
		
	$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));//quita caracteres especiales
	$idOferta = mysqli_real_escape_string($db_conn, trim($data->idOferta));
	

	



	
	

	//inserta en la base con los datos recibidos
	$add = mysqli_query($db_conn,"insert into guardada (idUsuario,idOferta) values('$idUsuario','$idOferta')");
	if($add){
		$last_id = mysqli_insert_id($db_conn);//coge el id generado
		echo json_encode(["success"=>1]);//devuelve un json
		return;
    }else{
        echo json_encode(["success"=>0]);
		return;
    } 

}
?>