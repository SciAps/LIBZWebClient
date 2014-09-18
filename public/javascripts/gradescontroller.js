(function() {
    var app = angular.module("libz-app");
    var GradesController = function($scope, $http, $log, $location, $routeParams) {

        var bases = new basesBuilder();



        $('#selectAssayModal').modal({
            show: true,
            backdrop: 'static'
        });

        
        var onError = function(reason) {
            $log.error(reason);
            $scope.error = "Failed to save assays";
            $('#myModal').modal('hide');

            return false;
        };


        var onGetSingleLibrary = function(response) {

            $log.info("onGetSingleLibrary");
            $log.info(response.data);
            $scope.grades =response.data;
           showLibraryGrid($scope.grades);




        };

        var showLibraryGrid = function(grades) {
               var source = {
                localdata: grades,
                datatype: "json", 
                datafields: [{
                      name: 'name'
                    },
                    {
                      name: 'uns'
                    },
                    {
                      name: 'comments'
                    },
                    {
                       name: 'enabled',
                       type:'boolean'
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
                    var addButton = '<button id="addgrade" class="btn btn-primary btn-sm"><span>Add</span></button>';
                    var editButton = '<button id="editgrade" class="btn btn-primary btn-sm" style="margin-left: 5px;"><span>Edit</span></button>';
                    var deleteButton = '<button id="deletegrade" class="btn btn-danger btn-sm" style="margin-left: 5px;"><span>Delete</span>  </button>';
                    container.append(addButton);
                    container.append(editButton);
                     container.append(deleteButton);
                    $("#addgrade").jqxButton();
                    $("#editgrade").jqxButton();
                    $("#deletegrade").jqxButton();
                    // create new row.


                },
                columns: [{
                    text: 'Name',
                    datafield: 'name',
                },{
                    text: 'Uns',
                    datafield: 'uns',
                },{
                    text: 'Enabled',
                    datafield: 'enabled',
                    columntype: 'checkbox',
                     width: 60
                }, {
                    text: 'Comments',
                    columntype: 'button',
                     width: 80,
                    cellsrenderer: function() {
                        return "Show";
                    },
                    buttonclick: function(row) {
                        $log.info("show Comments, row: "+row);
                        var comments = $("#jqxgradelibsgrid").jqxGrid('getrowdata', row).comments;
                        $scope.comments =comments;
                        $scope.$digest();
                        $log.info($scope.comments); 

                        $('#commentsModal').modal({
                            show: true 
                        });

                        // var name = $("#jqxcalibrationsgrid").jqxGrid('getrowdata', row).name;
                        // var base = $("#jqxcalibrationsgrid").jqxGrid('getrowdata', row).base;

                        // $log.info(name);

                        // $location.path("/assays/" + name + "/" + base);

                        // $scope.showSpinner();
                        // $scope.$apply();


                    }
                }]
            });
            $("#jqxgradelibsgrid").on('rowselect', function(event) {
                $log.info("Row " + event.args.rowindex + " Selected");
                showElementsGrid(event.args.rowindex); 
              
            });
         };

        var showElementsGrid = function(rowid) {
             var getElementsFromGrade =function(grade){
                var elements =[]
            // $($scope.grades).each(function(i, grade){
 
                for (var key in grade['spec']) {
                 var obj = grade['spec'][key];
                   $log.info(key);
 
                    obj['element']= key;
                    elements.push(obj);
      
                };
                return elements;
            };

            $scope.elements = rowid < 0 ? [] : getElementsFromGrade($scope.grades[rowid]);
            $log.info($scope.elements);

            //$scope.assayElems = rowid < 0 ? [] : $scope.assays[rowid]["spec"];
            //$log.info($scope.assayElems);
 
            var source = {
                localdata: $scope.elements,
                datatype: "json",
                pagesize: 20,
                editable: true,
                datafields: [{
                    name: 'element'
                }, {
                    name: 'min',
                    type: 'float'
                }, {
                    name: 'max',
                    type: 'float'
                }, {
                    name: 'isTramp',
                    type: 'boolean'
                }],
                updaterow: function(row, rowdata, commit) {
                     $log.info("updaterow called");
                    // $log.info(rowdata);



                     $scope.elements[row]["element"] = rowdata["element"];
                     $scope.elements[row]["max"] = rowdata["max"];
                     $scope.elements[row]["min"] = rowdata["min"];
                     $scope.elements[row]["isTramp"] = rowdata["isTramp"];


                    //  // // synchronize with the server - send update command
                    // // // call commit with parameter true if the synchronization with the server is successful 
                    // // // and with parameter false if the synchronization failder.
                    // $log.info($scope.elements);



                    //     $($scope.rawAssays).each(function(index, item) {
                    //         if ($scope.assays[rowid]['name'] == item['name']) {
                    //             $scope.rawAssays[index]['spec'] =[];

                    //             $($scope.assayElems).each(function(index2, item2) {
                    //                  $scope.rawAssays[index]['spec'].push({"element": item2["element"],"error": item2["error"],"percent": item2["percent"]})
                    //             });

                    //             //item["spec"]=$scope.assayElems[row];

                    //         };
                    //     });



                    //     $log.info("$scope.assays");
                    //     $log.info($scope.assays);
                    //     $log.info("$scope.rawAssays");
                    //     $log.info($scope.rawAssays);
                        
                    //     $scope.$digest();
                    //    $scope.unsavedChanges = true;

                },
            };
            var dataAdapter = new $.jqx.dataAdapter(source, {
                async: false,
                loadError: function(xhr, status, error) {
                    alert('Error loading "' + source.url + '" : ' + error);
                }
            });
            $("#jqxelementsgrid").jqxGrid({
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
                    var addButton = '<button id="addspecrowbutton" " class="btn btn-primary btn-sm"><span>Add New Element</span>  </button>';
                    var deleteButton = '<button id="deletespecrowbutton" class="btn btn-danger btn-sm" style="margin-left: 10px;"><span>Delete Selected Element</span>  </button>';
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
                        $log.info("validation");
                        $log.info(cell);
                        $log.info(value);
                        result =true;


                        if (value.length==0) {
                                    result= {
                                        result: false,
                                        message: "Please Select Element!"
                                    };
                        }else if (cell["value"]!=value) {
                            $( $scope.assayElems).each(function(index,item){
                                if (item["element"].toLowerCase()==value.toLowerCase()) {
                                    result= {
                                        result: false,
                                        message: "Element Already Exists!"
                                    };
                                };
                            });
                        };
                        $log.info('element valid '+result);
                        return result;
                    }
                }, {
                    text: 'Min',
                    datafield: 'min',
                    columntype: 'numberinput',
                    inputMode: 'simple',
                    cellsformat: 'f3', 
                    validation: function(cell, value) {
                        $log.info(value);

                        if (value < 0 || value >= 100.001) {

                            return {
                                result: false,
                                message: "Value should be in the 0-100% range"
                            };
                        } else {
                            //  $log.info(  $scope.assayElems['spec']); 




                            var sum = 0;
                            $($scope.assayElems).each(function(index, item) {
                                //  $log.info(item);
                                if (cell.row != index) {
                                    sum += item['percent'];
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
                           symbol: '%',
                           min: 0, 
                           max: 100,
                            inputMode: 'simple',
                            spinButtons: false 
                        });
                    }
                }, {
                    text: 'Max',
                    datafield: 'max',
                    columntype: 'numberinput',
                    inputMode: 'simple',
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
                           min: 0, 
                           max: 100,
                             symbol: '%',
                            inputMode: 'simple',
                            spinButtons: false 
                        });
                    }
                },{
                    text: 'Trump',
                    datafield: 'isTramp',
                    columntype: 'checkbox',
                    width: 60
                }
                ]

            });
            $('#jqxelementsgrid').on('bindingcomplete', function () {
                //$log.info("init init init init init init init init init init");
               // setUpSpecToolBar();
            }); 
            $("#jqxelementsgrid").on('cellbeginedit', function (event) {
                // var column = args.datafield;
                // var row = args.rowindex;
                // $log.info("column "+column);

                // var cell = $('#jqxelementsgrid').jqxGrid('getcell', row, column);

                // $log.info(cell);

                // if(args.columntype == "numberinput"){
                // //$('#jqxNumberInput').jqxNumberInput('focus'); 
                //     $log.info("numberinput ");

                // }
                // var value = args.value;
            });
            
           var show= (typeof rowid!="undefined" && rowid>=0);
            $('#jqxelementsgrid').jqxGrid({ showtoolbar: show}); 
        };


        $scope.fname = $routeParams.fname;
        $scope.comments ="";

        var url = "/cgi/gradelibrary/"+$routeParams.fname;

        $http.get(url).then(onGetSingleLibrary, onError);

    };

    app.controller("GradesController", GradesController);
})();