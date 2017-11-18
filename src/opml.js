const fs = require('fs');
const path = require('path');

const thenify = require('thenify');
const parseOpml = thenify(require('node-opml-parser'));

module.exports = async opmlPath => {
  let filePath;
  if (fs.existsSync(opmlPath)) {
    filePath = opmlPath;
  } else {
    filePath = path.join(process.cwd(), opmlPath);
  }
  const opmlFile = fs.readFileSync(filePath);
  const result = await parseOpml(opmlFile.toString());
  return result;
};
