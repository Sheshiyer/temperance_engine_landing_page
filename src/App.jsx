import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { benefits, phases, koshas, organs, integrations, faqs } from "./architecture-data.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const github = "https://github.com/Sheshiyer/temperance_engine";
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
  const [phase, setPhase] = useState('observe');
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
        <p className="hero-subtitle">Keep project context, skills, model routing and a clear work loop together. Temperance Engine connects the pieces around your coding agents, so you can focus on the work you want to do.</p>
        <div className="hero-actions"><a className="button primary" href="#get-started">Get started <span aria-hidden="true">↗</span></a><a className="button ghost" href="#film">Watch the 30-second tour</a></div>
        <p className="hero-note">For developers and small teams working across AI coding clients.</p>
      </div>
      {!mediaFailed && !reduced && <button className="motion-toggle" type="button" onClick={toggleVideo} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? "Pause motion" : "Play motion"}</button>}
    </section>
    <section id="operating-layer" className="architecture-section product-overview" aria-labelledby="overview-title">
      <Heading eyebrow="A little more continuity" title={<span id="overview-title">Different tools. A familiar way forward.</span>}>The projects you care about outlast any one coding session. Give them a shared approach to context, capabilities and checking the result, with a setup you can make your own.</Heading>
      <div className="benefit-grid">{benefits.map((item,i)=><Reveal className="benefit-card" key={item.id}><span className="benefit-number">0{i+1}</span><h3>{item.name}</h3><p>{item.copy}</p></Reveal>)}</div>
      <figure id="film" className="architecture-film liquid-glass" aria-labelledby="architecture-film-title">
        <div className="film-heading"><p className="eyebrow">The system in 30 seconds</p><h3 id="architecture-film-title">See the pieces come together.</h3><p id="architecture-film-description">A short visual tour of the shared operating layer.</p></div>
        <video className="architecture-film-player" controls playsInline preload="none" width="1920" height="1080" poster="/assets/temperance-architecture-30s-poster.jpg" aria-labelledby="architecture-film-title" aria-describedby="architecture-film-description">
          <source src="/assets/temperance-architecture-30s.mp4" type="video/mp4" />
          <track kind="captions" src="/assets/temperance-architecture-30s-captions.vtt" srcLang="en" label="English descriptive captions" />
          Your browser does not support this video. Read the transcript below.
        </video>
        <figcaption><span>Temperance Engine · The architecture film</span><a href="/assets/temperance-architecture-30s-transcript.md">Read the transcript ↗</a></figcaption>
      </figure>
    </section>
    <section id="workflow" className="architecture-section" aria-labelledby="workflow-title">
      <Heading eyebrow="A clear work loop" title={<span id="workflow-title">From a request to a result you understand.</span>}>Seven phases make the work easier to follow. Explore the path through a simple keyboard-search improvement, from understanding the problem to bringing a useful lesson into the next project.</Heading>
      <Choices label="Work phase" name="phase" items={phases} selected={phase} onChange={setPhase} />
      <div className="phase-inspector liquid-glass">{phases.map((item,i)=><Panel key={item.id} name="phase" id={item.id} selected={phase}><div className="phase-story"><div className="phase-story-mark"><span aria-hidden="true">{item.sigil}</span><small>0{i+1} / 07</small></div><div><p className="eyebrow">{item.name}</p><h3>{item.headline}</h3><p>{item.copy}</p><div className="task-example"><span>Search example</span><p>{item.detail}</p></div></div></div></Panel>)}</div>
    </section>
    <section id="koshas" className="architecture-section kosha-section" aria-labelledby="koshas-title">
      <Heading eyebrow="Five Koshas" title={<span id="koshas-title">A richer view of the work.</span>}>Some work changes files. Some changes your understanding. The five Koshas describe these work layers, connecting practical responsibilities with a larger purpose.</Heading>
      <div className="kosha-layout"><Choices label="Kosha layer" name="kosha" items={koshas} selected={kosha} onChange={setKosha} /><div className="kosha-inspector">{koshas.map(item=><Panel key={item.id} name="kosha" id={item.id} selected={kosha}><span className="kosha-numeral" aria-hidden="true">{item.numeral}</span><p className="eyebrow">{item.name}</p><h3>{item.plain}</h3><p>{item.copy}</p><blockquote>{item.question}</blockquote><p className="sr-only">Primary phases: {phases.filter(p=>p.kosha===item.id).map(p=>p.name).join(', ')}</p><div className="phase-pills" aria-hidden="true">{phases.map(p=><span key={p.id} className={p.kosha===item.id?'active':''}>{p.name}</span>)}</div></Panel>)}</div></div>
    </section>
    <section id="organs" className="architecture-section" aria-labelledby="organs-title">
      <Heading eyebrow="Advisory organs" title={<span id="organs-title">Room for a more thoughtful system.</span>}>Temperance’s advisory architecture gives orientation, interpretation and learning a clear place around the work loop. Explore the six optional roles and the purpose behind each.</Heading>
      <Choices label="Advisory organ" name="organ" items={organs} selected={organ} onChange={setOrgan} />
      <div className="organ-inspector liquid-glass">{organs.map((item,i)=><Panel key={item.id} name="organ" id={item.id} selected={organ}><span className="organ-number" aria-hidden="true">0{i+1}</span><div><p className="eyebrow">{item.name}</p><h3>{item.role}</h3><p>{item.copy}</p></div></Panel>)}</div>
    </section>
    <section id="integrations" className="architecture-section" aria-labelledby="integrations-title">
      <Heading eyebrow="Build your own setup" title={<span id="integrations-title">The tools you choose, working with a shared method.</span>}>Start with a portable core and add the integrations that suit your work. Personal preferences and company connections can sit around that core without becoming a requirement for everyone.</Heading>
      <div className="integration-grid">{integrations.map(item=><article className="integration-card liquid-glass" key={item.id}><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div>
    </section>
    <section id="get-started" className="architecture-section" aria-labelledby="start-title">
      <Heading eyebrow="Get started" title={<span id="start-title">Start with one project.</span>}>Explore the project, preview your setup and choose what belongs in it. Begin with one project and a familiar coding tool; add capabilities as you find a use for them.</Heading>
      <div className="closing-grid"><div className="setup-copy"><h3>Start with the guide.</h3><p>Guided onboarding helps you understand the available integrations and their prerequisites. Review the installation preview, keep your existing configuration recoverable and verify the setup you selected.</p><a className="button primary" href="https://github.com/Sheshiyer/temperance_engine/blob/main/QUICKSTART.md">Read the getting-started guide ↗</a><a className="text-link" href={github}>Explore on GitHub ↗</a></div><div className="setup-panel liquid-glass"><p className="eyebrow">Preview your setup</p><pre><code>{"git clone https://github.com/Sheshiyer/temperance_engine.git\ncd temperance_engine\n./install.sh --dry-run --skip-voice"}</code></pre><p>See the proposed changes before you install. Choose the modules you need, then follow the guide to configure and verify them.</p></div></div>
    </section>
    <section id="faq" className="architecture-section faq-section" aria-labelledby="faq-title">
      <Heading eyebrow="A few useful answers" title={<span id="faq-title">Find your starting point.</span>}>Temperance is configurable. These answers can help you decide what to explore first and what to check for your own setup.</Heading>
      <div className="faq-list">{faqs.map(item=><details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
      <a className="text-link" href="https://github.com/Sheshiyer/temperance_engine/blob/main/docs/COMPATIBILITY.md">Compatibility and requirements ↗</a>
    </section>
    <section id="launch" className="architecture-section launch-section" aria-labelledby="launch-title">
      <div className="launch-copy"><p className="eyebrow">Follow the launch</p><h2 id="launch-title">A shared way to work.<br />An open invitation.</h2><p>Explore Temperance, tell us what would make your setup better, and join the conversation on Product Hunt.</p></div>
      <a className="product-hunt-badge" href="https://www.producthunt.com/products/temperance-engine?launch=temperance-engine"><span className="ph-mark" aria-hidden="true">P</span><span><small>Launching November 6</small><strong>Find us on Product Hunt</strong></span><span aria-hidden="true">↗</span></a>
      <footer className="site-footer"><a className="footer-brand" href="https://thoughtseed.space/" aria-label="Visit Thoughtseed"><img className="footer-lockup" src="/brand/thoughtseed-logo-lockup.png" alt="Thoughtseed" width="240" height="60" loading="lazy" /></a><p>Temperance Engine · Made by Thoughtseed.</p><a href={github}>GitHub ↗</a></footer>
    </section>
  </main>;
}
