<?php
session_start();
include ("../servicies/conexion_mysql.php");
if(isset($_SESSION['usuario'])){
$fecha_antigua=$_SESSION['ultimoIngredo'];
$hora=date("Y-n-j H:i:s");
$tiempo=(strtotime($hora)-strtotime($fecha_antigua));
$operacion=43200;
  if($tiempo>=$operacion){
    session_destroy();
    echo "caducada";
  }else if($_SESSION['usuario']=="administrador"){
  	 echo "admin";
  }else{
  	 echo "vice";
  }

}else{
 echo "no hay sesion";
}

?> 