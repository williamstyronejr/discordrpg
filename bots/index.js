const Seeker = require('./Seeker');

const { SEEKER_TOKEN: seekerToken } = process.env;

/**
 * Initialize all bots
 */
function initBots() {
  return Promise.all([Seeker.login(seekerToken)]);
}

module.exports = initBots;
