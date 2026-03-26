"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { SectorTag } from "@/components/ui";

export default function ConstellationProfile() {
  const { theme, t } = useTheme();
  const sH = (text: string) => ({ fontSize: "18px", fontWeight: 700 as const, color: t.text, marginBottom: "12px", marginTop: "40px", paddingBottom: "8px", borderBottom: `1px solid ${t.border}` });
  const sB = (label: string, value: string, sub?: string) => (
    <div key={label} style={{ padding: "16px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", flex: "1", minWidth: "140px" }}>
      <div style={{ fontSize: "10px", color: t.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "22px", fontWeight: 700, color: t.text, fontFamily: "'Space Mono', monospace" }}>{value}</div>
      {sub && <div style={{ fontSize: "11px", color: t.textMuted, marginTop: "2px" }}>{sub}</div>}
    </div>
  );

  return (
    <div style={{ padding: "100px 40px 60px", maxWidth: "860px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px", fontSize: "13px", color: t.textMuted }}>
        <Link href="/profiles" style={{ color: t.accent, textDecoration: "none" }}>Profiles</Link>
        <span style={{ margin: "0 8px" }}>/</span><span style={{ color: t.text }}>Constellation Energy</span>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: t.text, letterSpacing: "-0.02em" }}>Constellation Energy</h1>
          <SectorTag sector="Power" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: t.textMuted }}>
          <span style={{ fontFamily: "'Space Mono', monospace", color: t.accent }}>NASDAQ: CEG</span>
          <span>Baltimore, Maryland</span>
          <a href="https://www.constellationenergy.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>constellationenergy.com ↗</a>
        </div>
        <div style={{ marginTop: "12px", fontSize: "11px", color: t.textDim }}>Data as of FY2024 and FY2025 (ended Dec 31, 2025) public filings. Market data as of early March 2026.</div>
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
        {sB("FY2025 Revenue", "$25.5B", "+8% YoY")}
        {sB("Market Cap", "~$110B", "As of Mar 2026")}
        {sB("Employees", "~14,000", "Pre-Calpine")}
        {sB("FY2024 Net Income", "$3.7B", "$11.89/share")}
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {sB("Nuclear Fleet", "~22 GW", "21 reactors, 11 sites")}
        {sB("FY2025 Adj. Op. EPS", "~$8.90–9.60", "Company guidance")}
        {sB("Nuclear Capacity Factor", "94.6%", "FY2024")}
        {sB("FY2024 EBITDA", "$7.1B", "Robust cash generation")}
      </div>

      <h2 style={sH("Overview")}>Overview</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Constellation Energy is the nation's largest producer of emissions-free energy, operating the largest fleet of nuclear power plants in the United States. The company was spun off from Exelon Corporation in February 2022 and is headquartered in Baltimore, Maryland. Constellation is a Fortune 200 company that supplies energy to approximately three-fourths of Fortune 100 companies.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Led by President and CEO Joe Dominguez, Constellation has positioned itself at the intersection of decarbonization and the surging demand for reliable power driven by data center build-outs and AI infrastructure. The company's output is nearly 90% carbon-free. In January 2025, Constellation announced the acquisition of Calpine Corporation for approximately $22 billion (including $4.5 billion in cash), adding significant natural gas and geothermal generation capacity to its portfolio.
      </p>

      <h2 style={sH("Business Operations")}>Business Operations</h2>
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Nuclear Generation</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>~22 GW | 21 reactors</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          Constellation's nuclear fleet consists of 21 reactors across 11 sites, producing approximately 182,700 GWh in FY2025. The fleet operated at a 94.6% capacity factor in FY2024. Nuclear generation provides always-on, zero-carbon baseload power — a characteristic that has become increasingly valuable to technology companies seeking 24/7 carbon-free energy for data centers. Constellation has signed major long-term power purchase agreements with Microsoft (20-year deal for the Crane Clean Energy Center restart) and Meta (20-year deal for the full output of the Clinton Clean Energy Center).
        </p>
      </div>
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Natural Gas & Renewables (incl. Calpine)</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>Post-acquisition fleet</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          With the Calpine acquisition (closed January 2025), Constellation added a large fleet of natural gas plants and geothermal assets, creating one of the most diverse generation portfolios in the country. Gas and oil plants produced approximately 16,700 GWh in FY2025, while renewables (wind, solar, hydro) produced approximately 5,600 GWh. Calpine's natural gas fleet provides dispatchable peaking capacity — critical for grid reliability as intermittent renewables grow. The combined entity is expected to be the nation's leading competitive retail energy supplier, serving 2.5 million customers.
        </p>
      </div>
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Commercial & Retail</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>3/4 of Fortune 100</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          Constellation is a leading retail and wholesale energy supplier, providing electricity and sustainability solutions to businesses, governments, and residential customers nationwide. The company supplies energy to approximately three-fourths of Fortune 100 companies. The Calpine acquisition further expands its retail footprint, creating a combined base of approximately 2.5 million customers.
        </p>
      </div>

      <h2 style={sH("Financial Performance")}>Financial Performance</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Constellation reported FY2024 GAAP net income of $3.7 billion ($11.89/share), a significant increase from $1.6 billion in FY2023. Revenue was $23.6 billion. Adjusted operating earnings were $2.7 billion ($8.58/share), up from $6.28/share in FY2023. FY2024 EBITDA was $7.1 billion.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        FY2025 revenue grew to $25.5 billion. However, GAAP net income declined to $2.3 billion ($7.40/share), partly due to lower nuclear production tax credit revenue and unrealized hedging losses. Adjusted operating earnings improved to approximately $2.9 billion. Wholesale power prices surged across key markets in 2025 — day-ahead prices in PJM West jumped 49% and New England prices increased 64% — a favorable environment for Constellation's merchant generation fleet. The company completed $1 billion in share repurchases in FY2024 and increased its dividend by 25%.
      </p>

      <h2 style={sH("Strategy & Outlook")}>Strategy & Outlook</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Constellation's strategy centers on its role as the reliable, carbon-free power provider for the data center and AI buildout. The Crane Clean Energy Center restart (formerly Three Mile Island Unit 1) is under a 20-year PPA with Microsoft, though the timeline remains uncertain. The company is also pursuing nuclear plant capacity uprates, life extensions, and AI-powered demand response tools.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        The Calpine integration is expected to drive a significant EBITDA step-up in 2026 as the assets are fully consolidated. Constellation plans to invest over $2.5 billion in 2025 for operations and growth. The December 2025 FERC ruling enabling behind-the-meter "colocation" of data centers next to power plants is viewed as a significant regulatory tailwind for the company's nuclear-powered data center strategy.
      </p>

      <h2 style={sH("Key Considerations")}>Key Considerations</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Nuclear generation carries low-probability, high-impact operational risks. Any safety incident could trigger regulatory tightening and significantly affect the company's valuation. The Crane restart timeline remains uncertain and represents execution risk.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Constellation's earnings are sensitive to wholesale power prices, which are volatile and affected by weather, gas prices, and demand patterns. Federal nuclear production tax credits (under the IRA) have been material to earnings — changes to these credits could affect profitability. The Calpine acquisition adds integration risk and increases the company's exposure to natural gas-fired generation, which may face future carbon-related regulatory costs.
      </p>

      <h2 style={sH("Sources")}>Sources</h2>
      <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.7 }}>
        <p style={{ marginBottom: "6px" }}>This profile was compiled from publicly available information including:</p>
        <p style={{ marginBottom: "4px" }}><a href="https://investors.constellationenergy.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>Constellation Energy Investor Relations</a> — Earnings releases, SEC filings, investor presentations.</p>
        <p style={{ marginBottom: "4px" }}><a href="https://www.constellationenergy.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>Constellation Energy corporate website</a> — Company overview, fleet information.</p>
        <p style={{ marginBottom: "4px" }}>Q4 2024 and FY2025 earnings releases, 2024 Annual Report on Form 10-K.</p>
        <p style={{ marginTop: "12px", fontSize: "11px", color: t.textDim, fontStyle: "italic" }}>This profile is for informational purposes only and does not constitute investment advice, a recommendation, or a solicitation to buy or sell any security.</p>
      </div>

      <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: `1px solid ${t.border}` }}>
        <Link href="/profiles" style={{ fontSize: "13px", color: t.accent, textDecoration: "none" }}>← Back to all profiles</Link>
      </div>
    </div>
  );
}