import crypto from 'crypto';
import { readFile } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { invalidInputMessage } from '../utils/invalidInputMessage.js';
import { doesExist } from '../utils/doesExist.js';
import { cwdMessage } from '../utils/cwdMessage.js';

export const hash = async (pathToFile) => {
  try {
    const fileToHash = getAbsolutePath(pathToFile);
    if (await doesExist(fileToHash)) {
      const content = await readFile(fileToHash);
      const hash = crypto.createHash('sha256').update(content).digest('hex');
      console.log(`The hash for the file ${pathToFile} is ${hash}`);
      cwdMessage();
    } else {
      invalidInputMessage();
      cwdMessage();
    }
  } catch(err) {
    console.error(err);
  }
};
