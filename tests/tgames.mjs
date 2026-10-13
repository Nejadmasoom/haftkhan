// every camera-counted game, end to end: open it, turn the camera on, feed a body that stands still (must stay 0),
// then the game's real movement (must count). Synthetic landmarks with camera jitter go through the real pipeline.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',`--use-file-for-fake-video-capture=${process.cwd()}/blank.y4m`]});
const p = await (await b.newContext({viewport:{width:390,height:844}, permissions:['camera']})).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.setDefaultTimeout(15000);
await p.goto('file:///home/user/haftkhan/prototype/index.html'); await p.fill('#kidName','سارا'); await p.click('#helloGo'); await p.waitForTimeout(400);
const ONLYG = process.env.G ? new RegExp(process.env.G) : null;
let games = await p.evaluate(() => Object.entries(HKX.LESSONS).flatMap(([n, L]) => (L.play.games || []).map((g, i) => ({n:+n, i, name:g.name, kind:g.kind, det:g.det || null, stick:g.need === 'stick'})).filter(g => g.kind === 'reps' && g.det)));
if(ONLYG) games = games.filter(g => ONLYG.test(`L${g.n}#${g.i}`));
const khanOf = n => n <= 2 ? 0 : 1;
const feed = (mode, det, secs, stick) => p.evaluate(async ({mode, det, secs, stick}) => {
  const CAM = HK.CAM, X = HKX._X, keep = CAM.stream; CAM.stream = null; await new Promise(r => setTimeout(r, 120));
  const W = 640, H = 480, cv = {width:W, height:H}, ctx = new OffscreenCanvas(W, H).getContext('2d');
  const base = {0:[.5,.2],7:[.53,.19],8:[.47,.19],11:[.58,.3],12:[.42,.3],13:[.6,.42],14:[.4,.42],15:[.6,.52],16:[.4,.52],19:[.6,.54],20:[.4,.54],23:[.55,.55],24:[.45,.55],25:[.55,.72],26:[.45,.72],27:[.55,.9],28:[.45,.9],29:[.55,.91],30:[.45,.91],31:[.56,.93],32:[.44,.93]};
  const shift = (dy, keep = []) => { const q = {}; for(const k in base) if(!keep.includes(+k)) q[k] = [base[k][0], base[k][1] + dy]; return q; };
  const sq = {23:[.55,.7],24:[.45,.7],25:[.62,.76],26:[.38,.76],0:[.5,.35],7:[.53,.34],8:[.47,.34],11:[.58,.45],12:[.42,.45],13:[.6,.55],14:[.4,.55],15:[.6,.62],16:[.4,.62]};
  const deep = {23:[.55,.76],24:[.45,.76],25:[.64,.74],26:[.36,.74],0:[.5,.42],7:[.53,.41],8:[.47,.41],11:[.58,.52],12:[.42,.52],13:[.6,.62],14:[.4,.62],15:[.58,.85],16:[.42,.85]};
  const legL = {25:[.56,.6],27:[.57,.76],29:[.57,.77],31:[.58,.78]}, legR = {26:[.44,.6],28:[.43,.76],30:[.43,.77],32:[.42,.78]};
  if(stick){ Object.assign(base, {13:[.65,.24],14:[.35,.24],15:[.66,.29],16:[.34,.29],19:[.67,.29],20:[.33,.29]}); Object.assign(sq, {13:[.65,.39],14:[.35,.39],15:[.66,.44],16:[.34,.44]}); }
  const SEQ = {
    squat: [[sq, 800], [{}, 800]],
    freeMove: [[legL, 800], [{}, 800], [legR, 800], [{}, 800]],
    jump: [[shift(-.07), 350], [{}, 700]],
    frog: [[deep, 700], [shift(-.07), 350], [{}, 500]],
    hen: [[{13:[.66,.31],14:[.34,.31],15:[.6,.36],16:[.4,.36]}, 700], [{}, 700]],
    drum: [[{15:[.53,.36],16:[.47,.36]}, 500], [{}, 500]],
    toe: [[shift(-.03, [31, 32]), 700], [{}, 700]],
    run: [[legL, 260], [legR, 260]]
  };
  let seed = 7; const rnd = () => { seed = (seed*16807) % 2147483647; return seed/2147483647; }; const g = () => { let u = 0; for(let i = 0; i < 6; i++) u += rnd(); return (u - 3)/1.2; };
  const J = mode === 'still' ? .01 : .003, seq = SEQ[det] || [[{}, 1000]], t0 = performance.now(); let reps = 0, last = X.count;
  const total = seq.reduce((s, [, ms]) => s + ms, 0);
  while(performance.now() - t0 < secs*1000){
    let pose = {...base};
    if(mode === 'play' && performance.now() - t0 > 2500){ let t = (performance.now() - t0 - 2500) % total; for(const [o, ms] of seq){ if(t < ms){ Object.assign(pose, o); break; } t -= ms; } }   // 2.5 s standing first, so the floor is known
    const lm = []; for(let i = 0; i < 33; i++){ const v = pose[i] || [.5,.5]; lm[i] = {x:v[0] + J*g(), y:v[1] + J*g(), visibility: pose[i] ? .95 : .1}; }
    CAM.onFrame && CAM.onFrame(ctx, lm, cv); if(X.count > last) reps += X.count - last; last = X.count;     // a finished game starts the next at 0
    await new Promise(r => setTimeout(r, 33));
  }
  CAM.stream = keep; window.__dbg = [X.det && Object.keys(X.det).join('/'), document.querySelector('#gxHint')?.textContent, CAM.onFrame && CAM.onFrame.name, HKX._X.q, HKX._X.qi]; return reps;
}, {mode, det, secs, stick});
const results = [];
for(const gm of games){
  const open = async () => { await p.evaluate(() => HK.go('map')); await p.click(`.khan >> nth=${khanOf(gm.n)}`); await p.click(`#mz${gm.n} [data-act="play"]`); await p.click(`#gcChoices .choice >> nth=${gm.i}`); await p.waitForTimeout(300);
    if(await p.$('#gcStart')){ await p.click(`#gcChoices .choice >> nth=${gm.i ? 0 : 1}`); await p.click('#gcStart'); await p.waitForTimeout(300); }   // two-pick lessons
    await p.click('#gxCam'); await p.waitForTimeout(3500); };
  await open(); const still = await feed('still', gm.det, 9, gm.stick);
  await open(); const play = await feed('play', gm.det, 14, gm.stick);
  const ok = still === 0 && play >= 3;
  if(!ok) console.log('dbg', JSON.stringify(await p.evaluate(() => window.__dbg)));
  results.push(`${ok ? 'OK  ' : 'FAIL'} L${gm.n}#${gm.i} ${gm.name} (${gm.det}): still ${still}, moving ${play}`);
}
console.log(results.join('\n')); console.log('errors', errs); await b.close();
