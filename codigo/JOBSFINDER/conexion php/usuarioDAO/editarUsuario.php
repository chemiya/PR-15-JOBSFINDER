<?php 
require './../db_connection.php';

$data = json_decode(file_get_contents("php://input"));//coge lo que le llega

if(
	 isset($data->email) 
	&& isset($data->descripcion) 
	&& isset($data->telefono) 
	&& isset($data->idUsuario) 
	&& isset($data->fotoRuta) 
	&& !empty(trim($data->email))
	&& !empty(trim($data->descripcion))
	&& !empty(trim($data->telefono))
	&& !empty(trim($data->idUsuario))
	&& !empty(trim($data->fotoRuta))
	){//comprueba que esten puestos y no vacios
		
	
	$email = mysqli_real_escape_string($db_conn, trim($data->email));
	$descripcion = mysqli_real_escape_string($db_conn, trim($data->descripcion));
	$telefono = mysqli_real_escape_string($db_conn, trim($data->telefono));
	$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));
	$fotoRuta = mysqli_real_escape_string($db_conn, trim($data->fotoRuta));

	//hace consulta
  $add = mysqli_query($db_conn,"update usuario set  email ='$email', descripcion ='$descripcion', telefono ='$telefono' , fotoRuta ='$fotoRuta' where idUsuario='$idUsuario'");

	if($add){//manda json de respuesta
		echo json_encode(["success"=>1]);
		return;
    }else{
        echo json_encode(["success"=>0,"msg"=>"Server Problem. Please Try Again"]);
		return;
    } 

} 
?>