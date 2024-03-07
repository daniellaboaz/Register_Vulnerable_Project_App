// backend/src/routes/showusers2.js
const express = require("express");
const { sendQueryCommit } = require('../api/mysql');
const showusers2Router = express.Router();

showusers2Router.post("/showusers2", async (req, res) => {
  try {
    const email = (req.body.email);
    const name = (req.body.name);

    if (email && name) {
      // If both email and name are provided, fetch a specific user
      const result = await sendQueryCommit(`SELECT username, email FROM loginvulnerable WHERE email = ${email} AND username = ${name}`);
      //const result = await sendQueryCommit(`SELECT username, email FROM loginvulnerable WHERE email = '${email}' AND username = '${name}'`);
      /*const result = await sendQueryCommit(
        `SELECT username, email FROM loginvulnerable WHERE email = ? AND username = ?`,
        email,
        name
      );*/


      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      } else {
        return res.status(200).json({ message: "User found", data: result });
      }
    } else {
      // If email and name are not provided, fetch all users
      const allUsers = await sendQueryCommit(`SELECT username, email FROM loginvulnerable`);
      return res.status(200).json({ message: "All users", data: allUsers });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = showusers2Router;