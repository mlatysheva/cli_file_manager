#!/usr/bin/env node
import { parseUserArgs } from './cli/parseUserArgs.js';
import os, { homedir } from 'os';
import { cwdMessage } from './utils/cwdMessage.js';
import { listenForCommands} from './utils/listenForCommands.js';

const userArgs = parseUserArgs();
if (userArgs.username) {
  console.log(`Welcome to the File Manager, ${userArgs.username}!`);
} else {
  process.stdout.write(userArgs.error);
  process.exit(1);
}

const userHomedir = homedir();
process.chdir(userHomedir);
cwdMessage();
console.log(`Enter a command or type "help" to see all available commands.`);
listenForCommands(userArgs.username, userHomedir);

