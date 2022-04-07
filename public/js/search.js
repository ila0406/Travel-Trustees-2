// Variables
const apiKey = 'be36ed8a-9e45-4afb-b635-3bfc8ea68255';
const searchButton = document.getElementById('search-submit');



searchButton.addEventListener('click',searchSubmit());



// Get nearby Airports from API endpoint
  async function airportSearch(){
    iataCode = 'CDG'
    airportsUrl = 'https://airlabs.co/api/v9/airports?iata_code=' + iataCode + '&api_key=' + apiKey
    try {
    const response = await fetch(airportsUrl)
    console.log(response);
    const airportData = await response.json();
    const airportName  = airportData.response[0]['name'];
    console.log(airportName);
    return(airportName);
        // return airportData;  

    } catch (err){
        console.log(err);
    }  
}



async function weatherSearch(){
    const lat = 39;
    const lon = 104;
    var geocodeApiKey = 'a19e123a3b1cf7f00d08b299db07954c';
    var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=' + lat + '&lon=' + lon + '&units=imperial' + '&appid=' + geocodeApiKey;

    try {
        const response = await fetch(weatherApiUrl)
        console.log(response);
        const weatherData = await response.json();
        forecast(weatherData);




        // Get 5-day Weather forecast from data returned in Weather Search Function
        function forecast(weatherData){

        for (i=0; i<5; i++){
            var forecastWicon = weatherData['daily'][i]['weather'][0].icon;
            var forecastIconUrl = 'https://openweathermap.org/img/wn/' + forecastWicon + '.png';
            var forecastDay = weatherData['daily'][i].dt;
            var forecastWind = weatherData['daily'][i].wind_speed;
            var forecastTemp =  weatherData['daily'][i].temp.max;
            var forecastHumidity = weatherData['daily'][i].humidity;
            
            console.log(forecastTemp, forecastDay, forecastWind, forecastHumidity);
    }
}

    } catch (err){
        console.log(err);
    }

}



//Get Covid stats from Covid API endpoint
async function displayCovid(data){
    covidContentEl.innerHTML=''
    var queryCovidURL = 'https://corona.lmao.ninja/v2/countries?yesterday=&sort=?&limit=1&countrycode='  + searchCountry;
    var population = '';
    var casePerMillion = '';
    var todayCases = '';
    var activeMillion ='';
    var recovered = '';
    var covidCard = document.createElement('div')

    fetch(queryCovidURL)
        .then(function (res)   {
            return res.json()
        })
    .then(function (data) {
        searchBody.textContent = ''; // Clear previous list of stats
        // Output Travel Advisory based on Country drop down
            population = data[212]['population'];
            casePerMillion = data[212]['casesPerOneMillion'];
            todayCases = data[212]['todayCases'];
            activeMillion = data[212]['activePerOneMillion'];
            recovered = data[212]['recovered'];

            var populationEl = document.createElement('p');
            var casePerMillionEl = document.createElement('p');
            var todayCasesEl = document.createElement('p');
            var activeMillionEl = document.createElement('p');
            var recoveredEl = document.createElement('p');

            $(populationEl).text(`Population: ${population}`);
            $(casePerMillionEl).text(`Cases Per Million People: ${casePerMillion}`);
            $(todayCasesEl).text(`Todays Cases: ${todayCases}`);
            $(activeMillionEl).text(`Active cases Per Million People: ${activeMillion}`);
            $(recoveredEl).text(`Total recovered: ${recovered}`);

            covidCard.append(populationEl);
            covidCard.append(casePerMillionEl);
            covidCard.append(todayCasesEl);
            covidCard.append(activeMillionEl);
            covidCard.append(recoveredEl);
            covidContentEl.append(covidCard);
            
            console.log(population);
    })
}



        // Get Travel Safety Advisory from Advisory API Endpoint
async function travelInfo(data){
    travelInfoEl.textContent= ''; // Clear previous advisory
    var travelInfoURL = 'https://www.travel-advisory.info/api?countrycode=' + searchCountry;
    var travelInfo = '';
    travelCard.textContent = ''; // Clear previous travel card

    fetch(travelInfoURL)
        .then(function (res)   {
            return res.json()
        })
    .then(function (data) {
        // Output Travel Advisory based on Country drop down
            travelInfo = data['data'].US.advisory.message;
            var travelEl = document.createElement('p');
            $(travelEl).text(`Country Safety Rating: ${travelInfo}`);
            travelCard.append(travelEl);
            travelInfoEl.append(travelCard);


            console.log(travelInfo);

    });
}

 function searchSubmit(){
        console.log('Getting airports');
        airportSearch();
        console.log('Getting weather');
        weatherSearch();
        // const weatherData = await weatherSearch();

}


