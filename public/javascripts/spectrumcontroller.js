(function() {
    var app = angular.module("libz-app");

    var SpectrumController = function($scope, $http, $log, $routeParams) {
        // console.log("SpectrumController");
        // console.log($scope.spectrumIds);

        $scope.zoomOut =function(){
            $log.info("zoomOut");
                        event.preventDefault();
                        plot.zoomOut();
        };

        var onGetSpecsComplete = function(response) {
            $log.info("onGetTestsComplete");
            $scope.csv = response.data;
           // $log.info($scope.csv);
            $scope.showChart($scope.csv);


        };

        var onError = function(reason) {
            $log.error("error");

            $scope.error = "Unable to fetch specs";
        };

        $scope.showChart = function(csv) {

            $log.info('showChart');
            var container = $("#placeholder");

            var pixles = $.csv.toArrays(csv);
            
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
            yaxis: {
                ticks: 10
            },
            selection: {
                mode: "xy"
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
                ticks: 4
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


        var yaxisLabel = $("<div class='axisLabel yaxisLabel'></div>")
            .text("intensity")
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
            });
        };
        
        var url= "/cgi/spectrum/" + $routeParams.tid;
        $http.get(url).then(onGetSpecsComplete, onError);

    };
    app.controller("SpectrumController", SpectrumController);

})();