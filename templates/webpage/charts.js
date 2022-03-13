var chart1 = new CanvasJS.Chart("chartContainer1",{
    title :{
        text: "Live Data"
    },
    data: [{
	type: "column",

        "london": 
                {
            "ethnicities":
                ["black", "white", "asian", "other"],
            "ethcount":
                [930, 1752, 384, 305]
                },
    
        "liverpool": 
                {
            "ethnicities":
                ["black", "white", "asian", "other"],
            "ethcount":
                [171, 2104, 82, 69]
                },
    
        "birmingham": 
                {
            "ethnicities":
                    ["black", "white", "asian", "other"],
            "ethcount":
                    [112, 153, 313, 28]
                },
    
        "surrey": 
                {
            "ethnicities":
                    ["black", "white", "asian", "other"],
            "ethcount":
                    [51, 160, 30, 3]
                },
    
        "manchester": 
                {
            "ethnicities":
                    ["black", "white", "asian", "other"],
            "ethcount":
                    [32, 123, 21, 12] 
                },
    
        "edinburgh": 
                {
            "ethnicities":
                    ["black", "white", "asian", "other"],
            "ethcount":
                    [0, 20, 1, 0]
                }
    }]
});

var chart2 = new CanvasJS.Chart("chartContainer2",{
    title :{
	text: "Live Data"
    },
    data: [{
	type: "column",
	
    "london":
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
    "liverpool":
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
    "birmingham":
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
    "surrey":
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
    "manchester":
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
    "edinburgh":
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
            }]
        
});


chart1.CreateBarChart(city) {
    var data = [{
        x: mydata[city].ethnicities,
        y: mydata[city].ethcount,
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

Plotly.newPlot("barchart", data, layout);
}

function optionChanged(cityName) {
console.log(cityName);

console.log(mydata[cityName].ethnicities);
console.log(mydata[cityName].ethcount);
CreateBarChart(cityName);
};

chart2.CreateBarChart(city) {
    
    var data = [{
        x: mydata[city].Crimes,
        y: mydata[city].CrimeCount,
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

Plotly.newPlot("barchart", data, layout);
}

function optionChanged(cityName) {
    console.log(cityName);
  
    console.log(mydata[cityName].Crimes);
    console.log(mydata[cityName].CrimeCount);
    CreateBarChart(cityName);
}