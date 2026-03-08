"use client";

import { useTheme } from "@/app/providers";
import WtiCrudeChart from "@/components/WtiCrudeChart";
import HenryHubChart from "@/components/HenryHubChart";
import ResidentialRateChart from "@/components/ResidentialRateChart";
import ElectricityDemandChart from "@/components/ElectricityDemandChart";

export default function TrackersPage() {
  const { t } = useTheme();

  return (
    <div className="page-padding" style={{ paddingTop: "100px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: t.text }}>Data Trackers</h1>
      </div>

      <div className="grid-trackers" style={{ marginBottom: "24px" }}>
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", padding: "24px" }}>
          <WtiCrudeChart />
        </div>

        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", padding: "24px" }}>
          <HenryHubChart />
        </div>
      </div>

      <div className="grid-trackers">
        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", padding: "24px" }}>
          <ElectricityDemandChart />
        </div>

        <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", padding: "24px" }}>
          <ResidentialRateChart />
        </div>
      </div>
    </div>
  );
}