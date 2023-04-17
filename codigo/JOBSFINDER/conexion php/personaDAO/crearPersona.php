<?php 
require './../db_connection.php';

$data = json_decode(file_get_contents("php://input"));
//Convierte un string codificado en JSON a una variable de PHP

if(isset($data->idUsuario)
	&& isset($data->nombre) 
	&& isset($data->apellidos) 
	&& isset($data->sexo) 
	&& isset($data->fechaNacimiento) 
	&& !empty(trim($data->idUsuario))
	&& !empty(trim($data->nombre))
	&& !empty(trim($data->apellidos))
	&& !empty(trim($data->sexo))
	&& !empty(trim($data->fechaNacimiento))
	){//trim quitas los espacios en blanco al principio y final, comprueba que de lo recibido esta todo completo
		
	$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));//quita caracteres especiales
	$nombre = mysqli_real_escape_string($db_conn, trim($data->nombre));
	$apellidos = mysqli_real_escape_string($db_conn, trim($data->apellidos));
	$sexo = mysqli_real_escape_string($db_conn, trim($data->sexo));
	$fechaNacimiento = mysqli_real_escape_string($db_conn, trim($data->fechaNacimiento));

	



	
	

	//inserta en la base con los datos recibidos
	$add = mysqli_query($db_conn,"insert into persona (idUsuario, nombre,apellidos,fechaNacimiento,sexo) values('$idUsuario','$nombre','$apellidos','$fechaNacimiento','$sexo')");
	if($add){
		$last_id = mysqli_insert_id($db_conn);//coge el id generado
		echo json_encode(["success"=>true,"insertid"=>$last_id]);//devuelve un json
		return;
    }else{
        echo json_encode(["success"=>false,"msg"=>"Server Problem. Please Try Again"]);
		return;
    } 

}
?>