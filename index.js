require('events').EventEmitter.defaultMaxListeners = 30;
const path = require('path');
const fs = require('fs');// regular and global chat and music bot
const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require('./config.json');

const ytdl = require("ytdl-core"); //for music bot

const jointocreate = require("./jointocreate");
jointocreate(bot);

const { Collection, Client } = require("discord.js"); //music bot

const firstMessage = require('./first-message');//first message rules

const axios = require('axios'); //for coronavirus api
const countries = require("./countries.json");
const url = 'https://api.covid19api.com/total/country/';
const WAKE_COMMAND = '_cases';

const fetch = require('node-fetch'); //for urban disctionary api
const querystring = require('querystring');
const pprefix = '_';
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

//const owner = bot.users.cache.has("461959539114246175");
 
const random = require('random');
 
require("dotenv").config();//Loading .env //music bot
bot.commands = new Collection();//Making client.commands as a Discord.js Collection //music bot 
bot.queue = new Map(); //music bot

const { EconomyManager } = require("quick.eco");//eco bot
const eco = new EconomyManager({
    adapter: 'sqlite'
});


bot.on("ready", () => {
  console.log(`Booted Up!`);
  
  // Set the client user's activity
/*client.user.setActivity('!global', { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);*/
  
  /*bot.user.setActivity(`_help over ${bot.guilds.cache.size} servers`, { type: "WATCHING"})
        .then(presense => console.log (`Activity set to ${presense.activities[0].name}`))
        .catch(console.error);*/
        
        console.log(`${bot.user.username} is online`)
    // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});

    let statuses = [
        `${bot.guilds.cache.size} servers!`,
        "_help",
        `over ${bot.users.cache.size} users!`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 120000)
 
  firstMessage(bot, '789213396373471245', 
`**1. Be respectful**
You must respect all users, regardless of your liking towards them. Treat others the way you want to be treated.

**2. No Inappropriate Language**
The use of profanity should be kept to a minimum. However, any derogatory language towards any user is prohibited.

**3. No spamming**
Don't send a lot of small messages right after each other. Do not disrupt chat by spamming.

**4. No pornographic/adult/other NSFW material**
This is a support server and not meant to share this kind of material.

**5. No advertisements**
We do not tolerate any kind of advertisements, whether it be for other communities or streams. You can post your content in the media channel if it is relevant and provides actual value (Video/Art)

**6. No offensive names and profile pictures**
You will be asked to change your name or picture if the staff deems them inappropriate.

**7. Server Raiding**
Raiding or mentions of raiding are not allowed.

**8. Direct & Indirect Threats**
Threats to other users of DDoS, Death, DoX, abuse, and other malicious threats are absolutely prohibited and disallowed.

**9. Follow the Discord Community Guidelines**
You can find them here: https://discordapp.com/guidelines

**10. Do not join voice chat channels without permission of the people already in there**
If you see that they have a free spot it is alright to join and ask whether they have an open spot, but leave if your presence is not wanted by whoever was there first.

**The Admins and Mods will Mute/Kick/Ban per discretion. If you feel mistreated dm an Admin and we will resolve the issue.**

All Channels will have pinned messages explaining what they are there for and how everything works. If you don't understand something, feel free to ask!

**Your presence in this server implies accepting these rules, including all further changes. These changes might be done at any time without notice, it is your responsibility to check for them.**`, ['👍'])
  
});

// global chat

bot.on('message', async message => {

    if(message.channel.name === "🌎global-chat" && !message.author.bot) {
        bot.guilds.cache.forEach(guild => {
            if(guild === message.guild) return;
            let channel = guild.channels.cache.find(ch => ch.name === "🌎global-chat");
            if(!channel) return;
            let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag +" | Global Chat")
            .setColor("RANDOM")
            .setDescription(message.content)
            .setFooter(`Server: ${message.guild.name} || Members: ${message.guild.memberCount}`)
            //.setFooter("Server: "+ message.guild.name || "Members: "+ message.guild.memberCount)
            .setTimestamp();
            channel.send(embed);
        });
    }
    
    if (message.content.startsWith(prefix + "ping")) {
    message.delete({ timeout: 1000 });
    var ping = Date.now() - message.createdTimestamp + " ms";
    message.channel.send("Your ping is `" + `${Date.now() - message.createdTimestamp}` + " ms`");

  }
  
  let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Server Info")
            .setDescription(`${message.guild}'s information`)
            .addField("Owner", `The owner of this server is ${message.guild.owner}`)
            .addField("Member Count", `This server has ${message.guild.memberCount} members`)
            .addField("Emoji Count", `This server has ${message.guild.emojis.cache.size} emojis`)
            .addField("Roles Count", `This server has ${message.guild.roles.cache.size} roles`);
  
  if (message.content.startsWith(prefix + "serverinfo")) {
    message.delete({ timeout: 1000 });
    // Send "pong" to the same channel
    message.channel.send(embed);
  }

  /*let embed2 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Servers")
            .setImage(message.guild.iconURL)
            .setDescription("Servers this bot is in")
            .addField(`${guild.name} has a total of ${guild.memberCount} members`);*/

  if (message.content.startsWith(prefix + "servers")) {
      message.delete({ timeout: 1000 });
      bot.guilds.cache.forEach((guild) => {
          let embed2 = new Discord.MessageEmbed()
            .setTitle(`${guild.name} has a total of ${guild.memberCount} members`)
            .setColor("NAVY");

          message.channel.send(embed2);
      });
  };
  
let totalSeconds = (bot.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);
let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

let embed4 = new Discord.MessageEmbed()
            .setColor("NAVY")
            .setTitle(uptime);

if (message.content.startsWith(prefix + "uptime")) {
    message.delete({ timeout: 1000 });
    // Send "pong" to the same channel
    message.channel.send(embed4);
  }

let embed3 = new Discord.MessageEmbed()
            .setColor("NAVY")
            .setTitle("You do not have the permissions to use this command!")
            .setDescription('You need to have admin perms to use this command');

/*if (message.content.startsWith(prefix + "cc")) {
    message.delete({ timeout: 1000 });
    if (message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results);
        });
    }else {
        message.channel.send(embed3);
    }
}*/

/*bot.on('message', function(message) {
    
    let embed3 = new Discord.MessageEmbed()
            .setColor("NAVY")
            .setTitle("You do not have the permissions to use this command!")
            .setDescription('You need to have admin perms to use this command');
    
    if (message.content.startsWith(prefix + "cc")) {
        message.delete({ timeout: 1000 });
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.fetchMessages()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
        }else {
        message.channel.send(embed3);
    }

};*/

if (message.content.startsWith(prefix + "docs")) {
    message.delete({ timeout: 1000 });
    // Send "pong" to the same channel
    message.channel.send('https://discord.js.org/#/docs/main/stable/general/welcome');
  }

if (message.content.startsWith(prefix + "updates")) {
    message.delete({ timeout: 1000 });
    // Send "pong" to the same channel
    message.channel.send(`Recent Updates to the Bot!
    Added an urban dictionary command
    Added a covid-19 command
    Added a stock searching command
    Added a ping command
    Added an uptime command
    Added a server lock command (for admins only)
    Added a server info command
    Added a help command
    Worked on the website more and updated it https://sourcreambot.xyz
    `);
  }

if (message.content.startsWith(prefix + "play")) {
    // Send "pong" to the same channel
    console.log(`Playing Music! in ${message.guild.name}`);
  }

if (message.content.startsWith(prefix + "stop")) {
    // Send "pong" to the same channel
    console.log(`Stopped Playing Music! in ${message.guild.name}`);
  }


if (message.content.startsWith(prefix + "profile")) {
    message.delete({ timeout: 1000 });
    // Send "pong" to the same channel
    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}\nCreated: ${message.author.createdAt}`);
  }

if (message.content.startsWith(prefix + "website")) {
    message.delete({ timeout: 1000 });
    // Send "pong" to the same channel
    message.channel.send('https://sourcreambot.xyz');
  }

if (message.content.startsWith(prefix + "vote")) {
    message.delete({ timeout: 1000 });
    // Send "pong" to the same channel
    message.channel.send('https://top.gg/bot/773238645967814657/vote');
  }

let count = bot.guilds.cache.size;

if (message.content.startsWith(prefix + "scount")) {
    message.delete({ timeout: 1000 });
    // Send "pong" to the same channel
    message.channel.send(count);
  }
   
   /*if (message.content.startsWith(prefix + "reload")) {
    message.delete({ timeout: 1000 });
    // Send "pong" to the same channel
    execute(message, args) {
    //const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args[1].toLowerCase();
	const command = bot.commands.get(commandName)
			|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}

		delete require.cache[require.resolve(`./command/${command.name}.js`)];

		try {
			const newCommand = require(`./command/${command.name}.js`);
			message.bot.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${command.name}\` was reloaded!`);
		} catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
    }
  }*/
/*if (message.content.startsWith(prefix + "down")) {
    //message.delete({ timeout: 1000 });
        if (message.author.id != "461959539114246175") return message.channel.send("You're not the bot the owner!") {
        channel = bot.channels.cache.get('790050322609078283')
        
        channel.send('The Bot Is Undergoing Maintanence!')
    }
    // Send "pong" to the same channel
     //channel = bot.channels.cache.get('790050322609078283');
    
    //channel.send('The Bot Is Undergoing Maintanence!');
  };*/

    /*if (message.content.startsWith(prefix + "down")) {
        if (message.author.id != "461959539114246175") return message.channel.send("You're not the bot the owner!")
            channelll = bot.channels.cache.get('790050322609078283')
            
            channel.send('The Bot Is Undergoing Maintanence!');
    }*/

});

bot.on('message', message => {

    if (message.content.startsWith(prefix + "down")) {
    //message.delete({ timeout: 1000 });
        if (message.author.id != "461959539114246175") return message.channel.send("You're not the bot the owner!")
        channel = bot.channels.cache.get('790050322609078283')
        
        channel.send('The Bot Is Undergoing Maintanence!')
    // Send "pong" to the same channel
     //channel = bot.channels.cache.get('790050322609078283');
    
    //channel.send('The Bot Is Undergoing Maintanence!');
  };

    if (message.content.startsWith(prefix + "up")) {
    //message.delete({ timeout: 1000 });
        if(message.author.id != "461959539114246175") return message.channel.send("You're not the bot the owner!")
        channel = bot.channels.cache.get('790050322609078283')
        
        channel.send('The Bot Maintanence Is Finished!')
    // Send "pong" to the same channel
     //channel = bot.channels.cache.get('790050322609078283');
    
    //channel.send('The Bot Is Undergoing Maintanence!');
  };
});

let embed3 = new Discord.MessageEmbed()
            .setColor("NAVY")
            .setTitle("You do not have the permissions to use this command!")
            .setDescription('You need to have admin perms to use this command');

bot.on('message', function(message) {
    if (message.content.startsWith(prefix + "cc")) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.messages.fetch()
               .then(function(list){
                    message.channel.bulkDelete(list);
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
        } else{
             message.channel.send(embed3)
        }
    }

});

bot.on('message', message => {
if (message.content.startsWith(prefix + "flip")) {   
message.delete({ timeout: 1000 });     
const pileface = Math.floor(Math.random() * 2 + 0)
if (pileface === 0) {
message.channel.send("You just got : **Sword** !")
return message.channel.send("🎉**You won**🎉 **Bravos to you friend** !")
} else {
message.channel.send("You just got : **Stick** !")
return message.channel.send("**💥You Lost, 🎉The bot won🎉** !")
}
}
});

bot.on('message', message => {
    const suggestionsChannel = message.guild.channels.cache.get('789860522957733929')
    if (message.channel === suggestionsChannel) {
            if (message.author.bot) return
            message.delete({ timeout: 1000 })
            
            const Embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`${message.content}\n\n📊 Use the reactions below to vote!`)
            .setFooter('Want to suggest something? Type it here!')
            .setColor(3426654)
            message.channel.send(Embed).then(message => {
                message.react('👍')
                .then(() => message.react('👎'))
            })
    }
})

/*if(message.channel.name === "global" && !message.author.bot) {
    bot.guilds.cache.forEach(guild => {
        if(guild === message.guild) return;
        let channel = guild.channels.cache.find(ch => ch.name === "global");
        if(!channel) return;
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag +" | Global Chat")
        .setColor("RANDOM")
        .setDescription(message.content)
        .setFooter("Server: "+ message.guild.name)
        .setTimestamp()
        channel.send(embed)
    })
}*/

const prefix = '_'

let ticket = new Map()

        bot.on('message', async message => {
            const ticketChannel = message.guild.channels.cache.find(c => c.name.toLowerCase() === `${message.author.username}--ticket`.toLowerCase())
            if(message.content.startsWith(`${prefix}ticket`)) {
                if(ticketChannel || ticket.get(message.author.id) === true) return message.channel.send("You already have a ticket currently open!")
                const ticketCreated = await message.guild.channels.create(`${message.author.username}-ticket`, {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            allow: 'VIEW_CHANNEL',
                            id: message.author.id
                        },
                        {
                            deny: 'VIEW_CHANNEL',
                            id: message.guild.id

                        }
                    ]
                })
                ticket.set(message.author.id, true)

                let embed1 = new Discord.MessageEmbed()
                .setAuthor(message.member.displayName, message.member.user.displayAvatarURL())
                .setTitle(`Your Ticket has been created!`)
                .setTimestamp()
                .setColor('RANDOM');

                let embed3 = new Discord.MessageEmbed()
                .setAuthor(message.member.displayName, message.member.user.displayAvatarURL())
                .setTitle(`Why have you created this ticket?`)
                .setDescription('Give a brief explanation on why you created this ticket.')
                .addField('Staff will be here shortly', 'Please wait without pinging anyone.')
                .setTimestamp()
                .setColor('RANDOM');

                ticketCreated.send(embed3)
                message.channel.send(embed1)
            } else if (message.content.startsWith(`${prefix}closeticket`)) {
                if(!message.channel.name.includes('ticket')) return message.channel.send("This message needs to be send in your open ticket you don\'t have one.")
                message.channel.delete()
                ticket.set(message.author.id, false)
            }
        })//end of ticket command

bot.on('message', (message) => {

  if (!message.guild) return;

if (message.content.startsWith('_kick')) {

  if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("you can't use that!");

    const user = message.mentions.users.first();

    if (user) {

      const member = message.guild.member(user);

      if (member) {

        member

          .kick()

          .then(() => {

            const kick = new Discord.MessageEmbed()

           .setDescription(`${user.tag} has been kicked.`)
           .addField("Get hit with the kick hammer!")
           
            message.channel.send(kick);

          })

          .catch(err => {

            

            const kick_err_1 = new Discord.MessageEmbed()

           .setColor('#ff0000')

          .setDescription("I can't kick that user!")

            message.channel.send(kick_err_1);

            console.error(err);

          });

      } else {

        

        const kick_err_2 = new Discord.MessageEmbed()

       .setColor('#ff0000')

      .setDescription("That user is not on this server!")

        message.channel.send(kick_err_2);

      }

    } else {

      message.reply("you didn't mention anyone!");

    }

  }

});

bot.on('message', (message) => {

  if (!message.guild) return;

if (message.content.startsWith('_ban')) {

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("you can't use that!");

    const user = message.mentions.users.first();

    if (user) {

      const member = message.guild.member(user);

      if (member) {

        member

          .ban()

          .then(() => {

            

            const ban = new Discord.MessageEmbed()

           .setTitle(`${user.tag} has been banned.`)
           .setDescription("Get hit with the ban hammer!")

            message.channel.send(ban);

          })

          .catch(err => {

            

            const ban_err_1 = new Discord.MessageEmbed()

           .setColor('#ff0000')

          .setDescription("I can't ban that user!")

            message.channel.send(ban_err_1);

            console.error(err);

          });

      } else {

        

        const ban_err_2 = new Discord.MessageEmbed()

       .setColor('#ff0000')

      .setDescription("That user is not on this server!")

        message.channel.send(ban_err_2);

      }

    } else {

      message.reply("you didn't mention anyone!");
    }

  }

});//end of kick ban commands

const PREFIX = '_';

bot.queue = new Map()

bot.config = {
  prefix: PREFIX
}

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
    console.log("Loading Event: "+eventName)
  });
});

//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    bot.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});//end of music bot

let setup = new Map()

        bot.on('message', async message => {
            const setupChannel = message.guild.channels.cache.find(c => c.name.toLowerCase() === `🌎global-chat`.toLowerCase())
            if(message.content.startsWith(`${prefix}setup`)) {
                if(setupChannel || setup.get(message.author.id) === true) return message.channel.send("You have already used setup!")
                const setupCreated = await message.guild.channels.create(`🌎global-chat`, {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            allow: 'VIEW_CHANNEL',
                            id: message.guild.id
                        }
                        /*{
                            deny: 'VIEW_CHANNEL',
                            id: message.guild.id

                        }*/
                    ]
                })
                setup.set(message.author.id, true)

                let embed2 = new Discord.MessageEmbed()
                .setAuthor(message.member.displayName, message.member.user.displayAvatarURL())
                .setTitle(`Your Global Chat Channel Setup is Complete!`)
                .setTimestamp()
                .setColor('RANDOM');

                let embed4 = new Discord.MessageEmbed()
                .setAuthor(message.member.displayName, message.member.user.displayAvatarURL())
                .setTitle(`This channel was setup and is connected to global chat`)
                .setDescription('Say hi and see people respond')
                .addField('Enjoy and have fun! If there were any bugs with this command report them in the support discord server for this bot! https://sourcreambot.xyz')
                .setTimestamp()
                .setColor('RANDOM');

                setupCreated.send(embed4)
                message.channel.send(embed2)
            } else if (message.content.startsWith(`${prefix}closeglobal`)) {
                if(!message.channel.name.includes('🌎global-chat')) return message.channel.send("This message needs to be sent in your open global chat channel if you have one.")
                message.channel.delete()
                setup.set(message.author.id, false)
            }
        })// end of setup channel create
        
// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

let setup2 = new Map()

        bot.on('message', async message => {
            const setup2Channel = message.guild.channels.cache.find(c => c.name.toLowerCase() === `welcome`.toLowerCase())
            if(message.content.startsWith(`${prefix}setup`)) {
                if(setup2Channel || setup2.get(message.author.id) === true) return message.channel.send("You have already used setup!")
                const setup2Created = await message.guild.channels.create(`welcome`, {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            allow: 'VIEW_CHANNEL',
                            id: message.guild.id
                        }
                        /*{
                            deny: 'VIEW_CHANNEL',
                            id: message.guild.id

                        }*/
                    ]
                })
                setup2.set(message.author.id, true)

                let embed5 = new Discord.MessageEmbed()
                .setAuthor(message.member.displayName, message.member.user.displayAvatarURL())
                .setTitle(`Your Welcome Channel Setup is complete!`)
                .setTimestamp()
                .setColor('RANDOM');

                let embed6 = new Discord.MessageEmbed()
                .setAuthor(message.member.displayName, message.member.user.displayAvatarURL())
                .setTitle(`This channel was setup for the welcome channel`)
                .setDescription('This will work with the bots welcome response to people joining!')
                .addField('Enjoy and have fun! If there were any bugs with this command report them in the support discord server for this bot! https://sourcreambot.xyz')
                .setTimestamp()
                .setColor('RANDOM');

                setup2Created.send(embed6)
                message.channel.send(embed5)
            } else if (message.content.startsWith(`${prefix}closewelcome`)) {
                if(!message.channel.name.includes('welcome')) return message.channel.send("This message needs to be sent in your open welcome channel if you have one.")
                message.channel.delete()
                setup.set(message.author.id, false)
            }
        })// end of setup channel create
        
bot.on('message', async (msg) => {
  
  const content = msg.content.split(/[ ,]+/);
  if(content[0] === WAKE_COMMAND){
    if(content.length > 2){
      msg.reply("Too many arguments...")
    }
    else if(content.length === 1){
      msg.reply("Not enough arguments")
    }
    else if(!countries[content[1]]){
      msg.reply("Wrong country format")
    }
    else{
      const slug = content[1]
      const payload = await axios.get(`${url}${slug}`)
      const covidData = payload.data.pop();
      
      let embed7 = new Discord.MessageEmbed()
            .setColor("NAVY")
            .setTitle("Coronavirus Cases")
            .setDescription(`Covid-19 cases for ${slug}`)
            .addField(`Confirmed: ${covidData.Confirmed}`)
            .addField(`Deaths: ${covidData.Deaths}`)
            .addField(`Recovered: ${covidData.Recovered}`)
            .addField(`Active: ${covidData.Active}`);
      
      msg.channel.send(embed7);
    }
  }
});//end of coronavirus command

bot.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(pprefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'cat') {
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

		message.channel.send(file);
	} else if (command === 'urban') {
		if (!args.length) {
			return message.channel.send('You need to supply a search term!');
		}

		const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

		if (!list.length) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}

		const [answer] = list;

		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addField('Definition', trim(answer.definition, 1024))
			.addField('Example', trim(answer.example, 1024))
			.addField('Rating', `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`);

		message.channel.send(embed);
	}
});//end of urban dictionary command

bot.commands = new Discord.Collection();

bot.on('message', async message => {

    var baseURL = 'https://cloud.iexapis.com/v1/';
    var token = '/?token=pk_1e4577b6d2ed4a4294db34547beea67f';
    let stocksymbol = message.content.slice(prefix.length).trim().split(/ +/)[1];

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
     if (command == 'stock'){
        
        if (!args.length) {
            return message.channel.send(`You didn't provide a stock symbol, ${message.author}!`);
        }
        else if (args.length) {

            let getCompany = async () => {
                let stockCompany = await axios.get(baseURL + 'stock/' + stocksymbol + '/company' + token); //company info
                let stockBook = await axios.get(baseURL + 'stock/' + stocksymbol + '/book' + token); //company stock

                let companyValue = stockCompany.data;
                let stockValue = stockBook.data;

                return {
                    companyValue, 
                    stockValue
                };
            
            }
    
            let stockInfo = await getCompany();
            let changeAsPercent = (stockInfo.stockValue.quote.changePercent*100).toFixed(2);

        let embed8 = new Discord.MessageEmbed()
            .setColor("NAVY")
            .setTitle("Stock Prices")
            .setDescription(`Stock Price for ${stockInfo.companyValue.companyName}`)
            .addField(`Description: ${stockInfo.companyValue.description.substring(0,500)}`)
            .setDescription('')
            .addField(`Value: ${stockInfo.stockValue.quote.latestPrice}`)
            .setDescription('')
            .addField(`Change: ${stockInfo.stockValue.quote.change}`)
            .setDescription('')
            .addField(`Percent Change: ${changeAsPercent}`)
            .setDescription('');

            message.channel.send(embed8);

            //message.reply('\n' + '\n' + '(' + stockInfo.companyValue.symbol + ') ' + stockInfo.companyValue.companyName + '\n' + '\n' + //stockInfo.companyValue.description.substring(0,500) + '...' + '\n' + '\n' + '**$' + stockInfo.stockValue.quote.latestPrice //+ '** ' + '$' + stockInfo.stockValue.quote.change + ' (' + '%' + changeAsPercent + ')' + '\n');
            
            // stockInfo.stockValue.quote.latestPrice
            // stockInfo.stockValue.quote.previousClose
        }
    
    }

    else if (command == 'react'){
        message.react('🥳');
    }


});//end of stock command

bot.on('message', message => {
    let args = message.content.substring(prefix.Length).split(" ")
    if(message.content.startsWith(prefix + 'lockdown')) {
        if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.reply('You can\'t use this command!')
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[1] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    VIEW_CHANNEL: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })
            return message.channel.send('Locked all channels');
        } else if (args[1] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    VIEW_CHANNEL: true
                }).then(() => {
                    channel.setName(channel.name.replace('🔒', ''))
                })
            })
            return message.channel.send('Unlocked all channels')
        }
    }
}); //end of lockdown command

/*bot.on('message', message => {
if(message.content.startsWith(prefix + "info")){
    message.delete({ timeout: 1000 });    
    let startTime = message.createdTimestamp;
    let endTime = new Date().getTime()
    let embed = new Discord.MessageEmbed()
    .setThumbnail(bot.user.avatarURL)
    .setAuthor(`: ${message.author.tag}`,message.author.avatarURL)
    .setTitle("**Here is the ping and uptime of the bot!**")
    .addField("Order made on the Channel", message.channel)
    .setColor("RANDOM")
    .addField(":ping_pong: **PING: " + Math.round(endTime - startTime) + " ms.**", "**PONG !** :ping_pong: 😲")
    .addField('The bot has been online for', (Math.round(bot.uptime / (1000 * 60 * 60))) + " hours, " + (Math.round(bot.uptime / (1000 * 60)) % 60) + " minutes, and " + (Math.round(bot.uptime / 1000) % 60) + " seconds")
    .setFooter("Order request by " + message.author.tag)
    .setTimestamp()
    message.channel.send(embed)
    }
});//end of info command
*/
bot.commands = new Collection();
bot.aliases = new Collection();

//require("./handler/commands")(bot);
//require("./handler/events")(bot);
//end of tag commands

/*bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();*/

/*bot.on('message', message => {
    if (message.author.bot) return;

    const messageArray = message.content.split(/\s+/); // This regex splits on every whitespace
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;
    
    const commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    commandfile.run(bot, message, args);
});*/

bot.on("guildCreate", guild => {
    let channelID;
    let channels = guild.channels.cache;

    channelLoop:
    for (let key in channels) {
        let c = channels[key];
        if (c[1].type === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    channel.send(`Thanks for inviting me into this server!
    Use _help for a list of all my available commands!`);
});

bot.on("guildCreate", guild => {
    let channelID;
    let channels = guild.channels.cache;

    channelLoop:
    for (let key in channels) {
        let c = channels[key];
        if (c[1].type === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }
    let count = bot.guilds.cache.size;
    let channel = bot.channels.cache.get('793130002136694834');
    channel.send(`The bot has joined a server!
    The server count is now ${count}!`);
});


bot.login(config.token)
