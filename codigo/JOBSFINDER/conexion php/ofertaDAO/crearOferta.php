<?php 
require './../db_connection.php';

$data = json_decode(file_get_contents("php://input"));
//Convierte un string codificado en JSON a una variable de PHP


if(isset($data->descripcion)
	&& isset($data->idUsuario) 
	&& isset($data->detallesSueldo) 
	&& isset($data->detallesExperiencia) 
	&& isset($data->detallesFormato) 
	&& !empty(trim($data->descripcion))
	&& !empty(trim($data->idUsuario))
	&& !empty(trim($data->detallesSueldo))
	&& !empty(trim($data->detallesExperiencia))
	&& !empty(trim($data->detallesFormato))
	){//trim quitas los espacios en blanco al principio y final, comprueba que de lo recibido esta todo completo
	
		/*echo json_encode(["success"=>1]);
		return;	*/

	$idUsuario = mysqli_real_escape_string($db_conn, trim($data->idUsuario));//quita caracteres especiales
	$descripcion = mysqli_real_escape_string($db_conn, trim($data->descripcion));
	$detallesSueldo = mysqli_real_escape_string($db_conn, trim($data->detallesSueldo));
	$detallesExperiencia = mysqli_real_escape_string($db_conn, trim($data->detallesExperiencia));
	$detallesFormato = mysqli_real_escape_string($db_conn, trim($data->detallesFormato));
	

	



	
	

	//inserta en la base con los datos recibidos
	$add = mysqli_query($db_conn,"insert into oferta (idUsuario,descripcion,detallesSueldo,detallesExperiencia,detallesFormato,estado) values('$idUsuario','$descripcion','$detallesSueldo','$detallesExperiencia','$detallesFormato','ABIERTA')");
	if($add){
		$last_id = mysqli_insert_id($db_conn);//coge el id generado
	
    }else{
        echo json_encode(["success"=>0,"msg"=>"Server Problem. Please Try Again"]);
		return;
    } 



	$areas=$data->areas;	
	$idArea=0;

	include './../switchArea.php';
	foreach ($areas as $val) {

		$idArea=switchArea($val);
		

		
			 
				$addPersona = mysqli_query($db_conn,"insert into areaRequerido (idArea,idOferta) values('$idArea','$last_id')");
			 
		}

}
?>