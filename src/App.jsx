import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { benefits, phases, koshas, organs, integrations, faqs, pageCopy, workflows, compositions, availability } from "./architecture-data.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const github = "https://github.com/Sheshiyer/temperance_engine/tree/codex/generic-glove-20261104";
const guide = "https://github.com/Sheshiyer/temperance_engine/blob/codex/generic-glove-20261104/docs/generic-engine.md";
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
function Heading({eyebrow, title, children}) {
  return <Reveal className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{children}</p></Reveal>;
}
function Choices({label, name, items, selected, onChange}) {
  return <fieldset className="choices"><legend className="sr-only">{label}</legend>{items.map(item => <label key={item.id} className={`choice ${selected === item.id ? "is-selected" : ""}`}><input type="radio" name={name} value={item.id} checked={selected === item.id} onChange={() => onChange(item.id)} aria-controls={`${name}-${item.id}`} /><span>{item.sigil && <i aria-hidden="true">{item.sigil}</i>}{item.name}</span></label>)}</fieldset>;
}
function Panel({name, id, selected, children, className = ""}) {return <div className={`explorer-panel ${className}`} id={`${name}-${id}`} hidden={selected !== id}>{children}</div>;}
export default function App() {
  const page = useRef(null);
  const player = useRef(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [kosha, setKosha] = useState('manomaya');
  const [workflow, setWorkflow] = useState('editorial');
  const [flowStep, setFlowStep] = useState('draft');
  const [composition, setComposition] = useState('core');
  const [organ, setOrgan] = useState('vestibule');
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
    <a className="skip-link" href="#operating-layer">{pageCopy.navigation.skipLink}</a>
    <section id="top" className="hero-cinema" aria-labelledby="hero-title">
      <img className="hero-poster" src={poster} alt="" fetchpriority="high" />
      {!mediaFailed && <video ref={player} className="cinematic-video" poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setMediaFailed(true)}>
        {!reduced && <source src={video} type="video/mp4" />}
      </video>}
      <div className="video-vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />
      <nav className="topbar liquid-glass" aria-label="Primary navigation">
        <a className="brand-mark" href="#top" aria-label="Temperance Engine home"><img className="brand-icon" src="/brand/te-mark.png" alt="" width="38" height="38" /><span>Temperance Engine</span></a>
        <div className="nav-links"><a href="#operating-layer">{pageCopy.navigation.systemLink}</a><a href="#workflow">{pageCopy.navigation.workflowLink}</a><a href="#integrations">{pageCopy.navigation.integrationsLink}</a></div>
        <a className="nav-cta" href={guide}>{pageCopy.navigation.startLink}</a>
      </nav>
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">{pageCopy.hero.eyebrow}</p>
        <h1 id="hero-title">{pageCopy.hero.headline}</h1>
        <p className="hero-subtitle">{pageCopy.hero.subhead}</p>
        <div className="hero-actions"><a className="button primary" href={guide}>{pageCopy.hero.primaryCTA}</a><a className="button ghost" href="#core">{pageCopy.hero.secondaryCTA}</a></div>
        <p className="hero-note">{pageCopy.hero.note}</p>
      </div>
      {!mediaFailed && !reduced && <button className="motion-toggle" type="button" onClick={toggleVideo} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? "Pause motion" : "Play motion"}</button>}
    </section>
    <section id="operating-layer" className="architecture-section product-overview" aria-labelledby="overview-title">
      <Heading eyebrow={pageCopy.overview.eyebrow} title={<span id="overview-title">{pageCopy.overview.headline}</span>}>{pageCopy.overview.intro}</Heading>
      <div className="benefit-grid">{benefits.map((item,i)=><Reveal className="benefit-card" key={item.id}><span className="benefit-number">0{i+1}</span><h3>{item.name}</h3><p>{item.copy}</p></Reveal>)}</div>

    </section>
    <section id="core" className="architecture-section" aria-labelledby="core-title">
      <Heading eyebrow="Core, modules and profiles" title={<span id="core-title">Choose the parts for your setup.</span>}>Keep the common lifecycle in the engine. Select the clients, workflow and services at the boundary. Explore the three layers below.</Heading>
      <p className="owner-definition">An owner is the tool, service or policy responsible for a plan, approval, action or acceptance decision.</p>
      <div className="neutral-graph" aria-label="Client adapter, engine contracts and external workflow owner">
        <article className="integration-card liquid-glass"><p className="eyebrow">Replaceable connector</p><h3>Client adapter</h3><p>Translates a supported client's events into the selected workflow's references. No coding client is needed to inspect the core.</p></article>
        <article className="integration-card liquid-glass"><p className="eyebrow">Shared engine</p><h3>Lifecycle and receipts</h3><p>Checks the selected module, dependencies, owner approval and result. Records references and digests without choosing the next step.</p></article>
        <article className="integration-card liquid-glass"><p className="eyebrow">Your process</p><h3>External workflow owner</h3><p>Chooses the sequence, branches and stop rules. Planning, execution and acceptance keep their own owners.</p></article>
      </div>
      <Choices label="Composition layer" name="composition" items={compositions} selected={composition} onChange={setComposition} />
      <div className="composition-inspector liquid-glass">{compositions.map(item=><Panel key={item.id} name="composition" id={item.id} selected={composition}><p className="eyebrow">{item.name}</p><h3>{item.title}</h3><p>{item.copy}</p><ul>{item.parts.map(part=><li key={part}>{part}</li>)}</ul></Panel>)}</div>
    </section>
    <section id="workflow" className="architecture-section" aria-labelledby="workflow-title">
      <Heading eyebrow={pageCopy.workflow.eyebrow} title={<span id="workflow-title">{pageCopy.workflow.headline}</span>}>{pageCopy.workflow.intro}</Heading>
      <Choices label="External workflow example" name="workflow" items={workflows} selected={workflow} onChange={id=>{setWorkflow(id);setFlowStep(workflows.find(item=>item.id===id).steps[0].id);}} />
      {workflows.map(flow=><Panel key={flow.id} name="workflow" id={flow.id} selected={workflow}>
        <p className="example-caption">Read-only example · {flow.name}</p>
        <Choices label={flow.name+" step"} name={"step-"+flow.id} items={flow.steps} selected={flowStep} onChange={setFlowStep} />
        <div className="phase-inspector liquid-glass">{flow.steps.map((item,i)=><Panel key={item.id} name={"step-"+flow.id} id={item.id} selected={flowStep}><div className="phase-story"><div className="phase-story-mark"><span aria-hidden="true">{item.sigil || "↗"}</span><small>{String(i+1).padStart(2,"0")} / {String(flow.steps.length).padStart(2,"0")}</small></div><div><p className="eyebrow">{item.name}</p><h3>{item.headline}</h3><p>{item.copy}</p><div className="task-example"><span>{pageCopy.workflow.exampleLabel}</span><p>{item.detail}</p></div></div></div></Panel>)}</div>
      </Panel>)}
      <p className="example-caption">In these examples, Temperance checks the module pin, current dependencies, task and step identity, approval for a write, and the recorded result. An expired approval would hold the action.</p>
    </section>
    <section id="film-example" className="architecture-section" aria-labelledby="architecture-film-title">
      <figure id="film" className="architecture-film liquid-glass" aria-labelledby="architecture-film-title">
        <div className="film-heading"><p className="eyebrow">{pageCopy.film.eyebrow}</p><h2 id="architecture-film-title">{pageCopy.film.headline}</h2><p id="architecture-film-description">{pageCopy.film.intro}</p></div>
        <video className="architecture-film-player" controls playsInline preload="none" width="1920" height="1080" poster="/assets/temperance-architecture-30s-poster.jpg" aria-labelledby="architecture-film-title" aria-describedby="architecture-film-description">
          <source src="/assets/temperance-architecture-30s.mp4" type="video/mp4" />
          <track kind="captions" src="/assets/temperance-architecture-30s-captions.vtt" srcLang="en" label="English descriptive captions" />
          {pageCopy.film.fallback}
        </video>
        <figcaption><span>{pageCopy.film.figcaption}</span><a href="/assets/temperance-architecture-30s-transcript.md">{pageCopy.film.transcriptLink}</a></figcaption>
      </figure>
    </section>
    <section id="koshas" className="architecture-section kosha-section" aria-labelledby="koshas-title">
      <Heading eyebrow={pageCopy.koshas.eyebrow} title={<span id="koshas-title">{pageCopy.koshas.headline}</span>}>{pageCopy.koshas.intro}</Heading>
      <div className="kosha-layout"><Choices label="Kosha layer" name="kosha" items={koshas} selected={kosha} onChange={setKosha} /><div className="kosha-inspector">{koshas.map(item=><Panel key={item.id} name="kosha" id={item.id} selected={kosha}><span className="kosha-numeral" aria-hidden="true">{item.numeral}</span><p className="eyebrow">{item.name}</p><h3>{item.plain}</h3><p>{item.copy}</p><blockquote>{item.question}</blockquote><p className="sr-only">Primary phases: {phases.filter(p=>p.kosha===item.id).map(p=>p.name).join(', ')}</p><div className="phase-pills" aria-hidden="true">{phases.map(p=><span key={p.id} className={p.kosha===item.id?'active':''}>{p.name}</span>)}</div></Panel>)}</div></div>
    </section>
    <section id="organs" className="architecture-section" aria-labelledby="organs-title">
      <Heading eyebrow={pageCopy.organs.eyebrow} title={<span id="organs-title">{pageCopy.organs.headline}</span>}>{pageCopy.organs.intro}</Heading>
      <Choices label="Advisory organ" name="organ" items={organs} selected={organ} onChange={setOrgan} />
      <div className="organ-inspector liquid-glass">{organs.map((item,i)=><Panel key={item.id} name="organ" id={item.id} selected={organ}><span className="organ-number" aria-hidden="true">0{i+1}</span><div><p className="eyebrow">{item.name}</p><h3>{item.role}</h3><p>{item.copy}</p></div></Panel>)}</div>
    </section>
    <section id="integrations" className="architecture-section" aria-labelledby="integrations-title">
      <Heading eyebrow={pageCopy.integrations.eyebrow} title={<span id="integrations-title">{pageCopy.integrations.headline}</span>}>{pageCopy.integrations.intro}</Heading>
      <div className="integration-grid">{integrations.map(item=><article className="integration-card liquid-glass" key={item.id}><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div>
    </section>
    <section id="availability" className="architecture-section" aria-labelledby="availability-title">
      <Heading eyebrow="Availability and evidence" title={<span id="availability-title">See what you can evaluate today.</span>}>This page introduces the neutral v2 source preview. Public release follows the engine's acceptance criteria; each optional adapter keeps its own support evidence.</Heading>
      <div className="availability-scroll" role="region" aria-label="Capability and qualification matrix" tabIndex="0"><table className="availability-table"><caption>Current source preview and qualification targets</caption><thead><tr><th scope="col">Capability</th><th scope="col">Availability</th><th scope="col">What to check</th></tr></thead><tbody>{availability.map(item=><tr key={item.capability}><th scope="row">{item.capability}</th><td>{item.state}</td><td>{item.detail}</td></tr>)}</tbody></table></div>
    </section>
    <section id="get-started" className="architecture-section" aria-labelledby="start-title">
      <Heading eyebrow={pageCopy.getStarted.eyebrow} title={<span id="start-title">{pageCopy.getStarted.headline}</span>}>{pageCopy.getStarted.intro}</Heading>
      <div className="closing-grid"><div className="setup-copy"><h3>{pageCopy.getStarted.guideHeading}</h3><p>{pageCopy.getStarted.guideBody}</p><a className="button primary" href={guide}>{pageCopy.getStarted.primaryCTA}</a><a className="text-link" href={github}>{pageCopy.getStarted.secondaryCTA}</a></div><div className="setup-panel liquid-glass"><p className="eyebrow">{pageCopy.getStarted.previewEyebrow}</p><pre><code>{"git clone --branch codex/generic-glove-20261104 https://github.com/Sheshiyer/temperance_engine.git\ncd temperance_engine\nbun package/install-surface/src/composition/engine-cli.ts doctor --json"}</code></pre><p>{pageCopy.getStarted.previewBody}</p></div></div>
    </section>
    <section id="faq" className="architecture-section faq-section" aria-labelledby="faq-title">
      <Heading eyebrow={pageCopy.faq.eyebrow} title={<span id="faq-title">{pageCopy.faq.headline}</span>}>{pageCopy.faq.intro}</Heading>
      <div className="faq-list">{faqs.map(item=><details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
      <a className="text-link" href={guide+"#qualification"}>{pageCopy.faq.compatibilityCTA}</a>
    </section>
    <section id="launch" className="architecture-section launch-section" aria-labelledby="launch-title">
      <div className="launch-copy"><p className="eyebrow">{pageCopy.launch.eyebrow}</p><h2 id="launch-title">{pageCopy.launch.headline.split('\n').map((line,i)=><span key={line}>{i>0 && <br />}{line}</span>)}</h2><p>{pageCopy.launch.intro}</p></div>
      <a className="button primary" href={guide}>Read the v2 guide ↗</a>
      <div className="product-hunt-widget"><p className="eyebrow">{pageCopy.launch.badgeEyebrow}</p><a className="product-hunt-badge" href="https://www.producthunt.com/products/temperance-engine?launch=temperance-engine"><img className="product-hunt-official" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1301098&theme=light" width="250" height="54" alt="" loading="lazy" /><span className="product-hunt-fallback">{pageCopy.launch.badgeCTA}</span></a></div>
      <footer className="site-footer"><a className="footer-brand" href="https://thoughtseed.space/" aria-label="Visit Thoughtseed"><img className="footer-lockup" src="/brand/thoughtseed-logo-lockup.png" alt="Thoughtseed" width="240" height="60" loading="lazy" /></a><p>{pageCopy.footer.attribution}</p><a href={github}>{pageCopy.footer.githubCTA}</a></footer>
    </section>
  </main>;
}
