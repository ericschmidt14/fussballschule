import { SOCCER_SCHOOL_API } from "@/app/constants";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${SOCCER_SCHOOL_API}/groups`, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
    cache: "no-store",
  });
  const groups = await res.json();

  return NextResponse.json(groups);
}

export async function POST(request: Request) {
  const res = await fetch(`${SOCCER_SCHOOL_API}/group`, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(await request.json()),
  });
  const token = await res.text();

  return NextResponse.json(token);
}
