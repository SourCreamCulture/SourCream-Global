module.exports = async (bot, message) => {
  if (message.author.bot) return;

  //Prefixes also have mention match
  const prefixMention = new RegExp(`^<@!?${bot.user.id}> `);
  const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : bot.config.prefix;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  //Making the command lowerCase because our file name will be in lowerCase
  const command = args.shift().toLowerCase();

  //Searching a command
  const cmd = bot.commands.get(command);
  //Searching a command aliases
  //const aliases = client.commands.find(x => x.info.aliases.includes(command))

  //if(message.channel.type === "dm")return message.reply("None of the commands work in DMs. So please use commands in server!")
process.on("unhandledRejection", (reason, promise) => {
    try {
        console.error("Unhandled Rejection at: ", promise, "reason: ", reason.stack || reason);
    } catch {
        console.error(reason);
    }
});
require('events').EventEmitter.defaultMaxListeners = 25


  //Executing the codes when we get the command or aliases
  if(cmd){
    cmd.run(bot, message, args);
  }else return //if(aliases){
    //aliases.run(client, message, args);
  //}else return
};