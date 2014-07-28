(function() {
	 var app = angular.module("libz-app", ["ngRoute"]);

    //app.controller("MainController", ["$scope","$log", MainController]);
    //app.controller("TestsController", ["$scope", "$http","$log", TestsController]);
    //app.controller("SpectrumController", ["$scope", "$http","$log", SpectrumController]);
    //app.controller("SingleTestController", ["$scope", "$http","$log", SingleTestController]);

	 app.config(function($routeProvider){
		$routeProvider
	 		.when("/single/:tid",{
	 				templateUrl:"zsingletest.hjs",
	 				controller: "SingleTestController"
	 		}).when("/tests",{
	 				templateUrl:"ztests.hjs",
	 				controller: "TestsController"

	 		}).otherwise({redirectTo:"/tests"});

 	 });
})();