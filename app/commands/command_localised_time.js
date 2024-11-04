import { 
    getFormattedDateTimeString,
    getUnixTimeInSeconds,
} from "../utils/time_tools.js";

export function getDiscordFormattedUnixTime(options) {
    let formattedDateTime;
    try {
        const [{ value : date }, { value : time }, { value : timezone }] = options;
        formattedDateTime = getFormattedDateTimeString(date, time, timezone);
    } catch (error) {
        return error;
    }

    return `<t:${getUnixTimeInSeconds(formattedDateTime)}:F>`;
}