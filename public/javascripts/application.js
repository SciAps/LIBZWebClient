(function() {
	 var app = angular.module("libz-app", ["ngRoute"]);

    //app.controller("MainController", ["$scope","$log", MainController]);
    //app.controller("TestsController", ["$scope", "$http","$log", TestsController]);
    //app.controller("SpectrumController", ["$scope", "$http","$log", SpectrumController]);
    //app.controller("SingleTestController", ["$scope", "$http","$log", SingleTestController]);

	 app.config(function($routeProvider){
		$routeProvider
			.when("/home",{
	 				templateUrl:"zhome.hjs",
	 				controller: "HomeController"
	 		})
	 		.when("/assays",{
	 				templateUrl:"zassays.hjs",
	 				controller: "AssaysController"
	 		})
	 		.when("/single/:tid/:ttitle/:tdate",{
	 				templateUrl:"zsingletest.hjs",
	 				controller: "SingleTestController"
	 		}).when("/tests",{
	 				templateUrl:"ztests.hjs",
	 				controller: "TestsController"

	 		}).otherwise({redirectTo:"/home"});

 	 });
})();