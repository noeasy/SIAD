<?php
include "conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));
   $nuevaContra=$data->nuevaContra;



$query = "UPDATE usuario SET contrasena='$nuevaContra'                 
					 where usuario='administrador'";

$res=mysql_query($query) or die("Query: $query ".mysql_error());

echo $res;
	

?>