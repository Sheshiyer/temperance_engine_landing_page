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
const officialProductHuntBadge = 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1301098&theme=light';
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
  const title=text(nodes.find(n=>n.tagName==='title'));
  assert.equal(title,'Temperance Engine — Bring your client. Keep your flow.');
  assert.ok(title.length < 75);
  assert.equal(metas.get('og:title'),title);assert.equal(metas.get('twitter:title'),title);
  assert.ok(metas.get('description').length >= 90 && metas.get('description').length <= 170);
  assert.equal(metas.get('og:description'),metas.get('description'));
  assert.equal(metas.get('twitter:description'),metas.get('description'));
  assert.equal(schema.description,metas.get('description'));
  assert.ok(!html.includes('thoughtseed.space/temperance-engine/'));
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
  for(const path of paths) {
    if(path === officialProductHuntBadge) continue;
    assert.ok(path.startsWith('/'), `Unapproved remote asset: ${path}`);
    await access(resolve(root,`dist${path}`));
  }
  const image=await readFile(resolve(root,'dist/og/temperance-engine-og.png'));
  assert.equal(image.readUInt32BE(16),1200); assert.equal(image.readUInt32BE(20),630);
  const video=content.find(n=>n.tagName==='video');
  assert.ok(video); assert.equal(attr(video,'poster'),'/assets/temperance-hero-poster.png');
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


test('product page has one clear promise and a focused, labelled journey',()=>{
  assert.equal(content.filter(n=>n.tagName==='h1').length,1);
  assert.equal(text(content.find(n=>n.tagName==='h1')),'Bring your client. Keep your flow.');
  const hero=content.find(n=>attr(n,'id')==='top');
  const actions=descendants(hero).filter(n=>n.tagName==='a'&&attr(n,'class')?.includes('button'));
  assert.equal(attr(actions[0],'href'),'https://github.com/Sheshiyer/temperance_engine/blob/codex/generic-glove-20261104/docs/generic-engine.md');
  assert.equal(text(actions[0]),'Read the v2 guide');
  assert.equal(text(descendants(hero).find(n=>n.tagName==='a'&&attr(n,'class')==='nav-cta')),'Read the v2 guide');
  assert.equal(attr(actions[1],'href'),'#core');
  const guide=content.find(n=>n.tagName==='a'&&attr(n,'href')==='https://github.com/Sheshiyer/temperance_engine/blob/codex/generic-glove-20261104/docs/generic-engine.md' && text(n).includes('↗'));
  assert.equal(text(guide),'Read the v2 guide ↗');
  const sections=content.filter(n=>n.tagName==='section');
  assert.ok(sections.length>=10 && sections.length<=16);
  for(const section of sections) assert.ok(content.some(n=>attr(n,'id')===attr(section,'aria-labelledby')));
  for(const id of ['operating-layer','core','workflow','koshas','organs','integrations','availability','get-started','faq']) assert.ok(sections.some(n=>attr(n,'id')===id),id);
  const spaced=n=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(spaced).join(' ');
  const copy=spaced(content[0]); const words=copy.trim().split(/\s+/).length;
  console.log(`Product editorial count: ${words} words including all interactive explanations`);
  // Inclusive markup count includes hidden panels, accessibility labels, navigation and phase pills.
  assert.ok(words>=2000 && words<=5000,`${words} words outside expanded editorial brief`);
  assert.doesNotMatch(copy,/sanitized metadata|155 exposed|ten disabled|canonical.memory/i);
  const table=content.find(n=>n.tagName==='table'&&attr(n,'class')==='availability-table');
  assert.ok(table); assert.match(text(table),/Qualification targets/);
  const ids=sections.map(n=>attr(n,'id'));
  assert.ok(ids.indexOf('core') < ids.indexOf('film-example'));
  assert.ok(ids.indexOf('workflow') < ids.indexOf('film-example'));
  assert.ok(ids.indexOf('availability') < ids.indexOf('get-started'));
  assert.match(text(hero),/v2 source preview/);
});
test('work phases, Koshas and advisory roles keep complete native keyboard selectors',()=>{
  assert.equal(content.filter(n=>n.tagName==='fieldset').length,7);
  for(const [name,count] of Object.entries({composition:3,workflow:3,'step-editorial':3,'step-incident':4,'step-alchemy':7,kosha:5,organ:6})) {
    const radios=content.filter(n=>n.tagName==='input'&&attr(n,'name')===name);
    assert.equal(radios.length,count,name);
    assert.equal(radios.filter(n=>n.attrs.some(a=>a.name==='checked')).length,['step-incident','step-alchemy'].includes(name)?0:1);
    for(const radio of radios) {
      assert.equal(attr(radio,'type'),'radio');
      const panel=content.find(n=>attr(n,'id')===attr(radio,'aria-controls'));
      assert.ok(panel,`${name} missing panel`);assert.ok(text(panel).trim().length>60);
      assert.equal(panel.attrs.some(a=>a.name==='hidden'),!radio.attrs.some(a=>a.name==='checked'));
    }
  }
  const faq=content.find(n=>attr(n,'id')==='faq');
  assert.match(text(faq),/0\.8/); assert.match(text(faq),/optional|preview|development/i);
  for(const owner of ['PAI','GSD','OmniRoute']) assert.ok(text(content[0]).includes(owner));
});
test('curated links and Product Hunt badge support evaluation without invented proof',()=>{
  const links=content.filter(n=>n.tagName==='a');
  assert.ok(links.length<=18,`Expected curated links, found ${links.length}`);
  const badge=links.find(n=>attr(n,'class')?.includes('product-hunt-badge'));
  assert.ok(badge);assert.equal(attr(badge,'href'),'https://www.producthunt.com/products/temperance-engine?launch=temperance-engine');
  assert.equal(text(badge),'View the launch listing');
  const widget=content.find(n=>attr(n,'class')==='product-hunt-widget');
  assert.doesNotMatch(text(widget),/November 6|Nov 6/);
  const badgeImages=descendants(badge).filter(n=>n.tagName==='img');
  assert.equal(badgeImages.length,1);
  const official=badgeImages[0];
  assert.equal(attr(official,'src'),officialProductHuntBadge);
  assert.equal(new URL(attr(official,'src')).origin,'https://api.producthunt.com');
  assert.equal(new URL(attr(official,'src')).pathname,'/widgets/embed-image/v1/featured.svg');
  assert.equal(new URL(attr(official,'src')).searchParams.get('post_id'),'1301098');
  assert.equal(attr(official,'width'),'250');assert.equal(attr(official,'height'),'54');
  assert.equal(attr(official,'alt'),'');
  assert.ok(descendants(badge).some(n=>attr(n,'class')==='product-hunt-fallback'&&text(n)==='View the launch listing'),'Persistent text remains when remote badge cannot load');
  assert.doesNotMatch(text(badge),/upvotes|#1|top product|product of the day/i);
  for(const link of links) assert.doesNotMatch(attr(link,'href'),/docs\/plans|metadata\.json|\/package\/router|\/src\//);
  assert.equal(content.filter(n=>n.tagName==='form').length,0);
  assert.equal(content.filter(n=>n.tagName==='button').length,1);
  assert.ok(!markup.includes('/Users/'));assert.ok(!markup.includes('127.0.0.1'));
});
