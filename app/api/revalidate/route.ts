import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/api/prices/henry-hub");
  revalidatePath("/api/prices/brent-crude");

  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() });
}