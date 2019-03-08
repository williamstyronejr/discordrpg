const mongoose = require('mongoose');

/**
 * Connects to database using mongoose.
 * @param {string} uri URI for database to connect to
 * @param {object} options Mongoose options objects
 * @return {Promise} A promise to resolve when connection to database is made,
 *  or reject if a error occurred.
 */
exports.connectDatabase = (uri, options = { useNewUrlParser: true }) => {
  return mongoose.connect(uri, options);
};

/**
 * Closes all connection to database
 */
exports.closeConnection = () => {
  return mongoose.close();
};
