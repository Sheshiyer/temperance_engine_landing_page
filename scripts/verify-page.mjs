import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
import { parse } from 'parse5';
import { build } from 'esbuild';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = process.cwd();
const canonical = 'https://temperance.thoughtseed.space/';
const html = await readFile(resolve(root, 'dist/index.html'), 'utf8');
await mkdir(resolve(root, '.cache'), {recursive:true});
const output = await build({entryPoints:[resolve(root, 'src/App.jsx')],bundle:true,platform:'node',format:'cjs',jsx:'automatic',external:['react','react-dom','react-dom/server','react/jsx-runtime'],write:false});
const renderedModule = resolve(root,'.cache/ssr-app.cjs');
await writeFile(renderedModule,output.outputFiles[0].text);
const {default:App} = createRequire(import.meta.url)(renderedModule);
const markup = renderToStaticMarkup(createElement(App));
function descendants(node) { return [node,...(node.childNodes||[]).flatMap(descendants)]; }
const nodes = descendants(parse(html));
const content = descendants(parse(markup));
const attr=(n,name)=>n.attrs?.find(a=>a.name===name)?.value;
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join('');
const metas=new Map(nodes.filter(n=>n.tagName==='meta').map(n=>[attr(n,'name')||attr(n,'property'),attr(n,'content')]));

test('built head uses one canonical domain and coherent social metadata',()=>{
  assert.equal(attr(nodes.find(n=>n.tagName==='link'&&attr(n,'rel')==='canonical'),'href'),canonical);
  assert.equal(metas.get('og:url'),canonical); assert.equal(metas.get('twitter:url'),canonical);
  assert.equal(metas.get('og:image'),`${canonical}og/temperance-engine-og.png`);
  assert.equal(metas.get('twitter:image'),metas.get('og:image'));
  assert.equal(metas.get('og:image:width'),'1200'); assert.equal(metas.get('og:image:height'),'630');
  const schema=JSON.parse(text(nodes.find(n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json')));
  assert.equal(schema.url,canonical); assert.equal(schema.softwareVersion,'0.8.0');
  assert.equal(schema.name,'Temperance Engine');
  assert.ok(!html.includes('thoughtseed.space/temperance-engine/'));
});
test('rendered page has one headline and all fifteen labelled architecture sections',()=>{
  assert.equal(content.filter(n=>n.tagName==='h1').length,1);
  assert.equal(text(content.find(n=>n.tagName==='h1')),'Give your AI tools a shared way to work.');
  const sections=content.filter(n=>n.tagName==='section'); assert.equal(sections.length,15);
  assert.deepEqual(sections.map(n=>attr(n,'id')),['top','operating-layer','architecture','koshas','workflow','organs','integrations','core-and-profile','routing','skills','memory','evidence','availability','get-started','faq']);
  for(const section of sections) assert.ok(content.some(n=>attr(n,'id')===attr(section,'aria-labelledby')));
  assert.match(text(content[0]),/AI operator system/);
  assert.ok(!text(content[0]).includes('Local installer for an OpenCode operator runtime'));
});
test('every rendered local anchor resolves and links have useful names',()=>{
  const ids=content.map(n=>attr(n,'id')).filter(Boolean);
  assert.equal(new Set(ids).size,ids.length);
  for(const link of content.filter(n=>n.tagName==='a')){
    const href=attr(link,'href'); assert.ok(href);
    if(href.startsWith('#')) assert.ok(ids.includes(href.slice(1)),`dangling anchor ${href}`);
    else if(href.startsWith('/assets/')) assert.match(href,/^\/assets\/temperance-architecture-30s-(transcript\.md|captions\.vtt)$/);
    else assert.equal(new URL(href).protocol,'https:');
    assert.ok((attr(link,'aria-label')||text(link)).trim());
  }
  assert.ok(!text(content[0]).includes('Log In')); assert.ok(!text(content[0]).includes('Pricing'));
});
test('rendered local images, font, and bundled assets are present in the build',async()=>{
  const paths=[...content.filter(n=>n.tagName==='img').map(n=>attr(n,'src')), ...nodes.filter(n=>n.tagName==='script'&&attr(n,'src')).map(n=>attr(n,'src')), ...nodes.filter(n=>n.tagName==='link'&&['stylesheet','preload','icon'].includes(attr(n,'rel'))).map(n=>attr(n,'href'))];
  for(const path of paths) { assert.ok(path.startsWith('/')); await access(resolve(root,`dist${path}`)); }
  const image=await readFile(resolve(root,'dist/og/temperance-engine-og.png'));
  assert.equal(image.readUInt32BE(16),1200); assert.equal(image.readUInt32BE(20),630);
  const video=content.find(n=>n.tagName==='video');
  assert.ok(video); assert.equal(attr(video,'poster'),'/assets/temperance-hero-poster.png');
});
test('release boundaries, optional integrations, and ownership remain explicit',()=>{
  const copy=text(content[0]);
  for(const phrase of ['v1.1 clean-host milestone','live hosted-router authentication','qualified long-context sessions','durable checkpoint recovery remain held','PAI','GSD','OmniRoute','opt-in']) assert.ok(copy.includes(phrase),phrase);
  assert.ok(copy.indexOf('Get started')<copy.indexOf('./install.sh'));
  assert.ok(copy.includes('Koshas'));
  assert.ok(copy.includes('descriptive work layers'));
  assert.ok(copy.includes('not processes or enforceable security partitions'));
  assert.ok(copy.includes('Superset and Constellation are retired'));
  assert.ok(copy.includes('This runner is not a sandbox'));
  assert.ok(copy.includes('Historical product-graph acceptance remains held'));
  assert.ok(copy.includes('canonical-memory updates'));
  assert.ok(copy.includes('Shipped identifies released source.'));
  assert.ok(copy.includes('separate installation, runtime and acceptance evidence.'));
  assert.equal(content.filter(n=>n.tagName==='p'&&attr(n,'class')==='sr-only'&&text(n).startsWith('Primary phases:')).length,5);
});
test('robots and sitemap use the same canonical website',async()=>{
  assert.match(await readFile(resolve(root,'dist/robots.txt'),'utf8'),/Sitemap: https:\/\/temperance\.thoughtseed\.space\/sitemap.xml/);
  const sitemap=await readFile(resolve(root,'dist/sitemap.xml'),'utf8');
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`)); assert.ok(!sitemap.includes('thoughtseed.space/temperance-engine/'));
});

test('reduced-motion rendering keeps the poster without an inoperative media control',()=>{
  const previousWindow=globalThis.window;
  try {
    globalThis.window={matchMedia:()=>({matches:true})};
    const reducedNodes=descendants(parse(renderToStaticMarkup(createElement(App))));
    const heroVideo=reducedNodes.find(n=>n.tagName==='video'&&attr(n,'class')==='cinematic-video');
    assert.equal(descendants(heroVideo).filter(n=>n.tagName==='source').length,0);
    assert.equal(reducedNodes.filter(n=>n.tagName==='video'&&attr(n,'class')==='architecture-film-player').length,1);
    assert.equal(reducedNodes.filter(n=>n.tagName==='button'&&attr(n,'class')==='motion-toggle').length,0);
    assert.ok(reducedNodes.some(n=>n.tagName==='img'&&attr(n,'class')==='hero-poster'));
  } finally {
    if(previousWindow===undefined) delete globalThis.window;
    else globalThis.window=previousWindow;
  }
  assert.equal(content.filter(n=>n.tagName==='button'&&attr(n,'class')==='motion-toggle').length,1);
});


test('educational selectors expose a single selected native radio and every target panel',()=>{
  const groups=content.filter(n=>n.tagName==='fieldset');
  assert.equal(groups.length,6);
  const expected={cycle:7,graph:5,kosha:5,phase:7,organ:6,profile:3};
  for(const [name,count] of Object.entries(expected)) {
    const radios=content.filter(n=>n.tagName==='input'&&attr(n,'name')===name);
    assert.equal(radios.length,count,name);
    assert.equal(radios.filter(n=>n.attrs?.some(a=>a.name==='checked')).length,1,name);
    for(const radio of radios) {
      assert.equal(attr(radio,'type'),'radio');
      const panel=content.find(n=>attr(n,'id')===attr(radio,'aria-controls'));
      assert.ok(panel,`missing panel for ${name}`);
      assert.ok(text(panel).trim().length>80,`empty explanation for ${name}`);
      assert.equal(panel.attrs.some(a=>a.name==='hidden'),!radio.attrs.some(a=>a.name==='checked'));
    }
  }
  assert.equal(content.filter(n=>n.tagName==='form').length,0);
});
test('architecture and organ content preserves owners, dependencies and evidence levels',()=>{
  const copy=text(content[0]);
  for(const phrase of ['Vestibule','Adytum','Nutrix','Auspex','Circulator','Praeceptor','Annamaya','Pranamaya','Manomaya','Vijnanamaya','Anandamaya','Genesis, Taste, Hands, Will, Cortex and Garden','Cambium owns WorkObjects, Gate, tenant admission and result lineage','portable product the “glove”','selected profile']) assert.ok(copy.includes(phrase),phrase);
  const table=content.find(n=>n.tagName==='table');
  const rows=descendants(table).filter(n=>n.tagName==='tr');
  assert.equal(rows.length,10);
  for(const state of ['Shipped','Draft','Held','Gap']) assert.ok(text(table).includes(state),state);
  assert.ok(text(table).includes('Review branch'));
  assert.ok(copy.includes('Actual-attempt evidence'));
  assert.ok(copy.includes('No cadence job is activated here'));
});
test('editorial body including all selectable panels stays within the architecture brief',()=>{
  const spacedText=n=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(spacedText).join(' ');
  const words=spacedText(content[0]).trim().split(/\s+/).length;
  assert.ok(words>=2500,`${words} words is below the expanded brief`);
  assert.ok(words<=5000,`${words} words exceeds the hard ceiling`);
  console.log(`Architecture editorial count: ${words} words including hidden panels and disclosures`);
});
test('source links pin released claims and no controls imply runtime execution',()=>{
  const links=content.filter(n=>n.tagName==='a').map(n=>attr(n,'href'));
  const sourceLinks=links.filter(h=>h.includes('/blob/'));
  assert.ok(sourceLinks.length>8);
  assert.ok(sourceLinks.every(h=>/\/blob\/(42b391b44b7655972d9322d87aa3865956a5165e|cf0583e863adba1758aa12b1b53e808087c6e417|d36da98bfc12783aa89710744d84e1046e8fbe4f)\//.test(h)));
  assert.ok(sourceLinks.some(h=>h.endsWith('/docs/plans/2026-11-02-portable-capabilities.md')));
  assert.ok(links.includes('https://www.producthunt.com/products/temperance-engine?launch=temperance-engine'));
  assert.equal(content.filter(n=>n.tagName==='button').length,1);
  for(const input of content.filter(n=>n.tagName==='input')) assert.equal(attr(input,'type'),'radio');
  assert.ok(!markup.includes('/Users/'));
  assert.ok(!markup.includes('127.0.0.1'));
});


test('architecture film is controlled, non-autoplay and has equivalent caption/transcript routes',async()=>{
  const film=content.find(n=>n.tagName==='video'&&attr(n,'class')==='architecture-film-player');
  assert.ok(film);
  assert.ok(film.attrs.some(a=>a.name==='controls'));
  assert.equal(film.attrs.some(a=>a.name==='autoplay'),false);
  assert.equal(film.attrs.some(a=>a.name==='loop'),false);
  assert.equal(attr(film,'preload'),'none');
  assert.equal(attr(film,'width'),'1920'); assert.equal(attr(film,'height'),'1080');
  assert.equal(attr(film,'poster'),'/assets/temperance-architecture-30s-poster.jpg');
  assert.ok(content.some(n=>attr(n,'id')===attr(film,'aria-labelledby')));
  assert.ok(content.some(n=>attr(n,'id')===attr(film,'aria-describedby')));
  const children=descendants(film);
  assert.equal(attr(children.find(n=>n.tagName==='source'),'src'),'/assets/temperance-architecture-30s.mp4');
  const captions=children.find(n=>n.tagName==='track');
  assert.equal(attr(captions,'kind'),'captions'); assert.equal(attr(captions,'srclang'),'en');
  assert.equal(attr(captions,'src'),'/assets/temperance-architecture-30s-captions.vtt');
  assert.ok(content.some(n=>n.tagName==='a'&&attr(n,'href')==='/assets/temperance-architecture-30s-transcript.md'));
  for(const path of ['/assets/temperance-architecture-30s.mp4','/assets/temperance-architecture-30s-poster.jpg','/assets/temperance-architecture-30s-captions.vtt','/assets/temperance-architecture-30s-transcript.md']) await access(resolve(root,`dist${path}`));
  const captionText=await readFile(resolve(root,'dist/assets/temperance-architecture-30s-captions.vtt'),'utf8');
  assert.ok(captionText.startsWith('WEBVTT'));
});
test('installed Claude tooling is a dated optional profile disclosure with exact alignment sources',()=>{
  const details=content.find(n=>n.tagName==='details'&&attr(n,'class')?.includes('tooling-details'));
  assert.ok(details); const copy=text(details);
  for(const phrase of ['Installed Claude plugins and skills','Feature Dev 1.0.1','rust-analyzer 1.0.0','Supabase 0.1.16','Superpowers 7.0.0','Temperance rail mod 0.11.0','ten disabled installations','155 exposed top-level skill entries','not bundled portable defaults','different evidence levels']) assert.ok(copy.includes(phrase),phrase);
  const urls=descendants(details).filter(n=>n.tagName==='a').map(n=>attr(n,'href'));
  for(const path of ['docs/architecture-explainer.md','CREDITS.md','docs/plans/2026-11-02-claude-tooling-metadata.json']) assert.ok(urls.includes(`https://github.com/Sheshiyer/temperance_engine/blob/d36da98bfc12783aa89710744d84e1046e8fbe4f/${path}`),path);
});
