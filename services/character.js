const Character = require('../models/character');

/**
 * Creates a character.
 * @param {string} discordId User's discord id
 * @return {Promise<object>} A promise to resolve with the created character.
 */
exports.createCharacter = (discordId, name, job) => {
  return Character({
    discordId,
    name,
    job
  }).save();
};

/**
 * Deletes a character by the user's discord id.
 * @param {string} discordId Discord id of user removing character.
 * @param {string} name Name of character
 * @return {Promise<Object>} A promise to resolve with the deleted character.
 */
exports.deleteCharacter = (discordId, name) => {
  return Character.findOneAndDelete({
    discordId,
    name
  }).exec();
};

/**
 * Gets all characters that belong to a user by their discord id.
 * @param {string} discordId Discord id of user to find characters for.
 * @return {Promise<Array>} A promise to resolve with an array of characters
 *  that belong to the user.
 */
exports.getCharactersOfUser = discordId => {
  return Character.find({ discordId }).exec();
};
