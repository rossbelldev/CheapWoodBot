import { 
    getFormattedDateTimeString,
    getUnixTimeInSeconds,
} from "../utils/time_tools.js";

export function getLocalisedTime(date, time, timezone) {
    let formattedDateTime;
    try {
        formattedDateTime = getFormattedDateTimeString(date, time, timezone);
    } catch (error) {
        return error;
    }

    return `<t:${getUnixTimeInSeconds(formattedDateTime)}:F>`;
}