const { MessageEmbed } = require('discord.js');

exports.run = async (bot, message, args) => {
  
  const user = message.mentions.users.first() || bot.users.cache.get(args[0]) ||  message.author;
  
  const embed = new MessageEmbed()
    .setTitle(`**${user.username}#${user.discriminator}'s avatar**`) 
    .setColor("#e0e0d2")
    .setImage(user.displayAvatarURL({dynamic: true, size: 2048})) 
  
  message.channel.send(embed);
  
}

module.exports.help = {
  name: "avatar",
  aliases: ["icon"]
}