import os from 'os';

export const cwdMessage = () => {
  const cwd = process.cwd();
  console.log(`You are currently in ${cwd}${os.EOL}`);
}
