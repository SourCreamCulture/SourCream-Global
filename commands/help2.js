const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports.run = async (bot, message, args) => {

    let embed = new MessageEmbed()
      .setTitle("**SourCreams Global Help**")
      .setDescription(`➜ For help, join our **[Support Server](https://discord.gg/9nCn6y6s2p)**\n➜ **_about** for Information`)
      .setThumbnail(`https://i.ibb.co/9ZXWfqb/global-icon-13.png`)
      .addField("**Commands**", stripIndents`
      **\`_updates - to see the recent updates made to the bot!\`**
      **\`_serverinfo - shows information about the server you are in\`**
      **\`_ping - to see the bots ping\`**
      **\`_uptime - to see the bots uptime\`**
      **\`_docs - provides a link to the discord.js docs\`**
      **\`_profile - to see some stats about yourself\`**
      **\`_website - provides the bot website link\`**
      **\`_invite - provides the invite link for the bot\`**
      **\`_vote - provides the link to vote for the bot on top.gg\`**
      **\`_setup - to setup the discord server to work with the welcome and global chat features!\`**
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
  name: "help2",
  aliases: ["help2", "help2"]
}