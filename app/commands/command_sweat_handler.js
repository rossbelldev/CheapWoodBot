import { sendMessage, editMessage, listenForReactions } from '../utils/message_utils.js';
import { green, red } from '../utils/colors.js';
import { millisecondsFor24h } from '../utils/time_tools.js';

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
        const embed = createEmbed([], green);
        if (embed === null) {
            return;
        }
        const messageId = await sendMessage(channelId, '', [embed], ["💧"], {});
        const intervalId = listenForReactions(channelId, messageId, "💧", editMessageOnReaction);
        if (intervalId === null) {
            return;
        }
        setTimeout(() => clearInterval(intervalId), millisecondsFor24h); // 24 hours
    } catch (error) {
        console.error(error);
        throw new Error('Error handling sweats message');
    }
}

async function editMessageOnReaction(messageId, channelId, users) {
    var color = green;
    if (users.length >= 5) {
        color = red;
    }
    const embed = createEmbed(users, color);
    if (embed === null) {
        return;
    }
    editMessage(channelId, messageId, '', [embed], { parse: ['users'] });
}

function createEmbed(users, color) {
    let userlist = '';
    try{
        userlist = users.length > 0 ? users.map(user => `<@${user.id}>`).join('\n') : 'None';
    } catch (error) {
        console.error('Error creating embed:', error);
        return null;
    }
    return {
        title: 'Sweats!',
        description: `React with 💧 to sign up for sweats today! \nCurrent signups: \n ${userlist}`,
        color: color,
    };
}
