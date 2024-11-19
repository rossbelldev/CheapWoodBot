import { DiscordRequest } from './discord_request.js';
import { EventEmitter } from 'events';

export function listenForReactions(channelId, messageId, emoji, updateFunction) {
    if (parameterNull([channelId, messageId, emoji, updateFunction])) return;
    const endpoint = `channels/${channelId}/messages/${messageId}/reactions/` + encodeURIComponent(emoji);
    const listener = new EventEmitter();
    let previousUserIDs = [];
    try {
        const intervalId = setInterval(async () => {
            var response;
            response = await fetchReactions(endpoint, intervalId);
            if (!response) return;
            const users = await response.json();
            const userIds = users.map(user => user.id);

            if (JSON.stringify(userIds) !== JSON.stringify(previousUserIDs)) {
                previousUserIDs = userIds;
                listener.emit('reaction', users);
            }
        }, 5000); // Check every 5 seconds

        handleReactionUpdates(listener, channelId, messageId,emoji, updateFunction);

        return intervalId; 
    } catch (error) {
        console.error(error);
    }
    return null;
}


function handleReactionUpdates(listener, channelId, messageId,emoji, callback) {
    listener.on('reaction', async (users) => {
        users = users.filter(user => !user.bot);
        if (users.length != 0) {
            removeOwnReaction(channelId, messageId, emoji);
        } else {
            addOwnReaction(channelId, messageId,emoji);
        }
        if (typeof callback === 'function') {
            try {
                callback(messageId,channelId,users);
            } catch (error) {
                console.error(error);
            }
        }
    });
}

async function fetchReactions(endpoint, intervalId) {
    var response = null;
    try {
        response = await DiscordRequest(endpoint, {
            method: 'GET',
        });
    } catch (error) {
        console.log(error);
        const errorObj = JSON.parse(error.message);
        if (errorObj.code === 10008) {
            clearInterval(intervalId);
            console.error('Message not found, stopping reaction check');
            return null;
        } else {
            console.log(error);
            return null;
        }
    }
    return response;
}

export async function sendMessage(channelId, content, embeds, reactions, allowedMentions ){
    try {
        if(parameterNull([channelId,content,embeds,reactions,allowedMentions])) return;
        const endpoint = `channels/${channelId}/messages`;
        const response = await DiscordRequest(endpoint, {
            method: 'POST',
            body: {
                content: content,
                embeds: embeds,
                allowedMentions: allowedMentions
            }
        });
        const message = await response.json();

        for (const emoji of reactions) {
            await addOwnReaction(channelId, message.id, emoji);
        }

        return message.id;
    } catch (error) {
        console.error('Error sending message:', error);
    }
    return null;
}

export async function editMessage(channelId, messageId, content, embeds, allowedMentions) {
    try {
        if (parameterNull([channelId,messageId,content,embeds,allowedMentions])) return;
        const endpoint = `channels/${channelId}/messages/${messageId}`;
        await DiscordRequest(endpoint, {
            method: 'PATCH',
            body: {
                content: content,
                embeds: embeds,
                allowed_mentions: allowedMentions,
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export async function removeOwnReaction(channelId, messageId, emoji) {
    if(parameterNull([channelId,messageId,emoji])) return;
    const endpoint = `channels/${channelId}/messages/${messageId}/reactions/` + encodeURIComponent(emoji) + `/@me`;
    try {
        await DiscordRequest(endpoint, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error(error);
    }
}

export async function addOwnReaction(channelId, messageId, emoji) {
    if (parameterNull([channelId,messageId,emoji])) return;
    const endpoint = `channels/${channelId}/messages/${messageId}/reactions/` + encodeURIComponent(emoji) + `/@me`;
    try {
        await DiscordRequest(endpoint, {
            method: 'PUT',
        });
    } catch (error) {
        console.error(error);
    }
}

function parameterNull(paramList) {
    for (const param of paramList) {
        if (param===null || param===undefined) {
            console.error('Invalid parameter:', param);
            return true;
        }
    }
    return false;

}