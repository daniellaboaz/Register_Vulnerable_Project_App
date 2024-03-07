// backend/src/util/bcrypt
const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password.toString(), 10, function (err, hash) {
      // Store hash in your password DB.
      if (err) return reject(err);
      return resolve(hash);
    });
  });
};

const comparePassword = (hash, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password.toString(), hash, function (err, result) {
      if (err) return reject(err);
      if (result == false) return resolve(false);
      return resolve(true);
    });
  });
};



module.exports = { comparePassword, hashPassword };
