import { json } from "@sveltejs/kit";

export function GET({ request }) {
  const serverDate1 = new Date();
  const serverDate2 = Date.now();
  const serverDate1timestamp = serverDate1.getTime();

  const dbDate = "2024-08-29 18:28:54";
  const dbDateTimstamp = new Date(dbDate).getTime();
  const dbDateTimestampWithZ = new Date(dbDate + "Z").getTime();
  return json({
    serverDate1: serverDate1.toISOString(),
    serverDate2,
    serverDate1timestamp,
    dbDate,
    dbDateTimstamp,
    dbDateTimestampWithZ,
  });
}
