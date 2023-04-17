<?php 
require './../db_connection.php';

$data = json_decode(file_get_contents("php://input"));
//Convierte un string codificado en JSON a una variable de PHP

if(isset($data->descripcion)
	&& isset($data->idUsuario) 
	
	&& !empty(trim($data->descripcion))
	&& !empty(trim($data->idUsuario))
	
	
	){//trim quitas los espacios en blanco al principio y final, comprueba que de lo recibido esta todo completo
		
	$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));//quita caracteres especiales
	$descripcion = mysqli_real_escape_string($db_conn, trim($data->descripcion));
	

	



	
	

	//inserta en la base con los datos recibidos
	$add = mysqli_query($db_conn,"insert into oferta (idUsuario,descripcion) values('$idUsuario','$descripcion')");
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