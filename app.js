import 'dotenv/config';
import express from 'express';
import {
    InteractionType,
    InteractionResponseType,
    verifyKeyMiddleware,
} from 'discord-interactions';
import { handleCommand } from './commands/command_handler.js';

const app = express(); 
const PORT = process.env.PORT || 3000;

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
    const { type, data } = req.body;

    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
        return handleCommand(data, res)
    }

    console.error(`Unknown interaction type`, type);
    return res.status(400).json({ error: 'Unknown interaction type' })
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
