import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { rm } from 'fs/promises';
import { doesExist } from '../utils/doesExist.js';
import { consoleColors } from '../utils/consoleColors.js';

export const remove = async (fileToDelete) => {
  try {
    const absolutePath = getAbsolutePath(fileToDelete);
    if (await doesExist(absolutePath)) {
      await rm(absolutePath);
      console.log(
        consoleColors.cyan,
        `${fileToDelete} was successfully deleted`
      );
    } else {
      console.error(
        consoleColors.red,
        `Operation failed! The file ${fileToDelete} does not exist`
      );
    }
  } catch (err) {
    console.error(consoleColors.red, `Operation failed! ${err}`);
  }
};
