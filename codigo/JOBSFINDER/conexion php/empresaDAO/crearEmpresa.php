<?php 
require './../db_connection.php';

$data = json_decode(file_get_contents("php://input"));
//Convierte un string codificado en JSON a una variable de PHP

if(isset($data->idUsuario)
	&& isset($data->sedeCentral) 
	&& isset($data->url) 
	&& isset($data->nombre) 
	&& isset($data->estructuraJuridica) 
	&& !empty(trim($data->idUsuario))
	&& !empty(trim($data->sedeCentral))
	&& !empty(trim($data->url))
	&& !empty(trim($data->nombre))
	&& !empty(trim($data->estructuraJuridica))
	){//trim quitas los espacios en blanco al principio y final, comprueba que de lo recibido esta todo completo
		
	$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));//quita caracteres especiales
	$sedeCentral = mysqli_real_escape_string($db_conn, trim($data->sedeCentral));
	$url = mysqli_real_escape_string($db_conn, trim($data->url));
	$nombre = mysqli_real_escape_string($db_conn, trim($data->nombre));
	$estructuraJuridica = mysqli_real_escape_string($db_conn, trim($data->estructuraJuridica));

	



	
	

	//inserta en la base con los datos recibidos
	$add = mysqli_query($db_conn,"insert into empresa (idUsuario, sedeCentral,url,nombre,estructuraJuridica) values('$idUsuario','$sedeCentral','$url','$nombre','$estructuraJuridica')");
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