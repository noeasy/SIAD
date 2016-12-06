<?php  

include("conexion_mysql.php");
$data=json_decode(file_get_contents("php://input"));
$id=$data->id;
$tabla=$data->tabla;
if($tabla!="empleado"){
$qry2="select ruta from archivos where id='$id'";
$res=mysql_query($qry2) or die("Query: $qry ".mysql_error());
$obj=mysql_fetch_object($res);
$ruta=$obj->ruta;
unlink("../".$ruta);
}else{
	$selectNombre=mysql_query("select nombres from empleado where id='$id'");
	  $row=mysql_fetch_array($selectNombre);
      $nombreEm=$row['nombres'];
      $asignado="";
      $res2="DELETE from usuario where nombreEm='$nombreEm'";
	  $deleteUsuario=mysql_query($res2) or die("Query: $res2 ".mysql_error());
	   $res3="UPDATE archivos SET Usuario='$asignado', asignado='no' where Usuario='$nombreEm'";
	  $deleteUsuario=mysql_query($res3) or die("Query: $res3 ".mysql_error());
}

$qry="DELETE from $tabla where id=".$id;

$res=mysql_query($qry) or die("Query: $qry ".mysql_error());



mysql_close();

 ?>