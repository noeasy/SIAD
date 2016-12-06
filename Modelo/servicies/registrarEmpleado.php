<?php
include "conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));
$nombres=$data->nombres;
$apellidos=$data->apellidos;
$usuario=$data->usuario;
$contraseña=$data->contraseña;

$consultaEmpleado = mysql_query("SELECT * from  `empleado` where nombres='$nombres'");
$consultaUsuario = mysql_query("SELECT * from  `usuario` where usuario='$usuario'");


 if(mysql_num_rows($consultaEmpleado)>0 && mysql_num_rows($consultaUsuario)>0)
  {
       echo "existe ambos";
  }
  else if(mysql_num_rows($consultaUsuario)>0)
  {
       echo "existe usuario";
  }else if(mysql_num_rows($consultaEmpleado)>0){
    echo "existe empleado";
  }else{
   
$query = mysql_query("INSERT INTO `empleado` (nombres,apellidos) VALUES ('$nombres','$apellidos')");
$query2 = mysql_query("INSERT INTO `usuario` (nombreEm,usuario,contrasena) VALUES ('$nombres','$usuario','$contraseña')");
  if($query=="1" && $query2=="1"){
    echo "inserto";
  }else{
    echo "no inserto";
  }

  }








?>