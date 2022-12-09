import readline from 'readline';
import { help } from './help.js';
import { cwdMessage } from './cwdMessage.js';
import { capitalizeFirstLetter } from './capitaliseFirstLetter.js';
import { moveUp } from '../nwd/up.js';
import { cd } from '../nwd/cd.js';
import { ls } from '../nwd/ls.js';
import { cat } from '../fs/cat.js';
import { add } from '../fs/add.js';
import { rn } from '../fs/rn.js';
import { cp } from '../fs/cp.js';
import { mv } from '../fs/mv.js';
import { remove } from '../fs/rm.js';

export const listenForCommands = (username, userHomedir) => {
  let cwd = userHomedir;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (line) => {
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
      };
      case 'cat': {
        if (args.length > 0) {
          const pathToFile = args.join(' ').toString();
          await cat(pathToFile);
          break;
        } else {
          console.log('Specify a valid path');
          cwdMessage();
          break;
        }
      };
      case 'add': {
        if (args.length > 0) {
          const pathToFile = args.join(' ').toString();
          await add(pathToFile);
          break;
        } else {
          console.log('Specify a valid path');
          cwdMessage();
          break;
        }
      };
      case 'rn': {
        if (args.length === 2) {
          const fileToRename = args[0].toString();
          const newName = args[1].toString();
          await rn(fileToRename, newName);
          break;
        } else {
          console.log('Specify valid paths');
          cwdMessage();
          break;
        }
      };
      case 'cp': {
        if (args.length === 2) {
          const fileToCopy = args[0].toString();
          const pathToNewDirectory = args[1].toString();
          cp(fileToCopy, pathToNewDirectory);
          break;
        } else {
          console.log('Specify valid paths');
          cwdMessage();
          break;
        }
      };
      case 'mv': {
        if (args.length === 2) {
          const fileToMove = args[0].toString();
          const newDestination = args[1].toString();
          mv(fileToMove, newDestination);
          break;
        } else {
          console.log('Specify valid paths');
          cwdMessage();
          break;
        }
      };
      case 'rm': {
        if (args.length === 1) {
          const pathToFile = args[0];
          await remove(pathToFile);
          break;
        } else {
          console.log('Specify a valid path');
          cwdMessage();
          break;
        }
      };
    }
  })
}
