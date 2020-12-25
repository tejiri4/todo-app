import nodemailer from 'nodemailer';

const sendMail = async ({
  to, subject, text, html,
}) => {
  try {
    const user = process.env.NODE_MAILER_GMAIL;
    const pass = process.env.NODE_MAILER_PASSWORD;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from: user, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return {
          error: true,
        };
      }

      return {
        error: false,
        message: 'Message sent',
      };
    });
  } catch (err) {
    return {
      error: true,
    };
  }
};

export default sendMail;
