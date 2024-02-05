import { isAbsolute, dirname, basename, sep, resolve }from 'path';
import { printCustomError, printInvalidInputMessage } from './errors.js';
import { createReadStream, createWriteStream } from 'fs';
import { unlink, writeFile, rename } from 'fs/promises';
import { printCurrentDirectory } from './directory.js';

const readFile = async (pathToFile) => {
  if (!isAbsolute(pathToFile)) {
    pathToFile = resolve(pathToFile);
  };
  if (!isAbsolute(pathToFile)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  };
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
  if (!isAbsolute(pathToFile)) {
    pathToFile = resolve(pathToFile);
  };  
  if (!isAbsolute(pathToFile)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  };
  const fileDirectory = dirname(pathToFile);
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
  let isAlreadyPrintedError = false;
  if (!isAbsolute(pathToFile)) {
    pathToFile = resolve(pathToFile);
  };
  if (!isAbsolute(pathToDirectory)) {
    pathToDirectory = resolve(pathToDirectory);
  };
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
    isAlreadyPrintedError = true;
    printCustomError();
    printCurrentDirectory();    
  });
  ws.on('error', () => {    
    if (!isAlreadyPrintedError) {
      printCustomError();
      printCurrentDirectory(); 
    }     
  });
  rs.on('end', () => {    
    printCurrentDirectory();
  });
};

const moveFile = async (pathToFile, pathToDirectory) => {
  let isAlreadyPrintedError = false;
  if (!isAbsolute(pathToFile)) {
    pathToFile = resolve(pathToFile);
  };
  if (!isAbsolute(pathToDirectory)) {
    pathToDirectory = resolve(pathToDirectory);
  };
  if (!isAbsolute(pathToFile) || !isAbsolute(pathToDirectory)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  };
  const filename = basename(pathToFile);
  const rs = createReadStream(pathToFile);
  const ws = createWriteStream(`${pathToDirectory}${sep}${filename}`);
  rs.pipe(ws);
  rs.on('error', () => {
    isAlreadyPrintedError = true;
    printCustomError();
    printCurrentDirectory();    
  });
  ws.on('error', () => {
    if (!isAlreadyPrintedError) {
      printCustomError();
      printCurrentDirectory(); 
    }   
  });
  ws.on('finish', () => {
    removeFile(pathToFile);
  });
};

const removeFile = async (pathToFile) => {
  if (!isAbsolute(pathToFile)) {
    pathToFile = resolve(pathToFile);
  };  
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