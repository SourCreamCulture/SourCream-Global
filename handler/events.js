/*const { readdirSync } = require('fs');

module.exports = bot => {
    const events = readdirSync('./event/');
    for (let event of events) {
        let file = require(`../event/${event}`);
        bot.on(event.split('.')[0], (...args) => file(bot, ...args));
        delete require.cache[require.resolve(`../event/${event}`)];
    }
}*/