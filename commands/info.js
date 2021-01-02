const { MessageEmbed } = require('discord.js');

exports.run = (bot, message, args, func) => {

    if(message.content.startsWith(prefix + "info")){
    message.delete({ timeout: 1000 });    
    let startTime = message.createdTimestamp;
    let endTime = new Date().getTime()
    let embed = new Discord.MessageEmbed()
    .setThumbnail(bot.user.avatarURL)
    .setAuthor(`: ${message.author.tag}`,message.author.avatarURL)
    .setTitle("**Here is the ping and uptime of the bot!**")
    .addField("Order made on the Channel", message.channel)
    .setColor("RANDOM")
    .addField(":ping_pong: **PING: " + Math.round(endTime - startTime) + " ms.**", "**PONG !** :ping_pong: 😲")
    .addField('The bot has been online for', (Math.round(bot.uptime / (1000 * 60 * 60))) + " hours, " + (Math.round(bot.uptime / (1000 * 60)) % 60) + " minutes, and " + (Math.round(bot.uptime / 1000) % 60) + " seconds")
    .setFooter("Order request by " + message.author.tag)
    .setTimestamp()
    message.channel.send(embed)
    }
};



module.exports.help = {
  name: "info",
  aliases: ["info"]
}