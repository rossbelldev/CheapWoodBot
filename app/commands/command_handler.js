import { InteractionResponseType } from "discord-interactions";
import { COMMANDS } from "./all_commands.js";
import { getShunQuote } from "./command_shunquote_handler.js";
import { diceRollHandler } from "./command_dice_handler.js";

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
            message = getShunQuote();
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: { content: message }
            });
        case COMMANDS.DICE:
            const [{ value : diceToRoll }] = options;
            message = `Rolling ${diceToRoll}... It's: ` + diceRollHandler(diceToRoll);
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: { content: message }
            });
        default:
            console.error(`Unknown command: ${name}`);
            return res.status(400).json({ error: 'Unknown command' });
    }
}