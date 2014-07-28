// var init1stMatchGrid = function (data ) { 

//     // var data = getChemResults(data);
//     var source =
//     {
//          localdata: data,
//          datatype: "json",
//          datafields: [
//          { name: 'element' },
//          { name: 'percent' },
//          { name: 'error' } ,
//          { name: 'min' } ,
//          { name: 'max' } 

//          ]//, url: 'http://localhost:9000/getChemResults?tid=4'

//     };
//     var dataAdapter = new $.jqx.dataAdapter(source, { async: false, loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });
//     $("#jqxGrid1st").jqxGrid(
//     {
//         width: '100%',
//         autorowheight: true,
//         autoheight: true,
//         theme: 'Arctic',

//         source: dataAdapter,
//         columns: [
//         { text: 'Element', datafield: 'element',  width: 250 },
//         { text: 'Value', datafield: 'percent', width: 150 },
//         { text: 'Min', datafield: 'min', width: 150 },
//         { text: 'Max', datafield: 'max', width: 150 },
//         { text: 'Error', datafield: 'error' }
//         ]
//     });
// }

// var init2ndMatchGrid = function () {
//     var source =
//     {
//      datatype: "json",
//      datafields: [
//      { name: 'element' },
//      { name: 'short' },
//      { name: 'value' },
//      { name: 'min' },
//      {name:'max'},
//      {name: 'error'}
//      ],
//      url :'http://localhost:9000/getSingleTest'
//  };
//  var dataAdapter = new $.jqx.dataAdapter(source, { async: false, loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });
//  $("#jqxGrid2nd").jqxGrid(
//  {
//     width: '100%',
//     height: '84%',
//     theme: 'Arctic',

//     source: dataAdapter,
//     columns: [
//     { text: 'Element', datafield: 'element',  width: 250 },
//     { text: 'Value', datafield: 'value', width: 150 },
//     { text: 'Min', datafield: 'min' },
//     { text: 'Max', datafield: 'max' },
//     { text: 'Error', datafield: 'error' }
//     ]
// });
// }


// var getChemResults = function ( ) { 
//       var url = 'http://localhost:9000/getChemResults';
//   $.getJSON( url, {
//     tags: "mount rainier",
//     tagmode: "any",
//     format: "json"
//   })
//     .done(function( data ) {
//           console.log("getJSON");

//           console.log(data);
//           init1stMatchGrid( data);
//     });
// }



