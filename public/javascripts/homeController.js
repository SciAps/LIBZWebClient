(function() {
    var app = angular.module("libz-app");
    var HomeController = function($scope, $http, $log,  $location, $routeParams) {
        $scope.goTo= function(path){
        	if (path =="manual") {
				window.open('z_manual.pdf', '_blank', 'fullscreen=yes');
        	}else{
				$location.path("/" + path);
        	};
        }

                
    };
    app.controller("HomeController", HomeController);
})();