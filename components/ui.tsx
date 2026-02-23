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
