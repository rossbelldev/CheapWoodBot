export function getLocalisedTime(dateTime) {
    return `<t:${getUnixTimeInSeconds(dateTime)}:F>`;
}

function getUnixTimeInSeconds(dateTime) { 
    const date = new Date(dateTime);
    return Math.floor(date.getTime() / 1000);
}