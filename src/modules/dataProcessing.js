import {API_KEY} from "./apiKey.js"

//data state
let state = {weatherObj: {}, unit: ''};

export function getAppState(){
    return state;
}

export function setAppState(newWeatherObj, newUnit){
    state.weatherObj = newWeatherObj;
    state.unit = newUnit;
}

//data fetch
export async function fetchWeather(location, unit){
    let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&iconSet=icons2&key=${API_KEY}`;
    try {
        const response = await fetch(apiURL, {mode: 'cors'});
        if (response.ok){
            const weatherData = await response.json();
            return weatherData;
        } else {
            console.log('Error. Bad request')
        }
    } catch(error){
        console.error(error + ': Could not retrieve the data.');
    }
}

//data process
export function processData(weatherData){
    const locationData = weatherData.resolvedAddress;
    const dateData = weatherData.days[0].datetime;
    const conditionsData = weatherData.currentConditions.conditions;

    const tempData = weatherData.currentConditions.temp;
    const humidityData = weatherData.currentConditions.humidity;
    const dayDescription = weatherData.days[0].description;
    const tempminData = weatherData.days[0].tempmin;
    const tempmaxData = weatherData.days[0].tempmax;
    const iconData = weatherData.currentConditions.icon;

    const days = weatherData.days.slice(1, 7).map(day => ({
        datetime: day.datetime,
        icon: day.icon,
        tempmin: day.tempmin,
        tempmax: day.tempmax
    }))

    return {locationData, dateData, conditionsData, tempData, humidityData, dayDescription, tempminData, tempmaxData, iconData, days}
}
