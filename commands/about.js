const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

exports.run = (bot, message, args, func) => {

  const embed = new MessageEmbed()
    .setColor('#e0e0d2')
    .setTitle('**SourCreams Global**')
    .setDescription(stripIndents`
    SourCreams Global is a Discord Bot that focuses on the being a super solid bot for your discord server.

    **[Developer Site](https://sourcreambot.xyz) »** The Developer Website
    **[GitHub Repo](Privated for now) »** Official Repo of the Bot
    **[Support Server](https://discord.gg/9nCn6y6s2p) »** Official Support Server
    **[Donations](https://www.paypal.com/donate?token=JOI7G-GMHpB3xwfn4ncG4YgLxlfOjWieHFamt7WVmMmexKYHotp4xX3_yiWNbFWFHmNeMfwS-Q9PeAh5) »** Be kind and Donate!
    **[Invite](https://discord.com/api/oauth2/authorize?client_id=773238645967814657&permissions=8&scope=bot) »** Invite SourCreams Global to your Server
    `)
    .setThumbnail('https://i.ibb.co/9ZXWfqb/global-icon-13.png')
    .setImage('https://i.ibb.co/9ZXWfqb/global-icon-13.png')
    .setFooter('Developed by SourCream');

  message.channel.send({embed});

}

module.exports.help = {
  name: "about",
  aliases: ["info"]
}