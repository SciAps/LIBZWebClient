(function() {
        var app = angular.module("libz-app");
        var ModalGradeFileController = function($scope,fileDialog, $http, $log, $location, $routeParams) {
    			$log.info('show modal');
				$scope.selectedFile="";
				$scope.newLibraryName="";

					$('#fileSelectModal').on('hidden.bs.modal', function (e) {
					$log.info("fileSelectModal hidden.bs.modal");
  	            		if ($scope.selectedFile!=-1) {

			 				var url = "/grades/" + $scope.selectedFile;
				            $log.info(url);

			         		$location.path(url);
			         		      $scope.$apply();
  	            		}        
		         		      
					});

	    	var onError = function(reason) {
	            $log.error(reason);
	            $scope.error = "Failed to save assays";
	            $('#myModal').modal('hide');

	            return false;
	        };
	        var setUpAddForm = function(response){
				var ddlFiles=[];
				ddlFiles.push("\&nbsp;\&nbsp;\&nbsp;---");

    			$log.info(response);

					$(response.data).each(function(index,item){
						ddlFiles.push(item);
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


	              	$scope.validationError ="";
	              	if (event.args.item==null) {
	                  	return;
	              	};

	        		var item = event.args.item.originalItem;
	        		$log.info(event.args.item);

	        		if(event.args.item['index']!=0){
	        			importFromLib(item);
	        		}
	            });
				ddlFiles.splice(0, 1);

				ddlFiles.unshift("NEW LIBRARY");

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

	        		var item = event.args.item.label;
	        		$log.info(event.args);

	        		var isNew = item.substring(0, 3).toLowerCase()=="new";
	        		$log.info(isNew);
 	        		$scope.selectedFile =isNew?"-1":item
		            $log.info($scope.selectedFile);
                    $scope.$digest();
	            });
	        };

	        var onGetFilesComplete = function(response) {

	            $log.info("onGetLibrariesComplete");


	            $scope.files = response.data;
 

	            setUpAddForm(response);
	        };

	        $scope.selectFile = function(fileName){
	            $log.info("fileName: "+fileName);

	        	if (fileName.length>0) {
		            $log.info(fileName);

					$('#fileSelectModal').modal('hide');
				
				
	        	 }else{
	        	 	$scope.validationError="Please Select A Library!";
	        	 };

	        };

	        var importFromLib = function(item){
	        	$log.info(item);


	        }
	        $scope.openFromFile = function(){
	        	$log.info("openFromFile");
	        }
	        $scope.addLibrary = function(fileName){
	        	$log.info("fileName: "+fileName);
	        	var exists = false;
	        	$($scope.files).each(function(i,item){
	        		$log.info("item: "+item.trim().toLowerCase());
	        		$log.info("fileName: "+fileName.trim().toLowerCase());

	        		if (item.trim().toLowerCase()===fileName.trim().toLowerCase() ){
						exists=true;
	        		};
	        	});


	        	if (fileName.length<=0) {
	        		$scope.validationError="Please Enter A Name For Your Library!";
	        	 	return;
	        	 }else if(exists){
	        	 	$scope.validationError="A Library By That Name Already Exists!";
	        	 	return;
	        	 }else{
	        	 	$log.info(fileName);
	        	 	
  	            			//TODO:Save New File
  	            			//set: $scope.selectedFile=fileName.trim();
  	            			//TODO:Close Modal
  	            			//$('#fileSelectModal').modal('hide');

	        	 };



	        };
	        var url = "/cgi/gradelibraries";

	        $http.get(url).then(onGetFilesComplete, onError);

	    };

    app.controller("ModalGradeFileController",ModalGradeFileController);

})();