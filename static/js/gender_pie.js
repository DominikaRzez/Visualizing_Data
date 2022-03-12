
// JSON object
var myData =
	{
  	"London":
    			{
          "Sex": ["Male","Female"] ,
          "PopCount": [3069,340],
          "TotalStops": [3451]
          },
  	"Liverpool":
    			{
          "Sex": ["Male","Female"] ,
          "PopCount": [2267,253],
          "TotalStops": [2552]
          },
    "Birmingham":
                {
          "Sex": ["Male","Female"] ,
          "PopCount": [428,58],
          "TotalStops": [1290]
                },
    "Surrey":
                {
          "Sex": ["Male","Female"] ,
          "PopCount": [220,30],
          "TotalStops": [254]
                },
    "Manchester":
                {
          "Sex": ["Male","Female"] ,
          "PopCount": [163,16],
          "TotalStops": [193]
                },
    "Edinburgh":
                {
          "Sex": ["Male","Female"] ,
          "PopCount": [18,3],
          "TotalStops": [21]
                }        
  }

//function to generate a piechart
function CreatePieChart(city) {

var data = [{
  labels: myData[city].Sex,
  values: myData[city].PopCount,
  type: "pie"  }];
  
var layout = {title:"Stop and Search Population Split"};

Plotly.newPlot("pie", data, layout);
}
//this will deal with selecting a new value from html 
function optionChanged(cityName) {
	console.log(cityName);
  
  console.log(myData[cityName].Sex);
  console.log(myData[cityName].PopCount);  
  CreatePieChart(cityName);  
}


