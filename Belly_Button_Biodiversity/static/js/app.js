// Create bar graph function
function barGraph(sampleSelected) {
    // Obtain and format top 10 OTUs
    var topOTUs = sampleSelected.otu_ids.slice(0, 10);
    var topOTUs = topOTUs.map(i => "OTU " + i);
    // Create variable containing top 10 datapoints
    var data = [{
        x: sampleSelected.sample_values.slice(0, 10),
        y: topOTUs,
        labels: sampleSelected.otu_labels.slice(0, 10),
        marker: {color: '#0A3048'},
        type:"bar",
        orientation: "h",
    }];
    // Create variable containing graph layout
    var layout = {
        title: "Test Subject Top 10 OTUs",
        yaxis: {autorange:"reversed",
            tickmode:"linear",
        },
    };
    // Plot bar graph
    Plotly.newPlot("bar", data, layout);
};
  
// Create bubble graph function
function bubbleGraph(sampleSelected) {
// Create variable containing data for sample selected
    var data = [{
        x: sampleSelected.otu_ids,
        y: sampleSelected.sample_values,
        mode: "markers",
        marker: {
        size: sampleSelected.sample_values,
        color: sampleSelected.otu_ids
        },
        labels: sampleSelected.otu_labels
    }];
    // Create variable containing graph layout
    var layout = {
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1200
    };
    // Plot bubble graph
    Plotly.newPlot("bubble", data, layout); 
};
  
  
// Create demographic information table function
function demInfoTable(testSubject) {
    // Create variable to store demographic information for subject selected
    var demographicInformation = d3.select("#sample-metadata");
    // Clear table data
    demographicInformation.html("");
    // Populate demographic information for the new subject selected
    Object.entries(testSubject).forEach(([key, value]) => {
        demographicInformation.append("p").text(`${key}:${value}`);
    });
};

// Create function to populate graphs and table with first test subject data points
function initialize() {
    // Create variable for dropdown menu
    var dropdown = d3.select("#selDataset"); 
    // Append test subject IDs to dropdown list
    d3.json("static/samples.json").then((data) => {       
        data.names.forEach((name) => {
        dropdown.append("option").text(name).property("value");
        });
    // Populate the graphs and table with first test subject data
    testSubjectChange(data.names[0]);
    });
};

// Create function to populate graphs and table when test subject is changed from dropdown
function testSubjectChange(sample) {
    // Pull all test subject data
    d3.json("static/samples.json").then((data) => {
        // Filter based on dropdown option selected
        var testSubject = data.metadata.filter(meta => meta.id.toString() === sample)[0];
        var sampleSelected = data.samples.filter(s => s.id.toString() === sample)[0];
        // Run graph and table functions with updated test subject information
        barGraph(sampleSelected);
        bubbleGraph(sampleSelected);
        demInfoTable(testSubject);
    });
};

// Start application using initialize function
initialize();