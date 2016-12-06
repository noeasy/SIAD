var app=angular.module("Siad.controllerArchivos",[]);
app.controller('cntrl', function($scope,$http){
$scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.pages = [];

  $scope.configPages = function() {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.data.length / $scope.pageSize) > 10)
                fin = 10;
            else
                fin = Math.ceil($scope.data.length / $scope.pageSize);
        }
        else {
            if (ini >= Math.ceil($scope.data.length / $scope.pageSize) - 10) {
                ini = Math.ceil($scope.data.length / $scope.pageSize) - 10;
                fin = Math.ceil($scope.data.length / $scope.pageSize);
            }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
            $scope.pages.push({no: i});
        }

        if ($scope.currentPage >= $scope.pages.length)
            $scope.currentPage = $scope.pages.length - 1;
    };

    $scope.setPage = function(index) {
        $scope.currentPage = index - 1;
    };







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
				 
      $scope.registrarArchivo=function(){

		$http.post("Modelo/servicies/registrar.php",{'nombres':$scope.nombres, 'apellidos':$scope.apellidos, 'usuario':$scope.usua,'contraseña':$scope.contra})
		.success(function(data){
			if(data){
			alert("registro exitoso");
			$scope.nombres="";
			$scope.apellidos="";
			$scope.usua="";
			$scope.contra="";
			}
		})

	}
	$scope.mostrarArchivos=function(){
		var clasifi=$scope.clasificacion;
		$http.post("Modelo/servicies/listarArchivos.php",{'clasificacion':clasifi,'sesion':"no"})
		.success(function(data){
		 if(data==""){
              alert("No existen archivos para "+" "+clasifi);
		 }		
          $scope.data=data
         $scope.configPages();
		})
	}
	
	$scope.eliminarArchivo=function(id){
	 var tabla="archivos";
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
  $http.post("Modelo/servicies/eliminarRegistro.php",{'id':id,'tabla':tabla})
		.success(function(){
				$scope.msg="Data Deletion successfull";
				$scope.mostrarArchivos();


		});
})

   
		
    
	}

	

});
app.filter('startFromGrid', function() {
    return function(input, start) {
    if(input!=undefined){
        start =+ start;
        return input.slice(start);
    }
        
    }
});








