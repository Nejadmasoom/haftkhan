// lesson 5 through the real camera loop: the pose model's output is replaced by a scripted body, so the one-leg
// state, the framing check and every game's own counting run exactly as with a person in front of the phone.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',`--use-file-for-fake-video-capture=${process.cwd()}/blank.y4m`]});
const p = await (await b.newContext({viewport:{width:390,height:844}, permissions:['camera']})).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.setDefaultTimeout(20000);
await p.goto('file:///home/user/haftkhan/prototype/index.html'); await p.fill('#kidName','سارا'); await p.click('#helloGo'); await p.waitForTimeout(400);
// the scripted body: window.__script(t, cam) returns pose overrides in normalised coordinates
await p.evaluate(() => {
  const base = {0:[.5,.2],7:[.53,.19],8:[.47,.19],11:[.58,.3],12:[.42,.3],13:[.6,.42],14:[.4,.42],15:[.6,.52],16:[.4,.52],19:[.6,.54],20:[.4,.54],23:[.55,.55],24:[.45,.55],25:[.55,.72],26:[.45,.72],27:[.55,.9],28:[.45,.9],29:[.55,.91],30:[.45,.91],31:[.56,.93],32:[.44,.93]};
  window.__base = base; window.__t0 = performance.now(); window.__script = () => ({});
  let seed = 3; const rnd = () => { seed = (seed*16807) % 2147483647; return seed/2147483647; }; const g = () => { let u = 0; for(let i = 0; i < 6; i++) u += rnd(); return (u - 3)/1.2; };
  window.__lm = () => { const o = {...base, ...window.__script(performance.now() - window.__t0, HK.CAM)}, J = window.__J || .003, a = [];
    for(let i = 0; i < 33; i++){ const v = o[i] || [.5,.5]; a[i] = {x:v[0] + J*g(), y:v[1] + J*g(), visibility: o[i] ? .95 : .1}; } return a; };
});
const patch = () => p.evaluate(() => { const CAM = HK.CAM; if(CAM.pose && !CAM.pose.__p){ CAM.pose.detectForVideo = () => ({landmarks:[window.__lm()]}); CAM.pose.__p = 1; } return !!CAM.pose; });
const script = (name, J) => p.evaluate(([name, J]) => { window.__J = J; window.__t0 = performance.now(); window.__script = window.__SCRIPTS[name]; }, [name, J]);
await p.evaluate(() => {
  const up = {26:[.45,.62],28:[.45,.74],30:[.45,.75],32:[.44,.76]};                // the child's right foot lifted (image left)
  const toward = (from, to, k) => [from[0] + (to[0] - from[0])*k, from[1] + (to[1] - from[1])*k];
  window.__SCRIPTS = {
    still: () => ({}),
    oneLeg: () => up,
    // dots: the foot nearer the dot taps it and comes back
    dots: (t, CAM) => { const d = CAM.dot, cv = CAM.canvas; if(!d || !cv.width || t < 2000) return {}; const k = Math.min(1, ((t % 1600) / 600)); const tgt = [d.x/cv.width, d.y/cv.height];
      const L = Math.hypot(.55 - tgt[0], .9 - tgt[1]) < Math.hypot(.45 - tgt[0], .9 - tgt[1]); const [a, h, toe] = L ? [27, 29, 31] : [28, 30, 32];
      const pt = toward(window.__base[a], tgt, (t % 1600) < 900 ? k : 0); return {[a]:pt, [h]:[pt[0], pt[1] + .01], [toe]:[pt[0] + .01, pt[1] + .02]}; },
    // cups: on one leg, a hand carries each cup to the stack
    cups: (t, CAM) => { const d = CAM.dot, cv = CAM.canvas; if(!d || !cv.width) return up; const W = cv.width, H = cv.height, ph = t % 2400;
      const cup = [d.x/W, d.y/H], top = [d.bx/W, (d.by - (window.__c5 || 0)*d.br*.55)/H], w = d.x/W > .5 ? 15 : 16, e = w === 15 ? 13 : 14;
      const pos = d.picked ? toward(cup, top, Math.min(1, (ph % 1200)/700)) : toward(window.__base[w], cup, Math.min(1, ph/700));
      return {...up, [w]:pos, [w + 4]:[pos[0], pos[1] + .01], [e]:toward(window.__base[e], pos, .5)}; }
  };
});
const out = [];
const tapNum = () => p.evaluate(() => +document.querySelector('#tapNum').textContent.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
for(const [mi, name] of [[1, 'dots'], [2, 'cups']]){
  for(const mode of ['still', 'play']){
    await p.evaluate(() => HK.go('map')); await p.click('.khan >> nth=2'); await p.evaluate(() => HK.go('choose')); await p.waitForTimeout(200);
    const label = await p.textContent(`#choices .choice >> nth=${mi}`); await p.click(`#choices .choice >> nth=${mi}`); await p.waitForTimeout(300);
    await script('still', .003); await p.click('#exCam'); for(let i = 0; i < 40 && !(await patch()); i++) await p.waitForTimeout(250);
    await p.waitForTimeout(1500);
    await script(mode === 'still' ? 'still' : name, mode === 'still' ? .01 : .003);
    const t0 = Date.now(); let n = 0; while(Date.now() - t0 < (mode === 'still' ? 9000 : 22000)){ await p.waitForTimeout(500); n = await tapNum(); await p.evaluate(n => window.__c5 = n, n); }
    out.push(`L5 ${name} [${label.trim().slice(0, 30)}] ${mode}: ${n}`);
  }
}
// stork record: two feet = no time; one leg = the watch runs; foot down = the time is kept
await p.evaluate(() => HK.go('map')); await p.click('.khan >> nth=2'); await p.evaluate(() => HK.go('record')); await p.waitForTimeout(300);
await script('still', .01); await p.click('#recCam'); for(let i = 0; i < 40 && !(await patch()); i++) await p.waitForTimeout(250);
await p.waitForTimeout(6000); const r0 = (await p.textContent('#recTime')).trim();
await script('oneLeg', .003); await p.waitForTimeout(5000); const r1 = (await p.textContent('#recTime')).trim();
await script('still', .003); await p.waitForTimeout(2500); const r2 = (await p.textContent('#recTime')).trim(), msg = (await p.textContent('#recMsg')).trim().slice(0, 80);
out.push(`stork record: standing ${r0} | on one leg 5s ${r1} | foot down ${r2} — ${msg}`);
console.log(out.join('\n')); console.log('errors', errs); await b.close();
