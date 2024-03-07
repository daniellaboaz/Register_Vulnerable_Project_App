// backend/src/routs/continu-reset
const express = require('express');
const {sendQuery , sendQueryCommit2 } = require('../api/mysql');
const { hashPassword, comparePassword } = require('../util/bcrypt');
const validator = require('validator');
const continuresettRouter = express.Router();

continuresettRouter.post('/continu-reset', async (req, res) => {
  try {
    const email= (req.body.email);
    const code=validator.escape( req.body.code);
    const password  = validator.escape(req.body.password);

    // Check if the email, code, and token match in the database
    const result = await sendQuery(`SELECT password, prepass1, prepass2, prepass3, token FROM loginvulnerable WHERE email = '${email}'`);

    if (result.length === 0) {
      return res.status(400).json({ error: 'Invalid email or code' });
    }

    if(result[0].token !== code)
    {
      return res.status(400).json({ error: 'Invalid email or code' });
    }

    // Check if the new password is different from old passwords
    const currentPassword = result[0].password.toString();
    const prepass1 = (result[0].prepass1).toString();
    const prepass2 = (result[0].prepass2).toString();


    if (
      await comparePassword(prepass1, password) ||
      await comparePassword(prepass2, password) ||
      await comparePassword(currentPassword, password)
    ) {
      return res.status(400).json({ error: 'Password cannot be the same as the current or previous 3 passwords' });
    }else{
      const newPasswordHash =await hashPassword(password);

    await sendQueryCommit2(
      `UPDATE loginvulnerable SET password='${newPasswordHash}', prepass1='${currentPassword}', prepass2='${prepass1}', prepass3='${prepass2}' WHERE email='${email}'`
    );
    res.status(200).json({ message: 'Password reset successful' });
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = continuresettRouter;
