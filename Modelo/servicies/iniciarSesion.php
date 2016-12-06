<?php
session_start();
include "conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));
   $usuario=$data->usuario;
   $contrasena=$data->contrasena;
   $query = mysql_query("SELECT * from  `usuario` where usuario='$usuario' and contrasena='$contrasena'");
   if(mysql_num_rows($query)>0){
       $row=mysql_fetch_array($query);
       $_SESSION['nombres']=$row['nombreEm'];
       $_SESSION['usuario']=$row['usuario'];
       $_SESSION['ultimoIngredo']=date("Y-n-j H:i:s");
     echo "si";
}  else{
  echo "no";
}

	

?>