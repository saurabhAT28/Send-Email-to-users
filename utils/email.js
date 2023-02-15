const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  // console.log("Inside Send mail");
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
    //   port: 587,
      secure: true,
      auth: {
        // user: process.env.USER,
        // pass: process.env.PASS,
        user: 'saurabhtribhuvan49@gmail.com',
        pass: 'jmlabamlicuppuvd'
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      // text: text,
      html: text
    });
    console.log("Email sent sucessfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;