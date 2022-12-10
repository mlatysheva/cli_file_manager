import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { cwdMessage } from '../utils/cwdMessage.js';
import { invalidInputMessage } from '../utils/invalidInputMessage.js';
import { checkPaths } from '../utils/checkPaths.js';

export const decompress = async (fileToDecompress, newDestination) => {
  try {
    if (fileToDecompress.slice(-3) !== '.br') {
      invalidInputMessage(`${fileToDecompress} is not a valid compressed file. Specify a file with a valid extention ".br"`);
      cwdMessage();
    } else {
      const filename = fileToDecompress.slice(0, -3).replace(/^.*[\\\/]/, '');
      const paths = await checkPaths(fileToDecompress, newDestination, filename);
      if (paths) {
        const { absolutePath, newAbsolutePath } = paths;       
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
