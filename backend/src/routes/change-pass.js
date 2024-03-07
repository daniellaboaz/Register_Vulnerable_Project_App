// backend/src/routes/change-pass.js
const express = require("express");
const {hashPassword, comparePassword } = require("../util/bcrypt");
const {sendQuery , sendQueryCommit2 } = require('../api/mysql');
const changepassRouter = express.Router();
//const validator = require('validator');

changepassRouter.post("/changepass", async (req, res) => {
  try {
    //const email = validator.escape(req.body.email);
    const email = (req.body.email);
    const currentPass = (req.body.password1);
    const newPass = (req.body.password2);

    const result = await sendQuery(`SELECT password, prepass1, prepass2, prepass3 FROM loginvulnerable WHERE email = '${email}'`);
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }else{
        // Compare the provided password with the stored hash
        if( ! await comparePassword(result[0].password, currentPass) ){
            return res.status(401).json({ message: "Invalid email or password" });
        }else{
          // Compare the provided password with the 3 old passwords
            if(await comparePassword(result[0].password, newPass) ||
            await comparePassword(result[0].prepass1, newPass)||
            await comparePassword(result[0].prepass2, newPass)){
                return res.status(400).json({ error: 'Password cannot be the same as the current or previous 3 passwords' });
            }else{
                hashPassword(newPass.toString()).then(async(newPasswordhash) => {
                    console.log("hash accepted");
                    await sendQueryCommit2(
                        `UPDATE loginvulnerable SET password='${newPasswordhash}', prepass1='${result[0].password}', prepass2='${result[0].prepass1}', prepass3='${result[0].prepass2}' WHERE email='${email}'`
                      ); 
                    return res.status(200).json({ message: "change was successful" });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(400).send("Error hashing");
                  });
            }
        }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = changepassRouter;
