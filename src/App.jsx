import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const github = "https://github.com/Sheshiyer/temperance_engine";
const docs = `${github}/blob/main`;
const poster = "/assets/temperance-hero-poster.png";
const video = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4";
const capabilities = [
  ["Project context", "Bring selected projects and their operating instructions into view. Explicit project approvals keep access under your control."],
  ["Reusable skills", "Find specialist capabilities through the skill-cluster resolver, with discovery and lazy loading instead of loading every skill at startup."],
  ["Structured workflows", "Give work a visible path from intent to evidence. PAI supplies the work loop; optional GSD supplies a planning backbone."],
  ["Model routing", "Connect the operator workflow to OmniRoute. The gateway owns provider credentials, models, combos, and failover."],
  ["Verification", "Inspect install state, prerequisite holds, and local health. Keep tool evidence beside the criteria it supports."],
];
const workflow = [
  ["01", "Intent", "Name the outcome and inspect the project context before choosing work."],
  ["02", "Plan", "Make the desired state and its verification criteria explicit."],
  ["03", "Selected work", "Use the relevant skills and tools within the approvals for that step."],
  ["04", "Verification", "Check the result against the criteria with attributable evidence."],
  ["05", "Learning", "Review what happened and propose the next action for the operator."],
];
const artwork = [
  ["Context", "Project instructions", "/assets/temperance-guarded-runtime.png"],
  ["Skills", "Discover capabilities", "/assets/temperance-runtime-panel.png"],
  ["Structure", "CodeGraph search", "/assets/temperance-codegraph-map.png"],
  ["Evidence", "Inspect the result", "/assets/temperance-evidence-loop.png"],
  ["Recovery", "Backup-first setup", "/assets/temperance-rollback-posture.png"],
];
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
export default function App() {
  const page = useRef(null);
  const player = useRef(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
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
        <div className="hero-actions"><a className="button primary" href="#workflow">Explore the workflow <span aria-hidden="true">↗</span></a><a className="button ghost" href="#get-started">Get started</a></div>
        <p className="hero-note">For developers and small teams working across AI coding clients.</p>
      </div>
      {!mediaFailed && <button className="motion-toggle" type="button" onClick={toggleVideo} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? "Pause motion" : "Play motion"}</button>}
    </section>
    <section id="operating-layer" className="reference-section" aria-labelledby="layer-title">
      <Reveal className="section-heading"><p className="eyebrow">The shared operating layer</p><h2 id="layer-title">The pieces around your agents, working together.</h2><p>Your tools can change. Your projects still need context, a plan, the right capabilities, and a way to check the result.</p></Reveal>
      <div className="reference-grid">{capabilities.map(([name, copy], i) => <Reveal className="reference-card liquid-glass" key={name} delay={i * 35}><span>{String(i + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{copy}</p></Reveal>)}</div>
      <div className="asset-deck" aria-label="Illustrations of the operating layer">{artwork.map(([title, type, src], i) => <figure className="asset-card" key={title} style={{ "--tilt": `${(i - 2) * 2.5}deg` }}><img src={src} alt="" loading="lazy" width="480" height="480" /><figcaption><span>{type}</span><strong>{title}</strong></figcaption></figure>)}</div>
      <p className="art-note">Conceptual artwork of the operating layer.</p>
    </section>
    <section id="workflow" className="system-section" aria-labelledby="workflow-title">
      <Reveal className="section-heading"><p className="eyebrow">From intent to evidence</p><h2 id="workflow-title">A visible path through the work.</h2><p>A shared work loop makes it easier to see what was requested, which step is selected, and what the result actually proves.</p></Reveal>
      <ol className="phase-strip">{workflow.map(([number, title, copy], i) => <li key={number}><Reveal className="phase-tile" delay={i * 35}><span>{number}</span><h3>{title}</h3><p>{copy}</p></Reveal></li>)}</ol>
      <div className="bento-grid">
        <Reveal className="bento-card intro-card"><p className="eyebrow">One operating contract</p><h3>Keep the way of working visible.</h3><p>PAI provides the current-state to ideal-state work loop. GSD is an optional, external planning backbone. Temperance connects the selected surfaces and integrations around them.</p><a href={`${docs}/docs/pai-flow.md`}>Read the work-loop architecture ↗</a></Reveal>
        <Reveal className="bento-card stat-card cream"><span className="workflow-sigil" aria-hidden="true">☿</span><h3>Operator in the loop.</h3><p>The selected workflow still respects its approval boundaries. A plan or health observation does not authorize execution.</p></Reveal>
        <Reveal className="bento-card evidence-card"><img className="evidence-art" src="/assets/temperance-evidence-loop.png" alt="" loading="lazy" width="640" height="640" /><strong>Keep the evidence with the outcome.</strong><p>Verification supports a specific claim. Review lessons before choosing the next action; learning does not silently update canonical knowledge.</p></Reveal>
      </div>
    </section>
    <section id="integrations" className="reference-section" aria-labelledby="integrations-title">
      <Reveal className="section-heading"><p className="eyebrow">Choose your setup</p><h2 id="integrations-title">A shared layer. Your choice of tools.</h2><p>Enable the client surfaces and capabilities your host supports. Integrations have their own prerequisites and owners.</p></Reveal>
      <div className="integration-grid">
        <Reveal className="integration-card liquid-glass"><span className="eyebrow">Client surfaces</span><h3>Work across your coding tools.</h3><p>OpenCode and Cursor are primary instruction surfaces. Claude Code and Codex are opt-in; the GSD spine provides wrappers for Claude Code, Codex, OpenCode, and Grok when installed. Availability depends on your selected setup.</p><a href={`${docs}/docs/gsd-manifest-spine.md`}>Client and spine setup ↗</a></Reveal>
        <Reveal className="integration-card liquid-glass"><span className="eyebrow">Capabilities</span><h3>Connect what the work needs.</h3><p>OmniRoute is the default routing integration in 0.8.0. CodeGraph supports structural search where configured. Skill-cluster discovery, local phase feedback, and personal profiles remain explicit setup choices.</p><a href={`${docs}/docs/COMPATIBILITY.md`}>Compatibility and dependencies ↗</a></Reveal>
      </div>
      <details className="release-boundary"><summary>Release 0.8.0: qualification and ownership</summary><p>The public release adds an organ registry and uses OmniRoute as its default router. PAI, GSD, OmniRoute, and the connected clients retain their own ownership; provider credentials and routing state belong to the gateway. Private Noesis/Cambium profiles are optional and are not bundled.</p><p>The v1.1 clean-host milestone, live hosted-router authentication, qualified long-context sessions, and durable checkpoint recovery remain held. Installation state and live host health need their own verification.</p><a href={`${docs}/CHANGELOG.md#080---2026-10-13`}>Read the release boundaries ↗</a></details>
    </section>
    <section id="get-started" className="standard-section" aria-labelledby="start-title">
      <div className="closing-grid">
        <Reveal className="closing-copy liquid-glass"><p className="eyebrow">Get started</p><h2 id="start-title">Build your operator setup, deliberately.</h2><p>Review the public source, preview the installer’s changes, and use guided onboarding to choose your projects, capabilities, and integrations.</p><a className="button primary" href={github}>Explore Temperance on GitHub ↗</a><a className="text-link" href={`${docs}/package/install-surface/docs/guided-onboarding.md`}>Read the onboarding guide</a></Reveal>
        <Reveal className="setup-panel liquid-glass"><span className="eyebrow">Review → preview → configure → verify</span><pre><code>{"git clone https://github.com/Sheshiyer/temperance_engine.git\ncd temperance_engine\n./install.sh --dry-run --skip-voice\n# Review the preview, then choose your install options.\n./install.sh\n./verify.sh"}</code></pre><p>Back up existing configuration before replacement. Voice is optional. Review the installer and rollback documentation before applying changes.</p><a href={`${docs}/QUICKSTART.md`}>Quick start and install options ↗</a><a href={`${docs}/package/install-surface/docs/agent-operations.md`}>Agent flow, health checks, and local logs ↗</a></Reveal>
      </div>
      <footer className="site-footer liquid-glass" aria-label="Thoughtseed attribution"><a className="footer-brand" href="https://thoughtseed.space/" aria-label="Visit Thoughtseed"><img className="footer-lockup" src="/brand/thoughtseed-logo-lockup.png" alt="Thoughtseed" width="240" height="60" loading="lazy" /></a><div className="footer-copy"><span>Done by Thoughtseed.</span><p>Temperance Engine · AI operator system</p></div><a className="footer-link" href={github}>Source & documentation ↗</a></footer>
    </section>
  </main>;
}
