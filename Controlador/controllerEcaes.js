
var app=angular.module("Siad.controllerEcaes",['angularSpinner']);

app.controller('Ecaes', ['$scope', 'upload', '$http','usSpinnerService',function ($scope, upload,$http,usSpinnerService) 
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
  $scope.listarPeriodo=function(){
   
    $http.get("Modelo/serviciesEcaes/listarPeriodos.php")
    .success(function(data){
      $scope.data2=data;
    })
  }
  $scope.listarPeriodo();
	
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

	$scope.uploadFile = function()
	{
		var name = $scope.name;
		var file = $scope.file;
		var periodo=$scope.periodoA;
		
		upload.uploadFile(file, name,usSpinnerService,periodo).then(function(res)
		{
			
			
		})
	}
	$scope.limpiarCampos=function(){
				$scope.name="";
		$scope.file="";
		$scope.nombre="";
		 $scope.descripcion="";
		 $scope.clasificacion="";
	}
}])

app.directive('uploaderModel', ["$parse", function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) 
		{
			iElement.on("change", function(e)
			{
				$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
			});
		}
	};
}])

app.service('upload', ["$http", "$q", function ($http, $q,$scope) 
{
 
	this.uploadFile = function(file, name,usSpinnerService,periodo)
	{
		usSpinnerService.spin('spinner-1');
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("name", name);
    formData.append("periodo", periodo);
		formData.append("file", file);
		return $http.post("Modelo/serviciesEcaes/subirExcel.php", formData,{
			headers: {
				"Content-type": undefined
			},
			transformRequest: angular.identity

		})
		.success(function(res)
		{	
	
			usSpinnerService.stop('spinner-1');

			if(res=="el archivo ya existe"){
				   swal(
				  '',
				  'EL ARCHIVO YA EXISTE!',
				  'error'
				)
			}else if(res=="archivo no permitido"){
                  swal(
				  '',
				  'TIPO DE ARCHIVO NO PERMITIDO!',
				  'error'
				)
			}else{
				 swal(
				  '',
				  'ARCHIVO SUBIDO EXITOSAMENTE!',
				  'success'
				)
			}
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})
		return deferred.promise;
	}


}])
app.controller('AnalisisEcaes', ['$scope', 'upload', '$http','usSpinnerService',function ($scope, upload,$http,usSpinnerService) 
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
$scope.currentPage = 0;
    $scope.pageSize = 15;
    $scope.pages = [];

  $scope.configPages = function() {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.dataE.length / $scope.pageSize) > 10)
                fin = 10;
            else
                fin = Math.ceil($scope.dataE.length / $scope.pageSize);
        }
        else {
            if (ini >= Math.ceil($scope.dataE.length / $scope.pageSize) - 10) {
                ini = Math.ceil($scope.dataE.length / $scope.pageSize) - 10;
                fin = Math.ceil($scope.dataE.length / $scope.pageSize);
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

$scope.mostrarAnalisis=function(){
 usSpinnerService.spin('spinner-1');
    $http.post("Modelo/serviciesEcaes/analisisIndividual.php",{'periodoA':$scope.periodoA})
    .success(function(data){
      $scope.dataE=data;
      $scope.configPages();
      usSpinnerService.stop('spinner-1');
    })
}

}]).filter('startFromGrid', function() {
    return function(input, start) {
    if(input!=undefined){
        start =+ start;
        return input.slice(start);
    }
        
    }
});
app.controller('AnalisisEcaesG', ['$scope', 'upload', '$http',function ($scope, upload,$http) 
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
	$scope.mostrarC=function(){
		$http.post("Modelo/serviciesEcaes/analisisGeneral.php",{'periodoA':$scope.periodoA})
		.success(function(data){
              $scope.v1=data[0].v1;
              $scope.v2=data[0].v2;
              $scope.v3=data[0].v3;
              $scope.v4=data[0].v4;
              $scope.v5=data[0].v5;
              $scope.v6=data[0].v6;
              $scope.v7=data[0].v7;
              $scope.v8=data[0].v8;
              $scope.v9=data[0].v9;
             
              $scope.num_str = parseInt($scope.v2, 10);
             

              $scope.num_str2 = parseInt($scope.v3, 10);
           

              $scope.num_str1 = parseInt($scope.v1, 10);
            

              $scope.division=($scope.num_str2/$scope.num_str1).toFixed(2);
             
              $scope.lc=((parseFloat($scope.division)+$scope.num_str)*100);
              
              // RC

               $scope.num_str4 = parseInt($scope.v4, 10);
             

              $scope.num_str5 = parseInt($scope.v5, 10);
           

              $scope.num_str6 = parseInt($scope.v6, 10);
            

              $scope.division2=($scope.num_str6/$scope.num_str4).toFixed(2);

              $scope.rc=((parseFloat($scope.division2)+$scope.num_str5)*100);

            
             // ce

               $scope.num_str7 = parseInt($scope.v7, 10);
             

              $scope.num_str8 = parseInt($scope.v8, 10);
           

              $scope.num_str9 = parseInt($scope.v9, 10);
            

              $scope.division3=($scope.num_str9/$scope.num_str7).toFixed(2);
              $scope.ce=((parseFloat($scope.division3)+$scope.num_str8)*100);


		})

	}

}])

app.controller('eliminacionEcaes', ['$scope', 'upload', '$http',function ($scope, upload,$http) 
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

	$scope.mostrarC=function(){
		 $http.post("Modelo/serviciesEcaes/listarArchivos.php",{'periodoA':$scope.periodoA})
		.success(function(data){
			$scope.data=data;
			 $scope.configPages();
			
		})
	}



	$scope.eliminarArchivo=function(id,nombre,ruta,periodoA){
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
  $http.post("Modelo/serviciesEcaes/eliminarRegistro.php",{'id':id,'nombre':nombre,'ruta':ruta,'periodoA':periodoA})
		.success(function(data){
			
				$scope.mostrarC();


		});
})

   
		
    
	}	

}]).filter('startFromGrid', function() {
    return function(input, start) {
    if(input!=undefined){
        start =+ start;
        return input.slice(start);
    }
        
    }
});


