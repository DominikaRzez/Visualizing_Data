var mydata = 
    {
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
            }};

function CreateBarChart(city) {
    
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
