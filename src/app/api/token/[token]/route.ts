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
  const participants = res.status === 200 ? await res.json() : await res.text();

  return Response.json(participants);
}

export async function DELETE(
  request: Request,
  { params }: { params: { token: string } }
) {
  const res = await fetch(`${SOCCER_SCHOOL_API}/${params.token}`, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
    },
  });
  const status = res.status;

  return Response.json(status);
}
