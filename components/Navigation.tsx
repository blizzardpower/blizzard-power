"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/providers";
import { THEMES } from "@/lib/theme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        position: "relative",
        width: "52px",
        height: "28px",
        borderRadius: "14px",
        border: `1px solid ${THEMES[theme].border}`,
        background: THEMES[theme].toggleBg,
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: isDark ? "26px" : "3px",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: isDark ? THEMES.dark.accent : "#f5a623",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          boxShadow: isDark
            ? `0 0 8px ${THEMES.dark.accent}66`
            : "0 1px 4px rgba(0,0,0,0.15)",
        }}
      >
        {isDark ? "\u{1F319}" : "\u2600\uFE0F"}
      </div>
    </button>
  );
}

const links = [
  { href: "/", label: "Home" },
  { href: "/profiles", label: "Profiles" },
  { href: "/trackers", label: "Trackers" },
  { href: "/blog", label: "Blog" },
];

export default function Navigation() {
  const { theme, t } = useTheme();
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: "56px",
        background: t.navBg,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${t.border}`,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img
          src="/blizzard.svg"
          alt="Blizzard Power"
          style={{ height: "55px", width: "auto" }}
        />
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {links.map((link) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "6px 14px",
                fontSize: "13px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? t.accent : t.textMuted,
                background: isActive ? `${t.accent}14` : "transparent",
                border: "none",
                borderRadius: "4px",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.2s",
              }}
            >
              {link.label}
            </Link>
          );
        })}
        <div style={{ width: "1px", height: "20px", background: t.border, margin: "0 10px" }} />
        <ThemeToggle />
      </div>
    </nav>
  );
}