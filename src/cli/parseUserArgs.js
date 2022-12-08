export const parseUserArgs = () => {
  try{
    const userArgs = process.argv.slice(2).toString();
    let argsObject = {};

    if(userArgs.startsWith('--') && userArgs.includes('=')) {
      const userName = userArgs.split('=')[1];
      argsObject = { username: userName}; 
    } else {
      argsObject = { error: 'Please run the program in the following format: npm run start -- --username=your_username'};
    };
    return argsObject;
  } catch(err) {
    throw new Error('Error parcing arguments');
  }
};