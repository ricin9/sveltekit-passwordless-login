import { env } from "$env/dynamic/private";
import { Resend } from "resend";

export const resend = new Resend(env.RESEND_EMAIL_API_KEY);
export const emailTransport = resend.emails;
