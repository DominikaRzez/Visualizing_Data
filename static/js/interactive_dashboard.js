//function to generate a barchart
function BuildCharts(city) {

    d3.json("/api/metadata",  function (apiData)  {

        console.log(data);

        //plot for the first chart 
        var data = [{
            x: apiData[city].ethnicities,
            y: apiData[city].ethcount,
            type: "bar"  }];
            
        var layout = {title:"Ethnicities of those stopped and searched"};
          
        Plotly.newPlot("bar", data, layout);

        //plot the second chart
        var data2 = [{
            labels: apiData[city].Sex,
            values: apiData[city].PopCount,
            type: "pie"  }];
            
        var layout2 = {title:"Stop and Search Population Gender Split"};
          
        Plotly.newPlot("piechart", data2, layout2);

        var data3 = [{
            x: apiData[city].Crimes,
            y: apiData[city].CrimeCount,
            type: "bar"  }];
            
        var layout3 = {title:"Reasons for stop and search",
                    margin:{
                        b:150
                    }};
          
        Plotly.newPlot("bar2", data3, layout3);

    });
};
    

    //this will deal with selecting a new value from html 
function optionChanged(cityName) {
    console.log(cityName);
    BuildCharts(cityName);  
};