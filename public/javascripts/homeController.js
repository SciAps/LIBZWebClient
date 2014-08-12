(function() {
    var app = angular.module("libz-app");
    var HomeController = function($scope, $http, $log,  $location, $routeParams) {
        $scope.goTo= function(path){
			$location.path("/" + path);
        }

                
    };
    app.controller("HomeController", HomeController);
})();