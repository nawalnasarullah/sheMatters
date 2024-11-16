import nodemailer from 'nodemailer';


async function sendEmail(to, link) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or any other service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Password Reset',
        text: `Click on this link to reset your password: ${link}`,
    };

    await transporter.sendMail(mailOptions);
}

export default sendEmail;