

describe("Ajax Tests", function() {
  describe("calibrations should be empty at first", function() {

  var responce;
    var configuration = {
        url : "http://localhost:9000/cgi/assays",
        remainingCallTime : 3000 
    };
    beforeEach(function(done) {

        $.ajax({
            url: configuration.url,
            dataType: "json",
            success: function(res){
                  responce = res;
                  done();
                 },
            error: function(res) {
                   responce = res;
                   done();

            },
            timeout: configuration.remainingCallTime
        });
      });

    it("should get a 0 length array", function() {


        expect(responce.length).toEqual(0);
    });

});

 describe("should be able to add a calibration", function() {
      var data = {"items":[{
            "name": "BB-Al_3562",
            "spec": [{
                "element": "Silicon",
                "percent": 7.17,
                "error": 0
            }
          
            , 
            {
                "element": "Zirconium",
                "percent": 0.0007,
                "error": 0
            }]
        },{
            "name": "BB-Al_35623",
            "spec": [{
                "element": "Silicon",
                "percent": 7.17,
                "error": 0
            }
          
            , 
            {
                "element": "Zirconium",
                "percent": 0.0007,
                "error": 0
            }]
        }]}



      var responce;
      var configuration = {
          url : "http://localhost:9000/cgi/saveassays/json",
          remainingCallTime : 3000 
      };
      
     // console.log(data["items"]);

      beforeEach(function(done) {
          $.ajax({
              url: configuration.url,
              type: "POST",
              dataType: "json",
              contentType: 'application/json',
              data: JSON.stringify(data["items"]),
              success: function(res){
                    responce = res;
                    //length =responce.data.length;
                    done();
                   },
              error: function(res) {
                   responce = res;
                   done();


               },
              timeout: configuration.remainingCallTime
          });
        });

      it("should make an Ajax post and return a 200", function(done) { 
                 
          expect(responce.status).toEqual(200);  done();
      });



  });

         var configuration = {
              url : "http://localhost:9000/cgi/assays",
              remainingCallTime : 3000 
          };
          beforeEach(function(done) {
              $.ajax({
                  url: configuration.url,
                  dataType: "json",
                  success: function(res){
                        responce = res;
                        //length =responce.data.length;
                        done();
                       },
                  error: function(res) {
                         responce = res;
                         done();

                  },
                  timeout: configuration.remainingCallTime
              });
            });

          it("now it should get a > 0 length array", function() {


              expect(responce.length).toBeGreaterThan(0);
        });
});

describe("Controller Tests", function() {
    var scope,
    controller;
    beforeEach(function () {
        module('libz-app');
    });

    describe('Calibrations Controller', function () {
        beforeEach(inject(function ($rootScope, $controller, $http, $log, $location) {
            scope = $rootScope.$new();
            console.log(scope);
            $log.info("scope");
            $log.info(scope);
            controller = $controller('CalibrationsController', {
                '$scope': scope,
                '$http': $http,
                '$log': $log,
                '$location': $location,
                '$routeParams': {}
            });
                        scope.startTest(123);
        }));
        it('sets the name', function () {

            expect(scope.memem).toEqual(123);

           // expect(scope.rawAssays).toBeDefined();
            //expect(scope).toBeDefined();
        });
 
    });


});

