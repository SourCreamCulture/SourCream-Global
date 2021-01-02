const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports.run = async (bot, message, args) => {

    let embed = new MessageEmbed()
      .setTitle("**SourCreams Global Music Help**")
      .setDescription(`➜ For help, join our **[Support Server](https://discord.gg/9nCn6y6s2p)**\n➜ **_about** for Information`)
      .setThumbnail(`https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif`)
      .addField("**Music**", stripIndents`
      **\`_play <song> - to play a song\`**
      **\`_pause - to pause the song\`**
      **\`_playlist <playlist url> - to play a playlist on youtube\`**
      **\`_loop - to loop the currently playing song\`**
      **\`_resume - to resume playing the paused song\`**
      **\`_shuffle - to shuffle the songs in the queue\`**
      **\`_stop - to stop playing music\`**
      **\`_volume - to change the songs volume\`**
      **\`_skip - to skip the currently playing song\`**
      **\`_skipto - to skip to a specific song in the queue\`**
      `, true)
      .addField("**Miscallaneous**", stripIndents`
      **\`_afk - to have the bot not leave the voice channel when done playing\`**
      **\`_lyrics - to get the lyrics of the currently playing song\`**
      **\`_nowplaying - to see what is currently playing on the server\`**
      **\`_queue - to see the queue of songs\`**
      **\`_remove - to remove a song from the queue\`**
      **\`_search - to search for a song\`**
      **\`_search - to search for a song\`**
      `, true)
      .setColor("#E0E0D2")
      .setFooter(`Prefix » _`)

    message.channel.send(embed);

}

module.exports.help = {
  name: "helpm",
  aliases: ["servertags", "tags"]
}


/*const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "helpm",
        description: "To show all commands",
        usage: "[command]",
        aliases: ["commands", "help me", "pls help"]
    },

    run: async function(client, message, args){
        var allcmds = "";

        client.commands.forEach(cmd => {
            let cmdinfo = cmd.info
            allcmds+="``"+client.config.prefix+cmdinfo.name+" "+cmdinfo.usage+"`` ~ "+cmdinfo.description+"\n"
        })

        let embed = new MessageEmbed()
        .setAuthor("Commands of "+client.user.username, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
        .setColor("BLUE")
        .setDescription(allcmds)
        .setFooter(`To get info of each command you can do ${client.config.prefix}help [command]`)

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("Unknown Command")
            let commandinfo = new MessageEmbed()
            .setTitle("Command: "+command.info.name+" info")
            .setColor("YELLOW")
            .setDescription(`
Name: ${command.info.name}
Description: ${command.info.description}
Usage: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\`
Aliases: ${command.info.aliases.join(", ")}
`)
            message.channel.send(commandinfo)
        }
    }
}*/