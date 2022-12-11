import { rename } from 'fs/promises';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { cwdMessage } from '../utils/cwdMessage.js';
import { consoleColors } from '../utils/consoleColors.js';

export const rn = async (fileToRename, newName) => {
  try {
    const absolutePath = getAbsolutePath(fileToRename);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
      await rename(absolutePath, getAbsolutePath(newName));
      console.log(consoleColors.cyan, `${fileToRename} was successfully renamed to ${newName}`);
      cwdMessage();
    } else {
      console.log(consoleColors.red, `No such file ${fileToRename} exists!`);
      cwdMessage();
    }
  } catch (err) {
    console.error(consoleColors.red, `Operation failed! ${err}`);
  }
};
