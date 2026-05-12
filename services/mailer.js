import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendTempPasswordEmail({
                                                to,
                                                name,
                                                tempPassword,
                                            }) {
    const html = `
    <div style="font-family:Arial">
      <h2>Welcome to IT Ticket System</h2>
      <p>Hello ${name},</p>

      <p>Your temporary password is:</p>

      <h3 style="background:#f5f5f5;padding:10px">
        ${tempPassword}
      </h3>

      <p>Use it with your company email at the IT Ticket Application.</p>

      <p>You will be required to change it on first login.</p>

      <a href="${process.env.FRONTEND_URL}/login">
        Login here
      </a>
    </div>
  `;

    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: "Your temporary password",
        html,
    });
}
