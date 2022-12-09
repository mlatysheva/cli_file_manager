import { writeFile } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { cwdMessage } from '../utils/cwdMessage.js';

export const add = async (userPath) => {
  const absolutePath = getAbsolutePath(userPath);
  try {
    await writeFile(absolutePath, '');
    console.log(`File ${userPath} was successfully created.`);
  } catch (err) {
    console.log(`Operation failed! ${err}`);
  }
  cwdMessage();
}
