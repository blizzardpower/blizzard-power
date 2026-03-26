"use client";

import { useEffect, useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/app/providers";

interface GenerationRow {
  period: string;
  [fuelType: string]: string | number;
}

const FUEL_COLORS: Record<string, string> = {
  "Natural gas": "#d1d5db",
  "Coal":        "#6b7280",
  "Nuclear":     "#a78bfa",
  "Wind":        "#4dc9f6",
  "Solar":       "#fbbf24",
  "Hydro":       "#34d399",
  "Other":       "#9ca3af",
};

const FUEL_TYPES = ["Natural gas", "Coal", "Nuclear", "Wind", "Solar", "Hydro", "Other"];

function periodToYear(period: string): string {
  return period.substring(0, 4);
}

function toPercent(row: GenerationRow): GenerationRow {
  const total = FUEL_TYPES.reduce((s, ft) => s + (row[ft] as number), 0);
  if (total === 0) return row;
  const out: GenerationRow = { period: row.period };
  for (const ft of FUEL_TYPES) out[ft] = parseFloat((((row[ft] as number) / total) * 100).toFixed(2));
  return out;
}

export default function GenerationMixChart({ color: _color }: { color?: string }) {
  const { t } = useTheme();
  const [data, setData] = useState<GenerationRow[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [mode, setMode] = useState<"absolute" | "percent">("absolute");

  useEffect(() => {
    fetch("/api/prices/generation-mix")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json.data);
        setLastUpdated(json.lastUpdated || "");
      })
      .catch((err) => console.error("Chart fetch error:", err));
  }, []);

  const januaryTicks = useMemo(() => {
    return data
      .filter((row) => row.period.substring(5, 7) === "01")
      .map((row) => row.period);
  }, [data]);

  const chartData = useMemo(
    () => (mode === "percent" ? data.map(toPercent) : data),
    [data, mode]
  );

  if (data.length === 0) return <p style={{ color: t.textDim }}>Loading chart...</p>;

  const isPercent = mode === "percent";

  return (
    <div>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 600, color: t.text, margin: 0 }}>
          U.S. Electricity Generation — Monthly by Fuel Type{isPercent ? " (% of total)" : " (GWh)"}
        </h3>

        {/* Toggle */}
        <div style={{ display: "flex", border: `1px solid ${t.border}`, borderRadius: "5px", overflow: "hidden", flexShrink: 0 }}>
          {(["absolute", "percent"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "4px 12px",
                fontSize: "11px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                background: mode === m ? t.accent : "transparent",
                color: mode === m ? "#fff" : t.textMuted,
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {m === "absolute" ? "GWh" : "% Share"}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={chartData} margin={{ top: 5, right: 40, bottom: 5, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={t.border} />
          <XAxis
            dataKey="period"
            ticks={januaryTicks}
            tickFormatter={periodToYear}
            tick={{ fontSize: 11, fill: t.textDim }}
            tickLine={false}
            axisLine={{ stroke: t.border }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: t.textDim }}
            tickFormatter={(val: number) =>
              isPercent ? `${val.toFixed(0)}%` : `${(val / 1000).toFixed(0)}k`
            }
            domain={isPercent ? [0, 100] : ["auto", "auto"]}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: t.bgCard,
              border: `1px solid ${t.border}`,
              borderRadius: "6px",
              fontSize: "12px",
            }}
            labelStyle={{ color: t.textDim, marginBottom: "6px" }}
            labelFormatter={(value) => {
              const [year, month] = String(value).split("-");
              const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
              return `${months[parseInt(month, 10) - 1]} ${year}`;
            }}
            formatter={(val: number, name: string) => [
              isPercent ? `${val.toFixed(1)}%` : `${val.toLocaleString()} GWh`,
              name,
            ]}
          />
          {FUEL_TYPES.map((ft) => (
            <Area
              key={ft}
              type="monotone"
              dataKey={ft}
              stackId="a"
              stroke={FUEL_COLORS[ft]}
              fill={FUEL_COLORS[ft]}
              fillOpacity={0.85}
              strokeWidth={0}
              dot={false}
              activeDot={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 20px", marginTop: "14px" }}>
        {FUEL_TYPES.map((ft) => (
          <div key={ft} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: FUEL_COLORS[ft],
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "11px", color: t.textMuted }}>{ft}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "11px", color: t.textDim, marginTop: "12px" }}>
        Source: U.S. Energy Information Administration (Form EIA-923) | Monthly |{" "}
        {isPercent ? "% of total generation" : "GWh"} | Last updated: {lastUpdated}
      </p>
    </div>
  );
}
