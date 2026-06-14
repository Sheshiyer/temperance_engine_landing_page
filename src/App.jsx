import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const githubUrl = "https://github.com/Sheshiyer/temperance_engine";
const thoughtseedUrl = "https://thoughtseed.space";
const heroVideoUrl = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4";
const heroPosterUrl = "/assets/temperance-hero-poster.png";

const BG_IMAGE_1 = "/assets/temperance-codegraph-map.png";
const BG_IMAGE_2 = "/assets/temperance-evidence-loop.png";
const SPOTLIGHT_R = 260;

const capabilityCards = [
  {
    name: "Guarded templates",
    copy: "Installs NOESIS-style instruction surfaces for Claude, Codex, and OpenCode without copying private memory.",
  },
  {
    name: "Backup-first writes",
    copy: "Copies existing target files into timestamped backups before replacing local runtime configuration.",
  },
  {
    name: "CodeGraph routing",
    copy: "Routes structural search for .agents through a local AST index instead of brittle text search.",
  },
  {
    name: "Skill-cluster resolver",
    copy: "Keeps startup context lean while preserving explicit discovery of specialized capabilities.",
  },
  {
    name: "Local phase feedback",
    copy: "Adds a small localhost Pulse endpoint and optional peon-ping routing when local packs exist.",
  },
];

const collectedAssets = [
  {
    title: "Guarded runtime",
    type: "Instruction surface",
    src: "/assets/temperance-guarded-runtime.png",
  },
  {
    title: "Evidence loop",
    type: "Verification habit",
    src: "/assets/temperance-evidence-loop.png",
  },
  {
    title: "Structural search",
    type: "CodeGraph path",
    src: "/assets/temperance-codegraph-map.png",
  },
  {
    title: "Skill routing",
    type: "Cluster resolver",
    src: "/assets/temperance-runtime-panel.png",
  },
  {
    title: "Rollback posture",
    type: "Safe install",
    src: "/assets/temperance-rollback-posture.png",
  },
];

const trailAssets = [
  {
    title: "Backup snapshot",
    type: "Before write",
    src: "/assets/temperance-rollback-posture.png",
  },
  {
    title: "CodeGraph route",
    type: "Search path",
    src: "/assets/temperance-codegraph-map.png",
  },
  {
    title: "Skill resolver",
    type: "Capability map",
    src: "/assets/temperance-runtime-panel.png",
  },
  {
    title: "Verify evidence",
    type: "Safety check",
    src: "/assets/temperance-evidence-loop.png",
  },
  {
    title: "Guarded template",
    type: "Runtime surface",
    src: "/assets/temperance-guarded-runtime.png",
  },
];

const installSteps = [
  ["01", "Review", "Read the public scripts, docs, credits, and touched config surfaces before install."],
  ["02", "Dry-run", "Preview backup paths and target writes with --dry-run --skip-voice."],
  ["03", "Install", "Apply guarded templates, Pulse compatibility, resolver guidance, and CodeGraph routing."],
  ["04", "Verify", "Run verify.sh to check files, syntax, docs, and unsafe local path leaks."],
  ["05", "Rollback", "Use timestamped backups when a local runtime needs to return to its previous state."],
];

const modules = [
  ["Templates", "Claude, Codex, and OpenCode receive the same visible operating contract."],
  ["Search", "CodeGraph handles structural questions in .agents with symbol-aware lookup."],
  ["Skills", "The resolver finds specialized skills without scanning every archived prompt at startup."],
  ["Voice", "peon-ping is optional, local, and skipped safely when packs are absent."],
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useTypewriter(text, speed = 26, startDelay = 380) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      setDone(true);
      return undefined;
    }

    let index = 0;
    let intervalId;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          window.clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [reducedMotion, speed, startDelay, text]);

  return { displayed, done };
}

function usePointerParallax() {
  const [pointerParallax, setPointerParallax] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const handlePointerMove = useCallback((event) => {
    if (reducedMotion) {
      return;
    }

    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    setPointerParallax({ x, y });
  }, [reducedMotion]);

  return { pointerParallax, handlePointerMove };
}

function RevealLayer({ image, cursorX, cursorY }) {
  const canvasRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(
      cursorX, cursorY, 0,
      cursorX, cursorY, SPOTLIGHT_R
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,1)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.75)");
    gradient.addColorStop(0.75, "rgba(255,255,255,0.4)");
    gradient.addColorStop(0.88, "rgba(255,255,255,0.12)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    const maskUrl = canvas.toDataURL();
    reveal.style.maskImage = `url(${maskUrl})`;
    reveal.style.webkitMaskImage = `url(${maskUrl})`;
    reveal.style.maskSize = "100% 100%";
    reveal.style.webkitMaskSize = "100% 100%";
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ display: "none" }} />
      <div
        ref={revealRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <div className={`reveal ${className}`} data-reveal-delay={delay}>
      {children}
    </div>
  );
}

function CursorConstellation() {
  const [trailMarks, setTrailMarks] = useState([]);
  const fieldRef = useRef(null);
  const lastSpawn = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    const cleanup = window.setInterval(() => {
      const now = Date.now();
      setTrailMarks((marks) => marks.filter((mark) => now - mark.createdAt < 1100));
    }, 80);

    return () => window.clearInterval(cleanup);
  }, [reducedMotion]);

  function handlePointerMove(event) {
    if (reducedMotion || !fieldRef.current) {
      return;
    }

    const now = Date.now();
    if (now - lastSpawn.current < 65) {
      return;
    }

    lastSpawn.current = now;
    const rect = fieldRef.current.getBoundingClientRect();
    setTrailMarks((marks) => [
      ...marks.slice(-24),
      {
        id: `${now}-${Math.random()}`,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        createdAt: now,
        asset: trailAssets[marks.length % trailAssets.length],
        rotation: (Math.random() - 0.5) * 18,
      },
    ]);
  }

  return (
    <div ref={fieldRef} className="constellation-panel liquid-glass" onPointerMove={handlePointerMove}>
      <div className="constellation-copy">
        <span>Runtime proof field</span>
        <strong>Trace evidence.</strong>
        <p>Move through the grid to surface the evidence Temperance Engine wants before local agent work: backups, CodeGraph routes, skill routing, and verify logs.</p>
      </div>
      {trailMarks.map((mark) => (
        <figure
          key={mark.id}
          className="trail-mark"
          aria-hidden="true"
          style={{
            left: mark.x,
            top: mark.y,
            transform: `translate(-50%, -50%) rotate(${mark.rotation}deg)`,
          }}
        >
          <img src={mark.asset.src} alt="" />
          <figcaption>
            <span>{mark.asset.type}</span>
            <strong>{mark.asset.title}</strong>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function AssetDeck() {
  return (
    <div className="asset-deck" aria-label="Temperance Engine runtime surfaces">
        {collectedAssets.map((asset, index) => (
          <figure key={asset.title} className="asset-card" style={{ "--tilt": `${(index - 2) * 2.5}deg` }}>
          <img src={asset.src} alt={`${asset.title} generated website asset`} loading="lazy" />
          <figcaption>
            <span>{asset.type}</span>
            <strong>{asset.title}</strong>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function App() {
  const pageRef = useRef(null);
  const { pointerParallax, handlePointerMove } = usePointerParallax();
  const { displayed, done } = useTypewriter(
    "Install once. Then every local agent run starts from clearer instructions, safer search defaults, explicit skill routing, and a verification-first habit.",
  );
  const heroStyle = useMemo(() => ({
    "--parallax-x": `${pointerParallax.x * 18}px`,
    "--parallax-y": `${pointerParallax.y * 18}px`,
  }), [pointerParallax]);

  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef(0);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  const handleMouseMove = useCallback((e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  useGSAP(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      gsap.set(".reveal", { autoAlpha: 1, y: 0, scale: 1 });
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.from(".hero-eyebrow, #hero-title, .hero-subtitle, .type-line, .hero-actions", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
      });

      gsap.to(".cinematic-video", {
        scale: 1.13,
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-cinema",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.fromTo(element,
          { autoAlpha: 0, y: 46, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            delay: Number(element.dataset.revealDelay || 0) / 1000,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, pageRef);

    return () => context.revert();
  }, { scope: pageRef });

  return (
    <main ref={pageRef} onPointerMove={handlePointerMove} style={heroStyle}>
      <section className="hero-cinema" aria-labelledby="hero-title">
        <div className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom" style={{ backgroundImage: `url(${BG_IMAGE_1})` }} />
        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />
        <div className="video-vignette" style={{ zIndex: 25 }} />
        <div className="film-grain" style={{ zIndex: 26 }} />

        <nav className="topbar liquid-glass" aria-label="Primary navigation" style={{ zIndex: 100 }}>
          <a className="brand-mark" href="#top" aria-label="Temperance Engine home">
            <span className="brand-sigil" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>L</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>Temperance Engine</span>
          </a>
          <div className="nav-links">
            <a href="#runtime">Runtime</a>
            <a href="#safety">Safety</a>
            <a href="#install">Install</a>
          </div>
          <a className="nav-cta" href={githubUrl}>GitHub</a>
        </nav>

        <div className="hero-content" id="top" style={{ zIndex: 50 }}>
          <p className="eyebrow hero-eyebrow" style={{ color: "#e8702a" }}>Local AI operator runtime</p>
          <h1 id="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>A safer inference loop for your machine.</h1>
          <p className="hero-subtitle">
            Temperance Engine is a one-time installer for guarded PAI templates, CodeGraph-first search, explicit skill-cluster routing, optional local phase audio, and rollback-ready setup.
          </p>
          <p className="type-line">
            {displayed}
            {!done && <span className="cursor" aria-hidden="true" />}
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button primary" href={githubUrl} style={{ background: "#e8702a", boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 18px 50px rgba(232, 112, 42, 0.3)" }}>Inspect the installer</a>
            <a className="button ghost" href="#install">See install path</a>
          </div>
        </div>
      </section>

      <section id="runtime" className="reference-section">
        <Reveal className="section-heading">
          <p className="eyebrow">What it installs</p>
          <h2>One public package for the pieces that usually live in hidden local sprawl.</h2>
        </Reveal>
        <div className="reference-grid">
          {capabilityCards.map((item, index) => (
            <Reveal key={item.name} className="reference-card liquid-glass" delay={index * 45}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.name}</h3>
              <p>{item.copy}</p>
            </Reveal>
          ))}
        </div>
        <AssetDeck />
      </section>

      <section id="safety" className="system-section">
        <Reveal className="section-heading narrow">
          <p className="eyebrow">Why it exists</p>
          <h2>Local agent work gets safer when the runtime is inspectable.</h2>
          <p>
            The package does not ship private memory or credentials. It makes the reusable scaffolding visible: what gets installed, how work is routed, how phase feedback is emitted, and how rollback happens if the local setup needs to unwind.
          </p>
        </Reveal>

        <div className="bento-grid">
          <Reveal className="bento-card intro-card" delay={0}>
            <p className="eyebrow">Mechanism</p>
            <h3>Install → Route → Verify</h3>
            <p>The installer sets the surfaces. The runtime routes context. The verifier proves the package is still safe to use.</p>
          </Reveal>

          <Reveal className="bento-card stat-card cream" delay={80}>
            <span className="stat">1</span>
            <p>reviewable installer instead of scattered manual edits.</p>
          </Reveal>

          <Reveal className="bento-card evidence-card" delay={130}>
            <div className="orbit-diagram" aria-hidden="true">
              {installSteps.map(([number, action]) => <span key={number}>{action.slice(0, 1)}</span>)}
            </div>
            <strong>Every write has a rollback story.</strong>
            <p>Dry-run first, backup before replacement, then verify with the shipped script.</p>
          </Reveal>

          <Reveal className="bento-card copy-card" delay={180}>
            <p>
              Temperance Engine is not an autonomous agent. It is the substrate around one: instructions, routing, local feedback, checks, and recovery paths.
            </p>
          </Reveal>

          <Reveal className="bento-card media-card" delay={220}>
            <img src={collectedAssets[2].src} alt="CodeGraph generated structural search asset" loading="lazy" />
            <div>
              <span>Runtime layer</span>
              <strong>Search, skill, signal</strong>
            </div>
          </Reveal>

          <Reveal className="bento-card module-list" delay={260}>
            {modules.map(([label, copy]) => (
              <article key={label}>
                <span>{label}</span>
                <p>{copy}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="install" className="standard-section">
        <Reveal className="section-heading">
          <p className="eyebrow">How to evaluate it</p>
          <h2>Review the installer like infrastructure, then run it like a local tool.</h2>
        </Reveal>

        <div className="phase-strip">
          {installSteps.map(([number, action, copy], index) => (
            <Reveal key={number} className="phase-tile" delay={index * 40}>
              <span>{number}</span>
              <strong>{action}</strong>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>

        <div className="closing-grid">
          <CursorConstellation />
          <Reveal className="closing-copy liquid-glass">
            <p className="eyebrow">Launch posture</p>
            <h2>Use the repo like infrastructure, not a mystery script.</h2>
            <p>
              Start with <code>./install.sh --dry-run --skip-voice</code>, inspect the backup target, then run <code>./verify.sh</code>. Voice is optional, credentials are not bundled, and rollback is documented.
            </p>
            <a className="button primary" href={githubUrl}>Open GitHub</a>
          </Reveal>
        </div>

        <footer className="site-footer liquid-glass" aria-label="Thoughtseed attribution">
          <a className="footer-brand" href={thoughtseedUrl} target="_blank" rel="noreferrer" aria-label="Visit Thoughtseed">
            <img className="footer-lockup" src="/brand/thoughtseed-logo-lockup.png" alt="Thoughtseed logo" loading="lazy" />
            <img className="footer-mark" src="/brand/thoughtseed-mark.png" alt="Thoughtseed mark" loading="lazy" />
          </a>
          <div className="footer-copy">
            <span>Done by Thoughtseed.</span>
            <p>Temperance Engine is presented as a local operator-runtime artifact from Thoughtseed Labs.</p>
          </div>
          <a className="footer-link" href={thoughtseedUrl} target="_blank" rel="noreferrer">thoughtseed.space</a>
        </footer>
      </section>
    </main>
  );
}

export default App;
