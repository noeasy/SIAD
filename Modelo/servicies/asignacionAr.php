<?php
include("conexion_mysql.php");
$qry="select * from archivos where clasificacion='Vicerrectoria'";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$datos=array();
while ($obj=mysql_fetch_object($res)) 
{

	if($obj->asignado=="no"){
		  $arch = array(
		  	"id"=>$obj->id,
      	"nombre" => $obj->nombre,
       "descripcion" => $obj->descripcion,
       "clasificacion" => $obj->clasificacion,
 
     );
	    $datos[]=$arch;	
	}

    
	 
}
echo json_encode($datos);
mysql_close();

?>
     