import os from 'os';
import { consoleColors } from '../utils/consoleColors.js';
import { cwdMessage } from '../utils/cwdMessage.js';

export const osOptions = (osArg) => {
  switch (osArg) {
    case "homedir": {
      console.log(os.homedir());
      cwdMessage();
      break;
    };
    case "architecture": {
      console.log(os.arch());
      cwdMessage();
      break;
    };
    case "cpus": {
      const cpuCores = os.cpus();
      console.log(`Total CPU cores: ${cpuCores.length}`);
      cpuCores.map((item) => {
        console.dir(item);
      });
      cwdMessage();
      break;
    };
    case "EOL": {
      console.log(JSON.stringify(os.EOL));
      cwdMessage();
      break;
    };
    case "username": {
      console.log(os.userInfo().username);
      cwdMessage();
      break;
    };
    default: {
      console.log(consoleColors.red, `No such command ${osArg}. Type "help" to see available commands.`);
      cwdMessage();
      break;
    };
  }
};
