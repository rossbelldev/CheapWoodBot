import { getDiscordFormattedUnixTime } from "../utils/time_tools.js";

export function handleLocalisedTimeCommand(options) {
    try {
        const [{ value : date }, { value : time }, { value : timezone }] = options;
        return getDiscordFormattedUnixTime(date, time, timezone);
    } catch (error) {
        return error;
    }
} 