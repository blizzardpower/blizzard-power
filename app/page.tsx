"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { getSectorColor, generateSparkline } from "@/lib/theme";
import { StatCard, SectorTag } from "@/components/ui";
import { useState, useEffect } from "react";

const blogPosts = [
  { title: "Industrial Heat Decarbonization: Where the Economics Actually Stand", sector: "Industry", date: "Feb 18, 2026", read: "8 min" },
  { title: "Residential Heat Pump Adoption Rates Are Slowing \u2014 Here's the Data", sector: "Residential", date: "Feb 14, 2026", read: "6 min" },
  { title: "The Real Cost of Transmission Buildout for Renewable Integration", sector: "Power", date: "Feb 10, 2026", read: "11 min" },
];

const profiles = [
  { name: "NextEra Energy", sector: "Power", metric: "Rev: $24.8B", slug: "nextera-energy" },
  { name: "GE Vernova", sector: "Power", metric: "Rev: $38.1B", slug: "ge-vernova" },
  { name: "Tesla", sector: "Transportation", metric: "Rev: $94.8B", slug: "tesla" },
  { name: "Rivian Automotive", sector: "Transportation", metric: "Rev: $5.4B", slug: "rivian" },
];

const placeholderStats = [
  { label: "Avg. Residential Electricity Rate", value: "16.2", unit: "\u00A2/kWh", change: 3.1, sector: "Residential", trend: "up" as const },
  { label: "U.S. Grid Generation", value: "4,178", unit: "TWh", change: 1.4, sector: "Power", trend: "up" as const },
  { label: "EV Share of New Sales", value: "11.3", unit: "%", change: 2.8, sector: "Transportation", trend: "up" as const },
  { label: "U.S. Coal Production", value: "432", unit: "Mt", change: -6.1, sector: "Industry", trend: "down" as const },
  { label: "Solar Installed Capacity", value: "211", unit: "GW", change: 22.4, sector: "Power", trend: "up" as const },
  { label: "Farm Diesel Price", value: "3.64", unit: "$/gal", change: -4.8, sector: "Agriculture", trend: "down" as const },
];

export default function HomePage() {
  const { theme, t } = useTheme();
  const [henryHub, setHenryHub] = useState<{ value: string; change: number; sparkData: number[] } | null>(null);
  const [brentCrude, setBrentCrude] = useState<{ value: string; change: number; sparkData: number[] } | null>(null);

  useEffect(() => {
    fetch("/api/prices/henry-hub")
      .then((r) => r.json())
      .then((json) => {
        const prices = json.data
          .map((r: { period: string; price: number }) => r.price)
          .reverse();
        const latest = prices[prices.length - 1];
        const prev = prices[prices.length - 2];
        const change = parseFloat((((latest - prev) / prev) * 100).toFixed(1));
        setHenryHub({
          value: latest.toFixed(2),
          change,
          sparkData: prices.slice(-60),
        });
      });

    fetch("/api/prices/brent-crude")
      .then((r) => r.json())
      .then((json) => {
        const prices = json.data
          .map((r: { period: string; price: number }) => r.price)
          .reverse();
        const latest = prices[prices.length - 1];
        const prev = prices[prices.length - 2];
        const change = parseFloat((((latest - prev) / prev) * 100).toFixed(1));
        setBrentCrude({
          value: latest.toFixed(2),
          change,
          sparkData: prices.slice(-60),
        });
      });
  }, []);

  const allCards = [
    {
      label: "Nat Gas Henry Hub Spot",
      value: henryHub?.value ?? "\u2014",
      unit: "$/MMBtu",
      change: henryHub?.change ?? 0,
      sector: "Power",
      sparkData: henryHub?.sparkData ?? generateSparkline(20, "down"),
      href: "/trackers",
    },
    {
      label: "Brent Crude Oil Spot",
      value: brentCrude?.value ?? "\u2014",
      unit: "$/barrel",
      change: brentCrude?.change ?? 0,
      sector: "Power",
      sparkData: brentCrude?.sparkData ?? generateSparkline(20, "down"),
      href: "/trackers",
    },
    ...placeholderStats.map((s) => ({
      label: s.label,
      value: s.value,
      unit: s.unit,
      change: s.change,
      sector: s.sector,
      sparkData: generateSparkline(20, s.trend),
      href: null as string | null,
    })),
  ];

  return (
    <div className="page-padding">
      <div style={{ paddingTop: "50px", paddingBottom: "48px" }} />

      <div className="grid-stats" style={{ marginBottom: "56px" }}>
        {allCards.map((s) => {
          const card = (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              unit={s.unit}
              change={s.change}
              sparkData={s.sparkData}
              color={getSectorColor(s.sector, theme)}
            />
          );
          if (s.href) {
            return (
              <Link key={s.label} href={s.href} style={{ textDecoration: "none" }}>
                {card}
              </Link>
            );
          }
          return card;
        })}
      </div>

      <div className="grid-content" style={{ marginBottom: "64px" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: t.text }}>Latest Analysis</h2>
            <Link href="/blog" style={{ fontSize: "12px", color: t.accent }}>View all →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {blogPosts.map((post, i) => (
              <div key={i} style={{ padding: "18px 20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", cursor: "pointer", transition: "background 0.2s" }}>
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
              <Link key={i} href={`/profiles/${p.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ padding: "16px 18px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", cursor: "pointer", transition: "border-color 0.2s" }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: t.text, marginBottom: "6px" }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <SectorTag sector={p.sector} />
                    <span style={{ fontSize: "12px", color: t.textMuted }}>{p.metric}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${t.border}`, padding: "24px 0", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: t.textDim, fontFamily: "'Space Mono', monospace" }}>{"\u00A9"} {new Date().getFullYear()} Blizzard Power</span>
      </div>
    </div>
  );
}