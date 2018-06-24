const invariant = require('invariant');

module.exports = (source, sourcesInfo) => {
  const result = sourcesInfo.some(sourceInfo => sourceInfo.title === source);
  invariant(result, `The source \`${source}\` is not in the sources(.opml)!`);
};
