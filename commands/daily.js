const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { EconomyManager } = require("quick.eco")
const eco = new EconomyManager({
    adapter: 'sqlite'
});


module.exports = {
  info: {
    name: "daily",
    description: "daily",
    usage: "[daily]",
    aliases: ["daily"],
  },

  run: async function (client, message, args) {
    let add = await eco.daily(message.author.id, false, 500);
        if (add.cooldown) return message.reply(`You already claimed your daily coins. Come back after ${add.time.days} days, ${add.time.hours} hours, ${add.time.minutes} minutes & ${add.time.seconds} seconds.`);
        return message.reply(`you claimed ${add.amount} as your daily coins and now you have total ${add.money} coins.`);
  },
};