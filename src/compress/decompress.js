import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';
import { cwdMessage } from '../utils/cwdMessage.js';
import { invalidInputMessage } from '../utils/invalidInputMessage.js';

export const decompress = async (fileToDecompress, newDestination) => {
  try {
    if (fileToDecompress.slice(-3) !== '.br') {
      invalidInputMessage(`${fileToDecompress} is not a valid compressed file. Specify a file with a valid extention ".br"`);
      cwdMessage();
    } else {
      const absolutePath = getAbsolutePath(fileToDecompress);
      const filename = fileToDecompress.slice(0, -3).replace(/^.*[\\\/]/, '');
      let newAbsolutePath;
      if (fileToDecompress === newDestination) {
        newAbsolutePath = path.resolve(path.dirname(newDestination));
      } else {
        newAbsolutePath = getAbsolutePath(newDestination);
      }      
      const doesAbsolutePathExist = doesExist(absolutePath);
      let doesNewAbsolutePathExist = true;
      if (!newAbsolutePath.includes('.')) {
        doesNewAbsolutePathExist = doesExist(newAbsolutePath);
        newAbsolutePath = path.resolve(newAbsolutePath, filename);
      } else {
        doesNewAbsolutePathExist = doesExist(path.dirname(newAbsolutePath));
      }
      if (doesAbsolutePathExist && doesNewAbsolutePathExist) {   
        const fileToDecompress = createReadStream(absolutePath);
        const writableStream = createWriteStream(newAbsolutePath);
        const brotli = zlib.createBrotliDecompress();

        fileToDecompress.pipe(brotli).pipe(writableStream);

        console.log(`The file ${filename} was successfully decompressed to ${newAbsolutePath}.`);
        cwdMessage();
      } else {
        invalidInputMessage();
        cwdMessage();
      }
    }
  } catch (err) {
    console.log(`Operation failed! ${err}`);
    cwdMessage();
  }
};
