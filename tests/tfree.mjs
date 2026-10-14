// "the child can always play more": no screen in the game may stop a child who wants another round.
// For every built lesson, on every kind of day (played today, rest day, all three torches lit), the play tile must
// open a game, a finished game must offer another round, and replaying must never light an extra torch.
// Also: a quiz must stay finishable at every level, and a finished story task can be done again.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p = await (await b.newContext({viewport:{width:390,height:844}})).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.setDefaultTimeout(8000);
await p.goto('file:///home/user/haftkhan/prototype/index.html'); await p.fill('#kidName','سارا'); await p.click('#helloGo'); await p.waitForTimeout(400);
const res = []; const ok = (c, msg) => res.push(`${c ? 'OK  ' : 'FAIL'} ${msg}`);
const khanOf = n => n <= 2 ? 0 : n <= 4 ? 1 : n <= 6 ? 2 : n <= 8 ? 3 : n <= 10 ? 4 : n === 11 ? 5 : 6;
// set a lesson's days: 'today' (played today), 'rest' (played yesterday), 'done' (three torches)
const setDays = (n, kind) => p.evaluate(({n, kind}) => { const d = HK.dayNum(), days = n === 5 ? HK.state.days : HK.state.L[n].days;
  days.splice(0, 3, null, null, null);
  if(kind === 'today') days[0] = {d, moves:[0], move:0, feel:1};
  if(kind === 'rest') days[0] = {d:d - 1, moves:[0], move:0, feel:1};
  if(kind === 'done') for(let i = 0; i < 3; i++) days[i] = {d:d - 2*(3 - i), moves:[0], move:0, feel:1};
  HK.save(); }, {n, kind});
const torches = n => p.evaluate(n => (n === 5 ? HK.state.days : HK.state.L[n].days).filter(Boolean).length, n);
// finish whatever game is on screen, honestly through its own buttons
async function finishGame(){
  for(let guard = 0; guard < 14; guard++){
    if(await p.isVisible('#gxReward')) return true;
    if(await p.isVisible('#gxSeen')){ await p.click('#gxSeenYes'); await p.waitForTimeout(150); continue; }
    if(await p.isVisible('#gxFeel')){ await p.click('#gxFeel [data-feel="2"]'); await p.waitForTimeout(400); continue; }
    const g = await p.evaluate(() => { const X = HKX._X, g = X.games[X.qi]; return {kind:g.kind, goal:g.goal}; });
    if(g.kind === 'guess'){ for(let k = 0; k < g.goal + 2 && !(await p.isVisible('#gxFeel')); k++){ const sec = await p.evaluate(() => HKX._X.secret); await p.click(`#gxQuiz .fist >> nth=${sec}`); await p.waitForTimeout(1150); } continue; }
    if(g.kind === 'quiz'){ for(const x of await p.$$('#gxQuiz .qi[data-good="1"]')) await x.click(); await p.waitForTimeout(700); continue; }
    await p.evaluate(() => { const X = HKX._X; X.count = X.games[X.qi].goal - 1; X.lastTap = 0; });   // skip to the last repetition
    await p.waitForTimeout(1300); await p.click('#gxTap'); await p.waitForTimeout(g.kind === 'hold' ? 1600 : 800);
  }
  return p.isVisible('#gxReward');
}
for(const n of [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12]){
  for(const kind of ['today', 'rest', 'done']){
    await setDays(n, kind); const before = await torches(n);
    await p.evaluate(() => HK.go('map')); await p.click(`.khan >> nth=${khanOf(n)}`); await p.waitForTimeout(200);
    await p.click(`#mz${n} [data-act="play"]`); await p.waitForTimeout(250);
    const choosing = await p.evaluate(() => document.documentElement.dataset.screen);
    await p.click('#gcChoices .choice >> nth=0'); await p.waitForTimeout(200);
    if(await p.$('#gcStart')){ const pick = await p.evaluate(n => HKX.LESSONS[n].play.pick, n); for(let j = 1; j < pick; j++) await p.click(`#gcChoices .choice >> nth=${j}`); await p.click('#gcStart'); }
    await p.waitForTimeout(300);
    const done1 = await finishGame(), again = await p.isVisible('#gxAgain');
    if(again){ await p.click('#gxAgain'); await p.waitForTimeout(300); }
    const restarted = await p.evaluate(() => document.documentElement.dataset.screen === 'gex' && HKX._X.count === 0 && document.querySelector('#gxReward').hidden);
    const done2 = restarted && await finishGame();
    const after = await torches(n);
    ok(choosing === 'gchoose' && done1 && again && restarted && done2 && after === before, `L${n} ${kind}: opens ${choosing}, finished ${done1}, again ${again}, second round ${done2}, torches ${before}→${after}`);
  }
}
// lesson 5 keeps its own screens: a rest day must open free play, not a shaking tile
for(const kind of ['today', 'rest', 'done']){
  await setDays(5, kind); const before = await torches(5);
  await p.evaluate(() => HK.go('map')); await p.click('.khan >> nth=2'); await p.waitForTimeout(200);
  await p.click('#playTile'); await p.waitForTimeout(250);
  const scr = await p.evaluate(() => document.documentElement.dataset.screen), note = await p.isVisible('#free5');
  let rounds = 0;
  for(let r = 0; r < 2 && scr === 'choose'; r++){
    await p.click('#choices .choice >> nth=0'); await p.waitForTimeout(300);
    const goal = await p.evaluate(() => +document.querySelector('#tapUnit').textContent.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/\D/g, ''));
    for(let k = 0; k < goal; k++){ await p.click('#tap'); await p.waitForTimeout(1250); }
    if(await p.isVisible('#seen5')) await p.click('#seen5Yes');
    await p.waitForTimeout(200); await p.click('#feel [data-feel="2"]'); await p.waitForTimeout(500);
    if(await p.isVisible('#reward')) rounds++;
    if(r === 0){ if(!await p.isVisible('#again5')) break; await p.click('#again5'); await p.waitForTimeout(250); }
  }
  const after = await torches(5);
  ok(scr === 'choose' && note && rounds === 2 && after === before, `L5 ${kind}: opens ${scr}, free-play note ${note}, rounds ${rounds}, torches ${before}→${after}`);
}
// lesson 5 on a playing day still lights its torch
{ await setDays(5, 'none'); await p.evaluate(() => HK.go('map')); await p.click('.khan >> nth=2'); await p.click('#playTile'); await p.waitForTimeout(200);
  const note = await p.isVisible('#free5'); ok(!note, `L5 on a playing day is a real day, not free play (${!note})`); }
// a quiz stays finishable at every level
{ await p.evaluate(() => { HK.state.lv = HK.state.lv || {}; HK.state.lv.kid = Object.assign(HK.state.lv.kid || {}, {'6-1':9, '6-2':9}); HK.save(); });
  for(const i of [1, 2]){ await p.evaluate(() => HK.go('map')); await p.click('.khan >> nth=2'); await p.click('#mz6 [data-act="play"]'); await p.click(`#gcChoices .choice >> nth=${i}`); await p.waitForTimeout(300);
    const [goal, good] = await p.evaluate(() => [HKX._X.games[0].goal, document.querySelectorAll('#gxQuiz .qi[data-good="1"]').length]);
    ok(goal === good, `L6 quiz ${i} at level 9: goal ${goal}, right answers on screen ${good}`); } }
// a finished story task can be done again
{ await p.evaluate(() => HK.go('map')); await p.click('.khan >> nth=1'); await p.click('#mz4 [data-act="gstory"]'); await p.evaluate(() => HKX._story.renderStory(3)); await p.waitForTimeout(200);
  for(let k = 0; k < 8; k++){ await p.click('#tkCnt'); await p.waitForTimeout(650); }
  const again = await p.isVisible('#gsAgain'); if(again) await p.click('#gsAgain'); await p.waitForTimeout(200);
  const reset = await p.evaluate(() => document.querySelector('#tkCnt').firstChild.nodeValue.trim());
  ok(again && reset === '۰', `story task: "once more" after finishing (${again}), counter back to ${reset}`); }
console.log(res.join('\n')); console.log('errors', errs); await b.close();
