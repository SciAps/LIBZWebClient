//--- CODE --------------------------
(function (angular) {
    // Create module
    var myApp = angular.module('libz-app', []);

    // Controller which counts changes to its "name" member
    // myApp.controller('CalibrationsController', ['$scope', function ($scope) {
    //     $scope.name = 'Superhero';
    //     $scope.counter = 0;
    //     $scope.$watch('name', function (newValue, oldValue) {
    //         $scope.counter = $scope.counter + 1;
    //     });
    // }]);

    // Controller with dependencies on Angular's $http service and promises
    // myApp.controller('CalibrationsController', function ($scope, $http, $log, $location, $routeParams) {
    //     // Returns a promise which is resolved if http calls succeeds,
    //     // otherwise the promise is rejected
    //     $scope.getHttp = function () {

    //         var defer = $q.defer();

    //         // Perform the actual HTTP call with query parameters
    //         // e.g. GET <server url>/someUrl?key=value1
    //         $http({
    //             method: 'GET',
    //             url: '/someUrl',
    //             headers: {
    //                 'Accept-Language': 'en'
    //             },
    //             params: {
    //                 key1: "value1"
    //             }
    //         }).
    //         success(function (data, status, headers, config) {
    //             // this callback will be called asynchronously
    //             // when the response is available
    //             defer.resolve(data);
    //         }).
    //         error(function (data, status, headers, config) {
    //             // called asynchronously if an error occurs
    //             // or server returns response with an error status.
    //             defer.reject();
    //         });

    //         return defer.promise;
    //     };
    // });
})(angular);
