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
          invalidInputMessage();
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
          invalidInputMessage();
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
          invalidInputMessage();
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
          invalidInputMessage();
          cwdMessage();
          break;
        }
      };
      case 'cp': {
        if (args.length === 2) {
          const fileToCopy = args[0].toString();
          const newDestination = args[1].toString();
          cp(fileToCopy, newDestination);
          break;
        } else if (args.length === 1) {
          const fileToCopy = args[0].toString();
          cp(fileToCopy, fileToCopy);
          break;
        } else {
          invalidInputMessage();
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
          invalidInputMessage();
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
          invalidInputMessage();
          cwdMessage();
          break;
        }
      };
      case 'os': {
        if (args.length > 0 && args[0].startsWith('--')) {
          const arg = args[0].slice(2);
          osOptions(arg);
        } else {
          invalidInputMessage('Invalid input! Specify a valid command after "os". Type "help" to see available commands.');
          cwdMessage();
        }
      };
      case "hash": {
        if (args.length > 0) {
          const pathToFile = args.join(' ');
          await hash(pathToFile);
        } else {
          invalidInputMessage();
          cwdMessage();
        }
        break;
      };
      case "compress": {
        if (args.length === 2) {
          const fileToCompress = args[0].toString();
          const newDestination = args[1].toString();
          compress(fileToCompress, newDestination);
          break;
        } else if (args.length === 1) {
          const fileToCompress = args[0].toString();
          compress(fileToCompress, fileToCompress);
          break;
        } else {
          invalidInputMessage();
          cwdMessage();
          break;
        }
      };
      case "decompress": {
        if (args.length === 2) {
          const fileToDecompress = args[0].toString();
          const newDestination = args[1].toString();
          decompress(fileToDecompress, newDestination);
          break;
        } else if (args.length === 1) {
          const fileToDecompress = args[0].toString();
          decompress(fileToDecompress, fileToDecompress);
          break;
        } else {
          invalidInputMessage();
          cwdMessage();
          break;
        }
      };
      default: {
        invalidInputMessage('Invalid input! Type "help" to see available commands.');
        cwdMessage();
        break;
      };
    };  
  }).on('close', () => {console.log(`Thank you for using File Manager, ${capitalizeFirstLetter(username)}!`)});
}
