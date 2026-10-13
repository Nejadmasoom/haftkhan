// family games through the real camera loop (scripted pose model): osta commands, musical chairs, tissue game
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',`--use-file-for-fake-video-capture=${process.cwd()}/blank.y4m`]});
const p = await (await b.newContext({viewport:{width:390,height:844}, permissions:['camera']})).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.setDefaultTimeout(20000);
await p.goto('file:///home/user/haftkhan/prototype/index.html'); await p.fill('#kidName','سارا'); await p.click('#helloGo'); await p.waitForTimeout(400);
await p.evaluate(() => {
  const base = {0:[.5,.2],7:[.53,.19],8:[.47,.19],11:[.58,.3],12:[.42,.3],13:[.6,.42],14:[.4,.42],15:[.6,.52],16:[.4,.52],19:[.6,.54],20:[.4,.54],23:[.55,.55],24:[.45,.55],25:[.55,.72],26:[.45,.72],27:[.55,.9],28:[.45,.9],29:[.55,.91],30:[.45,.91],31:[.56,.93],32:[.44,.93]};
  let seed = 5; const rnd = () => { seed = (seed*16807) % 2147483647; return seed/2147483647; }; const g = () => { let u = 0; for(let i = 0; i < 6; i++) u += rnd(); return (u - 3)/1.2; };
  window.__P = {still:{}, legL:{25:[.56,.58],27:[.57,.75],29:[.57,.76],31:[.58,.77]}, legR:{26:[.44,.58],28:[.43,.75],30:[.43,.76],32:[.42,.77]},
    nose:{16:[.5,.21],20:[.5,.205],14:[.45,.3]}, armU:{15:[.56,.08],16:[.44,.08],13:[.58,.18],14:[.42,.18],19:[.56,.07],20:[.44,.07]},
    armS:{15:[.82,.3],16:[.18,.3],13:[.7,.3],14:[.3,.3],19:[.84,.3],20:[.16,.3]},
    squat:{23:[.55,.7],24:[.45,.7],25:[.62,.76],26:[.38,.76],0:[.5,.35],7:[.53,.34],8:[.47,.34],11:[.58,.45],12:[.42,.45],13:[.6,.55],14:[.4,.55],15:[.6,.62],16:[.4,.62]},
    sit:{23:[.55,.62],24:[.45,.62],25:[.56,.68],26:[.44,.68],27:[.56,.9],28:[.44,.9]}, oneLeg:{26:[.45,.62],28:[.45,.74],30:[.45,.75],32:[.44,.76]}};
  window.__pose = 'still'; window.__J = .003; window.__t0 = performance.now();
  window.__lm = () => { let o = window.__P[window.__pose] || {};
    if(window.__pose === 'squatUp') o = (performance.now() - window.__t0) % 1600 < 800 ? window.__P.squat : {};
    o = {...base, ...o}; const a = []; for(let i = 0; i < 33; i++){ const v = o[i] || [.5,.5]; a[i] = {x:v[0] + window.__J*g(), y:v[1] + window.__J*g(), visibility: o[i] ? .95 : .1}; } return a; };
});
const patch = async () => { for(let i = 0; i < 60; i++){ if(await p.evaluate(() => { const C = HK.CAM; if(C.pose && C.stream){ if(!C.pose.__p){ C.pose.detectForVideo = () => ({landmarks:[window.__lm()]}); C.pose.__p = 1; } return true; } return false; })) return; await p.waitForTimeout(250); } throw new Error('camera never started'); };
const pose = (k, J = .003) => p.evaluate(([k, J]) => { window.__pose = k; window.__J = J; window.__t0 = performance.now(); }, [k, J]);
const out = [];
// osta: every command, then the same commands while standing still
const KEY = {'بنشین‌وپاشو':'squatUp', 'دست روی بینی':'nose', 'پای چپ بالا':'legL', 'پای راست بالا':'legR', 'دست‌ها بالا':'armU', 'دست‌ها پهلو':'armS'};
await p.click('.khan >> nth=0'); await p.click('#mz1 [data-act="gfam"]'); await p.waitForTimeout(300); await p.click('#fCam'); await patch(); await p.waitForTimeout(1200);
for(const mode of ['play', 'still']){ const seen = {};
  for(let r = 0; r < 14 && Object.keys(seen).length < 6; r++){ await pose('still', mode === 'still' ? .01 : .003); await p.waitForTimeout(700); await p.click('#oNext');
    const t = (await p.textContent('#oCmd b')).replace('!', '').trim(), k = KEY[t]; if(seen[k] !== undefined) continue;
    if(mode === 'play') await pose(k);
    await p.waitForTimeout(2600); seen[k] = /آفرین/.test(await p.textContent('#oCall')); }
  out.push(`osta ${mode}: ` + Object.entries(seen).map(([k, v]) => `${k}=${v ? 'seen' : 'no'}`).join(' ')); }
// musical chairs: when the music stops, sitting straight is seen; standing is not
for(const mode of ['still', 'play']){
  await p.evaluate(() => HK.go('map')); await p.click('.khan >> nth=0'); await p.click('#mz2 [data-act="gfam"]'); await p.waitForTimeout(300);
  if(!(await p.evaluate(() => !!(HK.CAM.stream)))){ await p.click('#fCam'); } await patch(); await pose('still');
  await p.click('#cMusic'); for(let i = 0; i < 40 && !/بنشینید/.test(await p.textContent('#cCall')); i++) await p.waitForTimeout(500);
  if(mode === 'play') await pose('sit'); await p.waitForTimeout(2500);
  out.push(`chairs ${mode}: ${await p.evaluate(() => HK.CAM.hint ? HK.CAM.hint() : '(no hint)')}`);
}
// tissue game (lesson 5): when the music stops, five seconds on one leg is seen
for(const mode of ['still', 'play']){
  await p.evaluate(() => HK.go('map')); await p.click('.khan >> nth=2'); await p.evaluate(() => HK.go('family')); await p.waitForTimeout(300);
  if(!(await p.evaluate(() => HK.CAM.famOn))) await p.click('#famCam'); await patch(); await pose('still', mode === 'still' ? .01 : .003);
  await p.click('#music'); for(let i = 0; i < 40 && !/قطع شد/.test(await p.textContent('#famCall')); i++) await p.waitForTimeout(500);
  if(mode === 'play') await pose('oneLeg'); await p.waitForTimeout(mode === 'play' ? 7000 : 16000);
  out.push(`tissue ${mode}: ${(await p.textContent('#famCall')).trim().slice(0, 60)}`);
}
console.log(out.join('\n')); console.log('errors', errs); await b.close();
