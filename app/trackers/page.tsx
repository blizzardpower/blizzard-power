"use client";

import { useTheme } from "@/app/providers";
import BrentCrudeChart from "@/components/BrentCrudeChart";

export default function TrackersPage() {
  const { t } = useTheme();

  return (
    <div style={{ padding: "100px 40px 40px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: t.text }}>Data Trackers</h1>
      </div>

      <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", padding: "24px" }}>
        <BrentCrudeChart />
      </div>
    </div>
  );
}