"use client";

import { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RateRow {
  period: string;
  price: number;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function periodToLabel(period: string): string {
  return period.substring(0, 4);
}

function periodToTooltip(period: string): string {
  const parts = period.split("-");
  const monthIndex = parseInt(parts[1], 10) - 1;
  return `${MONTH_NAMES[monthIndex]} ${parts[0]}`;
}

export default function ResidentialRateChart({ color = "#d4880a" }: { color?: string }) {
  const [data, setData] = useState<RateRow[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    fetch("/api/prices/residential-rate")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const formatted: RateRow[] = json.data
          .map((row: { period: string; price: number }) => ({
            period: row.period,
            price: row.price,
          }))
          .sort((a: RateRow, b: RateRow) => a.period.localeCompare(b.period));

        setData(formatted);
        setLastUpdated(json.lastUpdated || "");
      })
      .catch((err) => console.error("Chart fetch error:", err));
  }, []);

  const januaryTicks = useMemo(() => {
    const seen = new Set<string>();
    const ticks: string[] = [];
    for (const row of data) {
      if (!seen.has(row.period)) {
        seen.add(row.period);
        ticks.push(row.period);
      }
    }
    return ticks.filter((t) => t.substring(5, 7) === "01");
  }, [data]);

  if (data.length === 0) return <p>Loading chart...</p>;

  return (
    <div>
      <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "24px" }}>
        U.S. Avg. Residential Electricity Rate (¢/kWh)
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 40, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="period"
            ticks={januaryTicks}
            tickFormatter={(value: string) => periodToLabel(value)}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "#ccc" }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(val: number) => `${val}¢`}
          />
          <Tooltip
            labelFormatter={(value) => periodToTooltip(String(value))}
            formatter={(val: number | undefined) =>
              val !== undefined
                ? [`${val.toFixed(2)}¢/kWh`, "Rate"]
                : ["", "Rate"]
            }
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
        Source: U.S. Energy Information Administration | Last updated:{" "}
        {lastUpdated} | Monthly
      </p>
    </div>
  );
}