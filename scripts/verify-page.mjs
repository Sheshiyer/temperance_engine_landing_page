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
test('rendered page has one headline and five labelled product sections',()=>{
  assert.equal(content.filter(n=>n.tagName==='h1').length,1);
  assert.equal(text(content.find(n=>n.tagName==='h1')),'Give your AI tools a shared way to work.');
  const sections=content.filter(n=>n.tagName==='section'); assert.equal(sections.length,5);
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
  const list=content.find(n=>n.tagName==='ol'); assert.equal((list.childNodes||[]).filter(n=>n.tagName==='li').length,5);
});
test('robots and sitemap use the same canonical website',async()=>{
  assert.match(await readFile(resolve(root,'dist/robots.txt'),'utf8'),/Sitemap: https:\/\/temperance\.thoughtseed\.space\/sitemap.xml/);
  const sitemap=await readFile(resolve(root,'dist/sitemap.xml'),'utf8');
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`)); assert.ok(!sitemap.includes('thoughtseed.space/temperance-engine/'));
});
