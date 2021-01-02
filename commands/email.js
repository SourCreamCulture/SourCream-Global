const Discord = require("discord.js");
const fs = require('fs');
const nodemailer = require('nodemailer');

module.exports = {
  info: {
    name: "email",
    description: "email whoever",
    usage: "[email]",
    aliases: ["email"],
  },

  run: async function (client, message, args) {
    
    if (message.author.id != "461959539114246175") return message.channel.send("You're not the bot the owner!");
    
    var searchStringe = args.join(" ");
    if (!searchStringe) return message.channel.send("You didn't provide an email to send a message to");
    
    var searchStringee = (args.splice(1).join(" "));
    if (!searchStringee) return message.channel.send("You didn't provide a message to send");
    
    var transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: 'sourcreambot@yahoo.com',
    pass: 'jsuroumlfolkpxfj'
  }
});

var mailOptions = {
  from: 'sourcreambot@yahoo.com',
  to: searchStringe,
  subject: 'Sent from a discord bot',
  text: searchStringee
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    message.channel.send("Error sending message!")
  } else {
    console.log('Email sent: ' + info.response);
    message.channel.send("Email Sent!")
  }
});
    
  },
};