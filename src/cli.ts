import minimist from 'minimist';

import main from './main';
import { error } from './utils/log';
import handleEscKeypress from './utils/handleEscKeypress';

handleEscKeypress();

main(minimist(process.argv.slice(2)))
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    error(e);
    process.exit(1);
  });
