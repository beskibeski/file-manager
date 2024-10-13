import { homedir } from 'os';
import { sep, normalize, isAbsolute, resolve } from 'path';
import { chdir } from 'process';
import { access } from 'node:fs/promises';
import { printCustomError, printInvalidInputMessage } from './errors.js';
import COLORS from './colors.js';

let currentDirectory = homedir();
chdir(currentDirectory);
const pathSeparator = sep;

const printCurrentDirectory = () => console.log(COLORS.SECOND, `You are currently in ${currentDirectory}\nCommand me! (up, ls, cd, os, hash, .exit and e.t.c.)`);
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


export { goUpperCurrentDirectory, printCurrentDirectory, getCurrentDirectory, changePath };