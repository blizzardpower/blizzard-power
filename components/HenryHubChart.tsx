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
import Papa from "papaparse";

interface PriceRow {
  period: string;
  price_per_mmbtu: number;
}

export default function HenryHubChart() {
  const [data, setData] = useState<PriceRow[]>([]);

  useEffect(() => {
    fetch("/data/henry_hub_monthly.csv")
      .then((res) => res.text())
      .then((csv) => {
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
        const rows = parsed.data as { period: string; price_per_mmbtu: string }[];

        const formatted = rows
          .map((row) => ({
            period: row.period,
            price_per_mmbtu: parseFloat(row.price_per_mmbtu),
          }))
          .filter((row) => !isNaN(row.price_per_mmbtu))
          .sort((a, b) => a.period.localeCompare(b.period));

        setData(formatted);
      });
  }, []);

  if (data.length === 0) return <p>Loading chart...</p>;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">
        Henry Hub Natural Gas — Monthly Spot Price ($/MMBtu)
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
            formatter={(val: number | undefined) => val !== undefined ? [`$${val.toFixed(2)}`, "Price"] : ["", "Price"]}
          />
          <Line
            type="monotone"
            dataKey="price_per_mmbtu"
            stroke="#16a34a"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 mt-2">
        Source: U.S. Energy Information Administration | Data as of {data[data.length - 1]?.period}
      </p>
    </div>
  );
}