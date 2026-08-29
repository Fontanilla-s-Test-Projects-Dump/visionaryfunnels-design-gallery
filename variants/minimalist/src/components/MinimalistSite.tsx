import Link from "next/link";
import BookingForm from "./BookingForm";

type NavItem = { label: string; href: string };
type WorkbenchVariant = "home" | "airtable" | "construction";

const homeNav: NavItem[] = [
  { label: "The snag", href: "#problem" },
  { label: "The system", href: "#system" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Airtable", href: "/airtable" },
  { label: "Construction", href: "/construction" },
];

const airtableNav: NavItem[] = [
  { label: "What we build", href: "#services" },
  { label: "Why it works", href: "#benefits" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#testimonials" },
  { label: "Construction", href: "/construction" },
];

const constructionNav: NavItem[] = [
  { label: "How it works", href: "#bridge" },
  { label: "What it tracks", href: "#tracks" },
  { label: "The rules", href: "#rules" },
  { label: "FAQ", href: "#faq" },
  { label: "Airtable", href: "/airtable" },
];

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="VisionaryFunnels home">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <span>
        Visionary<span className="brand-accent">Funnels</span>
      </span>
    </Link>
  );
}

function Header({ links, current }: { links: NavItem[]; current: string }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={item.label.toLowerCase() === current ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
          <a className="brass-button header-cta" href="#book">
            Book a call
          </a>
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <div className="mobile-nav-panel">
            {links.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <a className="brass-button" href="#book">
              Book a call
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}

function PageFrame({
  links,
  current,
  children,
}: {
  links: NavItem[];
  current: string;
  children: React.ReactNode;
}) {
  return (
    <div className="site-shell">
      <Header links={links} current={current} />
      {children}
    </div>
  );
}

function SectionLead({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-lead ${align === "center" ? "center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <div className="lead-copy">{children}</div> : null}
    </div>
  );
}

function Hero({
  eyebrow,
  title,
  children,
  primary,
  secondary,
  visual,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
  primary: string;
  secondary: { label: string; href: string };
  visual: React.ReactNode;
}) {
  return (
    <section className="hero section-wrap">
      <div className="hero-copy">
        <p className="eyebrow eyebrow-stamped">
          <span className="status-light" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        <p className="hero-deck">{children}</p>
        <div className="hero-actions">
          <a className="brass-button" href="#book">
            {primary}
          </a>
          <a className="paper-button" href={secondary.href}>
            {secondary.label}
          </a>
        </div>
        <p className="hero-footnote">
          <span>FIELD NOTE</span> Built around the way your team already works.
        </p>
      </div>
      <div className="hero-visual">{visual}</div>
    </section>
  );
}

function Workbench({ variant }: { variant: WorkbenchVariant }) {
  const copy = {
    home: {
      label: "CONTROL DESK",
      title: "One source of truth",
      sub: "CRM · PROJECTS · INVOICING",
      drawers: ["CONTEXT", "AUTOMATIONS", "VISIBILITY"],
    },
    airtable: {
      label: "AIRTABLE WORKBENCH",
      title: "The right record",
      sub: "TABLES · VIEWS · HANDOFFS",
      drawers: ["BASE DESIGN", "WORKFLOWS", "REPORTING"],
    },
    construction: {
      label: "SITE LOG / ACTIVE",
      title: "Nothing lost in chat",
      sub: "ISSUES · MATERIALS · RFIs",
      drawers: ["FIELD NOTES", "APPROVALS", "FOLLOW-UPS"],
    },
  }[variant];

  return (
    <div className={`workbench workbench-${variant}`} role="img" aria-label={`${copy.label} illustration`}>
      <div className="bench-ruler" aria-hidden="true">
        <span>01</span><i /><span>05</span><i /><span>10</span><i /><span>15</span><i /><span>20</span>
      </div>
      <div className="bench-face">
        <div className="bench-screws" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="bench-headerline">
          <span className="utility-label">VF / {copy.label}</span>
          <span className="live-chip"><span className="status-light" /> LIVE</span>
        </div>
        <div className="bench-display">
          <div className="display-toolbar">
            <span className="display-tab active-tab">OPERATIONS</span>
            <span className="display-tab">TODAY</span>
            <span className="display-tab">ARCHIVE</span>
          </div>
          <div className="display-content">
            <div className="gauge" aria-hidden="true">
              <span className="gauge-tick tick-1" />
              <span className="gauge-tick tick-2" />
              <span className="gauge-tick tick-3" />
              <span className="gauge-needle" />
              <strong>84</strong>
              <small>HEALTH</small>
            </div>
            <div className="display-records">
              <div className="record-row"><span className="record-dot brass-dot" />Open handoffs<strong>12</strong></div>
              <div className="record-row"><span className="record-dot green-dot" />Needs review<strong>04</strong></div>
              <div className="record-row"><span className="record-dot red-dot" />Waiting on someone<strong>03</strong></div>
            </div>
          </div>
        </div>
        <div className="bench-drawers">
          {copy.drawers.map((drawer, index) => (
            <div className="bench-drawer" key={drawer}>
              <span className="drawer-number">0{index + 1}</span>
              <span>{drawer}</span>
              <b aria-hidden="true">↗</b>
            </div>
          ))}
        </div>
      </div>
      <p className="bench-caption">{copy.title} <span>{"/// "}{copy.sub}</span></p>
    </div>
  );
}

function MarkStrip({ items }: { items: string[] }) {
  return (
    <div className="mark-strip" aria-label="Service areas">
      {items.map((item) => <span key={item}>{item}</span>)}
    </div>
  );
}

const homePainPoints = [
  ["01", "Disconnected tools", "Your CRM doesn't talk to your project tracker. Every handoff is manual."],
  ["02", "Manual data entry", "Your team copies data between spreadsheets, emails, and tools for hours every week."],
  ["03", "No visibility", "Basic questions about your business require three people and four spreadsheets."],
  ["04", "Founder bottleneck", "Every decision that needs context routes through you. It doesn't scale."],
];

function HomePage() {
  return (
    <PageFrame links={homeNav} current="home">
      <main>
        <Hero
          eyebrow="A clearer operating system"
          title={<>Make your business <em>legible.</em></>}
          primary="Book a discovery call"
          secondary={{ label: "See the system ↓", href: "#system" }}
          visual={<Workbench variant="home" />}
        >
          Your business already has the parts. We build the connected layer that
          lets your team see what matters, act on it, and stop carrying the whole
          operation in their heads.
        </Hero>

        <MarkStrip items={["CONSTRUCTION", "MANUFACTURING", "E-COMMERCE", "PROFESSIONAL SERVICES", "CONNECTED SYSTEMS"]} />

        <section id="problem" className="section wash-section">
          <div className="section-wrap">
            <SectionLead eyebrow="The snag" title={<>Growth exposes every loose <em>thread.</em></>}>
              If 500 new clients showed up tomorrow, what would break first? For most
              growing businesses, the answer is everything between the tools.
            </SectionLead>
            <div className="card-grid four-up">
              {homePainPoints.map(([number, title, text]) => (
                <article className="paper note-card" key={title}>
                  <span className="card-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="card-rule" aria-hidden="true" />
                </article>
              ))}
            </div>
            <div className="stat-ticket">
              <div><span className="ticket-label">TIME LEAK / WEEK</span><strong>20+ hrs</strong></div>
              <p>spent on work a connected system could do in minutes.</p>
            </div>
          </div>
        </section>

        <section id="system" className="section section-wrap system-section">
          <div className="system-copy">
            <SectionLead eyebrow="The system" title={<>One desk. Every <em>handoff.</em></>}>
              Not another tool. Not another dashboard nobody checks. A connected
              infrastructure layer that makes the way your company operates visible.
            </SectionLead>
            <div className="feature-list">
              <Feature number="A" title="Context loaded">We learn your tools, team, and bottlenecks before we automate a thing.</Feature>
              <Feature number="B" title="Tools connected">Your CRM, project management, invoicing, and communication tools are wired together.</Feature>
              <Feature number="C" title="Systems built monthly">Your operating system grows as your business grows—more leverage, not more overhead.</Feature>
            </div>
          </div>
          <div className="ledger paper">
            <div className="ledger-top"><span>CONNECTED SYSTEM / VF-001</span><span>REV. 06</span></div>
            <div className="ledger-flow">
              <div className="ledger-node"><b>INPUTS</b><span>CRM</span><span>PROJECTS</span><span>EMAIL</span><span>CHAT</span></div>
              <div className="ledger-arrow">↓</div>
              <div className="ledger-core"><span className="status-light" /> AI OPERATING SYSTEM<small>one source of truth</small></div>
              <div className="ledger-arrow">↓</div>
              <div className="ledger-node outputs"><b>OUTPUTS</b><span>DASHBOARDS</span><span>AUTOMATIONS</span><span>REPORTS</span><span>ALERTS</span></div>
            </div>
            <div className="ledger-stamp">BUILT FOR YOUR BUSINESS</div>
          </div>
        </section>

        <ProcessSection />
        <ServicesSection />
        <ProofSection />
        <OfferSection />
        <Booking source="home" />
      </main>
      <Footer />
    </PageFrame>
  );
}

function Feature({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="feature-row">
      <span className="feature-tab">{number}</span>
      <div><h3>{title}</h3><p>{children}</p></div>
    </div>
  );
}

function ProcessSection() {
  const steps = [
    ["01", "Discovery & map", "Audit your tools, workflows, and bottlenecks. You get a clear blueprint with priorities and quick wins.", "1–2 week deep dive"],
    ["02", "Build & automate", "Connect your tools and build the first automations. You see results in weeks, not months.", "2–3 week sprint"],
    ["03", "Optimize & grow", "Each month, add new systems. Your operating system compounds as your business grows.", "Ongoing retainer"],
  ];

  return (
    <section id="process" className="section wood-section">
      <div className="section-wrap">
        <SectionLead eyebrow="How it works" title={<>Three phases. Zero <em>guesswork.</em></>}>
          Every engagement follows the same practical path—from loose threads to a
          business your team can read at a glance.
        </SectionLead>
        <div className="process-grid">
          {steps.map(([number, title, text, detail]) => (
            <article className="process-card" key={number}>
              <span className="process-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="process-detail">{detail}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    ["01", "Custom database systems", "Your business logic, centralized. One source of truth that replaces spreadsheets, email threads, and disconnected tools."],
    ["02", "AI agents & workflows", "AI that reads, reasons, and acts on your data—operational assistants, not another chatbot."],
    ["03", "Automation engine", "Workflows that connect tools, trigger actions, and eliminate manual handoffs."],
    ["04", "Dashboards & portals", "Real-time visibility without status meetings. Your team sees what they need. You see everything."],
  ];

  return (
    <section id="services" className="section section-wrap">
      <SectionLead eyebrow="What we build" title={<>The infrastructure behind <em>your operations.</em></>}>
        Every system is designed to connect, automate, and give you visibility—not
        add another tool to your stack.
      </SectionLead>
      <div className="card-grid two-up">
        {services.map(([number, title, text]) => (
          <article className="paper service-card" key={title}>
            <span className="service-tab">{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="service-arrow" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section id="testimonials" className="section wash-section">
      <div className="section-wrap">
        <SectionLead eyebrow="Keep the useful parts" title={<>Systems that earn their <em>keep.</em></>} align="center">
          Proof should be specific. These are anonymized examples and pilot figures—not
          a wall of invented stars.
        </SectionLead>
        <div className="proof-grid">
          <article className="paper case-file">
            <span className="file-label">CASE FILE / DIGITAL ASSETS</span>
            <h3>An AI layer that catches what their CRM missed</h3>
            <p>We run an AI layer over their CRM that analyzes every record and surfaces unlogged transactions and data-entry errors.</p>
            <div className="case-metric"><strong>6 → 1</strong><span>operational views reconciled into one review queue</span></div>
            <small>Client anonymized. Directional result from a live engagement.</small>
          </article>
          <div className="quote-stack">
            <blockquote className="paper quote-card">“Everything is connected now—our team actually knows what&apos;s happening without asking me.”<cite>— Construction company owner</cite></blockquote>
            <blockquote className="paper quote-card rotated">“We went from six spreadsheets to one system. Onboarding went from two weeks to three days.”<cite>— E-commerce operations manager</cite></blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

function OfferSection() {
  return (
    <section id="offer" className="section section-wrap offer-section">
      <div className="offer-ticket paper">
        <div>
          <p className="eyebrow">Start with the first drawer</p>
          <h2>Find the one process worth fixing first.</h2>
        </div>
        <p>No pitch and no slides. We look at where your time is actually going, name the first system to build, and tell you if there isn&apos;t one worth paying for.</p>
        <a className="brass-button" href="#book">Book the working session →</a>
      </div>
    </section>
  );
}

function Booking({ source, heading = "Start with a 20-minute call." }: { source: string; heading?: string }) {
  return (
    <section id="book" className="section booking-section">
      <div className="section-wrap booking-layout">
        <div className="booking-copy">
          <p className="eyebrow">Next step</p>
          <h2>{heading}</h2>
          <p>No pitch and no slides. We look at where your time is actually going and name the one process worth fixing first.</p>
          <div className="booking-checks"><span>✓ Practical diagnosis</span><span>✓ Clear next step</span><span>✓ No obligation</span></div>
        </div>
        <BookingForm source={source} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-grid">
        <div><Brand /><p>The operating console behind a business that runs without everything routing through one person.</p></div>
        <div><span className="footer-label">Explore</span><Link href="/">AI operating systems</Link><Link href="/airtable">Airtable systems</Link><Link href="/construction">Construction tracking</Link></div>
        <div><span className="footer-label">Start here</span><a href="#book">Book a discovery call</a><a href="mailto:support@visionaryfunnels.com">support@visionaryfunnels.com</a></div>
      </div>
      <div className="section-wrap footer-bottom"><span>© 2026 VisionaryFunnels</span><span>Designed as a working interface, not a software poster.</span></div>
    </footer>
  );
}

function AirtablePage() {
  const services = [
    ["01", "Custom Airtable bases", "Databases shaped around your actual workflow, not a generic template.", "A record your team can trust"],
    ["02", "AI-powered workflows", "Intake, triage, summarize, route, and follow up without copy-paste work.", "Less admin between decisions"],
    ["03", "Dashboards & portals", "The right view for the right person—owner, operator, client, or field team.", "Visibility without another meeting"],
    ["04", "Connected handoffs", "Keep the tools people already use and make the transitions between them automatic.", "Fewer dropped threads"],
  ];

  return (
    <PageFrame links={airtableNav} current="airtable">
      <main>
        <Hero
          eyebrow="Airtable systems / workflow automation"
          title={<>Build a better <em>operations desk.</em></>}
          primary="Book a free workflow audit"
          secondary={{ label: "See what we build ↓", href: "#services" }}
          visual={<Workbench variant="airtable" />}
        >
          Custom Airtable systems, dashboards, and AI workflows that replace
          spreadsheets and manual handoffs—so your operations run without you
          chasing them.
        </Hero>
        <MarkStrip items={["BASE DESIGN", "AUTOMATIONS", "AI WORKFLOWS", "CLIENT PORTALS", "REPORTING"]} />

        <section id="services" className="section section-wrap">
          <SectionLead eyebrow="What we build" title={<>Airtable that feels like <em>your business.</em></>}>
            The strongest system is the one that matches how work moves through your
            company. We make the records, views, and triggers fit that reality.
          </SectionLead>
          <div className="card-grid two-up">
            {services.map(([number, title, text, detail]) => (
              <article className="paper service-card long-card" key={title}>
                <span className="service-tab">{number}</span>
                <h3>{title}</h3><p>{text}</p><span className="service-detail">{detail}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="benefits" className="section wash-section">
          <div className="section-wrap">
            <SectionLead eyebrow="Why it works" title={<>A system people can actually <em>pick up.</em></>}>
              Good infrastructure is not impressive because it is complicated. It is
              useful because the next action is obvious.
            </SectionLead>
            <div className="benefit-grid">
              <Benefit title="One place to look">Your team stops wondering which spreadsheet, inbox, or board is current.</Benefit>
              <Benefit title="Small actions, chained">The boring steps happen in the background so people can focus on decisions.</Benefit>
              <Benefit title="Built to be corrected">The system makes its work visible, reviewable, and easy to adjust.</Benefit>
              <Benefit title="Less software rent">You keep the tools that fit and add only the layer that removes the friction.</Benefit>
            </div>
          </div>
        </section>

        <section id="process" className="section wood-section">
          <div className="section-wrap">
            <SectionLead eyebrow="The build" title={<>From messy base to <em>working system.</em></>} />
            <div className="process-grid">
              <article className="process-card"><span className="process-number">01</span><h3>Map the work</h3><p>We document the real flow: who touches what, when, and why.</p><span className="process-detail">Find the friction</span></article>
              <article className="process-card"><span className="process-number">02</span><h3>Shape the base</h3><p>We build the records, permissions, views, and first connected workflow.</p><span className="process-detail">Make it legible</span></article>
              <article className="process-card"><span className="process-number">03</span><h3>Run the loop</h3><p>Your team uses it on real work while we tune the edges and add leverage.</p><span className="process-detail">Keep it useful</span></article>
            </div>
          </div>
        </section>

        <section id="testimonials" className="section section-wrap">
          <SectionLead eyebrow="Field notes" title={<>The result is less <em>chasing.</em></>} align="center">
            Real outcomes, shared with their limits intact.
          </SectionLead>
          <div className="quote-grid">
            <blockquote className="paper quote-card">“We went from 6 spreadsheets to one system. Our team onboarding went from 2 weeks to 3 days.”<cite>— E-commerce operations manager</cite></blockquote>
            <blockquote className="paper quote-card rotated">“The follow-up automation alone paid for the engagement. We recovered leads we didn&apos;t know we were losing.”<cite>— Services company founder</cite></blockquote>
          </div>
        </section>
        <OfferSection />
        <Booking source="airtable" heading="Let&apos;s find the first workflow to unstick." />
      </main>
      <Footer />
    </PageFrame>
  );
}

function Benefit({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="benefit-row"><span className="check-mark">✓</span><div><h3>{title}</h3><p>{children}</p></div></article>;
}

const constructionTracks = [
  ["01", "Site issues", "Raised the moment someone mentions it—with the remedy, owner, and confirmation it was fixed."],
  ["02", "Material requests", "What was asked for, by whom, for which project. Nothing waits because it was said out loud."],
  ["03", "Purchase orders", "Request through approval to issued PO, tracked as one chain."],
  ["04", "Deliveries", "Quantity, quality, who received it, and when—with the photo attached to the record."],
  ["05", "Variations", "Caught the day they are discussed on site, not the month the billing fails to reconcile."],
  ["06", "RFIs and RFAs", "Every submission timestamped and every day of client silence counted."],
];

const constructionFaqs = [
  ["My crew won&apos;t use new software.", "They won&apos;t have to. Nobody below your project-in-charge installs anything or learns anything—they keep using the same chat groups on the same phones."],
  ["They speak Bisaya and Tagalog, mixed with English.", "That&apos;s the normal case, not the edge case. The system keeps the crew&apos;s exact words alongside an English summary."],
  ["Signal on our sites is unreliable.", "Messages sync whenever the phone finds a connection, exactly the way your group chat already behaves."],
  ["Does this replace our accounting system?", "No. It stops at the operational record and hands off to whoever keeps your books."],
  ["What happens when the AI gets something wrong?", "Your manager sees it before it becomes a record and fixes it in plain language. Nothing unreviewed propagates."],
];

function ConstructionPage() {
  return (
    <PageFrame links={constructionNav} current="construction">
      <main>
        <Hero
          eyebrow="Construction site operating system"
          title={<>The group chat stays. The loose ends <em>don&apos;t.</em></>}
          primary="Book a 20-minute walkthrough"
          secondary={{ label: "See the bridge ↓", href: "#bridge" }}
          visual={<Workbench variant="construction" />}
        >
          An AI bridge that turns ordinary site conversation into a tracked record—issues,
          materials, deliveries, RFIs—without asking the field to learn another app.
        </Hero>
        <MarkStrip items={["FIELD CHAT", "SITE ISSUES", "MATERIALS", "DELIVERIES", "RFIs"]} />

        <section id="bridge" className="section section-wrap bridge-section">
          <div className="bridge-copy">
            <SectionLead eyebrow="How it works" title={<>The bridge between the office and the <em>site.</em></>}>
              Every system before this one asked the field to change. We built a bridge
              to the tools they already use instead.
            </SectionLead>
            <div className="feature-list">
              <Feature number="A" title="Reads the conversation">The system catches the issue, material, delivery, or RFI in the words people already use.</Feature>
              <Feature number="B" title="Proposes a record">It extracts the useful detail and shows a draft to the project-in-charge.</Feature>
              <Feature number="C" title="A human approves">The registry becomes the source of truth. Chat remains the familiar front door.</Feature>
            </div>
          </div>
          <div className="site-log paper">
            <div className="log-header"><span>SITE LOGBOOK / PROJECT 07</span><span>THU 14:32</span></div>
            <div className="chat-message"><b>Foreman / General</b><p>Need 12 bags cement tomorrow sa slab. Please confirm delivery.</p></div>
            <div className="log-arrow">↓ <span>EXTRACTED / REVIEW</span></div>
            <div className="log-card"><span className="status-light" /> MATERIAL REQUEST <b>12 bags cement</b><small>Project 07 · Tomorrow · Owner: Procurement</small><button type="button" className="mini-button">Approve record</button></div>
            <p className="log-note">Below the supervisory line, nobody needs a new account.</p>
          </div>
        </section>

        <section id="tracks" className="section wash-section">
          <div className="section-wrap">
            <SectionLead eyebrow="What it tracks" title={<>The six things that actually worry you <em>on site.</em></>}>
              Not a feature list. The shortlist contractors name when you ask what keeps costing them money.
            </SectionLead>
            <div className="card-grid three-up">
              {constructionTracks.map(([number, title, text]) => <article className="paper note-card track-card" key={number}><span className="card-number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="rules" className="section wood-section rules-section">
          <div className="section-wrap">
            <SectionLead eyebrow="The rules" title={<>Why it survives contact with a <em>real job site.</em></>}>
              The constraints are part of the product. They are what keep the bridge useful and trustworthy.
            </SectionLead>
            <div className="rules-grid">
              <Rule number="01" title="The database is the record.">Chat is a view of the registry, not the system of record. In a dispute, you read a record—not a scrollback.</Rule>
              <Rule number="02" title="It quotes. It never invents.">Specs, quantities, and prices are copied from what was said or left blank. Unverified numbers get dropped, not guessed.</Rule>
              <Rule number="03" title="It proposes. A human decides.">The AI raises cards; your project-in-charge confirms, corrects, or removes them.</Rule>
              <Rule number="04" title="One seat runs everything.">The bot writes on everyone&apos;s behalf. Foremen and subcontractors never need an account or license.</Rule>
              <Rule number="05" title="It stops at the supervisory line.">The system reaches your project-in-charge and goes no further.</Rule>
              <Rule number="06" title="A muted bot is a dead bot.">Digests and rate limits, not a ping every four minutes. If people mute it, nothing else matters.</Rule>
            </div>
          </div>
        </section>

        <section id="proof" className="section section-wrap">
          <SectionLead eyebrow="From the pilot" title={<>Day one, on a <em>live job site.</em></>} align="center">
            This is a deployment in progress, not a finished case study. Here is exactly what the first day produced.
          </SectionLead>
          <div className="pilot-file paper">
            <div><span className="file-label">LIVE PILOT / PHILIPPINE CIVIL WORKS CONTRACTOR</span><h3>Fifty messages in. Nothing lost.</h3><p>A civil-works contractor running sites through one chat community put the bridge on a single live project. On day one it minuted eight real conversations in mixed Bisaya, Tagalog, and English and stored every quantity exactly as the foreman said it.</p><small>Client anonymized at their request. Figures are from the first day of a live pilot, not a completed rollout.</small></div>
            <div className="pilot-stats"><div><strong>14/14</strong><span>open loose ends found and tracked</span></div><div><strong>0</strong><span>quotes dropped or paraphrased</span></div><div><strong>&lt; $1</strong><span>per day to run, per active project</span></div></div>
          </div>
        </section>

        <section className="section wash-section fit-section"><div className="section-wrap"><div className="fit-card paper"><p className="eyebrow">Who this is for</p><p>Contractors running <strong>more than one active site</strong>, with a project-in-charge who can approve what the system raises. If you&apos;re a two-man crew coordinating one job, this is more system than you need—and we&apos;ll tell you that on the call.</p><span>Hosting and running costs are a few dollars a month per project. You&apos;re paying for the build and the people behind it, not software rent.</span></div></div></section>

        <section id="faq" className="section section-wrap faq-section">
          <SectionLead eyebrow="Straight answers" title={<>The questions contractors actually <em>ask.</em></>} />
          <div className="faq-list">
            {constructionFaqs.map(([question, answer]) => <details key={question}><summary><span dangerouslySetInnerHTML={{ __html: question }} /><b>+</b></summary><p dangerouslySetInnerHTML={{ __html: answer }} /></details>)}
          </div>
        </section>
        <OfferSection />
        <Booking source="construction" heading="See the bridge on one live project." />
      </main>
      <Footer />
    </PageFrame>
  );
}

function Rule({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <article className="rule-row"><span className="rule-number">{number}</span><div><h3>{title}</h3><p>{children}</p></div></article>;
}

export { HomePage, AirtablePage, ConstructionPage };
