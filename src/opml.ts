import fs from 'fs';
import path from 'path';

import thenify from 'thenify';
const parseOpml = thenify(require('node-opml-parser'));

export default async (opmlPath?: any) => {
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
