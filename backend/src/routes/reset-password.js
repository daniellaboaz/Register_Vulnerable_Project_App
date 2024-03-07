// backend/src/routes/reset-password.js
const express = require('express');
const router = express.Router();
const generateRandomToken = require('../util/token');
const nodemailer = require('nodemailer');
const { sendQuery } = require('../api/mysql');
//const validator = require('validator'); 

const resetTokens = {};
router.post('/api/reset-password', async (req, res) => {

  const { email } = req.body;

// Check if the email exists in the database
try {
    const result = await sendQuery(`SELECT * FROM loginvulnerable WHERE email='${email}'`);
   // const result = await sendQuery("SELECT * FROM loginvulnerable WHERE email = ?", [email]);


    if (result.length === 0) {
      // Email not registered
      return res.status(404).json({ error: 'User not registered under the provided email' });
    }

    // Generate and store the reset token
    const resetToken = generateRandomToken();
    resetTokens[email] = resetToken;

    // Update the database with the reset token
    await sendQuery(`UPDATE loginvulnerable SET token = '${resetToken}' WHERE email = '${email}'`);


    // Configure Nodemailer with your email service credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'cyberprojectmail@gmail.com',
            //pass: 'cyberProjectMail11',
            pass: 'lgjy kfrp amsy wrrd',
            },
        });

        // Define the email options
        const mailOptions = {
            from: 'cyberprojectmail@gmail.com',
            to: email,
            subject: 'Password Reset Token',
            text: `Your password reset token is: ${resetToken}`,
        };

        try {
            // Send the email
            await transporter.sendMail(mailOptions);
            //console.log(`Reset token sent to ${email}`);
            res.status(200).json({ resetToken });
        } catch (error) {
            console.error('Error sending reset token email:', error);
            res.status(500).send('Internal Server Error');
        }

  } catch (error) {
    console.error('Error initiating password reset:', error);
    res.status(500).send('Internal Server Error');
  }
  
});


module.exports = router;
