const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = { 
    config: {
        name: "eval",
        description: "Evaluates code",
        accessableby: "Bot Owner",
        type: "owner",
        usage: `${prefix}eval <input>`
    },
    run: async (bot, message, args) => {
    
    if (message.author.id !== '461959539114246175') return 
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
        code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.MessageEmbed()
        .setAuthor('Result')
        .setColor('RANDOM')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
    
    }
}