var wms_layers = [];


        var lyr_GoogleSatellite_0 = new ol.layer.Tile({
            'title': 'Google Satellite',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            })
        });

        var lyr_OSMStandard_1 = new ol.layer.Tile({
            'title': 'OSM Standard',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_Trees_2 = new ol.format.GeoJSON();
var features_Trees_2 = format_Trees_2.readFeatures(json_Trees_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Trees_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Trees_2.addFeatures(features_Trees_2);
var lyr_Trees_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Trees_2, 
                style: style_Trees_2,
                popuplayertitle: "Trees",
                interactive: true,
                title: '<img src="styles/legend/Trees_2.png" /> Trees'
            });

            jsonSource_Trees_2.on('addfeature', function() {
                var totalFeatures = jsonSource_Trees_2.getFeatures().length;
                const totaltrees=totalFeatures;
                
                document.getElementById('notrees').innerText =totalFeatures;
            });               

lyr_GoogleSatellite_0.setVisible(true);lyr_OSMStandard_1.setVisible(true);lyr_Trees_2.setVisible(true);
var layersList = [lyr_GoogleSatellite_0,lyr_OSMStandard_1,lyr_Trees_2];
lyr_Trees_2.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'English_Name_Konkani_Name_Scientific_Name_': 'English_Name_Konkani_Name_Scientific_Name_', 'English_Name': 'English Name', 'Konkani_Name': 'Konkani Name', 'Botanical_Name': 'Botanical Name', 'Photo_of_the_tree': 'Photo_of_the_tree', 'Date_of_the_photo': 'Date_of_the_photo', 'Record_your_current_location': 'Record_your_current_location', '_Record_your_current_location_latitude': 'Latitude', '_Record_your_current_location_longitude': 'Longitude', '_Record_your_current_location_altitude': '_Record_your_current_location_altitude', '_Record_your_current_location_precision': '_Record_your_current_location_precision', 'Date_of_Plantation': 'Date_of_Plantation', 'Tree_height_of_the_tree_at_time_of_plantation_in_meters_': 'Tree height(m) at time of plantation', 'Presence_of_tree_guard': 'Presence_of_tree_guard', '_uuid': '_uuid', 'Date_': 'Planted on', 'Tree_Guard': 'Tree Guard', 'Photo': 'Photo', });
lyr_Trees_2.set('fieldImages', {'OBJECTID': 'TextEdit', 'English_Name_Konkani_Name_Scientific_Name_': 'TextEdit', 'English_Name': 'TextEdit', 'Konkani_Name': 'TextEdit', 'Botanical_Name': 'TextEdit', 'Photo_of_the_tree': 'TextEdit', 'Date_of_the_photo': 'DateTime', 'Record_your_current_location': 'TextEdit', '_Record_your_current_location_latitude': 'TextEdit', '_Record_your_current_location_longitude': 'TextEdit', '_Record_your_current_location_altitude': 'TextEdit', '_Record_your_current_location_precision': 'TextEdit', 'Date_of_Plantation': 'DateTime', 'Tree_height_of_the_tree_at_time_of_plantation_in_meters_': 'TextEdit', 'Presence_of_tree_guard': 'Range', '_uuid': 'TextEdit', 'Date_': 'TextEdit', 'Tree_Guard': 'TextEdit', 'Photo': 'ExternalResource', });
lyr_Trees_2.set('fieldLabels', {'OBJECTID': 'hidden field', 'English_Name_Konkani_Name_Scientific_Name_': 'hidden field', 'English_Name': 'inline label - visible with data', 'Konkani_Name': 'inline label - visible with data', 'Botanical_Name': 'inline label - visible with data', 'Photo_of_the_tree': 'hidden field', 'Date_of_the_photo': 'hidden field', 'Record_your_current_location': 'hidden field', '_Record_your_current_location_latitude': 'inline label - visible with data', '_Record_your_current_location_longitude': 'inline label - visible with data', '_Record_your_current_location_altitude': 'hidden field', '_Record_your_current_location_precision': 'hidden field', 'Date_of_Plantation': 'hidden field', 'Tree_height_of_the_tree_at_time_of_plantation_in_meters_': 'inline label - visible with data', 'Presence_of_tree_guard': 'hidden field', '_uuid': 'hidden field', 'Date_': 'inline label - visible with data', 'Tree_Guard': 'inline label - visible with data', 'Photo': 'inline label - visible with data', });
lyr_Trees_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
// Extract and prepare data
var fieldCounts = {};

features_Trees_2.forEach(function(feature) {
    var englishName = feature.get('English_Name') || '';
    var konkaniName = feature.get('Konkani_Name') || '';

    // Combine English_Name and Konkani_Name
    var fieldValue = englishName;
    if (englishName && konkaniName) {
        fieldValue += ' / ' + konkaniName;
    } else if (konkaniName) {
        fieldValue = konkaniName;
    }

    // Count occurrences of fieldValue
    if (fieldValue) {
        if (fieldCounts[fieldValue]) {
            fieldCounts[fieldValue]++;
        } else {
            fieldCounts[fieldValue] = 1;
        }
    }
});

// Prepare the data for Chart.js
var labels = Object.keys(fieldCounts);
var data = Object.values(fieldCounts);

var ctx = document.getElementById('myPieChart').getContext('2d');
var isMobileView = window.matchMedia("(max-width: 600px)").matches;

var options = {
   plugins: {
       legend: {
           display: false
       },
       tooltip: {
           enabled: true,
           position: 'nearest', // To allow tooltips to go outside the canvas boundary
           callbacks: {
               label: function(context) {
                   var label = context.label || '';
                   if (label) {
                       var value = context.parsed || 0;
                       return value + ':' + label;
                   }
                   return '';
               }
           },
           bodyFont: {
               size: isMobileView ? 8 : 12 // Set font size based on view
           }
       }
   }
};

if (isMobileView) {
   // Mobile view
   options.responsive = true;
   options.maintainAspectRatio = true;
} else {
   // Desktop view
   options.responsive = false;
   options.maintainAspectRatio = false;
}


// Function to generate a random color in hexadecimal format
function getRandomColor() {
   var letters = '0123456789ABCDEF';
   var color = '#';
   for (var i = 0; i < 6; i++) {
       color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}

// Generate 56 unique colors for background and hover background
var backgroundColors = [];
var hoverBackgroundColors = [];

for (var i = 0; i < 56; i++) {
   var color = getRandomColor();
   backgroundColors.push(color);
   hoverBackgroundColors.push(color); // For simplicity, you can use the same color for hover
}

var myPieChart = new Chart(ctx, {
   type: 'pie',
   data: {
       labels: labels,
       datasets: [{
           data: data,
           backgroundColor: backgroundColors,
           hoverBackgroundColor: hoverBackgroundColors
       }]
   },
   options: options
});
// Extract unique English_Name_Konkani_Name_Scientific_Name_ values
var uniqueNames = {};
features_Trees_2.forEach(function(feature) {
    var fieldValue = feature.get('English_Name_Konkani_Name_Scientific_Name_');
    if (fieldValue && !uniqueNames[fieldValue]) {
        uniqueNames[fieldValue] = true;
    }
});

var namesArray = Object.keys(uniqueNames).sort(); // Get all unique names and sort them alphabetically

$(document).ready(function() {
    var $dropdown = $('#treeDropdown');
// Append the default option first
$dropdown.append(new Option('All Trees', ''));

    // Append options to the dropdown
    namesArray.forEach(function(name) {
        $dropdown.append(new Option(name, name));
    });
  

    // Initialize Select2 with a custom matcher
    // Initialize Select2 with a custom matcher
    $dropdown.select2({
        placeholder: 'Select a tree',
        allowClear: true,
       // dropdownCssClass: 'select2-dropdown-up', // Add custom CSS class for additional styling if needed
        matcher: function(params, data) {
            // If there are no search terms, return all of the data
          // If there are no search terms, return all of the data
          if ($.trim(params.term) === '') {
            return data;
        }

        // Do not display the item if there is no 'text' property
        if (typeof data.text === 'undefined') {
            return null;
        }

        // Custom match logic: match the term to the beginning of the text
        var term = params.term.toUpperCase();
        var text = data.text.toUpperCase();

        // Split the combined name into parts
        var parts = text.split(/[\/\(\)]/).map(function(part) {
            return part.trim();
        });

        // Check if any part starts with the term
        for (var i = 0; i < parts.length; i++) {
            if (parts[i].indexOf(term) === 0) {
                return data;
            }
        }

        // Return `null` if the term should not be displayed
        return null;
        }
    })

    // Function to filter map features based on selected tree name
    function filterMapByTreeName(treeName) {
        // Clear existing features from the layer source
        jsonSource_Trees_2.clear();

        // Filter features based on selected tree name
        var filteredFeatures = features_Trees_2.filter(function(feature) {
            var fieldValue = feature.get('English_Name_Konkani_Name_Scientific_Name_');
            return fieldValue === treeName;
        });

        // Add filtered features back to the layer source
        jsonSource_Trees_2.addFeatures(filteredFeatures);

        // Update the text content based on filter
        if (treeName) {
            document.getElementById('total_text').innerText = 'Trees planted';
        } else {
            document.getElementById('total_text').innerText = 'Total trees planted';
        }

        // Zoom to extent of filtered features
        
    }

    // Event listener for dropdown change
    $dropdown.on('change', function(e) {
        var selectedTree = $(this).val();

        if (selectedTree === "") {
            // Reset map to show all features
            resetMap();
        } else {
            // Filter map features based on selected tree name
            filterMapByTreeName(selectedTree);
        }
    });

    // Function to reset map to show all features
    function resetMap() {
        jsonSource_Trees_2.clear();
        jsonSource_Trees_2.addFeatures(features_Trees_2);
        var extent = [8216522.173750, 1744991.831563, 8220563.547759, 1747406.056648];
        map.getView().fit(extent, { size: map.getSize() });
    }

    // Reset map on initial load
    resetMap();
});

const homebutton = document.getElementById('home_button');
homebutton.addEventListener('click', function() {
    var extent = [8216522.173750, 1744991.831563, 8220563.547759, 1747406.056648];
    map.getView().fit(extent, { size: map.getSize() });
});
