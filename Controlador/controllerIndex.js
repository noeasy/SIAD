var app=angular.module("Siad.controllerIndex",[]);

app.controller('cntrlIndex', function($scope,$http){

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
		var clasifi="Estudiantes";
		$http.post("Modelo/servicies/listarArchivos.php",{'clasificacion':clasifi,'sesion':"no"})
		.success(function(data){
		 if(data==""){
              alert("No existen archivos para "+" "+clasifi);
		 }		
          $scope.data=data;
           $scope.configPages();

		})
	}
  $scope.mostrarArchivos();

  $scope.iniciarS=function(){

function tiene_letras(texto){
 var regex=/^[0-9A-Za-z]+$/;
  if(regex.test(texto)){
    return true;
  } 
  else {
    return false;
  }
}
 if(tiene_letras($scope.contrasena) && tiene_letras($scope.usuario)){
  
 
    $http.post("Modelo/servicies/iniciarSesion.php",{'usuario':$scope.usuario,'contrasena':$scope.contrasena})
    .success(function(data){
     if(data=="si"){
              if($scope.usuario=="administrador"){
                  $('body').removeClass('modal-open');
$('.modal-backdrop').remove();
                  window.location="#/administrador";
              }else{
                $('body').removeClass('modal-open');
$('.modal-backdrop').remove();
                window.location="#/vicerrectoria";
              }
     }else{
      $('#myModal').modal('toggle');
      swal(
          '',
          'DATOS INCORRECTOS',
          'error'
        )
     }    
         

    })
  
 }else{
  $('#myModal').modal('toggle');
      swal(
          '',
          'SOLO CARACTERES ALFANUMERICOS',
          'error'
        )
     }    

	}
  
})
.filter('startFromGrid', function() {
    return function(input, start) {
    if(input!=undefined){
        start =+ start;
        return input.slice(start);
    }
        
    }
});








  
