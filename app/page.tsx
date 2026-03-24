"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { getSectorColor, generateSparkline } from "@/lib/theme";
import { StatCard, SectorTag, Sparkline, Footer } from "@/components/ui";
import { useState, useEffect } from "react";

const stats = [
  { label: "Avg. Residential Electricity Rate", value: "16.2", unit: "\u00A2/kWh", change: 3.1, sector: "Buildings", trend: "up" as const },
  { label: "U.S. Grid Generation", value: "4,178", unit: "TWh", change: 1.4, sector: "Power", trend: "up" as const },
  { label: "Nat Gas Henry Hub Spot", value: "2.84", unit: "$/MMBtu", change: -5.2, sector: "Power", trend: "down" as const },
  { label: "EV Share of New Sales", value: "11.3", unit: "%", change: 2.8, sector: "Transportation", trend: "up" as const },
];

const blogPosts = [
  { title: "Industrial Heat Decarbonization: Where the Economics Actually Stand", sector: "Industry", date: "Feb 18, 2026", read: "8 min" },
  { title: "Heat Pump Adoption Rates Are Slowing — Here's the Data", sector: "Buildings", date: "Feb 14, 2026", read: "6 min" },
  { title: "The Real Cost of Transmission Buildout for Renewable Integration", sector: "Power", date: "Feb 10, 2026", read: "11 min" },
  { title: "EV Charging Infrastructure: A County-Level Utilization Analysis", sector: "Transportation", date: "Feb 5, 2026", read: "9 min" },
];

const profiles = [
  { name: "NextEra Energy", sector: "Power", metric: "Capacity: 33 GW", trend: "up" as const },
  { name: "Carrier Global", sector: "Buildings", metric: "Rev: $22.1B", trend: "up" as const },
  { name: "Nucor Corporation", sector: "Industry", metric: "Output: 21.3Mt", trend: "down" as const },
  { name: "Rivian Automotive", sector: "Transportation", metric: "Deliveries: 62K", trend: "up" as const },
];

export default function HomePage() {
  const { theme, t } = useTheme();

  const [henryHub, setHenryHub] = useState<{ value: string; change: number; sparkData: number[] } | null>(null);
  const [fuelPrice, setFuelPrice] = useState<{ value: string; change: number; sparkData: number[] } | null>(null);

  useEffect(() => {
    fetch("/api/prices/henry-hub")
      .then((r) => r.json())
      .then((json) => {
        const rows = (json.data as { period: string; price: number }[])
          .filter((r) => r.price != null && !isNaN(r.price))
          .sort((a, b) => a.period.localeCompare(b.period));
        if (rows.length < 2) return;
        const latest = rows[rows.length - 1].price;
        const prev = rows[rows.length - 2].price;
        const change = parseFloat((((latest - prev) / prev) * 100).toFixed(1));
        setHenryHub({
          value: latest.toFixed(2),
          change,
          sparkData: rows.slice(-20).map((r) => r.price),
        });
      })
      .catch((err) => console.error("Henry Hub fetch error:", err));
  }, []);

  useEffect(() => {
    fetch("/api/prices/fuel-prices")
      .then((r) => r.json())
      .then((json) => {
        const rows = (json.data as { period: string; price: number }[])
          .filter((r) => r.price != null && !isNaN(r.price))
          .sort((a, b) => a.period.localeCompare(b.period));
        if (rows.length < 2) return;
        const latest = rows[rows.length - 1].price;
        const prev = rows[rows.length - 2].price;
        const change = parseFloat((((latest - prev) / prev) * 100).toFixed(1));
        setFuelPrice({
          value: latest.toFixed(2),
          change,
          sparkData: rows.slice(-20).map((r) => r.price),
        });
      })
      .catch((err) => console.error("Fuel prices fetch error:", err));
  }, []);

  const displayStats = stats.map((s) => {
    if (s.label === "Nat Gas Henry Hub Spot" && henryHub) {
      return { ...s, value: henryHub.value, change: henryHub.change, sparkData: henryHub.sparkData };
    }
    return { ...s, sparkData: generateSparkline(20, s.trend) };
  });

  const row2Stats = [
    {
      label: "U.S. Regular Gasoline Price",
      value: fuelPrice?.value ?? "—",
      unit: "$/gal",
      change: fuelPrice?.change ?? 0,
      sector: "Transportation",
      sparkData: fuelPrice?.sparkData ?? generateSparkline(20, "up"),
    },
  ];

  return (
    <div style={{ padding: "0 40px" }}>
      <div style={{ paddingTop: "50px", paddingBottom: "48px" }} />

      {/* Row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "16px" }}>
        {displayStats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} unit={s.unit} change={s.change} sparkData={s.sparkData} color={getSectorColor(s.sector, theme)} />
        ))}
      </div>

      {/* Row 2 — starts with fuel price, room to add more */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "56px" }}>
        {row2Stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} unit={s.unit} change={s.change} sparkData={s.sparkData} color={getSectorColor(s.sector, theme)} />
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
                  <span style={{ fontSize: "11px", color: t.textDim }}>&middot;</span>
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

        </div>
      </div>

      <Footer />
    </div>
  );
}