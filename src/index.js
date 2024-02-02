import { argv } from 'process';
import { showSystemInfo, showCurrentSystemDirectory } from './modules/system-info.js';
import printInvalidInputMessage from './modules/errors.js';

let username = '';
let currentDirectory = showCurrentSystemDirectory();

const start = () => {
  startAppWithUserName();
}

const startAppWithUserName = () => {  
  if (argv.length <= 2 || argv[2].slice(0, 11) !== '--username=') {
    console.error('wrong arguments. Please start application in this way: npm run start or node src/index.js -- --username=your_username');
  } else if (argv[2].length >= 11 && argv[2].slice(0, 11) === '--username=') {
    username = argv[2].length !== 11 ? argv[2].slice(11) : 'Noname user';    
    console.log(`Welcome to the File Manager, ${username}!`);
    console.log(`You are currently in ${currentDirectory}`);
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
    switch(chunk.toString().split(' ')[0]) {
      case 'os':        
        showSystemInfo(chunk.toString().split(' ')[1]);
      break;
      default:
        printInvalidInputMessage();
      break;
    }
  });
};

start();