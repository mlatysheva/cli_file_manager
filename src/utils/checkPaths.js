import path from 'path';
import { doesExist } from './doesExist.js';
import { getAbsolutePath } from './getAbsolutePath.js';

export const checkPaths = (pathToFile, newDestination, filename) => {

  const absolutePath = getAbsolutePath(pathToFile);
  let newAbsolutePath;
  if (pathToFile === newDestination) {
    newAbsolutePath = path.resolve(path.dirname(newDestination));
  } else {
    newAbsolutePath = getAbsolutePath(newDestination);
  }      
  const doesAbsolutePathExist = doesExist(absolutePath);
  let doesNewAbsolutePathExist = true;
  if (!newAbsolutePath.includes('.')) {
    doesNewAbsolutePathExist = doesExist(newAbsolutePath);
    newAbsolutePath = path.resolve(newAbsolutePath, filename);
  } else {
    doesNewAbsolutePathExist = doesExist(path.dirname(newAbsolutePath));
  }
  if (doesAbsolutePathExist && doesNewAbsolutePathExist) { 
    return {absolutePath, newAbsolutePath};
  } else return null;
}
