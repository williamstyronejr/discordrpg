const commando = require('discord.js-commando');
const { deleteCharacter } = require('../../../services/character');
const { createErrorMessage } = require('../utils/utils');

const jobs = ['Adventure', 'Merchant', 'Craftsman'];

class DeleteCharacterCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'deletecharacter',
      group: 'menu',
      memberName: 'deletecharacter',
      description:
        'Deletes a new character for discord user. Pass name of character you want to delete for example, !deletecharater name'
    });
  }

  async run(message, args) {
    const guild = message.guild;

    if (!guild || !guild.available) {
      message.reply('Error: Please try again another time.');
      return;
    }

    // Check user provided arguments
    if (!args) {
      return message.reply(createErrorMessage('', 'deletecharacter'));
    }

    const memberId = message.member.id;

    try {
      const character = await deleteCharacter(memberId, args);
      if (!character)
        return message.reply(
          createErrorMessage(
            `You do not have a character named, ${args}.`,
            'deleteCharacter'
          )
        );
      await message.reply(`Character ${args} has been deleted.`);
    } catch (err) {
      await message.reply(
        createErrorMessage('Please try again', 'deletecharacter')
      );
    }
  }
}

module.exports = DeleteCharacterCommand;
