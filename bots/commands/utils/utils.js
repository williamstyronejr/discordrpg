/**
 * Util function for creating constant error messages across commands by
 *  appending the help commmand for the given command.
 * @param {string} message A message to include additional details
 * @param {string} command The command to create the message for
 * @return {string} A user friendly message to provide help when error occurs.
 */
exports.createErrorMessage = (message, command) => {
  return `\nError: \n\t${message} \n\t Use !help ${command} for help.`;
};
