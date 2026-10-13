// lessons 6-8: the new kinds of game, end to end.
//  * held stretches (lesson 7) and body percussion (lesson 8) through the real camera loop: standing still must
//    count nothing, the real pose / pattern must count
//  * the touch quizzes (lesson 6): a wrong picture never counts, the right ones finish the game with no grown-up step
//  * a held stretch without the camera: one tap runs the seconds, a grown-up confirms at the end
//  * the new family games and star pages: every button does what it says
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',`--use-file-for-fake-video-capture=${process.cwd()}/blank.y4m`]});
const p = await (await b.newContext({viewport:{width:390,height:844}, permissions:['camera']})).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.setDefaultTimeout(15000);
await p.goto('file:///home/user/haftkhan/prototype/index.html'); await p.fill('#kidName','سارا'); await p.click('#helloGo'); await p.waitForTimeout(400);
const res = []; const ok = (c, msg) => res.push(`${c ? 'OK  ' : 'FAIL'} ${msg}`);
const khanOf = n => n <= 2 ? 0 : n <= 4 ? 1 : n <= 6 ? 2 : 3;
const openGame = async (n, i) => {
  await p.evaluate(() => HK.go('map')); await p.click(`.khan >> nth=${khanOf(n)}`); await p.click(`#mz${n} [data-act="play"]`); await p.waitForTimeout(200);
  await p.click(`#gcChoices .choice >> nth=${i}`); await p.waitForTimeout(200);
  if(await p.$('#gcStart')){ const pick = await p.evaluate(n => HKX.LESSONS[n].play.pick, n), nc = await p.$$eval('#gcChoices .choice', a => a.length);
    for(let j = 1; j < pick; j++) await p.click(`#gcChoices .choice >> nth=${(i + j) % nc}`); await p.click('#gcStart'); }
  await p.waitForTimeout(300);
};
const feed = (mode, seqName, secs) => p.evaluate(async ({mode, seqName, secs}) => {
  const CAM = HK.CAM, X = HKX._X, keep = CAM.stream; CAM.stream = null; await new Promise(r => setTimeout(r, 120));
  const W = 640, H = 480, cv = {width:W, height:H}, ctx = new OffscreenCanvas(W, H).getContext('2d');
  const base = {0:[.5,.2],7:[.53,.19],8:[.47,.19],11:[.58,.3],12:[.42,.3],13:[.6,.42],14:[.4,.42],15:[.6,.52],16:[.4,.52],19:[.6,.54],20:[.4,.54],23:[.55,.55],24:[.45,.55],25:[.55,.72],26:[.45,.72],27:[.55,.9],28:[.45,.9],29:[.55,.91],30:[.45,.91],31:[.56,.93],32:[.44,.93]};
  const legL = {25:[.56,.6],27:[.57,.76],29:[.57,.77],31:[.58,.78]}, legR = {26:[.44,.6],28:[.43,.76],30:[.43,.77],32:[.42,.78]};
  const clap = {15:[.51,.4],16:[.49,.4],19:[.51,.39],20:[.49,.39],13:[.58,.45],14:[.42,.45]};
  const push = {15:[.6,.3],16:[.4,.3],19:[.6,.29],20:[.4,.29],13:[.62,.32],14:[.38,.32]};
  const pushR = {16:[.4,.3],20:[.4,.29],14:[.38,.32]}, pushL = {15:[.6,.3],19:[.6,.29],13:[.62,.32]};
  const POSE = {
    tri: {27:[.66,.9],28:[.34,.9],29:[.66,.91],30:[.34,.91],31:[.67,.93],32:[.33,.93],25:[.62,.72],26:[.38,.72],15:[.66,.12],19:[.66,.11],13:[.64,.2],16:[.36,.7],20:[.36,.71],14:[.4,.5]},
    warrior: {27:[.68,.9],28:[.32,.9],29:[.68,.91],30:[.32,.91],31:[.69,.93],32:[.31,.93],25:[.66,.72],26:[.38,.72],15:[.85,.3],16:[.15,.3],19:[.87,.3],20:[.13,.3],13:[.72,.3],14:[.28,.3]},
    straddle: {0:[.5,.3],7:[.53,.29],8:[.47,.29],11:[.58,.4],12:[.42,.4],13:[.6,.52],14:[.4,.52],15:[.6,.62],16:[.4,.62],23:[.55,.7],24:[.45,.7],25:[.63,.74],26:[.37,.74],27:[.72,.78],28:[.28,.78],29:[.72,.79],30:[.28,.79],31:[.73,.76],32:[.27,.76]}
  };
  const gap = [{}, 260];
  const SEQ = {
    hold: null,
    r1: [[legL, 300], gap, [legR, 300], gap, [legL, 300], gap, [legR, 300], gap, [clap, 300], gap, [clap, 300], gap, [push, 300], gap, [push, 300], gap],
    r2: [[legL, 300], gap, [legR, 300], gap, [legL, 300], gap, [legR, 300], gap, [clap, 300], gap, [pushR, 300], gap, [clap, 300], gap, [pushL, 300], gap]
  };
  const seq = POSE[seqName] ? [[POSE[seqName], 1000]] : SEQ[seqName];
  let seed = 5; const rnd = () => { seed = (seed*16807) % 2147483647; return seed/2147483647; }; const g = () => { let u = 0; for(let i = 0; i < 6; i++) u += rnd(); return (u - 3)/1.2; };
  const J = mode === 'still' ? .01 : .003, t0 = performance.now(), total = seq.reduce((s, [, ms]) => s + ms, 0); let reps = 0, last = X.count;
  while(performance.now() - t0 < secs*1000){
    let pose = {...base};
    if(mode === 'play' && performance.now() - t0 > 2000){ let t = (performance.now() - t0 - 2000) % total; for(const [o, ms] of seq){ if(t < ms){ Object.assign(pose, o); break; } t -= ms; } }
    const lm = []; for(let i = 0; i < 33; i++){ const v = pose[i] || [.5,.5]; lm[i] = {x:v[0] + J*g(), y:v[1] + J*g(), visibility: pose[i] ? .95 : .1}; }
    CAM.onFrame && CAM.onFrame(ctx, lm, cv); if(X.count > last) reps += X.count - last; last = X.count;
    await new Promise(r => setTimeout(r, 33));
  }
  CAM.stream = keep; return reps;
}, {mode, seqName, secs});

// 1. held stretches and body percussion, with the camera
const camGames = [[7, 0, 'tri', 'مثلث'], [7, 1, 'warrior', 'جنگجو'], [7, 2, 'straddle', 'نشستن با پاهای باز'], [8, 0, 'r1', 'بدن‌کوبه ۱'], [8, 1, 'r2', 'بدن‌کوبه ۲']];
for(const [n, i, sq, name] of camGames){
  const run = async (mode, secs) => { await openGame(n, i); await p.click('#gxCam'); await p.waitForTimeout(3500); return feed(mode, sq, secs); };
  const still = await run('still', 8), play = await run('play', sq.startsWith('r') ? 16 : 9);
  ok(still === 0 && play >= 3, `L${n} ${name} (camera): still ${still}, moving ${play}`);
}
// the other stretches must not light up under the wrong pose: a warrior is not a triangle
{ await openGame(7, 0); await p.click('#gxCam'); await p.waitForTimeout(3500); const w = await feed('play', 'warrior', 7); ok(w === 0, `L7 triangle does not count a warrior pose: ${w}`); }

// 2. the quizzes: wrong answers never count, right ones finish without a grown-up step
for(const i of [1, 2]){
  await openGame(6, i);
  const bad = await p.$$('#gxQuiz .qi[data-good="0"]'); for(const x of bad.slice(0, 2)) await x.click();
  const afterBad = await p.evaluate(() => HKX._X.count);
  const good = await p.$$('#gxQuiz .qi[data-good="1"]'); for(const x of good){ await x.click(); await p.waitForTimeout(80); }
  await p.waitForTimeout(800);
  const feel = await p.isVisible('#gxFeel'), seen = await p.isVisible('#gxSeen'), hint = await p.textContent('#gxHint');
  ok(afterBad === 0 && feel && !seen, `L6 quiz ${i}: wrong ${afterBad}, done → faces ${feel}, grown-up step ${seen}`);
  if(i === 1) ok(/./.test(hint), `L6 quiz hint after a wrong pick: «${hint}»`);
}
// 3. a held stretch without the camera: one tap starts the seconds, a grown-up confirms at the end
{ await openGame(7, 3); const goal = await p.evaluate(() => HKX._X.games[0].goal);
  await p.click('#gxTap'); await p.click('#gxTap'); await p.waitForTimeout(goal*1000 + 900);
  const seen = await p.isVisible('#gxSeen'), c = await p.evaluate(() => HKX._X.count);
  ok(seen && c === goal, `L7 dog without camera: ${c}/${goal} seconds, grown-up asked ${seen}`);
  await p.click('#gxSeenYes'); await p.waitForTimeout(400); const t2 = await p.textContent('#gxTitle');
  ok(/حرکتِ ۲ از ۳/.test(t2), `L7 three picks: after the first comes the second («${t2.replace(/\s+/g, ' ').slice(0, 60)}»)`); }
// rhythm without camera: the beat plays by itself, a tap is one whole pattern, a fast tap is refused
{ await openGame(8, 0); await p.waitForTimeout(1500); const lit = await p.$$eval('#gxBeats i.on', a => a.length);
  await p.click('#gxTap'); await p.click('#gxTap'); const c = await p.evaluate(() => HKX._X.count);
  ok(lit === 1 && c === 1, `L8 rhythm without camera: a beat is lit (${lit}), two quick taps count ${c}`);
  await p.evaluate(() => HK.go('map')); await p.waitForTimeout(300); const on = await p.evaluate(() => HKX._X.beatOn);
  ok(!on, 'L8 the beat stops when leaving the game'); }

// 4. family games
const fam = async n => { await p.evaluate(() => HK.go('map')); await p.click(`.khan >> nth=${khanOf(n)}`); await p.click(`#mz${n} [data-act="gfam"]`); await p.waitForTimeout(300); };
{ await fam(6); const nAgr = await p.$$eval('.agr.on', a => a.length);
  for(const x of await p.$$('.agr.on')) await x.click();          // none agreed: the game must not start
  await p.click('#rgGo'); const stuck = await p.isVisible('.agree');
  for(const x of (await p.$$('.agr')).slice(0, 3)) await x.click();
  await p.click('#rgGo'); await p.waitForTimeout(200);
  for(let k = 0; k < 3; k++){ await p.click('#rgNext'); await p.waitForTimeout(150); }
  await p.waitForTimeout(3500); const ans = await p.isVisible('#rgAns'), txt = await p.textContent('#rgAns');
  ok(nAgr === 5 && stuck && ans && /سبز|قرمز/.test(txt), `L6 green/red: needs 3 agreements (${stuck}), statement answered «${txt.slice(0, 30)}»`); }
{ await fam(7); await p.click('#rnBtn'); await p.waitForTimeout(1300); const playing = await p.evaluate(() => window.HKMusic && HKMusic.playing());
  await p.click('#rnBtn'); await p.waitForTimeout(300); const call = await p.textContent('#rnCall'), stopped = !(await p.evaluate(() => window.HKMusic && HKMusic.playing()));
  const fam7 = await p.evaluate(() => HK.state.L[7].family);
  ok(/ثانیه/.test(call) && stopped && fam7, `L7 balloon ring: timed round «${call.slice(0, 30)}», music stopped ${stopped}, done ${fam7}`); }
{ await fam(8); await p.click('#cpBtn'); await p.waitForTimeout(2200); const on = await p.$$eval('.cupsteps span.on', a => a.length), card = await p.textContent('#cpCard');
  await p.click('[data-sp="fast"]'); await p.waitForTimeout(800); const still = await p.evaluate(() => HKMusic.playing());
  await p.click('#cpBtn'); await p.waitForTimeout(200); const stop = !(await p.evaluate(() => HKMusic.playing()));
  ok(on === 1 && /!/.test(card) && still && stop, `L8 cups: cue «${card.slice(0, 25)}», tempo change keeps playing ${still}, stop ${stop}`); }

// 5. star pages
const star = async n => { await p.evaluate(() => HK.go('map')); await p.click(`.khan >> nth=${khanOf(n)}`); await p.click(`#mz${n} [data-act="gstar"]`); await p.waitForTimeout(300); };
{ await star(6); const cards = await p.$$eval('.card', a => a.length); await p.click('.card >> nth=0'); await p.click('#cdYes'); await p.waitForTimeout(200);
  const s6 = await p.evaluate(() => HK.state.L[6].stars); const broken = await p.$$eval('.card img', a => a.filter(i => !i.naturalWidth).length);
  ok(cards === 6 && s6 === 1 && broken === 0, `L6 cards: ${cards} cards, a confirmed one is a star (${s6}), broken pictures ${broken}`); }
{ await star(7); const modes = await p.$$eval('.modes [data-m]', a => a.map(x => x.dataset.m).join(','));
  await p.click('#rsSave'); await p.waitForTimeout(150); await p.click('#rsPlus'); await p.click('#rsSave'); await p.waitForTimeout(150);
  const ask = await p.isVisible('#rsYes'); if(ask) await p.click('#rsYes'); await p.waitForTimeout(200);
  const s7 = await p.evaluate(() => HK.state.L[7].stars), unit = await p.textContent('.numin');
  ok(modes === 'feet,tape' && ask && s7 === 1 && /وجب/.test(unit), `L7 doll: modes ${modes}, farther asks a grown-up (${ask}), star ${s7}`); }
{ await star(8); await p.click('#gdGuide'); await p.waitForTimeout(1500); const num = await p.textContent('#gdNum'), cap = await p.textContent('#gdCap');
  await p.click('#gdDone'); await p.click('#gdYes'); await p.waitForTimeout(200); const s8 = await p.evaluate(() => [HK.state.L[8].stars, HK.state.L[8].log.grid]);
  ok(/[۱-۴]/.test(num) && /پا بکوب/.test(cap) && s8[0] === 1 && s8[1] === 1, `L8 grid: guide «${cap}», a confirmed circuit is a star ${s8}`); }

// 6. khan 3 carries lesson 6; the torches of lesson 6 finish the bridge only together with lesson 5
{ await p.evaluate(() => HK.go('map')); await p.click('.khan >> nth=2'); await p.waitForTimeout(300);
  const mz = await p.isVisible('#mz6 [data-act="play"]'), back = await (async () => { await p.click('#mz6 [data-act="gstory"]'); await p.waitForTimeout(200); await p.click('#s-gstory .back'); await p.waitForTimeout(300); return p.evaluate(() => document.documentElement.dataset.screen); })();
  ok(mz && back === 'khan', `khan 3 shows lesson 6 (${mz}), its back button returns to the bridge (${back})`);
  await p.click('#m5 [data-go="story"]'); await p.waitForTimeout(200); const cur = await p.evaluate(() => HK.state.cur);
  ok(cur === 5, `lesson 5's tiles still open lesson 5 after visiting lesson 6 (cur ${cur})`); }
console.log(res.join('\n')); console.log('errors', errs); await b.close();
