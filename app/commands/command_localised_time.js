export function getLocalisedTime(date, time, timezone) {
    return `<t:${getUnixTimeInSeconds(date, time, timezone)}:F>`;
}

function getUnixTimeInSeconds(date, time, timezone) { 
    const dateTime = `${date}T${time}${timezone}`;
    const outputDate = new Date(dateTime);
    return Math.floor(outputDate.getTime() / 1000);
}