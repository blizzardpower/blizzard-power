"use client";

import { useTheme } from "@/app/providers";

export default function AboutPage() {
  const { t } = useTheme();

  return (
    <div style={{ padding: "100px 40px 40px", maxWidth: "640px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: t.text, marginBottom: "16px" }}>About</h1>
      <div style={{ padding: "40px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", textAlign: "center" }}>
        <div style={{ fontSize: "32px", marginBottom: "16px" }}>{"\uD83D\uDCDD"}</div>
        <div style={{ fontSize: "15px", color: t.textMuted, lineHeight: 1.6 }}>
          Your content goes here. This section is ready for you to fill in with your story, mission, and background.
        </div>
      </div>
    </div>
  );
}
