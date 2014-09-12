(function() {
        var app = angular.module("libz-app");
        var GradesController = function($scope, $http, $log, $location, $routeParams) {

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


          
     
            };





        var url = "/cgi/gradelibraries";

        $http.get(url).then(onGetLibrariesComplete, onError);

    };

    app.controller("GradesController", GradesController);
})();