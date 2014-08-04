(function() {
    var app = angular.module("libz-app");
    var TestsController = function($scope, $http, $log, $location) {
        $log.info("TestsController");




        function showTests(tsts) {

            var data = {};

            var source = {
                url: "/cgi/results",
                root: "items",
                datatype: "json",
                beforeprocessing: function(data) {
                    $log.info("Total rows: " + data.total);
                    source.totalrecords = data.total;
                },
                datafields: [{
                    name: 'id',
                    type: 'string'
                }, {
                    name: 'title',
                    type: 'string'
                }, {
                    name: 'time',
                    type: 'string'
                }, {
                    name: 'base',
                    type: 'string'
                }, {
                    name: '1st_match',
                    type: 'string'
                }, {
                    name: 'match_no',
                    type: 'string'
                }, {
                    name: 'selected',
                    type: 'bool'
                }],

                id: 'id',
                pagesize: 50 
                    // ,
                    // pager: function (pagenum, pagesize, oldpagenum) {
                    //       $log.info("pagenum"+pagenum)
                    //         $log.info("pagesize"+pagesize)
                    //         $log.info("oldpagenum"+oldpagenum)
                    // }
            };
           var dataAdapter = new $.jqx.dataAdapter(source);


            var dataAdapter = new $.jqx.dataAdapter(source, {
           // autoBind: true,
            beforeLoadComplete: function (records) {


                                      //          $log.info(records);

 
 //                     var data = new Array();
                            // update the loaded records. Dynamically add EmployeeName and EmployeeID fields. 
                            for (var i = 0; i < records.length; i++) {
                              if (typeof(records[i]) !== "undefined" && records[i] !== null) {
                                var row = records[i];
                                          row.selected = false;

                                 // $log.info(row);
                                 // $log.info($scope.checkedTests);
                                  $scope.checkedTests.forEach(function(id) {
                                

                                      if (row["id"]==id) {
                                          row.selected = true;
                                        //  $log.info(row);

                                      }
                                 });
};
                               // data.push(row); 
                            }
                            $log.info($scope.checkedTests);

                            return records;
                         }
                      });


            // var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
            //   if (value < 20) {
            //     return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
            //   }
            //   else {
            //   return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
            //   }
            // };

            // initialize jqxGrid
            $("#jqxtestsgrid").jqxGrid({
                pagesizeoptions: ['5', '10', '20', '50', '100'],
                width: "100%",
                source: dataAdapter,
                theme: 'Arctic',
                pageable: true,
                virtualmode: true,
                autoheight: true,
                sortable: true,
                altrows: true,
                editable: true,
                rendergridrows: function() {
                    //          $log.info("rendergridrows: "+dataadapter.records);

                    return dataAdapter.records;
                },

                selectionmode: 'singlecell',
                columns: [{
                    text: '',
                    editable: true,
                    datafield: 'selected',
                    columntype: 'checkbox',
                    filtertype: 'bool',
                    width: 67
                }, {
                    text: 'ID',
                    editable: false,
                    datafield: 'id'
                }, {
                    text: 'Name',
                    editable: false,
                    datafield: 'title'
                }, {
                    text: 'Base',
                    editable: false,
                    datafield: 'base'
                }, {
                    text: '1st Match',
                    editable: false,
                    datafield: '1st_match'
                }, {
                    text: 'Match #',
                    editable: false,
                    datafield: 'match_no'
                }, {
                    text: 'Date',
                    editable: false,
                    datafield: 'time',
                    width: 180
                }]
            });
            // enable or disable the hover state.
            $("#enablehover").on('change', function(event) {
                $("#jqxtestsgrid").jqxGrid('enablehover', event.args.checked);

            });


            $("#jqxtestsgrid").bind('cellendedit', function(event) {
                if (event.args.value) {
                    $("#jqxtestsgrid").jqxGrid('selectrow', event.args.rowindex);
                } else {
                    $("#jqxtestsgrid").jqxGrid('unselectrow', event.args.rowindex);
                }
            });

            $("#jqxtestsgrid").on('cellselect', function(event) {


                var column = $("#jqxtestsgrid").jqxGrid('getcolumn', event.args.datafield);
                if (column.visibleindex != 0) {
                    console.log(event.args.rowindex);

                    // var griddata = $('#jqxtestsgrid').jqxGrid('getdatainformation');
                    // var row = $('#jqxtestsgrid').jqxGrid('getrenderedrowdata', i))

                    $scope.checkedTests.length = 0;
                    //  var offset = $("#jqxgrid").offset();
                    var tid = $("#jqxtestsgrid").jqxGrid('getrowdata', event.args.rowindex).id;
                    var tdate = $("#jqxtestsgrid").jqxGrid('getrowdata', event.args.rowindex).time;
                    var ttitle = $("#jqxtestsgrid").jqxGrid('getrowdata', event.args.rowindex).title;

                    //$scope.broadcastTestSelected(dataRecord.id);
                    $log.info("/single/" + tid);
                    $location.path("/single/" + tid + "/" + ttitle + "/" + tdate);
                    $scope.showSpinner();
                    $scope.$apply();
                };

            });
            $("#jqxtestsgrid").on('cellbeginedit', function(event) {
                var args = event.args;


                console.log("Event Type: cellbeginedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);

            });
            $("#jqxtestsgrid").on('cellendedit', function(event) {
                var args = event.args;
                console.log("Event Type: cellendedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
                var row = $('#jqxtestsgrid').jqxGrid('getrenderedrowdata', args.rowindex);


                if (args.value) {
                    $scope.checkedTests.push(row["id"]);
                } else {

                  for (var i = $scope.checkedTests.length - 1; i >= 0; i--) {
                    if ( $scope.checkedTests[i]==row["id"]) {
                      $scope.checkedTests.splice(i, 1);
                      break;
                    };
                  };


                };

                $scope.$digest();
                $scope.broadcastSpecChange();
                $log.info($scope.checkedTests);

            });
        };
        showTests();
    };
    app.controller("TestsController", TestsController);

})();