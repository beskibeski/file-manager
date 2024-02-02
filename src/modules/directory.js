import { homedir } from 'os';

let currentDirectory = homedir();

const logCurrentSystemDirectory = () => console.log(`You current directory is ${currentDirectory}`); 

const goUpperCurrentDirectory = () => {
  let count = currentDirectory.split('').reduce((acc, n) => n === '\\' ? acc += 1 : acc, 0);
  console.log(count);
  if (count > 1) {
    currentDirectory = currentDirectory.slice(0, currentDirectory.lastIndexOf('\\'));
  } else if (count === 1) {
    currentDirectory = currentDirectory.slice(0, currentDirectory.lastIndexOf('\\') + 1);
  }
};

export { goUpperCurrentDirectory, logCurrentSystemDirectory };