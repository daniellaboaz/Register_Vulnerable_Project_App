// backend/src/routes/log-in.js
const express = require("express");
const { comparePassword } = require("../util/bcrypt");
const {sendQuery } = require('../api/mysql');
const loginRouter = express.Router();
//const validator = require('validator');

loginRouter.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await sendQuery(`SELECT password FROM loginvulnerable WHERE email = '${email}' And password ='${password}'`);

    if (result.length === 0) {
    const result2 = await sendQuery(`SELECT password FROM loginvulnerable WHERE email = '${email}'`);
    const storedPasswordHash = result2[0].password;
    const passwordMatch = await comparePassword(storedPasswordHash, password);
    if(passwordMatch){
      return res.status(200).json({ message: "Login successful" });
    }else{
      return res.status(401).json({ message: "Invalid email or password" });}
    }
    //const storedPasswordHash = result[0].password;

    // Compare the provided password with the stored hash
    //const passwordMatch = await comparePassword(storedPasswordHash, password);

    //if (passwordMatch) {
      return res.status(200).json({ message: "Login successful" });
    //} else {
    //  return res.status(401).json({ message: "Invalid email or password" });
   // }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = loginRouter;
