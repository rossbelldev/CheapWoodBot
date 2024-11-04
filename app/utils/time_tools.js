export function getFormattedDateTimeString(date, time, timezone) {
    validateDateTimeFormat(date, time, timezone);
    return `${date}T${time}${timezone}`;
}

function validateDateTimeFormat(date, time, timezone) {
    const dateFormatRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    const timeFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    const timezoneFormatRegex = /^[+-]((0[0-9]|1[0-1]):[0-5][0-9])|12:00$/;

    if (!dateFormatRegex.test(date)) {
        throw "Date in incorrect format";
    } else if (!timeFormatRegex.test(time)) {
        throw "Time in incorrect format";
    } else if (!timezoneFormatRegex.test(timezone)) {
        throw "Timezone in incorrect format";
    }
}

export function getUnixTimeInSeconds(formattedDateTime) { 
    const date = new Date(formattedDateTime);
    return Math.floor(date.getTime() / 1000);
}