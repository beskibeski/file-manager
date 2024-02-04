import { isAbsolute, dirname, basename, sep }from 'path';
import { printCustomError, printInvalidInputMessage } from './errors.js';
import { createReadStream, createWriteStream } from 'fs';
import { unlink, writeFile, rename } from 'fs/promises';
import { printCurrentDirectory } from './directory.js';

const readFile = async (pathToFile) => {
  if (!isAbsolute(pathToFile)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  }
  createReadStream(`${pathToFile}`)
    .on('error', () => {
      printCustomError();
      printCurrentDirectory();
    })
    .on('end', () => {
      console.log();
      printCurrentDirectory();
    })
    .pipe(process.stdout);
};

const createFile = async (pathToFile) => {
  if (!isAbsolute(pathToFile)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  }
  writeFile(pathToFile, '', { flag: 'ax' })
    .then(() => {
      printCurrentDirectory();
    })
    .catch(() => {
      printCustomError();
      printCurrentDirectory();
    })
};

const renameFile = async (pathToFile, newFilename) => {
  const fileDirectory = dirname(pathToFile);
  if (!isAbsolute(pathToFile)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  }    
    rename(pathToFile, `${fileDirectory}${newFilename}`)
      .then(() => {
        printCurrentDirectory();
      })
      .catch(() => {
        printCustomError();
        printCurrentDirectory();
      });
  }

const copyFile = async (pathToFile, pathToDirectory) => {
  if (!isAbsolute(pathToFile) || !isAbsolute(pathToDirectory)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  }
  const filename = basename(pathToFile);
  const rs = createReadStream(pathToFile);
  const ws = createWriteStream(`${pathToDirectory}${sep}${filename}`);
  rs.pipe(ws);
  rs.on('error', () => {
    printCustomError();
    printCurrentDirectory();
  });
  ws.on('error', () => {
    printCustomError();
    printCurrentDirectory();
  });
  rs.on('end', () => {    
    printCurrentDirectory();
  });
};

const moveFile = async (pathToFile, pathToDirectory) => {
  if (!isAbsolute(pathToFile) || !isAbsolute(pathToDirectory)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  }
  const filename = basename(pathToFile);
  const rs = createReadStream(pathToFile);
  const ws = createWriteStream(`${pathToDirectory}${sep}${filename}`);
  rs.pipe(ws);
  rs.on('error', () => {
    printCustomError();
    printCurrentDirectory();
  });
  ws.on('error', () => {
    printCustomError();
    printCurrentDirectory();
  });
  rs.on('close', () => {    
    removeFile(pathToFile);   
  });
};

const removeFile = async (pathToFile) => {
  if (!isAbsolute(pathToFile)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  }

  unlink(pathToFile)
    .catch(() => {
      printCustomError();
    })
    .finally(() => {
      printCurrentDirectory();
    })
};

export { readFile, createFile, renameFile, copyFile, moveFile, removeFile };