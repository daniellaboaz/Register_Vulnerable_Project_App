// backend/src/util/token
const crypto = require('crypto');

const generateRandomToken = () => {
  return crypto.randomBytes(20).toString('hex'); // 20 bytes converted to hexadecimal string
};

module.exports = generateRandomToken;


//const generateRandomToken = require('./util/token');
// Example usage
//const randomToken = generateRandomToken();