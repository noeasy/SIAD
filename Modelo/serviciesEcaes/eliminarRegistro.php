<?php  

include("../servicies/conexion_mysql.php");
$data=json_decode(file_get_contents("php://input"));
$id=$data->id;
$nombre=$data->nombre;
$periodoA=$data->periodoA;
echo $periodoA;
$ruta=$data->ruta;

unlink("../".$ruta);


$qry="DELETE from ecaes where id='$id' and periodoA='$periodoA'";

$res=mysql_query($qry) or die("Query: $qry ".mysql_error());


$qry2="DELETE from datos_ecaes where nombreArchivo='$nombre' and periodoA='$periodoA'";

$res2=mysql_query($qry2) or die("Query: $qry2 ".mysql_error());

echo $res.$res2;
mysql_close();

 ?>