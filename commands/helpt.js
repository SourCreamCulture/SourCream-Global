const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports.run = async (bot, message, args) => {

    let embed = new MessageEmbed()
      .setTitle("**SourCreams Global Help**")
      .setDescription(`➜ For help, join our **[Support Server](https://discord.gg/9nCn6y6s2p)**\n➜ **_about** for Information`)
      .setThumbnail(`https://i.ibb.co/9ZXWfqb/global-icon-13.png`)
      .addField("**Tags**", stripIndents`
      **\`_tag <name>\`**
      **\`_addtag <name> <content>\`**
      **\`_edittag <name> <content>\`**
      **\`_deletetag <name>\`**
      **\`_taginfo <name>\`**
      **\`_taglist\`**
      `, true)
      .addField("**Miscallaneous**", stripIndents`
      **\`_help\`**
      **\`_avatar <user>\`**
      **\`_about\`**
      **\`_botstats\`**
      **\`_ping\`**
      **\`_say\`**
      `, true)
      .setColor("#E0E0D2")
      .setFooter(`Prefix » _`)

    message.channel.send(embed);

}

module.exports.help = {
  name: "helpt",
  aliases: ["servertags", "tags"]
}