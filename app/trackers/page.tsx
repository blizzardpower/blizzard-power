"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/app/providers";
import WtiCrudeChart from "@/components/WtiCrudeChart";
import BrentCrudeChart from "@/components/BrentCrudeChart";
import HenryHubChart from "@/components/HenryHubChart";
import ElectricityDemandChart from "@/components/ElectricityDemandChart";
import ResidentialRateChart from "@/components/ResidentialRateChart";
import FuelPricesChart from "@/components/FuelPricesChart";
import GenerationMixChart from "@/components/GenerationMixChart";

// ─── Tracker registry ────────────────────────────────────────────────────────

const SECTOR_COLOR: Record<string, { light: string; dark: string }> = {
  Power:          { light: "#1a8bb3", dark: "#4dc9f6" }, // blue
  Transportation: { light: "#16875d", dark: "#34d399" },
  Buildings:      { light: "#d4880a", dark: "#f5a623" }, // orange
};

interface Tracker {
  id: string;
  sector: string;
  name: string;
  unit: string;
  frequency: string;
  source: string;
  records: string;
}

const TRACKERS: Tracker[] = [
  // Power — all three live
  {
    id: "wti-crude",
    sector: "Power",
    name: "WTI Crude Price",
    unit: "$/barrel",
    frequency: "Daily",
    source: "EIA",
    records: "1,260+",
  },
  {
    id: "brent-crude",
    sector: "Power",
    name: "Brent Crude Price",
    unit: "$/barrel",
    frequency: "Daily",
    source: "EIA",
    records: "1,260+",
  },
  {
    id: "henry-hub",
    sector: "Power",
    name: "Henry Hub Gas Price",
    unit: "$/MMBtu",
    frequency: "Daily",
    source: "EIA",
    records: "1,260+",
  },
  {
    id: "electricity-demand",
    sector: "Power",
    name: "Electricity Demand",
    unit: "GWh",
    frequency: "Daily",
    source: "EIA-930",
    records: "1,260+",
  },
  {
    id: "generation-mix",
    sector: "Power",
    name: "Generation Mix",
    unit: "GWh",
    frequency: "Monthly",
    source: "EIA-923",
    records: "10,000+",
  },
  // Transportation — one live
  {
    id: "fuel-prices",
    sector: "Transportation",
    name: "Fuel Price Tracker",
    unit: "$/gallon",
    frequency: "Weekly",
    source: "EIA",
    records: "260+",
  },
  // Buildings — one live
  {
    id: "residential-rate",
    sector: "Buildings",
    name: "Avg. Residential Rate",
    unit: "¢/kWh",
    frequency: "Monthly",
    source: "EIA",
    records: "2,400+",
  },
];

const SECTORS = ["Power", "Transportation", "Buildings"];

// ─── Stats hook ───────────────────────────────────────────────────────────────
// Fetches real data for the four live trackers and computes last/max/min.
// Returns null for placeholder trackers (stat cards won't render).

interface TrackerStats {
  last: string;
  lastLabel: string; // e.g. "Jan 2026"
  max: string;
  min: string;
  rangeLabel: string; // e.g. "5-year" or "3-year"
}

function yearsBetween(periods: string[]): number {
  if (periods.length < 2) return 1;
  const first = periods[0].substring(0, 4);
  const last  = periods[periods.length - 1].substring(0, 4);
  return Math.max(1, parseInt(last) - parseInt(first));
}

function rangeLabel(years: number): string {
  if (years <= 1)  return "1-year";
  if (years <= 2)  return "2-year";
  if (years <= 3)  return "3-year";
  if (years <= 5)  return "5-year";
  if (years <= 10) return "10-year";
  return `${years}-year`;
}

function formatPeriod(period: string): string {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const parts = period.split("-");
  if (parts.length === 2) {
    const m = parseInt(parts[1], 10) - 1;
    return `${months[m]} ${parts[0]}`;
  }
  // daily format YYYY-MM-DD
  if (parts.length === 3) {
    const m = parseInt(parts[1], 10) - 1;
    return `${months[m]} ${parts[2]}, ${parts[0]}`;
  }
  return period;
}

function useTrackerStats(trackerId: string): TrackerStats | null {
  const [stats, setStats] = useState<TrackerStats | null>(null);

  useEffect(() => {
    setStats(null);

    if (trackerId === "brent-crude") {
      fetch("/api/prices/brent-crude")
        .then((r) => r.json())
        .then((json) => {
          const rows = (json.data as { period: string; price: number }[])
            .sort((a, b) => a.period.localeCompare(b.period));
          if (!rows.length) return;
          const values = rows.map((r) => r.price);
          const periods = rows.map((r) => r.period);
          const years = yearsBetween(periods);
          setStats({
            last:       `$${rows[rows.length - 1].price.toFixed(2)}/barrel`,
            lastLabel:  formatPeriod(rows[rows.length - 1].period),
            max:        `$${Math.max(...values).toFixed(2)}/barrel`,
            min:        `$${Math.min(...values).toFixed(2)}/barrel`,
            rangeLabel: rangeLabel(years),
          });
        });
    }

    if (trackerId === "wti-crude") {
      fetch("/api/prices/wti-crude")
        .then((r) => r.json())
        .then((json) => {
          const rows = (json.data as { period: string; price: number }[])
            .sort((a, b) => a.period.localeCompare(b.period));
          if (!rows.length) return;
          const values = rows.map((r) => r.price);
          const periods = rows.map((r) => r.period);
          const years = yearsBetween(periods);
          setStats({
            last:       `$${rows[rows.length - 1].price.toFixed(2)}/barrel`,
            lastLabel:  formatPeriod(rows[rows.length - 1].period),
            max:        `$${Math.max(...values).toFixed(2)}/barrel`,
            min:        `$${Math.min(...values).toFixed(2)}/barrel`,
            rangeLabel: rangeLabel(years),
          });
        });
    }

    if (trackerId === "henry-hub") {
      fetch("/api/prices/henry-hub")
        .then((r) => r.json())
        .then((json) => {
          const rows = (json.data as { period: string; price: number }[])
            .sort((a, b) => a.period.localeCompare(b.period));
          if (!rows.length) return;
          const values = rows.map((r) => r.price);
          const periods = rows.map((r) => r.period);
          const years = yearsBetween(periods);
          setStats({
            last:       `$${rows[rows.length - 1].price.toFixed(2)}/MMBtu`,
            lastLabel:  formatPeriod(rows[rows.length - 1].period),
            max:        `$${Math.max(...values).toFixed(2)}/MMBtu`,
            min:        `$${Math.min(...values).toFixed(2)}/MMBtu`,
            rangeLabel: rangeLabel(years),
          });
        });
    }

    if (trackerId === "electricity-demand") {
      fetch("/api/prices/electricity-demand")
        .then((r) => r.json())
        .then((json) => {
          const rows = (json.data as { period: string; value: number }[])
            .sort((a, b) => a.period.localeCompare(b.period));
          if (!rows.length) return;
          const values = rows.map((r) => r.value);
          const periods = rows.map((r) => r.period);
          const years = yearsBetween(periods);
          setStats({
            last:       `${rows[rows.length - 1].value.toLocaleString()} GWh`,
            lastLabel:  formatPeriod(rows[rows.length - 1].period),
            max:        `${Math.max(...values).toLocaleString()} GWh`,
            min:        `${Math.min(...values).toLocaleString()} GWh`,
            rangeLabel: rangeLabel(years),
          });
        });
    }

    if (trackerId === "residential-rate") {
      fetch("/api/prices/residential-rate")
        .then((r) => r.json())
        .then((json) => {
          const rows = (json.data as { period: string; price: number }[])
            .sort((a, b) => a.period.localeCompare(b.period));
          if (!rows.length) return;
          const values = rows.map((r) => r.price);
          const periods = rows.map((r) => r.period);
          const years = yearsBetween(periods);
          setStats({
            last:       `${rows[rows.length - 1].price.toFixed(2)}¢/kWh`,
            lastLabel:  formatPeriod(rows[rows.length - 1].period),
            max:        `${Math.max(...values).toFixed(2)}¢/kWh`,
            min:        `${Math.min(...values).toFixed(2)}¢/kWh`,
            rangeLabel: rangeLabel(years),
          });
        });
    }

    if (trackerId === "fuel-prices") {
      fetch("/api/prices/fuel-prices")
        .then((r) => r.json())
        .then((json) => {
          const rows = (json.data as { period: string; price: number }[])
            .sort((a, b) => a.period.localeCompare(b.period));
          if (!rows.length) return;
          const values = rows.map((r) => r.price);
          const periods = rows.map((r) => r.period);
          const years = yearsBetween(periods);
          setStats({
            last:       `$${rows[rows.length - 1].price.toFixed(2)}/gal`,
            lastLabel:  formatPeriod(rows[rows.length - 1].period),
            max:        `$${Math.max(...values).toFixed(2)}/gal`,
            min:        `$${Math.min(...values).toFixed(2)}/gal`,
            rangeLabel: rangeLabel(years),
          });
        });
    }
  }, [trackerId]);

  return stats;
}

// ─── Chart renderer ───────────────────────────────────────────────────────────

function TrackerChart({ tracker, color }: { tracker: Tracker; color: string }) {
  const { t } = useTheme();

  if (tracker.id === "wti-crude")          return <WtiCrudeChart color={color} />;
  if (tracker.id === "brent-crude")        return <BrentCrudeChart color={color} />;
  if (tracker.id === "henry-hub")          return <HenryHubChart color={color} />;
  if (tracker.id === "electricity-demand") return <ElectricityDemandChart color={color} />;
  if (tracker.id === "generation-mix")     return <GenerationMixChart color={color} />;
  if (tracker.id === "residential-rate")   return <ResidentialRateChart color={color} />;
  if (tracker.id === "fuel-prices")        return <FuelPricesChart color={color} />;

  return (
    <div
      style={{
        height: "320px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        border: `1px dashed ${t.border}`,
        borderRadius: "6px",
        color: t.textDim,
      }}
    >
      <span style={{ fontSize: "28px" }}>📊</span>
      <span style={{ fontSize: "13px" }}>Chart coming soon</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function TrackersPageInner() {
  const { theme, t } = useTheme();
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") ?? "wti-crude";
  const [activeId, setActiveId] = useState<string>(
    TRACKERS.some((tr) => tr.id === initialId) ? initialId : "wti-crude"
  );

  const active      = TRACKERS.find((tr) => tr.id === activeId) ?? TRACKERS[0];
  const sectorColor = SECTOR_COLOR[active.sector]?.[theme] ?? t.accent;
  const stats       = useTrackerStats(activeId);

  return (
    <div
      style={{
        paddingTop: "56px",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          background: t.bgCard,
          borderRight: `1px solid ${t.border}`,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "16px 16px 10px",
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: t.textDim,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            Data Trackers
          </span>
        </div>

        {SECTORS.map((sector) => {
          const sectorTrackers = TRACKERS.filter((tr) => tr.sector === sector);
          const color = SECTOR_COLOR[sector]?.[theme] ?? t.accent;

          return (
            <div
              key={sector}
              style={{ borderBottom: `1px solid ${t.border}`, paddingBottom: "6px" }}
            >
              <div
                style={{
                  padding: "10px 16px 4px",
                  fontSize: "10px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  color: t.textDim,
                }}
              >
                {sector}
              </div>

              {sectorTrackers.map((tr) => {
                const isActive = tr.id === activeId;
                return (
                  <button
                    key={tr.id}
                    onClick={() => setActiveId(tr.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      padding: "7px 16px",
                      background: isActive ? `${color}14` : "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.15s",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: isActive ? color : `${color}55`,
                        transition: "background 0.15s",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        color: isActive ? t.text : t.textMuted,
                        fontWeight: isActive ? 600 : 400,
                        lineHeight: 1.35,
                      }}
                    >
                      {tr.name}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </aside>

      {/* ── Main panel ──────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: t.bg,
        }}
      >
        {/* Topbar — name + sector tag only, no metadata pills */}
        <div
          style={{
            padding: "14px 28px",
            background: t.bgCard,
            borderBottom: `1px solid ${t.border}`,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: sectorColor,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>
            {active.name}
          </span>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Stat cards — only render for live trackers */}
          {stats && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "12px",
              }}
            >
              {[
                { label: `Latest (${stats.lastLabel})`, value: stats.last },
                { label: `${stats.rangeLabel} high`,    value: stats.max },
                { label: `${stats.rangeLabel} low`,     value: stats.min },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: t.bgCard,
                    border: `1px solid ${t.border}`,
                    borderRadius: "6px",
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: t.textDim,
                      marginBottom: "4px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: t.text,
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chart card */}
          <div
            style={{
              background: t.bgCard,
              border: `1px solid ${t.border}`,
              borderRadius: "6px",
              padding: "24px",
              flex: 1,
            }}
          >
            <TrackerChart tracker={active} color={sectorColor} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function TrackersPage() {
  return (
    <Suspense>
      <TrackersPageInner />
    </Suspense>
  );
}