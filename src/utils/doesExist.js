import fs from 'fs';

export const doesExist = (paths) => {
  try {
    return fs.lstatSync(paths).isDirectory();
  } catch (error) {
    console.error(error);
  }
}
