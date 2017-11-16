const fs = require('fs');
const path = require('path');

const thenify = require('thenify');
const parseOpml = thenify(require('node-opml-parser'));

module.exports = async opmlPath => {
  const opmlFile = fs.readFileSync(path.join(__dirname, opmlPath));
  const result = await parseOpml(opmlFile.toString());
  return result;
};
