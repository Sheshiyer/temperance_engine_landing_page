import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phases, koshas, organs, architecture, profiles, capabilityRows, sourceRoot, reviewRoot, alignmentRoot } from "./architecture-data.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const github = "https://github.com/Sheshiyer/temperance_engine";
const docs = sourceRoot;
const poster = "/assets/temperance-hero-poster.png";
const video = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4";
function Reveal({ children, className = "", delay = 0 }) {
  return <div className={`reveal ${className}`} data-reveal-delay={delay}>{children}</div>;
}
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}
function Heading({number, eyebrow, title, children}) {
  return <Reveal className="section-heading"><p className="eyebrow"><span className="section-number">{number}</span> {eyebrow}</p><h2>{title}</h2><p>{children}</p></Reveal>;
}
function Choices({label, name, items, selected, onChange}) {
  return <fieldset className="choices"><legend className="sr-only">{label}</legend>{items.map(item => <label key={item.id} className={`choice ${selected === item.id ? "is-selected" : ""}`}><input type="radio" name={name} value={item.id} checked={selected === item.id} onChange={() => onChange(item.id)} aria-controls={`${name}-${item.id}`} /><span>{item.sigil && <i aria-hidden="true">{item.sigil}</i>}{item.name}</span></label>)}</fieldset>;
}
function SourceLink({path, children = "Source contract"}) {return <a className="text-link" href={`${docs}/${path}`}>{children} <span aria-hidden="true">↗</span></a>;}
function Panel({name, id, selected, children, className = ""}) {return <div className={`explorer-panel ${className}`} id={`${name}-${id}`} hidden={selected !== id}>{children}</div>;}
export default function App() {
  const page = useRef(null);
  const player = useRef(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [cycle, setCycle] = useState('observe');
  const [node, setNode] = useState('core');
  const [kosha, setKosha] = useState('manomaya');
  const [phase, setPhase] = useState('observe');
  const [organ, setOrgan] = useState('vestibule');
  const [profile, setProfile] = useState('core');
  const [mediaFailed, setMediaFailed] = useState(false);
  useEffect(() => {
    if (!player.current) return;
    if (reduced) { player.current.pause(); setPlaying(false); }
    else if (!mediaFailed) player.current.play().catch(() => setPlaying(false));
  }, [reduced, mediaFailed]);
  useGSAP(() => {
    if (reduced) return;
    const context = gsap.context(() => {
      gsap.from(".hero-eyebrow, #hero-title, .hero-subtitle, .hero-actions, .hero-note", { opacity: 0, y: 24, duration: 0.85, stagger: 0.1, ease: "power3.out" });
      gsap.to(".cinematic-video", { scale: 1.1, yPercent: 4, ease: "none", scrollTrigger: { trigger: ".hero-cinema", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, { opacity: 0, y: 30, duration: 0.75, delay: Number(element.dataset.revealDelay || 0) / 1000, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 94%", once: true } });
      });
    }, page);
    return () => context.revert();
  }, { scope: page, dependencies: [reduced], revertOnUpdate: true });
  const toggleVideo = () => {
    if (!player.current) return;
    if (playing) player.current.pause();
    else player.current.play().catch(() => setPlaying(false));
  };
  return <main ref={page}>
    <a className="skip-link" href="#operating-layer">Skip to product details</a>
    <section id="top" className="hero-cinema" aria-labelledby="hero-title">
      <img className="hero-poster" src={poster} alt="" fetchpriority="high" />
      {!mediaFailed && <video ref={player} className="cinematic-video" poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setMediaFailed(true)}>
        {!reduced && <source src={video} type="video/mp4" />}
      </video>}
      <div className="video-vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />
      <nav className="topbar liquid-glass" aria-label="Primary navigation">
        <a className="brand-mark" href="#top" aria-label="Temperance Engine home"><img className="brand-icon" src="/brand/te-mark.png" alt="" width="38" height="38" /><span>Temperance Engine</span></a>
        <div className="nav-links"><a href="#operating-layer">The system</a><a href="#workflow">Workflow</a><a href="#integrations">Integrations</a></div>
        <a className="nav-cta" href="#get-started">Get started</a>
      </nav>
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">AI operator system</p>
        <h1 id="hero-title">Give your AI tools a shared way to work.</h1>
        <p className="hero-subtitle">Temperance Engine connects project context, reusable skills, structured workflows, model routing, and verification across your AI coding tools. Set up a configurable local operator runtime, choose the integrations you need, and keep control of approvals and changes.</p>
        <div className="hero-actions"><a className="button primary" href="#operating-layer">Explore the architecture <span aria-hidden="true">↗</span></a><a className="button ghost" href="#get-started">Get started</a></div>
        <p className="hero-note">For developers and small teams working across AI coding clients.</p>
      </div>
      {!mediaFailed && !reduced && <button className="motion-toggle" type="button" onClick={toggleVideo} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? "Pause motion" : "Play motion"}</button>}
    </section>
    <section id="operating-layer" className="architecture-section" aria-labelledby="cycle-title">
      <Heading number="02" eyebrow="One complete work cycle" title={<span id="cycle-title">Follow an idea all the way to evidence.</span>}>Imagine improving a project’s keyboard search. Select a phase to follow this illustrative task. Nothing here runs a worker or reads your machine.</Heading>
      <figure className="architecture-film liquid-glass" aria-labelledby="architecture-film-title">
        <div className="film-heading"><p className="eyebrow">Watch the architecture</p><h3 id="architecture-film-title">A 30-second tour of the operating layer.</h3><p id="architecture-film-description">An illustrative architecture animation. Start playback when you choose, or read the same story in the transcript.</p></div>
        <video className="architecture-film-player" controls playsInline preload="none" width="1920" height="1080" poster="/assets/temperance-architecture-30s-poster.jpg" aria-labelledby="architecture-film-title" aria-describedby="architecture-film-description">
          <source src="/assets/temperance-architecture-30s.mp4" type="video/mp4" />
          <track kind="captions" src="/assets/temperance-architecture-30s-captions.vtt" srcLang="en" label="English descriptive captions" />
          Your browser does not support this video. Use the transcript below.
        </video>
        <figcaption><a href="/assets/temperance-architecture-30s-transcript.md">Read the film transcript</a><a href="/assets/temperance-architecture-30s-captions.vtt">Download captions (VTT)</a><a href={`${alignmentRoot}/docs/architecture-explainer.md`}>Read the architecture explainer ↗</a></figcaption>
      </figure>
      <div className="example-banner"><span className="status-dot" /> Illustrative task · Make search usable with a keyboard</div>
      <Choices label="Illustrative task phase" name="cycle" items={phases} selected={cycle} onChange={setCycle} />
      <div className="cycle-display liquid-glass">{phases.map((item,i) => <Panel key={item.id} name="cycle" id={item.id} selected={cycle}><div className="cycle-index" aria-hidden="true">{String(i+1).padStart(2,'0')}<small>/ 07</small></div><div><p className="eyebrow">{item.name} · illustrative, not a live run</p><h3>{item.output}.</h3><p>{item.example}</p><p className="fine-print">The useful result is a specific claim with its evidence and remaining limits. A completed example on this page is not a product acceptance receipt.</p></div></Panel>)}</div>
    </section>
    <section id="architecture" className="architecture-section" aria-labelledby="architecture-title">
      <Heading number="03" eyebrow="Architecture at a glance" title={<span id="architecture-title">One core. Explicit connections.</span>}>Temperance connects the pieces around your agents. Select a connection to inspect ownership.</Heading>
      <div className="architecture-layout"><div className="architecture-graph" aria-label="Architecture relationships"><div className="graph-center"><img src="/brand/te-mark.png" alt="" width="64" height="64" /><strong>Temperance</strong><span>Shared operating contract</span></div><Choices label="Architecture component" name="graph" items={architecture} selected={node} onChange={setNode} /><p className="graph-caption">Connections express information flow.<br />They grant no access or authority.</p></div><div className="graph-inspector liquid-glass">{architecture.map(item => <Panel key={item.id} name="graph" id={item.id} selected={node}><p className="eyebrow">Connection {item.mark}</p><h3>{item.name}</h3><p>{item.copy}</p><SourceLink path={item.source} /></Panel>)}</div></div>
      <details className="reference-details"><summary>Read the architecture as a list</summary><ol><li>Portable core defines shared identity and work contracts.</li><li>Explicit adapters link contracts to selected host capabilities.</li><li>Advisory organs surround the loop through lifecycle callbacks.</li><li>Infrastructure supplies routing, context, search and optional transport.</li><li>Independent owners retain planning, admission, credentials and acceptance.</li></ol></details>
    </section>
    <section id="koshas" className="architecture-section kosha-section" aria-labelledby="koshas-title">
      <Heading number="04" eyebrow="Five Koshas" title={<span id="koshas-title">Five layers. One connected practice.</span>}>Koshas give the architecture a vocabulary for different kinds of work. They are descriptive work layers, not processes or enforceable security partitions. Select one to see the phases it primarily classifies.</Heading>
      <div className="kosha-layout"><Choices label="Kosha layer" name="kosha" items={koshas} selected={kosha} onChange={setKosha} /><div className="kosha-inspector">{koshas.map(item => <Panel key={item.id} name="kosha" id={item.id} selected={kosha}><span className="kosha-numeral" aria-hidden="true">{item.numeral}</span><p className="eyebrow">{item.name}</p><h3>{item.plain}</h3><p>{item.copy}</p><blockquote>{item.question}</blockquote><p className="sr-only">Primary phases: {phases.filter(p => p.kosha === item.id).map(p => p.name).join(", ")}</p><div className="phase-pills" aria-hidden="true">{phases.map(p => <span key={p.id} className={p.kosha === item.id ? 'active' : ''}>{p.name}</span>)}</div><p className="fine-print">{item.boundary}</p></Panel>)}</div></div>
      <SourceLink path="package/router/phase-projection.v4.ts">Inspect the shipped phase-to-Kosha projection</SourceLink>
    </section>
    <section id="workflow" className="architecture-section" aria-labelledby="workflow-title">
      <Heading number="05" eyebrow="Seven phases" title={<span id="workflow-title">A visible path through the work.</span>}>Observe → Think → Plan → Build → Execute → Verify → Learn. PAI supplies the method. Phase labels describe progress without authorizing actions.</Heading>
      <Choices label="Work phase" name="phase" items={phases} selected={phase} onChange={setPhase} />
      <div className="phase-inspector liquid-glass">{phases.map(item => <Panel key={item.id} name="phase" id={item.id} selected={phase}><div className="phase-intro"><span className="large-sigil" aria-hidden="true">{item.sigil}</span><div><p className="eyebrow">{koshas.find(k=>k.id === item.kosha).plain}</p><h3>{item.name}</h3></div></div><dl className="contract-grid"><div><dt>Input</dt><dd>{item.input}</dd></div><div><dt>Output</dt><dd>{item.output}</dd></div><div><dt>Skill intent</dt><dd>{item.intent}</dd></div><div><dt>Verification responsibility</dt><dd>{item.proof}</dd></div></dl></Panel>)}</div>
      <SourceLink path="docs/pai-flow.md">Read the PAI work-loop architecture</SourceLink>
    </section>
    <section id="organs" className="architecture-section" aria-labelledby="organs-title">
      <Heading number="06" eyebrow="Six advisory organs" title={<span id="organs-title">A support system around the work.</span>}>Each organ names a bounded advisory responsibility. The public lifecycle already supplies subscriptions, dependency ordering and replay contracts. Concrete behavior comes from injected handlers. Inspect each portable state.</Heading>
      <Choices label="Advisory organ" name="organ" items={organs} selected={organ} onChange={setOrgan} />
      <div className="organ-inspector liquid-glass">{organs.map(item => <Panel key={item.id} name="organ" id={item.id} selected={organ}><div><p className="eyebrow">{item.name}</p><h3>{item.role}</h3><p>{item.copy}</p></div><dl className="organ-facts"><div><dt>Dependency / input</dt><dd>{item.depends}</dd></div><div><dt>Read / write behavior</dt><dd>{item.behavior}</dd></div><div><dt>Portable state</dt><dd><span className="state-badge draft">{item.state}</span></dd></div><div><dt>Owner</dt><dd>Public contract; selected host owns adapter and data.</dd></div></dl></Panel>)}</div>
      <p className="section-note">The public product owns generic contracts; each selected host owns its adapter and data. These advisory organs are distinct from onboarding infrastructure modules and from Cambium’s company operating organs, such as Genesis, Taste, Hands, Will, Cortex and Garden. An explicit adapter can relate them without merging their ownership.</p><SourceLink path="package/install-surface/src/composition/lifecycle.ts" />
    </section>
    <section id="integrations" className="architecture-section" aria-labelledby="integrations-title">
      <Heading number="07" eyebrow="Infrastructure" title={<span id="integrations-title">Connect what your setup needs.</span>}>Onboarding describes required and optional dependencies. Host bindings own endpoints, paths and credentials. This generic topology cannot install modules or admit workers.</Heading>
      <ol className="infrastructure-map"><li><span>01 / Client surfaces</span><strong>Your selected coding tools</strong><p>OpenCode and Cursor are primary instruction surfaces. Claude Code and Codex are opt-in; optional GSD wrappers also support Grok where installed.</p></li><li><span>02 / Operator layer</span><strong>Context · skills · work loop · evidence</strong><p>Project instructions and the ISA retain their owners. Skills/search and local feedback are explicit host choices; CodeGraph applies where configured.</p></li><li><span>03 / Services</span><strong>Router and memory dependencies</strong><p>Guided onboarding models OmniRoute and Temperance memory as required. Local router, knowledge volume and selected memory or vault tunnels are modular additions.</p></li><li><span>04 / Optional transport</span><strong>Connect independent systems deliberately</strong><p>Hermes A2A and tunnel bindings, Obsidian REST/tunnel and Mail MCP have their own prerequisites. A transport connection does not grant company admission.</p></li></ol>
      <SourceLink path="docs/COMPATIBILITY.md">Review dependencies and compatibility</SourceLink>
    </section>
    <section id="core-and-profile" className="architecture-section" aria-labelledby="profiles-title">
      <Heading number="08" eyebrow="Core and profile" title={<span id="profiles-title">Portable at the center. Personal by choice.</span>}>Existing V4 technical documents call the portable product the “glove” and the selected profile the “hand.”</Heading>
      <Choices label="Setup comparison" name="profile" items={profiles} selected={profile} onChange={setProfile} />
      <div className="profile-inspector liquid-glass">{profiles.map(item => <Panel key={item.id} name="profile" id={item.id} selected={profile}><div><p className="eyebrow">{item.name}</p><h3>{item.title}</h3><p>{item.copy}</p></div><div><ul className="checked-list">{item.adds.map(x=><li key={x}>{x}</li>)}</ul><p className="fine-print">{item.holds}</p></div></Panel>)}</div>
    </section>
    <section id="routing" className="architecture-section" aria-labelledby="routing-title">
      <Heading number="09" eyebrow="Model routing" title={<span id="routing-title">The workflow chooses intent. The gateway routes.</span>}>The native client can coordinate a step while selected work uses the host’s governed routing lane. OmniRoute is the default integration in release 0.8.0 and owns credentials, models, combos and fallback. Temperance does not become a second provider registry.</Heading>
      <div className="editorial-grid"><article><h3>Make the actual attempt visible.</h3><p>Models and accounts change. Configuration expresses a planned route. Actual-attempt evidence records which provider and model served the work when that evidence exists.</p></article><article><h3>Keep routing proof specific.</h3><p>A protected gateway answering a probe does not prove a valid provider credential, available quota or a qualified long-context session. Hosted authentication and host acceptance remain separate checks. Historical 9router and retired te-* aliases are not current routing authority.</p></article></div><SourceLink path="docs/COMPATIBILITY.md" />
    </section>
    <section id="skills" className="architecture-section" aria-labelledby="skills-title">
      <Heading number="10" eyebrow="Skills and workflows" title={<span id="skills-title">Find the relevant capability. Keep the shared method.</span>}>Skills provide reusable behavior: a focused review, a design procedure or a browser verification workflow. Discovery and lazy loading let a configured host select what a task needs without loading an entire skill catalog into every session.</Heading>
      <div className="editorial-grid"><article><h3>Methodology keeps its name.</h3><p>PAI provides the current-state to ideal-state loop. GSD is an optional external planning backbone. ISA carries the project’s criteria and acceptance evidence. Temperance links these with supported client surfaces; it does not fork their authority or create another acceptance ledger.</p></article><article><h3>Bindings need evidence.</h3><p>A phase’s skill intent can request a capability while a host lacks a resolver or suitable active skill. That absence must stay visible. Lifecycle packs and wrappers need their supported client and installed prerequisites; a file in the source repository cannot prove a native hook ran.</p></article></div><SourceLink path="docs/gsd-manifest-spine.md">Read client and planning-spine setup</SourceLink>
      <details className="tooling-details reference-details">
        <summary>Installed Claude plugins and skills</summary>
        <p>This optional Claude profile’s November 2 inventory records five enabled plugins: Feature Dev 1.0.1 for feature exploration and review, rust-analyzer 1.0.0 for Rust intelligence, Supabase 0.1.16 for development guidance, Superpowers 7.0.0 for planning and testing workflows, and the private Temperance rail mod 0.11.0 for phase and provenance projections.</p>
        <p>The inventory also records ten disabled installations and 155 exposed top-level skill entries. Exposed entries are not 155 independent implementations or proof of invocation. Installed, enabled, available, invoked and accepted are different evidence levels. These optional profile choices are not bundled portable defaults; skills use hub-first discovery and selected spokes on demand.</p>
        <p>PAI/Temperance work modes and Claude Code’s <a href="https://code.claude.com/docs/en/permissions">permission controls</a> remain separate from this plugin inventory.</p>
        <div className="resource-links"><a className="text-link" href={`${alignmentRoot}/docs/architecture-explainer.md`}>Architecture and tooling explainer ↗</a><a className="text-link" href={`${alignmentRoot}/CREDITS.md`}>Owners, sources and plugin inventory ↗</a><a className="text-link" href={`${alignmentRoot}/docs/plans/2026-11-02-claude-tooling-metadata.json`}>Dated sanitized metadata ↗</a></div>
      </details>
    </section>
    <section id="memory" className="architecture-section" aria-labelledby="memory-title">
      <Heading number="11" eyebrow="Memory and learning" title={<span id="memory-title">Useful continuity starts with provenance.</span>}>A next session needs enough trustworthy context to continue. It does not need every transcript, personal note or company record copied into one place. Selected evidence should retain its source, owner and time, including when it becomes stale.</Heading>
      <div className="memory-flow"><div><span>Evidence</span><p>Selected project context and attributable outcomes.</p></div><span aria-hidden="true">→</span><div><span>Interpretation</span><p>Separate memory planes, with inferences identified.</p></div><span aria-hidden="true">→</span><div><span>Proposal</span><p>A reviewable lesson with an explicit destination owner.</p></div></div>
      <p className="section-note">Canonical memory writes and skill promotion are separate actions. A lesson can be useful before it is approved to persist. The portable organ story makes no claim of autonomous canonical-memory updates, transcript imports or access to private stores.</p>
    </section>
    <section id="evidence" className="architecture-section" aria-labelledby="evidence-title">
      <Heading number="12" eyebrow="Evidence and control" title={<span id="evidence-title">Know exactly what a result proves.</span>}>A useful operator system keeps claims narrow enough to check. The project’s ISA names the criteria. Receipts identify observations. Actions need explicit approvals, cancellation and rollback boundaries.</Heading>
      <div className="evidence-layout"><figure><img src="/assets/temperance-evidence-loop.png" alt="" width="640" height="640" loading="lazy" /><figcaption>Conceptual artwork of the evidence loop.</figcaption></figure><ol className="evidence-ladder"><li><strong>Source</strong><p>The implementation exists at a named revision and has a bounded test surface.</p></li><li><strong>Installed</strong><p>A host has received particular bytes, with an installation record and rollback preimage.</p></li><li><strong>Runtime</strong><p>A real callback or provider attempt produced a fresh, attributable observation.</p></li><li><strong>Accepted</strong><p>The owning criteria and required real-world probes have been satisfied.</p></li></ol></div>
      <details className="reference-details"><summary>Why replay and cancellation need honest outcomes</summary><p>The public lifecycle accepts an injected atomic ledger so a repeated event cannot quietly run another callback wave. A timeout requests cancellation; it cannot guarantee an arbitrary handler stopped. Callback failure and ledger persistence failure must remain visible. This runner is not a sandbox. Host adapters must provide their own effect containment and durable storage.</p></details>
    </section>
    <section id="availability" className="architecture-section" aria-labelledby="availability-title">
      <Heading number="13" eyebrow="Available / optional / held" title={<span id="availability-title">A clear release boundary.</span>}>Released source is version 0.8.0. The portable reconciliation and Vestibule slice are draft work for source review. Shipped identifies released source. Your host needs separate installation, runtime and acceptance evidence.</Heading>
      <div className="capability-table-wrap"><table className="capability-table"><caption>Capability and evidence matrix · reviewed November 2, 2026</caption><thead><tr><th scope="col">Capability</th><th scope="col">State</th><th scope="col">Evidence level</th><th scope="col">What it proves / remaining boundary</th></tr></thead><tbody>{capabilityRows.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th><td><span className={`state-badge ${row[1].toLowerCase()}`}>{row[1]}</span></td><td>{row[2]}</td><td>{row[3]}</td></tr>)}</tbody></table></div>
      <p className="section-note">The v1.1 clean-host milestone, live hosted-router authentication, qualified long-context sessions, and durable checkpoint recovery remain held. Superset and Constellation are retired and excluded. Neither this preview nor a passing fixture closes these gates.</p><SourceLink path="CHANGELOG.md">Read the released changelog</SourceLink><div className="resource-links"><a className="text-link" href={`${reviewRoot}/docs/plans/2026-11-02-portable-capabilities.md`}>Review the draft capability and provenance matrix ↗</a><a className="text-link" href={`${reviewRoot}/package/router/portable-phase-kernel.ts`}>Inspect the draft phase kernel ↗</a><a className="text-link" href={`${reviewRoot}/package/install-surface/src/composition/vestibule.ts`}>Inspect the draft Vestibule handler ↗</a></div>
    </section>
    <section id="get-started" className="architecture-section" aria-labelledby="start-title">
      <Heading number="14" eyebrow="Guided setup" title={<span id="start-title">Build your operator setup, deliberately.</span>}>Inspect → dry run → choose modules and profile → verify. Review platform requirements and proposed changes. Preserve a recoverable preimage.</Heading>
      <div className="closing-grid"><div className="setup-panel liquid-glass"><p className="eyebrow">Inspect before installation</p><pre><code>{"git clone https://github.com/Sheshiyer/temperance_engine.git\ncd temperance_engine\n./install.sh --dry-run --skip-voice\n# Review the preview and supported install options."}</code></pre><p>This is an inspection example, not a live terminal. Installation is a separate operator action. Voice is optional; dependencies and platform qualification vary by module. macOS qualification and Linux best-effort evidence should be checked against current compatibility documentation.</p><SourceLink path="QUICKSTART.md">Quick start and installation options</SourceLink></div><div className="setup-copy"><h3>Verify the setup you actually selected.</h3><p>Guided onboarding lets you inspect prerequisites and select supported capabilities. Follow the project’s verification and rollback procedures for the chosen installation. Check actual callback linkage if you add an organ; inspect live provider authentication if you add a hosted route.</p><a className="button primary" href={github}>Explore Temperance on GitHub ↗</a><SourceLink path="package/install-surface/docs/guided-onboarding.md">Read guided onboarding</SourceLink></div></div>
    </section>
    <section id="faq" className="architecture-section faq-section" aria-labelledby="faq-title">
      <Heading number="15" eyebrow="Questions, docs and credits" title={<span id="faq-title">Start with understanding. Add what you need.</span>}>Explore the public contracts, examine the held gates and choose a setup that matches your work.</Heading>
      <div className="faq-list"><details><summary>Is Temperance an AI model or a hosted agent service?</summary><p>It is an AI operator system: a shared operating layer around coding tools, context, skills, work phases and verification.</p></details><details><summary>Can I use it without the founder’s personal setup?</summary><p>The portable core direction makes personal and company profiles optional. Public generic contracts and synthetic fixtures avoid private stores.</p></details><details><summary>Does “local-first” mean nothing can leave my machine?</summary><p>Local project ownership does not make every selected integration offline. Provider inference and remote transports have their own data paths. </p></details><details><summary>Which parts can I evaluate now?</summary><p>Review 0.8.0 source, composition contracts, lifecycle fixtures, onboarding and compatibility. Evaluate the new portable slice as draft source. Require separate evidence for installation, actual host callbacks and acceptance. </p></details></div>
      <div className="resource-links"><SourceLink path="docs/pai-flow.md">PAI and work-loop documentation</SourceLink><SourceLink path="docs/COMPATIBILITY.md">Compatibility and release limits</SourceLink><a className="text-link" href="https://www.producthunt.com/products/temperance-engine?launch=temperance-engine">Temperance on Product Hunt ↗</a></div>
      <p className="credits-note">Made by Thoughtseed. PAI, GSD, OmniRoute, CodeGraph and connected clients retain their own names and upstream ownership. Hermes and Cambium remain independent systems.</p>
      <footer className="site-footer liquid-glass" aria-label="Thoughtseed attribution"><a className="footer-brand" href="https://thoughtseed.space/" aria-label="Visit Thoughtseed"><img className="footer-lockup" src="/brand/thoughtseed-logo-lockup.png" alt="Thoughtseed" width="240" height="60" loading="lazy" /></a><div className="footer-copy"><span>Done by Thoughtseed.</span><p>Temperance Engine · AI operator system</p></div><a className="footer-link" href={github}>Source & documentation ↗</a></footer>
    </section>
  </main>;
}
