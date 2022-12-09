import fs from 'fs';
import path from 'path';
import { cwdMessage } from '../utils/cwdMessage.js';

export const ls = () => {
  try {
    const folder = process.cwd();  

    const content = fs.readdirSync(folder, { withFileTypes: true }).map(item => {
      const pathToItem = path.resolve(folder, item.name);
      const itemStats = fs.lstatSync(pathToItem);
      let itemData = {};
      if (itemStats.isFile()) {
        itemData = {
          Name: item.name.length < 20 ? item.name : item.name.slice(20),
          Type: 'file',
          Size: itemStats.size
        }
      } else {
        itemData = {
          Name: item.name.length < 20 ? item.name : item.name.slice(20),
          Type: 'directory',
        }
      }
      return itemData;
    });

    content.sort((a, b) => (a.Type > b.Type) ? 1 : (a.Type === b.Type) ? ((a.Name > b.Name) ? 1 : -1) : -1 );
    console.table(content);
    cwdMessage();

  } catch(err) {
    console.error(err);
  }
};
