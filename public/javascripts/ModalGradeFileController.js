(function() {
        var app = angular.module("libz-app");
        var ModalGradeFileController = function($scope, $http, $log, $location, $routeParams) {
    			$log.info('show modal');
				$scope.selectedFile="";

					$('#fileSelectModal').on('hidden.bs.modal', function (e) {
					$log.info("fileSelectModal hidden.bs.modal");
  	            			             
		 				var url = "/grades/" + $scope.selectedFile;
			            $log.info(url);

		         		$location.path(url);
		         		      $scope.$apply();
		         		      
					})

	    	var onError = function(reason) {
	            $log.error(reason);
	            $scope.error = "Failed to save assays";
	            $('#myModal').modal('hide');

	            return false;
	        };
	        var setUpAddForm = function(response){
				var ddlFiles=[];
    			$log.info(response);

					$(response.data).each(function(index,item){
						ddlFiles.push({name:item['name']});
					});
    			$log.info(ddlFiles); 

	            $("#jqxImportlibDd").jqxDropDownList({
	                source: ddlFiles,
	                displayMember: "name",
	                valueMember: "name",
	                selectedIndex: -1,
	                width: '200',
	                height: '25'
	            });
	               $('#jqxImportlibDd').on('select', function(event) {


	              	$scope.assayvalidationerror ="";
	              	if (event.args.item==null) {
	                  	return;
	              	};

	        		var item = event.args.item.originalItem;

	            });

				ddlFiles.push({name:"NEW LIBRARY"});

	            $("#jqxlibDd").jqxDropDownList({
	                source: ddlFiles,
	                displayMember: "name",
	                valueMember: "name",
	                selectedIndex: -1,
	                width: '200',
	                height: '25'
	            });

	            $('#jqxlibDd').on('select', function(event) {


	        		$scope.validationError="";

	              	if (event.args.item==null) {
	                  	return;
	              	};

	        		var item = event.args.item.originalItem;
	        		isNew = item['name'].substring(0, 3).toLowerCase()=="new";
	        		//if (item['name'].) {};
	        		$scope.selectedFile =isNew?"-1":item['name']
		            $log.info($scope.selectedFile);
                    $scope.$digest();
	            });
	        };

	        var onGetFilesComplete = function(response) {

	            $log.info("onGetLibrariesComplete");


	            $scope.files = response.data;
	            // $log.info($scope.libraries);


	            setUpAddForm(response);
	        };

	        $scope.selectFile = function(fileName){
	        			            $log.info("fileName: "+fileName);

	        	if (fileName.length>0) {
		            $log.info(fileName);

					$('#fileSelectModal').modal('hide');
				
				
	        	 }else{
	        	 	$scope.validationError="Please Select A Library";
	        	 };

	        };
	        var url = "/cgi/gradelibraries";

	        $http.get(url).then(onGetFilesComplete, onError);

	    };

    app.controller("ModalGradeFileController", ModalGradeFileController);

})();