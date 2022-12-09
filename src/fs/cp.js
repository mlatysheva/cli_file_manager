import { createReadStream, createWriteStream, lstatSync } from 'fs';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { cwdMessage } from '../utils/cwdMessage.js';
import path from 'path';

export const cp = (fileToCopy, newDestination) => {
  try {
    const filename = fileToCopy.replace(/^.*[\\\/]/, '');
    console.log(filename);
    const absolutePath = getAbsolutePath(fileToCopy);
    let newAbsolutePath = getAbsolutePath(newDestination);

    const doesAbsolutePathExist = doesExist(absolutePath);
    const doesNewAbsolutePathExist = doesExist(newAbsolutePath);
    const isDirectory = lstatSync(newAbsolutePath).isDirectory();
    if (doesNewAbsolutePathExist && isDirectory) {
      newAbsolutePath = path.resolve(newAbsolutePath, filename);
    }
    if (doesAbsolutePathExist && doesNewAbsolutePathExist) {
      const readable = createReadStream(absolutePath);
      const writable = createWriteStream(newAbsolutePath);
      readable.pipe(writable);
      console.log(`File ${fileToCopy} was successfully copied to ${newDestination}`);
      cwdMessage();
    } else {
      console.log(`Specify valid paths for the file to copy and new destination!`);
      cwdMessage();
    }
  } catch (err) {
    console.error(`Operation failed! ${err}`);
    cwdMessage();
  }
};
