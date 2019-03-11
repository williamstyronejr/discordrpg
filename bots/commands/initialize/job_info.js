const commando = require('discord.js-commando');
const { createErrorMessage } = require('../utils/utils');

// To be moved to database
const jobs = ['Adventure', 'Merchant', 'Craftsman'];
const jobInfo = {
  Adventure: 'Kills things',
  Merchant: 'Sells things',
  Craftsman: 'Makes things'
};

class JobInfoCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'jobinfo',
      group: 'initialize',
      memberName: 'jobinfo',
      description: 'Gets information about .'
    });
  }

  async run(message, args) {
    const guild = message.guild;

    if (!guild || !guild.available) {
      message.reply('This command must be ran in a server.');
      return;
    }

    // Check if user input is one of the valid job
    if (!args) {
      return message.reply(createErrorMessage('No job defined', 'jobinfo'));
    } else if (!jobs.includes(args)) {
      return message.reply(
        createErrorMessage(`Job, ${args}, does not exists.`, 'jobinfo')
      );
    }

    message.reply(jobInfo[args]);
  }
}

module.exports = JobInfoCommand;
