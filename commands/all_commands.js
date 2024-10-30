import 'dotenv/config';
import { InstallGlobalCommands } from '../utils/discord_request.js';

const TEST_COMMAND = {
    name: 'test',
    description: 'Basic command',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
};

const QUOTE_COMMAND = {
    name: 'shunquote',
    description: 'Provides a random Shaun quote',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
}

const DICE_COMMAND = {
    name: 'dice',
    description: 'Rolls some dice',
    type: 1, 
    integration_types: [0, 1],
    contexts: [0, 1, 2],
}

const ALL_COMMANDS = [TEST_COMMAND, QUOTE_COMMAND, DICE_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);

export const COMMANDS = Object.freeze({
    TEST: TEST_COMMAND.name,
    QUOTE: QUOTE_COMMAND.name,
    DICE: DICE_COMMAND.name
});
