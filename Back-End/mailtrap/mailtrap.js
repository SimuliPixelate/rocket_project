// import { MailtrapClient } from "mailtrap";
// import dotenv from "dotenv";

// dotenv.config();

// export const mailtrapClient = new MailtrapClient({
//   endpoint: process.env.MAILTRAP_ENDPOINT,
//   token: process.env.MAILTRAP_TOKEN,
// });

// export const sender = {
//   email: "hello@demomailtrap.co",
//   name: "ARocket",
// };

// // const recipients = [
// //   {
// //     email: "johnandrew.bernal.cics@ust.edu.ph",
// //   },
// // ];

// // client
// //   .send({
// //     from: sender,
// //     to: recipients,
// //     subject: "You are awesome!",
// //     html: "Congrats for sending test email with Mailtrap!",
// //     category: "Integration Test",
// //   })
// //   .then(console.log, console.error);

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL_USER,
    pass: process.env.GMAIL_EMAIL_PASS,
  },
});

export const sender = {
  email: process.env.GMAIL_EMAIL_USER,
  name: "ARocket",
};
