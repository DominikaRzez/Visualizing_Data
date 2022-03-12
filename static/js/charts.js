var gender = d3.json("/api/gender")
var ethnicities = d3.json("/api/ethnicities")
var object_of_search = d3.json("/api/search_object")

//Initiating the function
function init(){
    // Selecting the dropdown element
    var dropdown = d3.select("#selDataset");
    // Using d3 library to read file
    d3.json("/api/gender").then((data) => {
        // Craeting variable of city name
        var city_name = data.country_name;
        //Looping through list of cities and populating the dropdown with city name
        for (var i = 0; i < city_name.length; i++) {
            dropdown
            .append("option")
            .text(city_name[i])
            .property("value", city_name[i]);
        }
        // Using the first ID to display default plots
        var first_city = city_name[0];
        updatePlots(city_name);
    });
};

// Defining updatePlots function
function updatePlots(city) {
    // Using d3 to create variable holding cities gender details
    d3.json("/api/gender").then((data) => {
        // Getting data for barchart and bubble chart
       var female = data.Female;
       var male = data.Male;


       
       // Creating bar chart
       var trace1 = {
           x: sample_values.slice(0,10).reverse(),
           y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
           text: otu_labels.slice(0,10).reverse(),
           type: 'bar',
           orientation: 'h'
       };
       var data = [trace1];
       var layout = {
           title: "Top 10 OTUs found in individual " + sample,
           width: 500,
           height:600,
           margin: {l: 60, r: 50, t: 100, b: 100},
       };
       Plotly.newPlot("bar", data, layout);
       //Creating bubble chart
       var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
        size: sample_values,
        color: otu_ids,
        opacity: 0.8,
        }
    };
       var data = [trace1];
       var layout = {
           title: "OTU per sample in individual " + sample,
           showlegend: false, 
           height: 600,
       }
       Plotly.newPlot("bubble", data, layout);
       //Creating gauge chart
       var data = [
        {
          type: "indicator",
          mode: "gauge+number+delta",
          value: wfreq,
          title: { text: "<b> Belly Button Washing Frequency</b> <br>Scrubs per week", font: { size: 24 } },
          gauge: {
            axis: { range: [null, 10], tickwidth: 1},
            bar: { color: "gray" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, 1], color: "rgb(255, 255, 255)" },
              { range: [1, 2], color: "rgb(255, 255, 204))"},
              { range: [2, 3], color: "rgb(217, 255, 179)" },
              { range: [3, 4], color: "rgb(153, 255, 153)" },
              { range: [4, 5], color: "rgb(153, 255, 204)" },
              { range: [5, 6], color: "rgb(153, 255, 255)" },
              { range: [6, 7], color: "rgb(204, 204, 255)" },
              { range: [7, 8], color: "rgb(255, 204, 255)" },
              { range: [8, 9], color: "rgb(255, 170, 128)" },
              { range: [9, 10], color: "rgb(255, 153, 153)" }
            ],
          }
        }
      ];
      
      var layout = {
        width: 500,
        height: 400,
        margin: { t: 100, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "rgb(51, 51, 51)", family: "Arial" }
      };
      
      Plotly.newPlot('gauge', data, layout);
      
    });
};
// Fetch new data each time a new sample is selected
function optionChanged(newdata) {
    updateDemographics(newdata);
    updatePlots(newdata)
};

// Initialize the function
init();
