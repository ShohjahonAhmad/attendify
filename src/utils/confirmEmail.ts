import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const email = process.env.EMAIL!;
const password = process.env.PASSWORD!;
const baseUrl = process.env.BASE_URL!;

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: email,
        pass: password,
    }
})

const confirmEmail = async (recipientEmail: string, token: string) => {
    const url = `${baseUrl}/auth/email-confirmation/${token}`

    const mailOptions = {
        from: `Attendify <${email}>`,
        to: recipientEmail,
        subject: "Please confirm your email from attendify",
        text: `Click the link below to confirm your email:\n\n${url}\n\nIf you did not request this, please ignore this email.`
    }

    try{
        const result = await transporter.sendMail(mailOptions)
        console.log("Email sent:", result.response);
        return true;
    } catch(err) {
        console.error("Error sending email:", err);
        return false;
    }
}

export const sendStudentInfo = async (student: {
    email: string;
    password: string;
    uniqueIdentifier: string;
    firstName: string;
    lastName: string;
    institution: string | null;
}) => {
    const mailOptions = {
        from: `Attendify <${email}>`,
        to: student.email,
        subject: "Your Student Credentials",
        text: `Hello ${student.firstName} ${student.lastName},

            Your account has been created.

            Email: ${student.email}
            Password: ${student.password}

            Please log in and change your password.`,
    }

    try{
        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result.response);
        return true;
    } catch(err){
        console.error("Error sending email: ", err);
        return false;
    }
}

export const sendCode = async (receiverEmail: string, code: string) => {
    const mailOptions = {
        from: `Attendify <${email}>`,
        to: receiverEmail,
        subject: "Password Reset Verification Code",
        text: `Your verification code is: ${code}\n\nThis code will expire in 15 minutes.\n\nIf you did not request this code, please ignore this email.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Password Reset Verification</h2>
                <p>Your verification code is:</p>
                <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                    ${code}
                </div>
                <p style="color: #666;">This code will expire in <strong>15 minutes</strong>.</p>
                <p style="color: #999; font-size: 12px;">If you did not request this code, please ignore this email and ensure your account is secure.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="color: #999; font-size: 11px;">This is an automated message from Attendify. Please do not reply to this email.</p>
            </div>
        `
    }

    try{
        await transporter.sendMail(mailOptions);
        console.log("Verification code sent to:", receiverEmail);
        return true;
    }catch(err){
        console.error("Error sending verification code: ", err);
        return false;
    }
}

export default confirmEmail;