import { SOCCER_SCHOOL_API } from "@/app/constants";

export async function POST(request: Request) {
  const res = await fetch(`${SOCCER_SCHOOL_API}/mailing`, {
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
