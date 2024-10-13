import { argv, stdin } from 'process';
import { printInvalidInputMessage } from './modules/errors.js';
import { goUpperCurrentDirectory, printCurrentDirectory, changePath } from './modules/directory.js';
import { readFile, createFile, renameFile, copyFile, moveFile, removeFile } from './modules/files.js';
import printFileList from './modules/file-list.js';
import COLORS from './modules/colors.js';

let username = '';

const TEXT_EXIT = `Thank you for using File Manager, `;
const TEXT_WELCOME = `Welcome to the File Manager, `;
const USER_NONAME = 'Noname';

const COMMANDS = {
  EXIT: '.exit',
  GO_UPPER: 'up',
  CHANGE_DIRECTORY: 'cd',
  PRINT_FILES_AND_FOLDERS: 'ls',
  READ_AND_PRINT_FILE: 'cat',
  ADD_NEW_FILE: 'add',
  RENAME_FILE: 'rn',
  COPY_FILE: 'cp',
  MOVE_FILE: 'mv',
  REMOVE_FILE: 'rm',
}

const start = () => {
  startAppWithUserName();
}

const startAppWithUserName = () => {
  console.log(argv[2])
  if (argv.length <= 2 || argv[2].slice(0, 11) !== '--username=') {
    username = USER_NONAME;    
  } else {
    username = argv[2].length !== 11 ? argv[2].slice(11) : USER_NONAME;
  }
  console.log(COLORS.MAIN, TEXT_WELCOME + `${username}!`);
  printCurrentDirectory();  
  makeReadStream();
}

const makeReadStream = async () => {
  process.on('SIGINT', () => {    
    console.log(COLORS.MAIN, TEXT_EXIT + `${username}, goodbye!`);
    process.exit();  
  });  
  stdin.on('data', (chunk) => {    
    if (chunk.toString().includes(COMMANDS.EXIT)){
      console.log(COLORS.MAIN, TEXT_EXIT);
      process.exit();      
    }
    if (chunk.toString().trim().length === 2) {     
      switch(chunk.toString().trim()) {
        case COMMANDS.GO_UPPER:
          goUpperCurrentDirectory();          
        break;        
        case COMMANDS.PRINT_FILES_AND_FOLDERS:
          printFileList();
        break;
        default:
          printInvalidInputMessage();
          printCurrentDirectory();
        break;    
      }
    } else {
      switch(chunk.toString().split(' ')[0]) {
        case COMMANDS.CHANGE_DIRECTORY:
          changePath(chunk.toString().split(' ')[1].replace('?', ' '));
        break;
        case COMMANDS.READ_AND_PRINT_FILE:
          readFile(chunk.toString().split(' ')[1].trim().replace('?', ' '));
        break;
        case COMMANDS.ADD_NEW_FILE:
          createFile(chunk.toString().split(' ')[1].trim().replace('?', ' '));
        break;
        case COMMANDS.RENAME_FILE:
          if (chunk.toString().split(' ')[2] !== undefined) {
            renameFile(chunk.toString().split(' ')[1].replace('?', ' '), chunk.toString().split(' ')[2].trim().replace('?', ' '));
          }
          else {
            printInvalidInputMessage();
            printCurrentDirectory();
          }
        break;
        case COMMANDS.COPY_FILE:
          if (chunk.toString().split(' ')[2] !== undefined) {
            copyFile(chunk.toString().split(' ')[1].replace('?', ' '), chunk.toString().split(' ')[2].trim().replace('?', ' '));
          } else {
            printInvalidInputMessage();
            printCurrentDirectory();
          }          
        break;
        case COMMANDS.MOVE_FILE:
          if (chunk.toString().split(' ')[2] !== undefined) {
            moveFile(chunk.toString().split(' ')[1].replace('?', ' '), chunk.toString().split(' ')[2].trim().replace('?', ' '));
          } else {
            printInvalidInputMessage();
            printCurrentDirectory();
          }
        break;
        case COMMANDS.REMOVE_FILE:
          removeFile(chunk.toString().split(' ')[1].trim().replace('?', ' '));          
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