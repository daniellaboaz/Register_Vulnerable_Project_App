// backend/index.js
const express = require("express");
const cors = require("cors");
const { connectDb, sendQueryCommit, sendQuery } = require("./src/api/mysql");
const { hashPassword } = require("./src/util/bcrypt");
const resetPasswordRouter = require("./src/routes/reset-password");
const loginRouter = require("./src/routes/log-in");
const continuresettRouter = require("./src/routes/continu-reset");
const changepassRouter = require("./src/routes/change-pass");
const showusers2Router = require("./src/routes/showusers2");
const PORT = 8081;
//const validator = require('validator');
//const helmet = require("helmet"); //Helmet helps prevent XSS (Cross-Site Scripting) attacks by setting a Content Security Policy header.

const app = express(); 
//app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("", resetPasswordRouter);
app.use("", loginRouter);
app.use("", continuresettRouter);
app.use("", changepassRouter);
app.use("", showusers2Router);


app.post("/signup", (req, res) => {
  hashPassword(req.body.password).then((newPassword) => {
      
      /*const values = [
        validator.escape(req.body.name[0]),
        validator.escape(req.body.email[0]),
        newPassword,
        newPassword,
        newPassword,
        newPassword,
      ];*/
  
      sendQueryCommit(
       /* "INSERT INTO loginvulnerable (`username`, `email`, `password`, `prepass1`, `prepass2`, `prepass3` ) VALUES (?)",
        values*/
      `INSERT INTO loginvulnerable (username, email, password, prepass1, prepass2, prepass3) VALUES 
      ('${req.body.name[0]}', '${req.body.email[0]}', 
      '${newPassword}', '${newPassword}', '${newPassword}', '${newPassword}')`
      )
        .then((result) => {
          return res.status(200).send({
            message: `new sign up added: \nusername: ${req.body.name[0]} , email: ${req.body.email[0]}`,
            username: req.body.name, useremail:req.body.email[0]
          });
        })   
        .catch((err) => {
          console.error(err);
          // Check if the error is due to a duplicate entry (email already exists)
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Email already exists. Please choose a different email address." });
          }
          return res.status(400).json({
            error: "Error during sign-up.",
        });
        });
    });
});

app.listen(PORT, () => {
  console.log("listening");

  connectDb()
    .then((res) => {
      console.log("connection ok, thread id: " + res);
    })
    .catch(console.error);
});