(function(){
	var app = angular.module("libz-app");
	var MainController = function($scope,$http,$log){



		$log.info("MainController");
		$scope.checkedTests =[];
		$scope.specCount =0;
		$scope.singleTest;
		$scope.testId = 0; 

		var onPostDownloadCSV = function(response) {
                    $('#myModal').modal('hide');

			$log.info("onPostDownloadCSV");
			$log.info(response);
			 

			var csvContent = "data:text/csv;charset=utf-8,";
			    csvContent += response.data;
			$log.info(csvContent);

			var encodedUri = encodeURI(csvContent);
			window.open(encodedUri,'_self');
 		 	window.location = encodedUri;
 		
		}; 

		var onError = function(reason) {
			$log.error("error");
			$log.error(reason);
			$scope.error = "Unable to fetch csv";
                    $('#myModal').modal('hide');

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
	            $('#myModal').modal({
				  show: true,
				  backdrop:'static'
				});
 		var url ="/cgi/export/csv";
		// var testUrl = "http://localhost:9000/getCsvForTests/"
		 $http.post(url,$scope.checkedTests).then(onPostDownloadCSV, onError);


	      // var querystring = buildQueryString( criteria )
	      // window.location = '/sampledata/Alloy.csv' + querystring;
	    };

	    $scope.downloadCSVAll = function () {
	            $log.info("downloadCSVAll");
 	            $('#myModal').modal({
				  show: true,
				  backdrop:'static'
				});
 				var url ="/cgi/export/csv";
		// var testUrl = "http://localhost:9000/getCsvForTests/"
		 		$http.post(url,[]).then(onPostDownloadCSV, onError);


	      // var querystring = buildQueryString( criteria )
	      // window.location = '/sampledata/Alloy.csv' + querystring;
	    };

	    
    		$scope.showModal = function(){
    			$log.info('show modal');
    			$log.info($('#fileSelectModal'));
		        $('#fileSelectModal').modal({
		            show: true,
		            backdrop: 'static'
		        });
    		};

  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: 'server/upload/url', //upload.php script, node.js route, or servlet url
        //method: 'POST' or 'PUT',
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        data: {myObj: $scope.myModelObj},
        file: file, // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name. 
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      });
      //.error(...)
      //.then(success, error, progress); 
      // access or attach event listeners to the underlying XMLHttpRequest.
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };
	};
	app.controller("MainController",MainController);
})();