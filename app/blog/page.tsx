"use client";

import { useTheme } from "@/app/providers";
import { SectorTag } from "@/components/ui";

const articles = [
  { title: "Industrial Heat Decarbonization: Where the Economics Actually Stand", sector: "Industry", date: "Feb 18, 2026", read: "8 min", excerpt: "Process heat accounts for roughly 10% of global CO\u2082 emissions. We examine the cost curves for electrification, hydrogen, and CCS across glass, steel, and cement production." },
  { title: "Residential Heat Pump Adoption Rates Are Slowing \u2014 Here's the Data", sector: "Residential", date: "Feb 14, 2026", read: "6 min", excerpt: "After two years of rapid growth, AHRI shipment data shows the heat pump installation boom may be plateauing. A closer look at the regional and economic drivers." },
  { title: "The Real Cost of Transmission Buildout for Renewable Integration", sector: "Power", date: "Feb 10, 2026", read: "11 min", excerpt: "The interconnection queue backlog now exceeds 2,600 GW. We analyze the per-mile costs, permitting timelines, and financing structures shaping the buildout." },
  { title: "EV Charging Infrastructure: A County-Level Utilization Analysis", sector: "Transportation", date: "Feb 5, 2026", read: "9 min", excerpt: "Using DOE AFDC data and EV registration records, we map charging station utilization rates across 3,100+ U.S. counties to find where supply leads and lags demand." },
  { title: "Fertilizer Energy Costs and Their Pass-Through to Food Prices", sector: "Agriculture", date: "Jan 28, 2026", read: "7 min", excerpt: "Natural gas represents 70\u201390% of ammonia production costs. We trace the price transmission mechanism from Henry Hub to farm-gate fertilizer prices." },
  { title: "Capacity Market Reforms: PJM's Proposal and What It Means for Generators", sector: "Power", date: "Jan 22, 2026", read: "10 min", excerpt: "PJM's proposed capacity market overhaul could shift billions in payments across fuel types. A detailed analysis of winners, losers, and second-order effects." },
];

export default function BlogPage() {
  const { t } = useTheme();

  return (
    <div style={{ padding: "100px 40px 40px", maxWidth: "820px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: t.text }}>Blog</h1>
        <p style={{ fontSize: "14px", color: t.textMuted, marginTop: "8px" }}>Data-first analysis of energy markets, policy, and economics.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {articles.map((a, i) => (
          <div key={i} style={{ padding: "24px 0", borderBottom: `1px solid ${t.border}`, cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <SectorTag sector={a.sector} />
              <span style={{ fontSize: "12px", color: t.textDim }}>{a.date}</span>
              <span style={{ fontSize: "12px", color: t.textDim }}>{"\u00B7"}</span>
              <span style={{ fontSize: "12px", color: t.textDim }}>{a.read} read</span>
            </div>
            <div style={{ fontSize: "18px", fontWeight: 600, color: t.text, lineHeight: 1.4, marginBottom: "8px" }}>{a.title}</div>
            <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>{a.excerpt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
