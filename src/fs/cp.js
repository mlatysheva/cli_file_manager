import { createReadStream, createWriteStream, lstatSync } from 'fs';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { cwdMessage } from '../utils/cwdMessage.js';
import path from 'path';
import { invalidInputMessage } from '../utils/invalidInputMessage.js';

export const cp = (fileToCopy, newDestination) => {
  try {
    const absolutePath = getAbsolutePath(fileToCopy);
    const filename = fileToCopy.replace(/^.*[\\\/]/, '');
    let newAbsolutePath = getAbsolutePath(newDestination);
    const doesAbsolutePathExist = doesExist(absolutePath);
    let doesNewAbsolutePathExist = true;
    if (!newAbsolutePath.includes('.')) {
      doesNewAbsolutePathExist = doesExist(newAbsolutePath);
      newAbsolutePath = path.resolve(newAbsolutePath, filename);
    } else {
      const newAbsolutePathDirname = path.dirname(newAbsolutePath);
      doesNewAbsolutePathExist = doesExist(newAbsolutePathDirname);
    }
    if (doesAbsolutePathExist && doesNewAbsolutePathExist) {  
      const readable = createReadStream(absolutePath);
      const writable = createWriteStream(newAbsolutePath);
      readable.pipe(writable);
      console.log(`File ${fileToCopy} was successfully copied to ${newDestination}`);
      cwdMessage();
    } else {
      invalidInputMessage();
      cwdMessage();
    }
  } catch (err) {
    console.error(`Operation failed! ${err}`);
    cwdMessage();
  }
};
