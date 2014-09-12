(function() {
        var app = angular.module("libz-app");
        var GradesController = function($scope, $http, $log, $location, $routeParams) {





          $('#selectAssayModal').modal({
                          show: true,
                          backdrop:'static'
                        });

		$scope.showLibrariesGrid =function(libraries) {
 			var source = {
                localdata: libraries,
                datatype: "array",


                datafields: [{
                        name: 'name'
                    }

                ],
                pagesize: 20,
                addrow: function(rowid, rowdata, position, commit) {
                    // synchronize with the server - send insert command
                    // call commit with parameter true if the synchronization with the server is successful 
                    //and with parameter false if the synchronization failed.
                    // you can pass additional argument to the commit callback which represents the new ID if it is generated from a DB.
                    commit(true);

                }

            };
            var editrow = -1;
            var dataAdapter = new $.jqx.dataAdapter(source, {
                async: false,
                loadError: function(xhr, status, error) {
                    alert('Error loading "' + source.url + '" : ' + error);
                }
            });

            $("#jqxgradelibsgrid").jqxGrid({
                width: '100%',
                autorowheight: true,
                autoheight: true,
                editable: false,
                pageable: true,
                showtoolbar: true,
                theme: 'Arctic',
                selectionmode: 'singlerow',
                source: dataAdapter,
                rendertoolbar: function(toolbar) {
                    var me = this;
                    var container = $("<div style='margin: 5px;'></div>");
                    toolbar.append(container);
                    var addButton = '<button id="addlibrary" class="btn btn-primary btn-sm"><span>New Library</span></button>';
                    var deleteButton = '<button id="deletelibrary" class="btn btn-danger btn-sm" style="margin-left: 10px;"><span>Delete</span>  </button>';
                    container.append(addButton);
                    // container.append('<div width="10px"></div>');
                    container.append(deleteButton);
                    $("#addlibrary").jqxButton();
                    $("#deletelibrary").jqxButton();
                    // create new row.


                },
                columns: [{
                    text: 'Name',
                    datafield: 'name',
                }]
            });
            $("#jqxgradelibsgrid").on('rowselect', function(event) {
                $log.info("Row " + event.args.rowindex + " Selected");
            });
       
		};

        $scope.addLibrary= function(name){
        	     name = name.trim();
                $log.info("saving new library "+name);

                $scope.libraryvalidationerror ="";

		};
        var setUpLibraryToolBar = function(){
            $("#addlibrary").on('click', function() {
                // if ($scope.ddVals.length==0) {
                //     //$scope.assayvalidationerror= "No Standards found for "+$routeParams.base+ ". Create a new Standard to add to this calibration";
                //     $scope.libraryvalidationwarning= "No Standards found for "+$routeParams.base+ ".\n   Create a new Standard to add to this calibration";
                //     $log.error($scope.error);
                //     $scope.$digest();


                // }else{
                //     $scope.libraryvalidationwarning= "";

                //     $scope.libraryvalidationerror ="";

                // }

                $('#newLibraryModal').modal({
                  show: true,
                  backdrop:'static'
                });
            });

   

            $("#deletelibrary").on('click', function() {
                // var selectedrowindex = $("#jqxassaysgrid").jqxGrid('getselectedrowindex');
                // var rowscount = $("#jqxassaysgrid").jqxGrid('getdatainformation').rowscount;
                // $log.info(selectedrowindex);
                // //var deletedItem = $scope.assays[selectedrowindex];

                // if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                //     var id = $("#jqxassaysgrid").jqxGrid('getrowid', selectedrowindex);
                //     var commit = $("#jqxassaysgrid").jqxGrid('deleterow', id);


                //     $($scope.rawAssays).each(function(index, item) {
                //         if ($scope.assays[selectedrowindex]['name'] == item['name']) {
                //             $scope.rawAssays.splice(index, 1);

                //         };
                //     });

                //     $scope.assays.splice(selectedrowindex, 1);
                //     $log.info("$scope.assays");
                //     $log.info($scope.assays);
                //     $log.info("$scope.rawAssays");
                //     $log.info($scope.rawAssays);
                //     $scope.$digest();
                //     $scope.unsavedChanges = true;

                //     $scope.showElementsGrid(-1); 

                // }

            });
            var generaterow = function(i) {
                var row = {};
                row["name"] = "new";
                row["base"] = "NONE";
                row["shortName"] = "new";
                row["spec"] = [];
                return row;
            }
        };
        var setUpAddForm =function(){
        	  $("#jqxlibDd").jqxDropDownList({ source: $scope.libraries, displayMember: "name", valueMember: "name",selectedIndex: -1, width: '200', height: '25'});

              $('#jqxlibDd').on('select', function (event) {
              });
	              // $log.info("adding assay ");

	              //   $scope.assayvalidationerror ="";
	              //   if (event.args.item==null) {
	              //       return;
	              //   };
               //     var item = event.args.item.originalItem;
 
               //      if (item != null) {

               //      $log.info(event.args);



               //          $($scope.assays).each(function(index, assay) {
               //              if (assay['name']==item["name"]) {
               //                  $scope.assayvalidationerror ="Calibration Standard already exists!";
               //                  //$scope.$digest();
               //               };
               //          });


               //          if ($scope.assayvalidationerror.length==0) {
               //          $scope.unsavedChanges = true;

               //          var newItem = { "name":$routeParams.name+"-"+item["name"] , "calibrationName": $routeParams.name , "shortName": item["shortName"] ,"base": item["base"], "spec": item["spec"]};


               //          // item["calibrationName"] = $routeParams.name;
               //          // item["name"] = $routeParams.name+"-"+item["name"];



               //            var commit = $("#jqxassaysgrid").jqxGrid('addrow', null, item);

               //              $scope.assays.unshift(newItem);
               //              //$log.info($scope.assays);
               //              $("#jqxassaysgrid").jqxGrid('updatebounddata', 'cells');
               //              $("#jqxassaysgrid").jqxGrid('gotopage', 0);
               //              $("#jqxassaysgrid").jqxGrid('selectrow', 0);
               //              $('#selectAssayModal').modal('hide');
               //              }; 
               //              $("#jqxAssayDd").jqxDropDownList('selectIndex', -1); 

               //           };
               //        //  $scope.ddVals = bases.getAssaysByBaseForDropDown($scope.rawAssays,$scope.assays,$routeParams.base);
               //        //  $("#jqxAssayDd").jqxDropDownList('removeItem', event.args.item); 
                    
               //  });
        };
        var onError = function(reason) {
            $log.error("error");
            $scope.error = "Failed to save assays";
            $('#myModal').modal('hide');

            return false;
        };
  		var onGetLibrariesComplete = function(response) {

                $log.info("onGetLibrariesComplete");


                $scope.libraries = response.data;

                            $log.info($scope.libraries);


           

                $scope.showLibrariesGrid($scope.libraries);


          setUpLibraryToolBar();
     

     		setUpAddForm();
            };





        var url = "/cgi/gradelibraries";

        $http.get(url).then(onGetLibrariesComplete, onError);

    };

    app.controller("GradesController", GradesController);
})();