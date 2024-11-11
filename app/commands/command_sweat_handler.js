import { sendMessage, editMessage, listenForReactions } from '../utils/message_utils.js';
import { green, red } from '../utils/colors.js';

export function handleSweats() {
    try {
        sweatsMessageHandler();
        return `Sweats message sent!`;
    } catch (error) {
        console.error('Error handling sweats command:', error);
    }
    return `Failed to send sweats message.`;
}

async function sweatsMessageHandler() {
    try {
        const channelId = process.env.CHANNEL_ID_CSWEATS;
        const embed = {
            title: 'Sweats!',
            description: 'React with 💧 to sign up for sweats today! \nCurrent signups: \n None',
            color: green,
        };
        const messageId = await sendMessage(channelId, '', [embed], ["💧"], {});
        const intervalId = listenForReactions(channelId, messageId, "💧", editMessageOnReaction);
        if (intervalId === null) {
            return;
        }
        setTimeout(() => clearInterval(intervalId), 1000 * 60 * 60 * 24); // 24 hours
    } catch (error) {
        console.error(error);
        throw new Error('Error handling sweats message');
    }
}

async function editMessageOnReaction(messageId, channelId, users) {
    var users = users.map(user => `<@${user.id}>`);
    var color = green;
    if (users.length >= 5) {
        color = red;
    }
    const embed = {
        title: 'Sweats!',
        description: `React with 💧 to sign up for sweats today! \nCurrent signups: \n ${users.join('\n')}`,
        color: color,
    };
    editMessage(channelId, messageId, '', [embed], { parse: ['users'] });
}