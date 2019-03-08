const Seeker = require('./Seeker');
const config = require('../config/index');

/**
 * Initialize all bots
 */
function initBots() {
  return Promise.all([Seeker.login(config.botTokens.Seeker)]);
}

module.exports = initBots;
