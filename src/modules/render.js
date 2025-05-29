import { getAppState, processData } from "./dataProcessing.js"
import { getweekDayFromDate, getIconURL } from "./utils.js";


const weatherInfoContainer = document.querySelector('[data-weather-info-container]')


export async function render(){
    weatherInfoContainer.innerHTML = ''; //clear previous info
    const weatherData = processData(getAppState().weatherObj);

    //this is not really an efficient way, since the program has to wait to retrieve all the icons
    //before rendering the weather data, so yeah, but I will fix it someday
    const icon = await getIconURL(weatherData.iconData); //wait for the iconURL to load
    
    const iconsArr = [];
    for (let i = 0; i < 6; i++){
        iconsArr.push(await getIconURL(weatherData.days[i].icon));
    }
    
    //const nextDayIcon = getIconURL(weatherData.days[0].icon);
    weatherInfoContainer.innerHTML = addHTMLTemplate(weatherData, icon, iconsArr);

    
}

function addHTMLTemplate(weatherData, icon, iconsArr){
    const weatherUnit = getAppState().unit === 'metric'? '°C' : '°F';
    return `<div class="weather-info-card">
            <section class="weather-header">
                <div>
                    <h1>My location</h1>
                    <div class="location-data" aria-label="Location">${weatherData.locationData}</div>
                    <div class="weather-data-temperature" aria-label="Temperature">${weatherData.tempData}${weatherUnit}</div>
                </div>
                <div>
                    <div class="date-data">${getweekDayFromDate(weatherData.dateData)}, ${weatherData.dateData}</div>
                    <img class="header-weather-icon" src=${icon} alt="weather-icon"/>
                    <div class="conditions-data">${weatherData.conditionsData}</div>
                </div>
                <div></div>
                
            </section>
            <hr/>
            <section class="weather-details">
                <div>
                    <div class="weather-data-humidity" aria-label="Humidity"><span>Humidity:</span>${weatherData.humidityData}%</div>
                </div>
                <div>
                    <div class="weather-data-day-description" aria-label="Day description">${weatherData.dayDescription}</div>
                    <div class="weather-data-tempmin-tempmax" aria-label="tempmin and tempmax"><span>Tempmin:${weatherData.tempminData}${weatherUnit} Tempmax:${weatherData.tempmaxData}${weatherUnit}</span></div>
                </div>
            </section>
            <hr/>
            <h1 class="seven-day-forecast-header">7-DAY FORECAST:</h1>
            <section class="seven-day-forecast">
                <article class="each-day-weather-card">
                    <div class="each-day-date-data"><h2>${getweekDayFromDate(weatherData.days[0].datetime)}</h2></div>
                    <img class="day-weather-icon" src=${iconsArr[0]} alt="day-weather-icon"/>
                    <div class="each-day-temp-minmax-data"><span>${weatherData.days[0].tempmin}${weatherUnit} ${weatherData.days[0].tempmax}${weatherUnit}</span></div>
                </article>
                <article class="each-day-weather-card">
                    <div class="each-day-date-data"><h2>${getweekDayFromDate(weatherData.days[1].datetime)}</h2></div>
                    <img class="day-weather-icon" src=${iconsArr[1]} alt="day-weather-icon"/>
                    <div class="each-day-temp-minmax-data"><span>${weatherData.days[1].tempmin}${weatherUnit} ${weatherData.days[1].tempmax}${weatherUnit}</span></div>
                </article>
                <article class="each-day-weather-card">
                    <div class="each-day-date-data"><h2>${getweekDayFromDate(weatherData.days[2].datetime)}</h2></div>
                    <img class="day-weather-icon" src=${iconsArr[2]} alt="day-weather-icon"/>
                    <div class="each-day-temp-minmax-data"><span>${weatherData.days[2].tempmin}${weatherUnit} ${weatherData.days[2].tempmax}${weatherUnit}</span></div>
                </article>
                <article class="each-day-weather-card">
                    <div class="each-day-date-data"><h2>${getweekDayFromDate(weatherData.days[3].datetime)}</h2></div>
                    <img class="day-weather-icon" src=${iconsArr[3]} alt="day-weather-icon"/>
                    <div class="each-day-temp-minmax-data"><span>${weatherData.days[3].tempmin}${weatherUnit} ${weatherData.days[3].tempmax}${weatherUnit}</span></div>
                </article>
                <article class="each-day-weather-card">
                    <div class="each-day-date-data"><h2>${getweekDayFromDate(weatherData.days[4].datetime)}</h2></div>
                    <img class="day-weather-icon" src=${iconsArr[4]} alt="day-weather-icon"/>
                    <div class="each-day-temp-minmax-data"><span>${weatherData.days[4].tempmin}${weatherUnit} ${weatherData.days[4].tempmax}${weatherUnit}</span></div>
                </article>
                <article class="each-day-weather-card">
                    <div class="each-day-date-data"><h2>${getweekDayFromDate(weatherData.days[5].datetime)}</h2></div>
                    <img class="day-weather-icon" src=${iconsArr[5]} alt="day-weather-icon"/>
                    <div class="each-day-temp-minmax-data"><span>${weatherData.days[5].tempmin}${weatherUnit} ${weatherData.days[5].tempmax}${weatherUnit}</span></div>
                </article>         
            </section>
        </div>
        `
}