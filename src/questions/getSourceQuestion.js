const searchSources = require('./searchSources');

module.exports = sources => ({
  type: 'autocomplete',
  name: 'source',
  message: 'Please choose a source:',
  source: searchSources(sources),
});
