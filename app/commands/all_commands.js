import 'dotenv/config';
import { InstallGlobalCommands } from '../utils/discord_request.js';

/** 
 * Discord official docs for commands:
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
 */  

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
    options: [
        {
            name: 'question',
            type: 3, // String 
            description: 'The question you wish to ask the big man',
            required: false
        }
    ]
}

const DICE_COMMAND = {
    name: 'dice',
    description: 'Rolls some dice',
    type: 1, 
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
        {
            name: 'dice_to_roll',
            type: 3, // 3: String 
            description: 'The name of the dice you wish to roll, (D2, D4, D6, D8, D10, D12, D20, D100)',
            required: true
        }
    ]
}

const LOCALISED_TIME_COMMAND = {
    name: 'localised_time',
    description: 'Provides a discord-friendly (unix) localised time from a command to save you going and getting it from some external site.',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    options: [
        {
            name: 'datetime',
            type: 3, // String
            description: 'Enter the datetime in this format: HH:mm dd/MM/yyyy',
            required: false
        }
    ]
}

const ALL_COMMANDS = [TEST_COMMAND, QUOTE_COMMAND, DICE_COMMAND, LOCALISED_TIME_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);

export const COMMANDS = Object.freeze({
    TEST: TEST_COMMAND.name,
    QUOTE: QUOTE_COMMAND.name,
    DICE: DICE_COMMAND.name,
    LOCALISED_TIME: LOCALISED_TIME_COMMAND.name
});
