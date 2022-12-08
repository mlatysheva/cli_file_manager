#!/usr/bin/env node
import { parseUserArgs } from './cli/parseUserArgs.js';
import os, { homedir } from 'os';
import { cwdMessage } from './utils/cwdMessage.js';
import { help } from './utils/help.js';
import { commands } from './utils/commands.js';

const userArgs = parseUserArgs();
if (userArgs.username) {
  process.stdout.write(`Welcome to the File Manager, ${userArgs.username}!${os.EOL}`);
} else {
  process.stdout.write(userArgs.error);
  process.exit(1);
}

const userHomedir = homedir();
process.chdir(userHomedir);
cwdMessage();
process.stdout.write(`Enter a command or type "help" to see all available commands.${os.EOL}`);
commands(userArgs.username);
