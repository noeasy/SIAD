var app=angular.module("Siad.controllerEmpleados",[]);

app.controller('cntrlEmple', function($scope,$http){
		
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

   $scope.registrar=function(){

		$http.post("Modelo/servicies/registrarEmpleado.php",{'nombres':$scope.nombres, 'apellidos':$scope.apellidos, 'usuario':$scope.usua,'contraseña':$scope.contra})
		.success(function(data){
			
			if(data=="existe ambos")
			{
               swal(
					  '',
					  'PERSONAL Y USUARIO YA SE ENCUENTRAN REGISTRADOS',
					  'error'
					)
			}else if(data=="existe usuario")
			{
				swal(
					  '',
					  'USUARIO YA SE ENCUENTRAN REGISTRADO',
					  'error'
					)

			}else if(data=="existe empleado")
			{
				swal(
					  '',
					  'PERSONAL YA SE ENCUENTRA REGISTRADO',
					  'error'
					)


			}else if(data=="inserto")
			{
				swal(
					  '',
					  'REGISTRADO EXITOSAMENTE!',
					  'success'
					)
				$scope.nombres="";
				$scope.apellidos="";
				$scope.usua="";
				$scope.contra="";

			}else{
               swal(
					  '',
					  'HA OCURRIDO UN ERROR AL REGISTRAR',
					  'error'
					)

			}
			
			
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


	$scope.mostrarEmple=function(){
		$http.get("Modelo/servicies/listarEmple.php")
		.success(function(data){
			$scope.data=data
		})
	}
	
	
	
});


app.controller('cntrlEmpleD', function($scope,$http){
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
			$scope.dataE=data
		})
	}
	$scope.mostrarDatosModal=function(id){
		var length = $scope.dataE.length;
		var i=0;
				for (i = 0; i < length; i++) 
				{
					
                      if($scope.dataE[i].id==id){
                         break;
                         
                      }
				}

         $scope.nombres=$scope.dataE[i].nombres;
         $scope.usuario=$scope.dataE[i].usuario;
         $scope.contrasena=$scope.dataE[i].contrasena;
       
	}
	

	$scope.modificarDatos=function(){
			$http.post("Modelo/servicies/actualizarEmpleado.php",{'nombres':$scope.nombres, 'apellidos':$scope.apellidos, 'usuario':$scope.usuario,'contrasena':$scope.contrasena})
		.success(function(data){
			if(data==1){
              swal(
					  '',
					  'ACTUALIZADO EXITOSAMENTE!',
					  'success'
			 )
              $('#myModal').modal('toggle');
              $scope.mostrarEmple();
			}else{
				 swal(
					  '',
					  'No SE HA PODIDO ACTUALIZAR!',
					  'danger'
			 )
			}
			
		})

	}

	$scope.eliminarEmpleado=function(id)
	{
		var tabla="empleado";
       swal({
  title: 'Esta seguro?',
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Borrarlo!',
  cancelButtonText:'Cancelar'
}).then(function() {
  swal(
    'ELIMINADO!',
    'EL PERSONA HA SIDO ELIMINADO EXTIOSAMENTE',
    'success'
  );
  $http.post("Modelo/servicies/eliminarRegistro.php",{'id':id,'tabla':tabla})
			.success(function(){
					$scope.msg="Data Deletion successfull";
					$scope.mostrarEmple();
});
})


	}
	
	$scope.mostrarEmple();
	
});

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
	$scope.mostrarAsignacion=function(){
		$http.get("Modelo/servicies/asignacionAr.php")
		.success(function(data){
			$scope.data=data
		})
	}
   
	
	$scope.mostrarAsignacion();
});


