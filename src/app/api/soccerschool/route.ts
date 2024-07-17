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

export async function POST(request: Request) {
  const res = await fetch(SOCCER_SCHOOL_API, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(await request.json()),
  });
  const token = await res.text();

  return Response.json(token);
}
