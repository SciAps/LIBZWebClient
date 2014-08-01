(function(){
  var app = angular.module("libz-app");
  var TestsController = function($scope, $http, $log, $location) {
      $log.info("TestsController");
//       $scope.showSpinner = $scope.$parent.showSpinner;


    var onGetTestsComplete = function(response) {
      $log.info("onGetTestsComplete");
      $log.info(response.data);
       $scope.tests = response.data;
       $scope.hideSpinner();


      showTests();
    }; 

    // var onGetCSVComplete = function(response) {
    //   $log.info("onGetCSVComplete");
    //   $log.info(response.data);

    //   window.location = '/sampledata/Alloy.csv' ;

    // }; 

    var onError = function(reason) {
      $log.error("error");
      $scope.error = "Unable to fetch test";
    };

//     $(document).ready(function () {
// var url = '/cgi/results?start=0';
//       var testurl = 'http://localhost:9000/getAllTests/20';
 
//       $http.get(url)
//         .then(onGetTestsComplete, onError);

//     });

    // $scope.downloadCSV = function (checkedTests) {
    //         $log.info("downloadCSV");
    //         $log.info(checkedTests);


    //     //       $http.get("http://localhost:9000/getCompareCSV")
    //     // .then(onGetCSVComplete, onError);

    //  // var querystring = buildQueryString( criteria )
    //    //   window.location = '/sampledata/Alloy.csv' ;

    // };


    function showTests(tsts) {

        var data = {};

      var source =
      {
        //localdata:  $scope.tests,
                url: "/cgi/results",

//        uri: "/cgi/results",
        root:"items",
        datatype: "json",
        beforeprocessing: function (data) {
          $log.info("Total rows: "+data.total);
          source.totalrecords = data.total;
        },
        datafields: [
          { name: 'id', type: 'string' },
          { name: 'title', type: 'string' },
          { name: 'time', type: 'string' } ,
          { name: 'base', type: 'string' } ,
          { name: '1st_match', type: 'string' } ,
          { name: 'match_no', type: 'string' } 
        ],

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
      
      // var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
      //   if (value < 20) {
      //     return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
      //   }
      //   else {
      //   return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
      //   }
      // };
      // var dataAdapter = new $.jqx.dataAdapter(source, {
      //   downloadComplete: function (data, status, xhr) { },
      //   loadComplete: function (data) { },
      //   loadError: function (xhr, status, error) { }
      // });
    // initialize jqxGrid
      $("#jqxtestsgrid").jqxGrid({
        pagesizeoptions:['5','10','20','50','100'],
        width: "100%",
        source: dataAdapter,
        theme: 'Arctic',
        pageable: true,
        virtualmode: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        editable: false,
        rendergridrows: function () {
//          $log.info("rendergridrows: "+dataadapter.records);

          return dataAdapter.records;
        },

        selectionmode: 'checkbox',
        columns: [
          { text: 'ID', datafield: 'id' },
          { text: 'Name', datafield: 'title' },
          { text: 'Base', datafield: 'base' },
          { text: '1st Match', datafield: '1st_match' },
          { text: 'Match #', datafield: 'match_no' },
          { text: 'Date', datafield: 'time', width: 180 },
          { text: 'Show Test', columntype: 'button',width: 100, cellsrenderer: function () {
          return "Show Test";
            }, 
            buttonclick: function (row) {
            // open the popup window when the user clicks a button.
            editrow = row;
            $scope.checkedTests.length=0;
            //  var offset = $("#jqxgrid").offset();
        var tid = $("#jqxtestsgrid").jqxGrid('getrowdata', editrow).id;
            var tdate= $("#jqxtestsgrid").jqxGrid('getrowdata', editrow).time;
            var ttitle= $("#jqxtestsgrid").jqxGrid('getrowdata', editrow).title;

                        //$scope.broadcastTestSelected(dataRecord.id);
            $log.info("/single/"+tid);
            $location.path("/single/"+tid+"/"+ttitle+"/"+tdate);
            $scope.showSpinner();
            $scope.$apply();
            }
          }
        ] 
      });
    // enable or disable the hover state.
      $("#enablehover").on('change', function (event) {
        $("#jqxtestsgrid").jqxGrid('enablehover', event.args.checked);
    
      });     


        $("#jqxtestsgrid").bind('rowselect', function (event) {

          var row =  event.args.row;
           $log.info(event);
           $log.info(event.args);

          if (Array.isArray(event.args.rowindex)) {
            if (event.args.rowindex[0]==-1) {
            $log.info("deselect all");
            $scope.checkedTests.length=0



            }else{
              $log.info("select all");

              $scope.checkedTests.length=0;

              $scope.tests.forEach(function(item) {

                $scope.checkedTests.push(item["id"]);
              });
            };
            $scope.$digest();
            $scope.broadcastSpecChange();
            return;
          };
        // var id =row["id"];
        // var title =row["title"];
        $scope.checkedTests.push(row["id"]);
        $log.info($scope.checkedTests);
        $scope.$digest();
        $scope.broadcastSpecChange();
      });

      $("#jqxtestsgrid").bind('rowunselect', function (event) {

        var row =  event.args.row;
        var id =row["id"];
        var title =row["title"];

        for (var i = $scope.checkedTests.length - 1; i >= 0; i--) {
          if ( $scope.checkedTests[i]==id) {
            $scope.checkedTests.splice(i, 1);
            break;
          };
        };

        $log.info($scope.checkedTests);

        $scope.$digest();
        $scope.broadcastSpecChange();

      });
    };
       showTests();
  };
  app.controller("TestsController", TestsController);

})();