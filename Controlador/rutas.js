var app = angular.module("Siad", ['ngRoute', 'Siad.controllerIndex','Siad.controllerArchivos','Siad.controllerSubirArchivo','Siad.controllerEmpleados','Siad.controllerAsignacion','Siad.controllerVicerrectoria','Siad.controllerEcaes','Siad.controllerPeriodoA','Siad.controllerCambioC']);





app.config(["$routeProvider", function($routeProvider)
{
	$routeProvider
	// ENRUTAMIENTO VENTANA DE INICIO
	.when('/', {
            templateUrl : 'inicio.html',
            controller  : 'cntrlIndex'
        })
	// ENRUTAMIENTO DEL ADMINISTRADOR
	 .when('/administrador', {
            templateUrl : 'Vista/admin/index.html',
            controller  : 'cntrl',
             
        })
	  .when('/administrador_subirDocumento', {
            templateUrl : 'Vista/admin/subirArchivo.html',
            controller  : 'HomeCtrl',
           
        })
	 .when('/administrador_asignarArchivos', {
            templateUrl : 'Vista/admin/asignarArchivos.html',
            controller  : 'cntrlAsig',
           
        })
	 .when('/administrador_listarPersonal', {
            templateUrl : 'Vista/admin/listarEmpleados.html',
            controller  : 'cntrlEmpleD',
           
        })
	 .when('/administrador_registrarPersonal', {
            templateUrl : 'Vista/admin/registrarEmpleado.html',
            controller  : 'cntrlEmple',
           
        })
      .when('/administrador_SubirSaberPro', {
            templateUrl : 'Vista/admin/subirEcaes.html',
            controller  : 'Ecaes',
           
        })
      .when('/administrador_AnalisisSaberPro', {
            templateUrl : 'Vista/admin/analisisEcaes.html',
            controller  : 'AnalisisEcaes',
           
        })
       .when('/administrador_AnalisisSaberProGeneral', {
            templateUrl : 'Vista/admin/analisisEcaesGeneral.html',
            controller  : 'AnalisisEcaesG',
           
        })
       .when('/administrador_EliminacionSaberPro', {
            templateUrl : 'Vista/admin/eliminacionEcaes.html',
            controller  : 'eliminacionEcaes',
           
        })
       .when('/administrador_RegistroPeriodoAcademico', {
            templateUrl : 'Vista/admin/registroPeriodoAcademico.html',
            controller  : 'registroPeriodo',
           
        })
       .when('/administrador_ListadoPeriodosAcademicos', {
            templateUrl : 'Vista/admin/listarPeriodosAcademicos.html',
            controller  : 'listarPeriodos',
           
        })
       .when('/administrador_CambioContrasena', {
            templateUrl : 'Vista/admin/cambiarContrasena.html',
            controller  : 'cambioContrasena',
           
        })
    
	
	// ENRUTAMIENTO DE VICERECTORIA
	  .when('/vicerrectoria', {
            templateUrl : 'Vista/personalVicerrectoria/index.html',
            controller  : 'listarAr',
        })
      .when('/vicerrectoria_Personal', {
            templateUrl : 'Vista/personalVicerrectoria/archivosPersona.html',
            controller  : 'listarArPer',
        })
      .otherwise({
            redirectTo: '/'
        })
    

}]);