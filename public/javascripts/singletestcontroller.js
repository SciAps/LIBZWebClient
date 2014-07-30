(function() {
	var app = angular.module("libz-app");
	var SingleTestController = function($scope,$http,$log, $routeParams){


		var onGetSingleTestComplete = function(response) {
			$log.info("onGetSingleTestComplete");
	
			$scope.singleTest= $scope.formatTest(response.data.mResult,$routeParams.ttitle,$routeParams.tdate);


			$log.info($scope.singleTest);
			$scope.hideSpinner();

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

		$scope.formatTest = function(test,title,date){

		 	var json = {};
		 	var firstMatch = {};
	    	var firstGradeRank =  test["gradeRanks"][0]["grade"];

	    	json["title"]=title;
	    	json["id"]= test["id"];
	    	json["date"]= date;
	    	json["base"]= test["base"];

	    	firstMatch["chemResults"] = getChemResult(test);
	    	firstMatch["comments"] = firstGradeRank["comments"];
	    	firstMatch["uns"] = firstGradeRank["uns"];
	    	firstMatch["name"] = firstGradeRank["name"];
	    	firstMatch["matchNumber"] = test["gradeRanks"][0]["matchNumber"];
	    	json["firstMatch"]=firstMatch;
	    	return json;
    	};
	 	function getChemResult(test){
        	var json =[];
	      	test["chemResults"].forEach(function(item) {
	         	var jsonData = {};
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
		
		 var testId = $routeParams.tid;


		 $log.info("testSelected");
		 $log.info($routeParams);
		 var url ="/cgi/result/"+testId;
		 var testUrl = "http://localhost:9000/getTestById/"

		 $http.get(testUrl).then(onGetSingleTestComplete, onError);
	};
	app.controller("SingleTestController", SingleTestController);
})();