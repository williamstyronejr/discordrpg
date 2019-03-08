const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  discordId: { type: String, required: true },
  name: { type: String, required: true },
  job: { type: String, required: true },
  level: { type: Number, default: 1 },
  created: { type: Date, default: Date.now }
});

const Character = mongoose.model('character', characterSchema);
module.exports = Character;
