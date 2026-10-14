/* هفت‌خوانِ حرکت — موسیقیِ بازی‌ها. همه‌چیز در خودِ مرورگر ساخته می‌شود؛ هیچ فایلِ صوتی‌ای لازم نیست.
   هر آهنگ داده است: ملودی، آکورد (یکی برای هر میزان یا هر چند ضرب) و ضرب‌آهنگ. قواعدِ ساختنِ آهنگِ کودکانه
   در .claude/skills/kids-music/SKILL.md آمده است.

   HKMusic.play(name, {ctx, out, loop}) شروع می‌کند و HKMusic.stop() قطع می‌کند. render(name, seconds) برای
   ساختنِ فایلِ شنیداری در ابزارِ tools/render_music.mjs است. */
(function(){
const NOTE = {C:0, 'C#':1, Db:1, D:2, 'D#':3, Eb:3, E:4, F:5, 'F#':6, Gb:6, G:7, 'G#':8, Ab:8, A:9, 'A#':10, Bb:10, B:11};
const midi = s => { const m = /^([A-G][#b]?)(-?\d)$/.exec(s); return 12*(+m[2]+1) + NOTE[m[1]]; };
const hz = n => 440 * Math.pow(2, (n-69)/12);
/* "E5:1 G5:1 A5:2 -:2" — note:length in eighth notes; "-" is a rest */
function parse(str){ let t = 0; const out = [];
  str.trim().split(/\s+/).forEach(tok => { const [n, d] = tok.split(':'); const len = (+d)/2; if(n !== '-') out.push([t, len, midi(n)]); t += len; });
  return {notes:out, beats:t}; }
const CHORD = {C:[0,4,7], Dm:[2,5,9], Em:[4,7,11], F:[5,9,0], G:[7,11,2], Am:[9,0,4], D:[2,6,9], D7:[2,6,9,0], C7:[0,4,7,10], A7:[9,1,4,7], E:[4,8,11], A:[9,1,4]};

/* ---------------------------------------------------------------- the songs */
/* William Tell overture, finale (Rossini, 1829 — public domain). The 32-beat main theme, note for note from the
   MIDI of irish-folk-songs.com, transposed up an octave so it sparkles. Used where children run, gallop or race. */
const WT = [[0,.5,62],[.5,.5,62],[1,1,62],[2,.5,62],[2.5,.5,62],[3,1,62],[4,.5,62],[4.5,.5,62],[5,1,67],[6,1,69],[7,1,71],[8,.5,62],[8.5,.5,62],[9,1,62],[10,.5,62],[10.5,.5,62],[11,1,67],[12,1,71],[13,1,69],[14,1,66],[15,1,62],[16,.5,62],[16.5,.5,62],[17,1,62],[18,.5,62],[18.5,.5,62],[19,1,62],[20,.5,62],[20.5,.5,62],[21,1,67],[22,1,69],[23,1,71],[24,.5,67],[24.5,.5,71],[25,2.5,74],[27.5,.5,72],[28,.5,71],[28.5,.5,69],[29,1,67],[30,1,71],[31,1,67]];
const SONGS = {
  galop: { title:'گالوپِ ویلیام تل (روسینی)', bpm:200, beats:32, swing:0, key:'G',
    melody: WT.map(([t,d,n]) => [t, d, n+12]),
    chords: [[0,'G'],[10,'D7'],[15,'G'],[24,'G'],[26,'D7'],[29,'G']],
    groove: 'gallop', lead:'bright' },
  /* original: a bouncing call-and-answer tune in C major, eight bars that repeat with a new ending */
  hop: { title:'پرشِ یوزی', bpm:126, key:'C', lead:'bright', groove:'bounce',
    melody: parse(`E5:1 G5:1 A5:2 G5:2 E5:2  C5:1 D5:1 E5:2 D5:2 -:2  E5:1 G5:1 A5:2 G5:2 E5:2  D5:1 E5:1 D5:2 C5:2 -:2
                   F5:2 F5:2 A5:2 F5:2  E5:2 E5:2 G5:2 E5:2  D5:2 E5:1 F5:1 G5:2 A5:2  G5:4 -:2 G5:1 G5:1
                   E5:1 G5:1 A5:2 G5:2 E5:2  C5:1 D5:1 E5:2 D5:2 -:2  E5:1 G5:1 A5:2 G5:2 C6:2  B5:1 A5:1 G5:2 C6:2 -:2`).notes,
    beats: 48, chords: bars(4, 'C G C G  F C G G  C G F G'.split(/\s+/).map((c,i)=> i===11 ? 'C' : c)) },
  /* original: a proud walking march in G, for walking round the chairs */
  march: { title:'رژهٔ قهرمان', bpm:108, key:'G', lead:'warm', groove:'march',
    melody: parse(`G4:2 G4:1 A4:1 B4:2 G4:2  C5:2 B4:2 A4:4  A4:2 A4:1 B4:1 C5:2 A4:2  D5:2 C5:2 B4:4
                   E5:2 D5:1 C5:1 B4:2 A4:2  G4:2 A4:2 B4:2 G4:2  A4:2 D5:2 C5:2 A4:2  G4:6 -:2`).notes,
    beats: 32, chords: bars(4, 'G C D G C G D G'.split(' ')) },
  /* original, for the hill race (approved): a revving "da-da-da-DUM" up the D major chord */
  rally: { title:'مسابقهٔ تپه', bpm:132, key:'D', lead:'bright', groove:'bounce', beats:32,
    melody: parse(`D5:1 D5:1 F#5:1 A5:1 D6:2 A5:2  B5:1 A5:1 G5:1 F#5:1 E5:4  D5:1 D5:1 F#5:1 A5:1 D6:2 A5:2  B5:1 C#6:1 D6:2 A5:4
                   G5:2 B5:2 A5:2 F#5:2  E5:1 F#5:1 G5:1 A5:1 B5:4  A5:2 F#5:2 G5:2 E5:2  D5:4 -:2 A5:1 A5:1`).notes,
    chords: bars(4, 'D A D D G G A D'.split(' ')) },
  /* original, for the shape walls (approved): a stepping tune that climbs as a wall comes */
  walls: { title:'دیوارهای شکل', bpm:120, key:'G', lead:'bright', groove:'march', beats:32,
    melody: parse(`G4:1 B4:1 D5:1 B4:1 G4:2 -:2  A4:1 C5:1 E5:1 C5:1 A4:2 -:2  B4:1 D5:1 G5:1 D5:1 B4:1 D5:1 G5:2  F#5:2 E5:2 D5:4
                   E5:1 E5:1 D5:1 C5:1 B4:2 C5:2  D5:1 D5:1 C5:1 B4:1 A4:4  B4:1 C5:1 D5:1 E5:1 F#5:2 A5:2  G5:4 -:2 D5:1 D5:1`).notes,
    chords: bars(4, 'G Am G D C Am D G'.split(' ')) },
  /* original: the quiet, sunny theme under the map and menus — A A′ B A″, sixteen bars so it does not tire */
  theme: { title:'سفرِ یوزی', bpm:112, key:'C', lead:'soft', groove:'stroll', beats:64,
    melody: parse(`C5:2 E5:2 G5:3 E5:1  F5:2 A5:2 G5:4  E5:2 C5:1 D5:1 E5:2 G5:2  D5:6 -:2
                   C5:2 E5:2 G5:3 E5:1  F5:2 A5:2 C6:4  B5:2 A5:1 G5:1 F5:2 D5:2  C5:6 -:2
                   A5:2 A5:1 G5:1 F5:2 A5:2  G5:2 G5:1 F5:1 E5:4  F5:2 F5:1 E5:1 D5:2 F5:2  E5:2 D5:2 G5:4
                   C5:2 E5:2 G5:3 E5:1  F5:2 A5:2 C6:3 A5:1  G5:2 E5:2 F5:2 D5:2  C5:6 -:2`).notes,
    chords: bars(4, 'C F C G  C F G C  F C Dm G  C F G C'.split(/\s+/)) }
};
function bars(len, names){ return names.map((c,i)=>[i*len, c]); }

/* ---------------------------------------------------------------- instruments */
let noiseBuf = null;
function noise(ctx){ if(noiseBuf && noiseBuf.sampleRate === ctx.sampleRate) return noiseBuf;
  const b = ctx.createBuffer(1, ctx.sampleRate*.5, ctx.sampleRate), d = b.getChannelData(0); for(let i=0;i<d.length;i++) d[i] = Math.random()*2-1; return noiseBuf = b; }
function env(g, t, a, peak, dec, sus, rel, len){ g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(peak, t+a);
  g.gain.exponentialRampToValueAtTime(Math.max(.0001, peak*sus), t+a+dec); g.gain.setValueAtTime(Math.max(.0001, peak*sus), t+Math.max(a+dec, len)); g.gain.exponentialRampToValueAtTime(.0001, t+Math.max(a+dec, len)+rel); }
function lead(ctx, out, n, t, len, kind){
  const g = ctx.createGain(), f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = kind==='warm' ? 2600 : 3800; f.Q.value = .7;
  const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(); o1.type = 'square'; o2.type = 'triangle';
  o1.frequency.value = hz(n); o2.frequency.value = hz(n)*1.003;
  if(kind==='soft'){ o1.type = 'sine'; f.frequency.value = 2200; }
  const m1 = ctx.createGain(); m1.gain.value = kind==='soft' ? .35 : kind==='warm' ? .18 : .28; const m2 = ctx.createGain(); m2.gain.value = .7;
  o1.connect(m1).connect(f); o2.connect(m2).connect(f); f.connect(g).connect(out);
  env(g, t, .006, .22, .08, .65, .07, len*.92);
  o1.start(t); o2.start(t); o1.stop(t+len+.2); o2.stop(t+len+.2);
}
function bass(ctx, out, n, t, len){ const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'triangle'; o.frequency.value = hz(n);
  o.connect(g).connect(out); env(g, t, .005, .34, .12, .5, .05, len*.8); o.start(t); o.stop(t+len+.15); }
function stab(ctx, out, notes, t, len){ const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1500; const g = ctx.createGain(); f.connect(g).connect(out);
  notes.forEach(n => { const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = hz(n); o.connect(f); o.start(t); o.stop(t+len+.1); });
  env(g, t, .004, .05, .06, .4, .04, len*.6); }
function kick(ctx, out, t, v=.55){ const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(48, t+.12);
  o.connect(g).connect(out); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t+.2); o.start(t); o.stop(t+.22); }
function clap(ctx, out, t){ const s = ctx.createBufferSource(); s.buffer = noise(ctx); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1700; f.Q.value = .8;
  const g = ctx.createGain(); s.connect(f).connect(g).connect(out);
  [0,.012,.024].forEach((d,i)=>{ g.gain.setValueAtTime(.3, t+d); g.gain.exponentialRampToValueAtTime(.05, t+d+.01); }); g.gain.exponentialRampToValueAtTime(.0001, t+.16); s.start(t); s.stop(t+.18); }
function hat(ctx, out, t, open){ const s = ctx.createBufferSource(); s.buffer = noise(ctx); const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7000;
  const g = ctx.createGain(); s.connect(f).connect(g).connect(out); g.gain.setValueAtTime(open ? .09 : .06, t); g.gain.exponentialRampToValueAtTime(.0001, t+(open ? .12 : .035)); s.start(t); s.stop(t+.14); }
function bell(ctx, out, n, t){ const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = hz(n); o.connect(g).connect(out);
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.08, t+.004); g.gain.exponentialRampToValueAtTime(.0001, t+.35); o.start(t); o.stop(t+.4); }

/* ---------------------------------------------------------------- arranging one loop */
function chordAt(song, beat){ let c = song.chords[0][1]; for(const [b, name] of song.chords){ if(b <= beat + 1e-6) c = name; } return c; }
function root(name, base){ const r = CHORD[name][0]; return base + ((r - base%12 + 12) % 12); }
/* everything that sounds in one pass of the song, as [time-in-beats, fn(ctx, out, t, secPerBeat)] */
function events(song){
  const ev = [], spb = 60/song.bpm, beats = song.beats;
  song.melody.forEach(([b, d, n]) => ev.push([b, (ctx,out,t) => lead(ctx, out, n, t, d*spb, song.lead)]));
  for(let b = 0; b < beats; b += 1){
    const ch = chordAt(song, b), r = root(ch, 43);           // bass around G2
    const tones = CHORD[ch].map(x => 60 + x);                 // chord voicing around middle C
    if(song.groove === 'gallop'){                             // oom-pa on every beat, a quick "ka-da" on the hats
      ev.push([b, (c,o,t)=>bass(c,o, b%2 ? r+7 : r, t, spb*.45)]); ev.push([b+.5, (c,o,t)=>stab(c,o,tones,t,spb*.3)]);
      ev.push([b, (c,o,t)=>kick(c,o,t)]); ev.push([b+.5, (c,o,t)=>hat(c,o,t)]); ev.push([b+.75, (c,o,t)=>hat(c,o,t)]);
      if(b%2) ev.push([b, (c,o,t)=>clap(c,o,t)]);
    } else if(song.groove === 'bounce'){                      // bouncing octave bass, claps on 2 and 4
      ev.push([b, (c,o,t)=>bass(c,o, r, t, spb*.4)]); ev.push([b+.5, (c,o,t)=>bass(c,o, r+12, t, spb*.35)]);
      if(b%2===0) ev.push([b, (c,o,t)=>kick(c,o,t)]); else { ev.push([b, (c,o,t)=>clap(c,o,t)]); ev.push([b+.5, (c,o,t)=>stab(c,o,tones,t,spb*.3)]); }
      ev.push([b, (c,o,t)=>hat(c,o,t)]); ev.push([b+.5, (c,o,t)=>hat(c,o,t, b%4===3)]);
      if(b%8===0) ev.push([b, (c,o,t)=>bell(c,o, 84 + CHORD[ch][0], t)]);
    } else if(song.groove === 'stroll'){                      // easy walk: bass on 1 and 3, a pluck on 2 and 4, a bell every two bars
      if(b%2===0){ ev.push([b, (c,o,t)=>bass(c,o, b%4 ? r+7 : r, t, spb*1.4)]); }
      else ev.push([b, (c,o,t)=>stab(c,o,tones,t,spb*.25)]);
      if(b%4===0) ev.push([b, (c,o,t)=>kick(c,o,t,.25)]);
      ev.push([b+.5, (c,o,t)=>hat(c,o,t)]);
      if(b%8===0) ev.push([b, (c,o,t)=>bell(c,o, 84 + CHORD[ch][0], t)]);
    } else {                                                  // march: left-right on bass and kick, chord on the off-beats
      ev.push([b, (c,o,t)=>bass(c,o, b%2 ? r+7 : r, t, spb*.6)]); ev.push([b, (c,o,t)=>kick(c,o,t)]);
      ev.push([b+.5, (c,o,t)=>stab(c,o,tones,t,spb*.35)]); ev.push([b+.5, (c,o,t)=>hat(c,o,t)]);
      if(b%4===3) { ev.push([b+.5, (c,o,t)=>clap(c,o,t)]); ev.push([b+.75, (c,o,t)=>clap(c,o,t)]); }
    }
  }
  return ev.sort((a,b)=>a[0]-b[0]);
}

/* ---------------------------------------------------------------- live playback */
const P = {timer:null, ctx:null, master:null, name:null, vol:.8, ducked:false};
function mixer(ctx, dest, vol=.8){ const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 3;
  const m = ctx.createGain(); m.gain.value = vol; m.connect(comp).connect(dest); return m; }
/* vol: .8 for a game's own song, lower for background music. fade: seconds to fade in. */
function play(name, {ctx, loop=true, vol=.8, fade=0} = {}){
  stop(); const song = SONGS[name]; if(!song || !ctx) return;
  const spb = 60/song.bpm, ev = events(song), loopLen = song.beats*spb;
  P.ctx = ctx; P.name = name; P.vol = vol; P.ducked = false; P.master = mixer(ctx, ctx.destination, fade ? .0001 : vol);
  if(fade) P.master.gain.linearRampToValueAtTime(vol, ctx.currentTime + fade);
  /* the clock is an anchor (a beat and the moment it sounds) plus a rate, so a game can speed the song up
     or slow it down live (HKMusic.rate) without it skipping */
  let anchorT = ctx.currentTime + .08, anchorB = 0, idx = 0, pass = 0; P.rate = 1;
  P.setRate = r => { const now = ctx.currentTime; anchorB += Math.max(0, now - anchorT)*P.rate/spb; anchorT = Math.max(now, anchorT); P.rate = r; };
  const tick = () => {
    const ahead = ctx.currentTime + .25;
    while(true){
      if(idx >= ev.length){ if(!loop) return; idx = 0; pass++; }
      const t = anchorT + (pass*song.beats + ev[idx][0] - anchorB)*spb/P.rate;
      if(t > ahead) break;
      if(t >= ctx.currentTime - .02) ev[idx][1](ctx, P.master, t, spb/P.rate);
      idx++;
    }
  };
  tick(); P.timer = setInterval(tick, 40);
}
function stop(){ clearInterval(P.timer); P.timer = null;
  if(P.master && P.ctx){ const m = P.master, c = P.ctx; try{ m.gain.cancelScheduledValues(c.currentTime); m.gain.setValueAtTime(m.gain.value, c.currentTime); m.gain.linearRampToValueAtTime(0, c.currentTime+.06); setTimeout(()=>{ try{ m.disconnect(); }catch(e){} }, 120); }catch(e){} }
  P.master = null; P.name = null; }
/* while the narrator speaks, the music steps back */
function duck(on){ if(!P.master || !P.ctx || P.ducked === on) return; P.ducked = on; const g = P.master.gain, t = P.ctx.currentTime;
  try{ g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(on ? P.vol*.3 : P.vol, t + (on ? .2 : .6)); }catch(e){} }
/* offline: the whole song rendered to an AudioBuffer, for listening outside the game */
async function render(name, passes=2, rate=44100){
  const song = SONGS[name], spb = 60/song.bpm, len = song.beats*spb*passes + 1.2;
  const ctx = new OfflineAudioContext(2, Math.ceil(len*rate), rate), m = mixer(ctx, ctx.destination), ev = events(song);
  for(let p=0;p<passes;p++) ev.forEach(([b, f]) => f(ctx, m, .05 + (p*song.beats + b)*spb, spb));
  return ctx.startRendering();
}
const rate = r => { if(P.timer && P.setRate && Math.abs(r - P.rate) > .01) P.setRate(Math.max(.6, Math.min(1.6, r))); };
window.HKMusic = {play, stop, duck, rate, render, SONGS, playing: () => !!P.timer, current: () => P.timer ? P.name : null};
})();
