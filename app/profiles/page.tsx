"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { SectorTag } from "@/components/ui";
import { getSectorColor } from "@/lib/theme";

const companies = [
  { slug: "nextera-energy",       name: "NextEra Energy",              sector: "Power",          desc: "Largest generator of renewable energy from wind and sun, and world's largest utility by market cap.", stats: { revenue: "$24.6B", employees: "16,400", hq: "Juno Beach, FL" } },
  { slug: "ge-vernova",           name: "GE Vernova",                  sector: "Power",          desc: "Global energy technology company producing gas turbines, wind turbines, and grid equipment powering ~25% of the world's electricity.", stats: { revenue: "$38.1B", employees: "~75,000", hq: "Cambridge, MA" } },
  { slug: "constellation-energy", name: "Constellation Energy",        sector: "Power",          desc: "Nation's largest producer of carbon-free electricity, operating the largest nuclear fleet in the U.S. with 22 GW across 21 reactors.", stats: { revenue: "$25.5B", employees: "~14,000", hq: "Baltimore, MD" } },
  { slug: "brookfield-renewable", name: "Brookfield Renewable Partners", sector: "Power",        desc: "One of the world's largest publicly traded pure-play renewable platforms with 46 GW of operating capacity and a 200+ GW development pipeline.", stats: { revenue: "$6.3B", employees: "~5,300", hq: "Toronto / New York" } },
  { slug: "duke-energy",          name: "Duke Energy",                 sector: "Power",          desc: "One of the largest regulated U.S. utilities, serving 8.6 million customers across six states with 55,100 MW of generation capacity.", stats: { revenue: "$30.4B", employees: "~27,600", hq: "Charlotte, NC" } },
  { slug: "rivian",               name: "Rivian Automotive",           sector: "Transportation", desc: "Electric vehicle manufacturer focused on adventure vehicles and commercial delivery vans.", stats: { revenue: "$4.4B", employees: "16,700", hq: "Irvine, CA" } },
  { slug: "tesla",                name: "Tesla, Inc.",                 sector: "Transportation", desc: "Electric vehicle and clean energy company producing cars, battery storage, and solar products.", stats: { revenue: "$96.8B", employees: "140,000", hq: "Austin, TX" } },
];

export default function ProfilesPage() {
  const { theme, t } = useTheme();

  return (
    <div style={{ padding: "100px 40px 40px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: t.text }}>Company Profiles</h1>
        <p style={{ fontSize: "14px", color: t.textMuted, marginTop: "8px" }}>Data-driven profiles of firms across energy sectors. Financial data from latest public filings.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        {companies.map((c) => {
          const card = (
            <div
              style={{
                padding: "24px",
                background: t.bgCard,
                border: `1px solid ${t.border}`,
                borderRadius: "6px",
                cursor: c.slug ? "pointer" : "default",
                transition: "all 0.2s",
                borderLeft: `3px solid ${getSectorColor(c.sector, theme)}`,
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <div style={{ fontSize: "17px", fontWeight: 700, color: t.text }}>{c.name}</div>
                <SectorTag sector={c.sector} />
              </div>
              <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.55, marginBottom: "16px" }}>{c.desc}</div>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {Object.entries(c.stats).map(([key, val]) => (
                  <div key={key}>
                    <div style={{ fontSize: "10px", color: t.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>{key}</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: t.text, fontFamily: "'Space Mono', monospace" }}>{val}</div>
                  </div>
                ))}
              </div>
              {c.slug && (
                <div style={{ marginTop: "14px", fontSize: "12px", color: t.accent }}>View profile →</div>
              )}
            </div>
          );

          return c.slug ? (
            <Link key={c.name} href={`/profiles/${c.slug}`} style={{ textDecoration: "none" }}>
              {card}
            </Link>
          ) : (
            <div key={c.name}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
