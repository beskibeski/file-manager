import { argv } from 'process';
import showSystemInfo from './modules/system-info.js';
import { printInvalidInputMessage } from './modules/errors.js';
import { goUpperCurrentDirectory, printCurrentSystemDirectory, changePath }from './modules/directory.js';

let username = '';

const start = () => {
  startAppWithUserName();
}

const startAppWithUserName = () => {  
  if (argv.length <= 2 || argv[2].slice(0, 11) !== '--username=') {
    console.error('wrong arguments. Please start application in this way: npm run start or node src/index.js -- --username=your_username');
  } else if (argv[2].length >= 11 && argv[2].slice(0, 11) === '--username=') {
    username = argv[2].length !== 11 ? argv[2].slice(11) : 'Noname user';    
    console.log(`Welcome to the File Manager, ${username}!`);
    printCurrentSystemDirectory();
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
    if (chunk.toString().trim().length === 2 && chunk.toString().trim() === 'up') {      
        goUpperCurrentDirectory();
        printCurrentSystemDirectory();
    } else { 
      switch(chunk.toString().split(' ')[0]) {
        case 'os':        
          showSystemInfo(chunk.toString().split(' ')[1]);
          printCurrentSystemDirectory();
        break;
        case 'cd':        
          changePath(chunk.toString().split(' ')[1]);         
        break; 
        default:
          printInvalidInputMessage();
          printCurrentSystemDirectory();
        break;
      }
    }
  });
};

start();