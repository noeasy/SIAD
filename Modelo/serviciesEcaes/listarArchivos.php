<?php
include("../servicies/conexion_mysql.php");
$data=json_decode(file_get_contents("php://input"));
$periodoA=$data->periodoA;
$qry="select * from ecaes where periodoA='$periodoA' ";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
	
      $arch = array(
      	"id" => $obj->id,
       "nombre" => $obj->nombre,
       "ruta" => $obj->ruta,
       "periodoA" => $obj->periodoA,
  

       

     );
	    $datos[]=$arch;	
}
echo json_encode($datos);
mysql_close();

?>
    