(function() {
    var app = angular.module("libz-app");
    var CalibrationsController = function($scope, $http, $log, $location, $routeParams) {


        $scope.postJson = [];
        // $scope.$watch('postJson', function(newVal, oldVal) {
        //     $log.info("watch postJson fired");

        //     if (newVal.length > 0) {
        //         $scope.syncData();
        //     };
        // }, true);
        var bases = new basesBuilder();


        $scope.generaterow = function(name, base) {
            var row = {};
            row["name"] = name;
            row["base"] = base;
            return row;
        }

        $scope.saveNewCalibration = function() {
            $scope.validationerror = "";

            var name = $("#calibrationName").val().trim();
            var item = $("#jqxDd").jqxDropDownList('getSelectedItem');
            $log.info(item);
            $log.info(name);
            if (name.length === 0) {
                $scope.validationerror = "Name is a required field";

            } else if (item.index === 0) {


                $scope.validationerror = "Base must be selected";
            }

            $($scope.calibrations).each(function(index,cal){
                if (cal['name'].trim()=== name&&item.value===cal['base']) {
                     $scope.validationerror = "Calibration with the same name and base already exists!";
                 }
            });


            if ($scope.validationerror.length == 0) {
                var datarow = $scope.generaterow(name, item.value);
                var commit = $("#jqxcalibrationsgrid").jqxGrid('addrow', null, datarow);
                $('#newCalibrationModal').modal('hide');

            } else {
                //TODO:show error
                $log.error($scope.validationerror);

            }
        };

        var onGetCalibrationsComplete = function(response) {

            $log.info("onGetCalibrationsComplete");

            $log.info(response.data);
            $scope.rawAssays = response.data;



            var calibrations = bases.getCalibrations(response.data);
            // var calibrations=bases.addShortNameAndBase(response.data);
            $scope.calibrations = calibrations;



            $scope.showCalibrationsGrid($scope.calibrations);

            setUpCalibrationsToolBar();
        };
        var setUpCalibrationsToolBar = function() {
            $("#addcalibrationsrowbutton").on('click', function() {
                // var datarow = generaterow();
                //  editrow = datarow;

                $('#newCalibrationModal').modal({
                    show: true,
                    backdrop: 'static'
                });



                $log.info("open window");


            });

            $("#deletecalibrationsrowbutton").on('click', function() {
                //TODO: delete all assays with this name
                var selectedrowindex = $("#jqxcalibrationsgrid").jqxGrid('getselectedrowindex');
                var rowscount = $("#jqxcalibrationsgrid").jqxGrid('getdatainformation').rowscount;
                $log.info(selectedrowindex);
                //var deletedItem = $scope.assays[selectedrowindex];

                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {

                    $log.info('delete');
                    var answer = confirm("Are you sure you want to delete this calibrationt?")
                    if (answer) {
                        var id = $("#jqxcalibrationsgrid").jqxGrid('getrowid', selectedrowindex);
                        $scope.postJson.length = 0;
                        var datarow = $("#jqxcalibrationsgrid").jqxGrid('getrowdata', selectedrowindex);
                        $($scope.rawAssays).each(function(index, item) {
                            $log.info(item);
                            $log.info(datarow);

                            if (item["name"].substring(0, (datarow["name"] + "-" + datarow["base"]).length) != datarow["name"] + "-" + datarow["base"]) {
                                $scope.postJson.push(item);

                            };
                        });
                        var commit = $("#jqxcalibrationsgrid").jqxGrid('deleterow', id);
 
                        $scope.syncData($scope.postJson);


                    };
                }

            });
        };
        var onError = function(reason) {
            $log.error("error");
            $scope.error = "Unable to fetch calibrations";
        };
        $scope.syncData = function(data) {


            var onSaveCalibrationsComplete = function(response) {

                $log.info("onSaveCalibrationsComplete");

                $log.info(response.data);
                $('#myModal').modal('hide');
                //$("#jqxcalibrationsgrid").jqxGrid('updatebounddata', 'cells');

                return true;

            };
            var onError = function(reason) {
                $log.error("error");
                $scope.error = "Failed to save calibrations";
                $('#myModal').modal('hide');

                return false;
            };

            $log.info("syncData");
            $log.info($scope.postJson);


            if ($scope.postJson.length == 0 && $scope.calibrations.length > 0) {
                return;
            } else {
                $('#myModal').modal({
                    show: true,
                    backdrop: 'static'
                });
                var url = "/cgi/saveassays/json";
                $http.post(url, data).then(onSaveCalibrationsComplete, onError);

            }
        };

        $scope.showCalibrationsGrid = function(calibrations) {
            var source = {
                localdata: calibrations,
                datatype: "json",


                datafields: [{
                        name: 'name'
                    }, {
                        name: 'base'
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

            $("#jqxcalibrationsgrid").jqxGrid({
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
                    var addButton = '<button id="addcalibrationsrowbutton" class="btn btn-primary btn-sm"><span>Add New Calibration</span>  </button>';
                    var deleteButton = '<button id="deletecalibrationsrowbutton" class="btn btn-danger btn-sm" style="margin-left: 10px;"><span>Delete Selected Calibration</span>  </button>';
                    container.append(addButton);
                    // container.append('<div width="10px"></div>');
                    container.append(deleteButton);
                    $("#addcalibrationsrowbutton").jqxButton();
                    $("#deletecalibrationsrowbutton").jqxButton();
                    // create new row.


                },
                columns: [{
                    text: 'Name',
                    datafield: 'name',
                }, {
                    text: 'Base',
                    datafield: 'base',

                }, {
                    text: 'Add assays',
                    columntype: 'button',
                    width: 120,
                    cellsrenderer: function() {
                        return "Add Assays";
                    },
                    buttonclick: function(row) {
                        $log.info("go to assays");


                        var name = $("#jqxcalibrationsgrid").jqxGrid('getrowdata', row).name;
                        var base = $("#jqxcalibrationsgrid").jqxGrid('getrowdata', row).base;

                        $log.info(name);

                        $location.path("/assays/" + name + "/" + base);

                        $scope.showSpinner();
                        $scope.$apply();


                    }
                }]
            });
            $("#jqxcalibrationsgrid").on('rowselect', function(event) {
                $log.info("Row " + event.args.rowindex + " Selected");

            });
            var source = [
                "Aluminium",
                "Carbon",
                "Zinc",
                "Copper"
            ];
            $("#jqxDd").jqxDropDownList({
                source: bases.bases,
                selectedIndex: 0,
                width: '200',
                height: '25'
            });

        };


        var url = "/cgi/assays";

        $http.get(url).then(onGetCalibrationsComplete, onError);
    };

    app.controller("CalibrationsController", CalibrationsController);
})();