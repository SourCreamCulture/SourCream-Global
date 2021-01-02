const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports.run = async (bot, message, args) => {

    let embed = new MessageEmbed()
      .setTitle("**SourCreams Global Help**")
      .setDescription(`➜ For help, join our **[Support Server](https://discord.gg/9nCn6y6s2p)**\n➜ **_about** for Information`)
      .setThumbnail(`https://i.ibb.co/9ZXWfqb/global-icon-13.png`)
      .addField("**Commands**", stripIndents`
      **\`_help - to see the commands for the bot\`**
      **\`_help2 - to see the next commands page for the bot\`**
      **\`_helpm - to see the music commands for the bot\`**
      **\`_helpt - to see the tag commands for the bot\`**
      **\`_meme - to see memes from reddit!\`**
      **\`_weather <city> - to see the weather from that city\`**
      **\`||_email <address> <message> - to send emails! COMING SOON!||\`**
      **\`_urban <thing> - to search the urban dictionary\`**
      **\`_cases <country> - to see the coronavirus stats of a country\`**
      **\`_stock <stock symbol> - to see stock information\`**
      **\`More Commands Coming Soon!\`**
      `, true)
      .addField("**Moderation**", stripIndents`
      **\`_kick - to kick a user\`**
      **\`_ban - to ban a user\`**
      **\`_lockdown <on> or <off> - to lock or unlock the server\`**
      **\`More Moderation Commands Coming Soon!\`**
      `, true)
      .setColor("#E0E0D2")
      .setFooter(`Prefix » _`)

    message.channel.send(embed);

}

module.exports.help = {
  name: "help",
  aliases: ["help", "help"]
}