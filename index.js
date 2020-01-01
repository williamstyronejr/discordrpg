require('dotenv').config();
const { connectDatabase } = require('./services/database');
const initBots = require('./bots/index');

const { MONGO_URI: mongoURI } = process.env;

/**
 * Sets up database and initialzes bot. Will exit if any errors occur with
 *  connecting to database or initializing bots.
 */
async function setupServer() {
  try {
    await connectDatabase(mongoURI);

    await initBots().then(() => {
      console.log('All bots initialized');
    });
  } catch (err) {
    if (process.NODE_ENV !== 'production') console.log(err);
    process.exit(0);
  }
}

setupServer();
