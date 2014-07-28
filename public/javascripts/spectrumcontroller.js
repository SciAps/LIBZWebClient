(function() {
  var app = angular.module("libz-app");

  var SpectrumController = function($scope, $http,$log) {
  // console.log("SpectrumController");
  // console.log($scope.spectrumIds);
         


  var onGetSpecsComplete = function(response) {
    $log.info("onGetTestsComplete");
    $scope.csv =  response.data;
    $log.info($scope.csv );


  }; 

  var onError = function(reason) {
   $log.error("error");

   $scope.error = "Unable to fetch specs";
 };

  $scope.$watch(
                    "singleTest",
                    function( newValue, oldValue ) {
                      
                        if ($scope.singleTest) {
                          $log.info("singleTest");

                          $log.info($scope.singleTest );
                          $scope.showChart();
                    // $http.get("http://localhost:9000/sampledata/Alloy.csv")
                    //       .then(onGetSpecsComplete, onError);
                     
                        };
  
                    }
                );


 $scope.showChart =function() {

  var source =
  {
    datatype: "csv",
    datafields: [
    { name: 'wavelength' },
    { name: 'intensity' } 
    ],
    url: '../sampledata/Alloy.csv'
  };
  var dataAdapter = new $.jqx.dataAdapter(source, { async: false, autoBind: true, loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });
  var toolTipCustomFormatFn = function (value, itemIndex, serie, group, categoryValue, categoryAxis) {
    return 'Index: ' + itemIndex + ", Value: " + value;
  };
            // prepare jqxChart settings
            var settings = {
              title: "Spectrum result for "+$scope.singleTest["title"],
              description: "",
              enableAnimations: true,
              showLegend: true,
              animationDuration: 1500,
              enableCrosshairs: true,
              padding: { left: 5, top: 5, right: 20, bottom: 5 },
              colorScheme: 'scheme04',
              source: dataAdapter,

              xAxis:
              {
                dataField: 'wavelength',
                description: 'wavelength',

                type: 'float',
                baseUnit: 'float',
                type: 'float',
                showTickMarks: true,
                tickMarksColor: '#888888',
                minValue: 300,
                maxValue: 600,
                flip: false,
                valuesOnTicks: true,
                showGridLines: false,
                textRotationAngle: 45,
                textRotationPoint: 'topright',
                textOffset: {x: 5, y: 8},
                rangeSelector: {
                  serieType: 'area',
                  padding: { /*left: 0, right: 0,*/ top: 30, bottom: 0 },
                            // Uncomment the line below to render the selector in a separate container
                            renderTo: $('#selectorContainer'),
                            backgroundColor: 'white',
                            size: 180,
                            showGridLines: false,
                          }
                        },
                        seriesGroups:
                        [
                        {
                          type: 'line',
                          toolTipFormatFunction: toolTipCustomFormatFn,
                          valueAxis:
                          {
                            flip: false,
                            description: 'intensity',
                            tickMarksColor: '#888888',
                            displayValueAxis: true

                          },
                          series: [

                          { dataField: 'intensity', displayText: $scope.singleTest["title"], lineWidth: 1, lineWidthSelected: 1 }
                          ]
                        }
                        ]
                      };

                      $('#chartContainer').jqxChart(settings);
                    };

                  };
    app.controller("SpectrumController", SpectrumController);

                })();