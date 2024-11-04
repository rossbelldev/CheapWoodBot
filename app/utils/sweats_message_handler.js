import { DiscordRequest } from './discord_request.js';
import { EventEmitter } from 'events';


export async function sweatsMessageHandler() {
    try {
        const channelId = process.env.CHANNEL_ID_CSWEATS;
        const messageId = await sendMessage(channelId);
        const intervalId = listenForReactions(channelId, messageId);
        setTimeout(() => clearInterval(intervalId), 1000 * 60 * 60 * 24); // 24 hours
    } catch (error) {
        console.error(error);
    }
}


function listenForReactions(channelId, messageId) {
    const endpoint = `channels/${channelId}/messages/${messageId}/reactions/%F0%9F%92%A7`;
    const listener = new EventEmitter();
    let previousUsers = [];
    try {
        const reactioncheck = setInterval(async () => {
            const response = await DiscordRequest(endpoint, {
                method: 'GET',
            });
            const users = await response.json();
            const userIds = users.map(user => user.id);

            if (JSON.stringify(userIds) !== JSON.stringify(previousUsers)) {
                previousUsers = userIds;
                listener.emit('reaction', users);
            }
        }, 5000); // Check every 5 seconds

        listener.on('reaction', async (users) => {
            users = users.filter(user => !user.bot);
            if (users.length != 0) {
                removeOwnReaction(channelId, messageId);
            } else {
                addOwnReaction(channelId, messageId);
            }
            editMessage(channelId, messageId, users);
        });

        return reactioncheck;
    } catch (error) {
        console.error(error);
    }
    return null;
}


export async function sendMessage(channelId) {
    try {
        const endpoint = `channels/${channelId}/messages`;
        const response = await DiscordRequest(endpoint, {
            method: 'POST',
            body: {
                embeds: [{
                    title: 'Sweats Today!',
                    description: 'React with 💧 to sign up for sweats today!\nCurrent signups: None',
                    color: 0x00ff00,
                }],
            }
        });
        const message = await response.json();
        addOwnReaction(channelId, message.id);
        return message.id;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export async function editMessage(channelId, messageId, users) {
    try {
        const endpoint = `channels/${channelId}/messages/${messageId}`;
        const formattedUserList = users.map(user => `<@${user.id}>`).join('\n');
        await DiscordRequest(endpoint, {
            method: 'PATCH',
            body: {
                embeds: [{
                    title: 'Sweats Today!',
                    description: 'React with 💧 to sign up for sweats today! \nCurrent signups: \n' + formattedUserList,
                    color: 0x00ff00,
                }],
                allowed_mentions: {
                    "parse": ["users"],
                },
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export async function removeOwnReaction(channelId, messageId) {
    const endpoint = `channels/${channelId}/messages/${messageId}/reactions/%F0%9F%92%A7/@me`;
    try {
        await DiscordRequest(endpoint, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error(error);
    }
}

export async function addOwnReaction(channelId, messageId) {
    const endpoint = `channels/${channelId}/messages/${messageId}/reactions/%F0%9F%92%A7/@me`;
    try {
        await DiscordRequest(endpoint, {
            method: 'PUT',
        });
    } catch (error) {
        console.error(error);
    }
}