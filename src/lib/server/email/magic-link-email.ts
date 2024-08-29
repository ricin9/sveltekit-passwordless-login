import { env } from "$env/dynamic/private";
import { emailTransport } from "./email";

export type MagicLinkEmail = {
  email: string;
  name: string;
  magicToken: string;
};

export async function sendMagicLinkEmail(input: MagicLinkEmail) {
  const info = await emailTransport.send({
    from: env.EMAIL_FROM,
    to: input.email,
    subject: "Passwordless login link",
    text: `Hello ${input.name},\n\nYou can login to your account by clicking on the following link:\n\n${env.APP_DOMAIN}/login/${input.magicToken}\n\nThis link will expire in 15 minutes.\n\nIf you have not tried to login at this moment please ignore this email and do NOT click on the link\n\nBest regards,\nMiloudi's passwordless auth factory`,
    html: `Hello ${input.name},<br><br>You can login to your account by clicking on the following link:<br><br><a href="${env.APP_DOMAIN}/login/${input.magicToken}">Login</a><br><br>This link will expire in 15 minutes.<br><br>If you have not tried to login at this moment please ignore this email and do NOT click on the link<br><br>Best regards,<br>Miloudi's passwordless auth factory`,
  });

  return info;
}
