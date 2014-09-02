(function() {
        var app = angular.module("libz-app");
        var AssaysController = function($scope, $http, $log, $location, $routeParams) {


            $scope.postJson = [];
            $scope.$watch('postJson', function(newVal, oldVal) {
                $log.info("watch postJson fired");

                if (newVal.length > 0) {
                    $scope.syncData();
                };
            }, true);
                       var bases = new basesBuilder();


            var onGetAssaysComplete = function(response) {

                $log.info("onGetAssaysComplete");

                $log.info(response.data);


                //var assays=bases.addShortNameAndBase(response.data);
                $scope.assays = bases.addShortNameAndBase(response.data)



                $scope.showAssaysGrid($scope.assays);

                setUpAssayToolBar();
            };
            var setUpAssayToolBar = function(){
                $("#addassayrowbutton").on('click', function() {
                    var datarow = generaterow();
                    var commit = $("#jqxassaysgrid").jqxGrid('addrow', null, datarow);
                    $scope.assays.unshift(datarow);
                    $log.info($scope.assays);
                    $("#jqxassaysgrid").jqxGrid('updatebounddata', 'cells');
                    $("#jqxassaysgrid").jqxGrid('gotopage', 0);
                    $("#jqxassaysgrid").jqxGrid('selectrow', 0);

                    $("#jqxassaysgrid").jqxGrid('beginrowedit', 0);

                });

                $("#deleteassayrowbutton").on('click', function() {
                    var selectedrowindex = $("#jqxassaysgrid").jqxGrid('getselectedrowindex');
                    var rowscount = $("#jqxassaysgrid").jqxGrid('getdatainformation').rowscount;
                    $log.info(selectedrowindex);

                    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                        var id = $("#jqxassaysgrid").jqxGrid('getrowid', selectedrowindex);
                        var commit = $("#jqxassaysgrid").jqxGrid('deleterow', id);
                        $scope.assays.splice(selectedrowindex, 1);
                        $log.info($scope.assays);
                        $scope.postJson.length = 0;
                        $($scope.assays).each(function(index, item) {
                            var postItem = {
                                "name": item["name"],
                                "spec": item["spec"]
                            }
                            $scope.postJson.push(postItem);
                        })
                        $scope.$digest();
                        $log.info($scope.postJson);
                    }

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
            var onError = function(reason) {
                $log.error("error");
                $scope.error = "Unable to fetch assays";
            };
            $scope.syncData = function() {


                var onSaveAssaysComplete = function(response) {

                    $log.info("onSaveAssaysComplete");

                    $log.info(response.data);
                    $('#myModal').modal('hide');
                    $("#jqxassaysgrid").jqxGrid('updatebounddata', 'cells');

                    return true;

                };
                var onError = function(reason) {
                    $log.error("error");
                    $scope.error = "Failed to save assays";
                    $('#myModal').modal('hide');

                    return false;
                };

                $log.info("syncData");
                $log.info($scope.postJson);


                if ($scope.postJson.length == 0 && $scope.assays.length > 0) {
                    return;
                } else {
                     $('#myModal').modal({
                      show: true,
                      backdrop:'static'
                    });
                    var url = "/cgi/saveassays/json";
                    $http.post(url, $scope.postJson).then(onSaveAssaysComplete, onError);

                }
            };

        $scope.showAssaysGrid = function(assays) {
            var source = {
                localdata: assays,
                datatype: "json",

                updaterow: function(rowid, rowdata, commit) {
                    $log.info("updaterow called");
                    $log.info(rowdata);

                    var lName = rowdata["base"].toUpperCase()!="NONE"? (rowdata["base"] + "_" + rowdata["shortName"]):rowdata["shortName"];
                    //$("#jqxassaysgrid").jqxGrid('setcellvalue', rowid, 'name', rowdata["base"] + "_" + rowdata["shortName"]);
                    //$("#jqxassaysgrid").jqxGrid('setcellvalue', rowid, 'name', lName);

 



                    $scope.assays[rowid]["name"] =lName;
                    $scope.assays[rowid]["base"] = rowdata["base"];
                    $scope.assays[rowid]["shortName"] = rowdata["shortName"]; 

                           //.push({ index: rowid, data: rowdata });
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failder.
                    $log.info($scope.assays);
                    $scope.postJson.length = 0;
                    $($scope.assays).each(function(index, item) {
                        var postItem = {
                            "name": item["name"],
                            "spec": item["spec"]
                        }
                        $scope.postJson.push(postItem);
                    })
                    $scope.$digest();
                    $log.info($scope.postJson);
                    commit(true);
 
                    //$scope.syncData();

                },
                datafields: [{
                        name: 'name'
                    }, {
                        name: 'base'
                    }, {
                        name: 'shortName'
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
            var dataAdapter = new $.jqx.dataAdapter(source, {
                async: false,
                loadError: function(xhr, status, error) {
                    alert('Error loading "' + source.url + '" : ' + error);
                }
            });

            $("#jqxassaysgrid").jqxGrid({
                width: '100%',
                autorowheight: true,
                autoheight: true,
                editable: true,
                pageable: true,
                showtoolbar: true,
                editmode: 'selectedrow',
                theme: 'Arctic',
                selectionmode: 'singlerow',
                source: dataAdapter,
                rendertoolbar: function(toolbar) {
                    var me = this;
                    var container = $("<div style='margin: 5px;'></div>");
                    toolbar.append(container);
                    var addButton = '<button id="addassayrowbutton" class="btn btn-primary btn-sm"><span>Add New Row</span>  </button>';
                    var deleteButton = '<button id="deleteassayrowbutton" class="btn btn-danger btn-sm" style="margin-left: 10px;"><span>Delete Selected Row</span>  </button>';
                    container.append(addButton);
                    // container.append('<div width="10px"></div>');
                    container.append(deleteButton);
                    $("#addassayrowbutton").jqxButton();
                    $("#deleteassayrowbutton").jqxButton();
                    // create new row.


                },
                columns: [{
                    text: 'Long Name',
                    datafield: 'name',
                    editable: false
                }, {
                    text: 'Base',
                    datafield: 'base',
                    columntype: 'combobox',
                    createeditor: function(row, column, editor) {
                        // assign a new data source to the combobox.
                        editor.jqxComboBox({ 
                            source: bases.bases,
                            promptText: "Choose Base:",
                             dropDownHeight: 300, autoDropDownHeight: false
                        });
                    },
                        //      createeditor: function(row, column, editor) {
                        // // assign a new data source to the combobox.
                        // editor.jqxDropDownList({ 
                        //     autoDropDownHeight: true,
                        //     source: bases.bases,
                        //     promptText: "Choose Base", dropDownHeight: 400, autoDropDownHeight: false
                  
                        // });
                 //   },
                    // update the editor's value before saving it.
                    cellvaluechanging: function(rowid, column, columntype, oldvalue, newvalue) {
                        var rows = $("#jqxassaysgrid").jqxGrid('getrows');
                        var rowdata = rows[rowid];

                        // return the old value, if the new value is empty.
                        $log.info("Selected Value: " + newvalue)
 
                            return newvalue == ""? "NONE":newvalue;
                       

 
                    }
                }, {
                    text: 'Short Name',
                    datafield: 'shortName',
                    cellvaluechanging: function(rowid, column, columntype, oldvalue, newvalue) {
                        // return the old value, if the new value is empty.
                        $log.info("edited Value: " + newvalue)

                        //$log.info($scope.assays[row]); 
                        var rows = $("#jqxassaysgrid").jqxGrid('getrows');
                        var rowdata = rows[rowid];


                        $log.info("update row called");

                        $log.info(rowdata);
                        var newName = "";
                        return newvalue;

                    },
                    validation: function(cell, value) {
                        if (value.toLowerCase() =="new") {
                            return {
                                result: false,
                                message: value+" is not a valid name"
                            };
                        }else if (value.length==0) {
                            return {
                                result: false,
                                message: "You must enter a name for this assay"
                            };
                        }
                        return true;
                    }
                }]
            });
            $("#jqxassaysgrid").on('rowselect', function(event) {
                $log.info("Row " + event.args.rowindex + " Selected");
                $scope.showElementsGrid(event.args.rowindex); 
              
            });

        };
        var setUpSpecToolBar = function(){

            $("#addspecrowbutton").unbind('click');

            $("#addspecrowbutton").on('click', function() {
                var datarow = generaterow();
                var commit = $("#jqxassayselementsgrid").jqxGrid('addrow', null, datarow);
                $scope.assayElems.unshift(datarow);
                $log.info($scope.assayElems);
                $("#jqxassayselementsgrid").jqxGrid('updatebounddata', 'cells');
                $("#jqxassayselementsgrid").jqxGrid('gotopage', 0);
                $("#jqxassayselementsgrid").jqxGrid('begincelledit', 0,"element");

            });
            $("#deletespecrowbutton").unbind('click');

            $("#deletespecrowbutton").on('click', function() {
                var selectedrowindex = $("#jqxassayselementsgrid").jqxGrid('getselectedrowindex');
                var rowscount = $("#jqxassayselementsgrid").jqxGrid('getdatainformation').rowscount;
                $log.info(selectedrowindex);

                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                    var id = $("#jqxassayselementsgrid").jqxGrid('getrowid', selectedrowindex);
                    var commit = $("#jqxassayselementsgrid").jqxGrid('deleterow', id);
                    $scope.assayElems.splice(selectedrowindex, 1);
                    $log.info($scope.assayElems);
                    $scope.postJson.length = 0;
                    $($scope.assays).each(function(index, item) {
                        var postItem = {
                            "name": item["name"],
                            "spec": item["spec"]
                        }
                        $scope.postJson.push(postItem);
                    })
                    $scope.$digest();
                    $log.info($scope.postJson);
                }

            });
            var generaterow = function(i) {
                var row = {};
                row["element"] = "";
                row["error"] = 0;
                row["percent"] = 0;
                 return row;
            }
        };
        $scope.showElementsGrid = function(rowid) {
            

            $scope.assayElems = rowid < 0 ? [] : $scope.assays[rowid]["spec"];
            $log.info($scope.assayElems);
 
            var source = {
                localdata: $scope.assayElems,
                datatype: "json",
                pagesize: 20,
                editable: true,
                datafields: [{
                    name: 'element'
                }, {
                    name: 'percent',
                    type: 'float'
                }, {
                    name: 'error',
                    type: 'float'
                }],
                updaterow: function(rowid, rowdata, commit) {
                     $log.info("updaterow called");
                    // $log.info(rowdata);



                     $scope.assayElems[rowid]["element"] = rowdata["element"];
                     $scope.assayElems[rowid]["error"] = rowdata["error"];
                     $scope.assayElems[rowid]["percent"] = rowdata["percent"];


                     // // synchronize with the server - send update command
                    // // call commit with parameter true if the synchronization with the server is successful 
                    // // and with parameter false if the synchronization failder.
                    $log.info($scope.assayElems);
                    $scope.postJson.length = 0;
                    $($scope.assays).each(function(index, item) {
                        var postItem = {
                            "name": item["name"],
                            "spec": item["spec"]
                        }
                        $scope.postJson.push(postItem);
                    })
                    $scope.$digest();
                    $log.info($scope.postJson);
                     commit(true);
                    //$scope.syncData();

                },
            };
            var dataAdapter = new $.jqx.dataAdapter(source, {
                async: false,
                loadError: function(xhr, status, error) {
                    alert('Error loading "' + source.url + '" : ' + error);
                }
            });
            $("#jqxassayselementsgrid").jqxGrid({
                width: '100%',
                autorowheight: true,
                autoheight: true,
                editable: true,
                pageable: true,
                showtoolbar: true,
                editmode: 'dbclick',
                theme: 'Arctic',
                source: dataAdapter,
                selectionmode: 'singlerow',
                rendertoolbar: function(toolbar) {
                    var me = this;
                    var container = $('<div style="margin: 5px;" ></div>');
                    toolbar.append(container);
                    var addButton = '<button id="addspecrowbutton" " class="btn btn-primary btn-sm"><span>Add New Row</span>  </button>';
                    var deleteButton = '<button id="deletespecrowbutton" class="btn btn-danger btn-sm" style="margin-left: 10px;"><span>Delete Selected Row</span>  </button>';
                    container.append(addButton);
                    // container.append('<div width="10px"></div>');
                    container.append(deleteButton);
                    $("#addspecrowbutton").jqxButton();
                    $("#deletespecrowbutton").jqxButton();
                    // create new row.


                },
                columns: [{
                    text: 'Element',
                    datafield: 'element',
                    columntype: 'dropdownlist',
                  //  values:  bases.elements,
                    createeditor: function(row, column, editor) {
                        // assign a new data source to the combobox.
                        editor.jqxDropDownList({ 
                            autoDropDownHeight: true,
                            source: bases.elements,
                            promptText: "Choose Element", dropDownHeight: 400, autoDropDownHeight: false
                  
                        });
                    },

                    // update the editor's value before saving it.
                    cellvaluechanging: function(row, column, columntype, oldvalue, newvalue) {
                        // return the old value, if the new value is empty.
                        $log.info("Selected Value: " + newvalue)
                        $log.info(newvalue)
                        if (newvalue == "") return oldvalue;
                        return newvalue;

                    },
                    validation: function(cell, value) {
                        $log.info(cell);
                        result =true;

                        if (cell["value"]!=value) {
                            $( $scope.assayElems).each(function(index,item){
                                if (item["element"].toLowerCase()==value.toLowerCase()) {
                                    result= {
                                        result: false,
                                        message: "Element Already Exists!"
                                    };
                                };
                            });
                        };

                        return result;
                    }
                }, {
                    text: 'Value',
                    datafield: 'percent',
                    columntype: 'numberinput',
                    inputMode: 'simple',
                    cellsformat: 'f3',
                    validation: function(cell, value) {
                        $log.info(value);

                        if (value < 0 || value > 100) {
                            return {
                                result: false,
                                message: "Value should be in the 0-100% range"
                            };
                        } else {
                            //  $log.info(  $scope.assayElems['spec']); 




                            var sum = 0;
                            $($scope.assayElems['spec']).each(function(index, item) {
                                //  $log.info(item);
                                if (cell.row != index) {
                                    sum += item.percent;
                                };
                                // sum+=
                            });
                            sum += value;
                            $log.info(sum);
                            if (sum > 100) {
                                return {
                                    result: false,
                                    message: "The Sum of all elements should be in the 0-100% range"
                                };
                            }
                        }

                        return true;
                    },

                    createeditor: function(row, cellvalue, editor) {
                        editor.jqxNumberInput({
                            decimalDigits: 3,
                            symbol: '%'
                        });
                    }
                }, {
                    text: 'Error',
                    datafield: 'error',
                    columntype: 'numberinput',
                    cellsformat: 'f3',
                    validation: function(cell, value) {
                        if (value < 0 || value > 100) {
                            return {
                                result: false,
                                message: "Error should be in the 0-100% range"
                            };
                        }
                        return true;
                    },
                    createeditor: function(row, cellvalue, editor) {
                        editor.jqxNumberInput({
                            decimalDigits: 3,
                            symbol: '%'
                        });
                    }
                }]

            });
            $('#jqxassayselementsgrid').on('bindingcomplete', function () {
                $log.info("init init init init init init init init init init");
                setUpSpecToolBar();
            }); 
           // $log.info("$scope.assayElems");
           // $log.info($scope.assayElems);
           var show= (typeof rowid!="undefined" && rowid>=0);
            $('#jqxassayselementsgrid').jqxGrid({ showtoolbar: show}); 
        };

       // $scope.showAssaysGrid([]);
        $scope.showElementsGrid(-1);

        var url = "/cgi/assays";

        $http.get(url).then(onGetAssaysComplete, onError);
    };

    app.controller("AssaysController", AssaysController);
})();