"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { THEMES, ThemeName, ThemeColors } from "@/lib/theme";

interface ThemeContextType {
  theme: ThemeName;
  t: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  t: THEMES.light as ThemeColors,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>("light");
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);
  const t = THEMES[theme];

  return (
    <ThemeContext.Provider value={{ theme, t, toggleTheme }}>
      <div
        style={{
          minHeight: "100vh",
          background: t.bg,
          color: t.text,
          fontFamily: "'DM Sans', sans-serif",
          transition: "background 0.35s ease, color 0.35s ease",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
