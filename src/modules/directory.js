import { homedir } from 'os';
import { sep } from 'path';
import { chdir } from 'process';

let currentDirectory = homedir();
chdir(currentDirectory);
const pathSeparator = sep;

const printCurrentDirectory = () => console.log(`You are currently in ${currentDirectory}\nCommand me! (up, ls, .exit)`); 
const getCurrentDirectory = () => currentDirectory;

const goUpperCurrentDirectory = () => { 
  let count = currentDirectory.split('').reduce((acc, n) => n === pathSeparator ? acc += 1 : acc, 0);  
  if (count > 1) {
    currentDirectory = currentDirectory.slice(0, currentDirectory.lastIndexOf(pathSeparator));
    chdir(currentDirectory);
  } else {
    currentDirectory = currentDirectory.slice(0, currentDirectory.lastIndexOf(pathSeparator) + 1);
    chdir(currentDirectory);
  }
  printCurrentDirectory();
};


export { goUpperCurrentDirectory, printCurrentDirectory, getCurrentDirectory };