"use client";

import { useTheme } from "@/app/providers";
import { SectorTag } from "@/components/ui";
import { getSectorColor } from "@/lib/theme";

const companies = [
  { name: "NextEra Energy", sector: "Power", desc: "Largest generator of renewable energy from wind and sun, and world's largest utility by market cap.", stats: { revenue: "$24.6B", employees: "16,400", hq: "Juno Beach, FL" } },
  { name: "Duke Energy", sector: "Power", desc: "One of the largest electric power holding companies in the U.S., serving 8.2 million customers.", stats: { revenue: "$29.1B", employees: "27,500", hq: "Charlotte, NC" } },
  { name: "Carrier Global", sector: "Residential", desc: "Leading global provider of HVAC, refrigeration, fire, and security solutions.", stats: { revenue: "$22.1B", employees: "52,000", hq: "Palm Beach Gardens, FL" } },
  { name: "Trane Technologies", sector: "Residential", desc: "Climate innovator bringing efficient and sustainable solutions to buildings, homes, and transportation.", stats: { revenue: "$18.8B", employees: "40,000", hq: "Swords, Ireland" } },
  { name: "Rivian Automotive", sector: "Transportation", desc: "Electric vehicle manufacturer focused on adventure vehicles and commercial delivery vans.", stats: { revenue: "$4.4B", employees: "16,700", hq: "Irvine, CA" } },
  { name: "Nucor Corporation", sector: "Industry", desc: "Largest steel producer in North America and largest recycler in the Western Hemisphere.", stats: { revenue: "$34.7B", employees: "31,400", hq: "Charlotte, NC" } },
  { name: "Deere & Company", sector: "Agriculture", desc: "Manufacturer of agricultural, construction, and forestry machinery and equipment.", stats: { revenue: "$52.6B", employees: "82,200", hq: "Moline, IL" } },
  { name: "Tesla, Inc.", sector: "Transportation", desc: "Electric vehicle and clean energy company producing cars, battery storage, and solar products.", stats: { revenue: "$96.8B", employees: "140,000", hq: "Austin, TX" } },
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
        {companies.map((c, i) => (
          <div key={i} style={{ padding: "24px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", cursor: "pointer", transition: "all 0.2s", borderLeft: `3px solid ${getSectorColor(c.sector, theme)}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <div style={{ fontSize: "17px", fontWeight: 700, color: t.text }}>{c.name}</div>
              <SectorTag sector={c.sector} />
            </div>
            <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.55, marginBottom: "16px" }}>{c.desc}</div>
            <div style={{ display: "flex", gap: "20px" }}>
              {Object.entries(c.stats).map(([key, val]) => (
                <div key={key}>
                  <div style={{ fontSize: "10px", color: t.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>{key}</div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: t.text, fontFamily: "'Space Mono', monospace" }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
