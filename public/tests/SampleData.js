
var CalibrationsSampleData = function() {

    var cals = [];
    var getCals=function(){
        return cals;
    };
    var setCals = function(newCals){
        cals =newCals;
    };

    return {
       
        getCals: getCals,
        setCals: setCals
    };
};