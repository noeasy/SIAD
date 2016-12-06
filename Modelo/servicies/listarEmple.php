<?php
include("conexion_mysql.php");
$qry="select * from empleado";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
	$qry2="select * from usuario where nombreEm='$obj->nombres'";
    $res2=mysql_query($qry2) or die("Query: $qry2 ".mysql_error());
    $obj2=mysql_fetch_object($res2);
      $arch = array(
      	"id" => $obj->id,
       "nombres" => $obj->nombres,
       "apellidos" => $obj->apellidos,
       "usuario" =>$obj2->usuario,
       "contrasena"=>$obj2->contrasena

       

     );
	    $datos[]=$arch;	
}
echo json_encode($datos);
mysql_close();

?>
     