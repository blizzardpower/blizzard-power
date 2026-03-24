"use client";

import { useEffect, useState } from "react";
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
  price: number;
}

function periodToYear(period: string): string {
  return period.substring(0, 4);
}

export default function WtiCrudeChart({ color = "#1a8bb3" }: { color?: string }) {
  const [data, setData] = useState<PriceRow[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    fetch("/api/prices/wti-crude")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const formatted: PriceRow[] = (json.data as { period: string; price: number }[])
          .sort((a, b) => a.period.localeCompare(b.period));
        setData(formatted);
        setLastUpdated(json.lastUpdated || "");
      })
      .catch((err) => console.error("WtiCrudeChart fetch error:", err));
  }, []);

  const januaryTicks = data
    .map((r) => r.period)
    .filter((p) => p.substring(5, 7) === "01")
    .filter((p, i, arr) => arr.indexOf(p) === i);

  if (data.length === 0) return <p>Loading chart...</p>;

  return (
    <div>
      <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "24px" }}>
        WTI Crude Oil Spot Price ($/barrel)
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 40, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="period"
            ticks={januaryTicks}
            tickFormatter={periodToYear}
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
              val !== undefined ? [`$${val.toFixed(2)}`, "Price"] : ["", "Price"]
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
        Source: U.S. Energy Information Administration | Last updated: {lastUpdated}
      </p>
    </div>
  );
}