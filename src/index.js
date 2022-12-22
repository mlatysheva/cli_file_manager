#!/usr/bin/env node
import { parseUserArgs } from './cli/parseUserArgs.js';
import { homedir } from 'os';
import { cwdMessage } from './utils/cwdMessage.js';
import { listenForCommands } from './utils/listenForCommands.js';
import { capitalizeFirstLetter } from './utils/capitaliseFirstLetter.js';
import { consoleColors } from './utils/consoleColors.js';

const userArgs = parseUserArgs();
if (userArgs.username) {
  console.log(
    consoleColors.cyan,
    `Welcome to the File Manager, ${capitalizeFirstLetter(userArgs.username)}!`
  );
} else {
  process.stdout.write(userArgs.error);
  process.exit(1);
}

const userHomedir = homedir();
process.chdir(userHomedir);
cwdMessage();
console.log(`Enter a command or type "help" to see available commands.`);
listenForCommands(userArgs.username, userHomedir);
