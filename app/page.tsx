"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { getSectorColor, generateSparkline } from "@/lib/theme";
import { StatCard, SectorTag, Sparkline, Footer } from "@/components/ui";

const stats = [
  { label: "Avg. Residential Electricity Rate", value: "16.2", unit: "\u00A2/kWh", change: 3.1, sector: "Residential", trend: "up" as const },
  { label: "U.S. Grid Generation", value: "4,178", unit: "TWh", change: 1.4, sector: "Power", trend: "up" as const },
  { label: "Nat Gas Henry Hub Spot", value: "2.84", unit: "$/MMBtu", change: -5.2, sector: "Power", trend: "down" as const },
  { label: "EV Share of New Sales", value: "11.3", unit: "%", change: 2.8, sector: "Transportation", trend: "up" as const },
];

const blogPosts = [
  { title: "Industrial Heat Decarbonization: Where the Economics Actually Stand", sector: "Industry", date: "Feb 18, 2026", read: "8 min" },
  { title: "Residential Heat Pump Adoption Rates Are Slowing \u2014 Here's the Data", sector: "Residential", date: "Feb 14, 2026", read: "6 min" },
  { title: "The Real Cost of Transmission Buildout for Renewable Integration", sector: "Power", date: "Feb 10, 2026", read: "11 min" },
  { title: "EV Charging Infrastructure: A County-Level Utilization Analysis", sector: "Transportation", date: "Feb 5, 2026", read: "9 min" },
];

const profiles = [
  { name: "NextEra Energy", sector: "Power", metric: "Capacity: 33 GW", trend: "up" as const },
  { name: "Carrier Global", sector: "Residential", metric: "Rev: $22.1B", trend: "up" as const },
  { name: "Nucor Corporation", sector: "Industry", metric: "Output: 21.3Mt", trend: "down" as const },
  { name: "Rivian Automotive", sector: "Transportation", metric: "Deliveries: 62K", trend: "up" as const },
];

const sectors = [
  { name: "Residential", desc: "Heating, cooling, efficiency, rates, weatherization", icon: "\uD83C\uDFE0" },
  { name: "Power", desc: "Generation, T&D, grid ops, capacity markets", icon: "\u26A1" },
  { name: "Transportation", desc: "EVs, AVs, fuel markets, fleet economics", icon: "\uD83D\uDE97" },
  { name: "Agriculture", desc: "Energy inputs, irrigation, rural electrification", icon: "\uD83C\uDF3E" },
  { name: "Industry", desc: "Glass, steel, manufacturing, process heat", icon: "\uD83C\uDFED" },
];

export default function HomePage() {
  const { theme, t } = useTheme();

  return (
    <div style={{ padding: "0 40px" }}>
      <div style={{ paddingTop: "50px", paddingBottom: "48px" }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "56px" }}>
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} unit={s.unit} change={s.change} sparkData={generateSparkline(20, s.trend)} color={getSectorColor(s.sector, theme)} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px", marginBottom: "64px" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: t.text }}>Latest Analysis</h2>
            <Link href="/blog" style={{ fontSize: "12px", color: t.accent }}>View all →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {blogPosts.map((post, i) => (
              <div key={i} style={{ padding: "18px 20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: i === 0 ? "6px 6px 0 0" : i === blogPosts.length - 1 ? "0 0 6px 6px" : "0", cursor: "pointer", transition: "background 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <SectorTag sector={post.sector} />
                  <span style={{ fontSize: "11px", color: t.textDim }}>{post.date}</span>
                  <span style={{ fontSize: "11px", color: t.textDim }}>{"\u00B7"}</span>
                  <span style={{ fontSize: "11px", color: t.textDim }}>{post.read} read</span>
                </div>
                <div style={{ fontSize: "15px", fontWeight: 500, color: t.text, lineHeight: 1.45 }}>{post.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: t.text }}>Company Profiles</h2>
            <Link href="/profiles" style={{ fontSize: "12px", color: t.accent }}>Browse all →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {profiles.map((p, i) => (
              <div key={i} style={{ padding: "16px 18px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.2s" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: t.text, marginBottom: "6px" }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <SectorTag sector={p.sector} />
                    <span style={{ fontSize: "12px", color: t.textMuted }}>{p.metric}</span>
                  </div>
                </div>
                <Sparkline data={generateSparkline(12, p.trend)} color={getSectorColor(p.sector, theme)} width={64} height={24} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px", padding: "20px", background: `${t.accent}0c`, border: `1px solid ${t.accent}33`, borderRadius: "6px" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: t.accent, marginBottom: "6px" }}>{"\uD83D\uDCCA"} Data Trackers</div>
            <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.55 }}>Interactive dashboards for electricity rates, generation mix, EV adoption, industrial output, and more.</div>
            <Link href="/trackers" style={{ marginTop: "12px", display: "inline-block", padding: "6px 14px", fontSize: "12px", fontWeight: 600, color: theme === "dark" ? "#0a0e14" : "#ffffff", background: t.accent, borderRadius: "4px" }}>Explore Trackers →</Link>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "64px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: t.text, marginBottom: "20px" }}>Coverage Areas</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
          {sectors.map((sector) => (
            <div key={sector.name} style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", cursor: "pointer", transition: "all 0.2s", borderTop: `2px solid ${getSectorColor(sector.name, theme)}` }}>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>{sector.icon}</div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: t.text, marginBottom: "6px" }}>{sector.name}</div>
              <div style={{ fontSize: "12px", color: t.textMuted, lineHeight: 1.5 }}>{sector.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
