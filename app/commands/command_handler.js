import { InteractionResponseType } from "discord-interactions";
import { COMMANDS } from "./all_commands.js";
import { handleShunQuote } from "./command_shunquote_handler.js";
import { handleDiceRoll } from "./command_dice_handler.js";
import { getDiscordFormattedUnixTime } from "./command_localised_time.js";

export async function handleCommand(data, res) {
    const { name } = data;
    const { options } = data;

    let message;
    switch(name) {
        case COMMANDS.TEST:
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: { content: `Hello, wood` },
            });
        case COMMANDS.QUOTE:
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: { content: handleShunQuote(options) }
            });
        case COMMANDS.DICE:
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: { content: handleDiceRoll(options) }
            });
        case COMMANDS.LOCALISED_TIME:
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: { content: getDiscordFormattedUnixTime(options) }
            });
        default:
            console.error(`Unknown command: ${name}`);
            return res.status(400).json({ error: 'Unknown command' });
    }
}