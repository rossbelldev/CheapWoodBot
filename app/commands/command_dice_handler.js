import { 
    DICE_ROLLS,
    d2,
    d4,
    d6,
    d8,
    d10,
    d12,
    d20,
    d100
 } from "../utils/dice_rolls.js";

export function diceRollHandler(options) {
    const [{ value : diceToRoll }] = options;
    try {
        return `Rolling ${diceToRoll.toUpperCase()} ... It's: ` + rollDice(diceToRoll) + `!`;
    } catch (error) {
        return error
    }
}

function rollDice(diceToRoll) {
    switch (diceToRoll.toLowerCase()) {
        case DICE_ROLLS.D2:
            return d2();
        case DICE_ROLLS.D4:
            return d4();
        case DICE_ROLLS.D6:
            return d6();
        case DICE_ROLLS.D8:
            return d8();
        case DICE_ROLLS.D10:
            return d10();
        case DICE_ROLLS.D12:
            return d12();
        case DICE_ROLLS.D20:
            return d20();
        case DICE_ROLLS.D100:
            return d100();
        default: 
            throw `Not valid dice option, please select D2, D4, D6, D8, D10, D12, D20 or D100`;
    }
}