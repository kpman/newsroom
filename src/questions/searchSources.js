const fuzzy = require('fuzzy');

const searchSources = sources => (answers, _input) => {
  const input = _input || '';
  return new Promise(resolve => {
    const fuzzyResult = fuzzy.filter(input, sources);
    resolve(fuzzyResult.map(el => el.original));
  });
};

module.exports = searchSources;
