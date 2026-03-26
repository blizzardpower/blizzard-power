"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { getSectorColor, generateSparkline } from "@/lib/theme";
import { StatCard, SectorTag, Footer } from "@/components/ui";
import { useState, useEffect } from "react";

const blogPosts = [
  { title: "Industrial Heat Decarbonization: Where the Economics Actually Stand", sector: "Industry", date: "Feb 18, 2026", read: "8 min" },
  { title: "Heat Pump Adoption Rates Are Slowing — Here's the Data", sector: "Buildings", date: "Feb 14, 2026", read: "6 min" },
  { title: "The Real Cost of Transmission Buildout for Renewable Integration", sector: "Power", date: "Feb 10, 2026", read: "11 min" },
  { title: "EV Charging Infrastructure: A County-Level Utilization Analysis", sector: "Transportation", date: "Feb 5, 2026", read: "9 min" },
];

const profiles = [
  { name: "NextEra Energy",       sector: "Power",          metric: "Capacity: 33 GW", trend: "up" as const,   slug: "nextera-energy" },
  { name: "GE Vernova",           sector: "Power",          metric: "Rev: $38.1B",     trend: "up" as const,   slug: "ge-vernova" },
  { name: "Constellation Energy", sector: "Power",          metric: "Nuclear: 22 GW",  trend: "up" as const,   slug: "constellation-energy" },
  { name: "Rivian Automotive",    sector: "Transportation", metric: "Deliveries: 62K", trend: "up" as const,   slug: "rivian" },
];

type LiveStat = { value: string; change: number; sparkData: number[] };
type TrackerCard = { label: string; unit: string; sector: string; live: LiveStat | null; formatValue?: (v: string) => string; trackerId: string };

function useLiveStat(url: string): LiveStat | null {
  const [stat, setStat] = useState<LiveStat | null>(null);
  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        const rows = (json.data as { period: string; price?: number; value?: number }[])
          .map((r) => ({ period: r.period, price: r.price ?? r.value ?? NaN }))
          .filter((r) => !isNaN(r.price))
          .sort((a, b) => a.period.localeCompare(b.period));
        if (rows.length < 2) return;
        const latest = rows[rows.length - 1].price;
        const prev   = rows[rows.length - 2].price;
        const change = parseFloat((((latest - prev) / prev) * 100).toFixed(1));
        setStat({ value: latest.toFixed(2), change, sparkData: rows.slice(-20).map((r) => r.price) });
      })
      .catch(() => {});
  }, [url]);
  return stat;
}

export default function HomePage() {
  const { theme, t } = useTheme();

  const wti       = useLiveStat("/api/prices/wti-crude");
  const brent     = useLiveStat("/api/prices/brent-crude");
  const henryHub  = useLiveStat("/api/prices/henry-hub");
  const demand    = useLiveStat("/api/prices/electricity-demand");
  const fuelPrice = useLiveStat("/api/prices/fuel-prices");
  const resiRate  = useLiveStat("/api/prices/residential-rate");

  // One entry per tracker, in sidebar order
  const trackerCards: TrackerCard[] = [
    { label: "WTI Crude Price",          unit: "$/barrel",   sector: "Power",          live: wti,       trackerId: "wti-crude" },
    { label: "Brent Crude Price",         unit: "$/barrel",   sector: "Power",          live: brent,     trackerId: "brent-crude" },
    { label: "Henry Hub Gas Price",       unit: "$/MMBtu",    sector: "Power",          live: henryHub,  trackerId: "henry-hub" },
    { label: "Electricity Demand",        unit: "GWh",        sector: "Power",          live: demand,    trackerId: "electricity-demand", formatValue: (v: string) => Math.round(parseFloat(v)).toLocaleString() },
    { label: "Fuel Price Tracker",        unit: "$/gal",      sector: "Transportation", live: fuelPrice, trackerId: "fuel-prices" },
    { label: "Avg. Residential Rate",     unit: "¢/kWh",      sector: "Buildings",      live: resiRate,  trackerId: "residential-rate" },
  ];

  return (
    <div style={{ padding: "0 40px" }}>
      <div style={{ paddingTop: "50px", paddingBottom: "48px" }} />

      {/* Tracker stat cards — 4 per row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "56px" }}>
        {trackerCards.map((s) => (
          <Link key={s.label} href={`/trackers?id=${s.trackerId}`} style={{ textDecoration: "none" }}>
            <StatCard
              label={s.label}
              value={s.live ? (s.formatValue ? s.formatValue(s.live.value) : s.live.value) : "—"}
              unit={s.unit}
              change={s.live?.change ?? 0}
              sparkData={s.live?.sparkData ?? generateSparkline(20, "up")}
              color={getSectorColor(s.sector, theme)}
            />
          </Link>
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
            {profiles.map((p) => (
              <Link key={p.name} href={`/profiles/${p.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ padding: "16px 18px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.2s" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: t.text, marginBottom: "6px" }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <SectorTag sector={p.sector} />
                    <span style={{ fontSize: "12px", color: t.textMuted }}>{p.metric}</span>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}