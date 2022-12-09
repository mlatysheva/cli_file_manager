import os from 'os';
import { cwdMessage } from '../utils/cwdMessage.js';
import path from 'path';

export const moveUp = (cwd) => {
  if (cwd === os.homedir()) {
    console.log(`You are already in your root directory: ${os.homedir()}${os.EOL}Enter command or type "help":`);
    return cwd;
  } else {
    const newCwd = path.join(cwd, '..');
    process.chdir(newCwd);
    cwdMessage();
    return newCwd;
  } 
};
