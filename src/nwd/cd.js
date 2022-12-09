import path from 'path';
import { cwdMessage } from '../utils/cwdMessage.js';
import { doesExist } from '../utils/doesExist.js';
import os from 'os';

export const cd = (cwd, paths) => {
  try {
    const newCwd = path.join(cwd, paths.join(' '));
    const pathDoesExist = doesExist(newCwd);
    if (pathDoesExist) {
      process.chdir(newCwd);
      cwdMessage();
      return newCwd;
    } else {
      console.log(`No such directory ${newCwd} exists.`);
      cwdMessage();
      return cwd;
    }
  } catch (error) {
    console.log(`An error has occurred:${os.EOL} ${error}`);
    console.log(`Enter a command or type "help"`);
  }
}