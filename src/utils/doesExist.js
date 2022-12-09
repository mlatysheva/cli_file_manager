import fs from 'fs';

export const doesExist = (pathToItem) => {
  try {
    return fs.existsSync(pathToItem);
  } catch (error) {
    console.error(error);
  }
}
