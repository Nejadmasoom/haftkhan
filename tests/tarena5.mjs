// archery: the physics can actually hit — find a (draw, angle) that lands in the bull's-eye, shoot it, and score; then wind, misses and game over.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',`--use-file-for-fake-video-capture=${process.cwd()}/blank.y4m`]});
const p = await (await b.newContext({viewport:{width:390,height:844}, permissions:['camera']})).newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console', m=>{ if(m.type()==='error') errs.push(m.text()); });
await p.goto('file:///home/user/haftkhan/prototype/index.html'); await p.fill('#kidName','علی'); await p.click('#helloGo'); await p.waitForTimeout(300);
await p.evaluate(()=>HK.go('arena')); const nm = await p.evaluate(() => [...document.querySelectorAll('.ar-card b')][2].textContent); console.log('name card:', nm);
await p.click('[data-game="arash"]'); await p.waitForTimeout(4200);
const out = await p.evaluate(async () => {
  const CAM = HK.CAM; CAM.stream = null; const W = 640, H = 480, cv = {width:W, height:H}, ctx = new OffscreenCanvas(W,H).getContext('2d');
  const base = {0:[.5,.2],7:[.53,.19],8:[.47,.19],11:[.58,.3],12:[.42,.3],13:[.6,.42],14:[.4,.42],15:[.6,.52],16:[.4,.52],19:[.6,.54],20:[.4,.54],23:[.55,.55],24:[.45,.55],25:[.55,.72],26:[.45,.72],27:[.55,.9],28:[.45,.9],31:[.56,.93],32:[.44,.93]};
  let live = true; (async () => { while(live){ const lm = []; for(let i=0;i<33;i++){ const v = base[i] || [.5,.5]; lm[i] = {x:v[0], y:v[1], visibility: base[i] ? .95 : .1}; } CAM.onFrame(ctx, lm, cv); await new Promise(r => setTimeout(r, 33)); } })();
  const wait = ms => new Promise(r => setTimeout(r, ms)); const AR = HKA_AR.AR, log = [];
  while(HKA._A.phase !== 'run') await wait(100);
  for(let round = 0; round < 12 && HKA._A.phase === 'run'; round++){
    await wait(300); while(AR.arrow || AR.target.gone || AR.cool > 0) await wait(100);
    let bestC = null, T = AR.target;
    for(let pw = .45; pw <= 1.001; pw += .05) for(let an = 3; an <= 64; an += 1){ const y = HKA_AR.yAtTarget(pw, an); if(y == null) continue; const d = Math.abs(y - T.y)/T.R; if(!bestC || d < bestC.d) bestC = {pw, an, d}; }
    const miss = round % 4 === 3;                      // every fourth shot: deliberately far off
    const s0 = AR.score, h0 = AR.hearts; HKA_AR.fire(miss ? 1 : bestC.pw, miss ? 62 : bestC.an);      // a deliberate miss: full power, far too high
    while(AR.arrow) await wait(50); await wait(200);
    log.push({round, ring:bestC && +bestC.d.toFixed(2), miss, dscore:AR.score - s0, dhearts:AR.hearts - h0, wind:+AR.wind.toFixed(2), n:AR.hits});
  }
  live = false; return {log, final:{score:AR.score, hearts:AR.hearts, phase:HKA._A.phase}};
});
console.log(out.log.map(l => JSON.stringify(l)).join('\n')); console.log(JSON.stringify(out.final));
await p.waitForTimeout(2500); await p.screenshot({path:'ar5-end.png'}); console.log('errors', errs); await b.close();
