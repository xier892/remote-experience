function generateRandomNumber(digits = 1) {
  return ('' + Math.random()).substring(2, digits + 2); 
}
export default generateRandomNumber;
