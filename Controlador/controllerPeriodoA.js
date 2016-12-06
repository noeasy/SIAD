var app=angular.module("Siad.controllerPeriodoA",['angularSpinner']);
app.controller('registroPeriodo', ['$scope', 'upload', '$http',function ($scope, upload,$http) 
{

	function verificar(){
	
  $http.get('Modelo/servicies/verificarSesion.php')
            .success(function(data) {
              
                    if(data=='vice '){
                    	
                       window.location="#/vicerrectoria";
                    }else if(data!='admin '){
                    	 window.location="#/";
                    }
                                   
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });



}


	verificar();


	
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

	 $scope.registrarPeriodo=function(){
 
		$http.post("Modelo/serviciesEcaes/registrarPeriodoA.php",{'periodoA':$scope.periodoA, 'comunicacionC':$scope.comunicacionC, 'lecturaC':$scope.lecturaC,'razonamientoC':$scope.razonamientoC})
		.success(function(data){
			
			if(data=="inserto")
			{
               swal(
					  '',
					  'REGISTRADO EXITOSAMENTE!',
					  'success'
					)
				$scope.periodoA="";
				$scope.comunicacionC="";
				$scope.lecturaC="";
				$scope.razonamientoC="";
			}else if(data=="existe")
			{
				swal(
					  '',
					  'PERIODO ACADEMICO YA SE ENCUENTRAN REGISTRADO',
					  'error'
					)

			}

			else{
               swal(
					  '',
					  'HA OCURRIDO UN ERROR AL REGISTRAR',
					  'error'
					)

			}
			
			
		})

	}

	
	



	

}])
app.controller('listarPeriodos', ['$scope', 'upload', '$http',function ($scope, upload,$http) 
{

	function verificar(){
	
  $http.get('Modelo/servicies/verificarSesion.php')
            .success(function(data) {
                 
                    if(data=='vice '){
                    	
                       window.location="#/vicerrectoria";
                    }else if(data!='admin '){
                    	 window.location="#/";
                    }
                                   
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });



}


	verificar();


	
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

	  $scope.listarPeriodo=function(){
   
    $http.get("Modelo/serviciesEcaes/listarPeriodos.php")
    .success(function(data){
      $scope.data2=data;
    })
  }
  $scope.listarPeriodo();

$scope.mostrarDatosModal=function(id,nombre,comunicacion,lectura,razonamiento){
	$scope.desactivarCC=true;
  $scope.idEm=id;
  $scope.periodo=nombre;
  $scope.comunicacion=comunicacion;
  $scope.lectura=lectura;
  $scope.razonamiento=razonamiento;

}

$scope.modificarDatos=function(){
	

	$http.post("Modelo/serviciesEcaes/actualizarPeriodo.php",{'comunicacion':$scope.comunicacion,'lectura':$scope.lectura,'razonamiento':$scope.razonamiento,'id':$scope.idEm})
		.success(function(data){
			if(data=="1")
			{
				 $scope.listarPeriodo();
				$('#myModal').modal('toggle');
               swal(
					  '',
					  'ACTUALIZADO EXITOSAMENTE!',
					  'success'
					)
				
			}

			else{
				$('#myModal').modal('toggle');
               swal(
					  '',
					  'HA OCURRIDO UN ERROR AL ACTUALIZAR',
					  'error'
					)

			}
			
			
		})

}


	$scope.eliminarPeriodo=function(id,periodoA){
  swal({
  title: 'Esta seguro?',
  text: "No podras recuperar este archivo!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Borrarlo!',
  cancelButtonText:'Cancelar'
}).then(function() {
  swal(
    'Eliminado!',
    'Este archvo fue eliminado exitosamente.',
    'success'
  );
  $http.post("Modelo/serviciesEcaes/eliminarPeriodo.php",{'id':id,'periodoA':periodoA})
		.success(function(data){
			
			 $scope.listarPeriodo();


		});
})

   
		
    
	}	
	



	

}])