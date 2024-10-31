import 'dotenv/config';

export async function showRegisteredCommands() {
    const url = `https://discord.com/api/v10/applications/${process.env.APP_ID}/commands`;
    const res = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        }
    });

    const data = await res.json()
    console.log("Commands on remote: \n", data)
}
