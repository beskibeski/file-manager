import { argv } from 'process';
import showSystemInfo from './modules/system-info.js';
import { printInvalidInputMessage } from './modules/errors.js';
import { goUpperCurrentDirectory, printCurrentDirectory, changePath } from './modules/directory.js';
import printHashForFile from './modules/hash.js';
import printFileList from './modules/file-list.js';
import { deCompressFile, compressFile } from './modules/archives.js';
import { copyFile, createFile, readFile, removeFile, renameFile, moveFile } from './modules/files.js';

let username = '';

const start = () => {
  startAppWithUserName();
}

const startAppWithUserName = () => {  
  if (argv.length <= 2 || argv[2].slice(0, 11) !== '--username=') {
    console.error('Wrong arguments. Please start application in this way: npm run start -- --username=your_username or node src/index.js --username=your_username');
  } else if (argv[2].length >= 11 && argv[2].slice(0, 11) === '--username=') {
    username = argv[2].length !== 11 ? argv[2].slice(11) : 'Noname user';    
    console.log(`Welcome to the File Manager, ${username}!`);
    printCurrentDirectory();
    makeReadStream();
  }
}

const makeReadStream = async () => {
  process.on('SIGINT', () => {    
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);    
    process.exit();  
  });  
  process.stdin.on('data', (chunk) => {    
    if (chunk.toString().includes('.exit')){
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit();      
    }
    if (chunk.toString().trim().length === 2) {
      switch(chunk.toString().trim()) {
        case 'up':
          goUpperCurrentDirectory();
          printCurrentDirectory();
        break;
        case 'ls':
          printFileList();       
        break;
      }
    } else { 
      switch(chunk.toString().split(' ')[0]) {
        case 'os':        
          showSystemInfo(chunk.toString().split(' ')[1]);
          printCurrentDirectory();
        break;
        case 'cd':        
          changePath(chunk.toString().split(' ')[1]);
        break;
        case 'hash':
          printHashForFile(chunk.toString().split(' ')[1]);
        break;
        case 'compress':
          compressFile(chunk.toString().split(' ')[1], chunk.toString().split(' ')[2].trim());
        break;
        case 'decompress':
          deCompressFile(chunk.toString().split(' ')[1], chunk.toString().split(' ')[2].trim());
        break;
        case 'cat':
          readFile(chunk.toString().split(' ')[1].trim());
        break;
        case 'add':
          createFile(chunk.toString().split(' ')[1].trim());
        break;
        case 'rn':
          renameFile(chunk.toString().split(' ')[1], chunk.toString().split(' ')[2].trim());
        break;
        case 'cp':
          copyFile(chunk.toString().split(' ')[1], chunk.toString().split(' ')[2].trim());
        break;
        case 'mv':
          moveFile(chunk.toString().split(' ')[1], chunk.toString().split(' ')[2].trim());
        break;
        case 'rm':
          removeFile(chunk.toString().split(' ')[1].trim());          
        break;        
        default:
          printInvalidInputMessage();
          printCurrentDirectory();
        break;        
      }
    }
  });
};

start();