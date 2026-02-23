import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Blizzard Power — Data-Driven Energy Intelligence",
  description:
    "Tracking the economics of energy across residential, power, transportation, agriculture, and industry sectors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
