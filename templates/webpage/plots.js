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
}

function optionChanged(cityName) {
console.log(cityName);

console.log(mydata[cityName].ethnicities);
console.log(mydata[cityName].ethcount);
CreateBarChart(cityName);
}
