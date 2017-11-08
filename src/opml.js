const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const parseOpml = promisify(require('node-opml-parser'));

async function main(opmlpath) {
  const opmlFile = fs.readFileSync(path.join(__dirname, opmlpath));
  const result = await parseOpml(opmlFile.toString());
  return result;
}

module.exports = main;
