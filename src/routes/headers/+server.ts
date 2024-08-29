import { json } from "@sveltejs/kit";

export function GET({ request }) {
  const headersObj = Object.fromEntries(request.headers);
  return json(headersObj);
}
