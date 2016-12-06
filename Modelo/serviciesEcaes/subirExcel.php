<?php
include "../servicies/conexion_mysql.php";
require_once dirname(__FILE__) . '/../Classes/PHPExcel/IOFactory.php';
$periodo=$_POST['periodo'];
$formatos=array('.xlsx','.xls');
$directorio="../archivosEcaes/$periodo";

    $nombreArchivo=$_FILES['file']['name'];
    $nombreTmpArchivo=$_FILES['file']['tmp_name'];
$ruta="archivosEcaes/$periodo/$nombreArchivo";
    $ext=substr($nombreArchivo, strrpos($nombreArchivo, '.'));

  if(in_array($ext, $formatos))
  {
          if(file_exists("../archivosEcaes/$periodo/$nombreArchivo"))
          {
                 echo "el archivo ya existe";
          }else{
                if(move_uploaded_file($nombreTmpArchivo, "../archivosEcaes/$periodo/$nombreArchivo"))
                {
                echo "archivo subido exitosamente";
                   $query = mysql_query("INSERT INTO `ecaes` (nombre,periodoA,ruta) VALUES 
                                  ('$nombreArchivo','$periodo','$ruta')");
                  $qry="select comunicacion,lectura,razonamiento from periodoacademico where nombrePeriodo='$periodo'";
                  $res=mysql_query($qry) or die("Query: $qry ".mysql_error());
                  $comunicacion="";
                  $lectura="";
                  $razonamiento="";
                  while ($obj=mysql_fetch_object($res)) 
                      {
                      $comunicacion=$obj->comunicacion;
                      $lectura=$obj->lectura;
                      $razonamiento=$obj->razonamiento;
                      }
                 $tmpfname ="../".$ruta;      
                 $excelReader = PHPExcel_IOFactory::createReaderForFile($tmpfname);
                  $excelObj = $excelReader->load($tmpfname);
                  $worksheet = $excelObj->getSheet(0);
                  $lastRow = $worksheet->getHighestRow();
                  
                 
                  for ($row = 1; $row <= $lastRow; $row++) {
                   

                  
                      $tipo1=$worksheet->getCell($comunicacion.$row)->getValue();                  
                      $tipo2=$worksheet->getCell($razonamiento.$row)->getValue();
                      $tipo3=$worksheet->getCell($lectura.$row)->getValue();
                    
                   

  $query = mysql_query("INSERT INTO `datos_ecaes` (nombreArchivo,periodoA,comunicacionE,razonamiento,lecturaC) VALUES ('$nombreArchivo','$periodo','$tipo1','$tipo2','$tipo3')");  
    }


                        if (mysql_query($query)) 
                        {
                            echo "inserto";
                        }else{
                          echo "no inserto";
                        }
                   }else{
                    echo "ocurrio un error";
                   }
               }

        
    }
    else
    {
    
    	echo "archivo no permitido";
    }





?>