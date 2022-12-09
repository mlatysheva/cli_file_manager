import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { cwdMessage } from '../utils/cwdMessage.js';
import { rm } from 'fs/promises';
import { doesExist } from '../utils/doesExist.js';

export const remove = async (fileToDelete) => {
  try {
    const absolutePath = getAbsolutePath(fileToDelete);
    if (doesExist(absolutePath)) {
      await rm(absolutePath);
      console.log(`${fileToDelete} was successfully deleted`);
    } else {
      console.error(`Operation failed! The file ${fileToDelete} does not exist`);
    }    
    cwdMessage();
  } catch (err) {
    console.error(`Operation failed! ${err}`);
    cwdMessage();
  }
};
