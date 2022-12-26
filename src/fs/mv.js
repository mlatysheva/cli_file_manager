import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { cp } from './cp.js';
import { rm } from 'fs/promises';
import { consoleColors } from '../utils/consoleColors.js';

export const mv = async (fileToMove, newDestination) => {
  try {
    cp(fileToMove, newDestination);
    const absolutePath = getAbsolutePath(fileToMove);
    await rm(absolutePath);
    console.log(
      consoleColors.cyan,
      `${fileToMove} was successfully moved to ${newDestination}`
    );
  } catch (err) {
    console.error(consoleColors.red, `Operation failed! ${err}`);
  }
};
