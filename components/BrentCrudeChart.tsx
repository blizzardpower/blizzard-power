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
  price_per_barrel: number;
}

export default function BrentCrudeChart() {
  const [data, setData] = useState<PriceRow[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    fetch("/api/prices/brent-crude")
      .then((res) => res.json())
      .then((json) => {
        const formatted = json.data
          .map((row: { period: string; price: number }) => ({
            period: row.period,
            price_per_barrel: row.price,
          }))
          .sort((a: PriceRow, b: PriceRow) => a.period.localeCompare(b.period));

        setData(formatted);
        setLastUpdated(json.lastUpdated || "");
      });
  }, []);

  if (data.length === 0) return <p>Loading chart...</p>;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">
        Brent Crude Oil — Daily Spot Price ($/barrel)
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 12 }}
            interval={Math.floor(data.length / 8)}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(val: number) => `$${val}`}
          />
          <Tooltip
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