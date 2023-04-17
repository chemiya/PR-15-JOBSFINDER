<?php 
require './../db_connection.php';

$data = json_decode(file_get_contents("php://input"));
//Convierte un string codificado en JSON a una variable de PHP

if(isset($data->username)
	&& isset($data->password) 
	&& isset($data->email) 
	&& isset($data->telefono) 
	&& isset($data->tipoUsuario) 
	&& !empty(trim($data->username))
	&& !empty(trim($data->password))
	&& !empty(trim($data->email))
	&& !empty(trim($data->telefono))
	&& !empty(trim($data->tipoUsuario))
	){//trim quitas los espacios en blanco al principio y final, comprueba que de lo recibido esta todo completo
		
	$username = mysqli_real_escape_string($db_conn, trim($data->username));//quita caracteres especiales
	$password = mysqli_real_escape_string($db_conn, trim($data->password));
	$email = mysqli_real_escape_string($db_conn, trim($data->email));
	$telefono = mysqli_real_escape_string($db_conn, trim($data->telefono));
	$tipoUsuario = mysqli_real_escape_string($db_conn, trim($data->tipoUsuario));

	

if($tipoUsuario=="EMPRESA"){//descripcion segun tipo usuario
	$descripcion="descripcion del perfil de una empresa";
}else{
	$descripcion="descripcion del perfil de una persona";
}

	
	

	//inserta en la base con los datos recibidos
	$add = mysqli_query($db_conn,"insert into usuario (username, password,email,descripcion,tipoUsuario,telefono) values('$username','$password','$email','$descripcion','$tipoUsuario','$telefono')");
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