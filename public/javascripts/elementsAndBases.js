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






    var bases = ["NONE", "Ag", "Al", "Au", "Babbit", "Bi", "ChromeMoly", "Cr", "Co", "Cu", "Fe", "Hf", "LowAlloy", "Mg", "Mn", "Mo", "Ni" , "Pb", "Pd", "Re", "Sb", "Se", "Sn", "Solder", "Stainless",
     "Ta", "Ti", "ToolSteel", "V", "W", "Zr", "Nb", "Zn"];

 

    var addShortNameAndBase = function(assays) {
        $(assays).each(function(index, item) {


            item['shortName'] = item['name'].substring(item['name'].indexOf("_") + 1);

            var short = item['name'].substring(0, item['name'].indexOf("_"));
          
           
            item['base'] = short!=""?short:"NONE";

  
        });
        return assays;
    };

    return {
        bases: bases,
        elements: elements,
        addShortNameAndBase: addShortNameAndBase
    };

}

