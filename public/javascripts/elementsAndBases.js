 var basesBuilder = function() {

    var elements = [
        "Actinium",
        "Aluminum",
        "Americium",
        "Antimony",
        "Argon",
        "Arsenic",
        "Astatine",
        "Barium",
        "Berkelium",
        "Beryllium",
        "Bismuth",
        "Bohrium",
        "Boron",
        "Bromine",
        "Cadmium",
        "Calcium",
        "Californium",
        "Carbon",
        "Cerium",
        "Cesium",
        "Chlorine",
        "Chromium",
        "Cobalt",
        "Copernicium",
        "Copper",
        "Curium",
        "Darmstadtium",
        "Dubnium",
        "Dysprosium",
        "Einsteinium",
        "Erbium",
        "Europium",
        "Fermium",
        "Flerovium",
        "Fluorine",
        "Francium",
        "Gadolinium",
        "Gallium",
        "Germanium",
        "Gold",
        "Hafnium",
        "Hassium",
        "Helium",
        "Holmium",
        "Hydrogen",
        "Indium",
        "Iodine",
        "Iridium",
        "Iron",
        "Krypton",
        "Lanthanum",
        "Lawrencium",
        "Lead",
        "Lithium",
        "Livermorium",
        "Lutetium",
        "Magnesium",
        "Manganese",
        "Meitnerium",
        "Mendelevium",
        "Mercury",
        "Molybdenum",
        "Neodymium",
        "Neon",
        "Neptunium",
        "Nickel",
        "Niobium",
        "Nitrogen",
        "Nobelium",
        "Osmium",
        "Oxygen",
        "Palladium",
        "Phosphorus",
        "Platinum",
        "Plutonium",
        "Polonium",
        "Potassium",
        "Praseodymium",
        "Promethium",
        "Protactinium",
        "Radium",
        "Radon",
        "Rhenium",
        "Rhodium",
        "Roentgenium",
        "Rubidium",
        "Ruthenium",
        "Rutherfordium",
        "Samarium",
        "Seaborgium",
        "Selenium",
        "Scandium",
        "Silicon",
        "Silver",
        "Sodium",
        "Strontium",
        "Sulfur",
        "Tantalum",
        "Technetium",
        "Tellurium",
        "Terbium",
        "Thallium",
        "Thorium",
        "Thulium",
        "Tin",
        "Titanium",
        "Tungsten",
        "Ununoctium",
        "Ununpentium",
        "Ununseptium",
        "Ununtrium",
        "Uranium",
        "Vanadium",
        "Xenon",
        "Ytterbium",
        "Yttrium",
        "Zinc",
        "Zirconium"
    ];







    var addShortNameAndBase = function(data) {
        $(data).each(function(index, item) {
            var longbase  = item['name'].substring(0, item['name'].indexOf("_"));

            var dashindex =  longbase.indexOf("-");

            item['calibrationName'] = dashindex!=-1?longbase.substring(0,dashindex):"";
            // if (dashindex==-1) {
            //     dashindex = 0;
            // };
            item['base'] = longbase.substring(dashindex+1,item['name'].indexOf("_"));

            //item['base'] = short!=""?short:"NONE";


            item['shortName'] = item['name'].substring(item['name'].indexOf("_") + 1);

            // var short = item['name'].substring(0, item['name'].indexOf("_"));
          
           
            // item['base'] = short!=""?short:"NONE";

  
        });
        return data;
    };

    var getCalibrations = function(data){
        var retval =[];
        var assays = addShortNameAndBase(data);
        var exists = false;
        $(assays).each(function(index, item) {
            exists = false;

            if (item['calibrationName'].length>0) {
                $(retval).each(function(index, retitem) {
                    if (retitem["name"] == item['calibrationName']&&retitem["base"] == item['base']) {
                        exists = true;
                    };
                });
                if (!exists) {
                    retval.push({'name':item['calibrationName'],'base':item['base']});
                };
                
            };
        });
        setExistingBases(assays);
        return retval;
 
    };

    var getAssays = function(data,calibrationName,base){
        var retval =[];
        var assays = addShortNameAndBase(data);
        var exists = false;
        $(assays).each(function(index, item) {
            exists = false;

            if (item['calibrationName']==calibrationName && item["base"] == base) {
                
                    retval.push(item);
           
                
            };
        });
        return retval;
 
    };

    var getAssaysByBaseForDropDown =function(data,existingAssays,base){
        var retval =[];
        var assays = addShortNameAndBase(data);
        var exists = false;
        $(assays).each(function(index, item) {
            if (item['calibrationName'].length==0&&item['base'] == base) {
                exists = false;
                 $(existingAssays).each(function(index, existingItem) {
                    if (item['shortName']==existingItem["shortName"]) {
                                        exists = true;

                    };
                 });
               //  if (!exists) {
                     retval.push(item);
               //  };
                   
            };
        });

        return retval;
    };

    var bases = [];
    
    var getExistingBases= function () {
        
          
        return bases;
    }
    var setExistingBases= function (raw_calibrations) {
        bases.length =0;
        
        var basesHash= new HashSet();
   
        $(raw_calibrations).each(function(i,item){
 

                    basesHash.add(item["base"]);
   

        });

                    bases =basesHash.values();

                      bases.sort(); 
                      bases.unshift("NONE");
    }

    return {
        getExistingBases: getExistingBases,
        setExistingBases: setExistingBases,
        elements: elements,
        addShortNameAndBase: addShortNameAndBase,
        getCalibrations: getCalibrations,
        getAssays:getAssays,
        getAssaysByBaseForDropDown:getAssaysByBaseForDropDown
    };

}

