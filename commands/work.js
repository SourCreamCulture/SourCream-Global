const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { EconomyManager } = require("quick.eco")
const eco = new EconomyManager({
    adapter: 'sqlite'
});


module.exports = {
  info: {
    name: "work",
    description: "daily",
    usage: "[daily]",
    aliases: ["daily"],
  },

  run: async function (client, message, args) {
    let work = await eco.work(message.author.id, false, 200);
        if (work.cooldown) return message.reply(`You already worked for now. Come back after ${work.time.minutes} minutes & ${work.time.seconds} seconds.`);
        return message.reply(`you claimed ${work.money} as your work coins and now you have total ${work.amount} coins.`);
  },
};