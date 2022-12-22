import path from 'path';
import { doesExist } from '../utils/doesExist.js';
import os from 'os';
import { consoleColors } from '../utils/consoleColors.js';

export const cd = async (cwd, paths) => {
  try {
    const newCwd = path.join(cwd, paths.join(' '));
    const pathDoesExist = await doesExist(newCwd);
    if (pathDoesExist) {
      process.chdir(newCwd);
      return newCwd;
    } else {
      console.log(consoleColors.red, `No such directory ${newCwd} exists.`);
      return cwd;
    }
  } catch (error) {
    console.log(consoleColors.red, `An error has occurred:${os.EOL} ${error}`);
    console.log(consoleColors.yellow, `Enter a command or type "help"`);
  }
};
