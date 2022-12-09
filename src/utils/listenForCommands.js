import readline from 'readline';
import os from 'os';
import { help } from './help.js';
import { cwdMessage } from './cwdMessage.js';
import { capitalizeFirstLetter } from './capitaliseFirstLetter.js';
import { moveUp } from '../nwd/up.js';
import { cd } from '../nwd/cd.js';
import { ls } from '../nwd/ls.js';

export const listenForCommands = (username, userHomedir) => {
  let cwd = userHomedir;

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
          console.log(`Thank you for using the File Manager, ${capitalizeFirstLetter(username)}!`);
          process.exit();
        };
      case 'help': {
        help();
        cwdMessage();
        break;
      };
      case 'up': {
        cwd = moveUp(cwd);
        break;
      };
      case 'cd': {
        if (args.length > 0) {
          cwd = cd(cwd, args);
          break;
        } else {
          console.log('Specify a valid path');
          break;
        }
      };
      case 'ls': {
        ls();
        break;
      }
    }
  })
}
