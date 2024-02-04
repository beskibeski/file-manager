import { homedir } from 'os';
import { sep, normalize, isAbsolute, resolve } from 'path';
import { printCustomError, printInvalidInputMessage } from './errors.js';
import { access } from 'node:fs/promises';

let currentDirectory = homedir();
process.chdir(currentDirectory);
const pathSeparator = sep;

const printCurrentDirectory = () => console.log(`You are currently in ${currentDirectory}`); 
const getCurrentDirectory = () => currentDirectory;

const goUpperCurrentDirectory = () => {  
  let count = currentDirectory.split('').reduce((acc, n) => n === pathSeparator ? acc += 1 : acc, 0);  
  if (count > 1) {
    currentDirectory = currentDirectory.slice(0, currentDirectory.lastIndexOf(pathSeparator));
    process.chdir(currentDirectory);
  } else {
    currentDirectory = currentDirectory.slice(0, currentDirectory.lastIndexOf(pathSeparator) + 1);
    process.chdir(currentDirectory);
  }
};

const changePath = async (pathToFile) => {
  let newPath = pathToFile.trim();
  if (!isAbsolute(newPath)) {
    newPath = resolve(newPath);
  }
  if (isAbsolute(newPath)) {    
    access(normalize(newPath))
      .then(() => {
        currentDirectory = normalize(newPath);
        process.chdir(currentDirectory);
      })
      .catch(() =>
        printCustomError())
      .finally(() => {
        printCurrentDirectory();
      })                
  } else {
    printInvalidInputMessage();
    printCurrentDirectory();
  }
}

export { goUpperCurrentDirectory, printCurrentDirectory, changePath, getCurrentDirectory };