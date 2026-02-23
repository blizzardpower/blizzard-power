export const THEMES = {
  light: {
    bg: "#f5f6f8",
    bgCard: "#ffffff",
    bgCardHover: "#f9fafb",
    border: "#e2e5ea",
    borderLight: "#cdd2da",
    accent: "#1a8bb3",
    accentDim: "#15708f",
    accentWarm: "#d4880a",
    text: "#1a1f26",
    textMuted: "#5a6674",
    textDim: "#8895a4",
    green: "#16875d",
    red: "#c93b3b",
    purple: "#7c5cbf",
    navBg: "#ffffffee",
    toggleBg: "#e8ebf0",
    chartBarDim: 0.25,
    tagAlpha: "18",
    tagBorderAlpha: "44",
  },
  dark: {
    bg: "#0a0e14",
    bgCard: "#111820",
    bgCardHover: "#161e28",
    border: "#1e2a38",
    borderLight: "#2a3a4e",
    accent: "#4dc9f6",
    accentDim: "#2a7a9e",
    accentWarm: "#f5a623",
    text: "#e8edf3",
    textMuted: "#8899aa",
    textDim: "#556677",
    green: "#34d399",
    red: "#f87171",
    purple: "#a78bfa",
    navBg: "#0a0e14ee",
    toggleBg: "#1e2a38",
    chartBarDim: 0.5,
    tagAlpha: "22",
    tagBorderAlpha: "44",
  },
} as const;

export type ThemeName = "light" | "dark";
export type ThemeColors = (typeof THEMES)["light"] | (typeof THEMES)["dark"];

export const sectorColorMap = {
  Residential: { base: "#1a8bb3", dark: "#4dc9f6" },
  Power: { base: "#d4880a", dark: "#f5a623" },
  Transportation: { base: "#16875d", dark: "#34d399" },
  Agriculture: { base: "#7c5cbf", dark: "#a78bfa" },
  Industry: { base: "#c93b3b", dark: "#f87171" },
} as const;

export type SectorName = keyof typeof sectorColorMap;

export function getSectorColor(sector: string, theme: ThemeName): string {
  const c = sectorColorMap[sector as SectorName];
  if (!c) return theme === "dark" ? "#4dc9f6" : "#1a8bb3";
  return theme === "dark" ? c.dark : c.base;
}

export function generateSparkline(points = 20, trend: "up" | "down" = "up"): number[] {
  const data: number[] = [];
  let val = 50 + Math.random() * 30;
  for (let i = 0; i < points; i++) {
    val += (Math.random() - (trend === "up" ? 0.35 : 0.65)) * 8;
    val = Math.max(10, Math.min(100, val));
    data.push(val);
  }
  return data;
}
