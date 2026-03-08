"use client";

import { useTheme } from "@/app/providers";
import BrentCrudeChart from "@/components/BrentCrudeChart";
import HenryHubChart from "@/components/HenryHubChart";

export default function TrackersPage() {
  const { t } = useTheme();

  return (
    <div className="page-padding" style={{ paddingTop: "100px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: t.text }}>Data Trackers</h1>
      </div>

      <div className="grid-trackers">
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