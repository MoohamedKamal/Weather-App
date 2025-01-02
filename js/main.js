// today///////////
let todayName = document.getElementById('todayName');
let todayNumber = document.getElementById('todayNumber');
let todayMonth = document.getElementById('todayMonth');
let todayCity = document.getElementById('todayCity');
let todayTemprature = document.getElementById('todayTemprature');
let todayIcon = document.getElementById('todayIcon');
let todayState = document.getElementById('todayState');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let windDirection = document.getElementById('windDirection');

// next two days/////////
let TomorrowName = document.getElementsByClassName('TomorrowName');
let TomorrowIcon = document.getElementsByClassName('TomorrowIcon');
let maxTemp = document.getElementsByClassName('maxTemp');
let minTemp = document.getElementsByClassName('minTemp');
let tomorrowState = document.getElementsByClassName('tomorrowState');

// search input///////
let search = document.getElementById('search');

async function getWeatherData(cityName){
    // https://api.weatherapi.com/v1/current.json?key=9cef9568fc064240a5d214437250201&q=${cityName}&aqi=no

    let weatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=9cef9568fc064240a5d214437250201&q=${cityName}&&days=3`);
    let weatherResponse = await weatherData.json();
    return weatherResponse;      
}


// display today///
function displayToday(data){
    todayCity.innerHTML = data.location.name;
    todayTemprature.innerHTML = data.current.temp_c;
    todayState.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity;
    wind.innerHTML  = data.current.wind_kph;
    windDirection.innerHTML = data.current.wind_dir;
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleString('en-us',{weekday:'long'});
    todayNumber.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleString('en-us',{month:'long'});
    if(todayState.innerHTML == 'Sunny'){
        todayIcon.setAttribute('src', 'images/113.png');
    }
    else if(todayState.innerHTML == 'Partly cloudy'){
        todayIcon.setAttribute('src', 'images/weather-icon.webp');
    }
    else if(todayState.innerHTML == 'Patchy rain nearby'){
        todayIcon.setAttribute('src', 'images/6142570.png');
    }
    else if(todayState.innerHTML == 'Moderate rain'){
        todayIcon.setAttribute('src', 'images/weather07-512.webp');
    }
    else if(todayState.innerHTML == 'Heavy rain'){
        todayIcon.setAttribute('src', 'images/weather07-512.webp');
    }
    else if(todayState.innerHTML == 'Mist'){
        todayIcon.setAttribute('src', 'images/2264658.png');
    }
    else if(todayState.innerHTML == 'Overcast' ){
        todayIcon.setAttribute('src', 'images/178338.png');
    }
    else if(todayState.innerHTML == 'Patchy light rain in area with thunder' ){
        todayIcon.setAttribute('src', 'images/1779927.png');
    }
    else if(todayState.innerHTML == 'Clear' ){
        todayIcon.setAttribute('src', 'images/3032746.png');
    }
    else{
        todayIcon.setAttribute('src', 'images/178338.png');
    }
}

// next two days///
function displayNextDays(data){
    let forecast = data.forecast.forecastday;
    for(let i=0; i<2; i++){
        let tomorrowDate = new Date(forecast[i+1].date);
        TomorrowName[i].innerHTML = tomorrowDate.toLocaleDateString('en-us', {weekday:"long"})
        maxTemp[i].innerHTML = forecast[i+1].day.maxtemp_c;
        minTemp[i].innerHTML = forecast[i+1].day.mintemp_c;
        tomorrowState[i].innerHTML = forecast[i+1].day.condition.text;
        if(tomorrowState[i].innerHTML == 'Sunny'){
            TomorrowIcon[i].setAttribute('src', 'images/113.png');
        }
        else if(tomorrowState[i].innerHTML == 'Partly Cloudy'){
            TomorrowIcon[i].setAttribute('src', 'images/weather-icon.webp');
        }
        else if(tomorrowState[i].innerHTML == 'Patchy rain nearby'){
            TomorrowIcon[i].setAttribute('src', 'images/6142570.png');
        }
        else if(tomorrowState[i].innerHTML == 'Moderate rain'){
            TomorrowIcon[i].setAttribute('src', 'images/weather07-512.webp');
        }
        else if(tomorrowState[i].innerHTML == 'Heavy rain'){
            TomorrowIcon[i].setAttribute('src', 'images/weather07-512.webp');
        }
        else if(tomorrowState[i].innerHTML == 'Mist'){
            TomorrowIcon[i].setAttribute('src', 'images/2264658.png');
        }
        else if(tomorrowState[i].innerHTML == 'Overcast'){
            TomorrowIcon[i].setAttribute('src', 'images/178338.png');
        }
        else if(tomorrowState[i].innerHTML == 'Patchy light rain in area with thunder'){
            TomorrowIcon[i].setAttribute('src', 'images/1779927.png');
        }
        else if(tomorrowState[i].innerHTML == 'Clear'){
            TomorrowIcon[i].setAttribute('src', 'images/3032746.png');
        }
        else{
            TomorrowIcon[i].setAttribute('src', 'images/178338.png');
        }
    }
}

// final data///
async function startApp(city='cairo'){
    let weatherResponse = await getWeatherData(city);
    if (!weatherResponse.error){
        displayToday(weatherResponse);
        displayNextDays(weatherResponse);
    }
    
}
startApp();

search.addEventListener('input', function(){
    startApp(search.value);
    
})
