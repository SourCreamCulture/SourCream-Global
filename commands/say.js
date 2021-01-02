exports.run = async(client, message, args, prefix) => {
  
  let text = args.join(' ')
    if (!text) return message.channel.send(`What can I say?\nExample: **\`_say Hewwo World, OwO!\`**`);

  message.channel.send(text);

} 

module.exports.help = {
  name: "say",
  aliases: []
}