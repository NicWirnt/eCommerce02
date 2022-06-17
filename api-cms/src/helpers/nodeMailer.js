import nodemailer from "nodemailer";

export const sendMail = async (emailData) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "roselyn.abshire92@ethereal.email",
      pass: "GFHUYUmHTgeYpjggyj",
    },
  });

  let info = await transporter.sendMail({
    from: '"My Store" <roselyn.abshire92@ethereal.email>',
    to: "roselyn.abshire92@ethereal.email",
    subject: "Email Verification",
    text: `Hi there, please follow the link to verify your email ${emailData.url}`,
    html: `
        <p>Hi ${emailData.fName}</p>
        <br/>
        <br/>
        Please follow the links below to verify your email to login into your account
        <br/>
        <br/>
        <a href="${emailData.url}"> ${emailData.url}</a>

        <br/>
        <br/>
        Kind Regards, <br/>
        My Store
         `,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
