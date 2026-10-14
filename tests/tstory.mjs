// every story page whose task the camera counts: standing still must not count (except "stand straight"), the
// real movement must finish the task.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',`--use-file-for-fake-video-capture=${process.cwd()}/blank.y4m`]});
const p = await (await b.newContext({viewport:{width:390,height:844}, permissions:['camera']})).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.setDefaultTimeout(15000);
await p.goto('file:///home/user/haftkhan/prototype/index.html'); await p.fill('#kidName','سارا'); await p.click('#helloGo'); await p.waitForTimeout(400);
const tasks = await p.evaluate(() => Object.entries(HKX.LESSONS).flatMap(([n, L]) => (L.story.pages || []).map((pg, i) => pg.task ? {n:+n, i, type:pg.task.type, key:pg.task.det || pg.task.check || (pg.task.steps || []).map(s => s[0]).join('>'), title:pg.task.title} : null).filter(t => t && ['seq','hold','reps'].includes(t.type))));
const run = (mode, task, secs) => p.evaluate(async ({mode, task, secs}) => {
  const CAM = HK.CAM, keep = CAM.stream; CAM.stream = null; await new Promise(r => setTimeout(r, 120));
  const W = 640, H = 480, cv = {width:W, height:H}, ctx = new OffscreenCanvas(W, H).getContext('2d');
  const base = {0:[.5,.2],7:[.53,.19],8:[.47,.19],11:[.58,.3],12:[.42,.3],13:[.6,.42],14:[.4,.42],15:[.6,.52],16:[.4,.52],19:[.6,.54],20:[.4,.54],23:[.55,.55],24:[.45,.55],25:[.55,.72],26:[.45,.72],27:[.55,.9],28:[.45,.9],29:[.55,.91],30:[.45,.91],31:[.56,.93],32:[.44,.93]};
  const shift = (dy, keep = []) => { const q = {}; for(const k in base) if(!keep.includes(+k)) q[k] = [base[k][0], base[k][1] + dy]; return q; };
  const P = {
    legL:{25:[.56,.6],27:[.57,.76],29:[.57,.77],31:[.58,.78]}, legR:{26:[.44,.6],28:[.43,.76],30:[.43,.77],32:[.42,.78]}, feet:{},
    headR:{0:[.475,.2]}, headL:{0:[.525,.2]}, headD:{0:[.5,.235]}, headU:{0:[.5,.175]}, headC:{},
    armU:{15:[.56,.08],16:[.44,.08],13:[.58,.18],14:[.42,.18],19:[.56,.07],20:[.44,.07]}, armS:{15:[.82,.3],16:[.18,.3],13:[.7,.3],14:[.3,.3],19:[.84,.3],20:[.16,.3]},
    armF:{15:[.54,.31],16:[.46,.31],13:[.57,.34],14:[.43,.34],19:[.54,.31],20:[.46,.31]}, armD:{},
    sit:{23:[.55,.62],24:[.45,.62],25:[.56,.68],26:[.44,.68],27:[.56,.9],28:[.44,.9]},
    upright:{},
    bendL:{11:[.62,.33],12:[.46,.3],13:[.66,.45],15:[.62,.55],19:[.62,.56],14:[.46,.2],16:[.55,.12],20:[.55,.11],0:[.55,.2],7:[.58,.19],8:[.52,.19]},
    bendR:{12:[.38,.33],11:[.54,.3],14:[.34,.45],16:[.38,.55],20:[.38,.56],13:[.54,.2],15:[.45,.12],19:[.45,.11],0:[.45,.2],7:[.48,.19],8:[.42,.19]},
    thigh:{15:[.57,.6],19:[.57,.61],16:[.4,.3],20:[.4,.29],14:[.38,.38]}, chest:{15:[.53,.38],19:[.53,.38],16:[.4,.2],20:[.4,.19],14:[.38,.3]},
  };
  const out = {13:[.7,.3],14:[.3,.3],15:[.82,.3],16:[.18,.3],19:[.84,.3],20:[.16,.3]}, outLo = {13:[.7,.33],14:[.3,.33],15:[.82,.36],16:[.18,.36],19:[.84,.36],20:[.16,.36]}, outHi = {13:[.7,.27],14:[.3,.27],15:[.82,.24],16:[.18,.24],19:[.84,.24],20:[.16,.24]};
  const REPS = {
    run:[[P.legL, 260], [P.legR, 260]],
    walk:[[P.legL, 450], [P.legR, 450]],
    throw:[[{15:[.58,.12],16:[.42,.12],13:[.58,.2],14:[.42,.2],19:[.58,.1],20:[.42,.1]}, 700], [{}, 700]],
    patT:[[{15:[.57,.6],19:[.57,.61],16:[.4,.3],20:[.4,.29],14:[.38,.38]}, 400], [{16:[.43,.6],20:[.43,.61],15:[.6,.3],19:[.6,.29],13:[.62,.38]}, 400]],
    patC:[[{15:[.53,.38],19:[.53,.38],16:[.4,.2],20:[.4,.19],14:[.38,.3]}, 400], [{16:[.47,.38],20:[.47,.38],15:[.6,.2],19:[.6,.19],13:[.62,.3]}, 400]],
    circle:[[{...out, ...outLo}, 400], [{...out, ...outHi}, 400]],
    toe:[[shift(-.03, [31, 32]), 700], [{}, 700]],
    hug:[[{26:[.45,.5],28:[.46,.68],30:[.46,.69],32:[.46,.7],15:[.48,.52],16:[.42,.52]}, 700], [{}, 700]],
    lunge:[[{23:[.55,.65],24:[.45,.65],25:[.58,.74],26:[.44,.86],27:[.6,.9],28:[.47,.92]}, 800], [{}, 800]]
  };
  let seq;
  if(task.type === 'seq') seq = task.key.split('>').map(k => [P[k], 650]);
  else if(task.type === 'hold') seq = [[task.key === 'sitStraight' ? P.sit : {}, 1000]];
  else seq = REPS[task.key];
  let seed = 11; const rnd = () => { seed = (seed*16807) % 2147483647; return seed/2147483647; }; const g = () => { let u = 0; for(let i = 0; i < 6; i++) u += rnd(); return (u - 3)/1.2; };
  const J = mode === 'still' ? .008 : .003, t0 = performance.now(), total = seq.reduce((s, [, ms]) => s + ms, 0);
  const prog = () => { const c = CAM.count && CAM.count(); if(!c) return -1; const v = +String(c.big).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)); return task.type === 'hold' ? (/\d/.test(String(v)) ? null : null) ?? v : v; };
  const start = prog(), page0 = HKX._story.Y.page; let moved = false, best = start;
  while(performance.now() - t0 < secs*1000){
    let pose = {...base};
    if(mode === 'play' && performance.now() - t0 > 1500){ let t = (performance.now() - t0 - 1500) % total; for(const [o, ms] of seq){ if(t < ms){ Object.assign(pose, o); break; } t -= ms; } }
    const lm = []; for(let i = 0; i < 33; i++){ const v = pose[i] || [.5,.5]; lm[i] = {x:v[0] + J*g(), y:v[1] + J*g(), visibility: pose[i] ? .95 : .1}; }
    CAM.onFrame && CAM.onFrame(ctx, lm, cv);
    if(HKX._story.Y.page !== page0) moved = true;            // done, and the story went on to the next page
    else { const v = prog(); if(task.type === 'hold' ? v < best : v > best) best = v; }
    await new Promise(r => setTimeout(r, 33));
  }
  const c = CAM.count && CAM.count(), end = prog(); window.__h = CAM.hint && CAM.hint(); CAM.stream = keep;
  return {start, end: best, done: moved || !!(c && c.done)};
}, {mode, task, secs});
const res = []; let seqDbg; const ONLYT = process.env.T ? new RegExp(process.env.T) : null;
for(const t of tasks){
  if(ONLYT && !ONLYT.test(`L${t.n} p${t.i}`)) continue;
  const open = async () => { await p.evaluate(() => HK.go('map')); await p.click(`.khan >> nth=${t.n <= 2 ? 0 : t.n <= 4 ? 1 : t.n <= 6 ? 2 : t.n <= 8 ? 3 : t.n <= 10 ? 4 : t.n === 11 ? 5 : 6}`); await p.click(`#mz${t.n} [data-act="gstory"]`); await p.waitForTimeout(250);
    await p.evaluate(i => HKX._story.renderStory(i), t.i); await p.waitForTimeout(250); await p.click('#tkCam'); await p.waitForTimeout(3500); };
  await open(); const still = await run('still', t, 8);
  await open(); const play = await run('play', t, t.type === 'seq' ? 32 : 14);
  const stillMoved = t.type === 'hold' ? (still.end !== still.start) : still.end > still.start;
  const expectStill = t.key === 'standStraight';          // standing straight IS that task
  if(process.env.T) console.log('hint', await p.evaluate(() => window.__h), JSON.stringify(seqDbg = await p.evaluate(() => [HKX._story.Y.page, document.querySelector('#tkChips')?.innerHTML.slice(0,200)])));
  const ok = (expectStill ? true : !stillMoved) && play.done;
  res.push(`${ok ? 'OK  ' : 'FAIL'} L${t.n} p${t.i} ${t.type}:${t.key} — still ${JSON.stringify(still)}, moving ${JSON.stringify(play)}`);
}
console.log(res.join('\n')); console.log('errors', errs); await b.close();
