import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("prices-henry-hub");
  revalidateTag("prices-brent-crude");

  return NextResponse.json({
    revalidated: true,
    tags: ["prices-henry-hub", "prices-brent-crude"],
    timestamp: new Date().toISOString(),
  });
}