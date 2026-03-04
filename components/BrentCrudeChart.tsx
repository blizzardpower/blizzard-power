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

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function periodToLabel(period: string): string {
  const parts = period.split("-");
  const monthIndex = parseInt(parts[1], 10) - 1;
  return `${MONTH_NAMES[monthIndex]} ${parts[0]}`;
}

export default function BrentCrudeChart() {
  const [data, setData] = useState<PriceRow[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    fetch("/api/prices/brent-crude")
      .then((res) => res.json())
      .then((json) => {
        const formatted: PriceRow[] = json.data
          .map((row: { period: string; price: number }) => ({
            period: row.period,
            price_per_barrel: row.price,
          }))
          .sort((a: PriceRow, b: PriceRow) => a.period.localeCompare(b.period));

        setData(formatted);
        setLastUpdated(json.lastUpdated || "");
      });
  }, []);

  const monthlyTicks = useMemo(() => {
    const seen = new Set<string>();
    const ticks: string[] = [];
    for (const row of data) {
      const monthKey = row.period.substring(0, 7);
      if (!seen.has(monthKey)) {
        seen.add(monthKey);
        ticks.push(row.period);
      }
    }
    return ticks.filter((_, i) => i % 3 === 0);
  }, [data]);

  if (data.length === 0) return <p>Loading chart...</p>;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">
        Brent Crude Oil — Daily Spot Price ($/barrel)
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="period"
            ticks={monthlyTicks}
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
            labelFormatter={(value: string) => periodToLabel(value)}
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
      <p className="text-xs text-gray-500 mt-2">
        Source: U.S. Energy Information Administration | Last updated:{" "}
        {lastUpdated} | Daily frequency, cached 24hrs
      </p>
    </div>
  );
}