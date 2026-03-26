"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { SectorTag } from "@/components/ui";

export default function NextEraProfile() {
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
        <span style={{ margin: "0 8px" }}>/</span><span style={{ color: t.text }}>NextEra Energy</span>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: t.text, letterSpacing: "-0.02em" }}>NextEra Energy</h1>
          <SectorTag sector="Power" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: t.textMuted }}>
          <span style={{ fontFamily: "'Space Mono', monospace", color: t.accent }}>NYSE: NEE</span>
          <span>Juno Beach, Florida</span>
          <a href="https://www.nexteraenergy.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>nexteraenergy.com ↗</a>
        </div>
        <div style={{ marginTop: "12px", fontSize: "11px", color: t.textDim }}>Data as of FY2024 (ended Dec 31, 2024) and Q3 FY2025 public filings. Market data as of early March 2026.</div>
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
        {sB("FY2024 Revenue", "$24.8B", "Down 12% YoY")}
        {sB("Market Cap", "~$155B", "As of Mar 2026")}
        {sB("Employees", "~16,700", "U.S. and Canada")}
        {sB("FY2024 Net Income", "$6.9B", "$3.37/share GAAP")}
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {sB("Adj. EPS (FY2024)", "$3.43", "+8% YoY")}
        {sB("Generating Capacity", "~73 GW", "Total fleet")}
        {sB("NEER Backlog", "~25 GW", "Renewables + storage")}
        {sB("2025E Adj. EPS", "$3.45–3.70", "Company guidance")}
      </div>

      <h2 style={sH("Overview")}>Overview</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        NextEra Energy is the world's largest electric utility holding company by market capitalization, with a total generating capacity of approximately 73 gigawatts. The company operates through two principal subsidiaries: Florida Power & Light (FPL), the largest rate-regulated electric utility in the United States, and NextEra Energy Resources (NEER), the world's largest generator of renewable energy from wind and sun.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        NextEra Energy is led by Chairman, President, and CEO John Ketchum. The company is headquartered in Juno Beach, Florida, employs approximately 16,700 people across the U.S. and Canada, and has been publicly traded on the NYSE since the early 1980s (originally as FPL Group, rebranded in 2010).
      </p>

      <h2 style={sH("Business Segments")}>Business Segments</h2>
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Florida Power & Light (FPL)</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>Largest U.S. electric utility</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          FPL is a rate-regulated electric utility serving approximately 5.8 million customer accounts (more than 12 million people) across nearly half of Florida. FPL's generation mix includes natural gas, nuclear, and a rapidly growing solar portfolio. FPL delivered adjusted earnings of $3.945 billion ($1.92/share) in FY2024, up from $3.684 billion in FY2023. The utility has proposed a four-year base rate settlement agreement to support continued capital investment through 2029.
        </p>
      </div>
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>NextEra Energy Resources (NEER)</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>World's largest wind & solar generator</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          NEER is the world's largest generator of renewable energy from wind and solar, and also operates natural gas and nuclear generation assets. NEER delivered its best origination year ever in FY2024 for the third consecutive year, adding more than 12 GW of new renewables and battery storage projects to its backlog. With over 6 GW of new projects placed into service over the last four quarters, NEER's backlog totals more than 25 GW. NEER is also evaluating the recommissioning of its Duane Arnold Energy Center nuclear plant in Iowa. Adjusted earnings for NEER were $3.118 billion ($1.51/share) in FY2024.
        </p>
      </div>

      <h2 style={sH("Financial Performance")}>Financial Performance</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        NextEra Energy reported FY2024 GAAP net income of $6.9 billion ($3.37/share) on revenue of $24.8 billion. On an adjusted basis, FY2024 earnings were $7.1 billion ($3.43/share), representing approximately 8% year-over-year growth in adjusted EPS. The revenue decline from FY2023's $28.1 billion reflects market dynamics, though earnings grew due to strong operational performance at both FPL and NEER.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Through Q3 FY2025, NextEra Energy continued to deliver strong results, with Q3 adjusted EPS of $1.13 (up 9.7% year-over-year). The company expects to grow dividends per share at roughly 10% per year through at least 2027. Long-term guidance calls for adjusted EPS of $3.45–3.70 for 2025, $3.63–4.00 for 2026, and $3.85–4.32 for 2027.
      </p>

      <h2 style={sH("Strategy & Outlook")}>Strategy & Outlook</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        NextEra's strategy is anchored in the accelerating demand for electricity driven by data centers, AI, industrial reshoring, and electrification. In December 2025, NextEra announced an expanded partnership with Google Cloud to develop approximately 15 GW of new power generation capacity by 2035 to support large-scale data center campuses in the United States.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        NEER's 25+ GW backlog provides multi-year growth visibility. NextEra continues to invest heavily in solar, wind, and battery storage through NEER, while FPL focuses on grid modernization, storm hardening, and solar deployment across Florida. The company is also exploring nuclear opportunities, including the potential Duane Arnold recommissioning and partnerships with technology companies for nuclear-powered data center infrastructure.
      </p>

      <h2 style={sH("Key Considerations")}>Key Considerations</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        NextEra's scale in renewables is a competitive advantage but also exposes it to policy risk — changes to federal tax credits (particularly the IRA's production and investment tax credits) or renewable energy mandates could affect NEER's project economics and origination pipeline.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        FPL operates in a hurricane-prone region, creating periodic storm recovery costs and regulatory proceedings. Rising interest rates affect the cost of capital for the company's large-scale development activities. Approximately 36% of NextEra's generating capacity remains fossil-fuel-based, a proportion that continues to decline but remains significant.
      </p>

      <h2 style={sH("Sources")}>Sources</h2>
      <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.7 }}>
        <p style={{ marginBottom: "6px" }}>This profile was compiled from publicly available information including:</p>
        <p style={{ marginBottom: "4px" }}><a href="https://www.investor.nexteraenergy.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>NextEra Energy Investor Relations</a> — Earnings releases, SEC filings, and investor presentations.</p>
        <p style={{ marginBottom: "4px" }}><a href="https://www.nexteraenergy.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>NextEra Energy corporate website</a> — Company overview, subsidiary information.</p>
        <p style={{ marginBottom: "4px" }}>Q4 2024 and Q3 2025 earnings releases.</p>
        <p style={{ marginTop: "12px", fontSize: "11px", color: t.textDim, fontStyle: "italic" }}>This profile is for informational purposes only and does not constitute investment advice, a recommendation, or a solicitation to buy or sell any security.</p>
      </div>

      <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: `1px solid ${t.border}` }}>
        <Link href="/profiles" style={{ fontSize: "13px", color: t.accent, textDecoration: "none" }}>← Back to all profiles</Link>
      </div>
    </div>
  );
}