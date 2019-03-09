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
    displayName: name,
    job
  }).save();
};

/**
 * Deletes a character by the user's discord id and name.
 * @param {string} discordId Discord id of user deleting character
 * @param {string} name Name of character
 * @return {Promise<Object>} A promise to resolve with the deleted character.
 */
exports.deleteCharacter = (discordId, name) => {
  return Character.findOneAndDelete({
    discordId,
    displayName: name,
    name
  }).exec();
};

/**
 * Finds and returns a character by name and discordId.
 * @param {string} discordId Discord id of the user the character belongs to
 * @param {string} name Name of character to find
 * @return {Promise<object>} A promise to resolve with a character object, or
 *  null if no character could be found.
 */
exports.getCharacterByName = (discordId, name) => {
  return Character.findOne({
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
