const commando = require('discord.js-commando');
const { getCharactersOfUser } = require('../../../services/character');
const { createErrorMessage } = require('../utils/utils');

const jobs = ['Adventure', 'Merchant', 'Craftsman'];

class CharacterListCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'characterlist',
      group: 'menu',
      memberName: 'characterlist',
      description: ''
    });
  }

  async run(message, args) {
    const guild = message.guild;

    if (!guild || !guild.available) {
      message.reply('Error: Please try again another time.');
      return;
    }

    const memberId = message.member.id;

    try {
      const characters = await getCharactersOfUser(memberId);
      const characterStr =
        characters.length > 0
          ? characters
              .map((char, index) => {
                return `${index + 1}. ${char.name}`;
              })
              .join('\n')
          : 'No existing characters.';

      await message.reply(`Your character list: \n${characterStr}`);
    } catch (err) {
      await message.reply(
        createErrorMessage('Please try again', 'characterlist')
      );
    }
  }
}

module.exports = CharacterListCommand;
