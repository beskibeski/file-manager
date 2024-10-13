import { isAbsolute, resolve } from 'path';
import { printCustomError, printInvalidInputMessage } from './errors.js';
import { printCurrentDirectory } from './directory.js';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';

const printHashForFile = async (pathToFile) => {
  let newPath = pathToFile.trim();
  if (!isAbsolute(newPath)) {
    newPath = resolve(newPath);
  };
  if (isAbsolute(newPath)) {
    const rs = createReadStream(`${newPath}`);
    const hashStream = createHash('sha256').setEncoding('hex');
    const output = process.stdout;    
    rs.on('error', () => {
      printCustomError();
      printCurrentDirectory();
    })
    .pipe(hashStream).on('finish', () => {
      console.log('');
      printCurrentDirectory();
    })
    .pipe(output);
  } else {
    printInvalidInputMessage();
    printCurrentDirectory();
  }
}

export default printHashForFile;