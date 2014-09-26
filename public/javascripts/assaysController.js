(function() {
        var app = angular.module("libz-app");
        var AssaysController = function($scope, $http, $log, $location, $routeParams) {


            $scope.postJson = [];
            $scope.newAssayName = '';
            $scope.unsavedChanges = false;
            $scope.calibrationName =$routeParams.name;


                $(window).bind('beforeunload', function(){
                    if( $scope.unsavedChanges ){
                        return "It looks like you have unsaved changes."
                    }
                });


                $scope.$on('$locationChangeStart', function (event, next, current) {
                    if ($scope.unsavedChanges) {
                        event.preventDefault();
                        var answer = confirm("It looks like you have unsaved changes, Are you sure you want to leave this page?")
                        if (answer) {
                            $scope.unsavedChanges=false;
                            blockNavigation = false;
                            $location.url($location.url(next).hash());
                            $scope.$apply();
                        }
                     }      
                });

           
            $scope.saveAll= function(){
              
                var onSaveAllComplete = function(response) {

                    $log.info("onSaveAssaysComplete"); 
                    $log.info(response.data);
                    $('#myModal').modal('hide');
                    $("#jqxassaysgrid").jqxGrid('updatebounddata', 'cells');
                    $scope.unsavedChanges = false;
                    return true;

                };
                var onError = function(reason) {
                    $log.error("error");
                    $scope.error = "Failed to save assays";
                    $('#myModal').modal('hide');

                    return false;
                };

                //$log.info($scope.postJson);


                if ($scope.rawAssays.length == 0 && $scope.assays.length > 0) {
                    return;
                } else {
                     $('#myModal').modal({
                      show: true,
                      backdrop:'static'
                    });

                    $scope.postJson.length = 0;
                        $($scope.rawAssays).each(function(index, item) {
                            var postspec=[];
                            $(item["spec"]).each(function(i, specitem) {
                                if (specitem['percent']>0) {
                                    postspec.push(specitem);
                                };
                            });

   

                            var postItem = {
                                "name": item["name"],
                                "spec": postspec
                            }
                            $scope.postJson.push(postItem);
                        })


                    var url = "/cgi/saveassays/json";
                $log.info("$scope.postJson");

                     $log.info( $scope.postJson.length);
                     $log.info( $scope.postJson[0]);
                    $log.info($scope.postJson);

                    $http.post(url, $scope.postJson).then(onSaveAllComplete, onError);

                }



            };

            $scope.addAssay= function(name){
                name = name.trim();
                $log.info("saving new assay "+name);

                $scope.assayvalidationerror ="";
                    var baseElems= new HashSet();

                    $($scope.rawAssays).each(function(i,item){
                        if (item["base"]===$routeParams.base&&item["calibrationName"]==$routeParams.name) {
                            $log.info(item["name"]); // "object"
                            $(item.spec).each(function(i,elem){

                                baseElems.add(elem["element"]);
                            });
                        };

                    });

                    elemarray =baseElems.values();

                    $log.info( elemarray); 
                    elemarray.sort();
                    $log.info( elemarray); 

                    var baseSpec =[];
                    $(elemarray).each(function(i,elem){

                        baseSpec.push({"element":elem,"percent":0,"error":0});
                    });
           
                    $($scope.assays).each(function(index, assay) {

                        if (assay['shortName'].trim()==name) {
                            $scope.assayvalidationerror ="Assay already exists!";
                            $scope.$digest();
 
                         };
                    });


                    $($scope.assays).each(function(index, assay) {

                        if (assay['shortName'].trim()==name) {
                            $scope.assayvalidationerror ="Assay already exists!";
                            $scope.$digest();
 
                         };
                    });

                    $log.info($scope.assayvalidationerror);
                    if ($scope.assayvalidationerror.length==0) {
                                                        $scope.unsavedChanges = true;

                    $log.info('$scope.assayvalidationerror');

                    var item ={};
                    item["calibrationName"] = $routeParams.name;
                    item["shortName"] = name;
                    item["name"] = $routeParams.name+"-"+$routeParams.base+"_"+name;
                    item["base"] = $routeParams.base;
                    item["spec"] = baseSpec;




                      var commit = $("#jqxassaysgrid").jqxGrid('addrow', null, item);

                        $log.info("$scope.assays");
                        $scope.assays.unshift(item);
                        $log.info($scope.assays);
                        $log.info("$scope.rawAssays");
                        $scope.rawAssays.unshift(item);
                        $log.info($scope.rawAssays);


                        $("#jqxassaysgrid").jqxGrid('updatebounddata', 'cells');
                        $("#jqxassaysgrid").jqxGrid('gotopage', 0);
                        $("#jqxassaysgrid").jqxGrid('selectrow', 0);

                       
                        $('#selectAssayModal').modal('hide');
                        $scope.newAssayName="";
                    };
                    $("#jqxAssayDd").jqxDropDownList('selectIndex', -1); 

            };
            
            var bases = new basesBuilder();


            var onGetAssaysComplete = function(response) {

                $log.info("onGetAssaysComplete");


                $scope.rawAssays = response.data;

            

                //var assays=bases.addShortNameAndBase(response.data);
                $scope.assays = bases.getAssays(response.data,$routeParams.name,$routeParams.base)



                $scope.showAssaysGrid($scope.assays);

                setUpAssayToolBar();

                //todo: remove previously selected items

                $scope.ddVals = bases.getAssaysByBaseForDropDown($scope.rawAssays,$scope.assays,$routeParams.base);
 

                $("#jqxAssayDd").jqxDropDownList({ source: $scope.ddVals, displayMember: "shortName", valueMember: "shortName",selectedIndex: -1, width: '200', height: '25'});

                $('#jqxAssayDd').on('select', function (event) {
              $log.info("adding assay ");

                $scope.assayvalidationerror ="";
                if (event.args.item==null) {
                    return;
                };
                   var item = event.args.item.originalItem;
 
                    if (item != null) {

                    $log.info(event.args);



                        $($scope.assays).each(function(index, assay) {
                            if (assay['name']==item["name"]) {
                                $scope.assayvalidationerror ="Calibration Standard already exists!";
                                //$scope.$digest();
                             };
                        });


                        if ($scope.assayvalidationerror.length==0) {
                        $scope.unsavedChanges = true;
    
                         var newItem = {
                          "name":$routeParams.name+"-"+item["name"] ,
                           "calibrationName": $routeParams.name , 
                           "shortName": item["shortName"] ,
                           "base": item["base"], 
                           "spec": item["spec"]};



                    // $log.info(item);

                    //   var commit = $("#jqxassaysgrid").jqxGrid('addrow', null, item);

                    //     $log.info("$scope.assays");
                    //     $scope.assays.unshift(item);
                    //     $log.info($scope.assays);
                    //     $log.info("$scope.rawAssays");
                    //     $scope.rawAssays.unshift(item);
                    //     $log.info($scope.rawAssays);


                        // item["calibrationName"] = $routeParams.name;
                        // item["name"] = $routeParams.name+"-"+item["name"];



                          var commit = $("#jqxassaysgrid").jqxGrid('addrow', null, item);

                            $scope.assays.unshift(newItem);
                            $scope.rawAssays.unshift(newItem);

                            //$log.info($scope.assays);
                            $("#jqxassaysgrid").jqxGrid('updatebounddata', 'cells');
                            $("#jqxassaysgrid").jqxGrid('gotopage', 0);
                            $("#jqxassaysgrid").jqxGrid('selectrow', 0);
                            $('#selectAssayModal').modal('hide');
                            }; 
                            $("#jqxAssayDd").jqxDropDownList('selectIndex', -1); 

                         };
                      //  $scope.ddVals = bases.getAssaysByBaseForDropDown($scope.rawAssays,$scope.assays,$routeParams.base);
                      //  $("#jqxAssayDd").jqxDropDownList('removeItem', event.args.item); 
                    
                });
            };
            var setUpAssayToolBar = function(){
                $("#selectassayrowbutton").on('click', function() {
                    if ($scope.ddVals.length==0) {
                        //$scope.assayvalidationerror= "No Standards found for "+$routeParams.base+ ". Create a new Standard to add to this calibration";
                        $scope.assayvalidationwarning= "No Standards found for "+$routeParams.base+ ".\n   Create a new Standard to add to this calibration";
                        $log.error($scope.error);
                        $scope.$digest();


                    }else{
                        $scope.assayvalidationwarning= "";

                        $scope.assayvalidationerror ="";

                    }

                        $('#selectAssayModal').modal({
                          show: true,
                          backdrop:'static'
                        });
                });

       

                $("#deleteassayrowbutton").on('click', function() {
                    var selectedrowindex = $("#jqxassaysgrid").jqxGrid('getselectedrowindex');
                    var rowscount = $("#jqxassaysgrid").jqxGrid('getdatainformation').rowscount;
                    $log.info(selectedrowindex);
                    //var deletedItem = $scope.assays[selectedrowindex];

                    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                        var id = $("#jqxassaysgrid").jqxGrid('getrowid', selectedrowindex);
                        var commit = $("#jqxassaysgrid").jqxGrid('deleterow', id);
 

                        $($scope.rawAssays).each(function(index, item) {
                            if ($scope.assays[selectedrowindex]['name'] == item['name']) {
                                $scope.rawAssays.splice(index, 1);

                            };
                        });

                        $scope.assays.splice(selectedrowindex, 1);
                        $log.info("$scope.assays");
                        $log.info($scope.assays);
                        $log.info("$scope.rawAssays");
                        $log.info($scope.rawAssays);
                        $scope.$digest();
                        $scope.unsavedChanges = true;

                        $scope.showElementsGrid(-1); 

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
                $scope.error = "Unable to fetch calibration standards";
            };
  
        $scope.showAssaysGrid = function(assays) {
            var source = {
                localdata: assays,
                datatype: "json",

                updaterow: function(rowid, rowdata, commit) {
                    $log.info("updaterow called");
                    $log.info(rowdata);

                    var lName = rowdata["base"].toUpperCase()!="NONE"? (rowdata["base"] + "_" + rowdata["shortName"]):rowdata["shortName"];
      



                    $scope.assays[rowid]["name"] =lName;
                    $scope.assays[rowid]["base"] = rowdata["base"];
                    $scope.assays[rowid]["shortName"] = rowdata["shortName"]; 


                    $log.info($scope.assays);
                     $scope.unsavedChanges = true;

            
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
                editable: false,
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
                    var selectExisting = '<button id="selectassayrowbutton" class="btn btn-primary btn-sm"><span>Add Standard</span>  </button>';
                    //var addButton = '<button id="addassayrowbutton" class="btn btn-primary btn-sm" style="margin-left: 10px;"><span>Create New</span>  </button>';
                    var deleteButton = '<button id="deleteassayrowbutton" class="btn btn-danger btn-sm" style="margin-left: 10px;"><span>Delete Selected Standard</span>  </button>';
                    container.append(selectExisting);
                    //container.append(addButton);
                     container.append(deleteButton);
                    //$("#addassayrowbutton").jqxButton();
                    $("#selectassayrowbutton").jqxButton();
                    $("#deleteassayrowbutton").jqxButton();
                    // create new row.


                },
                columns: [
                    {
                    text: 'Name',
                     datafield: 'shortName' 

                }
                ]
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
                    $scope.unsavedChanges = true;

 
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
            //$log.info($scope.assayElems);
 
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
                updaterow: function(row, rowdata, commit) {
                     $log.info("updaterow called");
                    // $log.info(rowdata);



                     $scope.assayElems[row]["element"] = rowdata["element"];
                     $scope.assayElems[row]["error"] = rowdata["error"];
                     $scope.assayElems[row]["percent"] = rowdata["percent"];


                     // // synchronize with the server - send update command
                    // // call commit with parameter true if the synchronization with the server is successful 
                    // // and with parameter false if the synchronization failder.
                    $log.info($scope.assayElems);



                        $($scope.rawAssays).each(function(index, item) {
                            if ($scope.assays[rowid]['name'] == item['name']) {
                                $scope.rawAssays[index]['spec'] =[];

                                $($scope.assayElems).each(function(index2, item2) {
                                     $scope.rawAssays[index]['spec'].push({"element": item2["element"],"error": item2["error"],"percent": item2["percent"]})
                                });

                                //item["spec"]=$scope.assayElems[row];

                            };
                        });



                        $log.info("$scope.assays");
                        $log.info($scope.assays);
                        $log.info("$scope.rawAssays");
                        $log.info($scope.rawAssays);
                        
                        $scope.$digest();
                       $scope.unsavedChanges = true;

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
                           //symbol: '%',
                           min: 0, 
                           max: 100,
                            inputMode: 'simple'
                        });
                    }
                }, {
                    text: 'Error',
                    datafield: 'error',
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
                            // symbol: '%'
                            inputMode: 'simple'
                        });
                    }
                }]

            });
            $('#jqxassayselementsgrid').on('bindingcomplete', function () {
                //$log.info("init init init init init init init init init init");
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