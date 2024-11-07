import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth";
import { SOCCER_SCHOOL_API } from "../constants";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const res = await fetch(SOCCER_SCHOOL_API, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
    cache: "no-store",
  });
  const participants = await res.json();

  return NextResponse.json(participants);
}
