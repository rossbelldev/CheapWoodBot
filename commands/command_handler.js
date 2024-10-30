import { InteractionResponseType } from "discord-interactions";

export async function handleCommand(data, res) {
    const { name } = data;

        switch(name) {
            case 'test':
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: `Hello, wood`,
                    },
                });
            case 'shunquote':
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: `I don't find it funny, funnily enough`,
                    }
                });
            default:
                console.error(`Unknown command: ${name}`);
                return res.status(400),json({ error: 'Unknown command' });
        }
}