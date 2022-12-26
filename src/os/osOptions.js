import os from 'os';
import { consoleColors } from '../utils/consoleColors.js';

export const osOptions = (osArg) => {
  switch (osArg) {
    case 'homedir': {
      console.log(os.homedir());
      break;
    }
    case 'architecture': {
      console.log(os.arch());
      break;
    }
    case 'cpus': {
      const cpuCores = os.cpus();
      console.log(`Total CPU cores: ${cpuCores.length}`);
      cpuCores.map((item) => {
        console.dir(item);
      });
      break;
    }
    case 'EOL': {
      console.log(JSON.stringify(os.EOL));
      break;
    }
    case 'username': {
      console.log(os.userInfo().username);
      break;
    }
    default: {
      console.log(
        consoleColors.red,
        `No such command ${osArg}. Type "help" to see available commands.`
      );
      break;
    }
  }
};
