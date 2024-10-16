import { SOCCER_SCHOOL_API } from "../constants";

export async function GET() {
  const res = await fetch(SOCCER_SCHOOL_API, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
    cache: "no-store",
  });
  const participants = await res.json();

  return new Response(JSON.stringify(participants), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
