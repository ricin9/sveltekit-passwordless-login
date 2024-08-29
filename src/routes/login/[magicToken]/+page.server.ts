import { dev } from "$app/environment";
import { turso } from "$lib/server/db.js";
import { error, redirect } from "@sveltejs/kit";
import crypto from "crypto";

export async function load({ params, cookies, request }) {
  const { magicToken } = params;

  const requestIpAddress = dev
    ? ""
    : request.headers.get("cf-connecting-ip") || "";

  const { rows } = await turso.execute({
    sql: "select  user_id, expires_at, ip_address from magic_tokens where token = ?",
    args: [magicToken],
  });

  if (rows.length === 0) {
    error(403, "magic link expired");
  }

  const { user_id, expires_at, ip_address } = rows[0];

  const expiresAt = new Date(expires_at as string).getTime();
  const now = Date.now();

  if (expiresAt > now) {
    error(403, "magic link expired");
  }

  if (ip_address !== requestIpAddress) {
    error(403, "magic link requester ip does not match current ip");
  }
  // create auth token and delete magic token

  const session = generateSession();
  await Promise.all([
    insertSession({ user_id: user_id as number, session }),
    deleteMagicToken(magicToken),
  ]);

  cookies.set("session", session, {
    path: "/",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
  });

  redirect(301, "/private");
}

function generateSession() {
  return crypto.randomBytes(32).toString("hex");
}

type InsertSessionInput = {
  user_id: number;
  session: string;
};

async function insertSession(input: InsertSessionInput) {
  await turso.execute({
    sql: "insert into sessions (user_id, session, expires_at) values (?, ?, datetime('now', '+30 days'))",
    args: [input.user_id, input.session],
  });
}

async function deleteMagicToken(token: string) {
  await turso.execute({
    sql: "delete from magic_tokens where token = ?",
    args: [token],
  });
}
