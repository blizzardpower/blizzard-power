import { NextResponse } from "next/server";

const API_KEY = process.env.EIA_API_KEY;

export const dynamic = "force-dynamic";

// Only these codes are fetched. Other = ALL minus the sum of the six primaries.
// WND = onshore + offshore wind total; TSN = utility + distributed solar total; HYC = conventional hydro.
const FUEL_MAP: Record<string, string> = {
  NG:  "Natural gas",
  COL: "Coal",
  NUC: "Nuclear",
  WND: "Wind",
  TSN: "Solar",
  HYC: "Hydro",
};

const PRIMARY_IDS = Object.keys(FUEL_MAP); // NG COL NUC WND TSN HYC
const FUEL_TYPES  = ["Natural gas", "Coal", "Nuclear", "Wind", "Solar", "Hydro", "Other"];

export async function GET() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 5);
  const start = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

  // Fetch only the 7 codes we need (6 primaries + ALL for the total)
  const fetchIds = [...PRIMARY_IDS, "ALL"];

  const url = new URL("https://api.eia.gov/v2/electricity/electric-power-operational-data/data/");
  url.searchParams.set("api_key", API_KEY!);
  url.searchParams.set("frequency", "monthly");
  url.searchParams.set("data[0]", "generation");
  url.searchParams.set("facets[location][]", "US");
  url.searchParams.set("facets[sectorid][]", "99");
  url.searchParams.set("start", start);
  url.searchParams.set("sort[0][column]", "period");
  url.searchParams.set("sort[0][direction]", "asc");
  url.searchParams.set("length", "5000");
  for (const id of fetchIds) url.searchParams.append("facets[fueltypeid][]", id);

  const res = await fetch(url.toString(), { cache: "no-store" });
  const json = await res.json();

  // Collect ALL total and primary fuel values per period
  const totals:   Record<string, number> = {};
  const primaries: Record<string, Record<string, number>> = {};

  for (const r of json.response.data as { period: string; fueltypeid: string; generation: string }[]) {
    const val = parseFloat(r.generation);
    if (isNaN(val)) continue;

    if (r.fueltypeid === "ALL") {
      totals[r.period] = val;
    } else {
      const label = FUEL_MAP[r.fueltypeid];
      if (!label) continue;
      if (!primaries[r.period]) primaries[r.period] = {};
      primaries[r.period][label] = val;
    }
  }

  const data = Object.keys(totals)
    .sort()
    .map((period) => {
      const fuels = primaries[period] ?? {};
      const primarySum = PRIMARY_IDS.reduce((s, id) => s + (fuels[FUEL_MAP[id]] ?? 0), 0);
      const row: Record<string, string | number> = { period };
      for (const ft of FUEL_TYPES) {
        row[ft] = ft === "Other"
          ? Math.max(0, Math.round((totals[period] ?? 0) - primarySum))
          : Math.round(fuels[ft] ?? 0);
      }
      return row;
    });

  const lastUpdated = data[data.length - 1]?.period as string | undefined;

  return NextResponse.json({
    series: "U.S. Electricity Generation by Fuel Type",
    frequency: "monthly",
    unit: "GWh",
    source: "U.S. Energy Information Administration (Form EIA-923)",
    lastUpdated: lastUpdated ?? "",
    fuelTypes: FUEL_TYPES,
    data,
  });
}
