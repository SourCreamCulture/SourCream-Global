const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const { EconomyManager } = require("quick.eco")
const eco = new EconomyManager({
    adapter: 'sqlite'
});


module.exports = {
  info: {
    name: "balance",
    description: "balance",
    usage: "[bal]",
    aliases: ["bal"],
  },

  run: async function (client, message, args) {
    let money = await eco.fetchMoney(message.author.id);
        return message.channel.send(`${message.author} has ${money} coins.`);
  },
};