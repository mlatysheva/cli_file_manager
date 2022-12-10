import { rename } from 'fs/promises';
import { EOL } from 'os';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { cwdMessage } from '../utils/cwdMessage.js';

export const rn = async (fileToRename, newName) => {
  try {
    const absolutePath = getAbsolutePath(fileToRename);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
      await rename(absolutePath, getAbsolutePath(newName));
      console.log(`${fileToRename} was successfully renamed to ${newName}${EOL}`);
      cwdMessage();
    } else {
      console.log(`No such file ${fileToRename} exists!`);
      cwdMessage();
    }
  } catch (err) {
    console.error(`Operation failed! ${err}`);
  }
};
