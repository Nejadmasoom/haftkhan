// آهنگ‌های prototype/music.js را به فایلِ WAV تبدیل می‌کند تا پیش از رفتن به بازی شنیده و تأیید شوند.
//   node tools/render_music.mjs OUT_DIR [name ...]     (به Playwright و Chromium نیاز دارد)
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import fs from 'fs'; import path from 'path'; import url from 'url';
const here = path.dirname(url.fileURLToPath(import.meta.url));
const out = process.argv[2] || 'music-out'; fs.mkdirSync(out, {recursive:true});
const b = await chromium.launch({executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium'});
const p = await b.newPage();
await p.goto('file://' + path.join(here, '..', 'prototype', 'music.js').replace(/music\.js$/, 'index.html'));
const names = process.argv.slice(3).length ? process.argv.slice(3) : await p.evaluate(() => Object.keys(HKMusic.SONGS));
for(const n of names){
  const b64 = await p.evaluate(async n => {
    const buf = await HKMusic.render(n, 2), ch = [buf.getChannelData(0), buf.getChannelData(1)], len = buf.length;
    const dv = new DataView(new ArrayBuffer(44 + len*4)); const w = (o,s) => [...s].forEach((c,i)=>dv.setUint8(o+i, c.charCodeAt(0)));
    w(0,'RIFF'); dv.setUint32(4, 36+len*4, true); w(8,'WAVEfmt '); dv.setUint32(16,16,true); dv.setUint16(20,1,true); dv.setUint16(22,2,true);
    dv.setUint32(24, buf.sampleRate, true); dv.setUint32(28, buf.sampleRate*4, true); dv.setUint16(32,4,true); dv.setUint16(34,16,true); w(36,'data'); dv.setUint32(40, len*4, true);
    for(let i=0;i<len;i++) for(let c=0;c<2;c++) dv.setInt16(44+i*4+c*2, Math.max(-1, Math.min(1, ch[c][i]))*32767, true);
    let s = ''; const u = new Uint8Array(dv.buffer); for(let i=0;i<u.length;i+=32768) s += String.fromCharCode(...u.subarray(i, i+32768)); return btoa(s);
  }, n);
  fs.writeFileSync(path.join(out, n + '.wav'), Buffer.from(b64, 'base64')); console.log(path.join(out, n + '.wav'));
}
await b.close();
