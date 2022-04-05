// Variables
const apiKey = 'be36ed8a-9e45-4afb-b635-3bfc8ea68255';
const searchButton = document.querySelector('#search-submit');
const distance = 50;


searchButton.addEventListener('click',searchSubmit());

function searchSubmit(){
   nearbyAirports();
}






// Get nearby Airports from API endpoint
 async function nearbyAirports(){
    // lat = data[0].lat
    const lat = 104;
    const lon = 39;
    // lon = data[0].lon
    airportsUrl = 'https://airlabs.co/api/v9/airports?iata_code=CDG&api_key=be36ed8a-9e45-4afb-b635-3bfc8ea68255'

    fetch(airportsUrl)
        .then(response => {
            if(response.ok)
            return response.json();
        })
        .then(data =>{
            // searchBody.textContent = '';  // Clear previous list of airports
                alert(data.response[0]['name'])

                var airportName = data.response['name'];
                // var bodyContentEl = document.createElement('li');
                // $(bodyContentEl).text(airportName);
                // searchBody.append(bodyContentEl);
            searchCard.append(searchBody);
            searchContentEl.append(searchCard);
        })
}


function weatherSearch(){
    // var lat = data[0].lat;
    // var lon = data[0].lon;
    const lat = 104;
    const lon = 39;
    var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=' + lat + '&lon=' + lon + '&units=imperial' + '&appid=' + geocodeApiKey;

    fetch(weatherApiUrl)
        .then(response =>{
            if(response.ok){
                return response.json()
            }
        })
        .then(data =>{
            forecast(data)
        })
}

// Get 5-day Weather forecast from data returned in Weather Search Function
 async function forecast(data){
    forecastBody.empty();

    for (i=0; i<5; i++){
        var forecastWicon = data['daily'][i]['weather'][0].icon;
        var forecastIconUrl = 'https://openweathermap.org/img/wn/' + forecastWicon + '.png';
        var forecastDay = data['daily'][i].dt;
        var forecastWind = data['daily'][i].wind_speed;
        var forecastTemp =  data['daily'][i].temp.max;
        var forecastHumidity = data['daily'][i].humidity;

        var forecastCard = document.createElement('div');
        var forecastWiconEl = document.createElement('img');
        var momentDay = moment(forecastDay * 1000).format('MM/DD/YYYY');
        var forecastTempEl = document.createElement('p');
        var forecastWindEl = document.createElement('p');
        var forecastHumidityEl = document.createElement('p');

        $(forecastWiconEl).attr('id', 'wicon');
        $(forecastWiconEl).attr('src', forecastIconUrl);
        $(forecastWiconEl).attr('alt', 'weather icon');
        $(forecastTempEl).text(`Temp ${forecastTemp} F`);
        $(forecastWindEl).text(`Wind: ${forecastWind} MPH`);
        $(forecastHumidityEl).text(`Humidity ${forecastHumidity} %`);

        forecastCard.classList.add('forecastCard');
        forecastCard.append(forecastWiconEl);
        forecastCard.append(momentDay);
        forecastCard.append(forecastTempEl);
        forecastCard.append(forecastWindEl);
        forecastCard.append(forecastHumidityEl);
        forecastBody.append(forecastCard);

        console.log(forecastTemp);
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

