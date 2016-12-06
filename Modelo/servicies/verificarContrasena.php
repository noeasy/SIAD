<?php
include "conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));
   $contrasena=$data->contrasena;
   $query = mysql_query("SELECT * from  `usuario` where usuario='administrador' and contrasena='$contrasena'");
   if(mysql_num_rows($query)>0){
     echo "si";
}  else{
  echo "no";
}

	

?>