import { NextResponse } from "next/server";

const API_KEY = process.env.EIA_API_KEY;

export const dynamic = "force-dynamic";

export async function GET() {
  const url = new URL("https://api.eia.gov/v2/electricity/rto/daily-region-data/data/");
  url.searchParams.set("api_key", API_KEY!);
  url.searchParams.set("frequency", "daily");
  url.searchParams.set("data[0]", "value");
  url.searchParams.set("facets[respondent][]", "US48");
  url.searchParams.set("facets[type][]", "D");
  url.searchParams.set("facets[timezone][]", "Eastern");
  url.searchParams.set("sort[0][column]", "period");
  url.searchParams.set("sort[0][direction]", "desc");
  url.searchParams.set("length", "1260");

  const res = await fetch(url.toString(), { cache: "no-store" });
  const json = await res.json();

  const rows = json.response.data
    .map((r: any) => ({
      period: r.period,
      value: parseFloat(r.value),
    }))
    .filter((r: any) => !isNaN(r.value));

  return NextResponse.json({
    series: "U.S. Lower 48 Electricity Demand",
    frequency: "daily",
    unit: "GWh",
    source: "U.S. Energy Information Administration (Form EIA-930)",
    lastUpdated: rows[0]?.period,
    data: rows.map((r: any) => ({
      period: r.period,
      value: Math.round(r.value / 1000), // MWh to GWh
    })),
  });
}