const Discord = require("discord.js");
const fs = require('fs');
var weather = require('openweather-apis');

module.exports = {
  info: {
    name: "weather",
    description: "get the weather",
    usage: "[email]",
    aliases: ["email"],
  },

  run: async function (client, message, args) {
    
    const ownKey = "17ac26d29f7ab5e5578bfb0186f66930";
    
    if (message.author.id != "461959539114246175") return message.channel.send("You're not the bot owner!");
    
    var searchStringe = args.join(" ");
    if (!searchStringe) return message.channel.send("You didn't provide a city to search for!");
    
    //var searchStringee = (args.splice(1).join(" "));
    //if (!searchStringee) return message.channel.send("You didn't provide a message to send");
    
    weather.setLang('en');
	// English - en, Russian - ru, Italian - it, Spanish - es (or sp),
	// Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro,
	// Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg,
	// Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn),
	// Turkish - tr, Croatian - hr, Catalan - ca


	// set city by name
	weather.setCity(searchStringe);
 	// or set the coordinates (latitude,longitude)
	//weather.setCoordinate(50.0467656, 20.0048731);
	// or set city by ID (recommended by OpenWeatherMap)
	//weather.setCityId(4367872);

    // or set zip code
	//weather.setZipCode(searchStringe);

	// 'metric'  'internal'  'imperial'
 	weather.setUnits('imperial');

	// check http://openweathermap.org/appid#get for get the APPID
 	weather.setAPPID(ownKey);
	
	weather.getSmartJSON(function(err, smart){
		
		let embed = new Discord.MessageEmbed()
	.setTitle(`Weather in ${searchStringe}`)
	.setAuthor("⛅⛅⛅")
	.setDescription(`
	**Temperature** - ${smart.temp}
	**Humidity** - ${smart.humidity}
	**Description** - ${smart.description}`);
		
		//console.log(smart);
		message.channel.send(embed);
	});
	
	/*let embed = new Discord.MessageEmbed()
	.setTitle("Weather")
	.setDescription("The weather of the given zip code location!")
	.addField(`
	**Temperature** - ${smart.temp}`);
	
	message.channel.send(embed);*/
    
  },
};