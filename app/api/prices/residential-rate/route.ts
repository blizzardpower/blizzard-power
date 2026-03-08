import { NextResponse } from "next/server";

const API_KEY = process.env.EIA_API_KEY;

export const dynamic = "force-dynamic";

export async function GET() {
  const url = new URL("https://api.eia.gov/v2/electricity/retail-sales/data/");
  url.searchParams.set("api_key", API_KEY!);
  url.searchParams.set("frequency", "monthly");
  url.searchParams.set("data[0]", "price");
  url.searchParams.set("facets[sectorid][]", "RES");
  url.searchParams.set("facets[stateid][]", "US");
  url.searchParams.set("sort[0][column]", "period");
  url.searchParams.set("sort[0][direction]", "desc");
  url.searchParams.set("length", "60");

  const res = await fetch(url.toString(), { cache: "no-store" });
  const json = await res.json();

  const rows = json.response.data
    .map((r: any) => ({
      period: r.period,
      price: parseFloat(r.price),
    }))
    .filter((r: any) => !isNaN(r.price));

  return NextResponse.json({
    series: "U.S. Average Residential Electricity Price",
    frequency: "monthly",
    unit: "¢/kWh",
    source: "U.S. Energy Information Administration",
    lastUpdated: rows[0]?.period,
    data: rows,
  });
}