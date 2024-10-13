import COLORS from './colors.js'

const printInvalidInputMessage = () => {
  console.log(COLORS.ERRORS, 'Invalid input');
}

const printCustomError = () => {
  console.error(COLORS.ERRORS, 'Operation failed');
}

export { printInvalidInputMessage, printCustomError };