<?php
include("conexion_mysql.php");
$data=json_decode(file_get_contents("php://input"));
$clasificacion=$data->clasificacion;
$sesion=$data->sesion;
if($sesion=="si"){
$qry="select * from archivos where Usuario='Todos los empleados'";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
      $arch = array(
        "id" => $obj->id,
       "nombre" => $obj->nombre,
       "clasificacion" => $obj->clasificacion,
       "descripcion" => $obj->descripcion,
       "ruta" => $obj->ruta,
     );
      $datos[]=$arch; 
   
}
echo json_encode($datos);
mysql_close();

}
else if($sesion=="sip"){
session_start();
$clasificacion=$_SESSION['nombres'];
$qry="select * from archivos where Usuario='$clasificacion'";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
      $arch = array(
        "id" => $obj->id,
       "nombre" => $obj->nombre,
       "clasificacion" => $obj->clasificacion,
       "descripcion" => $obj->descripcion,
       "ruta" => $obj->ruta,
      
     );
      $datos[]=$arch; 
   
}
echo json_encode($datos);
mysql_close();
}

else{


$qry="select * from archivos where clasificacion='$clasificacion'";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
 
      $arch = array(
      	"id" => $obj->id,
       "nombre" => $obj->nombre,
       "clasificacion" => $clasificacion,
       "descripcion" => $obj->descripcion,
       "ruta" => $obj->ruta,
        "asignado" => $obj->Usuario,
     );
	    $datos[]=$arch;	
	 
}
echo json_encode($datos);
mysql_close();
}
?>
            
   