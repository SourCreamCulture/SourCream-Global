const { version, MessageEmbed } = require("discord.js");
const moment = require("moment");
const { stripIndents } = require("common-tags");
require("moment-duration-format");

exports.run = async (bot, message, args) => { 
   
   const duration = moment.duration(bot.uptime).format(" D [days], H [hours], m [minutes], s [seconds]");
  
        const embedStats = new MessageEmbed()
            .setTitle("**SourCreams Global Stats**")
            .setColor("e0e0d2")
            .setThumbnail(`https://i.ibb.co/9ZXWfqb/global-icon-13.png`)
            .setDescription(stripIndents`
            📊 __**Statistics**__
            **Users »** ${bot.users.cache.size}
            **Servers »** ${bot.guilds.cache.size}
            **Channels »** ${bot.channels.cache.size}
            **Emojis »** ${bot.emojis.cache.size}
            **Uptime »** ${duration}\n**Ping (Latency) »** \`${Math.round(bot.ws.ping)} ms\`

            💡 __**Bot Module Versions**__
            **Discord.js »** \`v${version}\`
            **Node.js »** \`${process.version}\`
            **Databases »** \`v7.1.1\`

            🖥 __**Usage**__
            **Memory Usage »** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB
            **CPU Usage »** ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%
            **Node CPU Usage »** ${(process.cpuUsage().user / 1024 / 1024).toFixed(2)}%

            **[Dev Website](https://sourcreambot.xyz)** | **[Invite](https://discord.com/api/oauth2/authorize?client_id=773238645967814657&permissions=8&scope=bot)** | **[Support Server](https://discord.gg/9nCn6y6s2p)** | **[Vote on top.gg](https://top.gg/bot/773238645967814657/vote)**
            `)
            .setFooter(`To learn more about SourCreams Global, run _about for special information`)

        message.channel.send(embedStats);
  
};

module.exports.help = {
  name: "botstats",
  aliases: ["bot", "stats"]
}