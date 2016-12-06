<?php
include("conexion_mysql.php");
$data=json_decode(file_get_contents("php://input"));
$id_archivo=$data->id_Archivo;
$nombre_em=$data->nombre_em;

$query = "UPDATE archivos SET asignado='si',
                              Usuario='$nombre_em'    
					 where id='$id_archivo'";
$res=mysql_query($query) or die("Query: $query ".mysql_error());
echo $res;

?>
     