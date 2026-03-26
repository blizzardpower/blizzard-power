"use client";

import { useTheme } from "@/app/providers";

export default function BlogPage() {
  const { t } = useTheme();

  return (
    <div style={{ padding: "100px 40px 40px", maxWidth: "820px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: t.text, marginBottom: "16px" }}>Blog</h1>
      <p style={{ fontSize: "14px", color: t.textMuted }}>Coming soon, hopefully.</p>
    </div>
  );
}
