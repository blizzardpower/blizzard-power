import { NextResponse } from "next/server";

const API_KEY = process.env.EIA_API_KEY;

export const dynamic = "force-dynamic";

export async function GET() {
  const url = new URL("https://api.eia.gov/v2/petroleum/pri/gnd/data/");
  url.searchParams.set("api_key", API_KEY!);
  url.searchParams.set("frequency", "weekly");
  url.searchParams.set("data[0]", "value");
  url.searchParams.set("facets[series][]", "EMD_EPM0_PTE_NUS_DPG");
  url.searchParams.set("sort[0][column]", "period");
  url.searchParams.set("sort[0][direction]", "desc");
  url.searchParams.set("length", "260");

  const res = await fetch(url.toString(), { cache: "no-store" });
  const json = await res.json();

  const rows = json.response.data
    .map((r: any) => ({ period: r.period, price: parseFloat(r.value) }))
    .filter((r: any) => !isNaN(r.price));

  return NextResponse.json({
    series: "U.S. Regular Conventional Gas Price",
    frequency: "weekly",
    unit: "$/gallon",
    source: "U.S. Energy Information Administration",
    lastUpdated: rows[0]?.period,
    data: rows,
  });
}