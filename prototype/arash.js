/* هفت‌خوانِ حرکت — میدان: «کمانگیرِ <اسمِ بچه>».
   با دوربین: یک دستت کمان را دراز می‌کند (بالا و پایین بردنش نشانه می‌گیرد)، دستِ دیگر زه را به عقب می‌کشد.
   هرچه زه را بیشتر بکشی تیر دورتر می‌رود؛ دستت را رها کنی، تیر پرواز می‌کند. هدف‌ها دورتر و کوچک‌تر می‌شوند و باد می‌وزد.
   سه قلب؛ تیری که به هدف نخورد یک قلب می‌برد. رکورد = امتیاز. ایستادنِ بی‌حرکت هیچ تیری نمی‌اندازد.
   همهٔ اندازه‌ها در «واحدِ صحنه» U (کوچک‌ترِ پهنای بوم و ۶۲٪ ارتفاعش) است تا روی هر گوشی و هر پنجره یک‌جور کار کند. */
(function(){
const H = window.HK, A_ = window.HKA; if(!H || !A_ || !A_.api) return;
const {fa, sfx} = H, api = A_.api, {A, B, burst, pop, drawFX, hud, INK, dist} = api;
const best = api.best;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a)*t, rnd = (a, b) => a + Math.random()*(b - a);

/* the sound of the bow lives in sfxkit.js (HKS.BOW): the string's creak, the release, the arrow, the target */
const AUD = window.HKS.BOW;

/* ================================================================ the game */
const AR = {};
const NAME = () => H.kidName();
const POWER_MIN = .3;            // a draw shorter than this is only a test pull: no arrow leaves
const G_ACC = 1.7, VMAX = 1.62;  // scene units per second²; the fastest an arrow can leave (a full draw)

function U(){ return Math.min(api.W*.98, api.Hh*.62); }
function geo(){                  // everything placed from the canvas size
  const W = api.W, Hh = api.Hh, u = U(); const G = Hh*.80;
  return {W, Hh, u, G, bowX:W*.19, bowY:G - u*.205, ah:u*.30, x0:W*.12};
}

function arReset(){
  Object.assign(AR, {score:0, hearts:3, combo:0, shots:0, hits:0, arrow:null, stuck:[], pull:0, pullRaw:0, peak:0, state:'idle', side:null, ang:25, angRaw:25,
    hist:[], lastT:0, speed:0, cool:0, shake:0, recoil:0, vib:0, vibAmp:0, wind:0, target:null, nextAt:0, tms:0, bestRec:best('arash', A.who), recDone:false,
    t:0, hint:'', hintT:0, readyTick:false, flash:0, over:false, heartFlash:0, sun:0});
  FX.length = 0; AUD.drawOff(); newTarget(true); }
const FX = api.FX;

function newTarget(first){
  const g = geo(), n = AR.hits, u = g.u;
  const R = u*(.085 - Math.min(.026, n*.0035));                    // big first targets that shrink
  let D = (.40 + Math.random()*(.14 + Math.min(.2, n*.022)));
  let x = g.bowX + D*u; x = Math.min(x, g.W - R - 14); if(x < g.bowX + .36*u) x = g.bowX + .36*u;
  const yc = g.G - u*(.07 + Math.random()*(.10 + Math.min(.13, n*.02))) - R*.2;
  const moving = n >= 5 && Math.random() < .7 ? {amp:u*(.03 + Math.min(.05, (n - 5)*.006)), w:.9 + Math.random()*.6, ph:Math.random()*6} : null;
  AR.wind = n >= 3 ? (Math.random() < .5 ? -1 : 1)*(.05 + Math.min(.2, (n - 3)*.018))*(.6 + Math.random()*.4) : 0;
  AR.target = {x, y0:yc, y:yc, R, mv:moving, born:performance.now(), gone:false, fall:0, hitAt:null};
  if(!first) sfx('tick'); }

/* ---- reading the body */
function readBody(now){
  const b = B.b, c = B.cal; if(!b || !c || now - B.t > 400) return null;
  const A_len = c.ua + c.fa, sh = b.sh;
  // the bow arm is the one stretched farther from the body
  const dl = Math.abs(b.wL.x - sh.x) + .2*Math.abs(b.wL.y - sh.y), dr = Math.abs(b.wR.x - sh.x) + .2*Math.abs(b.wR.y - sh.y);
  const side = AR.state === 'draw' && AR.side ? AR.side : (dl >= dr ? 'L' : 'R');
  const bw = side === 'L' ? b.wL : b.wR, dw = side === 'L' ? b.wR : b.wL, bs = side === 'L' ? b.shL : b.shR;
  // the bow arm must really be held out sideways at about shoulder height, and the drawing hand near shoulder height too:
  // arms hanging at the sides, or a wave, must never look like a drawn bow
  const out_ = Math.abs(bw.x - bs.x)/A_len, level = (sh.y - bw.y)/A_len, dlevel = (sh.y - dw.y)/A_len;
  const span = dist(bw, dw)/A_len, posed = out_ > .6 && level > -.3 && level < 1.1 && dlevel > -.55 && dlevel < 1;
  const pull = clamp((span - .62)/.95, 0, 1);
  // the camera is unsure of a hand it half-sees (a hand by the face often is): such frames neither draw nor release
  const lm = B.lm, vis = i => !lm || !lm[i] || (lm[i].visibility ?? 1) > .5, seen = vis(15) && vis(16);
  const ang = clamp(24 + (sh.y - bw.y)/A_len*62, 2, 64);
  return {side, pull:posed ? pull : 0, rawPull:pull, posed, seen, ang, out:out_, span, dw:{x:dw.x/A_len, y:dw.y/A_len}, bw:{x:bw.x/A_len, y:bw.y/A_len}, bowOk:out_ > .6 && level > -.3 && level < 1.1};
}

const launch = g => AR._bow ? {x:AR._bow.x, y:AR._bow.y} : {x:g.bowX, y:g.bowY};
function fire(power, ang, now){
  const g = geo(), v = VMAX*(.30 + .70*power), a = ang*Math.PI/180;
  const L0 = launch(g); AR.arrow = {x:L0.x, y:L0.y, vx:Math.cos(a)*v*g.u, vy:-Math.sin(a)*v*g.u, tr:[], t:0, done:false, ang:a, power, wob:0};
  AR.shots++; AR.vib = 0; AR.vibAmp = power; AR.recoil = 1; AR.shake = Math.max(AR.shake, power*5); AR.cool = .55;
  AUD.twang(power); AUD.whoosh(2*v*Math.sin(a)/G_ACC, power); api.vib && api.vib(12);
  burst(g.bowX + 8, g.bowY, 6, ['#fff', '#fde9a6'], 90, .35); }

function endShot(arrow, kind, ring, py){
  const g = geo(), T = AR.target;
  if(kind === 'hit'){
    AR.hits++; AR.combo++; const pts = ring <= .2 ? 10 : ring <= .5 ? 7 : ring <= .8 ? 4 : 2, q = ring <= .2 ? 4 : ring <= .5 ? 3 : ring <= .8 ? 2 : 1;
    const bonus = Math.min(5, AR.combo - 1), gain = pts + bonus; AR.score += gain; AR.flash = 1; AR.heartFlash = 0;
    T.hitAt = {x:T.x, y:py, ring}; AR.stuck.push({x:T.x - 3, y:py, a:arrow.ang, born:performance.now(), tgt:T, dy:py - T.y});
    AUD.thunk(q); sfx(q >= 3 ? 'star' : 'hit'); AR.shake = Math.max(AR.shake, 4 + q*2);
    burst(T.x, py, 10 + q*6, q === 4 ? ['#ffd93d', '#fff', '#e2574c'] : ['#fde9a6', '#fff', '#c98a4b'], 200 + q*40, .8, q >= 3 ? 'star' : 'dot');
    if(q === 4){ burst(T.x, py, 36, api.CONF, 420, 1.3, 'brick'); pop(T.x, T.y - T.R - 24, 'قلبِ هدف! +' + fa(gain), '#ffd93d', 34); sfx('cheer'); }
    else pop(T.x, T.y - T.R - 22, '+' + fa(gain), q >= 3 ? '#7cffa4' : '#fff', 30);
    if(AR.combo >= 3) pop(g.W/2, g.Hh*.2, `پشتِ سرِ هم ×${fa(AR.combo)}`, '#ffb4d0', 28);
    if(AR.combo % 5 === 0 && AR.hearts < 3){ AR.hearts++; AR.heartFlash = 1; pop(g.W/2, g.Hh*.28, 'یک قلب برگشت! 💛', '#ff9eb5', 34); sfx('fuel'); }
    const rb = AR.bestRec; if(rb > 0 && !AR.recDone && AR.score > rb){ AR.recDone = true; sfx('cheer'); pop(g.W/2, g.Hh*.12, 'رکورد را شکستی! 🏆', '#ffd93d', 36); }
    if(AR.hits % 8 === 0){ sfx('fanfare'); pop(g.W/2, g.Hh*.34, `${DAY[dayOf()].n} شد! ✨`, '#fff', 34); }
    T.gone = true; T.fall = 0; AR.nextAt = AR.t + 1.15;
  } else {
    AR.combo = 0; AR.hearts--; AR.heartFlash = -1; AR.shake = Math.max(AR.shake, 7); AUD.thud(); sfx('miss');
    burst(arrow.x, g.G, 14, ['#b88a58', '#8fd27e', '#e6cfa0'], 150, .7);
    pop(arrow.x, g.G - 30, ring === 'over' ? 'خیلی دور!' : ring === 'short' ? 'کوتاه بود!' : 'کمی اشتباه!', '#ffb86b', 28);
    AR.stuck.push({x:arrow.x, y:g.G + 1, a:Math.min(1.2, Math.max(.5, arrow.ang)) + .2, born:performance.now(), ground:true});
    if(AR.hearts <= 0){ AR.over = true; AR.overAt = AR.t + 1; } }
  AR.arrow = null; if(AR.stuck.length > 7) AR.stuck.shift(); }

function stepArrow(dt){
  const a = AR.arrow, g = geo(), T = AR.target; if(!a || a.done) return;
  const sub = 3, h = dt/sub;
  for(let s = 0; s < sub; s++){
    const ox = a.x, oy = a.y; a.vy += G_ACC*g.u*h; a.vx += AR.wind*g.u*h; a.x += a.vx*h; a.y += a.vy*h; a.t += h;
    a.ang = Math.atan2(-a.vy, a.vx);                                     // the nose follows the path
    if(T && !T.gone && ox < T.x && a.x >= T.x){
      const f = (T.x - ox)/(a.x - ox || 1), py = lerp(oy, a.y, f), ring = Math.abs(py - T.y)/T.R;
      if(ring <= 1.04){ endShot(a, 'hit', Math.min(1, ring), py); return; } }
    if(a.y >= g.G){ endShot(a, 'miss', T && a.x < T.x ? 'short' : T && a.x > T.x + T.R ? 'over' : 'near', g.G); return; }
    if(a.x > g.W + 40 || a.x < -40){ endShot(a, 'miss', 'over', g.G); return; } }
  a.tr.push({x:a.x, y:a.y}); if(a.tr.length > 18) a.tr.shift(); }

/* the dotted guide that shows the first half of the flight (wind included), so aiming is learnable */
function preview(power, ang){
  const g = geo(), v = VMAX*(.30 + .70*power)*g.u, a = ang*Math.PI/180, L0 = launch(g); let x = L0.x, y = L0.y, vx = Math.cos(a)*v, vy = -Math.sin(a)*v; const pts = [];
  const flight = 2*Math.sin(a)*v/(G_ACC*g.u); const tmax = Math.max(.25, flight*.52);
  for(let t = 0, k = 0; t < tmax; t += .02){ vy += G_ACC*g.u*.02; vx += AR.wind*g.u*.02; x += vx*.02; y += vy*.02; if(++k % 3 === 0) pts.push({x, y, t}); if(y > g.G) break; }
  return {pts, tmax}; }

/* ---- per frame: input */
function control(dt, now, live){
  const g = geo();
  if(AR.cool > 0) AR.cool -= dt;
  const rd = live && !AR.arrow && !AR.over ? readBody(now) : null;
  const newFrame = B.t !== AR.lastT; if(newFrame) AR.lastT = B.t;
  if(!rd){ if(AR.state === 'draw' && (!live || !B.b || now - B.t > 400)) cancelDraw(); AR.pullRaw *= .85; }
  else if(newFrame){
    const good = rd.posed && rd.seen;
    // how fast the drawing hand is moving (arm-lengths a second): a quick flick after a held draw is a release too,
    // the way a real archer's hand flies back when the fingers let go
    AR.dwH = (AR.dwH || []).concat({t:now, x:rd.dw.x, y:rd.dw.y}).filter(h => now - h.t < 330);
    // compare the middle of the last three positions with the middle of three positions a moment earlier: one glitchy
    // frame moves neither middle, a real flick moves both of the newest frames
    const mid3 = a => { const xs = a.map(h => h.x).sort((p, q) => p - q), ys = a.map(h => h.y).sort((p, q) => p - q); return {x:xs[xs.length >> 1], y:ys[ys.length >> 1], t:a[a.length >> 1].t}; };
    const nH = AR.dwH.length, m1 = nH >= 6 ? mid3(AR.dwH.slice(-3)) : null, m0 = nH >= 6 ? mid3(AR.dwH.slice(0, 3)) : null;
    // only a flick *away* from the bow counts (back past the face, or down): a hand that jumps toward the bow is the
    // other kind of release, judged by the string's length instead
    const away = m1 && ((m1.x - m0.x)*(m1.x - rd.bw.x) + (m1.y - m0.y)*(m1.y - rd.bw.y)) > 0;
    const flick = m1 && away ? Math.hypot(m1.x - m0.x, m1.y - m0.y)/Math.max(.05, (m1.t - m0.t)/1000) : 0;
    AR.flickN = flick > 2.0 ? (AR.flickN || 0) + 1 : 0;           // and it must last three frames: a hand that flicks stays moved, a glitch comes back
    if(window.HKA_DBG) (AR.dbg = AR.dbg || []).push({t:Math.round(now), p:+rd.pull.toFixed(2), good, st:AR.state, flick:+flick.toFixed(1), fN:AR.flickN, pk:+(AR.peak || 0).toFixed(2), pkT:Math.round(now - (AR.peakT || 0))});
    const flickRelease = AR.state === 'draw' && now - AR.drawT > 500 && now - (AR.peakT || 0) > 250 && AR.peak >= POWER_MIN && AR.flickN >= 3 && rd.seen && rd.bowOk;   // only once the string has stopped coming back
    if(good || AR.state !== 'draw'){ AR.pullRaw = rd.pull; AR.angRaw = rd.ang; }
    if(good){ AR.hist.push({t:now, p:rd.pull, a:rd.ang}); while(AR.hist.length && now - AR.hist[0].t > 600) AR.hist.shift(); }
    // the last three good readings, by their middle value: one jumpy frame cannot fire an arrow
    const last3 = AR.hist.slice(-3).map(h => h.p).sort((x, y) => x - y), med = last3.length ? last3[last3.length >> 1] : 0;
    // releasing looks at the middle of five: even two bad frames in a row (a hand hidden for a moment) cannot fire
    const last5 = AR.hist.slice(-5).map(h => h.p).sort((x, y) => x - y), med5 = last5.length ? last5[last5.length >> 1] : 0;
    if(AR.state === 'idle' && AR.cool <= 0 && good && med > .26){ AR.state = 'draw'; AR.side = rd.side; AR.peak = med; AR.drawT = now; AR.peakT = now; AR.relN = 0; AR.lostT = 0; AUD.drawOn(); }
    else if(AR.state === 'draw' && !good && !flickRelease){
      // the bow arm sagged or a hand went out of sight: wait; if it lasts, put the arrow down without shooting
      AR.lostT = AR.lostT || now;
      if(now - AR.lostT > 800){ cancelDraw(); AR.hint = 'دستِ کمان را کنارِ بدن صاف نگه دار'; AR.hintT = 1.8; } }
    else if(AR.state === 'draw'){
      AR.lostT = 0; if(med > AR.peak + .02) AR.peakT = now; AR.peak = Math.max(AR.peak, med);
      const drop = AR.peak - med;
      // a release is the drawing hand coming back toward the bow, clearly and for two frames running, after the
      // string has been held a moment
      AR.relN = AR.peak - med5 > .22 && med5 < AR.peak*.7 && now - AR.drawT > 400 ? (AR.relN || 0) + 1 : 0;
      if(AR.relN >= 2 || flickRelease){ AR.why = {by:flickRelease ? 'flick' : 'span', med5:+med5.toFixed(2), peak:+AR.peak.toFixed(2), flick:+flick.toFixed(2), flickN:AR.flickN, n:AR.dwH.length};                                                    // the hand opened: release
        // read the draw and the aim from a moment before the hand moved away, not from the springing-back frames
        const win = AR.hist.filter(h => now - h.t > 50); let pw = 0, an = AR.ang;
        win.forEach(h => { if(h.p >= pw){ pw = h.p; an = h.a; } });
        const smooth = win.slice(-4).map(h => h.a).sort((x, y) => x - y); if(smooth.length) an = smooth[smooth.length >> 1];
        AUD.drawOff(); AR.state = 'idle'; AR.hist.length = 0; AR.readyTick = false;
        if(pw >= POWER_MIN) fire(pw, an, now);
        else { AR.cool = .35; AR.hint = 'بیشتر بکش!'; AR.hintT = 1.3; sfx('soft'); } } } }
  // smooth what is drawn on the screen
  const old = AR.pull; AR.pull += (AR.pullRaw - AR.pull)*Math.min(1, dt*16); AR.ang += (AR.angRaw - AR.ang)*Math.min(1, dt*12);
  AR.speed = (AR.pull - old)/Math.max(dt, .001);
  if(live && A.phase === 'run' && AR.state === 'idle' && !AR.arrow && !AR.over){
    AR.idleT = (AR.idleT || 0) + dt;
    if(AR.idleT > 5 && now - (AR.coachT || 0) > 9000){ AR.coachT = now; H.voice('osta-armS', 'step'); AR.hint = 'روبه‌روی گوشی بایست و یک دستت را صاف کنارِ بدن ببر'; AR.hintT = 3; } }
  else AR.idleT = 0;
  if(AR.state === 'draw' && live){
    AUD.drawSet(AR.pull, AR.speed);
    if(AR.pull > .78 && !AR.readyTick){ AR.readyTick = true; AUD.ready(); }
    if(AR.pull < .6) AR.readyTick = false; }
  else AUD.drawOff(); }
function cancelDraw(){ AUD.drawOff(); AR.state = 'idle'; AR.hist.length = 0; AR.pullRaw = 0; AR.relN = 0; AR.lostT = 0; }

/* ================================================================ drawing: the scene */
let BG = null;
/* the day moves on with every eight arrows that hit: morning, noon, sunset, a starry night, and morning again */
const DAY = [{n:'صبح', sky:['#5fb8f5', '#a9defa', '#fff0cf']}, {n:'ظهر', sky:['#3d9ee8', '#8fd0f7', '#e6f6ff']},
             {n:'غروب', sky:['#5b4fa8', '#f08a6a', '#ffd59a'], tint:'rgba(255,150,105,.5)'}, {n:'شب', sky:['#0d1a4f', '#28377f', '#5d6cb8'], tint:'rgba(40,52,130,.62)', night:true}];
const dayOf = () => Math.floor(AR.hits/8) % DAY.length;
function scene(g){
  const ph = dayOf(), D = DAY[ph], key = g.W + 'x' + g.Hh + 'x' + (window.devicePixelRatio || 1) + 'x' + ph;
  if(BG && BG.key === key) return BG.cv;
  const dpr = Math.min(2, window.devicePixelRatio || 1), cv = document.createElement('canvas'); cv.width = Math.round(g.W*dpr); cv.height = Math.round(g.Hh*dpr);
  const x = cv.getContext('2d'); x.scale(dpr, dpr); const {W, Hh, G, u} = g;
  // sky: a clear morning that warms to cream at the horizon
  let sk = x.createLinearGradient(0, 0, 0, G); sk.addColorStop(0, D.sky[0]); sk.addColorStop(.55, D.sky[1]); sk.addColorStop(1, D.sky[2]);
  x.fillStyle = sk; x.fillRect(0, 0, W, Hh);
  // the sun with a soft halo
  const sx = W*.8, sy = G*.26, sg = x.createRadialGradient(sx, sy, 4, sx, sy, u*.45); sg.addColorStop(0, 'rgba(255,244,190,.95)'); sg.addColorStop(.35, 'rgba(255,230,150,.35)'); sg.addColorStop(1, 'rgba(255,230,150,0)');
  x.fillStyle = sg; x.fillRect(0, 0, W, G); x.fillStyle = '#ffe27a'; x.strokeStyle = INK; x.lineWidth = 2.5; x.beginPath(); x.arc(sx, sy, u*.05, 0, 7); x.fill(); x.stroke();
  // a far range, then Damavand: a tall cone with snow, as in the Persian sky
  const range = (base, col, pts, snow) => { x.fillStyle = col; x.beginPath(); x.moveTo(0, base); pts.forEach(([px, py]) => x.lineTo(px*W, py*G)); x.lineTo(W, base); x.closePath(); x.fill(); };
  range(G, '#b7c8e6', [[0, .62], [.12, .5], [.22, .6], [.34, .46], [.46, .62], [.6, .55], [.74, .64], [.9, .52], [1, .6]]);
  const mg = x.createLinearGradient(0, G*.3, 0, G); mg.addColorStop(0, '#8aa0c9'); mg.addColorStop(1, '#a9bde0');
  x.fillStyle = mg; x.beginPath(); x.moveTo(W*.22, G); x.lineTo(W*.46, G*.52); x.lineTo(W*.575, G*.3); x.lineTo(W*.7, G*.5); x.lineTo(W*1.02, G); x.closePath(); x.fill();
  x.fillStyle = '#fff'; x.beginPath(); x.moveTo(W*.575, G*.3); x.lineTo(W*.53, G*.385); x.lineTo(W*.55, G*.37); x.lineTo(W*.565, G*.425); x.lineTo(W*.585, G*.38); x.lineTo(W*.605, G*.43); x.lineTo(W*.62, G*.37); x.lineTo(W*.64, G*.385); x.closePath(); x.fill();
  x.strokeStyle = 'rgba(43,33,64,.5)'; x.lineWidth = 2; x.lineJoin = 'round'; x.beginPath(); x.moveTo(W*.22, G); x.lineTo(W*.46, G*.52); x.lineTo(W*.575, G*.3); x.lineTo(W*.7, G*.5); x.lineTo(W*1.02, G); x.stroke();
  x.strokeStyle = 'rgba(255,255,255,.35)'; x.lineWidth = 3; x.beginPath(); x.moveTo(W*.5, G*.5); x.lineTo(W*.46, G*.8); x.moveTo(W*.64, G*.55); x.lineTo(W*.7, G*.85); x.stroke();
  // rolling hills in two greens
  const hills = (base, amp, col, ph, line) => { x.fillStyle = col; x.beginPath(); x.moveTo(0, G); for(let px = 0; px <= W; px += 6) x.lineTo(px, base - amp*(Math.sin(px/W*5 + ph)*.6 + Math.sin(px/W*11 + ph*2)*.4)); x.lineTo(W, G); x.closePath(); x.fill();
    if(line){ x.strokeStyle = line; x.lineWidth = 2; x.stroke(); } };
  hills(G - u*.07, u*.045, '#9ad87f', 1.2, 'rgba(43,33,64,.25)'); hills(G - u*.025, u*.035, '#79c667', 3.1, 'rgba(43,33,64,.3)');
  // cypresses (سرو), the tree of Iranian gardens
  const cyp = (cx, h, w) => { const gr = x.createLinearGradient(cx - w, 0, cx + w, 0); gr.addColorStop(0, '#2f7d4a'); gr.addColorStop(1, '#1f5a37');
    x.fillStyle = gr; x.strokeStyle = INK; x.lineWidth = 2; x.beginPath(); x.moveTo(cx, G - h); x.bezierCurveTo(cx + w*1.3, G - h*.7, cx + w*1.1, G - h*.1, cx + w*.6, G); x.lineTo(cx - w*.6, G); x.bezierCurveTo(cx - w*1.1, G - h*.1, cx - w*1.3, G - h*.7, cx, G - h); x.fill(); x.stroke(); };
  cyp(W*.03, u*.34, u*.05); cyp(W*.075, u*.26, u*.04); cyp(W*.955, u*.30, u*.045);
  // the meadow: stripes of mown grass, a darker band at the shooting line
  const gr = x.createLinearGradient(0, G, 0, Hh); gr.addColorStop(0, '#6fc45a'); gr.addColorStop(1, '#3f9a44'); x.fillStyle = gr; x.fillRect(0, G, W, Hh - G);
  x.fillStyle = 'rgba(255,255,255,.07)'; for(let i = 0; i < 10; i++){ const y0 = G + (Hh - G)*i/10; if(i % 2) x.fillRect(0, y0, W, (Hh - G)/10); }
  x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(0, G); x.lineTo(W, G); x.stroke();
  x.strokeStyle = '#2f8a3a'; x.lineWidth = 2; x.lineCap = 'round'; for(let i = 0; i < 80; i++){ const px = (i*53.7)%W, py = G + 6 + ((i*37.3)%(Hh - G - 10)); x.beginPath(); x.moveTo(px, py); x.lineTo(px - 2, py - 7); x.moveTo(px, py); x.lineTo(px + 3, py - 8); x.stroke(); }
  // flowers dotted on the grass
  for(let i = 0; i < 18; i++){ const px = (i*97.1 + 20)%W, py = G + 14 + ((i*61.7)%(Hh - G - 22)); x.fillStyle = ['#fff', '#ffd93d', '#ff8fb1'][i%3]; x.beginPath(); x.arc(px, py, 2.6, 0, 7); x.fill(); }
  // late in the day the whole land takes the light's colour; at night, stars and a moon come out
  if(D.tint){ x.globalCompositeOperation = 'multiply'; x.fillStyle = D.tint; x.fillRect(0, G*.2, W, Hh - G*.2);
    if(!D.night){ const gl = x.createLinearGradient(0, G*.35, 0, G*1.05); gl.addColorStop(0, 'rgba(255,150,70,0)'); gl.addColorStop(1, 'rgba(255,150,70,.45)');   // the low sun warms the land
      x.globalCompositeOperation = 'screen'; x.fillStyle = gl; x.fillRect(0, 0, W, Hh); }
    x.globalCompositeOperation = 'source-over'; }
  if(D.night){ x.fillStyle = '#fff'; for(let i = 0; i < 46; i++){ x.globalAlpha = .4 + (i % 5)*.12; x.beginPath(); x.arc((i*97.3) % W, (i*53.1) % (G*.55), .8 + (i % 3)*.6, 0, 7); x.fill(); } x.globalAlpha = 1;
    x.fillStyle = '#fff6d0'; x.strokeStyle = INK; x.lineWidth = 2.5; x.beginPath(); x.arc(W*.8, G*.26, u*.05, 0, 7); x.fill(); x.stroke(); }
  BG = {key, cv}; return cv; }

function clouds(g, t){
  const ctx = api.ctx; [[.12, .08, 1], [.55, .15, .8], [.85, .06, .65]].forEach(([fx, fy, s], i) => {
    const cx = ((fx*g.W + t*(6 + i*3)) % (g.W + 160)) - 80, cy = g.G*(fy + .06), r = g.u*.05*s; ctx.fillStyle = ['rgba(255,255,255,.92)', 'rgba(255,255,255,.95)', 'rgba(255,214,190,.9)', 'rgba(140,152,205,.55)'][dayOf()]; ctx.strokeStyle = 'rgba(43,33,64,.35)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.arc(cx + r*1.1, cy - r*.4, r*1.1, 0, 7); ctx.arc(cx + r*2.3, cy, r*.9, 0, 7); ctx.rect(cx, cy, r*2.3, r*.9); ctx.fill(); }); }
function birds(g, t){
  const ctx = api.ctx; ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.lineCap = 'round';
  for(let i = 0; i < 3; i++){ const bx = ((t*28 + i*140) % (g.W + 120)) - 60, by = g.G*.32 + Math.sin(t*1.3 + i*2)*14 + i*18, f = Math.sin(t*9 + i)*5;
    ctx.beginPath(); ctx.moveTo(bx - 9, by - f); ctx.quadraticCurveTo(bx - 4, by - 5 - f*.3, bx, by); ctx.quadraticCurveTo(bx + 4, by - 5 - f*.3, bx + 9, by - f); ctx.stroke(); } }

/* ---- the target: a painted shield on a pole, with a pennant that shows the wind */
function drawTarget(g, T, now){
  const ctx = api.ctx; if(!T) return; const R = T.R;
  let alpha = 1, off = 0; if(T.gone){ T.fall += 1/60; alpha = clamp(1 - (T.fall - .5)/.6, 0, 1); off = Math.min(1, T.fall*1.2)*g.u*.04; }
  const born = clamp((now - T.born)/450, 0, 1), rise = (1 - born)*(1 - born)*g.u*.2; if(alpha <= 0) return;
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(0, off + rise);
  // pole and base
  const px = T.x, top = T.y + R*.9, w = Math.max(5, R*.16);
  ctx.fillStyle = '#9b6a3c'; ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.fillRect(px - w/2, top, w, g.G - top); ctx.strokeRect(px - w/2, top, w, g.G - top);
  ctx.beginPath(); ctx.ellipse(px, g.G, R*.55, R*.14, 0, 0, 7); ctx.fillStyle = '#7b5230'; ctx.fill(); ctx.stroke();
  // shield: straw rim, then rings
  ctx.beginPath(); ctx.arc(px, T.y, R*1.12, 0, 7); ctx.fillStyle = '#e0b46a'; ctx.fill(); ctx.stroke();
  const rings = [['#fff6e3', 1], ['#2d9ad6', .8], ['#e2574c', .5], ['#ffd93d', .2]];
  rings.forEach(([col, k]) => { ctx.beginPath(); ctx.arc(px, T.y, R*k, 0, 7); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 2; ctx.stroke(); });
  ctx.beginPath(); ctx.arc(px, T.y, R*.2, 0, 7); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.beginPath(); ctx.ellipse(px - R*.3, T.y - R*.42, R*.22, R*.1, -.6, 0, 7); ctx.fill();
  // wind pennant on the top of the pole
  const fl = AR.wind, flagLen = g.u*(.05 + Math.min(.06, Math.abs(fl)*.35)), dir = fl >= 0 ? 1 : -1, wave = Math.sin(now/110 + px)*.25;
  ctx.fillStyle = '#e2574c'; ctx.beginPath(); ctx.moveTo(px, top - R*.12); ctx.quadraticCurveTo(px + dir*flagLen*.5, top - R*.12 - flagLen*.15 + wave*8, px + dir*flagLen, top - R*.04 + wave*10);
  ctx.quadraticCurveTo(px + dir*flagLen*.5, top + R*.1, px, top + R*.06); ctx.fill(); ctx.stroke();
  ctx.restore(); }

/* ---- the hero. Side view, facing the target, built from the child's own proportions of the game. */
/* ---- the hero as a cut-out puppet: pieces painted by hand (img/rig/<girl|boy>-*.webp), turned at their joints.
   All numbers are in the pieces' own pixels (the 1024-pixel sheet). Until a set has loaded, the drawn hero above is used. */
const RIG_PARTS = ['head', 'head-aim', 'head-happy', 'torso', 'legs', 'upper', 'fa-fist', 'fa-pinch', 'bow', 'arrow', 'cap'];
const RIG_HAS = {girl:true, boy:true};                        // which children have their pieces yet
const RIG = {};
function rigOf(who){
  if(!RIG_HAS[who]) return null;
  if(!RIG[who]){ RIG[who] = {}; RIG_PARTS.forEach(n => { const im = new Image(); im.src = `img/rig/${who}-${n}.webp`; RIG[who][n] = im; }); }
  const r = RIG[who]; return RIG_PARTS.every(n => r[n].complete && r[n].naturalWidth) ? r : null; }
const ARROW_IMG = () => { const r = rigOf('girl') || rigOf('boy'); return r && r.arrow; };
/* joints, measured on the pieces */
const J = {legsHip:[93, 2], torsoNeck:[116, 0], torsoHem:229, headNeck:[77, 215], shFront:[140, 34], shBack:[96, 30],
  upA:[26, 26], upB:[127, 26], faA:[27, 32], fist:[152, 30], pinch:[168, 24], bowGrip:[52, 155], bowTop:[15, 2], bowBot:[15, 238], arrowLen:222, arrowY:20};
const JW = {girl:{}, boy:{headNeck:[123, 197], legsHip:[103, 2]}};       // where the two children's pieces differ
const LU = J.upB[0] - J.upA[0], LF_FIST = J.fist[0] - J.faA[0], LF_PINCH = J.pinch[0] - J.faA[0];
function drawRig(g, t){
  const who = H.kid() === 'boy' ? 'boy' : 'girl', R = rigOf(who); if(!R) return false;
  const ctx = api.ctx, sc = g.ah/560, x0 = g.x0, G = g.G;
  const P = (x, y) => ({x:x0 + x*sc, y:G + y*sc});
  const a = AR.ang*Math.PI/180, d = {x:Math.cos(a), y:-Math.sin(a)};
  const breath = Math.sin(t*2.1)*1.5, drawn = AR.state === 'draw' || AR.pull > .05;
  // place a piece so that its point (px, py) lands at screen point s, turned by ang
  const put = (im, px, py, s, ang = 0, sx = 1, sy = 1) => { ctx.save(); ctx.translate(s.x, s.y); if(ang) ctx.rotate(ang); ctx.scale(sx, sy);
    ctx.drawImage(im, -px*sc, -py*sc, im.naturalWidth*sc, im.naturalHeight*sc); ctx.restore(); };
  ctx.save();
  ctx.fillStyle = 'rgba(30,60,30,.28)'; ctx.beginPath(); ctx.ellipse(x0, G + 2, 120*sc, 22*sc, 0, 0, 7); ctx.fill();
  // body: legs, torso leaning a little into the shot, head
  const hip = P(0, -236), lean = (drawn ? -.05 : 0) - (AR.ang - 25)*.001 - AR.recoil*.02;
  const JJ = Object.assign({}, J, JW[who]);
  put(R.legs, JJ.legsHip[0], JJ.legsHip[1], P(0, -238));
  const torsoTop = {x:hip.x + 8*sc, y:hip.y + (70 - J.torsoHem)*sc + breath*.3*sc};      // the hem overlaps the skirt by 70
  const T = (px, py) => { const dx = (px - J.torsoNeck[0])*sc, dy = (py - J.torsoNeck[1])*sc; return {x:torsoTop.x + dx*Math.cos(lean) - dy*Math.sin(lean), y:torsoTop.y + dx*Math.sin(lean) + dy*Math.cos(lean)}; };
  const S1 = T(...J.shFront), S2 = T(...J.shBack);
  // the bow arm goes behind the body: straight along the aim
  const rec = AR.recoil*10*sc, elb1 = {x:S1.x + d.x*LU*sc, y:S1.y + d.y*LU*sc};
  put(R.upper, J.upA[0], J.upA[1], S1, -a); put(R['fa-fist'], J.faA[0], J.faA[1], elb1, -a);
  const grip = {x:S1.x + d.x*((LU + LF_FIST)*sc - rec), y:S1.y + d.y*((LU + LF_FIST)*sc - rec)};
  put(R.torso, J.torsoNeck[0], J.torsoNeck[1], torsoTop, lean);
  const head = drawn && AR.pull > .45 ? R['head-aim'] : AR.flash > .2 ? R['head-happy'] : R.head;
  put(head, JJ.headNeck[0], JJ.headNeck[1], T(J.torsoNeck[0] - 4, J.torsoNeck[1] + 46), lean*.6);
  // the bow: two limbs that bend back toward the archer as the string comes back
  const bend = AR.pull*.2, bowAng = -a;
  const bw = R.bow, gx = J.bowGrip[0], gy = J.bowGrip[1];
  const bs = sc*1.35;                                                       // a bow a little grander than life
  const limb = (y0, y1, ang) => { ctx.save(); ctx.translate(grip.x, grip.y); ctx.rotate(bowAng + ang); ctx.beginPath(); ctx.rect(-gx*bs - 4, (y0 - gy)*bs, bw.naturalWidth*bs + 8, (y1 - y0)*bs); ctx.clip();
    ctx.drawImage(bw, -gx*bs, -gy*bs, bw.naturalWidth*bs, bw.naturalHeight*bs); ctx.restore(); };
  limb(0, gy, -bend); limb(gy, bw.naturalHeight, bend);
  const tip = (px, py, ang) => { const lx = (px - gx)*bs, ly = (py - gy)*bs, r = bowAng + ang; return {x:grip.x + lx*Math.cos(r) - ly*Math.sin(r), y:grip.y + lx*Math.sin(r) + ly*Math.cos(r)}; };
  const tTop = tip(...J.bowTop, -bend), tBot = tip(...J.bowBot, bend);
  // where the string is: drawn back to the hand, or quivering after a shot
  const brace = (gx - J.bowTop[0])*bs, L = brace + 175*sc*AR.pull;
  const vibr = AR.vibAmp > 0 ? Math.sin(AR.vib*60)*AR.vibAmp*14*sc*Math.exp(-AR.vib*7) : 0;
  const loaded = !AR.arrow && !AR.over && AR.cool <= .5;
  const nock = {x:grip.x - d.x*(loaded ? L : brace + vibr), y:grip.y - d.y*(loaded ? L : brace + vibr)};
  ctx.strokeStyle = '#fff8e0'; ctx.lineWidth = Math.max(1.4, 5*sc); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(tTop.x, tTop.y); ctx.lineTo(nock.x, nock.y); ctx.lineTo(tBot.x, tBot.y); ctx.stroke();
  ctx.strokeStyle = 'rgba(43,33,64,.55)'; ctx.lineWidth = Math.max(.6, 1.6*sc); ctx.stroke();
  if(loaded){
    // the arrow on the string, a fifth longer than the piece so its head stays in front of the bow at a full draw
    const len = J.arrowLen*1.2*sc; ctx.save(); ctx.translate(nock.x, nock.y); ctx.rotate(-a); ctx.drawImage(R.arrow, 0, -J.arrowY*sc, len, R.arrow.naturalHeight*sc); ctx.restore();
    // draw arm: shoulder → elbow → the pinching hand on the string (two bones; the elbow folds up and back)
    const dx = nock.x - S2.x, dy = nock.y - S2.y, dd = Math.min(Math.hypot(dx, dy), (LU + LF_PINCH)*sc*.999), ux = dx/(Math.hypot(dx, dy) || 1), uy = dy/(Math.hypot(dx, dy) || 1);
    const l1 = LU*sc, l2 = LF_PINCH*sc, ca = clamp((l1*l1 + dd*dd - l2*l2)/(2*l1*dd || 1), -1, 1), th = Math.acos(ca);
    const base = Math.atan2(uy, ux), e1 = {x:S2.x + Math.cos(base - th)*l1, y:S2.y + Math.sin(base - th)*l1}, e2 = {x:S2.x + Math.cos(base + th)*l1, y:S2.y + Math.sin(base + th)*l1};
    const elb = e1.y < e2.y ? e1 : e2;                                      // the elbow stays high
    const hand = {x:S2.x + ux*dd, y:S2.y + uy*dd};
    put(R.upper, J.upA[0], J.upA[1], S2, Math.atan2(elb.y - S2.y, elb.x - S2.x));
    const fa = Math.atan2(hand.y - elb.y, hand.x - elb.x), flip = Math.cos(fa) < 0;
    put(R['fa-pinch'], J.faA[0], J.faA[1], elb, fa, 1, flip ? -1 : 1);
  } else {
    // the hand drops after the shot
    const el = {x:S2.x - 12*sc, y:S2.y + LU*sc*.95}; put(R.upper, J.upA[0], J.upA[1], S2, Math.atan2(el.y - S2.y, el.x - S2.x));
    put(R['fa-pinch'], J.faA[0], J.faA[1], el, Math.PI*.42); }
  put(R.cap, 40, 31, S2, lean);
  ctx.restore();
  AR._bow = {x:grip.x, y:grip.y, d, a, k:sc*5.6, nock};
  return true; }
function drawArrowImg(tip, ang, len, alpha){
  const im = ARROW_IMG(); if(!im) return false; const h = len*im.naturalHeight/im.naturalWidth;
  const ctx = api.ctx; ctx.save(); ctx.globalAlpha = alpha == null ? 1 : alpha; ctx.translate(tip.x, tip.y); ctx.rotate(-ang); ctx.drawImage(im, -len, -h/2, len, h); ctx.restore(); return true; }

function drawArcher(g, t){
  if(drawRig(g, t)) return;
  const ctx = api.ctx, k = g.ah/100, girl = H.kid() !== 'boy', x0 = g.x0, G = g.G;
  const jacket = girl ? '#16a394' : '#f0a21a', jacketD = girl ? '#0f7d72' : '#c97d0a', trs = girl ? '#37426f' : '#3b3a63', skin = girl ? '#f3c19a' : '#e8b184';
  const P = (px, py) => ({x:x0 + px*k, y:G + py*k});                   // figure space → screen
  const a = AR.ang*Math.PI/180, d = {x:Math.cos(a), y:-Math.sin(a)}, perp = {x:Math.sin(a), y:Math.cos(a)};
  const drawn = AR.state === 'draw' || AR.pull > .05, idleBreath = Math.sin(t*2.1)*.8;
  const lean = (drawn ? -.1 : 0) - (AR.ang - 25)*.0016 - AR.recoil*.03;
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = INK;
  // ground shadow
  ctx.fillStyle = 'rgba(30,60,30,.28)'; ctx.beginPath(); ctx.ellipse(x0, G + 2, 24*k, 5*k, 0, 0, 7); ctx.fill();
  const limb = (p0, p1, w, col) => { ctx.strokeStyle = INK; ctx.lineWidth = w + 4; ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); };
  // legs: wide side-on stance, boots pointing at the target
  const hipP = P(0, -46), fF = P(11, -2), fB = P(-9, -2);
  limb(hipP, {x:fB.x, y:fB.y - 4*k}, 9*k, trs); limb(hipP, {x:fF.x, y:fF.y - 4*k}, 9*k, trs);
  ctx.fillStyle = '#3a2a22'; ctx.lineWidth = 2.5; [fB, fF].forEach((f, i) => { ctx.beginPath(); ctx.ellipse(f.x + (i ? 3 : 2)*k, f.y, 8*k, 4.2*k, 0, 0, 7); ctx.fill(); ctx.stroke(); });
  // torso, tilted a little into the shot
  ctx.save(); ctx.translate(hipP.x, hipP.y + idleBreath*k*.2); ctx.rotate(lean);
  const tw = 19*k, th = 29*k; ctx.beginPath(); ctx.moveTo(-tw/2, 0); ctx.lineTo(-tw/2*1.08, -th); ctx.quadraticCurveTo(0, -th - 5*k, tw/2*1.08, -th); ctx.lineTo(tw/2, 0); ctx.quadraticCurveTo(0, 5*k, -tw/2, 0); ctx.closePath();
  const tg = ctx.createLinearGradient(-tw/2, 0, tw/2, 0); tg.addColorStop(0, jacketD); tg.addColorStop(.5, jacket); tg.addColorStop(1, jacket); ctx.fillStyle = tg; ctx.lineWidth = 2.5; ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#ffd24a'; ctx.beginPath(); ctx.rect(-tw/2*1.02, -7*k, tw*1.02, 4.4*k); ctx.fill(); ctx.stroke();                              // golden sash
  ctx.fillStyle = '#ffd24a'; ctx.beginPath(); ctx.arc(0, -th*.62, 2.2*k, 0, 7); ctx.fill();
  // quiver on the back with spare arrows
  ctx.fillStyle = '#7b4a2a'; ctx.save(); ctx.translate(-tw*.62, -th*.78); ctx.rotate(-.5); ctx.beginPath(); ctx.rect(-3.4*k, -9*k, 6.8*k, 22*k); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.6; [-1.8, 1.8].forEach(o => { ctx.beginPath(); ctx.moveTo(o*k, -9*k); ctx.lineTo(o*k*1.5, -16*k); ctx.stroke(); }); ctx.fillStyle = '#e2574c'; [-1.8, 1.8].forEach(o => { ctx.beginPath(); ctx.arc(o*k*1.5, -16*k, 1.8*k, 0, 7); ctx.fill(); }); ctx.restore();
  ctx.restore();
  const S = P(3, -72 + idleBreath*.2), shoulder = {x:S.x + Math.sin(lean)*-8*k, y:S.y};
  // head
  const hd = P(2 + (drawn ? 2.5 : 0), -86 + idleBreath*.3);
  const happy = AR.flash > .2;
  if(girl){ ctx.fillStyle = '#12a89a'; ctx.beginPath(); ctx.moveTo(hd.x - 11*k, hd.y - 2*k); ctx.bezierCurveTo(hd.x - 15*k, hd.y - 16*k, hd.x + 9*k, hd.y - 19*k, hd.x + 11*k, hd.y - 4*k); ctx.bezierCurveTo(hd.x + 6*k, hd.y + 5*k, hd.x - 4*k, hd.y + 4*k, hd.x - 8*k, hd.y + 12*k);
    ctx.bezierCurveTo(hd.x - 14*k, hd.y + 18*k, hd.x - 18*k, hd.y + 8*k, hd.x - 11*k, hd.y - 2*k); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle = skin; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(hd.x + 1.5*k, hd.y, 8.6*k, 0, 7); ctx.fill(); ctx.stroke();
  if(girl){ ctx.fillStyle = '#12a89a'; ctx.beginPath(); ctx.moveTo(hd.x - 7*k, hd.y - 5*k); ctx.bezierCurveTo(hd.x - 3*k, hd.y - 12*k, hd.x + 8*k, hd.y - 12*k, hd.x + 10*k, hd.y - 4*k); ctx.bezierCurveTo(hd.x + 5*k, hd.y - 8*k, hd.x - 2*k, hd.y - 6*k, hd.x - 7*k, hd.y - 5*k); ctx.fill(); ctx.stroke(); }
  else { ctx.fillStyle = '#2a1d1a'; ctx.beginPath(); ctx.arc(hd.x + .8*k, hd.y - 1.6*k, 9.2*k, Math.PI*1.02, Math.PI*2.05); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#e2574c'; ctx.beginPath(); ctx.rect(hd.x - 8.4*k, hd.y - 5.2*k, 18.4*k, 3.4*k); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(hd.x - 8*k, hd.y - 3.6*k); ctx.lineTo(hd.x - 15*k, hd.y - 1*k + Math.sin(t*5)*1.5*k); ctx.lineTo(hd.x - 9*k, hd.y + 1.6*k); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  // face: one eye (we see the profile), cheek, mouth
  ctx.fillStyle = INK; const aim = drawn ? 1.8 : 0; ctx.beginPath(); ctx.ellipse(hd.x + 5.6*k, hd.y - 1*k, 1.35*k, (drawn && AR.pull > .5 ? .8 : 1.8)*k, 0, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,120,120,.55)'; ctx.beginPath(); ctx.arc(hd.x + 3.2*k, hd.y + 3.6*k, 2.2*k, 0, 7); ctx.fill();
  ctx.strokeStyle = INK; ctx.lineWidth = 1.8; ctx.beginPath(); if(happy){ ctx.arc(hd.x + 6.4*k, hd.y + 3.4*k, 2.4*k, .1, Math.PI - .1); } else { ctx.moveTo(hd.x + 5*k, hd.y + 5*k); ctx.lineTo(hd.x + 8*k, hd.y + 4.6*k); } ctx.stroke();
  ctx.beginPath(); ctx.moveTo(hd.x + 9.7*k, hd.y + 0); ctx.lineTo(hd.x + 11*k, hd.y + 2*k); ctx.lineTo(hd.x + 9.4*k, hd.y + 2.4*k); ctx.stroke();
  // ---- the bow arm (straight at the aim) and the bow
  const reach = 36*k, hand = {x:shoulder.x + d.x*reach, y:shoulder.y + d.y*reach};
  limb(shoulder, hand, 8*k, jacket); ctx.fillStyle = skin; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(hand.x, hand.y, 4.4*k, 0, 7); ctx.fill(); ctx.stroke();
  const rec = AR.recoil*3*k, hd2 = {x:hand.x - d.x*rec, y:hand.y - d.y*rec};
  const bl = 30*k, back = 9*k, tip1 = {x:hd2.x + perp.x*bl - d.x*back, y:hd2.y + perp.y*bl - d.y*back}, tip2 = {x:hd2.x - perp.x*bl - d.x*back, y:hd2.y - perp.y*bl - d.y*back};
  const bend = 1 + AR.pull*.55, ctrl = {x:hd2.x + d.x*back*2*bend, y:hd2.y + d.y*back*2*bend};
  // drawing pulls the tips back toward the archer
  const pt1 = {x:tip1.x - d.x*AR.pull*7*k, y:tip1.y - d.y*AR.pull*7*k}, pt2 = {x:tip2.x - d.x*AR.pull*7*k, y:tip2.y - d.y*AR.pull*7*k};
  ctx.strokeStyle = INK; ctx.lineWidth = 8*k*.5 + 4; ctx.beginPath(); ctx.moveTo(pt1.x, pt1.y); ctx.quadraticCurveTo(ctrl.x, ctrl.y, pt2.x, pt2.y); ctx.stroke();
  ctx.strokeStyle = '#a9672e'; ctx.lineWidth = 8*k*.5; ctx.stroke();
  ctx.strokeStyle = '#d9a25e'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(pt1.x - perp.x*.5, pt1.y - perp.y*.5); ctx.quadraticCurveTo(ctrl.x + 1, ctrl.y - 1, pt2.x, pt2.y); ctx.stroke();
  ctx.fillStyle = '#ffd24a'; [pt1, pt2].forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 2.4*k + 1, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 1.6; ctx.stroke(); });
  // string and the draw hand
  const L = (5 + 20*AR.pull)*k, vibr = AR.vibAmp > 0 ? Math.sin(AR.vib*60)*AR.vibAmp*5*k*Math.exp(-AR.vib*7) : 0;
  const nock = {x:hd2.x - d.x*(L - vibr*1), y:hd2.y - d.y*(L - vibr*1)};
  const sPt = AR.arrow || AR.cool > .5 ? {x:hd2.x - d.x*(back*.2 + vibr*.9), y:hd2.y - d.y*(back*.2 + vibr*.9)} : nock;
  ctx.strokeStyle = '#fff8e0'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(pt1.x, pt1.y); ctx.lineTo(sPt.x, sPt.y); ctx.lineTo(pt2.x, pt2.y); ctx.stroke();
  // the arrow on the string
  if(!AR.arrow && !AR.over){
    const tail = nock, headP = {x:hd2.x + d.x*7*k, y:hd2.y + d.y*7*k}; drawArrowShape(tail, headP, a, k, .9);
    // draw arm: shoulder → elbow → hand on the string, two bones that bend away from the line
    const up = 17*k, tgt = nock, dx = tgt.x - shoulder.x, dy = tgt.y - shoulder.y, dd = Math.min(Math.hypot(dx, dy), 2*up - .5), ex = shoulder.x + dx/2, ey = shoulder.y + dy/2;
    const hh = Math.sqrt(Math.max(0, up*up - (dd/2)*(dd/2))), nl = Math.hypot(dx, dy) || 1, nx = -dy/nl, ny = dx/nl;
    // pick the bend that sits behind/above the shoulder
    const e1 = {x:ex + nx*hh, y:ey + ny*hh}, e2 = {x:ex - nx*hh, y:ey - ny*hh}, el = (e1.x + e1.y*.3 < e2.x + e2.y*.3) ? e1 : e2;
    limb(shoulder, el, 7.4*k, jacket); limb(el, tgt, 6.4*k, jacket); ctx.fillStyle = skin; ctx.lineWidth = 2.2; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(tgt.x, tgt.y, 3.8*k, 0, 7); ctx.fill(); ctx.stroke();
  } else {
    const rest = {x:shoulder.x - 8*k, y:shoulder.y + 14*k}; limb(shoulder, rest, 7*k, jacket); ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(rest.x, rest.y, 3.8*k, 0, 7); ctx.fill(); ctx.lineWidth = 2.2; ctx.strokeStyle = INK; ctx.stroke(); }
  ctx.restore();
  AR._bow = {x:hd2.x, y:hd2.y, d, a, k, nock}; }

function drawArrowShape(tail, head, ang, k, alpha){
  const ctx = api.ctx, d = {x:Math.cos(ang), y:-Math.sin(ang)}, pe = {x:Math.sin(ang), y:Math.cos(ang)};
  ctx.save(); ctx.globalAlpha = alpha == null ? 1 : alpha; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const ax = head.x - tail.x, ay = head.y - tail.y, len = Math.hypot(ax, ay) || 1, ux = ax/len, uy = ay/len, vx = -uy, vy = ux;
  ctx.strokeStyle = INK; ctx.lineWidth = 4.4; ctx.beginPath(); ctx.moveTo(tail.x, tail.y); ctx.lineTo(head.x, head.y); ctx.stroke(); ctx.strokeStyle = '#f5d9a0'; ctx.lineWidth = 2.2; ctx.stroke();
  // fletching: three vanes, two red and one white
  [['#e2574c', 1], ['#fff', -1], ['#e2574c', 0]].forEach(([col, s], i) => { const bx = tail.x + ux*(5 + i*4.4)*k*1.0, by = tail.y + uy*(5 + i*4.4)*k;
    ctx.fillStyle = col; ctx.strokeStyle = INK; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(tail.x + ux*i*3.2*k, tail.y + uy*i*3.2*k); ctx.lineTo(bx + ux*5*k + vx*4.2*k*(s || 1), by + uy*5*k + vy*4.2*k*(s || 1)); ctx.lineTo(bx + ux*6.5*k, by + uy*6.5*k); ctx.closePath(); ctx.fill(); ctx.stroke(); });
  // steel head
  ctx.fillStyle = '#cfd8e6'; ctx.beginPath(); ctx.moveTo(head.x + ux*7*k, head.y + uy*7*k); ctx.lineTo(head.x - ux*1.5*k + vx*3.6*k, head.y - uy*1.5*k + vy*3.6*k); ctx.lineTo(head.x - ux*1.5*k - vx*3.6*k, head.y - uy*1.5*k - vy*3.6*k); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore(); }

/* ================================================================ per frame */
function arFrame(dt, now, live){
  const g = geo(), ctx = api.ctx; if(!ctx || !g.W) return; AR.t += dt;
  if(AR.vibAmp > 0){ AR.vib += dt; if(AR.vib > .5) AR.vibAmp = 0; }
  AR.recoil = Math.max(0, AR.recoil - dt*3.2); AR.flash = Math.max(0, AR.flash - dt*1.4); AR.shake = Math.max(0, AR.shake - dt*18);
  if(A.phase === 'run' && live){
    control(dt, now, true);
    stepArrow(dt);
    const T = AR.target;
    if(T && !T.gone && T.mv){ T.y = T.y0 + Math.sin(AR.t*T.mv.w + T.mv.ph)*T.mv.amp; }
    if(T && T.gone && AR.nextAt && AR.t >= AR.nextAt && !AR.over){ AR.nextAt = 0; newTarget(); }
    if(AR.over && AR.t >= AR.overAt){ AR.over = false; AUD.drawOff(); api.gameOver(AR.score, AR.hits ? `${fa(AR.hits)} تیر به هدف زدی!` : 'دفعهٔ بعد بهتر می‌شود!'); }
  } else { control(dt, now, false); if(A.phase === 'over') AUD.drawOff(); }
  /* —— drawing —— */
  ctx.save(); const sh = AR.shake; if(sh > .2) ctx.translate((Math.random() - .5)*sh, (Math.random() - .5)*sh);
  ctx.drawImage(scene(g), 0, 0, g.W, g.Hh);
  clouds(g, AR.t); birds(g, AR.t);
  drawTarget(g, AR.target, performance.now());
  drawArcher(g, AR.t);
  // aim guide while the string is drawn
  if(AR.state === 'draw' && A.phase === 'run'){
    const pw = clamp(AR.pull, 0, 1);
    if(pw >= POWER_MIN){ const pv = preview(pw, AR.ang); pv.pts.forEach((p, i) => { const f = 1 - p.t/pv.tmax; ctx.globalAlpha = clamp(f*1.2, .12, .9); ctx.fillStyle = '#fff'; ctx.strokeStyle = INK; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(p.x, p.y, 3.4 - i*.12, 0, 7); ctx.fill(); ctx.stroke(); }); ctx.globalAlpha = 1; }
    // power ring beside the bow: fills as the string is drawn, turns gold at a full draw
    const bw = AR._bow; if(bw){ const cx = g.x0 - 6, cy = g.G - g.ah*1.28, r = 14; ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(43,33,64,.35)'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
      ctx.strokeStyle = pw > .78 ? '#ffd93d' : pw >= POWER_MIN ? '#7cffa4' : '#fff'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI/2, -Math.PI/2 + Math.PI*2*pw); ctx.stroke(); } }
  // arrows stuck in boards and grass
  const nowP = performance.now();
  AR.stuck.forEach(s => { const age = (nowP - s.born)/1000; const al = s.tgt ? (s.tgt.gone ? clamp(1 - (s.tgt.fall - .5)/.6, 0, 1) : 1) : clamp(1 - (age - 3)/1.5, 0, 1); if(al <= 0) return;
    const k = g.ah/100; const sy = s.tgt ? s.tgt.y + s.dy : s.y; const bx = s.x, off = s.tgt && s.tgt.gone ? Math.min(1, s.tgt.fall*1.2)*g.u*.04 : 0; const a = s.ground ? Math.PI*1.06 - s.a*.3 : Math.PI*.98;
    const len = 20*k; if(!drawArrowImg({x:bx + 6*k, y:sy + off}, s.ground ? -(Math.PI/2 - .5) + 0 : -.04 + 0, g.ah*.5, al)) drawArrowShape({x:bx - Math.cos(a)*len*-1, y:sy + off - Math.sin(a)*len*0 - 0}, {x:bx, y:sy + off}, Math.PI - .05, k*.8, al); });
  // the arrow in flight, with a soft streak
  const ar = AR.arrow; if(ar){
    ar.tr.forEach((p, i) => { ctx.globalAlpha = i/ar.tr.length*.45; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.2 + i*.12, 0, 7); ctx.fill(); }); ctx.globalAlpha = 1;
    const k = g.ah/100, len = 30*k, d = {x:Math.cos(ar.ang), y:-Math.sin(ar.ang)}; if(!drawArrowImg({x:ar.x, y:ar.y}, ar.ang, g.ah*.5, 1)) drawArrowShape({x:ar.x - d.x*len, y:ar.y - d.y*len}, {x:ar.x, y:ar.y}, ar.ang, k, 1);
    if(ar.t < .4 && Math.random() < .5) burst(ar.x - d.x*len, ar.y - d.y*len, 1, ['#fff'], 40, .3); }
  drawFX(dt);
  // hint banner
  AR.hintT -= dt;
  ctx.restore();
  /* —— HUD —— */
  const w = AR.wind, wTxt = w === 0 ? '' : `<span style="background:#dff3ff">${w > 0 ? '→' : '←'} باد ${fa(Math.round(Math.abs(w)*100))}</span>`;
  const hint = A.phase !== 'run' ? '' : AR.hintT > 0 ? AR.hint : AR.state === 'draw' ? (AR.pull > .78 ? 'کامل کشیدی! رهایش کن 🎯' : 'بکش، بالا و پایین ببر تا نشانه بگیری') : AR.over ? '' : 'روبه‌روی گوشی: یک دست صاف کنارِ بدن، با دستِ دیگر زه را تا شانه بکش';
  hud(`<span>🎯 ${fa(AR.score)} <b>امتیاز</b></span>${AR.combo >= 3 ? `<span style="background:#ffe1b8">🔥 ×${fa(AR.combo)}</span>` : ''}${wTxt}<span class="hearts">${[0,1,2].map(i => `<img src="img/obj/heart.webp" alt=""${i < AR.hearts ? '' : ' class="lost"'}>`).join('')}</span>${best('arash', A.who) ? `<span><img src="img/obj/trophy.webp" alt=""> ${fa(best('arash', A.who))}</span>` : ''}`,
    (hint ? `<span>${hint}</span>` : '') + (A.phase === 'run' && !AR.over ? api.recChip('arash', AR.score, 'امتیاز', 10) || `<span class="goal">🎯 ${fa(8 - AR.hits % 8)} تیر تا ${DAY[(dayOf() + 1) % DAY.length].n}</span>` : '')); }

/* the card icon: a bow with an arrow, the target, and the same turquoise or saffron hero */
function arIcon(){
  const girl = H.kid() !== 'boy', jc = girl ? '#16a394' : '#f0a21a';
  return `<svg viewBox="0 0 96 96" aria-hidden="true"><defs><linearGradient id="sky-ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fb8f5"/><stop offset="1" stop-color="#fff0cf"/></linearGradient><clipPath id="cl-ar"><rect width="96" height="96" rx="20"/></clipPath></defs>
    <g clip-path="url(#cl-ar)"><rect width="96" height="96" fill="url(#sky-ar)"/><circle cx="78" cy="18" r="8" fill="#ffe27a" stroke="#2b2140" stroke-width="2"/>
    <path d="M26 66 L50 30 L58 38 L66 28 L96 66Z" fill="#8aa0c9" stroke="#2b2140" stroke-width="2" stroke-linejoin="round"/><path d="M50 30 L46 38 L52 36 L58 38 L66 28 L62 36Z" fill="#fff"/>
    <rect y="66" width="96" height="30" fill="#5fb85a"/><path d="M0 66H96" stroke="#2b2140" stroke-width="2.5"/>
    <rect x="68" y="46" width="4" height="22" fill="#9b6a3c" stroke="#2b2140" stroke-width="1.6"/><circle cx="70" cy="42" r="12" fill="#e0b46a" stroke="#2b2140" stroke-width="2"/><circle cx="70" cy="42" r="9.5" fill="#fff6e3" stroke="#2b2140" stroke-width="1.6"/><circle cx="70" cy="42" r="7" fill="#2d9ad6" stroke="#2b2140" stroke-width="1.4"/><circle cx="70" cy="42" r="4.4" fill="#e2574c" stroke="#2b2140" stroke-width="1.4"/><circle cx="70" cy="42" r="1.9" fill="#ffd93d"/>
    <circle cx="19" cy="48" r="6.4" fill="#f3c19a" stroke="#2b2140" stroke-width="2"/><path d="M12 47 Q13 38 21 40 Q27 43 25 50 Q22 46 18 48Z" fill="${jc}" stroke="#2b2140" stroke-width="2"/>
    <path d="M13 56 H28 L30 80 H11Z" fill="${jc}" stroke="#2b2140" stroke-width="2.4" stroke-linejoin="round"/><path d="M14 80 V90 M27 80 V90" stroke="#37426f" stroke-width="6" stroke-linecap="round"/>
    <path d="M26 62 L46 56" stroke="#2b2140" stroke-width="7" stroke-linecap="round"/><path d="M26 62 L46 56" stroke="${jc}" stroke-width="4" stroke-linecap="round"/>
    <path d="M46 40 Q56 56 46 76" fill="none" stroke="#2b2140" stroke-width="6" stroke-linecap="round"/><path d="M46 40 Q56 56 46 76" fill="none" stroke="#a9672e" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M46 40 L30 58 L46 76" fill="none" stroke="#fff8e0" stroke-width="1.5"/><path d="M30 58 L62 52" stroke="#2b2140" stroke-width="3.4" stroke-linecap="round"/><path d="M30 58 L62 52" stroke="#f5d9a0" stroke-width="1.6" stroke-linecap="round"/><path d="M62 52 L56 48.5 M62 52 L56 55.5 L66 52Z" fill="#cfd8e6" stroke="#2b2140" stroke-width="1.4"/>
    </g><rect x="1.5" y="1.5" width="93" height="93" rx="20" fill="none" stroke="#2b2140" stroke-width="3"/></svg>`; }

A_.register('arash', {
  get name(){ const n = NAME(); return `${n}${/[اوآ]$/.test(n) ? 'ی' : 'ِ'} کمانگیر`; }, short:'کمان', unit:'امتیاز', music:'bow', icon:arIcon,
  how:'روبه‌روی گوشی بایست. یک دستت را صاف کنارِ بدنت دراز کن؛ این کمان است. با دستِ دیگر زه را تا شانه‌ات بکش و نگه دار. دستِ کمان را بالا و پایین ببر تا نشانه بگیری، بعد دستِ زه را سریع به طرفِ کمان باز کن تا تیر برود!',
  howSenior:'یک دست را دراز کنید و با دستِ دیگر آرام زه را بکشید. بازو را کمی بالا و پایین ببرید تا نشانه بگیرید و بعد رها کنید.',
  reset:arReset, frame:arFrame });
/* for the tests: where would an arrow with this draw and angle cross the target's plane? */
function yAtTarget(power, ang){ const g = geo(), T = AR.target; let v = VMAX*(.30 + .70*power)*g.u, a = ang*Math.PI/180, L0 = launch(g), x = L0.x, y = L0.y, vx = Math.cos(a)*v, vy = -Math.sin(a)*v;
  for(let i = 0; i < 4000; i++){ const ox = x, oy = y; vy += G_ACC*g.u*.002; vx += AR.wind*g.u*.002; x += vx*.002; y += vy*.002; if(x >= T.x) return oy + (y - oy)*(T.x - ox)/(x - ox || 1); if(y > g.G) return null; } return null; }
window.HKA_AR = {AR, AUD, geo, readBody, preview, yAtTarget, fire:(p, a) => fire(p, a, performance.now())};
})();
