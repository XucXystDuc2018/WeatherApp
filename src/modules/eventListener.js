import { fetchWeather, getAppState, setAppState } from "./dataProcessing.js";
import { render } from "./render.js";

const form = document.querySelector('[data-form]')
const unitSelection = document.querySelector('[data-unit-select]')
const locationInput = document.querySelector('[data-location-input]');
const statusText = document.querySelector('[data-status-text]');

export function setupFormSubmitListener(){

    form.addEventListener('submit', async (e) => { 
        e.preventDefault();
        statusText.textContent = 'Loading...';
        const unit = unitSelection.value;
        const location = locationInput.value;
        if (!location) return;
        
        try {
            const weatherData = await fetchWeather(location, unit);
            setAppState(weatherData, unit);
            render()
        } catch (error) {
            console.error('Error fetching weather data:', error);
        } finally {
            // Hide loading when done
            if (statusText) statusText.textContent = '';
        }
        
    })


}