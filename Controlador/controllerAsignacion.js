var app=angular.module("Siad.controllerAsignacion",[]);


app.controller('cntrlAsig', function($scope,$http){

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
	$scope.mostrarEmple=function(){


		$http.get("Modelo/servicies/listarEmple.php")
		.success(function(data){
			
			$scope.data2=data
		})
	}

	$scope.mostrarAsignacion=function(){
		$http.get("Modelo/servicies/asignacionAr.php")
		.success(function(data){
			$scope.data=data
		})
	}
   
	$scope.mostrarEmple();
	$scope.mostrarAsignacion();

	$scope.asignar=function(id){
	
			var selec=document.getElementById(id).value;
	 if(selec==""){
			 swal(
			  '',
			  'Debe seleccionar al personal',
			  'error'
			)
	 }else{
	 	$http.post("Modelo/servicies/asignarArchivo.php",{'id_Archivo':id, 'nombre_em':selec})
		.success(function(data){
          
            if(data==1){
				 swal(
				  '',
				  'Asignacion Exitosa!',
				  'success'
				)
            }else{
                 swal(
				  '',
				  'No se ha podido realizar la asignacion!',
				  'error'
                )
            }
              $scope.mostrarEmple();
	          $scope.mostrarAsignacion();
			
			
			
		})

	 }
		
		
	}
});
