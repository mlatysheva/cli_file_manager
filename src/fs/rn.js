import { rename } from 'fs/promises';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { cwdMessage } from '../utils/cwdMessage.js';

export const rn = async (fileToRename, newName) => {
  try {
    const absolutePath = getAbsolutePath(fileToRename);
    const doesExistPath = doesExist(absolutePath);
    if (doesExistPath) {
      await rename(absolutePath, getAbsolutePath(newName));
      console.log(`${fileToRename} was successfully renamed to ${newName}`);
      cwdMessage();
    } else {
      console.log(`No such file ${fileToRename} exists!`);
      cwdMessage();
    }
  } catch (err) {
    console.error(`Operation failed! ${err}`);
  }
};
