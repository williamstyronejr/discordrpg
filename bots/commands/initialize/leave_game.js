const commando = require('discord.js-commando');
const { createErrorMessage } = require('../utils/utils');

// Move to database for easier updating
const gameRoles = ['Player', 'Newcomer', 'Merchant', 'Craftsman', 'Adventure'];

class LeaveGameCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'leavegame',
      group: 'initialize',
      memberName: 'leavegame',
      description: 'Removes user from seeing game in discord server.'
    });
  }

  async run(message, args) {
    const guild = message.guild;

    if (!guild || !guild.available) {
      message.reply('Error');
      return;
    }

    try {
      // Search user's current roles for game related ones and remove them
      const userRoles = message.member.roles;
      const roles = userRoles.filter(elem => !gameRoles.includes(elem.name));

      await message.member.setRoles(roles);
      message.reply('You have been removed from the game');
    } catch (err) {
      message.reply(
        createErrorMessage(
          'Error processing request. Please try again.',
          'leavegame'
        )
      );
    }
  }
}

module.exports = LeaveGameCommand;
