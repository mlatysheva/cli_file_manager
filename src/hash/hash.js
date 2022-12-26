import crypto from 'crypto';
import { readFile } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { invalidInputMessage } from '../utils/invalidInputMessage.js';
import { doesExist } from '../utils/doesExist.js';
import { consoleColors } from '../utils/consoleColors.js';

export const hash = async (pathToFile) => {
  try {
    const fileToHash = getAbsolutePath(pathToFile);
    if (await doesExist(fileToHash)) {
      const content = await readFile(fileToHash);
      const hash = crypto.createHash('sha256').update(content).digest('hex');
      console.log(
        consoleColors.cyan,
        `The hash for the file ${pathToFile} is ${hash}`
      );
    } else {
      invalidInputMessage();
    }
  } catch (err) {
    console.error(err);
  }
};
