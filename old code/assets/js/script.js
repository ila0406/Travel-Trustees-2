// variables
var searchTextEl = document.querySelector('#search-text');
var searchContentEl = document.querySelector('#search-content');
var covidContentEl = document.querySelector('#covid-content');
var searchFormEl = document.querySelector('#search-form');
var resultsContainerEl = document.getElementById('results-container');
// var mainContainerEl = document.getElementById('main-container');
var searchCard = document.createElement('div');
var searchBody = document.createElement('ul');
var forecastBody = $('#weather-content')
var forecastCard = document.createElement('div');
var travelInfoEl = $('#travel-content');
var travelCard = document.createElement('div');
var Localstorage = localStorage;
var cities = [];
var search = $('#search-submit');
var geocodeApiKey = 'a19e123a3b1cf7f00d08b299db07954c';
var apiKey = '37ee8ade-ff48-4981-9af3-394163c2c764';
var place = $('#search')
var locationDisplay = $('#location');
var locationName = $('#search');
var searchCountry;
var distance = 50;

// Hide results Column until Search is triggered
resultsContainerEl.setAttribute('class', 'hide');

// This is the event for when the user clicks on the search button
$(search).click(geocode);
$(search).click(displayCovid);

// Get Country Location from Geocode API endpoint
function geocode(event){
    var cityName = locationName.val();
    var limit = '1';
    var geocodeUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&' + 'limit=' + limit + '&appid=' + geocodeApiKey;
    event.preventDefault();

    fetch(geocodeUrl)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }   
        })
        .then(function(data) {
            searchCountry=data[0].country; //Passing Country to Covid API
            weatherSearch(data);
            nearbyAirports(data);
            travelInfo(data);
            resultsContainerEl.removeAttribute('class'); // Unhide Results column
            // mainContainerEl.setAttribute('class', 'grid-cols-2')
        })

        // Store searched cities in Local Storage for future use
        cities.push(cityName);
        localStorage.setItem('cities', JSON.stringify(cities));
        var citiesArray = JSON.parse(Localstorage.getItem('cities'));
    
        var cittiesList = document.querySelector('ul');
        var newCity = citiesArray.length - 1;   
        var listItem = document.createElement('button');
    
        listItem.textContent = citiesArray[newCity];
        cittiesList.appendChild(listItem);
        listItem.setAttribute('class','btn btnP btn-info btn-block mb-4 p-4');
        listItem.setAttribute('id','search');
    }


// Get nearby Airports from API endpoint
function nearbyAirports(data){
    lat = data[0].lat
    lon = data[0].lon
    airportsUrl = 'https://airlabs.co/api/v9/nearby?lat=' + lat + '&lng=' + lon + '&distance=' + distance + '&api_key=' + apiKey;

    fetch(airportsUrl)
        .then(response => {
            if(response.ok)
            return response.json();
        })
        .then(data =>{
            searchBody.textContent = '';  // Clear previous list of airports

            for (i=0; i<5; i++) {
                var airportName = data.response['airports'][i]['name'];
                var bodyContentEl = document.createElement('li');
                $(bodyContentEl).text(airportName);
                searchBody.append(bodyContentEl);
            }
            searchCard.append(searchBody);
            searchContentEl.append(searchCard);
        })
}


// Get lat/lon from Weather API Endpoint
function weatherSearch(data){
    var lat = data[0].lat;
    var lon = data[0].lon;
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
function forecast(data){
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
    }
}


//Get Covid stats from Covid API endpoint
function displayCovid(data){
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
        if (searchCountry == 'US'){
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
        }
        else if (searchCountry == 'GB'){
            population = data[211]['population'];
            casePerMillion = data[211]['casesPerOneMillion'];
            todayCases = data[211]['todayCases'];
            activeMillion = data[211]['activePerOneMillion'];
            recovered = data[211]['recovered'];

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
        }
        else if (searchCountry == 'NZ'){
            population = data[146]['population'];
            casePerMillion = data[146]['casesPerOneMillion'];
            todayCases = data[146]['todayCases'];
            activeMillion = data[146]['activePerOneMillion'];
            recovered = data[146]['recovered'];

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
        }
        else if (searchCountry == 'CA'){
            population = data[35]['population'];
            casePerMillion = data[35]['casesPerOneMillion'];
            todayCases = data[35]['todayCases'];
            activeMillion = data[35]['activePerOneMillion'];
            recovered = data[35]['recovered'];

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
        }
        else if (searchCountry == 'MX'){
            population = data[132]['population'];
            casePerMillion = data[132]['casesPerOneMillion'];
            todayCases = data[132]['todayCases'];
            activeMillion = data[132]['activePerOneMillion'];
            recovered = data[132]['recovered'];

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
        }
    })
}


// Get Travel Safety Advisory from Advisory API Endpoint
function travelInfo(data){
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
        if (searchCountry == 'US'){
            travelInfo = data['data'].US.advisory.message;
            var travelEl = document.createElement('p');
            $(travelEl).text(`Country Safety Rating: ${travelInfo}`);
            travelCard.append(travelEl);
            travelInfoEl.append(travelCard);
        }
        else if (searchCountry == 'GB'){
            travelInfo = data['data'].GB.advisory.message;
            var travelEl = document.createElement('p');
            $(travelEl).text(`Country Safety Rating: ${travelInfo}`);
            travelCard.append(travelEl);
            travelInfoEl.append(travelCard);
        }
        else if (searchCountry == 'NZ'){
            travelInfo = data['data'].NZ.advisory.message;
            var travelEl = document.createElement('p');
            $(travelEl).text(`Country Safety Rating: ${travelInfo}`);
            travelCard.append(travelEl);
            travelInfoEl.append(travelCard);
        }
        else if (searchCountry == 'CA'){
            travelInfo = data['data'].CA.advisory.message;
            var travelEl = document.createElement('p');
            $(travelEl).text(`Country Safety Rating: ${travelInfo}`);
            travelCard.append(travelEl);
            travelInfoEl.append(travelCard);
        }
        else if (searchCountry == 'MX'){
            travelInfo = data['data'].MX.advisory.message;
            var travelEl = document.createElement('p');
            $(travelEl).text(`Country Safety Rating: ${travelInfo}`);
            travelCard.append(travelEl);
            travelInfoEl.append(travelCard);
        }
    });
}

// Clear Search History from Local Storage
function clearHistory() {
    window.localStorage.clear();
    window.location.reload();
}

document.getElementById('clear').onclick = clearHistory;