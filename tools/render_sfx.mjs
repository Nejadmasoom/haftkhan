// the arena's natural sound effects (prototype/sfxkit.js) rendered to WAV files, to be heard before they go in.
//   node tools/render_sfx.mjs OUT_DIR
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import fs from 'fs'; import path from 'path'; import url from 'url';
const here = path.dirname(url.fileURLToPath(import.meta.url)), out = process.argv[2] || 'sfx-out'; fs.mkdirSync(out, {recursive:true});
const b = await chromium.launch({executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium'});
const p = await b.newPage(); await p.goto('file://' + path.join(here, '..', 'prototype', 'index.html'));
const SCENES = {
  // a slow draw, a short hold, the release, the flight and the arrow landing in the target
  'bow-shot': `const S = HKS.BOW; let last = 0; at(.1, () => S.drawOn());
    for(let t = .1; t < 2.0; t += 1/60){ const u = Math.min(1, Math.max(0, (t - .2)/1.1)), pull = u*u*(3 - 2*u); const sp = (pull - last)*60; at(t, () => S.drawSet(pull, sp)); last = pull; if(Math.abs(t - 1.2) < 1/120) at(t, () => S.ready()); }
    at(2.0, () => { S.drawOff(); S.twang(.95); S.whoosh(1.0, .95); }); at(3.0, () => S.thunk(3)); return 4.4;`,
  'bow-draw-slow': `const S = HKS.BOW; let last = 0; at(.1, () => S.drawOn());
    for(let t = .1; t < 3.2; t += 1/60){ const u = Math.min(1, Math.max(0, (t - .2)/2.4)), pull = u; const sp = (pull - last)*60; at(t, () => S.drawSet(pull, sp)); last = pull; }
    at(3.2, () => S.drawOff()); return 3.6;`,
  'target-hits': `const S = HKS.BOW; at(.2, () => S.thunk(1)); at(1.3, () => S.thunk(2)); at(2.4, () => S.thunk(3)); at(3.6, () => S.thunk(4)); at(5.2, () => S.thud()); return 6.2;`,
  // the jeep: idle, then running harder and faster, a jump and a landing, and finally rolling over
  'jeep': `const C = HKS.CAR; at(.05, () => C.start()); for(let t = .05; t < 5.2; t += 1/30){ const g = t < 1 ? 0 : t < 3.4 ? Math.min(1, (t - 1)/1.2) : .3, v = t < 1 ? 0 : Math.min(18, (t - 1)*7);
      at(t, () => C.set(g, v)); }
    at(3.6, () => C.land(true)); at(4.4, () => C.land(false)); at(5.2, () => C.stop()); at(5.6, () => C.crash()); return 7.2;`,
  // the wall: a wall coming for three seconds, slipping through the hole; another one, and bricks bursting
  'wall': `const W = HKS.WALL; at(.1, () => W.rumble(3)); at(3.1, () => W.through()); at(3.8, () => W.rumble(2.5)); at(6.3, () => W.smash()); return 7.6;`,
  'wings': `const W = HKS.WING; [.2, .7, 1.15, 1.6, 2.0, 2.4].forEach((t, i) => at(t, () => W.beat([.4, .7, 1, 1, .8, .6][i]))); at(3.0, () => W.chime(1)); at(3.4, () => W.chime(2)); at(4.1, () => W.hurt()); return 5.0;`
};
for(const [name, src] of Object.entries(SCENES)){
  const b64 = await p.evaluate(async src => {
    const sr = 44100, len = 8, ctx = new OfflineAudioContext(2, sr*len, sr); HKS.X.ctx = ctx; const jobs = [];
    const at = (t, f) => jobs.push([t, f]); const dur = new Function('at', src)(at);
    jobs.sort((a, b) => a[0] - b[0]); jobs.forEach(([t, f]) => { HKS.X.at = t; f(); }); HKS.X.at = null;
    const buf = await ctx.startRendering(); HKS.X.ctx = null;
    const n = Math.floor(dur*sr), ch = [buf.getChannelData(0), buf.getChannelData(1)];
    const dv = new DataView(new ArrayBuffer(44 + n*4)); const w = (o, s) => [...s].forEach((c, i) => dv.setUint8(o + i, c.charCodeAt(0)));
    w(0, 'RIFF'); dv.setUint32(4, 36 + n*4, true); w(8, 'WAVEfmt '); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 2, true);
    dv.setUint32(24, sr, true); dv.setUint32(28, sr*4, true); dv.setUint16(32, 4, true); dv.setUint16(34, 16, true); w(36, 'data'); dv.setUint32(40, n*4, true);
    let peak = 0; for(let i = 0; i < n; i++) for(let c = 0; c < 2; c++){ const v = ch[c][i]; peak = Math.max(peak, Math.abs(v)); dv.setInt16(44 + i*4 + c*2, Math.max(-1, Math.min(1, v))*32767, true); }
    let s = ''; const u = new Uint8Array(dv.buffer); for(let i = 0; i < u.length; i += 32768) s += String.fromCharCode(...u.subarray(i, i + 32768)); return [btoa(s), peak];
  }, src);
  fs.writeFileSync(path.join(out, name + '.wav'), Buffer.from(b64[0], 'base64')); console.log(name, 'peak', b64[1].toFixed(2));
}
await b.close();
