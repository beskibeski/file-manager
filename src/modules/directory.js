import { homedir } from 'os';
import { sep } from 'path';
import { printCustomError, printInvalidInputMessage } from './errors.js';
import { access } from 'node:fs/promises';

let currentDirectory = homedir();
const pathSeparator = sep;

const printCurrentSystemDirectory = () => console.log(`You current directory is ${currentDirectory}`); 

const goUpperCurrentDirectory = () => {  
  let count = currentDirectory.split('').reduce((acc, n) => n === pathSeparator ? acc += 1 : acc, 0);  
  if (count > 1) {
    currentDirectory = currentDirectory.slice(0, currentDirectory.lastIndexOf(pathSeparator));
  } else {
    currentDirectory = currentDirectory.slice(0, currentDirectory.lastIndexOf(pathSeparator) + 1);
  }
};

const changePath = async (newPath) => {
  if (newPath.length < 3 || !/^[a-zA-Z]+$/.test(newPath[0]) || newPath[2] !== pathSeparator || newPath[1] !== (':')) {
    printInvalidInputMessage();
    printCurrentSystemDirectory();
  } else {    
    access(newPath.trim())
      .then(() => {
        currentDirectory = newPath.trim();        
      })
      .catch(() =>
        printCustomError())
      .finally(() => {
        printCurrentSystemDirectory();
      })                
  }
}

export { goUpperCurrentDirectory, printCurrentSystemDirectory, changePath };