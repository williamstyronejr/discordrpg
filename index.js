const { connectDatabase } = require('./services/database');
const initBots = require('./bots/index');
const config = require('./config/index');

/**
 * Sets up database and initialzes bot. Will exit if any errors occur with
 *  connecting to database or initializing bots.
 */
async function setupServer() {
  try {
    await connectDatabase(config.mongoURI);

    await initBots().then(() => {
      console.log('All bots initialized');
    });
  } catch (err) {
    if (process.NODE_ENV !== 'production') console.log(err);
    process.exit(0);
  }
}

setupServer();
