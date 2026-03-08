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

interface PriceRow {
  period: string;
  price_per_barrel: number;
}

function periodToLabel(period: string): string {
  return period.substring(0, 4);
}

export default function BrentCrudeChart() {
  const [data, setData] = useState<PriceRow[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    fetch("/api/prices/brent-crude")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const formatted: PriceRow[] = json.data
          .map((row: { period: string; price: number }) => ({
            period: row.period,
            price_per_barrel: row.price,
          }))
          .sort((a: PriceRow, b: PriceRow) => a.period.localeCompare(b.period));

        setData(formatted);
        setLastUpdated(json.lastUpdated || "");
      })
      .catch((err) => console.error("Chart fetch error:", err));
  }, []);

  const januaryTicks = useMemo(() => {
    const seen = new Set<string>();
    const ticks: string[] = [];
    for (const row of data) {
      const monthKey = row.period.substring(0, 7);
      if (!seen.has(monthKey)) {
        seen.add(monthKey);
        ticks.push(row.period);
      }
    }
    return ticks.filter((t) => t.substring(5, 7) === "01");
  }, [data]);

  if (data.length === 0) return <p>Loading chart...</p>;

  return (
    <div>
      <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "24px" }}>
        Brent Crude Oil — Daily Spot Price ($/barrel)
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
            tickFormatter={(val: number) => `$${val}`}
          />
          <Tooltip
            labelFormatter={(value) => {
              const d = new Date(String(value) + "T00:00:00");
              return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
            }}
            formatter={(val: number | undefined) =>
              val !== undefined
                ? [`$${val.toFixed(2)}`, "Price"]
                : ["", "Price"]
            }
          />
          <Line
            type="monotone"
            dataKey="price_per_barrel"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
        Source: U.S. Energy Information Administration | Last updated:{" "}
        {lastUpdated}
      </p>
    </div>
  );
}