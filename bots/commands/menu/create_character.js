const commando = require('discord.js-commando');
const { createCharacter } = require('../../../services/character');
const { createErrorMessage } = require('../utils/utils');

const jobs = ['Adventure', 'Merchant', 'Craftsman'];

class CreateCharacterCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'createcharacter',
      group: 'menu',
      memberName: 'createcharacter',
      description:
        'Creates a new character for discord user. An error will occur if trying to create two characters with the same role and name that belong to the same user.'
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
      return message.reply(createErrorMessage('', 'createcharacter'));
    }

    const [name, job] = args.split(' ');

    // Check for valid arguments
    if (!name || !job || name == '' || job == '') {
      return message.reply(createErrorMessage('', 'createcharacter'));
    } else if (!jobs.includes(job)) {
      return message.reply(
        createErrorMessage('Invalid job selected', 'createcharacter')
      );
    }

    const jobRole = guild.roles.find('name', job).id;
    const memberId = message.member.id;

    try {
      // Apply and remove roles
      await createCharacter(memberId, name, job);
      await message.member.addRole(jobRole);
      await message.reply(`Selected role: ${args}`);
    } catch (err) {
      console.log(err);
      await message.reply('Error selecting role. Please try again.');
    }
  }
}

module.exports = CreateCharacterCommand;
