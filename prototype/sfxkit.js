/* هفت‌خوانِ حرکت — جعبه‌ابزارِ صداهای طبیعیِ میدان (کمان، تیر، سیبل، بال).
   هیچ فایلِ صوتی‌ای نیست: هر صدا از یک ایدهٔ فیزیکی ساخته می‌شود.
   - غژغژِ زه و چوبِ کمان: «چسبیدن و لغزیدن» — رشته‌ای از ضربه‌های ریز با فاصلهٔ نامنظم که چند تشدیدگرِ چوبی را می‌لرزاند
     (همان سازوکارِ غژغژِ در و طناب). هرچه دست تندتر بکشد ضربه‌ها تندتر و بلندترند؛ نگه داشتن تقریباً بی‌صداست.
   - رها شدن: ضربهٔ بدنهٔ کمان (بم و کوتاه)، زهی که با Karplus–Strong زده می‌شود و زود خاموش می‌شود، و تقِ زه روی مچ‌بند.
   - تیر در هوا: نویزی که با دور شدن بم می‌شود، با لرزشِ پرها.
   - خوردن به سیبل: ضربهٔ تیز، «تاپِ» کاه، و لرزشِ «بررر»ِ چوبِ تیر که فرو رفته است.
   - بال: هوای کوبیده‌شده (نویزِ بم با حمله‌ای نرم) و خش‌خشِ پرها.
   برای ساختنِ فایلِ شنیداری بیرون از بازی، HKS.X.ctx را یک OfflineAudioContext و HKS.X.at را زمانِ رویداد بگذار. */
(function(){
const H = window.HK; if(!H) return;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const X = {ctx:null, at:null};
let c = null, out = null, nb = null, pw = null;
function ctx(){
  if(X.ctx){ if(c !== X.ctx){ c = X.ctx; out = null; nb = null; pw = null; } }
  else { if(H.muted) return null; const a = H.ac(); if(!a) return null; if(c !== a){ c = a; out = null; nb = null; pw = null; } }
  if(!out){ const comp = c.createDynamicsCompressor(); comp.threshold.value = -9; comp.ratio.value = 4; comp.attack.value = .002; comp.release.value = .12;
    out = c.createGain(); out.gain.value = .7; out.connect(comp).connect(c.destination); }
  if(!nb){ nb = c.createBuffer(1, c.sampleRate*2, c.sampleRate); const d = nb.getChannelData(0); let b0 = 0, b1 = 0, b2 = 0;   // pink noise (Kellet), the colour of air and straw
    for(let i = 0; i < d.length; i++){ const w = Math.random()*2 - 1; b0 = .99765*b0 + w*.099046; b1 = .963*b1 + w*.2965164; b2 = .57*b2 + w*1.0526913; d[i] = (b0 + b1 + b2 + w*.1848)*.22; } }
  if(!pw){ const n = 48, re = new Float32Array(n), im = new Float32Array(n); for(let k = 1; k < n; k++) re[k] = 1; pw = c.createPeriodicWave(re, im); }   // an impulse train
  return c; }
const now = () => X.at != null ? X.at : c.currentTime;
const env = (g, t, a, peak, dec) => { g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(Math.max(.0002, peak), t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + dec); };
const noise = (t, dur) => { const s = c.createBufferSource(); s.buffer = nb; s.loop = true; s.start(t, Math.random()*1.6); s.stop(t + dur + .05); return s; };
const filt = (type, f, q, gain) => { const b = c.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q == null ? 1 : q; if(gain != null) b.gain.value = gain; return b; };
const tone = (t, type, f0, f1, a, peak, dec, dest) => { const o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.setValueAtTime(f0, t); if(f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + a + dec);
  env(g, t, a, peak, dec); o.connect(g).connect(dest || out); o.start(t); o.stop(t + a + dec + .05); return o; };
const burst = (t, chain, a, peak, dec) => { const s = noise(t, a + dec); let n = s; chain.forEach(f => { n.connect(f); n = f; }); const g = c.createGain(); env(g, t, a, peak, dec); n.connect(g).connect(out); };

/* ================================================================ the bow */
let D = null;
const BOW = {
  drawOn(){
    if(!ctx() || D) return; const t = now();
    const pulse = c.createOscillator(); pulse.setPeriodicWave(pw); pulse.frequency.value = 30;
    const pre = c.createGain(); pre.gain.value = .0; pulse.connect(pre);
    // the wood and string body: four resonances, a little higher as the bow tightens
    const res = [[190, 7, .55], [430, 10, 1], [930, 11, .7], [1750, 9, .32]].map(([f, q, gn]) => { const b = filt('bandpass', f, q), g = c.createGain(); g.gain.value = gn*12; pre.connect(b).connect(g); b.f0 = f; return {b, g}; });
    const sum = c.createGain(); sum.gain.value = 1; res.forEach(r => r.g.connect(sum));
    // fibres rubbing: a faint high hiss that follows the hand
    const rs = c.createBufferSource(); rs.buffer = nb; rs.loop = true; rs.start(t, Math.random());
    const rf = filt('highpass', 2600, .7), rg = c.createGain(); rg.gain.value = 0; rs.connect(rf).connect(rg).connect(sum);
    const master = c.createGain(); master.gain.value = 1; sum.connect(master).connect(out); pulse.start(t);
    D = {pulse, pre, res, rs, rg, master, lastTick:0}; },
  drawSet(pull, speed){
    if(!D || !c) return; const t = now(), v = clamp(Math.abs(speed)/1.1, 0, 1), p = clamp(pull, 0, 1);
    // stick–slip: the grip catches and lets go unevenly, so the pulse rate and loudness wander every frame
    const rate = (16 + 75*v + 30*p)*(.8 + .4*Math.random());
    D.pulse.frequency.setTargetAtTime(rate, t, .012);
    const amp = v > .04 ? Math.pow(v, 1.25)*.55*(.55 + .45*Math.random()) : .018*p*(Math.random() < .15 ? 3 : 1);   // holding: a faint strain
    D.pre.gain.setTargetAtTime(amp, t, .015);
    D.res.forEach(r => r.b.frequency.setTargetAtTime(r.b.f0*(1 + .18*p), t, .05));
    D.rg.gain.setTargetAtTime(.03*v, t, .03);
    if(v > .2 && Math.random() < v*.35) this.tick(p, t); },
  tick(p, t){ burst(t || now(), [filt('bandpass', 2200 + Math.random()*2600 + p*800, 6 + Math.random()*6)], .001, .03 + Math.random()*.04, .006 + Math.random()*.01); },
  drawOff(){
    if(!D || !c) return; const d = D, t = now(); D = null; d.master.gain.setTargetAtTime(.0001, t, .03);
    const stopAt = t + .3; try{ d.pulse.stop(stopAt); d.rs.stop(stopAt); }catch(e){} },
  /* the string lets go */
  twang(power){
    if(!ctx()) return; const t = now(), p = clamp(power, 0, 1);
    tone(t, 'sine', 125, 62, .003, .5 + .3*p, .2);                              // the limbs spring forward: a deep, short thump
    tone(t, 'triangle', 240, 150, .002, .12, .08);
    // the string: plucked, but damped fast by the arrow and the fingers — a "thwum", not a guitar note
    const sr = c.sampleRate, f = 92 + 46*p, N = Math.max(8, Math.round(sr/f)), len = Math.floor(sr*.6), buf = c.createBuffer(1, len, sr), d = buf.getChannelData(0);
    for(let i = 0; i < N; i++) d[i] = (Math.random()*2 - 1)*(1 - i/N*.6);
    let lp = 0; for(let i = N; i < len; i++){ const v = .5*(d[i - N] + d[i - N - 1 < 0 ? 0 : i - N - 1]); lp += (v - lp)*.55; d[i] = lp*.985; }
    const s = c.createBufferSource(); s.buffer = buf; const g = c.createGain(), lo = filt('lowpass', 1400, .7), hi = filt('highpass', 70, .7);
    g.gain.setValueAtTime(.55 + .25*p, t); g.gain.exponentialRampToValueAtTime(.001, t + .5); s.connect(hi).connect(lo).connect(g).connect(out); s.start(t);
    burst(t, [filt('bandpass', 1900, 1.3)], .001, .32 + .15*p, .022);           // the string slapping the arm-guard
    burst(t + .004, [filt('highpass', 5000, .7)], .001, .1, .012); },
  /* the arrow in the air: air noise falling in pitch as it flies off, fluttering with its feathers */
  whoosh(T, power){
    if(!ctx()) return; const t = now() + .012, dur = clamp(T, .3, 2.4), p = clamp(power, 0, 1);
    const s = noise(t, dur + .05), f = filt('bandpass', 2400, 1.4), g = c.createGain(), am = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
    f.frequency.setValueAtTime(2600 + p*900, t); f.frequency.exponentialRampToValueAtTime(480, t + dur);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.12 + p*.08, t + .04); g.gain.exponentialRampToValueAtTime(.025, t + dur*.6); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    lfo.frequency.value = 26 + 10*p; lg.gain.value = .35; am.gain.value = .65; lfo.connect(lg).connect(am.gain); lfo.start(t); lfo.stop(t + dur + .05);
    s.connect(f).connect(am).connect(g).connect(out); },
  /* arriving. q: 1 outer ring … 4 bull's-eye */
  thunk(q){
    if(!ctx()) return; const t = now();
    burst(t, [filt('highpass', 2500, .7)], .0005, .26, .006);                     // the point going in: a sharp crack
    burst(t, [filt('lowpass', 420, .8)], .002, .42, .085);                        // straw boss taking the blow
    tone(t, 'sine', 170, 82, .002, .34, .13);
    burst(t + .006, [filt('bandpass', 3200, 1.2)], .004, .07, .07);               // a whisper of straw
    // the shaft left quivering in the target: a buzzing "brrr" that dies away
    const o = c.createOscillator(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain(), am = c.createGain(), lo = filt('lowpass', 900, .8);
    o.type = 'sawtooth'; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(128, t + .5);
    lfo.frequency.setValueAtTime(34, t); lfo.frequency.linearRampToValueAtTime(22, t + .5); lg.gain.value = .5; am.gain.value = .5; lfo.connect(lg).connect(am.gain);
    g.gain.setValueAtTime(.0001, t + .01); g.gain.exponentialRampToValueAtTime(.17, t + .03); g.gain.exponentialRampToValueAtTime(.0001, t + .6);
    o.connect(lo).connect(am).connect(g).connect(out); o.start(t); o.stop(t + .6); lfo.start(t); lfo.stop(t + .6);
    if(q >= 3) [1568, 2349, 3136].forEach((fr, i) => tone(t + .05 + i*.045, 'sine', fr*(q === 4 ? 1 : .89), null, .004, (q === 4 ? .14 : .08)/(i + 1), .9 - i*.2)); },
  /* a miss: the arrow sinking into turf, and grass rustling */
  thud(){
    if(!ctx()) return; const t = now();
    tone(t, 'sine', 105, 46, .004, .4, .16); burst(t, [filt('lowpass', 320, .7)], .002, .45, .1);
    for(let i = 0; i < 7; i++) burst(t + .01 + Math.random()*.16, [filt('highpass', 3500 + Math.random()*3000, .8)], .002, .03 + Math.random()*.03, .02 + Math.random()*.03); },
  /* the string drawn far enough: two soft knocks of the arrow on the rest */
  ready(){ if(!ctx()) return; const t = now(); [0, .07].forEach((dt, i) => burst(t + dt, [filt('bandpass', 1300 + i*450, 7)], .001, .14, .03)); }
};

/* ================================================================ wings */
const WING = {
  /* one beat: air pushed down (a soft low "whomp") and feathers rustling at the end of the stroke */
  beat(power){
    if(!ctx()) return; const t = now(), p = clamp(power, .15, 1);
    const s = noise(t, .35), f = filt('lowpass', 260, .9), g = c.createGain();
    f.frequency.setValueAtTime(240, t); f.frequency.exponentialRampToValueAtTime(700 + 600*p, t + .09); f.frequency.exponentialRampToValueAtTime(300, t + .25);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.5*p + .15, t + .05); g.gain.exponentialRampToValueAtTime(.0001, t + .28);
    s.connect(f).connect(g).connect(out);
    tone(t + .02, 'sine', 95, 70, .02, .14*p, .14);
    for(let i = 0; i < 9; i++) burst(t + .06 + Math.random()*.14, [filt('bandpass', 3800 + Math.random()*4200, 2.5)], .002, (.02 + Math.random()*.035)*(.5 + p), .015 + Math.random()*.03); },
  chime(n){ if(!ctx()) return; const t = now(), base = 1046.5*Math.pow(2, [0, 2, 4, 7][(n || 0) % 4]/12);
    [1, 2, 3].forEach((m, i) => tone(t + i*.05, 'sine', base*(i === 2 ? 1.5 : m === 2 ? 1.25 : 1), null, .004, .12/(i + 1), .55)); },
  /* bumping a pillar: a hollow knock on stone and a ruffle of feathers */
  hurt(){ if(!ctx()) return; const t = now();
    tone(t, 'sine', 210, 70, .003, .45, .22); burst(t, [filt('bandpass', 700, 1.5)], .002, .4, .12); burst(t, [filt('lowpass', 250, .7)], .002, .5, .18);
    for(let i = 0; i < 14; i++) burst(t + .03 + Math.random()*.3, [filt('bandpass', 3000 + Math.random()*5000, 2)], .002, .03 + Math.random()*.04, .02 + Math.random()*.04); }
};
window.HKS = {X, BOW, WING, ctx};
})();
