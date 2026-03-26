"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { SectorTag } from "@/components/ui";

export default function GEVernovaProfile() {
  const { theme, t } = useTheme();

  const sectionHeader = (text: string) => ({
    fontSize: "18px",
    fontWeight: 700 as const,
    color: t.text,
    marginBottom: "12px",
    marginTop: "40px",
    paddingBottom: "8px",
    borderBottom: `1px solid ${t.border}`,
  });

  const statBox = (label: string, value: string, sub?: string) => (
    <div key={label} style={{ padding: "16px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", flex: "1", minWidth: "140px" }}>
      <div style={{ fontSize: "10px", color: t.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "22px", fontWeight: 700, color: t.text, fontFamily: "'Space Mono', monospace" }}>{value}</div>
      {sub && <div style={{ fontSize: "11px", color: t.textMuted, marginTop: "2px" }}>{sub}</div>}
    </div>
  );

  return (
    <div style={{ padding: "100px 40px 60px", maxWidth: "860px", margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "24px", fontSize: "13px", color: t.textMuted }}>
        <Link href="/profiles" style={{ color: t.accent, textDecoration: "none" }}>Profiles</Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: t.text }}>GE Vernova</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: t.text, letterSpacing: "-0.02em" }}>GE Vernova</h1>
          <SectorTag sector="Power" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: t.textMuted }}>
          <span style={{ fontFamily: "'Space Mono', monospace", color: t.accent }}>NYSE: GEV</span>
          <span>Cambridge, Massachusetts</span>
          <a href="https://www.gevernova.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>gevernova.com ↗</a>
        </div>
        <div style={{ marginTop: "12px", fontSize: "11px", color: t.textDim }}>
          Data as of FY2024 (ended Dec 31, 2024) and FY2025 (ended Dec 31, 2025) public filings. Market data as of early March 2026.
        </div>
      </div>

      {/* Key Stats Row */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
        {statBox("TTM Revenue", "$38.1B", "FY2025, +9% YoY")}
        {statBox("Market Cap", "~$237B", "As of Mar 2026")}
        {statBox("Employees", "~75,000", "100+ countries")}
        {statBox("TTM Free Cash Flow", "$3.7B", "FY2025, 2x+ YoY")}
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {statBox("FY2025 Orders", "$59B", "+34% YoY")}
        {statBox("Cash Balance", "$8.2B", "End of FY2024")}
        {statBox("TTM Net Income", "$4.9B", "12.8% margin")}
        {statBox("2026E Revenue", "$44–45B", "Company guidance")}
      </div>

      {/* Overview */}
      <h2 style={sectionHeader("Overview")}>Overview</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        GE Vernova is a purpose-built global energy company formed from the April 2024 spin-off of General Electric's energy businesses, combining the former GE Power, GE Renewable Energy, GE Digital, and GE Energy Financial Services units. The company designs, manufactures, and services technologies that generate, transfer, orchestrate, convert, and store electricity. Its installed base produces approximately 25% of the world's electricity.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        The company is led by CEO Scott Strazik and CFO Ken Parks. The name itself signals its mission: "GE" for legacy and engineering quality, "Ver" (verde) for sustainability, and "Nova" (Latin for new) for innovation. GE Vernova trades on the NYSE under the ticker GEV and is headquartered in Cambridge, Massachusetts, with operations spanning more than 100 countries.
      </p>

      {/* Business Segments */}
      <h2 style={sectionHeader("Business Segments")}>Business Segments</h2>

      {/* Power */}
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Power</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>FY2024 Rev: ~$17.4B</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          Designs, manufactures, and services gas, nuclear, hydro, and steam turbines. The Power segment operates the largest fleet of gas turbines globally on a megawatt basis, with approximately 7,000 installed units, including the industry-leading H-class and HA-class high-efficiency gas turbines. The segment is expanding capacity to deliver 70–80 heavy-duty gas turbine units annually starting in 2026, up from a recent average of approximately 55. Gas Power services represent a significant and growing share of the segment's revenue. The segment also includes nuclear services and is participating in early-stage development of small modular reactors (SMRs), with the first 300 MW block expected in Canada by 2029.
        </p>
        <div style={{ marginTop: "8px", fontSize: "12px", color: t.textDim }}>FY2024 segment EBITDA margin: ~12% | 2025 guidance: 13–14%</div>
      </div>

      {/* Wind */}
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Wind</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>FY2024 Rev: ~$9.2B</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          Provides onshore and offshore wind turbines, blades, and related services. The installed base totals approximately 59,000 wind turbines with over 120 GW of installed capacity — the largest onshore fleet in the United States. The segment has faced profitability challenges, particularly in offshore wind where blade manufacturing issues created incremental losses in 2024. However, onshore wind achieved five consecutive quarters of profitability through FY2024, and management has applied selectivity, lean operations, and pricing discipline to stabilize the business.
        </p>
        <div style={{ marginTop: "8px", fontSize: "12px", color: t.textDim }}>FY2024 segment EBITDA margin: ~(6%) | 2025 guidance: $200–400M segment EBITDA loss</div>
      </div>

      {/* Electrification */}
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Electrification</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>FY2024 Rev: ~$7.5B</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          Encompasses grid solutions (including high-voltage direct current, or HVDC, systems), power conversion, solar and storage solutions, and electrification software (formerly GE Digital). This is the company's fastest-growing segment, driven by surging demand for grid modernization and data center electrification. Orders in this segment grew 19% organically in FY2024, and the equipment backlog more than tripled compared to year-end 2022. The segment achieved double-digit EBITDA margins for the first time in FY2024. Data center electrification orders exceeded $2 billion in FY2025 — three times the prior year.
        </p>
        <div style={{ marginTop: "8px", fontSize: "12px", color: t.textDim }}>FY2024 segment EBITDA margin: ~13% (Q4) | 2025 guidance: 11–13%</div>
      </div>

      {/* Financial Performance */}
      <h2 style={sectionHeader("Financial Performance")}>Financial Performance</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        GE Vernova's first full year as a public company (FY2024) produced revenue of $34.9 billion, up 5% reported and 7% organically year-over-year, with total orders of $44.1 billion. Net income reached $1.6 billion (4.5% margin), a $2.0 billion improvement from the prior year. Adjusted EBITDA was $2.0 billion at a 5.8% margin, and free cash flow came in at $1.7 billion. The company ended the year with $8.2 billion in cash, up from $4.2 billion at the time of the spin-off in April 2024.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        FY2025 showed acceleration across key metrics. Revenue grew 9% to $38.1 billion, orders surged 34% to $59 billion, and free cash flow more than doubled to $3.7 billion. Trailing-twelve-month net income reached $4.9 billion with a 12.8% net margin. Adjusted EBITDA margin expanded by approximately 210 basis points year-over-year.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Services represent over 55% of backlog, providing long-term cash flow visibility. The company initiated a quarterly dividend of $0.25 per share in late 2024, later increased to $0.50, and approved a $6 billion share repurchase authorization. In FY2025, GE Vernova returned approximately $3.6 billion to shareholders.
      </p>

      {/* Strategy & Outlook */}
      <h2 style={sectionHeader("Strategy & Outlook")}>Strategy & Outlook</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        GE Vernova's strategy centers on what management describes as the "energy trilemma" — balancing reliability, affordability, and sustainability. The company is investing heavily in capacity expansion across Power and Electrification to meet what it characterizes as a multi-year investment supercycle driven by grid modernization, data center build-outs, and the broader energy transition.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Planned cumulative capital expenditure and R&D investment of $9 billion through 2028 includes an approximately 20% increase in R&D spending expected in 2025. Key investment areas include gas turbine production capacity, HVDC and grid equipment manufacturing, small modular reactor development, and the GE Vernova Advanced Research Center in Niskayuna, New York, which is receiving over $105 million in expansion funding for carbon capture, alternative fuels, AI/robotics, and advanced grid technologies.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Company guidance for 2026 calls for revenue of $44–45 billion, adjusted EBITDA margins of 11–13%, and free cash flow of $5.0–5.5 billion. Longer-term, management has outlined a target of $56 billion in revenue with 20% margins by 2028. Capital allocation priorities include organic growth investment, returning at least one-third of cash generation to shareholders, and targeted bolt-on M&A.
      </p>

      {/* Key Risks */}
      <h2 style={sectionHeader("Key Considerations")}>Key Considerations</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        The Wind segment remains a drag on overall profitability. Offshore wind has faced blade manufacturing issues, project delays, and contract losses. While onshore wind has stabilized, the timing of a broader order inflection remains uncertain.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        The company's financial trajectory is sensitive to the pace of global grid investment, regulatory environments around permitting and energy policy, supply chain constraints in critical components, and macroeconomic conditions affecting capital expenditure decisions by utilities and industrial customers.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        GE Vernova's valuation reflects market expectations for sustained multi-year growth. As of early March 2026, the stock trades at a price-to-earnings ratio of approximately 50x trailing earnings. The 52-week range of $252 to $895 reflects the significant re-rating since the April 2024 spin-off.
      </p>

      {/* Sources */}
      <h2 style={sectionHeader("Sources")}>Sources</h2>
      <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.7 }}>
        <p style={{ marginBottom: "6px" }}>This profile was compiled from publicly available information including:</p>
        <p style={{ marginBottom: "4px" }}>
          <a href="https://www.gevernova.com/investors" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>GE Vernova Investor Relations</a> — Earnings releases, SEC filings (10-K, 10-Q), and investor presentations.
        </p>
        <p style={{ marginBottom: "4px" }}>
          <a href="https://www.gevernova.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>GE Vernova corporate website</a> — Segment descriptions, leadership, and company overview.
        </p>
        <p style={{ marginBottom: "4px" }}>
          Q4 2024 and Q4 2025 earnings releases, 2024 Investor Update (December 2024), and 2025 Investor Update.
        </p>
        <p style={{ marginTop: "12px", fontSize: "11px", color: t.textDim, fontStyle: "italic" }}>
          This profile is for informational purposes only and does not constitute investment advice, a recommendation, or a solicitation to buy or sell any security.
        </p>
      </div>

      {/* Back link */}
      <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: `1px solid ${t.border}` }}>
        <Link href="/profiles" style={{ fontSize: "13px", color: t.accent, textDecoration: "none" }}>← Back to all profiles</Link>
      </div>
    </div>
  );
}