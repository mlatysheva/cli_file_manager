import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { cwdMessage } from '../utils/cwdMessage.js';
import { cp } from './cp.js';
import { rm } from 'fs/promises';

export const mv = async (fileToMove, newDestination) => {
  try {
    cp(fileToMove, newDestination);
    const absolutePath = getAbsolutePath(fileToMove);
    await rm(absolutePath);
    console.log(`${fileToMove} was successfully moved to ${newDestination}`);
    cwdMessage();
  } catch (err) {
    console.error(`Operation failed! ${err}`);
    cwdMessage();
  }
};
