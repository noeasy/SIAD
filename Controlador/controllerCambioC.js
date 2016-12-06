var app=angular.module("Siad.controllerCambioC",[]);
app.controller('cambioContrasena', function($scope,$http){
$scope.cerrarS=function(){
		swal({
  text: "Esta Seguro que desea cerrar sesion?!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Cerrar!',
  cancelButtonText:'Cancelar'
}).then(function() {
  swal(
   
  );
  $http.get("Modelo/servicies/cerrarSesion.php")
            .success(function(data){
              window.location="#/";
              
            });
})

	}
	
$scope.cambioContrasena=function(){
function tiene_letras(texto){
 var regex=/^[0-9A-Za-z]+$/;
  if(regex.test(texto)){
    return true;
  } 
  else {
    return false;
  }
}

if(tiene_letras($scope.nuevaContra) && tiene_letras($scope.contrasena) && tiene_letras($scope.repNuevaContra)){
var coincide="";
	if($scope.nuevaContra==$scope.repNuevaContra)
	{
     $http.post("Modelo/servicies/verificarContrasena.php",{'contrasena':$scope.contrasena})
    .success(function(data){
      if(data=="si")
    {
      $http.post("Modelo/servicies/cambioContra.php",{'nuevaContra':$scope.nuevaContra})
    .success(function(data){
      if(data=="1"){
      	$scope.nuevaContra="";
      	$scope.repNuevaContra="";
      	$scope.contrasena="";
          swal(
          '',
          'CAMBIO DE CONTRASEÑA EXITOSO',
          'success'
        )
      }
    })

    }else{
    	swal(
          '',
          'LA CONTRASEÑA NO COINCIDE CON LA ACTUAL',
          'error'
        )
    }

    })

    

	}else{
		swal(
          '',
          'LA CONFIRMACION DE LA CONTRASEÑA NO COINCIDE',
          'error'
        )
	}
}else{
	 swal(
          '',
          'SOLO CARACTERES ALFANUMERICOS',
          'error'
        )
}



	
}
})