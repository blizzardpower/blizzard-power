#!/bin/bash
# Blizzard Power — Site Setup Script
# Run this from inside your blizzard-power project folder:
#   bash setup.sh

echo "🔧 Setting up Blizzard Power site files..."

# Create directories
mkdir -p lib
mkdir -p components
mkdir -p app/about
mkdir -p app/blog
mkdir -p app/profiles
mkdir -p app/trackers
mkdir -p content/blog
mkdir -p content/profiles

echo "📁 Directories created"

# ──────────────────────────────────────────
# lib/theme.ts
# ──────────────────────────────────────────
cat > lib/theme.ts << 'FILECONTENT'
export const THEMES = {
  light: {
    bg: "#f5f6f8",
    bgCard: "#ffffff",
    bgCardHover: "#f9fafb",
    border: "#e2e5ea",
    borderLight: "#cdd2da",
    accent: "#1a8bb3",
    accentDim: "#15708f",
    accentWarm: "#d4880a",
    text: "#1a1f26",
    textMuted: "#5a6674",
    textDim: "#8895a4",
    green: "#16875d",
    red: "#c93b3b",
    purple: "#7c5cbf",
    navBg: "#ffffffee",
    toggleBg: "#e8ebf0",
    chartBarDim: 0.25,
    tagAlpha: "18",
    tagBorderAlpha: "44",
  },
  dark: {
    bg: "#0a0e14",
    bgCard: "#111820",
    bgCardHover: "#161e28",
    border: "#1e2a38",
    borderLight: "#2a3a4e",
    accent: "#4dc9f6",
    accentDim: "#2a7a9e",
    accentWarm: "#f5a623",
    text: "#e8edf3",
    textMuted: "#8899aa",
    textDim: "#556677",
    green: "#34d399",
    red: "#f87171",
    purple: "#a78bfa",
    navBg: "#0a0e14ee",
    toggleBg: "#1e2a38",
    chartBarDim: 0.5,
    tagAlpha: "22",
    tagBorderAlpha: "44",
  },
} as const;

export type ThemeName = "light" | "dark";
export type ThemeColors = typeof THEMES.light;

export const sectorColorMap = {
  Residential: { base: "#1a8bb3", dark: "#4dc9f6" },
  Power: { base: "#d4880a", dark: "#f5a623" },
  Transportation: { base: "#16875d", dark: "#34d399" },
  Agriculture: { base: "#7c5cbf", dark: "#a78bfa" },
  Industry: { base: "#c93b3b", dark: "#f87171" },
} as const;

export type SectorName = keyof typeof sectorColorMap;

export function getSectorColor(sector: string, theme: ThemeName): string {
  const c = sectorColorMap[sector as SectorName];
  if (!c) return theme === "dark" ? "#4dc9f6" : "#1a8bb3";
  return theme === "dark" ? c.dark : c.base;
}

export function generateSparkline(points = 20, trend: "up" | "down" = "up"): number[] {
  const data: number[] = [];
  let val = 50 + Math.random() * 30;
  for (let i = 0; i < points; i++) {
    val += (Math.random() - (trend === "up" ? 0.35 : 0.65)) * 8;
    val = Math.max(10, Math.min(100, val));
    data.push(val);
  }
  return data;
}
FILECONTENT

echo "✅ lib/theme.ts"

# ──────────────────────────────────────────
# app/globals.css
# ──────────────────────────────────────────
cat > app/globals.css << 'FILECONTENT'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: inherit;
  text-decoration: none;
}
FILECONTENT

echo "✅ app/globals.css"

# ──────────────────────────────────────────
# app/providers.tsx
# ──────────────────────────────────────────
cat > app/providers.tsx << 'FILECONTENT'
"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { THEMES, ThemeName, ThemeColors } from "@/lib/theme";

interface ThemeContextType {
  theme: ThemeName;
  t: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  t: THEMES.light,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>("light");
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);
  const t = THEMES[theme];

  return (
    <ThemeContext.Provider value={{ theme, t, toggleTheme }}>
      <div
        style={{
          minHeight: "100vh",
          background: t.bg,
          color: t.text,
          fontFamily: "'DM Sans', sans-serif",
          transition: "background 0.35s ease, color 0.35s ease",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
FILECONTENT

echo "✅ app/providers.tsx"

# ──────────────────────────────────────────
# app/layout.tsx
# ──────────────────────────────────────────
cat > app/layout.tsx << 'FILECONTENT'
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Blizzard Power — Data-Driven Energy Intelligence",
  description:
    "Tracking the economics of energy across residential, power, transportation, agriculture, and industry sectors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
FILECONTENT

echo "✅ app/layout.tsx"

# ──────────────────────────────────────────
# components/Navigation.tsx
# ──────────────────────────────────────────
cat > components/Navigation.tsx << 'FILECONTENT'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/providers";
import { THEMES } from "@/lib/theme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        position: "relative",
        width: "52px",
        height: "28px",
        borderRadius: "14px",
        border: `1px solid ${THEMES[theme].border}`,
        background: THEMES[theme].toggleBg,
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: isDark ? "26px" : "3px",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: isDark ? THEMES.dark.accent : "#f5a623",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          boxShadow: isDark
            ? `0 0 8px ${THEMES.dark.accent}66`
            : "0 1px 4px rgba(0,0,0,0.15)",
        }}
      >
        {isDark ? "\u{1F319}" : "\u2600\uFE0F"}
      </div>
    </button>
  );
}

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/profiles", label: "Profiles" },
  { href: "/trackers", label: "Trackers" },
  { href: "/blog", label: "Blog" },
];

export default function Navigation() {
  const { theme, t } = useTheme();
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: "56px",
        background: t.navBg,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${t.border}`,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "4px",
            background: `linear-gradient(135deg, ${t.accent}, ${t.accentDim})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: 800, color: theme === "dark" ? "#0a0e14" : "#ffffff" }}>{"\u26A1"}</span>
        </div>
        <span
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: t.text,
            letterSpacing: "-0.02em",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          BLIZZARD POWER
        </span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {links.map((link) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "6px 14px",
                fontSize: "13px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? t.accent : t.textMuted,
                background: isActive ? `${t.accent}14` : "transparent",
                border: "none",
                borderRadius: "4px",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.2s",
              }}
            >
              {link.label}
            </Link>
          );
        })}
        <div style={{ width: "1px", height: "20px", background: t.border, margin: "0 10px" }} />
        <ThemeToggle />
      </div>
    </nav>
  );
}
FILECONTENT

echo "✅ components/Navigation.tsx"

# ──────────────────────────────────────────
# components/ui.tsx
# ──────────────────────────────────────────
cat > components/ui.tsx << 'FILECONTENT'
"use client";

import { useTheme } from "@/app/providers";
import { getSectorColor } from "@/lib/theme";

export function Sparkline({
  data,
  color = "#1a8bb3",
  width = 120,
  height = 32,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SectorTag({ sector }: { sector: string }) {
  const { theme, t } = useTheme();
  const color = getSectorColor(sector, theme);
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: color,
        border: `1px solid ${color}${t.tagBorderAlpha}`,
        borderRadius: "2px",
        background: `${color}${t.tagAlpha}`,
      }}
    >
      {sector}
    </span>
  );
}

export function StatCard({
  label, value, change, unit, sparkData, color,
}: {
  label: string; value: string; change: number; unit?: string; sparkData: number[]; color: string;
}) {
  const { t } = useTheme();
  const isPositive = change >= 0;
  return (
    <div
      style={{
        background: t.bgCard,
        border: `1px solid ${t.border}`,
        borderRadius: "6px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "border-color 0.2s, background 0.3s",
      }}
    >
      <div style={{ fontSize: "11px", fontWeight: 500, color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontSize: "28px", fontWeight: 700, color: t.text, fontFamily: "'Space Mono', monospace" }}>{value}</span>
          {unit && <span style={{ fontSize: "13px", color: t.textMuted, marginLeft: "4px" }}>{unit}</span>}
          <div style={{ marginTop: "4px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: isPositive ? t.green : t.red }}>
              {isPositive ? "\u25B2" : "\u25BC"} {Math.abs(change)}%
            </span>
            <span style={{ fontSize: "11px", color: t.textDim, marginLeft: "6px" }}>vs last month</span>
          </div>
        </div>
        <Sparkline data={sparkData} color={color} />
      </div>
    </div>
  );
}

export function Footer() {
  const { t } = useTheme();
  return (
    <div
      style={{
        borderTop: `1px solid ${t.border}`,
        padding: "24px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "40px",
      }}
    >
      <span style={{ fontSize: "12px", color: t.textDim, fontFamily: "'Space Mono', monospace" }}>{"\u00A9"} 2026 Blizzard Power</span>
      <span style={{ fontSize: "11px", color: t.textDim }}>Data sourced from EIA, IEA, FRED, EPA, and public filings. Not financial advice.</span>
    </div>
  );
}
FILECONTENT

echo "✅ components/ui.tsx"

# ──────────────────────────────────────────
# app/page.tsx (Homepage)
# ──────────────────────────────────────────
cat > app/page.tsx << 'FILECONTENT'
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
      <div style={{ paddingTop: "100px", paddingBottom: "48px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, color: t.accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px", fontFamily: "'Space Mono', monospace" }}>
          Data-Driven Energy Intelligence
        </div>
        <h1 style={{ fontSize: "42px", fontWeight: 700, color: t.text, lineHeight: 1.15, maxWidth: "680px", letterSpacing: "-0.025em" }}>
          Tracking the economics of energy across every sector
        </h1>
        <p style={{ fontSize: "16px", color: t.textMuted, marginTop: "16px", maxWidth: "560px", lineHeight: 1.65 }}>
          Residential. Power. Transportation. Agriculture. Industry. Rigorous analysis grounded in data, free from advocacy.
        </p>
      </div>

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
FILECONTENT

echo "✅ app/page.tsx (homepage)"

# ──────────────────────────────────────────
# app/about/page.tsx
# ──────────────────────────────────────────
cat > app/about/page.tsx << 'FILECONTENT'
"use client";

import { useTheme } from "@/app/providers";

export default function AboutPage() {
  const { t } = useTheme();

  return (
    <div style={{ padding: "100px 40px 40px", maxWidth: "640px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: t.text, marginBottom: "16px" }}>About</h1>
      <div style={{ padding: "40px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", textAlign: "center" }}>
        <div style={{ fontSize: "32px", marginBottom: "16px" }}>{"\uD83D\uDCDD"}</div>
        <div style={{ fontSize: "15px", color: t.textMuted, lineHeight: 1.6 }}>
          Your content goes here. This section is ready for you to fill in with your story, mission, and background.
        </div>
      </div>
    </div>
  );
}
FILECONTENT

echo "✅ app/about/page.tsx"

# ──────────────────────────────────────────
# app/blog/page.tsx
# ──────────────────────────────────────────
cat > app/blog/page.tsx << 'FILECONTENT'
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
FILECONTENT

echo "✅ app/blog/page.tsx"

# ──────────────────────────────────────────
# app/profiles/page.tsx
# ──────────────────────────────────────────
cat > app/profiles/page.tsx << 'FILECONTENT'
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
FILECONTENT

echo "✅ app/profiles/page.tsx"

# ──────────────────────────────────────────
# app/trackers/page.tsx
# ──────────────────────────────────────────
cat > app/trackers/page.tsx << 'FILECONTENT'
"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers";
import { getSectorColor } from "@/lib/theme";

const sectorList = ["Residential", "Power", "Transportation", "Agriculture", "Industry"];

const chartLabels: Record<string, string> = {
  Residential: "Avg. Residential Electricity Rate (\u00A2/kWh)",
  Power: "Monthly Net Generation (TWh)",
  Transportation: "EV Market Share of New Sales (%)",
  Agriculture: "Farm Energy Expenditure Index",
  Industry: "Industrial Electricity Rate (\u00A2/kWh)",
};

const trackers: Record<string, { name: string; frequency: string; source: string; records: string }[]> = {
  Residential: [
    { name: "Electricity Rate Tracker", frequency: "Monthly", source: "EIA", records: "2,400+" },
    { name: "Natural Gas Residential Prices", frequency: "Monthly", source: "EIA", records: "1,800+" },
    { name: "Heat Pump Installation Index", frequency: "Quarterly", source: "AHRI / Census", records: "320" },
    { name: "Home Weatherization Spending", frequency: "Annual", source: "DOE", records: "150" },
  ],
  Power: [
    { name: "Generation Mix Dashboard", frequency: "Monthly", source: "EIA-923", records: "10,000+" },
    { name: "Capacity Additions & Retirements", frequency: "Monthly", source: "EIA-860", records: "5,200+" },
    { name: "Wholesale Price Tracker", frequency: "Daily", source: "ISO/RTO", records: "50,000+" },
    { name: "Transmission Buildout Monitor", frequency: "Quarterly", source: "FERC", records: "800" },
  ],
  Transportation: [
    { name: "EV Sales & Market Share", frequency: "Monthly", source: "BLS / Automakers", records: "3,600+" },
    { name: "Gasoline & Diesel Price Tracker", frequency: "Weekly", source: "EIA", records: "8,000+" },
    { name: "Charging Infrastructure Map", frequency: "Quarterly", source: "AFDC / DOE", records: "1,200+" },
    { name: "Fleet Electrification Index", frequency: "Annual", source: "Various", records: "200" },
  ],
  Agriculture: [
    { name: "Farm Energy Expenditure", frequency: "Annual", source: "USDA", records: "500+" },
    { name: "Irrigation Energy Use", frequency: "Annual", source: "USDA / EIA", records: "300" },
    { name: "Rural Electrification Access", frequency: "Annual", source: "Census / RUS", records: "180" },
  ],
  Industry: [
    { name: "Industrial Electricity Rates", frequency: "Monthly", source: "EIA", records: "2,400+" },
    { name: "Steel Production Energy Intensity", frequency: "Quarterly", source: "AISI / EIA", records: "600" },
    { name: "Manufacturing Energy Consumption", frequency: "Annual", source: "MECS / EIA", records: "400" },
    { name: "Process Heat Decarbonization Tracker", frequency: "Quarterly", source: "DOE / IEA", records: "250" },
  ],
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function generateChartData() {
  return months.map((month, i) => ({
    month,
    value: 14 + Math.sin(i / 2) * 3 + Math.random() * 1.5,
  }));
}

export default function TrackersPage() {
  const [activeTab, setActiveTab] = useState("Residential");
  const { theme, t } = useTheme();
  const [chartData] = useState(generateChartData);

  const activeColor = getSectorColor(activeTab, theme);
  const barMaxVal = Math.max(...chartData.map((d) => d.value));

  return (
    <div style={{ padding: "100px 40px 40px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: t.text }}>Data Trackers</h1>
        <p style={{ fontSize: "14px", color: t.textMuted, marginTop: "8px" }}>Interactive dashboards and downloadable datasets across energy sectors.</p>
      </div>

      <div style={{ display: "flex", gap: "2px", marginBottom: "32px", borderBottom: `1px solid ${t.border}` }}>
        {sectorList.map((s) => (
          <button key={s} onClick={() => setActiveTab(s)} style={{
            padding: "10px 18px", fontSize: "13px", fontWeight: activeTab === s ? 600 : 400,
            color: activeTab === s ? getSectorColor(s, theme) : t.textMuted,
            background: "transparent", border: "none",
            borderBottom: activeTab === s ? `2px solid ${getSectorColor(s, theme)}` : "2px solid transparent",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif", marginBottom: "-1px",
          }}>{s}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px" }}>
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", padding: "24px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: t.text, marginBottom: "4px" }}>{chartLabels[activeTab]}</div>
          <div style={{ fontSize: "11px", color: t.textDim, marginBottom: "24px" }}>Source: EIA {"\u00B7"} 2025 monthly data {"\u00B7"} Seasonally adjusted</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "180px" }}>
            {chartData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "100%", height: `${(d.value / barMaxVal) * 160}px`, background: activeColor, opacity: i === chartData.length - 1 ? 1 : t.chartBarDim, borderRadius: "2px 2px 0 0", transition: "all 0.3s" }} />
                <span style={{ fontSize: "10px", color: t.textDim }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {(trackers[activeTab] || []).map((tr, i) => (
            <div key={i} style={{ padding: "16px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", cursor: "pointer", transition: "border-color 0.2s" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: t.text, marginBottom: "8px" }}>{tr.name}</div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "11px", color: t.textMuted }}><span style={{ color: t.textDim }}>Freq:</span> {tr.frequency}</span>
                <span style={{ fontSize: "11px", color: t.textMuted }}><span style={{ color: t.textDim }}>Source:</span> {tr.source}</span>
                <span style={{ fontSize: "11px", color: t.textMuted }}><span style={{ color: t.textDim }}>Records:</span> {tr.records}</span>
              </div>
              <div style={{ marginTop: "10px", fontSize: "11px", fontWeight: 600, color: activeColor, cursor: "pointer" }}>View Dashboard {"\u2192"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
FILECONTENT

echo "✅ app/trackers/page.tsx"

echo ""
echo "🎉 All files created! Now run:"
echo "   npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser."
