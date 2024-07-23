import { SOCCER_SCHOOL_API } from "@/app/constants";

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const res = await fetch(`${SOCCER_SCHOOL_API}/${params.token}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  const participants = await res.json();

  return Response.json(participants);
}
