<?php

include("../servicies/conexion_mysql.php");
$data=json_decode(file_get_contents("php://input"));
$periodoA=$data->periodoA;
/* CONSULTA 1*/
$qry="SELECT COUNT(lecturaC) as TOTAL
from datos_ecaes
where cast(lecturaC as DECIMAL(10,1))>=0.1
and periodoA='$periodoA'
";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$obj=mysql_fetch_object($res);
$datos=array();

/* CONSULTA 2*/
$qry2="SELECT COUNT(lecturaC) as TOTAL                    
from datos_ecaes
where cast(lecturaC as DECIMAL(10,1))>9.5
and cast(lecturaC as DECIMAL(10,1))<10.7
and periodoA='$periodoA';
";
$res2=mysql_query($qry2) or die("Query: $qry2 ".mysql_error());
$obj2=mysql_fetch_object($res2);

/* CONSULTA 3*/
$qry3="SELECT COUNT(lecturaC) as TOTAL                    
from datos_ecaes
where cast(lecturaC as DECIMAL(10,1))>=10.7
and periodoA='$periodoA'";

$res3=mysql_query($qry3) or die("Query: $qry3 ".mysql_error());
$obj3=mysql_fetch_object($res3);

/* CONSULTA 4*/
$qry4="SELECT COUNT(razonamiento) as TOTAL           
from datos_ecaes
where cast(razonamiento as DECIMAL(10,1))>=0.1
and periodoA='$periodoA'
;
";
$res4=mysql_query($qry4) or die("Query: $qry4 ".mysql_error());
$obj4=mysql_fetch_object($res4);

/* CONSULTA 5*/
$qry5="SELECT COUNT(razonamiento) as TOTAL            
from datos_ecaes
where cast(razonamiento as DECIMAL(10,1))>9.5
and cast(razonamiento as DECIMAL(10,1))<10.7
and periodoA='$periodoA';
";
$res5=mysql_query($qry5) or die("Query: $qry5 ".mysql_error());
$obj5=mysql_fetch_object($res5);

/* CONSULTA 6*/
$qry6="SELECT COUNT(razonamiento) as TOTAL        
from datos_ecaes
where cast(razonamiento as DECIMAL(10,1))>=10.7
and periodoA='$periodoA'
;
";
$res6=mysql_query($qry6) or die("Query: $qry6 ".mysql_error());
$obj6=mysql_fetch_object($res6);


/* CONSULTA 7*/
$qry7="SELECT COUNT(comunicacionE) as TOTAL             
from datos_ecaes
where cast(comunicacionE as DECIMAL(10,1))>=0.1
and periodoA='$periodoA'
";
$res7=mysql_query($qry7) or die("Query: $qry7 ".mysql_error());
$obj7=mysql_fetch_object($res7);

/* CONSULTA 8*/
$qry8="SELECT COUNT(comunicacionE) as TOTAL             
from datos_ecaes
where cast(comunicacionE as DECIMAL(10,1))>9.5
and cast(comunicacionE as DECIMAL(10,1))<10.7
and periodoA='$periodoA'
;
";
$res8=mysql_query($qry8) or die("Query: $qry8 ".mysql_error());
$obj8=mysql_fetch_object($res8);

/* CONSULTA 9*/
$qry9="SELECT COUNT(comunicacionE) as TOTAL            
from datos_ecaes
where cast(comunicacionE as DECIMAL(10,1))>=10.7
and periodoA='$periodoA';
";
$res9=mysql_query($qry9) or die("Query: $qry9 ".mysql_error());
$obj9=mysql_fetch_object($res9);

  $arch = array(
      "v1" => $obj->TOTAL,
      "v2" => $obj2->TOTAL,
      "v3" => $obj3->TOTAL,
      "v4" => $obj4->TOTAL,
      "v5" => $obj5->TOTAL,
      "v6" => $obj6->TOTAL,
      "v7" => $obj7->TOTAL,
      "v8" => $obj8->TOTAL,
      "v9" => $obj9->TOTAL,
  );



    
	    $datos[]=$arch;	

echo json_encode($datos);
mysql_close();


    


?>