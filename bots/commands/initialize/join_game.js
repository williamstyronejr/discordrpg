const commando = require('discord.js-commando');
const { createErrorMessage } = require('../utils/utils');

class JoinGameCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'joingame',
      group: 'initialize',
      memberName: 'joingame',
      description: 'Gives user necessary roles to play the game.'
    });
  }

  async run(message, args) {
    const guild = message.guild;

    if (!guild || !guild.available) {
      message.reply(
        createErrorMessage('This command must be ran in a server.', 'joingame')
      );
      return;
    }

    // Get ids of roles to give the new player
    const player = guild.roles.find('name', 'Player').id;

    // Give player initial roles
    try {
      await message.member.addRole(player);

      message.reply('Welcome to the game!');
      message.reply(
        'You can create a character using the !createcharacter command. For details on jobs use !jobinfo command.'
      );
    } catch (err) {
      message.reply(
        'You are already a memeber of the game. If you wish to create a new chacater, use !createcharacter command.'
      );
    }
  }
}

module.exports = JoinGameCommand;
