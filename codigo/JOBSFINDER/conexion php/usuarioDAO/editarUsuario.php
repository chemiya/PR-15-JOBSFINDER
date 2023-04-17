<?php 
require './../db_connection.php';

$data = json_decode(file_get_contents("php://input"));//coge lo que le llega

if(isset($data->password)
	&& isset($data->email) 
	&& isset($data->descripcion) 
	&& isset($data->telefono) 
	&& isset($data->idUsuario) 
	&& !empty(trim($data->password))
	&& !empty(trim($data->email))
	&& !empty(trim($data->descripcion))
	&& !empty(trim($data->telefono))
	&& !empty(trim($data->idUsuario))
	){//comprueba que esten puestos y no vacios
		
	$password = mysqli_real_escape_string($db_conn, trim($data->password));//quita carac especiales
	$email = mysqli_real_escape_string($db_conn, trim($data->email));
	$descripcion = mysqli_real_escape_string($db_conn, trim($data->descripcion));
	$telefono = mysqli_real_escape_string($db_conn, trim($data->telefono));
	$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));

	//hace consulta
  $add = mysqli_query($db_conn,"update usuario set password ='$password', email ='$email', descripcion ='$descripcion', telefono ='$telefono' where idUsuario='$idUsuario'");

	if($add){//manda json de respuesta
		echo json_encode(["success"=>true]);
		return;
    }else{
        echo json_encode(["success"=>false,"msg"=>"Server Problem. Please Try Again"]);
		return;
    } 

} 
?>