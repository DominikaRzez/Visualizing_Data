var mydata = 
    {
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
};

function CreateBarChart(city) {
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


function optionChanged(cityName) {
    console.log(cityName);
  
    console.log(mydata[cityName].ethnicities);
    console.log(mydata[cityName].ethcount);
    CreateBarChart(cityName);
}
