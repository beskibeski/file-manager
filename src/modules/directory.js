import { homedir } from 'os';
import { sep, normalize, isAbsolute, resolve } from 'path';
import { printCustomError, printInvalidInputMessage } from './errors.js';
import { access } from 'node:fs/promises';

let currentDirectory = homedir();
const pathSeparator = sep;

const printCurrentDirectory = () => console.log(`You are currently in ${currentDirectory}`); 
const getCurrentDirectory = () => currentDirectory;

const goUpperCurrentDirectory = () => {  
  let count = currentDirectory.split('').reduce((acc, n) => n === pathSeparator ? acc += 1 : acc, 0);  
  if (count > 1) {
    currentDirectory = currentDirectory.slice(0, currentDirectory.lastIndexOf(pathSeparator));
  } else {
    currentDirectory = currentDirectory.slice(0, currentDirectory.lastIndexOf(pathSeparator) + 1);
  }
};

const changePath = async (pathToFile) => {
  let newPath = pathToFile.trim();
  if (!isAbsolute(newPath)) {
    newPath = resolve(newPath);
    console.log(newPath)
  }
  if (newPath.length < 3 || !/^[a-zA-Z]+$/.test(newPath[0]) || newPath[2] !== pathSeparator || newPath[1] !== (':')) {
    printInvalidInputMessage();
    printCurrentDirectory();
  } else {    
    access(normalize(newPath))
      .then(() => {
        currentDirectory = normalize(newPath);        
      })
      .catch(() =>
        printCustomError())
      .finally(() => {
        printCurrentDirectory();
      })                
  }
}

export { goUpperCurrentDirectory, printCurrentDirectory, changePath, getCurrentDirectory };