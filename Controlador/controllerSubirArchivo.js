
var app=angular.module("Siad.controllerSubirArchivo",[]);

app.controller('HomeCtrl', ['$scope', 'upload2', '$http',function ($scope, upload2,$http) 
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

	$scope.uploadFile2 = function()
	{
	
		var name = $scope.name;
		var file = $scope.file;
		var nombre = $scope.nombre;
		var descripcion = $scope.descripcion;
		var clasificacion = $scope.clasificacion;
		if(descripcion==undefined){
           descripcion=" ";
		}
		
		upload2.uploadFile2(file, name,nombre,descripcion,clasificacion).then(function(res)
		{
			console.log(res);
			$scope.limpiarCampos();
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

app.service('upload2', ["$http", "$q", function ($http, $q,$scope) 
{
	this.uploadFile2 = function(file, name,nombre,descripcion,clasificacion)
	{
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("name", name);
		formData.append("nombre", nombre);
		formData.append("descripcion", descripcion);
		formData.append("clasificacion", clasificacion);
		formData.append("file", file);
		return $http.post("Modelo/servicies/insertarArchivo.php", formData,{
			headers: {
				"Content-type": undefined
			},
			transformRequest: angular.identity

		})
		.success(function(res)
		{	

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