const commando = require('discord.js-commando');
const { createErrorMessage } = require('../utils/utils');

/**
 * Should be move to db for easy updating
 */
const roleList = ['Newcomer', 'Player', 'Adventurer', 'Merchant', 'Craftsman'];

class InitGameCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'initgame',
      group: 'initialize',
      memberName: 'game',
      description:
        'Initializates the game in the server. Must be an admin or owner to run this command.'
    });
  }

  /**
   * Creates all roles provided on a server.
   * @param {object} guild The guild (discord server) to add roles to.
   * @param {Array<string>} roles Array of role names to create
   * @return {Promise<array>} A promise to resolve when all roles were created.
   */
  initRoles(guild, roles) {
    const proms = [];

    // FIXME: Use array method instead of for loop
    for (let i = 0; i < roles.length; i++) {
      proms.push(guild.createRole({ name: roles[i] }));
    }

    return Promise.all(proms);
  }

  async run(message, args) {
    const guild = message.guild;

    if (!guild || !guild.available) {
      message.reply('Error');
      return;
    }

    // Check if the author of the message is the owner of the server
    if (
      !message.member ||
      !message.member.hasPermission(8, false, true, true)
    ) {
      message.reply(
        createErrorMessage(
          'You do not have the permission needed to initialize the game. Please ask an admin or server owner.',
          'initgame'
        )
      );
      return;
    }

    // Check to make sure the bot has the correct permissions
    if (!guild.me.hasPermission(8)) {
      console.log('Does not have correct permissions');
      message.reply('This bot requires admin permissions to run.');
      return;
    }

    message.reply('Initializing Game ...');
    message.reply('Creating roles ...');

    await this.initRoles(guild, roleList);

    message.reply('Creating channels ...');
    message.reply('Game is properly setup. Use !join to enter the game');
  }
}

module.exports = InitGameCommand;
