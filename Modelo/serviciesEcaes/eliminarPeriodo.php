<?php  

include("../servicies/conexion_mysql.php");
$data=json_decode(file_get_contents("php://input"));
$id=$data->id;
$periodoA=$data->periodoA;

foreach(glob("../archivosEcaes/".$periodoA."/*.*") as $archivos_carpeta)  
{  
 unlink($archivos_carpeta);     // Eliminamos todos los archivos de la carpeta hasta dejarla vacia  
}  
rmdir("../archivosEcaes/".$periodoA);


$qry="DELETE from ecaes where periodoA='$periodoA'";

$res=mysql_query($qry) or die("Query: $qry ".mysql_error());

$qry2="DELETE from datos_ecaes where periodoA='$periodoA'";

$res2=mysql_query($qry2) or die("Query: $qry2 ".mysql_error());

$qry3="DELETE from periodoacademico where id='$id'";

$res3=mysql_query($qry3) or die("Query: $qry3 ".mysql_error());

?>