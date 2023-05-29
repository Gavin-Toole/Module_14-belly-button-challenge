// Step 1: Read in the samples.json file using D3 library
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
  
  // Step 2: Create a function to initialize the dashboard
  function init() {
    // Select the dropdown menu
    var dropdown = d3.select("#selDataset");
    
    // Populate the dropdown menu with the sample names
    data.names.forEach(function(name) {
      dropdown.append("option").text(name).property("value", name);
    });
    
    // Display the initial data and plots
    var initialSample = data.names[0];
    updateDashboard(initialSample);
  }
  
  // Step 3: Create a function to update the dashboard when a new sample is selected
  function updateDashboard(sample) {
    // Select the metadata div
    var metadataDiv = d3.select("#sample-metadata");
    
    // Clear the metadata div
    metadataDiv.html("");
    
    // Get the metadata for the selected sample
    var metadata = data.metadata.find(function(item) {
      return item.id == sample;
    });
    
    // Display each key-value pair from the metadata
    Object.entries(metadata).forEach(function([key, value]) {
      metadataDiv.append("p").text(`${key}: ${value}`);
    });
    
    // Get the sample data for the selected sample
    var sampleData = data.samples.find(function(item) {
      return item.id == sample;
    });
    
    // Slice and sort the top 10 OTUs
    var top10SampleValues = sampleData.sample_values.slice(0, 10).reverse();
    var top10OTUids = sampleData.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
    var top10OTULabels = sampleData.otu_labels.slice(0, 10).reverse();
    
    // Step 4: Create a horizontal bar chart
    var barTrace = {
      x: top10SampleValues,
      y: top10OTUids,
      text: top10OTULabels,
      type: "bar",
      orientation: "h"
    };
    
    var barData = [barTrace];
    
    var barLayout = {
      title: "Top 10 OTUs",
      yaxis: { title: "OTU IDs" },
      margin: { 
        t: 30,
        l: 150
       }
    };
    
    Plotly.newPlot("bar", barData, barLayout);
    
    // Step 5: Create a bubble chart
    var bubbleTrace = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: "markers",
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids,
        colorscale: "Earth"
      }
    };
    
    var bubbleData = [bubbleTrace];
    
    var bubbleLayout = {
      title: "OTU IDs vs Sample Values",
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values" },
      showlegend: false
    };
    
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
    // Step 6: Adapt the Gauge Chart
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: metadata.wfreq,
        title: { text: "Weekly Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { 
            range: [0, 9], 
            tickmode: "linear", 
            tick0: 1, 
            dticks: 2 
          },
          bar: {color: "orange"},
          steps: [
            { range: [0, 1], 
              color: "#edf8e9" 
            },
            { range: [1, 2], 
              color: "#bae4b3" 
            },
            { range: [2, 3], 
              color: "#74c476"
             },
            { range: [3, 4], 
              color: "#31a354"
             },
            { range: [4, 5], 
              color: "#006d2c" 
            },
            { range: [5, 6], 
              color: "#006d2c" 
            },
            { range: [6, 7], 
              color: "#006d2c" 
            },
            { range: [7, 8], 
              color: "#006d2c" 
            },
            { range: [8, 9], 
              color: "#006d2c" 
            }
 
          ],
          
        }
      }
    ];
    
    var gaugeLayout = {
      width: 500,
      height: 400,
      margin: { 
        t: 0, 
        b: 0 
      }
    };
    
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  }
  
  // Step 7: Add event listener for dropdown change
  d3.select("#selDataset").on("change", function() {
    var selectedSample = d3.select(this).property("value");
    updateDashboard(selectedSample);
  });
  
  // Initialize the dashboard
  init();
});