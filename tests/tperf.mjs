// how long one frame of each arena game takes to draw (the game's own work, not the camera): average and slowest.
// The page runs with a 2x screen, as a phone does. Run from a folder holding blank.y4m.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',`--use-file-for-fake-video-capture=${process.cwd()}/blank.y4m`]});
const p = await (await b.newContext({viewport:{width:390,height:844}, deviceScaleFactor:+(process.env.DSF||3), permissions:['camera']})).newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(() => { const raf = window.requestAnimationFrame.bind(window); window.__perf = {};
  window.requestAnimationFrame = cb => raf(ts => { const t0 = performance.now(); cb(ts); const d = performance.now() - t0, k = cb.name || 'anon'; (window.__perf[k] = window.__perf[k] || []).push(d); }); });
await p.goto('file:///home/user/haftkhan/prototype/index.html'); await p.fill('#kidName','سارا'); await p.click('#helloGo'); await p.waitForTimeout(300);
const games = (process.env.GAMES || 'hill,wall,arash,flap').split(',');
for(const g of games){
  await p.evaluate(()=>HK.go('arena')); await p.click(`[data-game="${g}"]`);
  await p.evaluate(() => { const CAM = HK.CAM; CAM.stream = null; const cv = {width:640, height:480}, ctx = new OffscreenCanvas(640,480).getContext('2d');
    const base = {0:[.5,.2],7:[.53,.19],8:[.47,.19],11:[.58,.3],12:[.42,.3],13:[.6,.42],14:[.4,.42],15:[.6,.52],16:[.4,.52],19:[.6,.54],20:[.4,.54],23:[.55,.55],24:[.45,.55],25:[.55,.72],26:[.45,.72],27:[.55,.9],28:[.45,.9],31:[.56,.93],32:[.44,.93]};
    let t0 = performance.now(); window.__iv = setInterval(() => { const t = (performance.now() - t0)/1000, pose = JSON.parse(JSON.stringify(base)), ph = Math.floor(t*4) % 2;
      if(ph){ pose[27] = [.55,.84]; pose[25] = [.55,.68]; } else { pose[28] = [.45,.84]; pose[26] = [.45,.68]; }               // running in place
      const tri = (t*2) % 1 < .5 ? ((t*2) % 1)*2 : (1 - (t*2) % 1)*2; pose[15] = [.8, .2 + .25*tri]; pose[16] = [.2, .2 + .25*tri];  // and flapping
      const lm = []; for(let i=0;i<33;i++){ const v = pose[i] || [.5,.5]; lm[i] = {x:v[0], y:v[1], visibility: pose[i] ? .95 : .1}; } CAM.onFrame && CAM.onFrame(ctx, lm, cv); }, 33); });
  await p.waitForFunction(() => HKA._A.phase === 'run', null, {timeout:15000});
  if(g === 'wall') await p.evaluate(() => { HKA._WL.score = 9; });
  if(g === 'hill') await p.evaluate(() => { HKA._HL.x = 280; HKA._HL.far = 280; HKA._HL.biome = 0; });
  await p.evaluate(() => { window.__perf = {}; }); await p.waitForTimeout(6000);
  const r = await p.evaluate(() => { const a = (window.__perf.tick || []).slice().sort((x, y) => x - y); const avg = a.reduce((s, x) => s + x, 0)/a.length;
    return {frames:a.length, avg:avg.toFixed(1), p95:a[Math.floor(a.length*.95)].toFixed(1), max:a[a.length - 1].toFixed(1)}; });
  console.log(g.padEnd(6), `frames ${r.frames} in 6 s, avg ${r.avg} ms, 95% ${r.p95} ms, worst ${r.max} ms`);
  await p.evaluate(() => clearInterval(__iv));
}
console.log('errors', errs); await b.close();
