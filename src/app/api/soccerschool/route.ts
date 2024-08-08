import { SOCCER_SCHOOL_API } from "../../constants";

export async function GET() {
  const res = await fetch(SOCCER_SCHOOL_API, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  const participants = await res.json();

  return Response.json(participants);
}
