<?php
include("../servicies/conexion_mysql.php");
$data=json_decode(file_get_contents("php://input"));
$periodoA=$data->periodoA;
$comunicacionC=$data->comunicacionC;
$lecturaC=$data->lecturaC;
$razonamientoC=$data->razonamientoC;

$consultaPeriodo = mysql_query("SELECT * from  `periodoacademico` where nombrePeriodo='$periodoA'");


 if(mysql_num_rows($consultaPeriodo)>0)
  {
       echo "existe";
  }
  
  else{
 mkdir("../archivosEcaes/$periodoA", 0777);  
$query = mysql_query("INSERT INTO `periodoacademico` (nombrePeriodo,comunicacion,lectura,razonamiento) VALUES ('$periodoA','$comunicacionC','$lecturaC','$razonamientoC')");
  if($query=="1"){
    echo "inserto";
  }else{
    echo $query;
  }

  }
?>