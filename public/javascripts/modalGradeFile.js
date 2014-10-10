(function() {
        var app = angular.module("libz-app");
        var ModalGradeFileController = function($scope,$http, $log, $location, $routeParams, $upload) {
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

				$log.info(fileDialog);
			 
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

	        var url = "/cgi/gradelibraries";

	        $http.get(url).then(onGetFilesComplete, onError);

	    };

	app.controller('ModalGradeFileController',ModalGradeFileController);// ['$scope','$http', '$log', '$location', '$routeParams', '$upload', ModalGradeFileController]);

    //app.controller("ModalGradeFileController",ModalGradeFileController 
    	//,  function($scope, $upload) {
//   $scope.onFileSelect = function($files) {
//     //$files: an array of files selected, each file has name, size, and type.
//     for (var i = 0; i < $files.length; i++) {
//       var file = $files[i];
//       $scope.upload = $upload.upload({
//         url: 'server/upload/url', //upload.php script, node.js route, or servlet url
//         //method: 'POST' or 'PUT',
//         //headers: {'header-key': 'header-value'},
//         //withCredentials: true,
//         data: {myObj: $scope.myModelObj},
//         file: file, // or list of files ($files) for html5 only
//         //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
//         // customize file formData name ('Content-Disposition'), server side file variable name. 
//         //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
//         // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
//         //formDataAppender: function(formData, key, val){}
//       }).progress(function(evt) {
//         console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
//       }).success(function(data, status, headers, config) {
//         // file is uploaded successfully
//         console.log(data);
//       });
//       //.error(...)
//       //.then(success, error, progress); 
//       // access or attach event listeners to the underlying XMLHttpRequest.
//       //.xhr(function(xhr){xhr.upload.addEventListener(...)})
//     }
//     /* alternative way of uploading, send the file binary with the file's content-type.
//        Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
//        It could also be used to monitor the progress of a normal http post/put request with large data*/
//     // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
//   };
// }
//);

})();