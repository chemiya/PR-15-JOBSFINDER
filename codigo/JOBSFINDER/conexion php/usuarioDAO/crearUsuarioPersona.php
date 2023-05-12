<?php 
require './../db_connection.php';

$data = json_decode(file_get_contents("php://input"));
//Convierte un string codificado en JSON a una variable de PHP


if(isset($data->username)
	&& isset($data->password) 
	&& isset($data->email) 
	&& isset($data->telefono) 
	&& isset($data->nombre)
	&& isset($data->apellidos)
	&& isset($data->genero)
	&& isset($data->fechaNacimiento)
	
	&& !empty(trim($data->username))
	&& !empty(trim($data->password))
	&& !empty(trim($data->email))
	&& !empty(trim($data->telefono))
	&& !empty(trim($data->nombre))
	&& !empty(trim($data->apellidos))
	&& !empty(trim($data->genero))
	&& !empty(trim($data->fechaNacimiento))
	
	){//trim quitas los espacios en blanco al principio y final, comprueba que de lo recibido esta todo completo
	

		
		
	$username = mysqli_real_escape_string($db_conn, trim($data->username));//quita caracteres especiales
	$password = mysqli_real_escape_string($db_conn, trim($data->password));
	$email = mysqli_real_escape_string($db_conn, trim($data->email));
	$telefono = mysqli_real_escape_string($db_conn, trim($data->telefono));
	$nombre = mysqli_real_escape_string($db_conn, trim($data->nombre));
	$apellidos = mysqli_real_escape_string($db_conn, trim($data->apellidos));
	$genero = mysqli_real_escape_string($db_conn, trim($data->genero));
	$fechaNacimiento = mysqli_real_escape_string($db_conn, trim($data->fechaNacimiento));

	
	include "./../mcript.php";
	$password = $encriptar($password);
	
	echo json_encode(["success"=>$password]);


	$descripcion="descripcion del perfil de una persona";

	$tipoUsuario="PERSONA";
	
	

	
	$add = mysqli_query($db_conn,"insert into usuario (username, password,email,descripcion,tipoUsuario,telefono,fotoRuta) values('$username','$password','$email','$descripcion','$tipoUsuario','$telefono','https://res.cloudinary.com/dg8yqncy0/image/upload/v1682111754/usuarioGenerico_w4atwg.jpg')");
	if($add){
		$last_id = mysqli_insert_id($db_conn);
		
	
	}else{
        echo json_encode(["success"=>0,"msg"=>"Server Problem. Please Try Again"]);
		return;
    } 

	$areas=$data->areas;	
	$idArea=0;

	include './../switchArea.php';
	foreach ($areas as $val) {

		$idArea=switchArea($val);
		

		
			 
				$addPersona = mysqli_query($db_conn,"insert into areaInteresado (idArea,idUsuario) values('$idArea','$last_id')");
			 
		}

	
	
	$addPersona = mysqli_query($db_conn,"insert into persona (nombre, apellidos,fechaNacimiento,sexo,idUsuario) values('$nombre','$apellidos','$fechaNacimiento','$genero','$last_id')");
		if($addPersona){
			$last_id = mysqli_insert_id($db_conn);
			echo json_encode(["success"=>1]);
		}

}
?>