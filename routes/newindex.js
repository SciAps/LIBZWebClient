var express = require('express');
var router = express.Router();

// /* GET home page. */
router.get('/libz', function(req, res) {
  res.render('libz', { title: 'Z Reporter' ,
    'age':32

  });
});
router.get('/', function(req, res) {
  res.render('libz', { title: 'Z Reporter'  

  });
});
router.get('/home', function(req, res) {
  res.render('home', { title: 'Z Reporter' ,
    'age':32

  });
});
router.get('/ztest', function(req, res) {
  console.log("Params");
  console.log(req.query);

    // var builder =new gridBuilder();
    // var test = builder.getSampleTest();
    // test["name"] = req.query.tname;
    // test["id"] = req.query.tid;
    //     console.log(test);

  res.render('test',req.query);
});

router.get('/tests', function(req, res) {
  res.render('testsgrid', { title: 'Tests' ,
    'age':32

  });
}); 
router.get('/examples', function(req, res) {
  res.render('flexgrid', { title: 'Tests' ,
    'age':32

  });
}); 

// //example of get
// router.get('/', function(req, res) {

// 	console.log(req.query);
//   //res.render('index',{});
//   // res.send({
//   // 	users: ['sean','weiss']
//   // });
// });

// //example of get
router.get('/getAllTests/:start', function(req, res) {
    console.log("getAllTests");
            console.log(req.query.start);
          var builder =new gridBuilder();
          var tests1 = builder.getSampleTests(req.query.start);
          
          //var start = req.query.start;

          res.send(tests1["items"],200);
});

//router.use(express.bodyParser());

router.post('/getCsvForTests', function(request, response){

   var csv ='185.038, 0.0\n185.07133333333334, 1.8818914201031993';

          console.log("getCsvForTests");
          console.log(request.body);
          response.send(csv,200);


});


router.get('/getTestById', function(req, res) {
         
          
          // test["name"] = req.query.tname;
          // test["id"] = req.query.tid;
          console.log(gridBuilder.getSampleTest);
          res.send(gridBuilder().getSampleTest(),200);
});

router.get('/getChemResults', function(req, res) {

  //console.log("getSingleTest");
    //console.log(req.query);
       // var data = getChemResults();
 
          var builder =new gridBuilder();
          var chemResults = builder.getSampleChemResult();
          console.log(chemResults);

           res.send(chemResults,200);
});

 router.get('/getCompareCSV', function(req, res) {

 

          res.send(testsJson["items"],200);
});

var test = {
  "mResult":{
   "id": "12342",
   // "title": "sample test",
   // "date": "1/1/2000",
   "base": "Al",
   "chemResults": [
   {
     "curve": {
       "curveFunction": {
         "coefficients": [
         0,
         29.465181428067122
         ]
       },
       "numeratorLines": [
       {
         "min": 324,
         "max": 324.37
       },
       {
         "min": 326.99,
         "max": 327.68
       }
       ],
       "denominatorLines": [
       {
         "min": 394,
         "max": 394.77
       }
       ],
       "element": "Copper",
       "excludedAssays": [],
       "degree": 1,
       "error": 0.9836931824435716,
       "forceZero": true
     },
     "element": "Copper",
     "dem": 1,
     "error": 2.176069939272741,
     "num": 0.35541073515595745,
     "percent": 10.369824312731465
   },
   {
     "curve": {
       "curveFunction": {
         "coefficients": [
         0,
         6.8419507240640005
         ]
       },
       "numeratorLines": [
       {
         "min": 279.37,
         "max": 279.73
       }
       ],
       "denominatorLines": [
       {
         "min": 394,
         "max": 394.77
       }
       ],
       "element": "Magnesium",
       "excludedAssays": [],
       "degree": 1,
       "error": 0.808921339535772,
       "forceZero": true
     },
     "element": "Magnesium",
     "dem": 1,
     "error": 0.13032388884373877,
     "num": 0.039494127429844664,
     "percent": 0.26757417969378045
   },
   {
     "curve": {
       "curveFunction": {
         "coefficients": [
         -0.2590126227297424,
         87.41568408615176
         ]
       },
       "numeratorLines": [
       {
         "min": 251.12,
         "max": 251.74
       },
       {
         "min": 287.97,
         "max": 288.28
       }
       ],
       "denominatorLines": [
       {
         "min": 394,
         "max": 394.77
       }
       ],
       "element": "Silicon",
       "excludedAssays": [],
       "degree": 1,
       "error": 0.9847707862952392,
       "forceZero": false
     },
     "element": "Silicon",
     "dem": 1,
     "error": 3.7046685339242247,
     "num": 0.09430602309957209,
     "percent": 7.906722226292138
   },
   {
     "curve": {
       "curveFunction": {
         "coefficients": [
         0,
         8.482630739136976
         ]
       },
       "numeratorLines": [
       {
         "min": 334.71,
         "max": 335.15
       },
       {
         "min": 337.05,
         "max": 337.42
       }
       ],
       "denominatorLines": [
       {
         "min": 394,
         "max": 394.77
       }
       ],
       "element": "Titanium",
       "excludedAssays": [],
       "degree": 1,
       "error": -1.2253774454960684,
       "forceZero": true
     },
     "element": "Titanium",
     "dem": 1,
     "error": 0.07805081503321382,
     "num": 0.030270763142290824,
     "percent": 0.25426446513749035
   },
   {
     "curve": {
       "curveFunction": {
         "coefficients": [
         0,
         -43.81765214732496
         ]
       },
       "numeratorLines": [
       {
         "min": 357.73,
         "max": 358.03
       },
       {
         "min": 359.13,
         "max": 359.42
       }
       ],
       "denominatorLines": [
       {
         "min": 394,
         "max": 394.77
       }
       ],
       "element": "Chromium",
       "excludedAssays": [],
       "degree": 1,
       "error": -0.18457658561533652,
       "forceZero": true
     },
     "element": "Chromium",
     "dem": 1,
     "error": 0.1645545368868567,
     "num": -0.0028191083535319293,
     "percent": 0.12231863030656272
   },
   {
     "curve": {
       "curveFunction": {
         "coefficients": [
         -0.17474780914760418,
         60.74193446062022
         ]
       },
       "numeratorLines": [
       {
         "min": 402.79,
         "max": 403.63
       }
       ],
       "denominatorLines": [
       {
         "min": 394,
         "max": 394.77
       }
       ],
       "element": "Manganese",
       "excludedAssays": [],
       "degree": 1,
       "error": 0.6757219880649044,
       "forceZero": false
     },
     "element": "Manganese",
     "dem": 1,
     "error": 2.6284260295735455,
     "num": 0.06234099271468125,
     "percent": 3.576640030218491
   },
   {
     "curve": {
       "curveFunction": {
         "coefficients": [
         0,
         119.09345537849897
         ]
       },
       "numeratorLines": [
       {
         "min": 371.76,
         "max": 372.04
       }
       ],
       "denominatorLines": [
       {
         "min": 394,
         "max": 394.77
       }
       ],
       "element": "Iron",
       "excludedAssays": [],
       "degree": 1,
       "error": -3.2489993905983816,
       "forceZero": true
     },
     "element": "Iron",
     "dem": 1,
     "error": 0.9083485209189692,
     "num": -0.019017173615605572,
     "percent": -2.24267119476025
   },
   {
     "curve": {
       "curveFunction": {
         "coefficients": [
         0,
         3.8404734372697598
         ]
       },
       "numeratorLines": [
       {
         "min": 341.15,
         "max": 341.82
       }
       ],
       "denominatorLines": [
       {
         "min": 394,
         "max": 394.77
       }
       ],
       "element": "Nickel",
       "excludedAssays": [],
       "degree": 1,
       "error": -3.8603509876026116,
       "forceZero": true
     },
     "element": "Nickel",
     "dem": 1,
     "error": 0.16071881546163397,
     "num": 0.004141381131036393,
     "percent": 0.015749316241731925
   },
   {
     "curve": {
       "curveFunction": {
         "coefficients": [
         0.7131821121887054,
         25.09838569288534
         ]
       },
       "numeratorLines": [
       {
         "min": 334.09,
         "max": 334.71
       },
       {
         "min": 480.69,
         "max": 481.62
       }
       ],
       "denominatorLines": [
       {
         "min": 394,
         "max": 394.77
       }
       ],
       "element": "Zinc",
       "excludedAssays": [],
       "degree": 1,
       "error": 0.9798497793478997,
       "forceZero": false
     },
     "element": "Zinc",
     "dem": 1,
     "error": 2.067802532918264,
     "num": 0.005380244410749496,
     "percent": 0.8399220783901311
   },
   {
     "element": "Aluminum",
     "dem": 0,
     "error": 8.717539206647462,
     "num": 0,
     "percent": 76.6469847609882
   }
   ],
   "gradeRanks": [
   {
     "grade": {
       "comments": "",
       "uns": "A0333",
       "name": "Al_333",
       "spec": {
         "Magnesium": {
           "min": 0.05,
           "max": 0.5
         },
         "Aluminum": {
           "min": 80.25,
           "max": 88.9
         },
         "Silicon": {
           "min": 8,
           "max": 10
         },
         "Titanium": {
           "min": 0,
           "max": 0.25
         },
         "Manganese": {
           "min": 0.05,
           "max": 0.5
         },
         "Iron": {
           "min": 0,
           "max": 1
         },
         "Nickel": {
           "min": 0,
           "max": 0.5
         },
         "Copper": {
           "min": 3,
           "max": 4
         },
         "Zinc": {
           "min": 0,
           "max": 3
         }
       },
       "enabled": true
     },
     "matchNumber": 89.88684139520868
   },
   {
     "grade": {
       "comments": "",
       "uns": "A0380",
       "name": "Al_380",
       "spec": {
         "Magnesium": {
           "min": 0,
           "max": 0.1
         },
         "Aluminum": {
           "min": 80.15,
           "max": 89.5
         },
         "Silicon": {
           "min": 7.5,
           "max": 9.5
         },
         "Titanium": {
           "min": 0,
           "max": 0.25
         },
         "Manganese": {
           "min": 0,
           "max": 0.5
         },
         "Iron": {
           "min": 0,
           "max": 2
         },
         "Nickel": {
           "min": 0,
           "max": 0.5
         },
         "Copper": {
           "min": 3,
           "max": 4
         },
         "Zinc": {
           "min": 0,
           "max": 3
         }
       },
       "enabled": true
     },
     "matchNumber": 88.24347083133813
   },
   {
     "grade": {
       "comments": "",
       "uns": "A0319",
       "name": "Al_319",
       "spec": {
         "Magnesium": {
           "min": 0,
           "max": 0.1
         },
         "Aluminum": {
           "min": 86.3,
           "max": 91.5
         },
         "Silicon": {
           "min": 5.5,
           "max": 6.5
         },
         "Titanium": {
           "min": 0,
           "max": 0.25
         },
         "Manganese": {
           "min": 0,
           "max": 0.5
         },
         "Iron": {
           "min": 0,
           "max": 1
         },
         "Nickel": {
           "min": 0,
           "max": 0.35
         },
         "Copper": {
           "min": 3,
           "max": 4
         },
         "Zinc": {
           "min": 0,
           "max": 1
         }
       },
       "enabled": true
     },
     "matchNumber": 87.0346235106759
   },
   {
     "grade": {
       "comments": "",
       "uns": " ",
       "name": "Al_2014",
       "spec": {
         "Magnesium": {
           "min": 0.2,
           "max": 0.8
         },
         "Aluminum": {
           "min": 90.6,
           "max": 95.7
         },
         "Silicon": {
           "min": 0.2,
           "max": 1.2
         },
         "Titanium": {
           "min": 0,
           "max": 0.15
         },
         "Chromium": {
           "min": 0,
           "max": 0.1
         },
         "Manganese": {
           "min": 0.4,
           "max": 1.2
         },
         "Iron": {
           "min": 0,
           "max": 0.7
         },
         "Copper": {
           "min": 3.5,
           "max": 5
         },
         "Zinc": {
           "min": 0,
           "max": 0.25
         }
       },
       "enabled": true
     },
     "matchNumber": 85.4693447596493
   },
   {
     "grade": {
       "comments": "",
       "uns": "A03550",
       "name": "Al_355",
       "spec": {
         "Magnesium": {
           "min": 0.4,
           "max": 0.6
         },
         "Aluminum": {
           "min": 90.45,
           "max": 94.1
         },
         "Silicon": {
           "min": 4.5,
           "max": 5.5
         },
         "Titanium": {
           "min": 0,
           "max": 0.25
         },
         "Chromium": {
           "min": 0,
           "max": 0.25
         },
         "Manganese": {
           "min": 0,
           "max": 0.5
         },
         "Iron": {
           "min": 0,
           "max": 0.6
         },
         "Copper": {
           "min": 1,
           "max": 1.5
         },
         "Zinc": {
           "min": 0,
           "max": 0.35
         }
       },
       "enabled": true
     },
     "matchNumber": 78.05090684062044
   },
   {
     "grade": {
       "comments": "",
       "uns": "A0356",
       "name": "Al_356",
       "spec": {
         "Magnesium": {
           "min": 0.2,
           "max": 0.45
         },
         "Aluminum": {
           "min": 89.9,
           "max": 93.3
         },
         "Silicon": {
           "min": 6.5,
           "max": 7.5
         },
         "Titanium": {
           "min": 0,
           "max": 0.25
         },
         "Manganese": {
           "min": 0,
           "max": 0.35
         },
         "Iron": {
           "min": 0,
           "max": 0.6
         },
         "Copper": {
           "min": 0,
           "max": 0.25
         },
         "Zinc": {
           "min": 0,
           "max": 0.35
         },
         "Tin": {
           "min": 0,
           "max": 0.35
         }
       },
       "enabled": true
     },
     "matchNumber": 74.53955564286566
   },
   {
     "grade": {
       "comments": "",
       "uns": "A03570",
       "name": "Al_357",
       "spec": {
         "Magnesium": {
           "min": 0.45,
           "max": 0.6
         },
         "Aluminum": {
           "min": 90.92,
           "max": 93.05
         },
         "Silicon": {
           "min": 6.5,
           "max": 7.5
         },
         "Titanium": {
           "min": 0,
           "max": 0.2
         },
         "Manganese": {
           "min": 0,
           "max": 0.03
         },
         "Iron": {
           "min": 0,
           "max": 0.15
         },
         "Copper": {
           "min": 0,
           "max": 0.2
         },
         "Zinc": {
           "min": 0,
           "max": 0.05
         },
         "Tin": {
           "min": 0,
           "max": 0.35
         }
       },
       "enabled": true
     },
     "matchNumber": 71.20234780898528
   },
   {
     "grade": {
       "comments": "",
       "uns": "A92011",
       "name": "Al_2011",
       "spec": {
         "Aluminum": {
           "min": 91.4,
           "max": 94.6
         },
         "Silicon": {
           "min": 0,
           "max": 0.4
         },
         "Iron": {
           "min": 0,
           "max": 0.7
         },
         "Copper": {
           "min": 5,
           "max": 6
         },
         "Zinc": {
           "min": 0,
           "max": 0.3
         },
         "Lead": {
           "min": 0.2,
           "max": 0.6
         },
         "Bismuth": {
           "min": 0,
           "max": 1
         }
       },
       "enabled": true
     },
     "matchNumber": 68.31804756997627
   },
   {
     "grade": {
       "comments": "",
       "uns": "A93005",
       "name": "Al_3005",
       "spec": {
         "Magnesium": {
           "min": 0.2,
           "max": 0.6
         },
         "Aluminum": {
           "min": 95.85,
           "max": 98.8
         },
         "Silicon": {
           "min": 0,
           "max": 0.6
         },
         "Titanium": {
           "min": 0,
           "max": 0.1
         },
         "Chromium": {
           "min": 0,
           "max": 0.1
         },
         "Manganese": {
           "min": 1,
           "max": 1.5
         },
         "Iron": {
           "min": 0,
           "max": 0.7
         },
         "Copper": {
           "min": 0,
           "max": 0.3
         },
         "Zinc": {
           "min": 0,
           "max": 0.25
         }
       },
       "enabled": true
     },
     "matchNumber": 65.31306369673644
   },
   {
     "grade": {
       "comments": "",
       "uns": "A93105",
       "name": "Al_3105",
       "spec": {
         "Magnesium": {
           "min": 0.2,
           "max": 0.8
         },
         "Aluminum": {
           "min": 96.2,
           "max": 99.5
         },
         "Silicon": {
           "min": 0,
           "max": 0.6
         },
         "Titanium": {
           "min": 0,
           "max": 0.1
         },
         "Chromium": {
           "min": 0,
           "max": 0.2
         },
         "Manganese": {
           "min": 0.3,
           "max": 0.7
         },
         "Iron": {
           "min": 0,
           "max": 0.7
         },
         "Copper": {
           "min": 0,
           "max": 0.3
         },
         "Zinc": {
           "min": 0,
           "max": 0.4
         }
       },
       "enabled": true
     },
     "matchNumber": 64.56099488159458
   },
   {
     "grade": {
       "comments": "",
       "uns": "A4032",
       "name": "Al_4032",
       "spec": {
         "Aluminum": {
           "min": 82.54,
           "max": 88
         },
         "Silicon": {
           "min": 11,
           "max": 13.5
         },
         "Chromium": {
           "min": 0,
           "max": 0.11
         },
         "Iron": {
           "min": 0,
           "max": 1
         },
         "Nickel": {
           "min": 0.5,
           "max": 1.3
         },
         "Copper": {
           "min": 0.5,
           "max": 1.3
         },
         "Zinc": {
           "min": 0,
           "max": 0.25
         }
       },
       "enabled": true
     },
     "matchNumber": 55.11576901467525
   }
   ]
   }
 };


var gridBuilder=function(){
  
var tests1 = {
 "items": [
 {
   "id": "1",
   "time": "Jun 30, 2014 4:31:33 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "2",
   "time": "Jun 30, 2014 4:31:04 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "3",
   "time": "Jun 30, 2014 4:10:29 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "4",
   "time": "Jun 30, 2014 3:51:23 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "5",
   "time": "Jun 30, 2014 3:41:35 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "6",
   "time": "Jun 30, 2014 3:41:04 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "7",
   "time": "Jun 30, 2014 3:39:55 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "8",
   "time": "Jun 30, 2014 3:39:32 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "9",
   "time": "Jun 30, 2014 3:05:46 PM",
   "title": "Alloy Match",
   "base": "Al",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "10",
   "time": "Jun 30, 2014 2:59:09 PM",
   "title": "Alloy Match",
   "base": "Al",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
  {
   "id": "11",
   "time": "Jun 30, 2014 4:31:33 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "12",
   "time": "Jun 30, 2014 4:31:04 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "13",
   "time": "Jun 30, 2014 4:10:29 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "14",
   "time": "Jun 30, 2014 3:51:23 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "15",
   "time": "Jun 30, 2014 3:41:35 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "16",
   "time": "Jun 30, 2014 3:41:04 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "17",
   "time": "Jun 30, 2014 3:39:55 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "18",
   "time": "Jun 30, 2014 3:39:32 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "19",
   "time": "Jun 30, 2014 3:05:46 PM",
   "title": "Alloy Match",
   "base": "Al",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "20",
   "time": "Jun 30, 2014 2:59:09 PM",
   "title": "Alloy Match",
   "base": "Al",
   "1st_match":"h2o",
   "match_no":"1.75"
 }
 ],
 "start": 0,
 "total": 100
};

var tests2 = {
 "items": [
 {
   "id": "21",
   "time": "Jun 30, 2014 4:31:33 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "22",
   "time": "Jun 30, 2014 4:31:04 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "23",
   "time": "Jun 30, 2014 4:10:29 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "24",
   "time": "Jun 30, 2014 3:51:23 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "25",
   "time": "Jun 30, 2014 3:41:35 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "26",
   "time": "Jun 30, 2014 3:41:04 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "27",
   "time": "Jun 30, 2014 3:39:55 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "28",
   "time": "Jun 30, 2014 3:39:32 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "29",
   "time": "Jun 30, 2014 3:05:46 PM",
   "title": "Alloy Match",
   "base": "Al",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "30",
   "time": "Jun 30, 2014 2:59:09 PM",
   "title": "Alloy Match",
   "base": "Al",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
  {
   "id": "31",
   "time": "Jun 30, 2014 4:31:33 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "32",
   "time": "Jun 30, 2014 4:31:04 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "33",
   "time": "Jun 30, 2014 4:10:29 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "34",
   "time": "Jun 30, 2014 3:51:23 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "35",
   "time": "Jun 30, 2014 3:41:35 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "36",
   "time": "Jun 30, 2014 3:41:04 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "37",
   "time": "Jun 30, 2014 3:39:55 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "38",
   "time": "Jun 30, 2014 3:39:32 PM",
   "title": "Alloy Match",
   "base": "Ti",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "39",
   "time": "Jun 30, 2014 3:05:46 PM",
   "title": "Alloy Match",
   "base": "Al",
   "1st_match":"h2o",
   "match_no":"1.75"
 },
 {
   "id": "40",
   "time": "Jun 30, 2014 2:59:09 PM",
   "title": "Alloy Match",
   "base": "Al",
   "1st_match":"h2o",
   "match_no":"1.75"
 }
 ],
 "start": 20,
 "total": 100
};

var getTest = function(){
 

 //moved to test controller==================
    // var json = {};
    // var firstMatch = {};
 

    //  var firstGradeRank =  test["gradeRanks"][0]["grade"];

    // json["title"]= test["title"];
    // json["id"]= test["id"];
    // json["date"]= test["date"];
    // json["base"]= test["base"];

    // firstMatch["chemResults"] = getChemResult();
    // firstMatch["comments"] = firstGradeRank["comments"];
    // firstMatch["uns"] = firstGradeRank["uns"];
    // firstMatch["name"] = firstGradeRank["name"];
    // firstMatch["matchNumber"] = test["gradeRanks"][0]["matchNumber"];

    // json["firstMatch"]=firstMatch;
    // console.log(json);
    // return json;
    //============================================
 return test;
  };
  var getChemResult = function(){

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
  var getTests = function(start){
    if (start==0) {
      return tests1;
    }else{

      return tests2;
    }


  };
  return{
    getSampleTest:getTest,
    getSampleChemResult:getChemResult,
    getSampleTests:getTests
  };


};



 module.exports = router;
