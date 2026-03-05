"use client";

import { useTheme } from "@/app/providers";

export default function BlogPage() {
  const { t } = useTheme();

  return (
    <div style={{ padding: "100px 40px 40px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: t.text, marginBottom: "24px" }}>Blog</h1>
      <div style={{ fontSize: "15px", color: t.textMuted }}>coming soon, hopefully</div>
    </div>
  );
}