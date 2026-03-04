"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { SectorTag } from "@/components/ui";

export default function RivianProfile() {
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
    <div style={{ padding: "100px 40px 60px", maxWidth: "860px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "24px", fontSize: "13px", color: t.textMuted }}>
        <Link href="/profiles" style={{ color: t.accent, textDecoration: "none" }}>Profiles</Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: t.text }}>Rivian Automotive</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: t.text, letterSpacing: "-0.02em" }}>Rivian Automotive</h1>
          <SectorTag sector="Transportation" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: t.textMuted }}>
          <span style={{ fontFamily: "'Space Mono', monospace", color: t.accent }}>NASDAQ: RIVN</span>
          <span>Irvine, California</span>
          <a href="https://www.rivian.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>rivian.com ↗</a>
        </div>
        <div style={{ marginTop: "12px", fontSize: "11px", color: t.textDim }}>
          Data as of FY2024 (ended Dec 31, 2024) and FY2025 (ended Dec 31, 2025) public filings. Market data as of early March 2026.
        </div>
      </div>

      {/* Key Stats Row */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
        {statBox("FY2025 Revenue", "$5.4B", "+8% YoY")}
        {statBox("Market Cap", "~$19B", "As of Mar 2026")}
        {statBox("Employees", "~15,200", "Primarily U.S.")}
        {statBox("FY2025 Net Loss", "$(3.6)B", "Narrowing from $(4.7)B")}
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {statBox("FY2024 Deliveries", "51,579", "Produced 49,476")}
        {statBox("Cash & ST Investments", "~$7.2B", "End of FY2025")}
        {statBox("2025 Adj. EBITDA Loss", "$(1.7–1.9)B", "Down from $(2.7)B")}
        {statBox("2026E Deliveries", "~66,000", "Analyst consensus")}
      </div>

      {/* Overview */}
      <h2 style={sectionHeader("Overview")}>Overview</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Rivian Automotive is an electric vehicle manufacturer headquartered in Irvine, California. The company designs, manufactures, and sells battery-electric vehicles across two product lines: consumer adventure vehicles (the R1T pickup truck and R1S SUV) and commercial delivery vans (the Electric Delivery Van, or EDV, and the Rivian Commercial Van, or RCV). Rivian went public in November 2021 in one of the largest IPOs in U.S. history.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        The company is led by founder and CEO RJ Scaringe and CFO Claire McDonough. Rivian operates a 1.2 million square-foot manufacturing facility in Normal, Illinois, and is developing a second plant in Georgia supported by a $6.6 billion loan from the U.S. Department of Energy's Loan Programs Office. The company has announced its mass-market R2 midsize SUV, priced at approximately $45,000, with deliveries expected to begin in the first half of 2026.
      </p>

      {/* Business Segments */}
      <h2 style={sectionHeader("Business Segments")}>Business Segments</h2>

      {/* Automotive */}
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Automotive</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>Primary revenue driver</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          The Automotive segment encompasses all vehicle sales, including the R1T pickup and R1S SUV for consumers, and the EDV/RCV commercial vans. The R1 platform vehicles are positioned as premium adventure-oriented EVs, with starting prices above $73,000. Rivian produced 49,476 vehicles and delivered 51,579 in FY2024 from its Normal, Illinois facility. In FY2025, deliveries declined to 42,247 units, which the company attributed to the expiration of federal EV tax credits, softening consumer demand, and economic uncertainty. Amazon remains a key commercial customer, having ordered 100,000 EDVs, with over 20,000 on the road delivering more than 1 billion packages in the U.S. during 2024. Rivian recently opened RCV sales to fleets beyond Amazon.
        </p>
      </div>

      {/* Software & Services */}
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Software & Services</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>Growing segment</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          Rivian operates a Software and Services segment that includes vehicle electrical architecture and software development, autonomy features (Autonomy+), remarketing, vehicle repair and maintenance, charging, software subscriptions, financing, insurance, and accessories. This segment generated $214 million in revenue in Q4 2024 alone and was a notable contributor to the company's FY2025 revenue growth of 8%. CEO Scaringe has described autonomy technology as a key long-term differentiator for the company.
        </p>
      </div>

      {/* Products */}
      <h2 style={sectionHeader("Product Lineup")}>Product Lineup</h2>

      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.7, marginBottom: "10px" }}>
          <span style={{ fontWeight: 600, color: t.text }}>R1T</span> — Two-row, five-passenger electric pickup truck. The first Rivian consumer vehicle, launched in 2021. Positioned in the adventure/premium segment.
        </p>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.7, marginBottom: "10px" }}>
          <span style={{ fontWeight: 600, color: t.text }}>R1S</span> — Three-row, seven-passenger electric SUV sharing the R1 platform. Launched in 2022. Competes in the full-size luxury SUV segment.
        </p>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.7, marginBottom: "10px" }}>
          <span style={{ fontWeight: 600, color: t.text }}>R2</span> — Upcoming midsize SUV targeting a starting price of approximately $45,000, less than half the price of R1 vehicles. The R2 is expected to begin deliveries in H1 2026 from the Normal, Illinois plant. Special editions are expected to be priced between $52,000 and $60,000. The R2 bill of materials is approximately 95% sourced and is expected to be roughly half that of the improved R1 bill of materials. Full product reveal scheduled for March 12, 2026.
        </p>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.7 }}>
          <span style={{ fontWeight: 600, color: t.text }}>EDV / RCV</span> — Electric commercial step-in vans available in 500 and 700 cubic-foot configurations. Designed for last-mile delivery and fleet operations. Amazon is the anchor customer with a 100,000-unit order.
        </p>
      </div>

      {/* Financial Performance */}
      <h2 style={sectionHeader("Financial Performance")}>Financial Performance</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Rivian reported FY2024 revenue of $4.97 billion, up 12% from $4.43 billion in FY2023. The company posted a net loss of $4.75 billion ($4.69 per share). FY2025 revenue grew 8% to $5.39 billion, with the net loss narrowing to $3.65 billion. The company achieved its first quarterly gross profit in Q4 2024 ($170 million), assisted by $299 million in regulatory credit sales and $214 million in software and services revenue.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        On a cost basis, Rivian removed $31,000 in automotive cost of goods sold per vehicle delivered in Q4 2024 relative to Q4 2023 — a significant step toward unit economics. The company expects a "modest gross profit" in 2025 and has guided to an adjusted EBITDA loss of $1.7–1.9 billion for FY2025, narrowing from a loss of $2.69 billion in FY2024. Capital expenditures are expected at $1.6–1.7 billion in 2025 as the company retooled its Illinois plant for R2 production.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Revenue from regulatory credit sales ($325 million in FY2024 from model years 2022–2023) has been a meaningful contributor. However, future credit revenue is subject to regulatory changes, particularly given evolving federal policy on EV tax credits and emissions standards.
      </p>

      {/* Strategy & Outlook */}
      <h2 style={sectionHeader("Strategy & Outlook")}>Strategy & Outlook</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        The R2 launch is the centerpiece of Rivian's near-term strategy. By moving from premium-only vehicles into the mass-market midsize segment at roughly half the price point, Rivian aims to materially expand its addressable market. The Normal, Illinois plant was idled during H2 2025 for retooling, and analysts estimate FY2026 deliveries of approximately 66,000 units — a significant step-up that depends on a successful R2 ramp.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        The Volkswagen Group joint venture, with a total deal size of up to $5.8 billion, is a strategic pillar. The joint venture (Rivian and VW Group Technology, LLC) will develop next-generation electrical architecture and software technology for both companies' future EVs, starting with the R2. VW delivered $1 billion in funds in June 2025, with an additional $3.5 billion expected over the next several years subject to milestones.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Rivian has guided to FY2025 revenue of $4.7–4.9 billion (a decline at the midpoint from FY2024, reflecting the plant retooling). The company is targeting positive adjusted EBITDA by 2027. The planned Georgia manufacturing facility, supported by the $6.6 billion DOE loan, aims to create approximately 7,500 jobs and expand production capacity for the R2 and future platforms.
      </p>

      {/* Key Risks */}
      <h2 style={sectionHeader("Key Considerations")}>Key Considerations</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Rivian remains pre-profit with cumulative losses exceeding $18 billion since inception. While the cash position of approximately $7.2 billion (including VW JV proceeds) provides a multi-year runway, the company may require additional financing depending on the pace of R2 ramp and Georgia plant construction.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        The EV market faces headwinds from the expiration of federal tax credits, increasing competition from established automakers and Tesla, and shifting consumer sentiment. Rivian's FY2025 deliveries declined 18% year-over-year, underscoring the demand sensitivity. The R2 launch execution is critical — D.A. Davidson has noted that the company's 2026 guidance requires an unusually strong debut.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Regulatory credit revenue has been material to Rivian's financials and could be affected by changes to emissions regulations under the current administration. Additionally, tariff-related cost pressures and supply chain risks remain relevant for a manufacturer scaling production.
      </p>

      {/* Sources */}
      <h2 style={sectionHeader("Sources")}>Sources</h2>
      <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.7 }}>
        <p style={{ marginBottom: "6px" }}>This profile was compiled from publicly available information including:</p>
        <p style={{ marginBottom: "4px" }}>
          <a href="https://rivian.com/newsroom" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>Rivian Newsroom</a> — Earnings releases and company announcements.
        </p>
        <p style={{ marginBottom: "4px" }}>
          <a href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001874178" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>SEC EDGAR — Rivian Automotive filings</a> — Annual (10-K) and quarterly (10-Q) reports.
        </p>
        <p style={{ marginBottom: "4px" }}>
          <a href="https://www.rivian.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>Rivian corporate website</a> — Product information, investor relations.
        </p>
        <p style={{ marginBottom: "4px" }}>
          Q4 2024 and Q4 2025 earnings releases, Q4 2024 earnings call transcript.
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