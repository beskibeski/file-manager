import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { printCustomError, printInvalidInputMessage } from './errors.js';
import { extname, basename, isAbsolute } from 'path';
import { printCurrentDirectory }from './directory.js';
import { promisify } from 'util';
import { pipeline } from 'stream';

const pipe = promisify(pipeline);

const compressFile = async (path_to_file, path_to_destination) => {  
  if (!isAbsolute(path_to_file) || !isAbsolute(path_to_destination)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  };  

  const makeBrotli = async (path_to_file, path_to_destination) => {    
    const rs = createReadStream(`${path_to_file}`).on('error', () => {      
    });
    const brotli = createBrotliCompress();    
    const ws = createWriteStream(`${path_to_destination}${basename(path_to_file)}.br`).on('error', () => {      
    });
    await pipe(rs, brotli, ws).finally(() => { printCurrentDirectory() });
  }

  makeBrotli(path_to_file, path_to_destination)
    .catch(() => {
      printCustomError();
      printCurrentDirectory();
    });
};

const deCompressFile = (path_to_file, path_to_destination) => {
  if (!isAbsolute(path_to_file) || !isAbsolute(path_to_destination)) {
    printInvalidInputMessage();
    printCurrentDirectory();
    return;
  };  

  const unMakeBrotli = async (path_to_file, path_to_destination) => {
    const fileSuffix = extname(path_to_file);
    const rs = createReadStream(`${path_to_file}`).on('error', () => {      
    });
    const brotli = createBrotliDecompress();    
    const ws = createWriteStream(`${path_to_destination}${basename(path_to_file, fileSuffix)}`).on('error', () => {      
    });
    await pipe(rs, brotli, ws).finally(() => { printCurrentDirectory() });
  }

  unMakeBrotli(path_to_file, path_to_destination)
    .catch(() => {
      printCustomError();
      printCurrentDirectory();
    });
};

export { compressFile, deCompressFile };