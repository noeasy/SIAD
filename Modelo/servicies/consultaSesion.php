<?php
session_start();
include("conexion_mysql.php");
$nombre=$_SESSION['nombres'];
echo $nombre;
?>