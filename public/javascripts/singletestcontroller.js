(function() {
	var app = angular.module("libz-app");

	var SingleTestController = function($scope,$http,$log, $routeParams){
		$scope.singleTest=$scope.$parent.singleTest;
		var onGetSingleTestComplete = function(response) {
			$log.info("onGetSingleTestComplete");

		  $log.info(response.data.mResult);


			$scope.singleTest=$scope.formatTest(response.data.mResult);
			$log.info($scope.singleTest);

 		  $scope.$parent.showSpinner = false;
 		  $scope.showGrid($scope.singleTest);
		}; 

		var onError = function(reason) {
			$log.error("error");
			$scope.error = "Unable to fetch test";
		};

	 
$scope.showGrid =function(singleTest) {

	var source =
	{
		localdata: singleTest.firstMatch.chemResults,
		datatype: "json",
		datafields: [
		{ name: 'element' },
		{ name: 'percent' },
		{ name: 'error' } ,
		{ name: 'min' } ,
		{ name: 'max' } 

			         ]//, url: 'http://localhost:9000/getChemResults?tid=4'

			     };
			     var dataAdapter = new $.jqx.dataAdapter(source, { async: false, loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });
			     $("#jqxsingletestgrid").jqxGrid(
			     {
			     	width: '100%',
			     	autorowheight: true,
			     	autoheight: true,
			     	theme: 'Arctic',

			     	source: dataAdapter,
			     	columns: [
			     	{ text: 'Element', datafield: 'element' },
			     	{ text: 'Value', datafield: 'percent'},
			     	{ text: 'Min', datafield: 'min' },
			     	{ text: 'Max', datafield: 'max'},
			     	{ text: 'Error', datafield: 'error' }
			     	]
			     });
			 };


			 $scope.$parent.showSpinner = true;


			 var testId = $routeParams.tid;
			 $log.info("testSelected");
			 $log.info(testId);
			 var url ="/cgi/result/"+testId;
			 var testUrl = "http://localhost:9000/getTestById/"
			 $http.get(url)
			 .then(onGetSingleTestComplete, onError);

			 $scope.formatTest = function(test){

			 	var json = {};
			 	var firstMatch = {};
		    // "base": "Al",
		    //  "grade": {
		    //    "comments": "",
		    //    "uns": "A03550",
		    //    "name": "Al_355",
		    //    "matchNumber": 64.56099488159458
		    //    "spec": {

		    	var firstGradeRank =  test["gradeRanks"][0]["grade"];

		    	json["title"]= test["title"];
		    	json["id"]= test["id"];
		    	json["date"]= test["date"];
		    	json["base"]= test["base"];

		    	firstMatch["chemResults"] = getChemResult(test);
		    	firstMatch["comments"] = firstGradeRank["comments"];
		    	firstMatch["uns"] = firstGradeRank["uns"];
		    	firstMatch["name"] = firstGradeRank["name"];
		    	firstMatch["matchNumber"] = test["gradeRanks"][0]["matchNumber"];
	    	console.log("json1");
		    	json["firstMatch"]=firstMatch;
		    	console.log("json2");
		    	console.log(json);
		    	return json;

		    };
		 function getChemResult(test){

		      var json =[];

		             //  console.log(test["chemResults"]);

		      test["chemResults"].forEach(function(item) {
		         var jsonData = {};
		          //console.log("chemResults");
		           jsonData["element"] = item["element"];
		           jsonData["percent"] = item["percent"];
		           jsonData["error"] = item["error"];

		            var firstGradeRank =  test["gradeRanks"][0]["grade"];

		            var spec = firstGradeRank["spec"];
		            if(typeof(spec[item["element"]]) != 'undefined' && spec[item["element"]]!=null){
		              jsonData["min"] = spec[item["element"]]["min"];
		              jsonData["max"] = spec[item["element"]]["max"];
		            }
		        json.push(jsonData);
		      });

		 
		    return json;

  };
		};






		app.controller("SingleTestController", SingleTestController);
	})();