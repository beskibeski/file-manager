import { argv, stdin } from 'process';
import { printInvalidInputMessage } from './modules/errors.js';
import { goUpperCurrentDirectory, printCurrentDirectory } from './modules/directory.js';
import printFileList from './modules/file-list.js';

let username = '';

const TEXT_EXIT = `Thank you for using File Manager, ${username}, goodbye!`;
const TEXT_WELCOME = `Welcome to the File Manager, ${username}!`;
const USER_NONAME = 'Noname';

const COMMANDS = {
  EXIT: '.exit',
  GO_UPPER: 'up',
  CHANGE_DIRECTORY: 'cd',
  PRINT_FILES_AND_FOLDERS: 'ls',
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
  console.log(TEXT_WELCOME);
  printCurrentDirectory();  
  makeReadStream();
}

const makeReadStream = async () => {
  process.on('SIGINT', () => {    
    console.log(TEXT_EXIT);    
    process.exit();  
  });  
  stdin.on('data', (chunk) => {    
    if (chunk.toString().includes(COMMANDS.EXIT)){
      console.log(TEXT_EXIT);
      process.exit();      
    }
    if (chunk.toString().trim().length === 2) {     
      switch(chunk.toString().trim()) {
        case COMMANDS.GO_UPPER:
          goUpperCurrentDirectory();          
        break;
        case COMMANDS.CHANGE_DIRECTORY:
        break;
        case COMMANDS.PRINT_FILES_AND_FOLDERS:
          printFileList();
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