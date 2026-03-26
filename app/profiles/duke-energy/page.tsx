"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { SectorTag } from "@/components/ui";

export default function DukeEnergyProfile() {
  const { t } = useTheme();

  const sH = (text: string) => ({
    fontSize: "18px",
    fontWeight: 700 as const,
    color: t.text,
    marginBottom: "12px",
    marginTop: "40px",
    paddingBottom: "8px",
    borderBottom: `1px solid ${t.border}`,
  });

  const sB = (label: string, value: string, sub?: string) => (
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
        <span style={{ color: t.text }}>Duke Energy</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: t.text, letterSpacing: "-0.02em" }}>Duke Energy</h1>
          <SectorTag sector="Power" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: t.textMuted, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", color: t.accent }}>NYSE: DUK</span>
          <span>Charlotte, North Carolina</span>
          <a href="https://www.duke-energy.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>duke-energy.com ↗</a>
        </div>
        <div style={{ marginTop: "12px", fontSize: "11px", color: t.textDim }}>
          Data as of FY2024 (ended Dec 31, 2024) public filings and FY2025 preliminary results. Market data as of early March 2026.
        </div>
      </div>

      {/* Key Stats */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
        {sB("FY2024 Revenue", "$30.4B", "+6% YoY")}
        {sB("Generation Capacity", "55,100 MW", "Regulated fleet")}
        {sB("Customers Served", "8.6M", "Electric; 1.7M gas")}
        {sB("Employees", "~27,600", "6-state service area")}
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {sB("FY2024 Adj. EPS", "$5.90", "Guidance: $5.85–$6.10")}
        {sB("5-Year CapEx Plan", "$103B", "2025–2029")}
        {sB("Annual Dividend", "$4.26/sh", "19 consecutive increases")}
        {sB("Rate Base CAGR", "~9.6%", "2025–2029 target")}
      </div>

      {/* Overview */}
      <h2 style={sH("Overview")}>Overview</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Duke Energy is one of the largest regulated electric utilities in the United States, serving approximately 8.6 million electric customers and 1.7 million natural gas customers across six states in the Southeast and Midwest. The company operates roughly 55,100 megawatts of generating capacity and is headquartered in Charlotte, North Carolina. Duke Energy is a Fortune 150 company and one of the oldest and most capital-intensive utilities in the country, with roots stretching back to the founding of the Catawba Power Company in 1904.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        The company completed its transformation into a pure-play regulated utility with the 2023 sale of its commercial renewables portfolio to Brookfield Renewable Partners for approximately $2.8 billion. That exit sharpened Duke's focus on its core regulated franchises, which now account for roughly 85% or more of earnings. Regulated utilities offer predictable, commission-approved returns on capital — a model Duke is leaning into aggressively, with its 2025–2029 capital plan of $103 billion representing the largest announced investment program of any U.S. utility.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Harry Sideris assumed the role of President and CEO on April 1, 2025, succeeding Lynn Good, who led the company for approximately 12 years. Sideris is a 29-year Duke Energy veteran who previously served as President of Duke Energy Florida and EVP of Customer Experience. The transition was internally managed and orderly, with no material change in strategy.
      </p>

      {/* Business Segments */}
      <h2 style={sH("Business Segments")}>Business Segments</h2>

      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Electric Utilities & Infrastructure</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>~91% of revenue</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          The core of Duke's business, encompassing its regulated electric utilities in the Carolinas, Florida, Indiana, Ohio, and Kentucky. Duke Energy Carolinas serves approximately 2.9 million customers and operates 20,800 MW of capacity; Duke Energy Progress serves 1.8 million customers across the Carolinas with 13,800 MW; Duke Energy Florida serves 2 million customers with 12,300 MW of gas-heavy generation. Each subsidiary files rates independently with its respective state utility commission, earning a regulated return on its rate base. Nuclear generation in the Carolinas produces approximately 58% of the electricity consumed by Duke Energy Carolinas and Duke Energy Progress customers.
        </p>
        <div style={{ marginTop: "8px", fontSize: "12px", color: t.textDim }}>Key subsidiaries: Duke Energy Carolinas, Duke Energy Progress, Duke Energy Florida, Duke Energy Indiana, Duke Energy Ohio, Duke Energy Kentucky</div>
      </div>

      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Gas Utilities & Infrastructure</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>~7% of revenue</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          Piedmont Natural Gas serves approximately 1.7 million natural gas customers in North Carolina, South Carolina, Tennessee, Ohio, and Kentucky. Duke acquired Piedmont in 2016 for approximately $4.9 billion. The segment provides natural gas distribution services and participates in the transportation infrastructure connecting regional pipelines to end-use customers. This business provides a modest but steady regulated earnings stream and strategic optionality as natural gas remains a transitional fuel in Duke's generation portfolio.
        </p>
      </div>

      {/* Financial Performance */}
      <h2 style={sH("Financial Performance")}>Financial Performance</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Duke Energy reported FY2024 revenue of $30.4 billion, up 6% from the prior year, with GAAP net income of $4.4 billion and reported EPS of $5.71. Adjusted EPS came in at $5.90, near the top of the company's guidance range of $5.85–$6.10. Operating cash flow was $6.3 billion for the year. The results reflected continued growth in residential and commercial electric demand, rate increases across several service territories, and a favorable comparison against weather-impacted periods.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Duke Energy has paid dividends without interruption for 99 consecutive years and has increased its annual dividend for 19 consecutive years. The current quarterly dividend of $1.065 per share equates to an annualized rate of $4.26 per share, providing a yield of approximately 3.3–3.5% at current prices. Management's 2026 adjusted EPS guidance of $6.55–$6.80 per share implies approximately 10% year-over-year growth at the midpoint, supported by rate base expansion and continued load growth.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        The company's $103 billion capital plan for 2025–2029 — the largest of any U.S. regulated utility — is expected to grow the rate base at a roughly 9.6% compound annual rate, directly underpinning the long-term EPS growth target of 5–7% annually through 2030. Approximately 40% of the capital plan will require equity financing, with roughly $6.5 billion in equity issuances planned over the five-year period.
      </p>

      {/* Strategy & Outlook */}
      <h2 style={sH("Strategy & Outlook")}>Strategy & Outlook</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Duke Energy's strategy is built on three interconnected trends: the retirement of coal generation, the buildout of cleaner replacement capacity, and surging load growth from data centers and electrification. The company has retired 56 coal units totaling 7.5 GW since 2010 and targets coal to represent less than 5% of generation by 2030. Coal exit is planned for 2035, though a 2025 regulatory proceeding in North Carolina introduced uncertainty around the timing of certain retirements, with some units now potentially operating into the late 2030s.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        To replace retiring coal, Duke is investing in a combination of natural gas (approximately 20 GW of new gas capacity planned), solar (6,700 MW by 2031), and battery storage (4.5 GW through 2029, expanding to 10,000 MW by 2035). The company has also signed 4.5 GW of new data center service agreements — a reflection of the enormous load growth materializing across its Carolinas and Indiana service territories as hyperscale operators expand into the Southeast. Load growth from data centers and industrial customers is expected to add meaningfully to the rate base investment justification through the end of the decade.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Duke has set a target of 50% carbon reduction from electricity generation by 2030, 80% by 2040, and net-zero by 2050. The company is also pursuing net-zero methane emissions from its natural gas distribution operations by 2030. Management has outlined a total shareholder return target of approximately 10% — the combination of 5–7% annual EPS growth and the current dividend yield.
      </p>

      {/* Key Considerations */}
      <h2 style={sH("Key Considerations")}>Key Considerations</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Duke Energy's earnings depend heavily on the outcomes of rate cases filed with state public utility commissions. Regulators in the Carolinas and Florida set the allowed returns on Duke's invested capital, and adverse rate decisions — or disallowances of specific capital expenditures — could dampen earnings growth. The company's coal retirement plan is also subject to state regulatory approval, and pushback in North Carolina has introduced schedule risk.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        The $103 billion capital plan is ambitious and capital-intensive. Financing it will require sustained access to debt and equity markets at reasonable rates. Rising interest rates increase the cost of the company's substantial long-term debt load, and if regulators do not allow timely cost recovery, there is a risk that returns on new investments fall short of targets.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        On the upside, Duke's six-state service territory is among the most attractive in the country for load growth. The Southeast continues to attract manufacturing reshoring, semiconductor fabs, and data center investment at a pace that — if sustained — should provide a multi-year tailwind for capital deployment and rate base growth well beyond the current plan period.
      </p>

      {/* Sources */}
      <h2 style={sH("Sources")}>Sources</h2>
      <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.7 }}>
        <p style={{ marginBottom: "6px" }}>This profile was compiled from publicly available information including:</p>
        <p style={{ marginBottom: "4px" }}>
          <a href="https://investors.duke-energy.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>Duke Energy Investor Relations</a> — Earnings releases, SEC filings (10-K, 10-Q), and investor presentations.
        </p>
        <p style={{ marginBottom: "4px" }}>
          <a href="https://www.duke-energy.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>Duke Energy corporate website</a> — Service territory, generation fleet, and sustainability reporting.
        </p>
        <p style={{ marginBottom: "4px" }}>
          Q4 2024 earnings release, FY2024 Form 10-K, and 2025–2029 capital plan investor materials.
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
