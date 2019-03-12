const commando = require('discord.js-commando');
const { getCharacterByName } = require('../../../services/character');
const { createErrorMessage } = require('../utils/utils');

const jobRoles = ['Advanture', 'Merchant', 'Craftsman'];

class SelectCharacterCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'selectcharacter',
      group: 'menu',
      memberName: 'selectcharacter',
      description: 'Allows user to select one of their character to play as.'
    });
  }

  async run(message, args) {
    const guild = message.guild;

    if (!guild || !guild.available) {
      message.reply('Error');
      return;
    }

    const memberId = message.member.id; // Messager's discord Id

    try {
      const character = await getCharacterByName(memberId, args);

      // If no character is found, reply with error.
      if (!character)
        return message.reply(
          createErrorMessage(
            `You do not have a character by the name: ${args}`,
            'switchcharacter'
          )
        );

      // Filter out previous job role, and add in new one
      const userRoles = message.member.roles;
      const roles = userRoles.filter(elem => !jobRoles.includes(elem.name));
      const jobRoleId = guild.roles.find('name', character.job).id;

      await message.member.setRoles(roles);
      await message.member.addRole(jobRoleId);
      message.reply(`You are now using in as: \n ${character.name}`);
    } catch (err) {
      message.reply(
        createErrorMessage(
          'Error selecting character. Please try again',
          'selectcharacter'
        )
      );
    }
  }
}

module.exports = SelectCharacterCommand;
