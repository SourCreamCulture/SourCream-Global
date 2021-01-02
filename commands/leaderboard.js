const Discord = require("discord.js");
const fs = require('fs');
const { EconomyManager } = require("quick.eco")
const eco = new EconomyManager({
    adapter: 'sqlite'
});


module.exports = {
  info: {
    name: "leaderboard",
    description: "leaderboard",
    usage: "[lb]",
    aliases: ["lb"],
  },

  run: async function (client, message, args) {
    let lb = await eco.leaderboard(false, 10);
        const embed = new Discord.MessageEmbed()
        .setAuthor("Leaderboard")
        .setColor("BLURPLE");
        lb.forEach(u => {
            embed.addField(`${u.position}. ${client.users.cache.get(u.user).tag}`, `Money: ${u.money} 💸`);
        });
        return message.channel.send(embed);
  },
};