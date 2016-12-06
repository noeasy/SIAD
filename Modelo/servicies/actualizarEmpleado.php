<?php

include "conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));
$nombres=$data->nombres;
$usuario=$data->usuario;
$contrasena=$data->contrasena;




$query = "UPDATE usuario SET usuario='$usuario',
                             contrasena='$contrasena'    
					 where nombreEm='$nombres'";

$res=mysql_query($query) or die("Query: $query ".mysql_error());

echo $res;

?>