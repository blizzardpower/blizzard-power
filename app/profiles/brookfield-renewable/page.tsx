"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { SectorTag } from "@/components/ui";

export default function BrookfieldProfile() {
  const { t } = useTheme();
  const sH = (_text: string) => ({ fontSize: "18px", fontWeight: 700 as const, color: t.text, marginBottom: "12px", marginTop: "40px", paddingBottom: "8px", borderBottom: `1px solid ${t.border}` });
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
        <span style={{ margin: "0 8px" }}>/</span><span style={{ color: t.text }}>Brookfield Renewable</span>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: t.text, letterSpacing: "-0.02em" }}>Brookfield Renewable Partners</h1>
          <SectorTag sector="Power" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: t.textMuted, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", color: t.accent }}>NYSE: BEP / BEPC</span>
          <span>Hamilton, Bermuda (operated from Toronto & New York)</span>
          <a href="https://bep.brookfield.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>bep.brookfield.com ↗</a>
        </div>
        <div style={{ marginTop: "12px", fontSize: "11px", color: t.textDim }}>Data as of FY2024 (ended Dec 31, 2024) and FY2025 (ended Dec 31, 2025) public filings. Market data as of early March 2026.</div>
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
        {sB("FY2025 Revenue", "$6.3B", "BEP consolidated")}
        {sB("Operating Capacity", "~46 GW", "Global portfolio")}
        {sB("Employees", "~5,300", "Global")}
        {sB("FY2025 FFO", "$607M", "+19% YoY, +10% per unit")}
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {sB("FY2024 Revenue", "$5.9B", "+17% YoY")}
        {sB("Development Pipeline", "200+ GW", "Across technologies")}
        {sB("FY2024 Capital Deployed", "$12.5B", "$1.8B net to BEP")}
        {sB("2024 Asset Sales", "$2.8B", "~25% avg IRR")}
      </div>

      <h2 style={sH("Overview")}>Overview</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Brookfield Renewable Partners is one of the world's largest publicly traded pure-play renewable power platforms. The company owns and operates a globally diversified portfolio of hydroelectric, wind, solar, and energy storage assets across North America, South America, Europe, and Asia-Pacific. Brookfield Renewable is managed by Brookfield Asset Management, one of the world's largest alternative asset managers.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        The company trades as a limited partnership (BEP on NYSE) and also through a corporate share structure (BEPC on NYSE/TSX) to provide investor flexibility. Brookfield Renewable is incorporated in Bermuda but effectively operated from Toronto and New York. With approximately 46 GW of operating capacity and a development pipeline exceeding 200 GW, the company positions itself as a "clean energy supermajor."
      </p>

      <h2 style={sH("Portfolio & Technologies")}>Portfolio & Technologies</h2>
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Hydroelectric</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>Largest portfolio component</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          Hydro is the foundation of Brookfield Renewable's portfolio, providing dispatchable, long-duration clean energy. The hydro fleet spans major river systems across North and South America. In 2025, Brookfield signed its first hydro contracts with hyperscalers, reflecting growing demand from technology companies for clean, dispatchable generation beyond wind and solar. Hydro assets provide stable, inflation-linked cash flows with asset lives measured in decades.
        </p>
      </div>
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Wind & Solar</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>Fastest-growing segments</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          Brookfield Renewable's wind and solar assets span onshore wind, offshore wind (following the acquisition of Ørsted's U.K. offshore portfolio), and utility-scale solar across multiple continents. Major recent acquisitions include the privatization of Neoen (a leading French renewables developer) and Ørsted's operating U.K. offshore wind assets. These transactions added significant operating cash flows and an attractive development pipeline.
        </p>
      </div>
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Energy Storage & Distributed Generation</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>Emerging growth area</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          The portfolio includes battery storage and distributed energy resources. Brookfield has also invested in pumped storage hydro (including a 2+ GW joint venture in the U.K., though it has signed agreements to sell its interest). Energy storage is a growing focus as grid operators globally seek to manage intermittency from increasing wind and solar penetration.
        </p>
      </div>

      <h2 style={sH("Financial Performance")}>Financial Performance</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Brookfield Renewable reports using Funds From Operations (FFO) as its primary performance metric, consistent with infrastructure and real asset partnerships. FY2025 FFO was $607 million, up 19% year-over-year and 10% on a per-unit basis, driven by higher revenue from commercial initiatives, stronger generation, and contributions from acquisitions and development activities.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        FY2024 revenue was $5.9 billion (up 17% YoY), with capital deployment of $12.5 billion ($1.8 billion net to Brookfield Renewable). The company completed or reached agreements to sell assets generating $2.8 billion in proceeds at an average IRR of approximately 25% — nearly double its target return — to fund future growth. GAAP net loss attributable to unitholders was $19 million in FY2025, reflecting non-cash depreciation; cash-based metrics remained positive.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Brookfield Renewable announced a 5% distribution increase for 2026, continuing its track record of annual distribution growth. The company has targeted 12–15% long-term total returns for unitholders.
      </p>

      <h2 style={sH("Strategy & Outlook")}>Strategy & Outlook</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Brookfield Renewable's strategy combines three levers: organic development from its 200+ GW pipeline, accretive acquisitions of leading platforms and assets, and capital recycling (selling mature assets at strong returns to fund new growth). The company secured long-term contracts for over 9,000 MW of generation capacity across its operating fleet in FY2025.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        The demand environment is described by management as highly constructive, driven by accelerating electricity demand from data centers, digitalization, and AI. Technology company investment in data center infrastructure grew 50% year-over-year in FY2024, a trend expected to continue. Brookfield has also highlighted U.S. policy actions to drive greater industrial, manufacturing, and data center activity as favorable for domestic electricity demand.
      </p>

      <h2 style={sH("Key Considerations")}>Key Considerations</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Brookfield Renewable's partnership structure and management relationship with Brookfield Asset Management introduce complexity. Management fees, incentive distributions, and related-party transactions are standard for Brookfield-managed vehicles but require careful investor attention. The GAAP net loss (driven by non-cash depreciation on long-lived assets) can appear misleading relative to the company's underlying cash generation.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        The portfolio's global footprint introduces currency, regulatory, and political risk across multiple jurisdictions. Hydro generation is subject to hydrological variability. The company's growth model depends on access to capital at attractive terms, making it sensitive to interest rate environments. Wind and solar assets face technology risk, merchant price exposure on uncontracted output, and evolving subsidy regimes.
      </p>

      <h2 style={sH("Sources")}>Sources</h2>
      <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.7 }}>
        <p style={{ marginBottom: "6px" }}>This profile was compiled from publicly available information including:</p>
        <p style={{ marginBottom: "4px" }}><a href="https://bep.brookfield.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>Brookfield Renewable Partners Investor Relations</a> — Earnings releases, annual reports, supplemental information.</p>
        <p style={{ marginBottom: "4px" }}>FY2024 Annual Report (MD&A) and FY2025 earnings release.</p>
        <p style={{ marginBottom: "4px" }}>SEC and Canadian securities filings (Form 20-F).</p>
        <p style={{ marginTop: "12px", fontSize: "11px", color: t.textDim, fontStyle: "italic" }}>This profile is for informational purposes only and does not constitute investment advice, a recommendation, or a solicitation to buy or sell any security.</p>
      </div>

      <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: `1px solid ${t.border}` }}>
        <Link href="/profiles" style={{ fontSize: "13px", color: t.accent, textDecoration: "none" }}>← Back to all profiles</Link>
      </div>
    </div>
  );
}