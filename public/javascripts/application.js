(function() {
	 var app = angular.module("libz-app", ["ngRoute"]);


	 app.config(function($routeProvider){
		$routeProvider
			.when("/home",{
	 				templateUrl:"zhome.hjs",
	 				controller: "HomeController"
	 		})
	 		.when("/assays/:name/:base",{
	 				templateUrl:"zassays.hjs",
	 				controller: "AssaysController"
	 		})
	 		.when("/single/:tid/:ttitle/:tdate",{
	 				templateUrl:"zsingletest.hjs",
	 				controller: "SingleTestController"
	 		}).when("/tests",{
	 				templateUrl:"ztests.hjs",
	 				controller: "TestsController"

	 		}).when("/calibrations",{
	 				templateUrl:"zCalibrations.hjs",
	 				controller: "CalibrationsController"

	 		}).when("/grades",{
	 				templateUrl:"zGrades.hjs",
	 				controller: "GradesController"

	 		}).otherwise({redirectTo:"/home"});

 	 });
})();