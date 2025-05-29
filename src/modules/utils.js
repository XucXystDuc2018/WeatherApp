export function getweekDayFromDate(dateString){
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = new Date(dateString);
    
    //return date.toLocaleDateString('en-US', { weekday: 'short' });
    return weekDays[day.getDay()];
}

export async function getIconURL(weatherIconData){
    try{
        const iconURL = await import(`../iconAssets/${weatherIconData}.svg`);
        return iconURL.default;
    } catch(error){
        console.error(error + `: Could not retrieve icon ${weatherIconData}`)
    }
    return ''; //optional: if cannot retrieve a url, leave a blank
    
}