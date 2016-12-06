<?php  

include("../servicies/conexion_mysql.php");
$data=json_decode(file_get_contents("php://input"));
$id=$data->id;
$comunicacion=$data->comunicacion;
$lectura=$data->lectura;
$razonamiento=$data->razonamiento;


$query = "UPDATE periodoacademico SET comunicacion='$comunicacion',
                             lectura='$lectura', 
                             razonamiento='$razonamiento'   
					 where id='$id'";

$res=mysql_query($query) or die("Query: $query ".mysql_error());

echo $res;

 ?>