// Variables
const airportApiKey = 'be36ed8a-9e45-4afb-b635-3bfc8ea68255';
const resultsContainerEl = document.getElementById('results-container');
console.log(resultsContainerEl);
// resultsContainerEl.setAttribute('class', 'hide');

document.getElementById("search-submit").addEventListener("click", function(event){
    event.preventDefault();
    resultsContainerEl.removeAttribute('class');
    searchSubmit();
});
const selectedCountry = document.getElementById('options');
const selectedCity = document.getElementById('search')

const inUseURL = location.origin;

async function getCountryCode() {
    try {
        const response = await fetch(inUseURL + `/api/search/countryCode/${selectedCountry.value}`)
        const countryData = await response.json();

        const countryCode = countryData[0]['alpha_2_code'];

        covidSearch(countryCode);
        travelInfo(countryCode);
        weatherSearch(countryCode);
    } catch (err) {
        console.log(err);
    }

}

// Renders Country Names for dropdown menu
async function renderAirportData() {
    try {
        const response = await fetch(inUseURL + '/api/search/country');
        const airportData = await response.json();

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

// Gets the neccessary IATA code for airport API requests
async function getIataCode(){
    console.log(selectedCity.value)
    try {
        const response= await fetch(inUseURL + `/api/search/iata/${selectedCountry.value}/${selectedCity.value}`);
        const iataCodeData = await response.json();
        console.log("---IATA CODE---")
        iataCode = iataCodeData[0]['IATA_code']
        console.log(iataCode);
        airportSearch(iataCode);

    } catch (err) {
        console.log(err);
    }
}

// Get nearby Airports from API endpoint
  async function airportSearch(iataCode){

    airportsUrl = 'https://airlabs.co/api/v9/airports?iata_code=' + iataCode + '&api_key=' + airportApiKey
    try {
    const cityEl = document.getElementById('airport');
    const iataEl = document.getElementById('IATA');



    const response = await fetch(airportsUrl)
    const airportData = await response.json();
    const airportName  = airportData.response[0]['name'];

    const iataText = iataCode;
    const cityText = airportName;


    cityEl.textContent = cityText;
    iataEl.textContent = iataText;


    return(airportName);
        // return airportData;  

    } catch (err){
        console.log(err);
    }  
}


async function weatherSearch(){
    var geocodeApiKey = 'a19e123a3b1cf7f00d08b299db07954c';
    try {
        geocodeApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=${geocodeApiKey}`
        console.log(ApiUrl);
        const response = await fetch(geocodeApiUrl)
        const geocode = await response.json();


        const lat = geocode[0]['lat'];
        const lon = geocode[0]['lon'];
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(lat,lon)
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

    } catch (err) {}

//     var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=' + lat + '&lon=' + lon + '&units=imperial' + '&appid=' + geocodeApiKey;
//     try {
//         const response = await fetch(weatherApiUrl)
//         const weatherData = await response.json();
//         forecast(weatherData);




//         // Get 5-day Weather forecast from data returned in Weather Search Function
//         function forecast(weatherData){

//         for (i=0; i<5; i++){
//             var forecastWicon = weatherData['daily'][i]['weather'][0].icon;
//             var forecastIconUrl = 'https://openweathermap.org/img/wn/' + forecastWicon + '.png';
//             var forecastDay = weatherData['daily'][i].dt;
//             var forecastWind = weatherData['daily'][i].wind_speed;
//             var forecastTemp =  weatherData['daily'][i].temp.max;
//             var forecastHumidity = weatherData['daily'][i].humidity;

//             console.log(forecastTemp, forecastDay, forecastWind, forecastHumidity);
//     }
// }

//     } catch (err){
//         console.log(err);
//     }

}



//Get Covid stats from Covid API endpoint
async function covidSearch(countryCode){



    var queryCovidURL = `https://disease.sh/v3/covid-19/countries/${countryCode}?yesterday=yesterday&strict=true`

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
            const cpmEl = document.getElementById('cpm');
            const todayCasesEl = document.getElementById('todayCases');
            const apmEl = document.getElementById('apm');
            const recoveredEl = document.getElementById('recovered')

            casePerMillion = covidData['casesPerOneMillion'];
            todayCases = covidData['todayCases'];
            activeMillion = covidData['activePerOneMillion'];
            recovered = covidData['recovered'];

            cpmEl.textContent = `Cases Per Million People: ${casePerMillion}`;
            todayCasesEl.textContent = `Todays Cases: ${todayCases}`;
            apmEl.textContent = `Active cases Per Million People: ${activeMillion}`;
            recoveredEl.textContent = `Total Recovered: ${recovered}`;



            console.log(`casePerMillion: ${casePerMillion},todayCases: ${todayCases},activeMillion: ${activeMillion},recovered: ${recovered}`)
    }
}



        // Get Travel Safety Advisory from Advisory API Endpoint
async function travelInfo(countryCode){
    var travelInfoURL = 'https://www.travel-advisory.info/api?countrycode=' + countryCode;
    try {
        const messageEl = document.getElementById('message');
        const scoreEl = document.getElementById('score')

        const response = await fetch(travelInfoURL)
        console.log(response);
        const travelData = await response.json();
        console.log(travelData);

        travelInfo = travelData['data'][`${countryCode}`]['advisory'];
        const score = travelInfo.score
        const message = travelInfo.message

        scoreEl.textContent = `Safety Rating: ${score}`;
        messageEl.textContent = `Advisory: ${message}`;




    } catch (err) {

    }



}

renderAirportData();


 function searchSubmit(){
     getIataCode();
     getCountryCode();
        console.log('Getting Covid Stats')
        console.log('Getting travel advisory')


}

