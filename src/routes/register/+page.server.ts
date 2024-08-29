import { turso } from "$lib/server/db.js";
import { error, fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async function ({ request }) {
    const formData = await request.formData();

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;

    if (!email || !name) {
      fail(400, { error: "please enter a valid email and name" });
    }

    const result = await turso.execute({
      sql: "insert into users (email, name) values (?, ?)",
      args: [email.toLocaleLowerCase(), name],
    });

    redirect(301, "/login");
  },
};
