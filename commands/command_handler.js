import { InteractionResponseType } from "discord-interactions";
import { COMMANDS } from "./all_commands.js";

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
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: `I don't find it funny, funnily enough`,
                    }
                });
            default:
                console.error(`Unknown command: ${name}`);
                return res.status(400).json({ error: 'Unknown command' });
        }
}