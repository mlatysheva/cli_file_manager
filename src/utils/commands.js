import readline from 'readline';
import os from 'os';
import { help } from './help.js';
import { cwdMessage } from './cwdMessage.js';
import { capitalizeFirstLetter } from './capitaliseFirstLetter.js';

export const commands = (username) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (line) => {
    const [command, ...args] = line.trim().split(" ");
    switch (command) {
      case 'exit':
        case '.exit': 
        case process.exit: {
          process.stdout.write(`Thank you for using the File Manager, ${capitalizeFirstLetter(username)}!${os.EOL}`);
          process.exit();
        };
      case 'help': {
        help();
        cwdMessage();
        break;
      };
    }
  })
}
