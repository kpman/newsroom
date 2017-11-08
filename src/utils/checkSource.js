const invariant = require('invariant');

module.exports = (source, sources) => {
  const result = sources.some(s => s.title === source);
  invariant(result, `The source \`${source}\` is not in the sources(.opml)!`);
};
