// Variables
const airportApiKey = 'be36ed8a-9e45-4afb-b635-3bfc8ea68255';
document.getElementById("search-submit").addEventListener("click", function(event){
    event.preventDefault();
    searchSubmit();
});
const selectedCountry = document.getElementById('options');
const selectedCity = document.getElementById('search');

const localUrl = `https://immense-ravine-97579.herokuapp.com/`


// Renders Country Names for dropdown menu
async function renderAirportData() {
    try {
        const response = await fetch(localUrl + '/api/search/country');
        const airportData = await response.json();
        console.log(airportData);

        const dropDown = document.getElementById('options');
        let i = 0;
        while(i<airportData.length){
            const country = airportData[i]['country'];
            const listEl = document.createElement('option');
            listEl.setAttribute('value',country);
            listEl.textContent = country
            dropDown.append(listEl);
            i ++;
        }
    } catch (err) {
        console.log(err);
    }



}

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
async function covidSearch(data){
    searchCountry = 'US'
    var queryCovidURL = 'https://disease.sh/v3/covid-19/countries?yesterday=&sort=?&limit=1&countrycode='  + searchCountry;

    try {
        const response = await fetch(queryCovidURL)
        console.log(response);
        const covidData = await response.json();
        console.log(covidData);
        parseCovidData(covidData);

    } catch(err){
        console.log(err);
    }

    fetch(queryCovidURL)
        .then(function (res)   {
            return res.json()
        })
    function parseCovidData(covidData) {
        // Output Travel Advisory based on Country drop down
            population = covidData[212]['population'];
            casePerMillion = covidData[212]['casesPerOneMillion'];
            todayCases = covidData[212]['todayCases'];
            activeMillion = covidData[212]['activePerOneMillion'];
            recovered = covidData[212]['recovered'];

            console.log(`Population: ${population}, casePerMillion: ${casePerMillion},todayCases: ${todayCases},activeMillion: ${activeMillion},recovered: ${recovered}`)
    }
}



        // Get Travel Safety Advisory from Advisory API Endpoint
async function travelInfo(){
    var travelInfoURL = 'https://www.travel-advisory.info/api?countrycode=' + searchCountry;

    try {
        const response = await fetch(travelInfoURL)
        const travelData = await response.json();
        console.log(travelData);
        parseTravelData(travelData);

    } catch (err) {

    }


    function parseTravelData(travelData) {
        // Output Travel Advisory based on Country drop down
            travelInfo = travelData['data'].US.advisory.message;
            console.log(travelInfo);
    }
}

renderAirportData();

 function searchSubmit(){
     alert(selectedCountry.value);
     alert(selectedCity.value);
        console.log('Getting airports');
        airportSearch();
        console.log('Getting weather');
        weatherSearch();
        console.log('Getting Covid Stats')
        covidSearch();
        console.log('Getting travel advisory')
        travelInfo();
}

