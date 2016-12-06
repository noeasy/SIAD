<?php

include("../servicies/conexion_mysql.php");
$data=json_decode(file_get_contents("php://input"));
$periodoA=$data->periodoA;
$qry="SELECT nombreArchivo as nombre,a.periodoA as Periodo,SUM(CASE WHEN cast(lecturaC as DECIMAL(10,1))<=9.5 and cast(lecturaC as DECIMAL(10,1))>=0.1  THEN 1 ELSE 0 END) AS bajo,
SUM(CASE WHEN cast(lecturaC as DECIMAL(10,1))>9.5 and cast(lecturaC as DECIMAL(10,1))<10.7 THEN 1 ELSE 0 END) AS medio, 
SUM(CASE WHEN cast(lecturaC as DECIMAL(10,1))>=10.7 THEN 1 ELSE 0 END) AS alto
FROM datos_ecaes,ecaes a
where datos_ecaes.nombreArchivo IN (SELECT nombre FROM ecaes)
and datos_ecaes.nombreArchivo=a.nombre
and datos_ecaes.periodoA='$periodoA'
and a.periodoA='$periodoA'
group by nombreArchivo";


$res=mysql_query($qry) or die("Query: $qry ".mysql_error());

$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
		$qry2="SELECT nombreArchivo as nombre,SUM(CASE WHEN cast(razonamiento as DECIMAL(10,1))<=9.5 and cast(razonamiento as DECIMAL(10,1))>=0.1  THEN 1 ELSE 0 END) AS bajo,
SUM(CASE WHEN cast(razonamiento as DECIMAL(10,1))>9.5 and cast(razonamiento as DECIMAL(10,1))<10.7 THEN 1 ELSE 0 END) AS medio, 
SUM(CASE WHEN cast(razonamiento as DECIMAL(10,1))>=10.7 THEN 1 ELSE 0 END) AS alto
		FROM datos_ecaes where nombreArchivo='$obj->nombre' and periodoA='$obj->Periodo'";
		$res2=mysql_query($qry2) or die("Query: $qry2 ".mysql_error());
	    $obj2=mysql_fetch_object($res2);

	    $qry3="SELECT nombreArchivo as nombre,SUM(CASE WHEN cast(comunicacionE as DECIMAL(10,1))<=9.5 and cast(comunicacionE as DECIMAL(10,1))>=0.1  THEN 1 ELSE 0 END) AS bajo,
SUM(CASE WHEN cast(comunicacionE as DECIMAL(10,1))>9.5 and cast(comunicacionE as DECIMAL(10,1))<10.7 THEN 1 ELSE 0 END) AS medio, 
SUM(CASE WHEN cast(comunicacionE as DECIMAL(10,1))>=10.7 THEN 1 ELSE 0 END) AS alto
		FROM datos_ecaes where nombreArchivo='$obj->nombre'  and periodoA='$obj->Periodo'";
		$res3=mysql_query($qry3) or die("Query: $qry3 ".mysql_error());
	    $obj3=mysql_fetch_object($res3);


      $arch = array(
      "nombreArchivo" => $obj->nombre,
      "bajoL" => $obj->bajo,
      "medioL" => $obj->medio,
      "altoL" =>$obj->alto,
      "bajoZ"=>$obj2->bajo,
      "medioZ"=>$obj2->medio,
      "altoZ"=>$obj2->alto,
      "bajoC"=>$obj3->bajo,
      "medioC"=>$obj3->medio,
      "altoC"=>$obj3->alto
       

     );
	    $datos[]=$arch;	
}
echo json_encode($datos);
mysql_close();


    


?>