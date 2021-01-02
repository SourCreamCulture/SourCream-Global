const Discord = require("discord.js")
const botconfig = require("../config.json");
const process = require('process');


module.exports.run = async (bot, message, args) => {

    if(message.author.id != "461959539114246175") return message.channel.send("You're not the bot owner!")

    try {
        await message.channel.send("Bot is shutting down...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
    


}


module.exports.config = {
    name: "shutdown",
    description: "shuts down the bot!",
    usage: "!shutdown",
    accessableby: "Bot Owner",
    aliases: ["botstop"]
}