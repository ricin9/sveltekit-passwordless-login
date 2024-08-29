import { dev } from "$app/environment";
import { turso } from "$lib/server/db.js";
import { sendMagicLinkEmail } from "$lib/server/email/magic-link-email.js";
import { error, fail } from "@sveltejs/kit";
import { nanoid } from "nanoid";

export const actions = {
  default: async function ({ request }) {
    const formData = await request.formData();

    const email = formData.get("email") as string;
    const ipAddress = dev ? "" : request.headers.get("cf-connecting-ip") || "";

    if (!email) {
      return fail(400, { error: "please enter a valid email" });
    }

    const { rows } = await turso.execute({
      sql: "select user_id, email, name from users where email = ?",
      args: [email.toLocaleLowerCase()],
    });

    if (rows.length === 0) {
      return fail(404, { error: "no user found with this email" });
    }

    const { user_id, name } = rows[0];
    const magicToken = nanoid(64);

    await turso.execute({
      sql: `insert into magic_tokens (user_id, token, ip_address, expires_at)
      values (?, ?, ?, datetime('now', '+15 minutes'))`,
      args: [user_id, magicToken, ipAddress],
    });

    const emailInfo = await sendMagicLinkEmail({
      email,
      magicToken,
      name: name as string,
    });
    if (emailInfo.error) {
      fail(500, { error: "failed to send magic link email" });
    }

    return { success: true };
  },
};
