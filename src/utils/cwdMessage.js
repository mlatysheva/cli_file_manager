import os from 'os';
import { consoleColors } from './consoleColors.js';

export const cwdMessage = () => {
  const cwd = process.cwd();
  console.log(consoleColors.yellow, `You are currently in ${cwd}${os.EOL}`);
}
