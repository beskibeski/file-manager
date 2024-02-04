import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { printCustomError, printInvalidInputMessage } from './errors.js';
import { extname, basename, isAbsolute, resolve } from 'path';
import { printCurrentDirectory }from './directory.js';
import { promisify } from 'util';
import { pipeline } from 'stream';

const pipe = promisify(pipeline);

const compressFile = async (pathToFile, pathToDestination) => {
  if (!isAbsolute(pathToFile)) {
    pathToFile = resolve(pathToFile);
  };
  if (!isAbsolute(pathToDestination)) {
    pathToDestination = resolve(pathToDestination);
  };  
  if (!isAbsolute(pathToFile) || !isAbsolute(pathToDestination)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  };  

  const makeBrotli = async (pathToFile, pathToDestination) => {    
    const rs = createReadStream(`${pathToFile}`).on('error', () => {      
    });
    const brotli = createBrotliCompress();    
    const ws = createWriteStream(`${pathToDestination}${basename(pathToFile)}.br`).on('error', () => {      
    });
    await pipe(rs, brotli, ws).finally(() => { printCurrentDirectory() });
  }

  makeBrotli(pathToFile, pathToDestination)
    .catch(() => {
      printCustomError();
      printCurrentDirectory();
    });
};

const deCompressFile = (pathToFile, pathToDestination) => {
  if (!isAbsolute(pathToFile)) {
    pathToFile = resolve(pathToFile);
  };
  if (!isAbsolute(pathToDestination)) {
    pathToDestination = resolve(pathToDestination);
  };
  if (!isAbsolute(pathToFile) || !isAbsolute(pathToDestination)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  };  

  const unMakeBrotli = async (pathToFile, pathToDestination) => {
    const fileSuffix = extname(pathToFile);
    const rs = createReadStream(`${pathToFile}`).on('error', () => {      
    });
    const brotli = createBrotliDecompress();    
    const ws = createWriteStream(`${pathToDestination}${basename(pathToFile, fileSuffix)}`).on('error', () => {      
    });
    await pipe(rs, brotli, ws).finally(() => { printCurrentDirectory() });
  }

  unMakeBrotli(pathToFile, pathToDestination)
    .catch(() => {
      printCustomError();
      printCurrentDirectory();
    });
};

export { compressFile, deCompressFile };