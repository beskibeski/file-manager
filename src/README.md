# File manager

## Description

## BEWARE!!!! IF YOU WANT TO MAKE SOME OPERATION WITH FILE OR DIRECTORY WHICH NAME CONTAINS SPACES PLEASE TYPE `?` INSTEAD OF ` `!!!!!
## BEWARE!!!! IF YOU ARE YOU USING POWERSHELL YOU MY HAVE TO RUN NPM-SCRIPT BY npm run start -- -- --username=your_username!!!!!


The program is started by npm-script `start` in following way:
```bash
npm run start -- --username=your_username
```
Application exits if it is sent `.exit` command or it is 
pressed `ctrl+c`:
```bash
.exit
```
- In case of unknown operation or invalid input (missing mandatory arguments, wrong data in arguments, etc.) `Invalid input` message is shown and user is able to enter another command
- In case of error during execution of operation `Operation failed` message is shown and user is able to enter another command (e.g. attempt to perform an operation on a non-existent file or work on a non-existent path should result in the operation fail)

List of operations and their syntax:
- Navigation & working directory (nwd)
    - Go upper from current directory (when you are in the root folder this operation doesn't change working directory, you can make the root folder to be home directory in directory.js by removing multi-line comments)  
    ```bash
    up
    ```
    - Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute)
    ```bash
    cd path_to_directory
    ```
    - Print in console list of all files and folders in current directory.
    ```bash
    ls
    ```     
- Basic operations with files
    - Read file and print it's content in console: 
    ```bash
    cat path_to_file
    ```
    - Create empty file in current working directory: 
    ```bash
    add new_file_name
    ```
    - Rename file (content is remained unchanged): 
    ```bash
    rn path_to_file new_filename
    ```
    - Copy file: 
    ```bash
    cp path_to_file path_to_new_directory
    ```
    - Move file: 
    ```bash
    mv path_to_file path_to_new_directory
    ```
    - Delete file: 
    ```bash
    rm path_to_file
    ```
- Operating system info
    - Get EOL (default system End-Of-Line) and print it to console  
    ```bash
    os --EOL
    ```
    - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console  
    ```bash
    os --cpus
    ```
    - Get home directory and print it to console  
    ```bash
    os --homedir
    ```
    - Get current *system user name* and print it to console  
    ```bash
    os --username
    ```
    - Get CPU architecture for which Node.js binary has compiled and print it to console  
    ```bash
    os --architecture
    ```
- Hash calculation  
    - Calculate hash for file and print it into console  
    ```bash
    hash path_to_file
    ```
- Compress and decompress operations  
    - Compress file  
    ```bash
    compress path_to_file path_to_destination (path to destination folder)
    ```
    - Decompress file  
    ```bash
    decompress path_to_file path_to_destination (path to destination folder)