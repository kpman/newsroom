const searchSources = require('./searchSources');

module.exports = sources => ({
  type: 'autocomplete',
  name: 'source',
  suggestOnly: true,
  message: 'Please choose a source:',
  source: searchSources(sources),
  validate: val => (val ? true : 'Type something!'),
});
