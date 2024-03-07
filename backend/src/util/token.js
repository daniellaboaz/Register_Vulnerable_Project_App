// backend/src/util/token
const crypto = require('crypto');

const generateRandomToken = () => {
  const randomBytes = crypto.randomBytes(20);
  return crypto.createHash('sha1').update(randomBytes).digest('hex');
};

module.exports = generateRandomToken;
