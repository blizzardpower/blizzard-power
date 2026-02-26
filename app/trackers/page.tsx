"use client";

import { useTheme } from "@/app/providers";
import BrentCrudeChart from "@/components/BrentCrudeChart";
import HenryHubChart from "@/components/HenryHubChart";

export default function TrackersPage() {
  const { t } = useTheme();

  return (
    <div style={{ padding: "100px 40px 40px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: t.text }}>Data Trackers</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", padding: "24px" }}>
          <BrentCrudeChart />
        </div>

        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", padding: "24px" }}>
          <HenryHubChart />
        </div>
      </div>
    </div>
  );
}