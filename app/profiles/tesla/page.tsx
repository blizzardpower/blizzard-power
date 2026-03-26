"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers";
import { SectorTag } from "@/components/ui";

export default function TeslaProfile() {
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
        <span style={{ margin: "0 8px" }}>/</span><span style={{ color: t.text }}>Tesla</span>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: t.text, letterSpacing: "-0.02em" }}>Tesla, Inc.</h1>
          <SectorTag sector="Transportation" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: t.textMuted }}>
          <span style={{ fontFamily: "'Space Mono', monospace", color: t.accent }}>NASDAQ: TSLA</span>
          <span>Austin, Texas</span>
          <a href="https://www.tesla.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>tesla.com ↗</a>
        </div>
        <div style={{ marginTop: "12px", fontSize: "11px", color: t.textDim }}>Data as of FY2024 (ended Dec 31, 2024) and FY2025 (ended Dec 31, 2025) public filings. Market data as of early March 2026.</div>
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
        {sB("FY2025 Revenue", "$94.8B", "-3% YoY")}
        {sB("Market Cap", "~$780B", "As of Mar 2026")}
        {sB("Employees", "~140,000", "Global")}
        {sB("FY2025 Net Income", "$3.8B", "Down 46% YoY")}
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {sB("FY2024 Revenue", "$97.7B", "+1% YoY")}
        {sB("FY2025 Gross Profit", "$17.1B", "18% margin")}
        {sB("Energy Segment Rev", "$10.1B", "FY2024, +67% YoY")}
        {sB("FY2025 Op. Income", "$4.8B", "5.1% margin")}
      </div>

      <h2 style={sH("Overview")}>Overview</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Tesla is an electric vehicle and clean energy company headquartered in Austin, Texas. It is the world's most valuable automaker by market capitalization and the leading seller of battery-electric vehicles globally. The company designs, manufactures, and sells electric vehicles, battery energy storage systems, solar panels, solar roof tiles, and related products and services.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Tesla is led by CEO Elon Musk. The company operates manufacturing facilities ("Gigafactories") in Fremont, California; Austin, Texas; Shanghai, China; Berlin, Germany; and Buffalo, New York. Tesla's vehicle lineup includes the Model S, Model 3, Model X, Model Y, Cybertruck, and the upcoming Cybercab autonomous vehicle. The Model Y has been the world's best-selling vehicle (all powertrains) in recent years.
      </p>

      <h2 style={sH("Business Segments")}>Business Segments</h2>
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Automotive</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>FY2025: ~$69.5B | FY2024: $77.1B</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          The Automotive segment includes design, manufacturing, sales, and leasing of electric vehicles, as well as regulatory credit sales and automotive services. This is Tesla's largest segment, representing approximately 79% of FY2024 revenue, though it declined 6.5% year-over-year as the company faced pricing pressure and increased competition. Tesla has been investing heavily in Full Self-Driving (FSD) software and autonomous vehicle technology, which management views as the primary long-term value driver.
        </p>
      </div>
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Energy Generation & Storage</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>FY2024: $10.1B | +67% YoY</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          Tesla's energy segment designs, manufactures, installs, and sells solar energy systems, battery energy storage products (Powerwall for residential, Megapack for utility-scale), and related services. This was the company's fastest-growing segment in FY2024, with revenue surging 67% to $10.1 billion. Megapack deployments have grown significantly as utilities and grid operators invest in battery storage to manage renewable intermittency and meet peak demand.
        </p>
      </div>
      <div style={{ padding: "20px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "6px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>Services & Other</div>
          <div style={{ fontSize: "12px", color: t.textMuted, fontFamily: "'Space Mono', monospace" }}>FY2024: $10.5B | +27% YoY</div>
        </div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.6 }}>
          Includes non-warranty vehicle servicing, used vehicle sales, Supercharger network revenue, retail merchandise, insurance, and other service-related revenue. This segment grew 27% year-over-year in FY2024 as Tesla's installed vehicle base expanded and the Supercharger network continued to grow and open to non-Tesla EVs.
        </p>
      </div>

      <h2 style={sH("Financial Performance")}>Financial Performance</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Tesla's FY2024 revenue was $97.7 billion, roughly flat year-over-year, with growth in energy and services offset by automotive revenue declines. Net income was $7.1 billion. FY2025 saw revenue decline 3% to $94.8 billion, with net income falling 46% to $3.8 billion, reflecting increased competition, pricing pressure in the automotive segment, and higher operating expenses related to AI and autonomy investments.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Gross profit margin compressed to approximately 18% in FY2025 from approximately 18.5% in FY2024 (down from the mid-20s in FY2022), a trend driven by aggressive vehicle price cuts and a less favorable product mix. Operating income was $4.8 billion in FY2025 at a 5.1% margin, compared to $7.8 billion (7.9% margin) in FY2024. Capital expenditures exceeded $2.4 billion in FY2024, with significant AI-related infrastructure spending.
      </p>

      <h2 style={sH("Strategy & Outlook")}>Strategy & Outlook</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Tesla's stated strategy is increasingly centered on AI and autonomy. Management has described Full Self-Driving, the planned Cybercab robotaxi, and the Optimus humanoid robot as the primary drivers of Tesla's future valuation. The company is investing heavily in AI training infrastructure, custom silicon, and software development.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        In energy, Tesla is scaling Megapack production to meet surging demand from utilities and grid operators, positioning the energy segment as a growth engine independent of vehicle sales. The Supercharger network, now the dominant DC fast-charging standard in North America (adopted as NACS by virtually all major automakers), represents a growing services revenue stream. Tesla Semi, aimed at the commercial trucking market, remains in early production.
      </p>

      <h2 style={sH("Key Considerations")}>Key Considerations</h2>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7, marginBottom: "12px" }}>
        Tesla's automotive margins have been under pressure from increased competition (particularly from Chinese EV makers), repeated price reductions, and an aging model lineup. The timing and economics of the Cybercab and FSD revenue remain uncertain, though management has expressed confidence in near-term deployment.
      </p>
      <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.7 }}>
        Tesla's valuation (approximately $780 billion market cap against $94.8 billion in revenue and $3.8 billion in net income) reflects substantial market expectations for the autonomous driving, robotaxi, and robotics businesses. CEO Elon Musk's involvement in government and political activities has generated both regulatory attention and consumer sentiment impacts in certain markets. Tesla is also exposed to tariff risks, trade policy changes, and evolving EV subsidy regimes across its major markets.
      </p>

      <h2 style={sH("Sources")}>Sources</h2>
      <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.7 }}>
        <p style={{ marginBottom: "6px" }}>This profile was compiled from publicly available information including:</p>
        <p style={{ marginBottom: "4px" }}><a href="https://ir.tesla.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>Tesla Investor Relations</a> — Quarterly earnings releases, SEC filings (10-K, 10-Q).</p>
        <p style={{ marginBottom: "4px" }}><a href="https://www.tesla.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>Tesla corporate website</a> — Product information, energy products.</p>
        <p style={{ marginBottom: "4px" }}>FY2024 and FY2025 annual reports and earnings call transcripts.</p>
        <p style={{ marginTop: "12px", fontSize: "11px", color: t.textDim, fontStyle: "italic" }}>This profile is for informational purposes only and does not constitute investment advice, a recommendation, or a solicitation to buy or sell any security.</p>
      </div>

      <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: `1px solid ${t.border}` }}>
        <Link href="/profiles" style={{ fontSize: "13px", color: t.accent, textDecoration: "none" }}>← Back to all profiles</Link>
      </div>
    </div>
  );
}