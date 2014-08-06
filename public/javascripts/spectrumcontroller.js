(function() {
    var app = angular.module("libz-app");

    var SpectrumController = function($scope, $http, $log, $routeParams) {
        // console.log("SpectrumController");
        // console.log($scope.spectrumIds);

             var getMinMaxVals = function(vals){
                var minXVal = Number.MAX_VALUE;
                var maxXVal = 0;
                var minYVal =Number.MAX_VALUE;
                var maxYVal = 0;
                $(vals).each(function(index, val) {

                    minXVal = parseFloat(val[0]) < minXVal ? parseFloat(val[0]) : minXVal;
                    minYVal = parseFloat(val[1]) < minYVal ? parseFloat(val[1]) : minYVal;
                    maxXVal = parseFloat(val[0]) > maxXVal ? parseFloat(val[0]) : maxXVal;
                    maxYVal = parseFloat(val[1]) > maxYVal ? parseFloat(val[1]) : maxYVal;
                });
                minYVal -= 50;
                maxYVal +=300;
                
                $log.info(minXVal);
                $log.info(maxXVal);
                $log.info(minYVal);
                $log.info(maxYVal);

                return [minXVal,maxXVal,minYVal,maxYVal];
            };



        
        $scope.zoomOut =function(){
            $log.info("zoomOut");
                        event.preventDefault();
                        plot.zoomOut();
        };
        $scope.zoomIn =function(){
            $log.info("zoomIn");
                        event.preventDefault();
                        plot.zoom();
        };

        var onGetSpecsComplete = function(response) {
            $log.info("onGetTestsComplete"); 

            var pixles = $.csv.toArrays(response.data);

 
            $scope.minMax = getMinMaxVals(pixles);

            $log.info($scope.minMax); 



            $scope.showChart(pixles);


        };

        var onError = function(reason) {
            $log.error("error");

            $scope.error = "Unable to fetch specs";
        };

        $scope.showChart = function(pixles) {

            $log.info('showChart');
            var container = $("#placeholder");



            
            function getData(x1, x2) {

            return [
                { label: $routeParams.ttitle, data: pixles }
            ];
        }

        var options = {
            legend: {
                show: true
            },
            series: {
                lines: {
                    show: true,
                    lineWidth: 0.3
                },
                points: {
                    show: false
                },
                color: '#670089'
            },
            xaxis: {
                 panRange: [$scope.minMax[0], $scope.minMax[1]],
                zoomRange: [10, $scope.minMax[1]]


            },
            yaxis: {
                ticks: 10,
                panRange: [$scope.minMax[2], $scope.minMax[3]],
                zoomRange: [10, $scope.minMax[3]]

            },
            zoom: {
                interactive: true
            },
            pan: {
                interactive: true
            },
            grid: {
                color: "#999",
                margin: {
                            top: 20,
                            left: 30,
                            bottom:20
                    }
            }
        };

        var startData = getData(0, 3 * Math.PI);

        plot = $.plot(container, startData, options);

        // Create the overview plot

        var overview = $.plot("#overview", startData, {
            legend: {
                show: false
            },
            series: {
                lines: {
                    show: true,
                    lineWidth: 0.3
                },
                color: '#670089',
                shadowSize: 0
            },
            xaxis: {
                ticks: 4,
                min: $scope.minMax[0],
                max: $scope.minMax[1],
            },
            yaxis: {
                ticks: 3
            },
            grid: {
                color: "#999",
        
            },
            selection: {
                mode: "xy"
            }
        });

        container.bind("plotzoom", function (event, plot) {
                var axes =plot.getAxes();
            var ranges = { xaxis: { from: axes.xaxis.min, to: axes.xaxis.max }, yaxis: { from: axes.yaxis.min, to: axes.yaxis.max } };
            overview.setSelection(ranges, true);
        });

        container.bind("plotpan", function (event, plot) {
            var axes =plot.getAxes();
            var ranges = { xaxis: { from: axes.xaxis.min, to: axes.xaxis.max }, yaxis: { from: axes.yaxis.min, to: axes.yaxis.max } };
            overview.setSelection(ranges, true);
        });

        var yaxisLabel = $("<div class='axisLabel yaxisLabel'></div>")
            .text("Intensity")
            .appendTo(container);

        // Since CSS transforms use the top-left corner of the label as the transform origin,
        // we need to center the y-axis label by shifting it down by half its width.
        // Subtract 20 to factor the chart's bottom margin into the centering.

        yaxisLabel.css("margin-top", yaxisLabel.width() / 2 - 20);
        // now connect the two

        container.bind("plotselected", function (event, ranges) {

            // clamp the zooming to prevent eternal zoom

            if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
                ranges.xaxis.to = ranges.xaxis.from + 0.00001;
            }

            if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
                ranges.yaxis.to = ranges.yaxis.from + 0.00001;
            }

            // do the zooming

            plot = $.plot(container, getData(ranges.xaxis.from, ranges.xaxis.to),
                $.extend(true, {}, options, {
                    xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
                    yaxis: { min: ranges.yaxis.from, max: ranges.yaxis.to }
                })
            );

            // don't fire event on the overview to prevent eternal loop

            overview.setSelection(ranges, true);
        });


     

            $("#overview").bind("plotselected", function (event, ranges) {
                plot.setSelection(ranges);
                var yaxisLabel = $("<div class='axisLabel yaxisLabel'></div>")
                .text("Intensity")
                .appendTo(container);
                });
        };
        
        var url= "/cgi/spectrum/" + $routeParams.tid;
        $http.get(url).then(onGetSpecsComplete, onError);

    };
    app.controller("SpectrumController", SpectrumController);

})();