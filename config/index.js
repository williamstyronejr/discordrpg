if (process.env.NODE_ENV === 'production') {
  module.exports = require('./config.prod');
} else if (process.env.NODE_ENV === 'ci') {
  module.exports = require('./config.ci');
} else {
  module.exports = require('./config.dev');
}
