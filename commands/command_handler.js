import { InteractionResponseType } from "discord-interactions";
import { COMMANDS } from "./all_commands.js";
import { getShunQuote } from "./command_shunquote_handler.js";

export async function handleCommand(data, res) {
    const { name } = data;

        switch(name) {
            case COMMANDS.TEST:
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: `Hello, wood`,
                    },
                });
            case COMMANDS.QUOTE:
                let message = getShunQuote();
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: { content: message }
                });
            default:
                console.error(`Unknown command: ${name}`);
                return res.status(400).json({ error: 'Unknown command' });
        }
}