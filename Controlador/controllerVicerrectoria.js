var app=angular.module("Siad.controllerVicerrectoria",[]);


app.controller('listarAr', function($scope,$http){


$scope.currentPage = 0;
    $scope.pageSize = 7;
    $scope.pages = [];

  $scope.configPages = function() {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.dataP.length / $scope.pageSize) > 10)
                fin = 10;
            else
                fin = Math.ceil($scope.dataP.length / $scope.pageSize);
        }
        else {
            if (ini >= Math.ceil($scope.dataP.length / $scope.pageSize) - 10) {
                ini = Math.ceil($scope.dataP.length / $scope.pageSize) - 10;
                fin = Math.ceil($scope.dataP.length / $scope.pageSize);
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
                   
                    if(data=="admin "){
                      
                       window.location="#/administrador";
                       
                        }
                    else if(data=='vice '){
                      
                       window.location="#/vicerrectoria";
                    }else{
                       window.location="#/";
                    }
                                   
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });



}

  verificar();
  

	$scope.mostrarArchivos=function(){
		var clasifi="";
		$http.post("Modelo/servicies/listarArchivos.php",{'clasificacion':clasifi,'sesion':"si"})
		.success(function(data){
		 if(data==""){
              alert("No existen archivos para "+" "+clasifi);
		 }		
          $scope.dataP=data
           $scope.configPages();

		})
	}
  $scope.mostrarNombreEm=function(){

    $http.get("Modelo/servicies/consultaSesion.php")
    .success(function(data){
    
      document.getElementById('labelEm').innerHTML = data;
    })
  }
	
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
 $scope.mostrarNombreEm();
  $scope.mostrarArchivos();
})
.filter('startFromGrid', function() {
    return function(input, start) {
    if(input!=undefined){
        start =+ start;
        return input.slice(start);
    }
        
    }
});


app.controller('listarArPer', function($scope,$http){


$scope.currentPage = 0;
    $scope.pageSize = 7;
    $scope.pages = [];

  $scope.configPages = function() {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.dataP.length / $scope.pageSize) > 10)
                fin = 10;
            else
                fin = Math.ceil($scope.dataP.length / $scope.pageSize);
        }
        else {
            if (ini >= Math.ceil($scope.dataP.length / $scope.pageSize) - 10) {
                ini = Math.ceil($scope.dataP.length / $scope.pageSize) - 10;
                fin = Math.ceil($scope.dataP.length / $scope.pageSize);
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
                   
                    if(data=="admin "){
                      
                       window.location="#/administrador";
                       
                        }
                    else if(data=='vice '){
                      
                       window.location="#/vicerrectoria_Personal";
                    }else{
                       window.location="#/";
                    }
                                   
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });



}

  verificar();
  

  $scope.mostrarArchivos=function(){
    var clasifi="";
    $http.post("Modelo/servicies/listarArchivos.php",{'clasificacion':clasifi,'sesion':"sip"})
    .success(function(data){
     if(data==""){
              alert("No existen archivos para "+" "+clasifi);
     }    
          $scope.dataP=data
           $scope.configPages();

    })
  }
  $scope.mostrarNombreEm=function(){

    $http.get("Modelo/servicies/consultaSesion.php")
    .success(function(data){
    
      document.getElementById('labelEm').innerHTML = data;
    })
  }
  
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
 $scope.mostrarNombreEm();
  $scope.mostrarArchivos();
})
.filter('startFromGrid', function() {
    return function(input, start) {
    if(input!=undefined){
        start =+ start;
        return input.slice(start);
    }
        
    }
});

