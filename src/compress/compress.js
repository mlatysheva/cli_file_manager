import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { cwdMessage } from '../utils/cwdMessage.js';
import { invalidInputMessage } from '../utils/invalidInputMessage.js';
import { checkPaths } from '../utils/checkPaths.js';

export const compress = async (fileToCompress, newDestination) => {
  try {
    const filename = fileToCompress.replace(/^.*[\\\/]/, '');
    const paths = await checkPaths(fileToCompress, newDestination, filename);
    if (paths) {
      const { absolutePath, newAbsolutePath } = paths;    
      const fileToCompress = createReadStream(absolutePath);
      const writableStream = createWriteStream(newAbsolutePath + '.br');
      const brotli = zlib.createBrotliCompress();

      fileToCompress.pipe(brotli).pipe(writableStream);
      console.log(`The file ${filename} was successfully compressed to ${newAbsolutePath}.br.`);
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
