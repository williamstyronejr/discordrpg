const path = require('path');
const Commando = require('discord.js-commando');

const client = new Commando.Client();

client.registry.registerGroup('initialize', 'Initialize');
client.registry.registerGroup('menu', 'Menu');
client.registry.registerDefaults();
client.registry.registerCommandsIn(path.join(__dirname, 'commands'));

module.exports = client;
