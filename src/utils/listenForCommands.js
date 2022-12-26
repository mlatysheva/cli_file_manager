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
import { osOptions } from '../os/osOptions.js';
import { invalidInputMessage } from './invalidInputMessage.js';
import { hash } from '../hash/hash.js';
import { compress } from '../compress/compress.js';
import { decompress } from '../compress/decompress.js';
import { consoleColors } from './consoleColors.js';

export const listenForCommands = (username, userHomedir) => {
  let cwd = userHomedir;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (line) => {
    try {
      const [command, ...args] = line.trim().split(' ');
      switch (command) {
        case 'exit':
        case '.exit':
        case process.exit: {
          console.log(
            consoleColors.cyan,
            `Thank you for using the File Manager, ${capitalizeFirstLetter(
              username
            )}!`
          );
          process.exit();
        }
        case 'help': {
          help();
          break;
        }
        case 'up': {
          cwd = moveUp(cwd);
          break;
        }
        case 'cd': {
          if (args.length > 0) {
            cwd = await cd(cwd, args);
          } else {
            invalidInputMessage();
          }
          break;
        }
        case 'ls': {
          await ls();
          break;
        }
        case 'cat': {
          if (args.length > 0) {
            const pathToFile = args.join(' ').toString();
            await cat(pathToFile);
          } else {
            invalidInputMessage();
          }
          break;
        }
        case 'add': {
          if (args.length > 0) {
            const pathToFile = args.join(' ').toString();
            await add(pathToFile);
          } else {
            invalidInputMessage();
          }
          break;
        }
        case 'rn': {
          if (args.length === 2) {
            const fileToRename = args[0].toString();
            const newName = args[1].toString();
            await rn(fileToRename, newName);
          } else {
            invalidInputMessage();
          }
          break;
        }
        case 'cp': {
          if (args.length === 2) {
            const fileToCopy = args[0].toString();
            const newDestination = args[1].toString();
            await cp(fileToCopy, newDestination);
          } else if (args.length === 1) {
            const fileToCopy = args[0].toString();
            await cp(fileToCopy, fileToCopy);
          } else {
            invalidInputMessage();
          }
          break;
        }
        case 'mv': {
          if (args.length === 2) {
            const fileToMove = args[0].toString();
            const newDestination = args[1].toString();
            await mv(fileToMove, newDestination);
          } else {
            invalidInputMessage();
          }
          break;
        }
        case 'rm': {
          if (args.length === 1) {
            const pathToFile = args[0];
            await remove(pathToFile);
          } else {
            invalidInputMessage();
          }
          break;
        }
        case 'os': {
          if (args.length > 0 && args[0].startsWith('--')) {
            const arg = args[0].slice(2);
            osOptions(arg);
          } else {
            invalidInputMessage(
              'Invalid input! Specify a valid command after "os". Type "help" to see available commands.'
            );
          }
          break;
        }
        case 'hash': {
          if (args.length > 0) {
            const pathToFile = args.join(' ');
            await hash(pathToFile);
          } else {
            invalidInputMessage();
          }
          break;
        }
        case 'compress': {
          if (args.length === 2) {
            const fileToCompress = args[0].toString();
            const newDestination = args[1].toString();
            await compress(fileToCompress, newDestination);
          } else if (args.length === 1) {
            const fileToCompress = args[0].toString();
            await compress(fileToCompress, fileToCompress);
          } else {
            invalidInputMessage();
          }
          break;
        }
        case 'decompress': {
          if (args.length === 2) {
            const fileToDecompress = args[0].toString();
            const newDestination = args[1].toString();
            await decompress(fileToDecompress, newDestination);
          } else if (args.length === 1) {
            const fileToDecompress = args[0].toString();
            await decompress(fileToDecompress, fileToDecompress);
          } else {
            invalidInputMessage();
          }
          break;
        }
        default: {
          invalidInputMessage(
            'Invalid input! Type "help" to see available commands.'
          );
          break;
        }
      }
    } catch (error) {
      invalidInputMessage(
        'Invalid input! Type "help" to see available commands.'
      );
    } finally {
      cwdMessage();
    }
  }).on('close', () => {
    console.log(
      `Thank you for using File Manager, ${capitalizeFirstLetter(username)}!`
    );
  });
};
