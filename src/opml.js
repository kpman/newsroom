const fs = require('fs');
const path = require('path');

const thenify = require('thenify');
const parseOpml = thenify(require('node-opml-parser'));

module.exports = async (opmlPath) => {
  let filePath;
  if (opmlPath) {
    if (fs.existsSync(opmlPath)) {
      filePath = opmlPath;
    } else {
      filePath = path.join(process.cwd(), opmlPath);
    }
  } else {
    // default sources
    filePath = path.join(__dirname, './sources.opml');
  }

  const opmlFile = fs.readFileSync(filePath);
  const result = await parseOpml(opmlFile.toString());
  return result;
};
