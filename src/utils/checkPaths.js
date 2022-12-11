/**
 * @description: function checks if the paths are valid and resolves the issue when the user does not indicate 
 * the destination folder to use the original folder as the destination folder
 * @param: pathToFile - path to the original file, newDestination - path to the modified file, filename - name of the original file with extension
 * @return: object with resolved paths to the original file and new destination if the user indicated valid paths or
 * null otherwise
 */
import path from 'path';
import { doesExist } from './doesExist.js';
import { getAbsolutePath } from './getAbsolutePath.js';

export const checkPaths = async (pathToFile, newDestination, filename) => {

  const absolutePath = getAbsolutePath(pathToFile);
  let newAbsolutePath;
  if (pathToFile === newDestination) {
    newAbsolutePath = path.resolve(path.dirname(newDestination));
  } else {
    newAbsolutePath = getAbsolutePath(newDestination);
  }      
  const doesAbsolutePathExist = await doesExist(absolutePath);
  let doesNewAbsolutePathExist = true;
  if (!newAbsolutePath.includes('.')) {
    doesNewAbsolutePathExist = await doesExist(newAbsolutePath);
    newAbsolutePath = path.resolve(newAbsolutePath, filename);
  } else {
    doesNewAbsolutePathExist = await doesExist(path.dirname(newAbsolutePath));
  }
  if (doesAbsolutePathExist && doesNewAbsolutePathExist) { 
    return {absolutePath, newAbsolutePath};
  } else return null;
}
