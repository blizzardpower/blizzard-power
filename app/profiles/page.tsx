"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { SectorTag } from "@/components/ui";
import { getSectorColor } from "@/lib/theme";

const companies = [
  {
    name: "GE Vernova",
    ticker: "NYSE: GEV",
    sector: "Power",
    slug: "ge-vernova",
    desc: "Purpose-built global energy company spanning power generation, wind, and electrification. Spun off from General Electric in April 2024, GE Vernova's installed base generates approximately 25% of the world's electricity.",
    stats: { revenue: "$38.1B", "market cap": "~$237B", employees: "~75,000", hq: "Cambridge, MA" },
  },
  {
    name: "NextEra Energy",
    ticker: "NYSE: NEE",
    sector: "Power",
    slug: "nextera-energy",
    desc: "World's largest electric utility by market capitalization and largest generator of renewable energy from wind and sun. Operates Florida Power & Light and NextEra Energy Resources.",
    stats: { revenue: "$24.8B", "market cap": "~$155B", employees: "~16,700", hq: "Juno Beach, FL" },
  },
  {
    name: "Constellation Energy",
    ticker: "NASDAQ: CEG",
    sector: "Power",
    slug: "constellation-energy",
    desc: "Nation's largest producer of emissions-free energy, operating the largest U.S. nuclear fleet. Acquired Calpine Corporation in early 2025 to add natural gas and geothermal capacity.",
    stats: { revenue: "$25.5B", "market cap": "~$110B", employees: "~14,000", hq: "Baltimore, MD" },
  },
  {
    name: "Brookfield Renewable",
    ticker: "NYSE: BEP / BEPC",
    sector: "Power",
    slug: "brookfield-renewable",
    desc: "Global pure-play renewables operator with one of the world's largest portfolios of hydro, wind, solar, and energy storage assets spanning five continents.",
    stats: { revenue: "$6.3B", "capacity": "~46 GW", employees: "~5,300", hq: "Hamilton, Bermuda" },
  },
  {
    name: "Tesla",
    ticker: "NASDAQ: TSLA",
    sector: "Transportation",
    slug: "tesla",
    desc: "Electric vehicle and clean energy company producing cars, battery storage, and solar products. The world's most valuable automaker by market capitalization.",
    stats: { revenue: "$94.8B", "market cap": "~$780B", employees: "~140,000", hq: "Austin, TX" },
  },
  {
    name: "Rivian Automotive",
    ticker: "NASDAQ: RIVN",
    sector: "Transportation",
    slug: "rivian",
    desc: "Electric vehicle manufacturer producing adventure-oriented consumer trucks and SUVs alongside commercial delivery vans. Preparing to launch the mass-market R2 midsize SUV in 2026.",
    stats: { revenue: "$5.4B", "market cap": "~$19B", employees: "~15,200", hq: "Irvine, CA" },
  },
];

export default function ProfilesPage() {
  const { theme, t } = useTheme();

  return (
    <div style={{ padding: "100px 40px 40px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: t.text }}>Company Profiles</h1>
        <p style={{ fontSize: "14px", color: t.textMuted, marginTop: "8px" }}>
          Data-driven profiles of firms across energy sectors. Financial data from latest public filings.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        {companies.map((c, i) => (
          <Link key={i} href={`/profiles/${c.slug}`} style={{ textDecoration: "none" }}>
            <div style={{ padding: "24px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", cursor: "pointer", transition: "all 0.2s", borderLeft: `3px solid ${getSectorColor(c.sector, theme)}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                <div style={{ fontSize: "17px", fontWeight: 700, color: t.text }}>{c.name}</div>
                <SectorTag sector={c.sector} />
              </div>
              <div style={{ fontSize: "12px", color: t.accent, fontFamily: "'Space Mono', monospace", marginBottom: "10px" }}>{c.ticker}</div>
              <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.55, marginBottom: "16px" }}>{c.desc}</div>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {Object.entries(c.stats).map(([key, val]) => (
                  <div key={key}>
                    <div style={{ fontSize: "10px", color: t.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>{key}</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: t.text, fontFamily: "'Space Mono', monospace" }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "16px", fontSize: "12px", fontWeight: 600, color: t.accent }}>View full profile →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}