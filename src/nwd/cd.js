import path from 'path';
import { cwdMessage } from '../utils/cwdMessage.js';
import { doesExist } from '../utils/doesExist.js';
import os from 'os';
import { consoleColors } from '../utils/consoleColors.js';

export const cd = async (cwd, paths) => {
  try {
    const newCwd = path.join(cwd, paths.join(' '));
    const pathDoesExist = await doesExist(newCwd);
    if (pathDoesExist) {
      process.chdir(newCwd);
      cwdMessage();
      return newCwd;
    } else {
      console.log(consoleColors.red, `No such directory ${newCwd} exists.`);
      cwdMessage();
      return cwd;
    }
  } catch (error) {
    console.log(consoleColors.red, `An error has occurred:${os.EOL} ${error}`);
    console.log(consoleColors.yellow, `Enter a command or type "help"`);
  }
}