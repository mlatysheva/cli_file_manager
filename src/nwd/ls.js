import fs from 'fs/promises';
import path from 'path';
import { consoleColors } from '../utils/consoleColors.js';

export const ls = async () => {
  try {
    const folder = process.cwd();
    const itemsArray = [];
    const items = await fs.readdir(folder, { withFileTypes: true });
    await Promise.allSettled(
      items.map(async (item) => {
        const pathToItem = path.resolve(folder, item.name);
        const itemStats = await fs.stat(pathToItem);
        let itemData = {};

        if (itemStats.isFile()) {
          itemData = {
            Name: item.name.length < 20 ? item.name : item.name.slice(20),
            Type: 'file',
            Size: itemStats.size,
          };
        } else {
          itemData = {
            Name: item.name.length < 20 ? item.name : item.name.slice(20),
            Type: 'directory',
          };
        }
        itemsArray.push(itemData);
      })
    );

    itemsArray.sort((a, b) =>
      a.Type > b.Type ? 1 : a.Type === b.Type ? (a.Name > b.Name ? 1 : -1) : -1
    );
    console.table(itemsArray);
  } catch (error) {
    console.log(consoleColors.red, `Operation failed! ${error}`);
  }
};
