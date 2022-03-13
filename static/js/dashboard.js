
// JSON object
var genderData =
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
  };

  var ethnicitydata = 
  {
  "London": 
          {
      "ethnicities":
          ["black", "white", "asian", "other"],
      "ethcount":
          [930, 1752, 384, 305]
          },

  "Liverpool": 
          {
      "ethnicities":
          ["black", "white", "asian", "other"],
      "ethcount":
          [171, 2104, 82, 69]
          },

  "Birmingham": 
          {
      "ethnicities":
              ["black", "white", "asian", "other"],
      "ethcount":
              [112, 153, 313, 28]
          },

  "Surrey": 
          {
      "ethnicities":
              ["black", "white", "asian", "other"],
      "ethcount":
              [51, 160, 30, 3]
          },

  "Manchester": 
          {
      "ethnicities":
              ["black", "white", "asian", "other"],
      "ethcount":
              [32, 123, 21, 12] 
          },

  "Edinburgh": 
          {
      "ethnicities":
              ["black", "white", "asian", "other"],
      "ethcount":
              [0, 20, 1, 0]
          }
};

var object_data = 
    {
    "London":
            {
        "Crimes": 
            ["Anything to threaten or harm anyone", 
            "Articles for use in criminal damage", 
            "Articles for use in theft",
            "Controlled drugs", 
            "Evidence of offences under the Act", 
            "Firearms",
            "Fireworks", 
            "Offensive weapons", 
            "Psychoactive substances", 
            "Stolen Goods"],
        "CrimeCount": [58, 51, 9, 2070, 119, 3, 6, 359, 0, 766]
            },
    "Liverpool":
            {
        "Crimes": 
            ["Anything to threaten or harm anyone", 
            "Articles for use in criminal damage", 
            "Articles for use in theft",
            "Controlled drugs", 
            "Evidence of offences under the Act", 
            "Firearms",
            "Fireworks", 
            "Offensive weapons", 
            "Psychoactive substances", 
            "Stolen Goods"],
            "CrimeCount": [3, 0, 1, 45, 1, 0, 0, 0, 1, 4]
            },
    "Birmingham":
            {
        "Crimes": 
            ["Anything to threaten or harm anyone", 
            "Articles for use in criminal damage", 
            "Articles for use in theft",
            "Controlled drugs", 
            "Evidence of offences under the Act", 
            "Firearms",
            "Fireworks", 
            "Offensive weapons", 
            "Psychoactive substances", 
            "Stolen Goods"],
        "CrimeCount": [16, 13, 84, 711, 5, 20, 0, 303, 0, 138]
            },
    "Surrey":
            {
        "Crimes": 
            ["Anything to threaten or harm anyone", 
            "Articles for use in criminal damage", 
            "Articles for use in theft",
            "Controlled drugs", 
            "Evidence of offences under the Act", 
            "Firearms",
            "Fireworks", 
            "Offensive weapons", 
            "Psychoactive substances", 
            "Stolen Goods"],
        "CrimeCount": [0, 3, 22, 142, 0, 3, 0, 45, 0, 6]
            },
    "Manchester":
            {
        "Crimes": 
            ["Anything to threaten or harm anyone", 
            "Articles for use in criminal damage", 
            "Articles for use in theft",
            "Controlled drugs", 
            "Evidence of offences under the Act", 
            "Firearms",
            "Fireworks", 
            "Offensive weapons", 
            "Psychoactive substances", 
            "Stolen Goods"],
        "CrimeCount": [17, 1, 5, 138, 8, 0, 0, 8, 0, 16]
            },
    "Edinburgh":
            {
        "Crimes": 
            ["Anything to threaten or harm anyone", 
            "Articles for use in criminal damage", 
            "Articles for use in theft",
            "Controlled drugs", 
            "Evidence of offences under the Act", 
            "Firearms",
            "Fireworks", 
            "Offensive weapons", 
            "Psychoactive substances", 
            "Stolen Goods"],
        "CrimeCount": [3, 0, 0, 16, 0, 0, 0, 0, 0, 2]
            }};

//function to generate a piechart
function CreatePieChart(city) {

var data = [{
  labels: genderData[city].Sex,
  values: genderData[city].PopCount,
  type: "pie"  }];
  
var layout = {title:"Stop and Search Population Split"};

Plotly.newPlot("piechart", data, layout);
};

//function to generate a barchart presenting ethnicity data
function CreateEthnicityChart(city) {
    var data = [{
        x: ethnicitydata[city].ethnicities,
        y: ethnicitydata[city].ethcount,
        type: "bar",
        marker: {
            color: "rgb(195, 111, 89)" },

    }];

    var layout = {
        title: "Ethnicities of those stopped and searched",
        margin: { t:50, l:200, b:100, r:100},
        xaxis: {
            showticklabels: true,
            tickangle: '75',
            tickfont: {
              family: 'Arial, sans-serif',
              size: 14,
              color: 'black',
            },
    }};

Plotly.newPlot("bar", data, layout);
};

//function to generate a barchart presenting object of search data
function CreateObjectChart(city) {
    
    var data = [{
        x: object_data[city].Crimes,
        y: object_data[city].CrimeCount,
        type: "bar",
        marker: {
            color: "rgb(117, 33, 172)" },
    }];

    var layout = {
        title: "Reasons for stop and search",
        margin: { t:50, l:100, b:250, r:100},
        xaxis: {
            showticklabels: true,
            tickangle: '75',
            tickfont: {
              family: 'Arial, sans-serif',
              size: 14,
              color: 'black',
            },
    }};

Plotly.newPlot("bar2", data, layout);
}

//this will deal with selecting a new value from html 
function optionChanged(cityName) {
	console.log(cityName);
  
  console.log(genderData[cityName].Sex);
  console.log(genderData[cityName].PopCount);  
  CreatePieChart(cityName); 
  console.log(ethnicitydata[cityName].ethnicities);
  console.log(ethnicitydata[cityName].ethcount);
  CreateEthnicityChart(cityName); 
  console.log(object_data[cityName].Crimes);
  console.log(object_data[cityName].CrimeCount);
  CreateObjectChart(cityName);
};