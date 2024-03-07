// backend/src/api/mysql
//conect the backend to mysql

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Daniella123",
  database: "loginmanager",
  authPlugin: 'mysql_native_password'
});

const connectDb = () => {
  return new Promise((resolve, reject) => {
    db.connect(function (err) {
      if (err)  return reject(err.stack)
      
      resolve(db.threadId);
    });
  });
};

const sendQuery = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, results) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const sendQueryCommit = (query, ...values) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, function (error, results, fields) {
      if (error) {
        return db.rollback(function () {
          return reject(error);
        });
      }
      db.commit(function (err) {
        if (err) {
          return db.rollback(function () {
            return reject(err);
          });
        }
        return resolve(results);
      });
    });
  });
};

const sendQueryCommit2 = (query, values) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, function (error, results, fields) {
      if (error) {
        return db.rollback(function () {
          return reject(error);
        });
      }
      db.commit(function (err) {
        if (err) {
          return db.rollback(function () {
            return reject(error);
          });
        }
        return resolve(results);
      });
    });
  });
};





module.exports = {sendQueryCommit, sendQuery, connectDb, sendQueryCommit2};
