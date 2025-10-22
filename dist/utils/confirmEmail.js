import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const baseUrl = process.env.BASE_URL;
const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: email,
        pass: password,
    }
});
const confirmEmail = async (recipientEmail, token) => {
    const url = `${baseUrl}/auth/email-confirmation/${token}`;
    const mailOptions = {
        from: `Attendify <${email}>`,
        to: recipientEmail,
        subject: "Please confirm your email from attendify",
        text: `Click the link below to confirm your email:\n\n${url}\n\nIf you did not request this, please ignore this email.`
    };
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result.response);
        return true;
    }
    catch (err) {
        console.error("Error sending email:", err);
        return false;
    }
};
export default confirmEmail;
