<?php

	$server="localhost";
	$username="root";
	$password="";  
	$db="siad"; 	

	/*
	$server="sandbox2.ufps.edu.co";
	$username="ufps_11";
	$password="ufps_90";  
	$db="ufps_11"; 
	*/	
	$con=mysql_connect($server,$username,$password)or die("no se ha podido establecer la conexion");
	$sdb=mysql_select_db($db,$con)or die("la base de datos no existe");
?>