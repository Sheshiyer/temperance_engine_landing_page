import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const requiredFiles = ["index.html", "tsconfig.json", "src/main.jsx", "src/App.jsx", "src/styles.css", "public/robots.txt", "public/sitemap.xml"];
const requiredAssets = [
  "public/assets/temperance-hero-poster.png",
  "public/assets/temperance-runtime-panel.png",
  "public/assets/temperance-guarded-runtime.png",
  "public/assets/temperance-evidence-loop.png",
  "public/assets/temperance-codegraph-map.png",
  "public/assets/temperance-rollback-posture.png",
  "public/brand/thoughtseed-logo-lockup.png",
  "public/brand/thoughtseed-mark.png",
];

const checks = [
  ...requiredFiles.map((file) => ({
    label: `${file} exists`,
    pass: existsSync(join(root, file)),
  })),
];

const readIfExists = (file) => existsSync(join(root, file))
  ? readFileSync(join(root, file), "utf8")
  : "";

const app = readIfExists("src/App.jsx");
const css = readIfExists("src/styles.css");
const html = readIfExists("index.html");
const robots = readIfExists("public/robots.txt");
const sitemap = readIfExists("public/sitemap.xml");

checks.push(
  ...requiredAssets.map((file) => ({
    label: `${file} exists`,
    pass: existsSync(join(root, file)),
  })),
  { label: "page title names Temperance Engine", pass: html.includes("Temperance Engine") },
  { label: "page title attributes Thoughtseed", pass: html.includes("Temperance Engine | Done by Thoughtseed") },
  { label: "html defines inline favicon", pass: html.includes('rel="icon"') && html.includes("data:image/svg+xml") },
  { label: "html defines canonical Thoughtseed URL", pass: html.includes('rel="canonical"') && html.includes("https://thoughtseed.space/temperance-engine/") },
  { label: "html defines SEO robots metadata", pass: html.includes('name="robots"') && html.includes("max-image-preview:large") },
  { label: "html defines OG metadata", pass: html.includes('property="og:title"') && html.includes('property="og:image"') && html.includes('og:image:width') && html.includes('og:image:height') },
  { label: "html defines Twitter metadata", pass: html.includes('name="twitter:card"') && html.includes('name="twitter:site"') && html.includes('name="twitter:url"') },
  { label: "html defines JSON-LD schema", pass: html.includes('application/ld+json') && html.includes('SoftwareApplication') && html.includes('Thoughtseed') },
  { label: "robots points at Thoughtseed sitemap", pass: robots.includes("Sitemap: https://thoughtseed.space/temperance-engine/sitemap.xml") },
  { label: "sitemap lists canonical Temperance page", pass: sitemap.includes("<loc>https://thoughtseed.space/temperance-engine/</loc>") },
  { label: "footer attributes work to Thoughtseed", pass: app.includes("Done by Thoughtseed") && app.includes("thoughtseed.space") && app.includes("/brand/thoughtseed-logo-lockup.png") && app.includes("/brand/thoughtseed-mark.png") },
  { label: "hero links to public GitHub repo", pass: app.includes("https://github.com/Sheshiyer/temperance_engine") },
  { label: "hero names safer inference loop", pass: app.includes("A safer inference loop for your machine") },
  { label: "copy explains one-time installer", pass: app.includes("one-time installer") && app.includes("guarded PAI templates") },
  { label: "copy explains install route verify loop", pass: app.includes("Install → Route → Verify") },
  { label: "copy explains backup-first setup", pass: app.includes("Backup-first") && app.includes("timestamped backups") },
  { label: "copy names CodeGraph", pass: app.includes("CodeGraph") },
  { label: "copy names skill clusters", pass: app.includes("skill-cluster") || app.includes("Skill-cluster") },
  { label: "copy names peon-ping", pass: app.includes("peon-ping") },
  { label: "copy explains dry-run and verify", pass: app.includes("./install.sh --dry-run --skip-voice") && app.includes("./verify.sh") },
  { label: "copy explains rollback posture", pass: app.includes("Rollback") && app.includes("rollback") },
  { label: "copy removed visible design-reference scaffolding", pass: !app.includes("MotionSites") && !app.includes("Design reference") && !app.includes("Second pass standard") && !app.includes("beautiful motionsites") },
  { label: "hero uses requested CloudFront MP4", pass: app.includes("hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4") && app.includes("heroVideoUrl") },
  { label: "supporting media uses local generated image assets", pass: requiredAssets.every((file) => app.includes(file.replace("public", ""))) },
  { label: "supporting media avoids borrowed remote image domains", pass: !app.includes("res.cloudinary.com") && !app.includes("images.higgs.ai") && !app.includes("image.mux.com") && !app.includes("motionsites.ai/assets") && !app.includes("stream.mux.com") && !app.includes("video_preview_url") },
  { label: "supporting media avoids retired remote asset ids", pass: !app.includes("hf_20260515_092045") && !app.includes("hf_20260515_092102") && !app.includes("hf_20260528_154759") && !app.includes("hf_20260603_073200") },
  { label: "html preconnects only required remote media origin", pass: !html.includes("https://res.cloudinary.com") && !html.includes("https://images.higgs.ai") && html.includes("https://d8j0ntlcm91z4.cloudfront.net") },
  { label: "app uses GSAP ScrollTrigger", pass: app.includes("gsap.registerPlugin(ScrollTrigger, useGSAP)") && app.includes("scrollTrigger") && app.includes("useGSAP") },
  { label: "redesign has product capability cards", pass: app.includes("capabilityCards") && app.includes("Guarded templates") },
  { label: "redesign includes dense bento composition", pass: app.includes("bento-grid") && app.includes("evidence-card") },
  { label: "redesign has product copy sections", pass: app.includes("What it installs") && app.includes("How to evaluate it") },
  { label: "app implements GSAP reveal behavior", pass: app.includes(".reveal") && app.includes("data-reveal-delay") && app.includes("toggleActions") },
  { label: "app implements typewriter behavior", pass: app.includes("useTypewriter") },
  { label: "app implements cursor trail behavior", pass: app.includes("trailMarks") },
  { label: "app implements pointer parallax", pass: app.includes("pointerParallax") },
  { label: "css includes cinematic film grain", pass: css.includes("film-grain") },
  { label: "css includes liquid glass styling", pass: css.includes("liquid-glass") },
  { label: "css includes editorial typography system", pass: css.includes("--font-display") && css.includes("--font-body") },
  { label: "css includes typography measurement guardrails", pass: css.includes("max-width: 65ch") && css.includes("text-wrap: balance") },
  { label: "css honors reduced motion", pass: css.includes("prefers-reduced-motion") },
  { label: "css includes responsive mobile breakpoint", pass: css.includes("@media (max-width: 720px)") },
);

const failed = checks.filter((check) => !check.pass);

for (const check of checks) {
  console.log(`${check.pass ? "PASS" : "FAIL"} ${check.label}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} page verification checks failed.`);
  process.exit(1);
}

console.log("\nAll page verification checks passed.");
