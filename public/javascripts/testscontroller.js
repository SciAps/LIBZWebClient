(function(){
  var app = angular.module("libz-app");
  var TestsController = function($scope, $http, $log, $location) {
      $log.info("TestsController");
//       $scope.showSpinner = $scope.$parent.showSpinner;


    var onGetTestsComplete = function(response) {
      $log.info("onGetTestsComplete");
      $log.info(response.data);
       $scope.tests = response.data;
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

    $(document).ready(function () {
var url = '/cgi/results?start=0';
//var testurl = 'http://localhost:9000/getAllTests';

      $http.get(url)
        .then(onGetTestsComplete, onError);

    });

    $scope.downloadCSV = function (checkedTests) {
            $log.info("downloadCSV");
            $log.info(checkedTests);


        //       $http.get("http://localhost:9000/getCompareCSV")
        // .then(onGetCSVComplete, onError);

     // var querystring = buildQueryString( criteria )
          window.location = '/sampledata/Alloy.csv' ;

    };


    function showTests(tsts) {


      var source =
      {
        localdata:  $scope.tests,
        datatype: "json",
        datafields: [
          { name: 'id', type: 'string' },
          { name: 'title', type: 'string' },
          { name: 'time', type: 'string' } ,
          { name: 'base', type: 'string' } ,
          { name: '1st_match', type: 'string' } ,
          { name: 'match_no', type: 'string' } 
        ],
        id: 'id',
        pager: function (pagenum, pagesize, oldpagenum) {
        // callback called when a page or page size is changed.
        }
      };
      var dataAdapter = new $.jqx.dataAdapter(source);
      
      var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
        if (value < 20) {
          return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
        }
        else {
        return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
        }
      };
      var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
      });
    // initialize jqxGrid
      $("#jqxtestsgrid").jqxGrid({
        width: "100%",
        source: dataAdapter,
        theme: 'Arctic',
        pageable: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        editable: false,
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
            //  var offset = $("#jqxgrid").offset();
            var tid = $("#jqxtestsgrid").jqxGrid('getrowdata', editrow).id;
            //$scope.broadcastTestSelected(dataRecord.id);
            $log.info("/single/"+tid);
            $location.path("/single/"+tid);
             $log.info('showSpinner');

                        $scope.$apply();


          // window.location = "/ztest?tid="+dataRecord.id +"&"+"tname="+ dataRecord.name;
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

                $scope.checkedTests.push({"id":item["id"],"title":item["title"]});
              });
            };
            $scope.$digest();
            $scope.broadcastSpecChange();
            return;
          };
        var id =row["id"];
        var title =row["title"];
        $scope.checkedTests.push({"id":id,"title":title});
        $log.info($scope.checkedTests);
        $scope.$digest();
        $scope.broadcastSpecChange();
      });

      $("#jqxtestsgrid").bind('rowunselect', function (event) {

        var row =  event.args.row;
        var id =row["id"];
        var title =row["title"];

        for (var i = $scope.checkedTests.length - 1; i >= 0; i--) {
          if ( $scope.checkedTests[i]["id"]==id) {
            $scope.checkedTests.splice(i, 1);
            break;
          };
        };

        $log.info($scope.checkedTests);

        $scope.$digest();
        $scope.broadcastSpecChange();

      });
    };
  };
  app.controller("TestsController", TestsController);

})();