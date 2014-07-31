(function(){
	var app = angular.module("libz-app");
	var MainController = function($scope,$http,$log){



		$log.info("MainController");
		$scope.checkedTests =[];
		$scope.specCount =0;
		$scope.singleTest;
		$scope.testId = 0; 
		$scope.spinner = true;
       	$log.info("show spinner: "+ $scope.spinner);


		var onPostDownloadCSV = function(response) {

			$log.info("onPostDownloadCSV");
			$log.info(response);
			 

			var csvContent = "data:text/csv;charset=utf-8,";
			    csvContent += response.data;
			$log.info(csvContent);

			var encodedUri = encodeURI(csvContent);
			//window.open(encodedUri);

 		 	window.location = encodedUri;
		}; 

		var onError = function(reason) {
			$log.error("error");
			$log.error(reason);
			$scope.error = "Unable to fetch csv";
		};

		$scope.showSpinner= function(){
					$scope.$parent.spinner = true;
					$log.info("show spinner: "+ $scope.$parent.spinner);
            		//$scope.$apply();


				};
		$scope.hideSpinner= function(){
					$scope.$parent.spinner = false;
			    	$log.info("show spinner: "+ $scope.$parent.spinner);
            		//$scope.$apply();
				};
				
		$scope.broadcastSpecChange= function(){
			$log.info("broadcastSpecChange");
			$scope.$broadcast("spectrumIdsChanged");
		};

	    $scope.downloadCSV = function () {
	            $log.info("downloadCSV");
	            $log.info($scope.checkedTests);
 		var url ="/cgi/export/csv";
		// var testUrl = "http://localhost:9000/getCsvForTests/"
		 $http.post(url,$scope.checkedTests).then(onPostDownloadCSV, onError);


	      // var querystring = buildQueryString( criteria )
	      // window.location = '/sampledata/Alloy.csv' + querystring;
	    };

	};
	app.controller("MainController",MainController);
})();