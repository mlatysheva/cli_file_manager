import { createReadStream, createWriteStream } from 'fs';
import { invalidInputMessage } from '../utils/invalidInputMessage.js';
import { checkPaths } from '../utils/checkPaths.js';
import { insertBeforeLastOccurrence } from '../utils/stringToInsert.js';
import { consoleColors } from '../utils/consoleColors.js';

export const cp = async (fileToCopy, newDestination) => {
  try {
    const filename = fileToCopy.replace(/^.*[\\\/]/, '');
    const paths = await checkPaths(fileToCopy, newDestination, filename);
    if (paths) {
      let { absolutePath, newAbsolutePath } = paths;
      if (absolutePath === newAbsolutePath) {
        newAbsolutePath = insertBeforeLastOccurrence(
          newAbsolutePath,
          '.',
          '_copy'
        );
      }
      const readable = createReadStream(absolutePath);
      const writable = createWriteStream(newAbsolutePath);
      readable.pipe(writable);
      console.log(
        consoleColors.cyan,
        `File ${fileToCopy} was successfully copied to ${newAbsolutePath}`
      );
    } else {
      invalidInputMessage();
    }
  } catch (err) {
    console.error(consoleColors.red, `Operation failed! ${err}`);
  }
};
