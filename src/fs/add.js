import { writeFile } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { cwdMessage } from '../utils/cwdMessage.js';
import { consoleColors } from '../utils/consoleColors.js';

export const add = async (userPath) => {
  const absolutePath = getAbsolutePath(userPath);
  try {
    await writeFile(absolutePath, '');
    console.log(consoleColors.cyan, `File ${userPath} was successfully created.`);
  } catch (err) {
    console.log(consoleColors.red, `Operation failed! ${err}`);
  }
  cwdMessage();
}
