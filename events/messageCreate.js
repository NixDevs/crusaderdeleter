const { Message } = require("discord.js");
const client = require("../index");
client.on("messageCreate", async (msg) => {
    
    if (msg.pinned) return;
    if ((await client.db.get('channel')) == msg.channelId && (await client.db.get('toggle')) == true) {
        try {
            msg.delete()
        } catch (err) {
            console.error(err);
        }
    }
})