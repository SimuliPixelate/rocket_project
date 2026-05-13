import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendOTPEmail = async (email, otp) => {
//   await transporter.sendMail({
//     from: `"ARocket" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Your OTP Verification Code",
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h2>ARocket - OTP Verification</h2>
//         <p>Your OTP code is:</p>
//         <h1 style="color: #00bcd4; letter-spacing: 8px;">${otp}</h1>
//         <p>This code expires in <strong>10 minutes</strong>.</p>
//         <p>If you did not request this, please ignore this email.</p>
//       </div>
//     `,
//   });
// };

// export default transporter;
