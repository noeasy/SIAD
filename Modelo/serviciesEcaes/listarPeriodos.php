<?php
include("../servicies/conexion_mysql.php");
$qry="select * from periodoacademico order by id DESC";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
	
      $arch = array(
      	"id" => $obj->id,
       "nombrePeriodo" => $obj->nombrePeriodo,
       "comunicacion" => $obj->comunicacion,
       "lectura" =>$obj->lectura,
       "razonamiento"=>$obj->razonamiento

       

     );
	    $datos[]=$arch;	
}
echo json_encode($datos);
mysql_close();

?>
   