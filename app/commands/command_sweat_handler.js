import { sweatsMessageHandler } from '../utils/sweats_message_handler.js';

export function handleSweats() {
    try {
        sweatsMessageHandler();
        return  `Sweats message sent!` ;
    } catch (error) {
        console.error('Error handling sweats command:', error);
    }
    return `Failed to send sweats message.`;
}