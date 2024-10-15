import { readdir } from 'fs/promises';
import { getCurrentDirectory, printCurrentDirectory } from './directory.js';
import { printCustomError } from './errors.js';

const printFileList = () => {
  readdir(getCurrentDirectory(), {withFileTypes: true})
    .then((data) => {
      let newData = data
        .map((value) => {        
          return {          
            Name: value.name,
            Type: value.isFile() ? 'file' : value.isDirectory() ? 'directory' : value.isSymbolicLink ? 'symbolic link' : 'socket',                   
          }
        })
        .sort((a, b) =>
          a.Name.toLowerCase() < b.Name.toLowerCase() ? 1 : -1)
        .sort((a, b) =>
          a.Type > b.Type ? 1 : -1)
      console.table(newData);
    })
    .catch(() => {
      printCustomError();
    })
    .finally(() => {
      printCurrentDirectory();
    })
}

export default printFileList;