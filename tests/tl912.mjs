// lessons 9-12: the game kinds that are new here, end to end.
//  * «گل یا پوچ»: a wrong guess never counts, a right one does, the game finishes with no grown-up step
//  * family games: potato (music stops by itself, both answers work), tapping rhythm of تاپ‌تاپ خمیر (every branch), the
//    generalized balloon ring and waist-basket tally
//  * tally star pages: a record asks a grown-up; the step-up camera count adds to the number
//  * the story's find-the-word works, including the three-word phrase of lesson 12
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',`--use-file-for-fake-video-capture=${process.cwd()}/blank.y4m`]});
const p = await (await b.newContext({viewport:{width:390,height:844}, permissions:['camera']})).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.setDefaultTimeout(15000);
await p.goto('file:///home/user/haftkhan/prototype/index.html'); await p.fill('#kidName','سارا'); await p.click('#helloGo'); await p.waitForTimeout(400);
const res = []; const ok = (c, msg) => res.push(`${c ? 'OK  ' : 'FAIL'} ${msg}`);
const khanOf = n => n <= 2 ? 0 : n <= 4 ? 1 : n <= 6 ? 2 : n <= 8 ? 3 : n <= 10 ? 4 : n === 11 ? 5 : 6;
const toLesson = async n => { await p.evaluate(() => HK.go('map')); await p.click(`.khan >> nth=${khanOf(n)}`); await p.waitForTimeout(250); };
const act = async (n, a) => { await toLesson(n); await p.click(`#mz${n} [data-act="${a}"]`); await p.waitForTimeout(300); };

// 1. گل یا پوچ
{ await act(12, 'play'); await p.click('#gcChoices .choice >> nth=1'); await p.waitForTimeout(300);
  const fists = await p.$$eval('#gxQuiz .fist', a => a.length), cam = await p.isVisible('#gxCam');
  let wrongCount = null;
  const sec = await p.evaluate(() => HKX._X.secret); await p.click(`#gxQuiz .fist >> nth=${1 - sec}`); await p.waitForTimeout(150);
  wrongCount = await p.evaluate(() => HKX._X.count);
  await p.waitForTimeout(1200);
  for(let k = 0; k < 14 && !(await p.isVisible('#gxFeel')); k++){ const s2 = await p.evaluate(() => HKX._X.secret); await p.click(`#gxQuiz .fist >> nth=${s2}`); await p.waitForTimeout(1150); }
  const feel = await p.isVisible('#gxFeel'), seen = await p.isVisible('#gxSeen');
  ok(fists === 2 && !cam && wrongCount === 0 && feel && !seen, `L12 گل یا پوچ: ${fists} fists, no camera button ${!cam}, wrong guess counted ${wrongCount}, finished ${feel}, grown-up step ${seen}`);
  // the coin is not always in the same fist
  const seq = []; for(let k = 0; k < 24; k++) seq.push(await p.evaluate(() => (Math.random() < .5 ? 0 : 1)));
  // (the game's own randomness) check by replaying rounds
  await act(12, 'play'); await p.click('#gcChoices .choice >> nth=1'); const seen2 = new Set();
  for(let k = 0; k < 12; k++){ seen2.add(await p.evaluate(() => HKX._X.secret)); const s3 = await p.evaluate(() => HKX._X.secret); await p.click(`#gxQuiz .fist >> nth=${1 - s3}`); await p.waitForTimeout(1050); }
  ok(seen2.size === 2, `L12 the coin moves between the fists (${[...seen2]})`); }

// 2. potato
{ await act(9, 'gfam'); await p.click('#ptGo'); await p.waitForTimeout(500); const playing = await p.evaluate(() => HKMusic.playing());
  await p.waitForFunction(() => document.querySelector('#ptIn'), null, {timeout:16000});
  ok(playing, `L9 potato: music plays (${playing}) and stops by itself with the two answer buttons`);
  await p.click('#ptIn'); await p.waitForTimeout(200); const t1 = await p.textContent('#ptCall');
  await p.click('#ptGo'); await p.waitForFunction(() => document.querySelector('#ptOut'), null, {timeout:16000}); await p.click('#ptOut'); await p.waitForTimeout(200); const t2 = await p.textContent('#ptCall');
  const done = await p.evaluate(() => HK.state.L[9].family);
  ok(/آفرین/.test(t1) && /شیرین‌کاری/.test(t2) && done, `L9 potato: in «${t1.slice(0, 18)}», out «${t2.slice(0, 22)}», lesson marked ${done}`); }
// 3. khamir
{ await act(12, 'gfam'); const stages = [];
  const cardText = () => p.textContent('#khCard');
  await p.click('#khGo'); await p.waitForTimeout(1500); stages.push(/تاپ‌تاپ/.test(await cardText()));
  await p.click('#khUp'); stages.push(/دستِ کی/.test(await cardText()));
  await p.click('#khWrong'); stages.push(/خرّازی/.test(await cardText()));
  await p.click('#khNeedle'); stages.push(/سوزن/.test(await cardText()) && /آرام/.test(await cardText()));
  await p.click('#khNext'); await p.click('#khGo'); await p.click('#khUp'); await p.click('#khWrong'); await p.click('#khScissors'); stages.push(/قیچی/.test(await cardText()));
  await p.click('#khNext'); await p.click('#khGo'); await p.click('#khUp'); await p.click('#khRight'); stages.push(/درست حدس زد/.test(await cardText()));
  const done = await p.evaluate(() => HK.state.L[12].family);
  ok(stages.every(Boolean) && done, `L12 khamir: every branch ${stages.join(',')}, lesson marked ${done}`); }
// 4. balloon ring (lesson 10) and waist baskets (lesson 11)
{ await act(10, 'gfam'); await p.click('#rnBtn'); await p.waitForTimeout(1200); await p.click('#rnBtn'); await p.waitForTimeout(250);
  const log = await p.evaluate(() => [HK.state.L[10].log.ring10 && HK.state.L[10].log.ring10.length, HK.state.L[7].log.ring ? HK.state.L[7].log.ring.length : 0]);
  ok(log[0] === 1 && !log[1], `L10 ring: its own record (${log[0]}), lesson 7's untouched (${log[1]})`);
  await act(11, 'gfam'); await p.click('#fMusic'); await p.waitForTimeout(800); const call = await p.textContent('#fCall'), props = await p.$$eval('.propstrip img', a => a.map(i => i.getAttribute('src').split('/').pop()).join(','));
  await p.click('#fMusic'); await p.waitForTimeout(200);
  ok(/پرش/.test(call) && /ball-red/.test(props), `L11 waist baskets: «${call.slice(0, 22)}», props ${props}`); }
// 5. tally star pages
{ await act(9, 'gstar'); const max = 15;
  await p.click('#rsPlus'); await p.click('#rsPlus'); await p.click('#rsSave'); await p.waitForTimeout(200);
  await p.click('#rsPlus'); await p.click('#rsPlus'); await p.click('#rsSave'); await p.waitForTimeout(200);
  const ask = await p.isVisible('#rsYes'); if(ask) await p.click('#rsYes'); await p.waitForTimeout(200);
  const st9 = await p.evaluate(() => HK.state.L[9].stars);
  for(let k = 0; k < 30; k++) await p.click('#rsPlus', {timeout:2000}).catch(()=>{}); const v = await p.textContent('#rsFeet');
  ok(ask && st9 === 1 && v.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)) == max, `L9 tally: a higher number asks a grown-up (${ask}), then a star (${st9}); the stepper stops at ${v}`);
  await act(12, 'gstar'); for(let k = 0; k < 9; k++) await p.click('#rsPlus', {timeout:2000}).catch(()=>{}); const v12 = await p.textContent('#rsFeet');
  ok(/[۵5]/.test(v12), `L12 tally stops at five stones (${v12})`); }
// 6. step-up counting through the real camera loop
{ await act(11, 'gstar'); await p.click('#rsCamS'); await p.waitForTimeout(3500);
  const counted = await p.evaluate(async () => {
    const CAM = HK.CAM, keep = CAM.stream; CAM.stream = null; await new Promise(r => setTimeout(r, 120));
    const W = 640, H = 480, cv = {width:W, height:H}, ctx = new OffscreenCanvas(W, H).getContext('2d');
    const base = {0:[.5,.2],7:[.53,.19],8:[.47,.19],11:[.58,.3],12:[.42,.3],13:[.6,.42],14:[.4,.42],15:[.6,.52],16:[.4,.52],19:[.6,.54],20:[.4,.54],23:[.55,.55],24:[.45,.55],25:[.55,.72],26:[.45,.72],27:[.55,.9],28:[.45,.9],29:[.55,.91],30:[.45,.91],31:[.56,.93],32:[.44,.93]};
    let seed = 3; const rnd = () => { seed = (seed*16807) % 2147483647; return seed/2147483647; }; const g = () => { let u = 0; for(let i = 0; i < 6; i++) u += rnd(); return (u - 3)/1.2; };
    const run = async (mode, secs) => { const t0 = performance.now(); const start = +document.querySelector('#rsFeet').textContent.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
      while(performance.now() - t0 < secs*1000){ const t = performance.now() - t0; const up = mode === 'play' && t > 2500 && ((t - 2500) % 1800) < 900;
        const lm = []; for(let i = 0; i < 33; i++){ const v = base[i] || [.5, .5]; lm[i] = {x:v[0] + (mode === 'still' ? .01 : .003)*g(), y:v[1] + (up ? -.07 : 0) + (mode === 'still' ? .01 : .003)*g(), visibility:.95}; }
        CAM.onFrame && CAM.onFrame(ctx, lm, cv); await new Promise(r => setTimeout(r, 33)); }
      return +document.querySelector('#rsFeet').textContent.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)) - start; };
    const still = await run('still', 6), play = await run('play', 12); CAM.stream = keep; return {still, play}; });
  ok(counted.still === 0 && counted.play >= 3, `L11 step-up camera: still ${counted.still}, stepping ${counted.play}`); }
// 7. find the word in every story: the number the lesson promises is the number there is
{ for(const n of [9, 10, 11, 12]){
    await act(n, 'gstory'); const pages = await p.evaluate(() => 0); const np = await p.evaluate(n => HKX.LESSONS[n].story.pages.length, n);
    await p.evaluate(({np}) => HKX._story.renderStory(np), {np}); await p.waitForTimeout(300);
    const want = await p.evaluate(n => HKX.LESSONS[n].count, n);
    const cands = await p.$$('#gsBody .w'); let hit = 0;
    for(const c of cands){ const t = await c.textContent(); const before = await p.textContent('#gsFound'); await c.click(); const after = await p.textContent('#gsFound'); if(after !== before) hit++; }
    const done = await p.evaluate(n => HK.state.L[n].story, n);
    ok(hit === want && done, `L${n} find-the-word: found ${hit} of ${want}, story marked ${done}`); } }
// 8. parents page lists all twelve lessons, and a finished lesson 12 passes the last khan
{ await p.evaluate(() => { const d = HK.dayNum(); for(const n of [11, 12]){ HK.state.L[n].days.splice(0, 3, {d:d-6,moves:[0],feel:1}, {d:d-4,moves:[0],feel:1}, null); } HK.save(); });
  await act(12, 'play'); await p.click('#gcChoices .choice >> nth=0'); await p.waitForTimeout(250);
  for(let k = 0; k < 6; k++){ await p.evaluate(() => { const X = HKX._X; X.count = X.games[X.qi].goal - 1; X.lastTap = 0; }); await p.waitForTimeout(900); await p.click('#gxTap'); await p.waitForTimeout(500); if(await p.isVisible('#gxSeen')){ await p.click('#gxSeenYes'); await p.waitForTimeout(300); } if(await p.isVisible('#gxFeel')) break; }
  await p.click('#gxFeel [data-feel="2"]'); await p.waitForTimeout(500);
  const title = await p.textContent('#gxRewardTitle'), lit = await p.evaluate(() => HK.state.L[12].days.filter(Boolean).length);
  ok(lit === 3 && /گذشتی|تمام/.test(title), `L12 third torch: «${title}», torches ${lit}`);
  await p.evaluate(() => HK.go('parents')); await p.waitForTimeout(300); const tabs = await p.$$eval('#pTabs button', a => a.length);
  ok(tabs === 12, `parents page has a tab for every lesson (${tabs})`); }
// 9. the balloon games of lessons 10 and 11 (foot and knee, hand) run through the camera loop without errors,
//    and a body standing still never scores
for(const [n, i] of [[10, 1], [11, 0]]){
  await act(n, 'play'); await p.click(`#gcChoices .choice >> nth=${i}`); await p.waitForTimeout(300); await p.click('#gxCam'); await p.waitForTimeout(3500);
  const r = await p.evaluate(async () => {
    const CAM = HK.CAM, X = HKX._X, keep = CAM.stream; CAM.stream = null; await new Promise(r => setTimeout(r, 120));
    const W = 640, H = 480, cv = {width:W, height:H}, ctx = new OffscreenCanvas(W, H).getContext('2d');
    const base = {0:[.5,.2],7:[.53,.19],8:[.47,.19],11:[.58,.3],12:[.42,.3],13:[.6,.42],14:[.4,.42],15:[.6,.52],16:[.4,.52],19:[.6,.54],20:[.4,.54],23:[.55,.55],24:[.45,.55],25:[.55,.72],26:[.45,.72],27:[.55,.9],28:[.45,.9],29:[.55,.91],30:[.45,.91],31:[.56,.93],32:[.44,.93]};
    const t0 = performance.now(); let seed = 9; const rnd = () => { seed = (seed*16807) % 2147483647; return seed/2147483647; };
    while(performance.now() - t0 < 9000){ const lm = []; for(let i = 0; i < 33; i++){ const v = base[i] || [.5, .5]; lm[i] = {x:v[0] + .004*(rnd() - .5), y:v[1] + .004*(rnd() - .5), visibility:.95}; }
      CAM.onFrame && CAM.onFrame(ctx, lm, cv); await new Promise(r => setTimeout(r, 33)); }
    CAM.stream = keep; return {count:X.count, balls:X.balls.length}; });
  ok(r.count === 0 && r.balls === 1, `L${n} balloon game through the camera: a still body scores ${r.count}, balloons ${r.balls}`);
}
console.log(res.join('\n')); console.log('errors', errs); await b.close();
