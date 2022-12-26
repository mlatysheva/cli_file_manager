import fs from 'fs/promises';

export const doesExist = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    console.error(error);
    return false;    
  }
}
