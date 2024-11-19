import { InteractionResponseType } from "discord-interactions";
import { COMMANDS } from "./all_commands.js";
import { handleShunQuote } from "./command_shunquote_handler.js";
import { diceRollHandler } from "./command_dice_handler.js";
import { handleLocalisedTimeCommand } from "./command_localised_time_handler.js";

export async function handleCommand(data, res) {
    const { name } = data;
    const { options } = data;

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
                data: { content: diceRollHandler(options) }
            });
        case COMMANDS.LOCALISED_TIME:
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: { content: handleLocalisedTimeCommand(options) }
            });
        default:
            console.error(`Unknown command: ${name}`);
            return res.status(400).json({ error: 'Unknown command' });
    }
}