// the two newer arena games: the child-named archery and the arm-flapping Simorgh.
// Synthetic body landmarks go straight into the camera callback (as in tarena3). Run from a folder holding blank.y4m.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',`--use-file-for-fake-video-capture=${process.cwd()}/blank.y4m`]});
const p = await (await b.newContext({viewport:{width:390,height:844}, permissions:['camera']})).newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console', m=>{ if(m.type()==='error') errs.push(m.text()); });
const res = []; const ok = (c, m) => res.push(`${c ? 'OK  ' : 'FAIL'} ${m}`);
await p.goto('file:///home/user/haftkhan/prototype/index.html'); await p.fill('#kidName','سارا'); await p.click('#helloGo'); await p.waitForTimeout(300);
await p.click('.nav button[data-go="arena"]'); await p.waitForTimeout(300); await p.screenshot({path:'ar4-menu.png'});
const cards = await p.evaluate(() => [...document.querySelectorAll('.ar-card b')].map(x => x.textContent));
ok(cards.length === 4 && cards.some(c => c === 'سارای کمانگیر') && cards.some(c => c.includes('سیمرغ')), `cards: ${cards.join(' | ')}`);
// drive a game: `script(t, st)` returns {pose overrides}; st is shared
const play = async (game, secs, scriptSrc, shots) => {
  await p.evaluate(()=>HK.go('arena')); await p.click(`[data-game="${game}"]`); await p.waitForTimeout(4200);
  return await p.evaluate(async ({secs, scriptSrc, shots}) => {
    const CAM = HK.CAM, keep = CAM.stream; CAM.stream = null; await new Promise(r=>setTimeout(r,100));
    const W = 640, H = 480, cv = {width:W, height:H}, ctx = new OffscreenCanvas(W,H).getContext('2d');
    const base = {0:[.5,.2],7:[.53,.19],8:[.47,.19],11:[.58,.3],12:[.42,.3],13:[.6,.42],14:[.4,.42],15:[.6,.52],16:[.4,.52],19:[.6,.54],20:[.4,.54],23:[.55,.55],24:[.45,.55],25:[.55,.72],26:[.45,.72],27:[.55,.9],28:[.45,.9],31:[.56,.93],32:[.44,.93]};
    let seed = 5; const rnd = () => { seed = (seed*16807) % 2147483647; return seed/2147483647; }; const g = () => { let u=0; for(let i=0;i<6;i++) u+=rnd(); return (u-3)/1.2; };
    const script = new Function('t', 'st', 'A', scriptSrc); const st = {}; const out = {log:[]};
    const t0 = performance.now();
    while(performance.now() - t0 < secs*1000){
      const t = (performance.now() - t0)/1000, A = HKA._A; const pose = JSON.parse(JSON.stringify(base)), J = st.jit == null ? .003 : st.jit;
      if(A.phase === 'run'){ if(st.runT == null) st.runT = t; Object.assign(pose, script(t - st.runT, st, window.HKA_AR ? HKA_AR.AR : HKA_FL.F) || {}); }
      const lm = []; for(let i=0;i<33;i++){ const v = pose[i] || [.5,.5]; lm[i] = {x:v[0] + J*g(), y:v[1] + J*g(), visibility: pose[i] ? .95 : .1}; }
      CAM.onFrame && CAM.onFrame(ctx, lm, cv); if(st.tick) st.tick(t - (st.runT || 0), out);
      await new Promise(r => setTimeout(r, 33));
    }
    CAM.stream = keep; return {phase:HKA._A.phase, st:JSON.parse(JSON.stringify({...st, tick:undefined})), out};
  }, {secs, scriptSrc, shots});
};
// ---------- archery
// bow arm out on the screen's right (wrist .76,.30), the other hand pulled back by `pull`; release when the cycle says so
const ARCH = `
  const cyc = 3.2, c = t % cyc, n = Math.floor(t/cyc); st.cycles = n;
  const want = st.pulls ? st.pulls[n % st.pulls.length] : 0.9, ang = st.angs ? st.angs[n % st.angs.length] : 0;
  let pull = 0; if(c > .6 && c < 1.5) pull = want*Math.min(1, (c - .6)/.7); else if(c >= 1.5 && c < 1.9) pull = want; else if(c >= 1.9 && c < 2.0) pull = want*.35; 
  if(st.mode === 'none') pull = 0;
  const bowY = .30 - ang*.0035, span = (.62 + .95*pull)*0.1845 ;   // arm length is 0.1845 of the width in this body
  if(st.mode === 'none') return {};
  const act = c > .5 && c < 2.3;
  return act ? {13:[.70,bowY],15:[.76,bowY],19:[.77,bowY], 14:[.62,.34],16:[.76 - (pull < .02 ? .06 : span), bowY + .02],20:[.76 - span, bowY+.02]} : {};`;
{ const pr = p.evaluate(() => 1); await pr; }
// still body first: no arrow, no hearts lost
{ await p.evaluate(()=>HK.go('arena')); await p.click('[data-game="arash"]'); await p.waitForTimeout(500);
  await p.evaluate(() => 0); }
const r1 = await play('arash', 16, `st.mode='none'; st.jit=.012; return {};`);
const AR1 = await p.evaluate(() => ({shots:HKA_AR.AR.shots, hearts:HKA_AR.AR.hearts, score:HKA_AR.AR.score, phase:HKA._A.phase}));
ok(AR1.shots === 0 && AR1.hearts === 3 && AR1.score === 0, `archery, standing still: shots ${AR1.shots}, hearts ${AR1.hearts}, score ${AR1.score}, phase ${AR1.phase}`);
await p.screenshot({path:'ar4-arash-still.png'});
// real shooting: strong pulls, angles tuned so that some arrows land
const pr = play('arash', 40, `st.pulls=[.95,.8,.9,1,.7,.85]; st.angs=[0,6,-4,10,3,0]; ` + ARCH.replace("const want = st.pulls ? st.pulls[n % st.pulls.length] : 0.9, ang = st.angs ? st.angs[n % st.angs.length] : 0;", "const want = st.pulls[n % st.pulls.length], ang = st.angs[n % st.angs.length];"));
await p.waitForTimeout(9000); await p.screenshot({path:'ar4-arash-1.png'}); await p.waitForTimeout(2500); await p.screenshot({path:'ar4-arash-2.png'});
const rr = await pr;
const AR2 = await p.evaluate(() => ({shots:HKA_AR.AR.shots, hits:HKA_AR.AR.hits, hearts:HKA_AR.AR.hearts, score:HKA_AR.AR.score, phase:HKA._A.phase}));
ok(AR2.shots >= 3, `archery, draw + release: ${AR2.shots} arrows shot (score ${AR2.score}, hits ${AR2.hits}, hearts ${AR2.hearts}, phase ${AR2.phase})`);
// ---------- weak pull must not fire
const r3 = await play('arash', 14, `st.pulls=[.12]; st.angs=[0]; ` + ARCH.replace("const want = st.pulls ? st.pulls[n % st.pulls.length] : 0.9, ang = st.angs ? st.angs[n % st.angs.length] : 0;", "const want = st.pulls[0], ang = st.angs[0];"));
const AR3 = await p.evaluate(() => ({shots:HKA_AR.AR.shots, hearts:HKA_AR.AR.hearts}));
ok(AR3.shots === 0 && AR3.hearts === 3, `archery, a feeble pull: ${AR3.shots} arrows, hearts ${AR3.hearts}`);
// ---------- holding a full draw with a shaky camera and odd glitchy frames must never fire by itself
const HOLD = `st.jit = .008; const pull = Math.min(.9, Math.max(0, (t - .6)/.8)*.9), span = (.62 + .95*pull)*.1845, glitch = t > 2 && Math.floor(t*30) % 21 < 2;   // two bad frames in a row
  return {13:[.70,.30],15:[.76,.30],19:[.77,.30], 14:[.62,.34], 16:[glitch ? .70 : .76 - span, .32], 20:[.76 - span, .32]};`;
await play('arash', 12, HOLD);
const AR4 = await p.evaluate(() => ({shots:HKA_AR.AR.shots, state:HKA_AR.AR.state, pull:+HKA_AR.AR.pull.toFixed(2)}));
ok(AR4.shots === 0 && AR4.state === "draw", `archery, holding a full draw 10 s with a shaky camera and glitches: ${AR4.shots} arrows, still ${AR4.state} at ${AR4.pull} ${JSON.stringify(await p.evaluate(() => HKA_AR.AR.why || null))}`);
// ---------- releasing the way a real archer does: the drawing hand flies back after a held draw
const FLICK = `st.jit = .004; const pull = Math.min(.9, Math.max(0, (t - .6)/.8)*.9), span = (.62 + .95*pull)*.1845, back = t > 2.6 ? Math.min(.14, (t - 2.6)*1.4) : 0;
  return t > 4 ? {} : {13:[.70,.30],15:[.76,.30],19:[.77,.30], 14:[.62,.34], 16:[.76 - span - back, .32 + back*.3], 20:[.76 - span - back, .32]};`;
await play('arash', 11, FLICK);
const AR5 = await p.evaluate(() => HKA_AR.AR.shots);
ok(AR5 === 1, `archery, a quick flick of the drawing hand after holding: ${AR5} arrow`);
// ---------- flap
const FLAP = `
  const f = st.hz || 1.9, ph = (t*f) % 1, tri = ph < .5 ? ph*2 : (1 - ph)*2;   // 0 → 1 → 0
  // wrists from high (.10) to low (.46); elbows follow
  const y = .12 + .36*tri, ey = .26 + .12*tri; if(st.mode === 'none') return {};
  return st.mode === 'glide' ? {13:[.72,.30],14:[.28,.30],15:[.86,.30],16:[.14,.30],19:[.87,.30],20:[.13,.30]} : {13:[.7,ey],14:[.3,ey],15:[.82,y],16:[.18,y],19:[.83,y],20:[.17,y]};`;
const f0 = await play('flap', 14, `st.mode='none'; st.jit=.012; return {};`);
const FL0 = await p.evaluate(() => ({score:HKA_FL.F.score, hearts:HKA_FL.F.hearts, started:HKA_FL.F.started}));
ok(FL0.score === 0 && FL0.hearts === 3 && !FL0.started, `flap, standing still: started ${FL0.started}, score ${FL0.score}, hearts ${FL0.hearts}`);
const fp = play('flap', 45, `st.hz=2.0; ` + FLAP);
await p.waitForTimeout(12000); await p.screenshot({path:'ar4-flap-1.png'}); await p.waitForTimeout(6000); await p.screenshot({path:'ar4-flap-2.png'});
await fp;
const FL1 = await p.evaluate(() => ({score:HKA_FL.F.score, hearts:HKA_FL.F.hearts, started:HKA_FL.F.started, y:Math.round(HKA_FL.F.y), phase:HKA._A.phase, cols:HKA_FL.F.cols.length}));
ok(FL1.started && FL1.score + (3 - FL1.hearts) >= 1, `flap, flapping: started ${FL1.started}, score ${FL1.score}, hearts ${FL1.hearts}, phase ${FL1.phase}, columns ${FL1.cols}`);
console.log(res.join('\n')); console.log('errors', errs); await b.close();
