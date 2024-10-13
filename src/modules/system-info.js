import { cpus, EOL, homedir, userInfo } from 'os';
import { printInvalidInputMessage } from './errors.js';
import { printCurrentDirectory } from './directory.js';

const OS_ARGUMENTS = {
  END_OF_LINE: '--EOL',
  CPU: '--cpus',
  HOME_DIRECTORY: '--homedir',
  USERNAME: '--username',
  ARCHITECTURE: '--architecture',
}

const showSystemInfo = (argument) => {
  switch(argument.trim()) {
    case OS_ARGUMENTS.END_OF_LINE:
      console.log(`Your default system End-Of-Line is ${JSON.stringify(EOL)}`);   
      printCurrentDirectory();
    break;
    case OS_ARGUMENTS.CPU:
      console.log(`Overall amount of CPUS: ${cpus().length}`);
      console.log(`You CPUS are:`);
      for (let cpu of cpus()) {
        console.log(`${cpu.model} with clock rate ${cpu.speed / 1000} GHz`);
      }
      printCurrentDirectory();
    break;
    case OS_ARGUMENTS.HOME_DIRECTORY:
      console.log(`Your home directory is ${homedir}`);
      printCurrentDirectory();
    break;
    case OS_ARGUMENTS.USERNAME:
      console.log(`Your system username is ${userInfo().username}`);
      printCurrentDirectory();
    break;
    case OS_ARGUMENTS.ARCHITECTURE:
      console.log(`Your CPU architecture for which Node.js binary has compiled is ${process.arch}`);
      printCurrentDirectory();
    break;
    default:
      printInvalidInputMessage();
      printCurrentDirectory();
    break;
  }
}

export default showSystemInfo;