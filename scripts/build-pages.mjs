import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const nextBin = path.join(repoRoot, "node_modules", "next", "dist", "bin", "next");
const baseRoot = normalizeBase(process.env.PAGES_BASE_PATH ?? "");

const designs = [
  { slug: "skeuomorphic", label: "Skeuomorphic", description: "A familiar, tactile operations desk with physical cues." },
  { slug: "neumorphic", label: "Neumorphic", description: "Soft surfaces and quiet relief for a calm system view." },
  { slug: "glassmorphic", label: "Glassmorphic", description: "Layered translucent panels for connected visibility." },
  { slug: "claymorphic", label: "Claymorphic", description: "Friendly, dimensional modules with a soft crafted feel." },
  { slug: "minimalist", label: "Minimalist", description: "Focused hierarchy for the one process worth fixing first." },
  { slug: "maximalist", label: "Maximalist", description: "High-energy signals for a business with many moving parts." },
  { slug: "brutalist", label: "Brutalist", description: "Direct language, hard edges, and operational truth." },
  { slug: "liquid", label: "Liquid", description: "A fluid visual system for work that keeps moving." },
  { slug: "bento", label: "Bento", description: "Purposeful compartments that make system hierarchy visible." },
  { slug: "spatial", label: "Spatial UI", description: "Layered windows and depth cues for context in view." },
];

fs.rmSync(docsDir, { recursive: true, force: true });
fs.mkdirSync(docsDir, { recursive: true });
fs.writeFileSync(path.join(docsDir, ".nojekyll"), "");

for (const design of designs) {
  const variantDir = path.join(repoRoot, "variants", design.slug);
  const outDir = path.join(variantDir, "out");
  const targetDir = path.join(docsDir, design.slug);
  const designBase = `${baseRoot}/${design.slug}`;

  fs.rmSync(outDir, { recursive: true, force: true });
  const result = spawnSync(process.execPath, [nextBin, "build"], {
    cwd: variantDir,
    env: { ...process.env, PAGES_BASE_PATH: designBase },
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  fs.cpSync(outDir, targetDir, { recursive: true });
}

fs.writeFileSync(path.join(docsDir, "index.html"), renderGallery(baseRoot));

function normalizeBase(value) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

function renderGallery(base) {
  const cards = designs.map((design, index) => {
    const href = `${base}/${design.slug}/`;
    return `<article class="card card-${index + 1}">
      <div class="card-meta"><span>${String(index + 1).padStart(2, "0")}</span><span>VF / ${design.slug.toUpperCase()}</span></div>
      <div><h2>${design.label}</h2><p>${design.description}</p></div>
      <div class="card-links"><a href="${href}">Explore design <b>↗</b></a><a href="${href}airtable/">Airtable route</a><a href="${href}construction/">Construction route</a></div>
    </article>`;
  }).join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>VisionaryFunnels — Design gallery</title>
  <meta name="description" content="Ten visual directions for the VisionaryFunnels operating-systems site.">
  <style>
    :root{color-scheme:dark;--ink:#eff3fb;--muted:#aebbd0;--line:rgba(239,243,251,.18);--bg:#10182b;--panel:#182541;--blue:#6f8cff;--lime:#e9f17c;--coral:#ff8878}
    *{box-sizing:border-box}html{background:var(--bg)}body{margin:0;color:var(--ink);background:radial-gradient(circle at 86% 8%,rgba(111,140,255,.25),transparent 28rem),radial-gradient(circle at 6% 78%,rgba(255,136,120,.14),transparent 28rem),var(--bg);font:16px/1.55 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{width:min(1240px,calc(100% - 48px));margin:0 auto;padding:76px 0 84px}.top{display:flex;align-items:flex-end;justify-content:space-between;gap:32px;margin-bottom:44px}.eyebrow{margin:0 0 14px;color:var(--lime);font:700 .72rem/1.3 "Courier New",monospace;letter-spacing:.14em;text-transform:uppercase}.top h1{max-width:780px;margin:0;color:#fff;font-size:clamp(3.2rem,8vw,7rem);letter-spacing:-.09em;line-height:.88}.top h1 em{color:var(--blue);font-style:normal}.intro{max-width:350px;margin:0;color:var(--muted);font-size:.95rem}.grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:16px}.card{min-height:260px;display:flex;flex-direction:column;justify-content:space-between;grid-column:span 4;padding:22px;border:1px solid var(--line);border-radius:24px;background:linear-gradient(145deg,rgba(255,255,255,.11),rgba(255,255,255,.035));box-shadow:0 18px 32px rgba(0,0,0,.18),inset 0 1px rgba(255,255,255,.15);transition:transform .2s ease,border-color .2s ease}.card:hover{transform:translateY(-5px);border-color:rgba(233,241,124,.62)}.card-1,.card-6{grid-column:span 6;min-height:320px}.card-2,.card-7{background:linear-gradient(145deg,rgba(111,140,255,.24),rgba(255,255,255,.035))}.card-3,.card-8{background:linear-gradient(145deg,rgba(233,241,124,.2),rgba(255,255,255,.035))}.card-4,.card-9{background:linear-gradient(145deg,rgba(79,190,166,.2),rgba(255,255,255,.035))}.card-5,.card-10{background:linear-gradient(145deg,rgba(255,136,120,.19),rgba(255,255,255,.035))}.card-meta,.card-links{display:flex;align-items:center;flex-wrap:wrap;gap:10px;color:var(--muted);font:700 .64rem/1.3 "Courier New",monospace;letter-spacing:.06em;text-transform:uppercase}.card-meta span:first-child{display:grid;place-items:center;width:28px;height:28px;color:var(--ink);background:rgba(255,255,255,.12);border:1px solid var(--line);border-radius:9px}.card h2{margin:0 0 8px;font-size:clamp(1.5rem,2.8vw,2.3rem);letter-spacing:-.06em}.card p{max-width:28rem;margin:0;color:var(--muted)}.card-links{padding-top:16px;border-top:1px solid var(--line)}.card-links a{color:var(--ink);text-decoration:none}.card-links a:hover{color:var(--lime)}.card-links b{color:var(--coral);font-size:1rem}.footer{margin-top:28px;color:var(--muted);font-size:.8rem}.footer a{color:var(--lime)}@media(max-width:780px){main{width:min(100% - 30px);padding-top:44px}.top{display:block;margin-bottom:32px}.intro{margin-top:24px}.grid{grid-template-columns:1fr}.card,.card-1,.card-6{grid-column:1/-1;min-height:240px}.card:hover{transform:none}.card-links{gap:8px 14px}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition-duration:.01ms!important}.card:hover{transform:none}}
  </style>
</head>
<body><main><div class="top"><div><p class="eyebrow">VisionaryFunnels / 10 visual directions</p><h1>One operating system.<br><em>Ten ways to see it.</em></h1></div><p class="intro">A route-complete design study for connected business operations. Choose a direction, then inspect its Airtable and Construction proof routes.</p></div><section class="grid" aria-label="Design directions">${cards}</section><p class="footer">Built as a static GitHub Pages gallery. Server-side lead capture stays out of this static deployment; booking handoff remains available in each design.</p></main></body></html>`;
}
