import { createReadStream } from 'fs';
import { cwdMessage } from '../utils/cwdMessage.js';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { EOL } from 'os';
import { consoleColors } from '../utils/consoleColors.js';

export const cat = async (pathToFile) => {
  try {
    const fileToRead = getAbsolutePath(pathToFile);
    if (await doesExist(fileToRead)) {
      const readableStream = await createReadStream(fileToRead);

      readableStream.on('error', () => {
        console.log(consoleColors.red, `Error reading the file.`);
      });

      readableStream.on('data', (chunk) => {
        process.stdout.write(chunk);
      });

      readableStream.on('end', () => {
        console.log(EOL);
        cwdMessage();
      });
    } else {
      console.log(
        consoleColors.red,
        'Operation failed. The file does not exist.'
      );
    }
  } catch (err) {
    console.error(err);
  }
};
