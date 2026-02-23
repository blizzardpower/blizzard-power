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
