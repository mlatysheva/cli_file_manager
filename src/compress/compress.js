import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';
import { cwdMessage } from '../utils/cwdMessage.js';
import { invalidInputMessage } from '../utils/invalidInputMessage.js';

export const compress = async (fileToCompress, newDestination) => {
  try {
    console.log(`newDestination is ${newDestination}`);
    const absolutePath = getAbsolutePath(fileToCompress);
    const filename = fileToCompress.replace(/^.*[\\\/]/, '');

    let newAbsolutePath;
    if (fileToCompress === newDestination) {
      newAbsolutePath = path.resolve(path.dirname(newDestination));
    } else {
      newAbsolutePath = getAbsolutePath(newDestination);
    }      
    const doesAbsolutePathExist = doesExist(absolutePath);
    let doesNewAbsolutePathExist = true;

    if (!newAbsolutePath.includes('.')) {
      doesNewAbsolutePathExist = doesExist(newAbsolutePath);
      newAbsolutePath = path.resolve(newAbsolutePath, `${filename}.br`);
    } else {
      const newAbsolutePathDirname = path.dirname(newAbsolutePath);
      doesNewAbsolutePathExist = doesExist(newAbsolutePathDirname);
    }
    if (doesAbsolutePathExist && doesNewAbsolutePathExist) {   
      const fileToCompress = createReadStream(absolutePath);
      const writableStream = createWriteStream(newAbsolutePath);
      const brotli = zlib.createBrotliCompress();

      fileToCompress.pipe(brotli).pipe(writableStream);
      console.log(`The file ${filename} was successfully compressed to ${newAbsolutePath}.`);
      cwdMessage();
    } else {
      invalidInputMessage();
      cwdMessage();
    }
  } catch (err) {
    console.log(`Operation failed! ${err}`);
    cwdMessage();
  }
};
