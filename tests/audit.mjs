// UI audit: every screen at three sizes. Reports horizontal scroll, things off the screen, small tap targets,
// tiny text, broken images and console errors, and saves a screenshot of each screen.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import fs from 'fs';
const VPS = (process.env.VPS || '360x640,390x844,1366x768').split(',').map(s => s.split('x').map(Number));
const ONLY = process.env.ONLY ? new RegExp(process.env.ONLY) : null;
const metrics = () => {
  const vw = innerWidth, out = {hscroll: document.documentElement.scrollWidth > vw + 1 ? document.documentElement.scrollWidth : 0, small:[], off:[], tiny:[], broken:[]};
  const vis = el => { const r = el.getBoundingClientRect(), cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0.05 && !el.closest('[hidden]'); };
  const label = el => (el.id ? '#' + el.id : el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0,2).join('.') : '')) + ' «' + (el.textContent || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 24) + '»';
  const clipped = el => { for(let a = el.parentElement; a && a !== document.body; a = a.parentElement){ const o = getComputedStyle(a).overflowX; if(['auto','scroll','hidden','clip'].includes(o)) return true; } return false; };
  const scope = document.querySelector('.screen:not([hidden])') ? [...document.querySelectorAll('.screen:not([hidden]), .nav, body > .camfull, #camBox')] : [document.body];
  const seen = new Set();
  scope.forEach(root => root.querySelectorAll('button, a, [role=button], input, select, .choice, [data-act], [data-go]').forEach(el => { if(seen.has(el) || !vis(el)) return; seen.add(el); const r = el.getBoundingClientRect();
    if(r.width < 44 || r.height < 44) out.small.push(label(el) + ` ${Math.round(r.width)}x${Math.round(r.height)}`); }));
  scope.forEach(root => root.querySelectorAll('*').forEach(el => { if(!vis(el) || clipped(el)) return; const r = el.getBoundingClientRect(); if(r.right > vw + 2 || r.left < -2) out.off.push(label(el) + ` x ${Math.round(r.left)}..${Math.round(r.right)}`); }));
  scope.forEach(root => root.querySelectorAll('*').forEach(el => { if(!vis(el)) return; const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()); if(!own) return;
    const fs = parseFloat(getComputedStyle(el).fontSize); if(fs < 12) out.tiny.push(label(el) + ` ${fs}px`); }));
  document.querySelectorAll('img').forEach(im => { if(vis(im) && im.complete && !im.naturalWidth) out.broken.push(im.getAttribute('src')); });
  for(const k of ['small','off','tiny','broken']) out[k] = [...new Set(out[k])].slice(0, 12);
  return out;
};
const report = {};
for(const [W, H] of VPS){
  const vp = `${W}x${H}`;
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',`--use-file-for-fake-video-capture=${process.cwd()}/portrait.y4m`]});
  const ctx = await b.newContext({viewport:{width:W, height:H}, permissions:['camera'], hasTouch: W < 700, isMobile: W < 700});
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if(m.type() === 'error') errs.push(m.text()); }); p.setDefaultTimeout(8000);
  const shot = async name => { if(ONLY && !ONLY.test(name)) return; await p.waitForTimeout(450); const m = await p.evaluate(metrics); m.errors = errs.splice(0);
    await p.screenshot({path:`aud/${vp}-${name}.png`}); report[`${vp} ${name}`] = m; };
  const go = async s => { await p.evaluate(s => HK.go(s), s); await p.waitForTimeout(250); };
  const khan = async k => { await go('map'); await p.click(`.khan >> nth=${k}`); await p.waitForTimeout(300); };
  await p.goto('file:///home/user/haftkhan/prototype/index.html'); await p.waitForTimeout(600);
  await shot('hello');
  await p.fill('#kidName','سارا'); await p.click('#helloGo'); await p.waitForTimeout(500);
  await shot('map');
  for(const [k, lessons] of [[0, [1, 2]], [1, [3, 4]], [2, [6]], [3, [7, 8]]]){
    await khan(k); await shot(`gkhan${k}`);
    for(const n of lessons){
      for(const act of ['gstory', 'gfam', 'gstar']){ await khan(k); try { await p.click(`#mz${n} [data-act="${act}"]`); await p.waitForTimeout(300); await shot(`L${n}-${act}`); } catch(e){ report[`${vp} L${n}-${act}`] = {fail: e.message.slice(0, 80)}; } }
      await khan(k); await p.click(`#mz${n} [data-act="play"]`); await p.waitForTimeout(300); await shot(`L${n}-gchoose`);
      const nc = await p.$$eval('#gcChoices .choice', a => a.length);
      for(let i = 0; i < nc; i++){ await khan(k); await p.click(`#mz${n} [data-act="play"]`); await p.waitForTimeout(250);
        await p.click(`#gcChoices .choice >> nth=${i}`); await p.waitForTimeout(300);
        const pick = await p.evaluate(n => HKX.LESSONS[n].play.pick, n);
        for(let j = 1; j < pick; j++) await p.click(`#gcChoices .choice >> nth=${(i + j) % nc}`);
        if(pick > 1){ await p.click('#gcStart'); await p.waitForTimeout(300); }
        await shot(`L${n}-gex${i}`);
        if(i === 0 && (!ONLY || ONLY.test(`L${n}-gex0-cam`))){ const cam = await p.$('#gxCam'); if(cam && await cam.isVisible()){ await cam.click(); await p.waitForTimeout(3500); await shot(`L${n}-gex0-cam`); await go('map'); } } }
    }
  }
  await khan(2); await shot('khan5');
  for(const s of ['choose', 'story', 'record', 'family']){ await khan(2); await go(s); await shot(`L5-${s}`); }
  await khan(2); await go('choose'); const n5 = await p.$$eval('#choices .choice', a => a.length);
  for(let i = 0; i < n5; i++){ await khan(2); await go('choose'); await p.click(`#choices .choice >> nth=${i}`); await p.waitForTimeout(300); await shot(`L5-ex${i}`); }
  await go('treasure'); await shot('treasure');
  await go('parents'); await shot('parents');
  await go('arena'); await shot('arena');
  for(const g of ['hill', 'wall']){ await go('arena'); await p.click(`[data-game="${g}"]`); await p.waitForTimeout(3500); await shot(`play-${g}`); await p.click('.pl-exit').catch(()=>{}); await p.waitForTimeout(300); }
  await b.close();
}
fs.writeFileSync('aud/report.json', JSON.stringify(report, null, 1));
let bad = 0;
for(const [k, m] of Object.entries(report)){
  if(m.fail){ console.log(k, 'NAV FAIL', m.fail); bad++; continue; }
  const items = [m.hscroll && `hscroll ${m.hscroll}`, m.off.length && `off: ${m.off.join(' | ')}`, m.small.length && `small: ${m.small.join(' | ')}`, m.tiny.length && `tiny: ${m.tiny.join(' | ')}`, m.broken.length && `broken: ${m.broken.join(' ')}`, m.errors.length && `ERR: ${m.errors.join(' | ')}`].filter(Boolean);
  if(items.length){ bad++; console.log('\n## ' + k); items.forEach(x => console.log('  ' + x)); }
}
console.log(`\n${Object.keys(report).length} screens checked, ${bad} with findings`);
