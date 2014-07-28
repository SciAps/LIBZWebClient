(function(){
	var app = angular.module("libz-app");
	var MainController = function($scope,$log){
		$log.info("MainController");
		$scope.checkedTests =[];
		$scope.specCount =0;
		$scope.singleTest;
		$scope.testId = 0;
		$scope.showSpinner=false;
	 
		$scope.broadcastSpecChange= function(){
			$log.info("broadcastSpecChange");
			$scope.$broadcast("spectrumIdsChanged");
		};

	    $scope.downloadCSV = function () {
	            $log.info("downloadCSV");

	      var querystring = buildQueryString( criteria )
	      window.location = '/sampledata/Alloy.csv' + querystring;
	    };

	};
	app.controller("MainController",MainController);
})();