<?php
include "conexion_mysql.php";
$nombre=$_POST['nombre'];
$descripcion=$_POST['descripcion'];
$clasificacion=$_POST['clasificacion'];


$formatos=array('.doc','.odt','.docx','.xlsx','.xls');
$directorio='../archivos';

    $nombreArchivo=$_FILES['file']['name'];
    $nombreTmpArchivo=$_FILES['file']['tmp_name'];
$ruta="archivos/$nombreArchivo";
    $ext=substr($nombreArchivo, strrpos($nombreArchivo, '.'));

  if(in_array($ext, $formatos))
  {
          if(file_exists("../archivos/$nombreArchivo"))
          {
                 echo "el archivo ya existe";
          }else{
                if(move_uploaded_file($nombreTmpArchivo, "../archivos/$nombreArchivo"))
                {
                echo "archivo subido exitosamente";
                        $query = "INSERT INTO `archivos` (nombre,descripcion,clasificacion,ruta) VALUES 
                                  ('$nombre','$descripcion','$clasificacion','$ruta')";


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