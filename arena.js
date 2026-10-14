/* هفت‌خوانِ حرکت — میدان: بازی‌های بی‌پایان با رکورد.
   دو بازی، هر دو با تمامِ بدن و هر دو به اندازهٔ بدنِ خودِ بازیکن:
   - تپه‌نوردی: درجا دویدن گاز است، کج شدنِ بدن تعادلِ ماشین در هوا. رکورد: متر.
   - دیوارِ شکل‌ها: دیوارهایی با سوراخی به شکلِ یک حالتِ بدن، ساخته از اندازه‌های خودِ بازیکن. رکورد: دیوار.
   پیش از هر بازی یوزی دو ثانیه بدن را اندازه می‌گیرد (پهنای شانه، طولِ تنه و دست و پا)؛ هر آستانه‌ای نسبت به همان است،
   پس برای کودکِ کوچک و بزرگسالِ بلند یکسان کار می‌کند. ایستادنِ بی‌حرکت در هیچ‌کدام امتیازی ندارد. */
(function(){
const H = window.HK, X = window.HKX; if(!H || !X) return;
const {fa, $, $$, sfx, voice, C} = H;
const S = () => H.state;
const SENIOR = k => k === 'grandma' || k === 'grandpa';
const GAMES = {
  hill: {name:'تپه‌نوردی یوزی', unit:'متر', how:'درجا بدو تا ماشین برود؛ هر چه تندتر، تندتر! روی تپه که پرید، بدنت را کج کن تا صاف فرود بیاید.',
         howSenior:'درجا قدم بزن تا ماشین برود؛ روی تپه که پرید، بدنت را آرام کج کن تا صاف فرود بیاید.'},
  wall: {name:'دیوارِ شکل‌ها', unit:'دیوار', how:'دیوار با سوراخی به شکلِ یک حالت می‌آید. تا برسد، همان شکل را با بدنت بساز تا از آن رد شوی!',
         howSenior:'دیوار با سوراخی به شکلِ یک حالت می‌آید؛ آرام همان شکل را بساز. حالت‌های پرشی و نشستنِ عمیق برای شما نیست.'}
};
const A = {game:'hill', who:'kid', raf:0, phase:'off'};
const rec = () => { const s = S(); s.arena = s.arena || {}; s.arena.hill = s.arena.hill || {}; s.arena.wall = s.arena.wall || {}; return s.arena; };
const best = (g, who) => rec()[g][who] || 0;

/* ================================================================ the arena screen */
function icon(g){
  const O = n => `img/obj/${n}.webp`, frame = `<rect x="1.5" y="1.5" width="93" height="93" rx="20" fill="none" stroke="#2b2140" stroke-width="3"/>`;
  const sky = `<linearGradient id="sky-${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ec0ff"/><stop offset="1" stop-color="#d6f1ff"/></linearGradient><clipPath id="cl-${g}"><rect width="96" height="96" rx="20"/></clipPath>`;
  if(g === 'hill'){
    // the jeep sits on its wheels exactly as in the game: arches at 86 and 248 of the 334-wide drawing
    const k = 52/334, wr = 6.8, car = `<image href="${O('wheel')}" x="${86*k - wr}" y="${192*k - wr}" width="${2*wr}" height="${2*wr}"/><image href="${O('wheel')}" x="${248*k - wr}" y="${192*k - wr}" width="${2*wr}" height="${2*wr}"/><image href="${O('jeep')}" width="52" height="${206*k}"/>`;
    return `<svg viewBox="0 0 96 96" aria-hidden="true"><defs>${sky}</defs><g clip-path="url(#cl-${g})"><rect width="96" height="96" fill="url(#sky-${g})"/>
      <circle cx="80" cy="16" r="8" fill="#ffd93d" stroke="#2b2140" stroke-width="2"/><path d="M0 52 Q20 36 40 46 T96 40 V96 H0Z" fill="#9fdc7c"/>
      <image href="${O('pine')}" x="66" y="22" width="18" height="25"/><image href="${O('tree')}" x="4" y="24" width="18" height="21"/>
      <path d="M-2 78 Q26 54 54 66 T98 58 V98 H-2Z" fill="#a96a33" stroke="#2b2140" stroke-width="2.5"/><path d="M-2 78 Q26 54 54 66 T98 58" fill="none" stroke="#4fae3a" stroke-width="6"/>
      <image href="${O('coin')}" x="72" y="38" width="13" height="13"/><image href="${O('jerrycan')}" x="80" y="45" width="10" height="11"/>
      <g transform="translate(14 39) rotate(-14 26 16)">${car}</g></g>${frame}</svg>`;
  }
  // a brick wall with a star-shaped hole, and the child showing through it
  const pose = 'M48 30 L48 58 M48 38 L34 24 M48 38 L62 24 M48 58 L38 80 M48 58 L58 80';
  return `<svg viewBox="0 0 96 96" aria-hidden="true"><defs>${sky}<pattern id="br-${g}" width="49" height="25.5" patternUnits="userSpaceOnUse"><image href="${O('brick-tile')}" width="49" height="25.5"/></pattern>
    <mask id="hole-${g}"><rect width="96" height="96" fill="#000"/><g stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="${pose}"/></g><circle cx="48" cy="21" r="8" fill="#fff"/></mask></defs>
    <g clip-path="url(#cl-${g})"><rect width="96" height="96" fill="url(#br-${g})"/><rect y="0" width="96" height="6" fill="#b9b2c8"/>
    <g stroke="#4a2414" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="${pose}"/></g><circle cx="48" cy="21" r="10.5" fill="#4a2414"/>
    <g mask="url(#hole-${g})"><rect width="96" height="96" fill="url(#sky-${g})"/><image href="img/${H.kid()}-cheer.webp" x="22" y="8" width="52" height="80"/></g></g>${frame}</svg>`;
}
function renderArena(){
  ['jeep', 'wheel', 'coin', 'jerrycan', 'flag', 'tree', 'pine', 'rock', 'brick-tile', 'ribbon'].forEach(n => H.objImg(n));   // ready before the first frame
  H.syncPlayers(); if(!H.PLAYERS.some(p => p.k === A.who)) A.who = 'kid';
  const P = H.PLAYERS, who = P.find(p => p.k === A.who), senior = SENIOR(A.who);
  const card = g => `<button class="ar-card" data-game="${g}">${icon(g)}<span><b>${GAMES[g].name}</b><small>${senior ? GAMES[g].howSenior : GAMES[g].how}</small>
    <span class="rec">رکوردِ ${who.n}: ${best(g, A.who) ? fa(best(g, A.who)) + ' ' + GAMES[g].unit : 'هنوز نه'}</span></span></button>`;
  const board = P.length > 1 ? `<div class="ar-board"><h4>تابلوی رکوردهای خانواده</h4><table><tr><th></th><th>${GAMES.hill.name}</th><th>${GAMES.wall.name}</th></tr>${P.map(p => `<tr><td>${p.n}</td><td>${best('hill', p.k) ? fa(best('hill', p.k)) + ' متر' : '–'}</td><td>${best('wall', p.k) ? fa(best('wall', p.k)) + ' دیوار' : '–'}</td></tr>`).join('')}</table></div>` : '';
  $('#arBody').innerHTML = `<div class="who" style="margin:0 0 12px"><b>چه کسی بازی می‌کند؟</b><div class="tms">${P.map(p => `<button class="tm ${p.k===A.who?'on':''}" data-who="${p.k}" aria-pressed="${p.k===A.who}"><span class="tav"><img src="img/${p.img}.webp" alt="" style="${p.kid?'transform:scale(2.1);transform-origin:50% 8%':''}"></span><small>${p.n}</small></button>`).join('')}</div></div>
    ${card('hill')}${card('wall')}${board}
    <p class="free-note" style="text-align:center">گوشی را ایستاده به چیزی تکیه بده و دو سه قدم عقب برو. جای بازی را خلوت کن.</p>`;
  $$('#arBody [data-who]').forEach(b => b.addEventListener('click', () => { A.who = b.dataset.who; sfx('click'); renderArena(); }));
  $$('#arBody [data-game]').forEach(b => b.addEventListener('click', () => { A.game = b.dataset.game; sfx('start'); H.go('play'); }));
}

/* ================================================================ the body, measured */
const B = {b:null, t:0, lm:null, steps:[], det:null, cal:null, calT:0, calAcc:null};
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
function onFrame(ctx, lm, cv){
  const b = X.bodyOf(lm, cv.width, cv.height), now = performance.now();
  B.lm = lm; B.cv = cv; if(!b) return;
  B.b = b; B.t = now; X.updateBase(b, now);
  if(A.phase === 'run' && A.game === 'hill' && B.det && B.det.step(b, now)){ B.steps.push(now); }
  if(A.phase === 'cal') calibrate(b, lm, now);
}
/* two still seconds standing straight: the player's own proportions, which every threshold and the wall's
   hole are built from */
function calibrate(b, lm, now){
  const fit = H.fitOf(lm), ok = fit === 'ok' && X.PRED.stand(b) && b.legs;
  if(!ok){ B.calT = 0; B.calAcc = null; return; }
  if(!B.calT){ B.calT = now; B.calAcc = []; }
  B.calAcc.push(b);
  if(now - B.calT > 1800){
    const avg = f => B.calAcc.reduce((s, x) => s + f(x), 0)/B.calAcc.length;
    const c = {sw:avg(x => x.sw), torso:avg(x => x.torso), hipW:avg(x => dist(x.hipL, x.hipR)),
      ua:avg(x => (dist(x.shL, x.eL) + dist(x.shR, x.eR))/2), fa:avg(x => (dist(x.eL, x.wL) + dist(x.eR, x.wR))/2),
      th:avg(x => (dist(x.hipL, x.kL) + dist(x.hipR, x.kR))/2), sh:avg(x => (dist(x.kL, x.aL) + dist(x.kR, x.aR))/2),
      hipY:avg(x => x.hip.y), leg:avg(x => x.leg), head:avg(x => x.sw*.42)};
    c.height = c.th + c.sh + c.torso + c.head*2.6;
    B.cal = c; A.phase = 'count'; A.countT = now; sfx('done');
  }
}
/* screen-side lean: positive toward the right of the screen (the picture is a mirror) */
const leanOf = b => (b.hip.x - b.sh.x)/b.torso;

/* ================================================================ the play screen */
const cv = () => $('#plCanvas');
let ctx = null, W = 0, Hh = 0, DPR = 1;
function size(){ const c = cv(), r = c.getBoundingClientRect(); DPR = Math.min(2, window.devicePixelRatio || 1);
  W = r.width; Hh = r.height; c.width = Math.round(W*DPR); c.height = Math.round(Hh*DPR); ctx = c.getContext('2d'); ctx.setTransform(DPR, 0, 0, DPR, 0, 0); }
function msg(html){ const m = $('#plMsg'); if(!html){ m.hidden = true; return; } m.innerHTML = html; m.hidden = false; }
function hud(html, bot=''){ const h = $('#plHud'), b = $('#plBot'); if(h.innerHTML !== html) h.innerHTML = html; if(b.innerHTML !== bot) b.innerHTML = bot; }

async function startPlay(){
  size(); A.phase = 'cal'; B.cal = null; B.calT = 0; B.steps = []; B.b = null; X.resetBase();
  B.det = X.detector(SENIOR(A.who) ? 'walk' : 'run', {thr: SENIOR(A.who) ? .05 : .085});   // running in place, not knees-up sprinting
  const g = GAMES[A.game];
  msg(`<h3>${g.name}</h3><p>${SENIOR(A.who) ? g.howSenior : g.how}</p><p style="color:var(--ink-soft)">اول صاف بایست تا یوزی اندازه‌ات را بگیرد…</p>`);
  hud('');
  const CAM = H.CAM; CAM.onFrame = onFrame; CAM.hint = null; CAM.chipOn = null; CAM.count = null; CAM.headroom = false;
  const ok = await H.camStart($('#plCam'), {solo:true});
  if(!ok){ msg(`<h3>دوربین در دسترس نیست</h3><p>این بازی‌ها فقط با دوربین بازی می‌شوند، تا یوزی ببیند واقعاً حرکت کردی.</p><div class="row"><button class="cta gold" data-go="arena">برگشت</button></div>`); A.phase = 'off'; return; }
  if(A.game === 'hill') hillReset(); else wallReset();
  cancelAnimationFrame(A.raf); A.last = performance.now(); A.raf = requestAnimationFrame(tick);
}
/* each game has its tune (approved ones), and the tune follows the action: faster as the jeep speeds up or
   the walls come quicker. It steps back while the game waits for the player. */
const MUS = {hill:'galop', wall:'hop'};
function musicOn(){ if(H.muted || !window.HKMusic) return; const c = H.ac(); if(c && HKMusic.current() !== MUS[A.game]) HKMusic.play(MUS[A.game], {ctx:c, vol:.42}); }
function musicOff(){ if(window.HKMusic && Object.values(MUS).includes(HKMusic.current())) HKMusic.stop(); }
function stopPlay(){ musicOff(); H.ENGINE.stop(); cancelAnimationFrame(A.raf); A.raf = 0; A.phase = 'off'; const CAM = H.CAM; CAM.onFrame = null; msg(''); }
function tick(now){
  const dt = Math.min(.05, (now - A.last)/1000); A.last = now;
  if(cv().clientWidth !== W || cv().clientHeight !== Hh) size();
  const seen = B.b && now - B.t < 900;
  if(A.phase === 'count'){
    const left = 3 - Math.floor((now - A.countT)/1000);
    if(left !== A.lastLeft){ A.lastLeft = left; if(left > 0) sfx('tick'); }
    msg(left > 0 ? `<h3 style="font-size:64px">${fa(left)}</h3><p>آماده!</p>` : '');
    if(left <= 0){ A.phase = 'run'; A.runT = now; sfx('start'); musicOn(); pop(W/2, Hh*.4, 'برو!', '#ffd93d', 64); }
  }
  if(A.phase === 'run' && !seen){ if(!A.paused && window.HKMusic) HKMusic.duck(true); A.paused = true; msg('<h3>یوزی تو را نمی‌بیند</h3><p>جلوی گوشی بایست؛ بازی منتظرت است.</p>'); }
  else if(A.phase === 'run' && A.paused){ A.paused = false; msg(''); if(window.HKMusic) HKMusic.duck(false); }
  if(A.game === 'hill') hillFrame(dt, now, A.phase === 'run' && !A.paused); else wallFrame(dt, now, A.phase === 'run' && !A.paused);
  if(A.phase !== 'off') A.raf = requestAnimationFrame(tick);
}
function gameOver(score, why){
  H.ENGINE.stop(); musicOff(); A.phase = 'over'; const g = GAMES[A.game], prev = best(A.game, A.who), isRec = score > prev;
  if(isRec){ rec()[A.game][A.who] = score; H.save(); }
  sfx(isRec ? 'fanfare' : 'soft', isRec); if(isRec) H.voiceLater('record', 600);
  const who = H.PLAYERS.find(p => p.k === A.who) || {n:''};
  msg(`${isRec ? '<img src="img/obj/medal.webp" alt="" style="height:84px;display:block;margin:0 auto 4px">' : ''}<h3>${why}</h3><p style="font-size:22px"><b>${fa(score)} ${g.unit}</b>${isRec ? `<br>رکوردِ تازهٔ ${who.n}! 🎉` : prev ? `<br>رکوردِ ${who.n}: ${fa(prev)} ${g.unit}` : ''}</p>
    <div class="row"><button class="cta gold" id="plAgain">دوباره</button><button class="ghost" data-go="arena">برگشت</button></div>`);
  $('#plAgain').addEventListener('click', () => { sfx('start'); if(A.game === 'hill') hillReset(); else wallReset(); msg(''); A.phase = 'count'; A.countT = performance.now(); A.lastLeft = null; });
}

/* ================================================================ game 1: hill climb
   Gas is running in place: the step rate over the last two seconds. Uphill, gravity pulls back, so a steep
   hill needs fast running or momentum. Over a crest the jeep leaves the ground; in the air the player's
   side lean turns it, and a landing more than ~60° off the slope rolls it over. Fuel runs down; cans keep
   the run going. Units: metres and seconds. */
const HL = {};
/* hills start gentle and grow slowly; the steepest stays climbable at full gas */
function terrain(x){ const amp = 1.2 + Math.min(4.2, Math.max(0, x)/220);
  return amp*(.55*Math.sin(x/9) + .3*Math.sin(x/4.3 + 1.3) + .25*Math.sin(x/17 + 2.1)) + .4*Math.sin(x/37); }
const slope = x => (terrain(x + .05) - terrain(x - .05))/.1;
const curv = x => (terrain(x + .1) - 2*terrain(x) + terrain(x - .1))/.01;
function hillReset(){
  Object.assign(HL, {camY:null, x:2, v:0, y:terrain(2), vy:0, vx:0, phi:Math.atan(slope(2)), air:false, fuel:100, coins:0, far:2, emptyT:0,
    cans:[], coinsAt:[], next:30, dead:false, gas:0, airT:0, shake:0, flagAt:50, lowBeep:0, turbo:false, fastT:0, combo:0, coinT:0, flew:false,
    best:best('hill', A.who), recDone:false});
  for(let k = 0; k < 10; k++) HL.cans.push(60 + k*120 + Math.random()*30);
  for(let x = 12; x < 2000; x += 9 + Math.random()*7) HL.coinsAt.push({x, got:false});
  B.steps = []; FX.length = 0;
}
/* effects shared by both games: particles in screen space, and short texts that float up */
const FX = [];
function burst(x, y, n, cols, sp = 260, life = .9, kind = 'dot'){
  for(let i = 0; i < n; i++){ const a = Math.random()*Math.PI*2, v = sp*(.4 + Math.random()*.6);
    FX.push({x, y, vx:Math.cos(a)*v, vy:Math.sin(a)*v - sp*.4, g:sp*1.6, life, max:life, col:cols[i % cols.length], kind, r:3 + Math.random()*4, rot:Math.random()*6}); } }
function pop(x, y, text, col = '#fff', size = 30){
  // texts that would land on top of one another stack upward instead, so each stays readable
  const near = FX.filter(f => f.kind === 'text' && Math.abs(f.x - x) < 140 && Math.abs(f.y - y) < 50).length; y -= near*(size + 8);
  FX.push({x, y, vx:0, vy:-70, g:0, life:1.1, max:1.1, text, col, size, kind:'text'}); }
function drawFX(dt){
  for(let i = FX.length - 1; i >= 0; i--){ const f = FX[i]; f.life -= dt; if(f.life <= 0){ FX.splice(i, 1); continue; }
    f.vy += f.g*dt; f.x += f.vx*dt; f.y += f.vy*dt; const a = Math.min(1, f.life/f.max*1.6);
    ctx.save(); ctx.globalAlpha = a;
    if(f.kind === 'text'){ ctx.font = `900 ${f.size}px Vazirmatn, sans-serif`; ctx.textAlign = 'center'; ctx.direction = /^[+×]/.test(f.text) ? 'ltr' : 'rtl'; ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.fillStyle = f.col;
      const sc = 1 + .3*Math.max(0, (f.life - f.max + .15)/.15); ctx.translate(f.x, f.y); ctx.scale(sc, sc); ctx.strokeText(f.text, 0, 0); ctx.fillText(f.text, 0, 0); }
    else if(f.kind === 'brick'){ ctx.translate(f.x, f.y); ctx.rotate(f.rot += dt*6); ctx.fillStyle = f.col; ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.fillRect(-f.r*2, -f.r, f.r*4, f.r*2); ctx.strokeRect(-f.r*2, -f.r, f.r*4, f.r*2); }
    else if(f.kind === 'star'){ ctx.translate(f.x, f.y); ctx.rotate(f.rot += dt*4); ctx.fillStyle = f.col; ctx.beginPath();
      for(let k = 0; k < 10; k++){ const r = k % 2 ? f.r*.45 : f.r*1.3, an = k*Math.PI/5; ctx.lineTo(Math.cos(an)*r, Math.sin(an)*r); } ctx.closePath(); ctx.fill(); }
    else { ctx.fillStyle = f.col; ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 7); ctx.fill(); }
    ctx.restore(); }
}
const CONF = ['#ffc93c', '#e2574c', '#3b82c4', '#4fb35a', '#a35bc4', '#fff'];
function hillFrame(dt, now, live){
  const senior = SENIOR(A.who);
  /* gas = running in place. The step rate over the last 1.4 s sets the target; the revs climb to it fast and
     fall slowly, so a stride or two of hesitation does not stall the jeep. Full gas at ~1.9 steps a second
     (about 1.4 for grandparents walking). */
  B.steps = B.steps.filter(t => now - t < 1400);
  const cadence = B.steps.length/1.4;
  const target = live && HL.fuel > 0 ? Math.max(0, Math.min(1, (cadence - (senior ? .25 : .4))/(senior ? 1.15 : 1.7))) : 0;
  HL.gas += (target - HL.gas)*Math.min(1, dt*(target > HL.gas ? 7 : 1.8));
  const gas = HL.gas < .02 ? 0 : HL.gas;
  /* turbo: a real sprint (about 2.8 steps a second for over a second) unlocks more power and a higher top
     speed, with a flame from the exhaust. It is the exciting reward for the hardest exercise in the game. */
  const fast = live && cadence >= (senior ? 2.0 : 2.8);
  HL.fastT = fast ? (HL.fastT || now) : 0;
  if(!HL.turbo && HL.fastT && now - HL.fastT > 1100 && HL.fuel > 0){ HL.turbo = true; sfx('turbo'); pop(W/2, Hh*.3, 'توربو! 🔥', '#ff9b3d', 46); HL.shake = 6; }
  if(HL.turbo && (cadence < (senior ? 1.6 : 2.3) || !live)) HL.turbo = false;
  const boost = HL.turbo ? 1.45 : 1, top = HL.turbo ? 22 : 18;
  if(window.HKMusic && A.phase === 'run') HKMusic.rate(.85 + .3*Math.min(1, Math.abs(HL.v)/16) + (HL.turbo ? .1 : 0));
  const lean = live && B.b ? Math.max(-1, Math.min(1, leanOf(B.b)/.22)) : 0;
  if(A.phase === 'run' && !HL.dead){
    if(live) H.ENGINE.start(); else H.ENGINE.stop();
    H.ENGINE.set(gas, HL.v);
    const G = 9.8, steps = 3, h = dt/steps;
    for(let i = 0; i < steps; i++){
      if(!HL.air){
        const th = Math.atan(slope(HL.x)), engine = gas*boost*(senior ? 8 : 9.5)*(1 + .6*Math.max(0, Math.sin(th)));   // more pull uphill, as low gear
        let a = engine - .75*G*Math.sin(th) - .1*HL.v - (Math.abs(HL.v) > .05 ? .35*Math.sign(HL.v) : 0);
        if(HL.v < 0) a += 4;                                                  // the brakes hold it: it barely rolls back
        HL.v = Math.max(-1.5, Math.min(top, HL.v + a*h));                   // top ~65 km/h, ~80 with turbo
        if(gas === 0 && Math.abs(HL.v) < .15 && Math.abs(Math.sin(th)) < .25) HL.v = 0;
        HL.x += HL.v*Math.cos(th)*h; HL.y = terrain(HL.x); HL.phi += (th - HL.phi)*Math.min(1, 12*h);
        const k = -curv(HL.x)/Math.pow(1 + slope(HL.x)**2, 1.5);           // convex crest
        if(HL.v > 5 && k*HL.v*HL.v > G*Math.cos(th)*1.05){ HL.air = true; HL.airT = now; HL.vx = HL.v*Math.cos(th); HL.vy = HL.v*Math.sin(th); sfx('air'); }
      } else {
        HL.vy -= G*h; HL.x += HL.vx*h; HL.y += HL.vy*h;
        if(!HL.flew && now - HL.airT > 750){ HL.flew = true; pop(W/2, Hh*.26, 'پرواز! ✈', '#fff', 40); }
        // the body's lean turns the jeep; it also settles a little toward the ground's angle by itself
        const want = Math.atan(slope(HL.x + HL.vx*.3));
        HL.phi += (-lean*(senior ? 1.8 : 2.4) + .2 + (want - HL.phi)*.9)*h;
        const ground = terrain(HL.x);
        if(HL.y <= ground){ const th = Math.atan(slope(HL.x)); let d = HL.phi - th; d = Math.atan2(Math.sin(d), Math.cos(d));
          HL.y = ground; HL.air = false; HL.flew = false; const hang = (now - HL.airT)/1000, fall = -HL.vy;
          if(Math.abs(d) > 1.3){ HL.dead = true; HL.shake = 18; H.ENGINE.stop(); sfx('crash'); vib([60, 40, 90]);
            const p = scr(HL.x, HL.y); burst(p.x, p.y - 20, 22, ['#c8352a', '#3d3550', '#a9a4b8', '#c48745'], 300, 1.2, 'brick');
            gameOver(Math.round(HL.far), 'ماشین وارونه شد!'); return; }
          HL.v = Math.min(18, Math.hypot(HL.vx, HL.vy)*Math.max(.5, Math.cos(d)))*(HL.vx >= 0 ? 1 : -1); HL.phi = th;
          const p = scr(HL.x, HL.y); sfx('land', fall > 6); HL.shake = Math.min(12, fall*1.2);
          burst(p.x, p.y, 10, ['rgba(190,150,110,.9)', 'rgba(160,120,80,.9)'], 160, .6);
          if(Math.abs(d) < .25 && hang > .5){ HL.coins += 2; sfx('flag'); pop(p.x, p.y - 90, 'فرودِ عالی! +۲', '#ffd93d', 26); burst(p.x, p.y - 60, 14, CONF, 260, 1, 'star'); } }
      }
    }
    HL.far = Math.max(HL.far, HL.x);
    HL.fuel = Math.max(0, HL.fuel - dt*(senior ? 2.2 : 3)*(gas > 0 ? 1 : .4));
    if(HL.fuel < 20 && HL.fuel > 0 && now - HL.lowBeep > 1800){ HL.lowBeep = now; tone2(); }
    HL.cans = HL.cans.filter(cx => { if(Math.abs(cx - HL.x) < 1.8 && Math.abs(terrain(cx) - HL.y) < 2.5){ HL.fuel = 100; sfx('fuel'); const p = scr(cx, terrain(cx) + 1);
      pop(p.x, p.y - 30, 'بنزین پُر شد!', '#7cf29c', 26); burst(p.x, p.y, 14, ['#7cf29c', '#fff', '#ffd93d'], 220, .8, 'star'); return false; } return true; });
    if(HL.cans.length < 6){ const last = Math.max(...HL.cans, HL.x); HL.cans.push(last + 110 + Math.random()*40); }
    HL.coinsAt.forEach(c => { if(!c.got && Math.abs(c.x - HL.x) < 1.4 && HL.y + 1.6 > terrain(c.x) + .5){ c.got = true; HL.coins++;
      HL.combo = now - HL.coinT < 1500 ? HL.combo + 1 : 1; HL.coinT = now; sfx('coin', HL.combo);      // a run of coins climbs in pitch
      const p = scr(c.x, terrain(c.x) + 1.35); burst(p.x, p.y, 8, ['#ffd93d', '#fff3a8', '#fff'], 180, .5, 'star');
      pop(p.x, p.y - 20, HL.combo >= 3 ? `×${fa(HL.combo)}` : '+۱', HL.combo >= 5 ? '#ff9b3d' : '#ffd93d', HL.combo >= 3 ? 30 : 24); } });
    if(HL.coinsAt.length && HL.coinsAt[HL.coinsAt.length - 1].x < HL.x + 200){ const lx = HL.coinsAt[HL.coinsAt.length - 1].x; for(let x = lx + 10; x < lx + 400; x += 9 + Math.random()*7) HL.coinsAt.push({x, got:false}); }
    if(HL.best > 20 && !HL.recDone && HL.far > HL.best){ HL.recDone = true; sfx('cheer'); sfx('fanfare', true); burst(W/2, Hh*.35, 40, CONF, 460, 1.6, 'star'); pop(W/2, Hh*.34, 'رکورد را شکستی! 🏆', '#ffd93d', 38); }
    if(HL.far >= HL.flagAt){ const p = scr(HL.flagAt, terrain(HL.flagAt)); sfx('flag'); if(HL.flagAt % 100 === 0) sfx('cheer'); burst(p.x, p.y - 60, 18, CONF, 280, 1.1, 'star'); pop(W/2, Hh*.32, `${fa(HL.flagAt)} متر!`, '#fff', 34); HL.flagAt += 50; }
    if(HL.fuel <= 0 && Math.abs(HL.v) < .3 && !HL.air){ HL.emptyT = HL.emptyT || now; if(now - HL.emptyT > 1500){ HL.dead = true; H.ENGINE.stop(); gameOver(Math.round(HL.far), 'بنزین تمام شد!'); return; } } else HL.emptyT = 0;
  }
  drawHill(gas, lean, cadence, dt);
}
const tone2 = () => sfx('tick');
const vib = p => { try{ navigator.vibrate && navigator.vibrate(p); }catch(e){} };                // the low-fuel warning: a soft tick every two seconds
/* world point -> screen point, with the same camera drawHill uses */
const scr = (x, y) => { const PPM = HL.PPM || 30; return {x:(x - HL.camX)*PPM, y:Hh*.66 - (y - HL.camY)*PPM}; };
/* ---------------------------------------------------------------- hill climb: the picture
   Everything is drawn in layers, back to front: sky and sun, clouds, far mountains and middle hills moving
   slower than the road (parallax), the road's soil and grass, flags, coins and fuel, the jeep and its dust. */
const hash = n => { const x = Math.sin(n*127.1 + 311.7)*43758.5453; return x - Math.floor(x); };
const INK = '#2b2140';
function rr(x, y, w, h, r){ ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function cloud(x, y, s){
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const blobs = [[0, 0, 26], [28, -10, 30], [58, 2, 24], [30, 10, 26]];
  ctx.fillStyle = '#fff'; ctx.strokeStyle = 'rgba(43,33,64,.55)'; ctx.lineWidth = 3/s;
  blobs.forEach(([bx, by, r]) => { ctx.beginPath(); ctx.arc(bx, by, r, 0, 7); ctx.stroke(); });
  blobs.forEach(([bx, by, r]) => { ctx.beginPath(); ctx.arc(bx, by, r, 0, 7); ctx.fill(); });
  ctx.fillStyle = 'rgba(160,200,235,.45)'; ctx.beginPath(); ctx.ellipse(30, 22, 52, 9, 0, 0, 7); ctx.fill();
  ctx.restore();
}
function mountains(camX, PPM){
  const off = camX*.06, yAt = px => { const wx = off + px/PPM; return Hh*.5 - Hh*.15*Math.pow(Math.abs(Math.sin(wx/9)), 2.2) - Hh*.035*Math.abs(Math.sin(wx/3.1 + 1.1)); };
  const g = ctx.createLinearGradient(0, Hh*.25, 0, Hh*.6); g.addColorStop(0, '#8fa9d8'); g.addColorStop(1, '#b9d3f0');
  ctx.beginPath(); ctx.moveTo(-10, Hh); for(let px = -10; px <= W + 10; px += 6) ctx.lineTo(px, yAt(px)); ctx.lineTo(W + 10, Hh); ctx.closePath();
  ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(43,33,64,.3)'; ctx.stroke();
  ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(255,255,255,.9)';                       // snow on what rises above the snow line
  ctx.beginPath(); ctx.moveTo(-10, 0); for(let px = -10; px <= W + 10; px += 6) ctx.lineTo(px, Hh*.5 - Hh*.12 + 6*Math.sin(px*.09)); ctx.lineTo(W + 10, 0); ctx.closePath(); ctx.fill(); ctx.restore();
}
function ridge(camX, PPM, par, base, amp1, f1, amp2, f2, fill, edge, trees){
  const off = camX*par; ctx.beginPath(); ctx.moveTo(-10, Hh);
  const yAt = px => { const wx = off + px/PPM; return base - amp1*Math.sin(wx/f1) - amp2*Math.sin(wx/f2 + 1.7); };
  for(let px = -10; px <= W + 10; px += 8) ctx.lineTo(px, yAt(px));
  ctx.lineTo(W + 10, Hh); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = edge; ctx.stroke();
  if(trees){ const step = 5; for(let wx = Math.floor(off/step)*step; wx < off + W/PPM + step; wx += step){ if(hash(wx) < .55) continue;
      const px = (wx - off)*PPM, y = yAt(px), h = 18 + hash(wx + 3)*14;
      ctx.fillStyle = '#7a5230'; ctx.fillRect(px - 2, y - h*.5, 4, h*.5);
      const tr = ART(hash(wx + 11) < .5 ? 'pine' : 'tree');
      if(tr){ const th = h*1.7, tw = th*tr.naturalWidth/tr.naturalHeight; ctx.drawImage(tr, px - tw/2, y - th + h*.12, tw, th); continue; }
      ctx.strokeStyle = INK; ctx.lineWidth = 2;
      if(hash(wx + 11) < .5){ ctx.fillStyle = '#2f8a3a'; ctx.beginPath(); ctx.moveTo(px, y - h*1.25); ctx.lineTo(px + h*.36, y - h*.35); ctx.lineTo(px - h*.36, y - h*.35); ctx.closePath(); ctx.fill(); ctx.stroke(); }  // pine
      else { ctx.fillStyle = hash(wx + 7) < .5 ? '#4fae3a' : '#3f9a35'; ctx.beginPath(); ctx.arc(px, y - h*.6, h*.42, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.arc(px - h*.14, y - h*.74, h*.15, 0, 7); ctx.fill(); } } }
}
function coin(x, y, r, t){
  const sq = Math.abs(Math.cos(t*3 + x*.01)); ctx.save(); ctx.translate(x, y); ctx.scale(.35 + .65*sq, 1);
  const art = ART('coin'); if(art){ ctx.drawImage(art, -r, -r, 2*r, 2*r); ctx.restore(); return; }
  const g = ctx.createRadialGradient(-r*.3, -r*.3, r*.1, 0, 0, r); g.addColorStop(0, '#fff3a8'); g.addColorStop(.5, '#ffc93c'); g.addColorStop(1, '#e09a12');
  ctx.fillStyle = g; ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = '#c47d0a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, r*.68, 0, 7); ctx.stroke();
  ctx.fillStyle = '#c47d0a'; ctx.beginPath(); for(let i = 0; i < 10; i++){ const a = -Math.PI/2 + i*Math.PI/5, rr2 = i % 2 ? r*.22 : r*.48; ctx.lineTo(Math.cos(a)*rr2, Math.sin(a)*rr2); } ctx.closePath(); ctx.fill();
  ctx.restore();
}
function fuelCan(x, y, u){
  const art = ART('jerrycan'); if(art){ const w = 1.05*u, h = w*art.naturalHeight/art.naturalWidth; ctx.drawImage(art, x - w/2, y - h, w, h); return; }
  ctx.save(); ctx.translate(x, y); ctx.lineJoin = 'round';
  const g = ctx.createLinearGradient(-.45*u, 0, .45*u, 0); g.addColorStop(0, '#ff7a6b'); g.addColorStop(1, '#c9372b');
  ctx.fillStyle = g; ctx.strokeStyle = INK; ctx.lineWidth = 3; rr(-.42*u, -1.25*u, .84*u, 1.2*u, .12*u); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#3d3550'; rr(-.3*u, -1.42*u, .32*u, .22*u, .06*u); ctx.fill(); ctx.stroke();               // handle
  ctx.fillStyle = '#ffc93c'; rr(.12*u, -1.48*u, .16*u, .26*u, .05*u); ctx.fill(); ctx.stroke();              // cap
  ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-.25*u, -.35*u); ctx.lineTo(.25*u, -1.0*u); ctx.moveTo(-.25*u, -1.0*u); ctx.lineTo(.25*u, -.35*u); ctx.stroke();
  ctx.restore();
}
const ART = n => { const im = H.objImg(n); return im.complete && im.naturalWidth ? im : null; };
function wheel(x, y, r, spin){
  const art = ART('wheel'); if(art){ ctx.save(); ctx.translate(x, y); ctx.rotate(spin); ctx.drawImage(art, -r, -r, 2*r, 2*r); ctx.restore(); return; }
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = '#2f2a3a'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.stroke();
  ctx.rotate(spin); ctx.strokeStyle = '#4a4458'; ctx.lineWidth = r*.16;
  for(let i = 0; i < 10; i++){ const a = i*Math.PI/5; ctx.beginPath(); ctx.arc(0, 0, r*.86, a, a + .22); ctx.stroke(); }   // tread
  const g = ctx.createRadialGradient(-r*.15, -r*.15, r*.05, 0, 0, r*.55); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#a9a4b8');
  ctx.fillStyle = g; ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(0, 0, r*.52, 0, 7); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = '#6d6880'; ctx.lineWidth = r*.09; for(let i = 0; i < 5; i++){ const a = i*Math.PI*2/5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a)*r*.46, Math.sin(a)*r*.46); ctx.stroke(); }
  ctx.fillStyle = '#ffc93c'; ctx.beginPath(); ctx.arc(0, 0, r*.14, 0, 7); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function jeep(u, spin, gas, t){
  const bob = Math.sin(t*18)*u*.03*(gas > .05 ? 1 : 0), body = ART('jeep');
  const yz = A.yz || (A.yz = Object.assign(new Image(), {src:'img/yuzi-1-cheer.webp'}));
  if(body && ART('wheel')){
    /* the drawn jeep (object sheet 4) is placed by its wheel arches, measured on the drawing: centres at x 86 and
       248, y 192, of 334 x 206 — so the arches sit on the physics wheels at -1.05u and +1.1u */
    const k = 2.15*u/162, left = -1.05*u - 86*k, top = -.5*u - 192*k;
    if(yz.complete && yz.naturalWidth) ctx.drawImage(yz, -.4*u - .85*u, -3.0*u + bob, 1.7*u, 1.7*u);   // Yuzi in the seat, behind the door
    wheel(-1.05*u, -.5*u, .56*u, spin); wheel(1.1*u, -.5*u, .56*u, spin);
    ctx.drawImage(body, left, top + bob, 334*k, 206*k);
    return;
  }
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // body
  ctx.translate(0, bob);
  const bg = ctx.createLinearGradient(0, -1.5*u, 0, -.55*u); bg.addColorStop(0, '#ff6f5e'); bg.addColorStop(1, '#c8352a');
  ctx.fillStyle = bg; ctx.strokeStyle = INK; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.moveTo(-1.7*u, -.62*u); ctx.lineTo(-1.75*u, -1.25*u); ctx.quadraticCurveTo(-1.7*u, -1.42*u, -1.45*u, -1.42*u);
  ctx.lineTo(.55*u, -1.42*u); ctx.lineTo(1.05*u, -1.25*u); ctx.lineTo(1.65*u, -1.18*u); ctx.quadraticCurveTo(1.85*u, -1.12*u, 1.82*u, -.85*u);
  ctx.lineTo(1.75*u, -.62*u); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.35)'; rr(-1.55*u, -1.34*u, 2.1*u, .12*u, .06*u); ctx.fill();          // shine
  ctx.strokeStyle = 'rgba(43,33,64,.45)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-.2*u, -1.38*u); ctx.lineTo(-.2*u, -.7*u); ctx.stroke();   // door
  ctx.fillStyle = '#ffe27a'; ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(1.7*u, -1.0*u, .1*u, .14*u, 0, 0, 7); ctx.fill(); ctx.stroke();  // headlight
  ctx.fillStyle = '#3d3550'; rr(-1.95*u, -.92*u, .28*u, .12*u, .05*u); ctx.fill();                       // exhaust
  // roll cage and windshield
  ctx.strokeStyle = '#3d3550'; ctx.lineWidth = .11*u; ctx.beginPath(); ctx.moveTo(-1.35*u, -1.42*u); ctx.lineTo(-1.15*u, -2.35*u); ctx.lineTo(.15*u, -2.35*u); ctx.lineTo(.55*u, -1.42*u); ctx.stroke();
  ctx.fillStyle = 'rgba(170,225,255,.55)'; ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(.42*u, -1.45*u); ctx.lineTo(.12*u, -2.2*u); ctx.lineTo(.25*u, -2.2*u); ctx.lineTo(.62*u, -1.45*u); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Yuzi at the wheel
  if(yz.complete && yz.naturalWidth){ ctx.save(); ctx.beginPath(); ctx.rect(-1.6*u, -3.4*u, 2.3*u, 2.05*u); ctx.clip(); ctx.drawImage(yz, -1.25*u, -3.25*u, 1.75*u, 1.75*u); ctx.restore(); }
  ctx.fillStyle = '#3d3550'; rr(-1.0*u, -1.5*u, .9*u, .14*u, .06*u); ctx.fill();                          // seat edge
  ctx.restore();
  wheel(-1.05*u, -.42*u, .5*u, spin); wheel(1.1*u, -.42*u, .5*u, spin);
}
const DUST = [];
function drawHill(gas, lean, cadence, dt = .016){
  if(!ctx) return;
  const t = performance.now()/1000;
  const PPM = Math.max(16, Math.min(W/13, Hh/17)), camX = HL.x - (W*.3)/PPM;     // wide enough to see the next hill coming
  HL.PPM = PPM; HL.camX = camX;
  ctx.save(); if(HL.shake > .4){ ctx.translate((Math.random() - .5)*HL.shake, (Math.random() - .5)*HL.shake); HL.shake *= Math.pow(.02, dt); } else HL.shake = 0;
  HL.camY = HL.camY == null ? HL.y : HL.camY + (HL.y - HL.camY)*.15;
  const span = (Hh*.3)/PPM; HL.camY = Math.max(HL.y - span, Math.min(HL.y + span, HL.camY));   // the jeep never leaves the screen
  const sx = x => (x - camX)*PPM, sy = y => Hh*.66 - (y - HL.camY)*PPM;
  // sky, sun, clouds
  const sky = ctx.createLinearGradient(0, 0, 0, Hh); sky.addColorStop(0, '#5ec0ff'); sky.addColorStop(.7, '#c9ecff'); sky.addColorStop(1, '#e8f8ff'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, Hh);
  const sr = Math.min(W, Hh)*.07, sxn = W*.8, syn = Hh*.16, glow = ctx.createRadialGradient(sxn, syn, sr*.5, sxn, syn, sr*3);
  glow.addColorStop(0, 'rgba(255,240,150,.9)'); glow.addColorStop(1, 'rgba(255,240,150,0)'); ctx.fillStyle = glow; ctx.fillRect(sxn - sr*3, syn - sr*3, sr*6, sr*6);
  ctx.save(); ctx.translate(sxn, syn); ctx.rotate(t*.15); ctx.fillStyle = 'rgba(255,230,120,.35)';
  for(let i = 0; i < 12; i++){ ctx.rotate(Math.PI/6); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(sr*2.6, -sr*.32); ctx.lineTo(sr*2.6, sr*.32); ctx.closePath(); ctx.fill(); }
  ctx.restore();
  const sg = ctx.createRadialGradient(sxn - sr*.3, syn - sr*.3, sr*.1, sxn, syn, sr); sg.addColorStop(0, '#fff7b0'); sg.addColorStop(1, '#ffc93c');
  ctx.fillStyle = sg; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(sxn, syn, sr, 0, 7); ctx.fill(); ctx.stroke();
  for(let i = Math.floor(camX*.1/40) - 1; i < camX*.1/40 + W/(40*PPM)*2 + 2; i++){ const cx2 = (i*40 - camX*.1)*PPM*.5 + hash(i)*60, cy2 = Hh*(.08 + hash(i + 9)*.2);
    if(cx2 > -150 && cx2 < W + 50) cloud(cx2, cy2, .6 + hash(i + 4)*.5); }
  // far mountains, middle hills with trees
  mountains(camX, PPM);
  ridge(camX, PPM, .18, Hh*.56, 30, 8, 16, 3.4, '#9fdc7c', 'rgba(43,33,64,.4)', false);
  ridge(camX, PPM, .35, Hh*.64, 36, 6, 18, 2.6, '#6cc04f', 'rgba(43,33,64,.55)', true);
  // the road: soil with layers, pebbles, grass on top
  const xs = []; for(let px = -12; px <= W + 12; px += 5) xs.push([px, sy(terrain(camX + px/PPM))]);
  const soil = ctx.createLinearGradient(0, Hh*.4, 0, Hh); soil.addColorStop(0, '#c48745'); soil.addColorStop(1, '#7d4f25');
  ctx.beginPath(); ctx.moveTo(-12, Hh); xs.forEach(([px, py]) => ctx.lineTo(px, py)); ctx.lineTo(W + 12, Hh); ctx.closePath(); ctx.fillStyle = soil; ctx.fill();
  [[1.2, '#b0743a', .25], [2.9, '#975f2c', .45], [5.0, '#7c4a22', .7], [7.6, '#633818', 1.1]].forEach(([d, col, wob]) => {   // strata follow the road
    const off = (px, py) => py + d*PPM + wob*PPM*.35*Math.sin((camX + px/PPM)/2.3 + d);
    ctx.beginPath(); ctx.moveTo(-12, Hh); xs.forEach(([px, py]) => ctx.lineTo(px, off(px, py))); ctx.lineTo(W + 12, Hh); ctx.closePath();
    ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = 'rgba(43,33,64,.25)'; ctx.lineWidth = 2;
    ctx.beginPath(); xs.forEach(([px, py], i) => i ? ctx.lineTo(px, off(px, py)) : ctx.moveTo(px, off(px, py))); ctx.stroke(); });
  for(let wx = Math.floor(camX); wx < camX + W/PPM + 1; wx += 1){ if(hash(wx*3.1) < .6) continue; const px = sx(wx + hash(wx)), py = sy(terrain(wx + hash(wx))) + (1 + hash(wx + 5)*5)*PPM;
    ctx.fillStyle = hash(wx + 2) < .5 ? '#c9b49a' : '#a99178'; ctx.strokeStyle = 'rgba(43,33,64,.45)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(px, py, PPM*(.14 + hash(wx + 8)*.2), PPM*(.1 + hash(wx + 4)*.06), hash(wx)*.6, 0, 7); ctx.fill(); ctx.stroke(); }
  ctx.lineJoin = 'round'; ctx.beginPath(); xs.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py));
  ctx.lineWidth = PPM*.85; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = PPM*.72; ctx.strokeStyle = '#3f9e2b'; ctx.stroke();
  ctx.beginPath(); xs.forEach(([px, py], i) => i ? ctx.lineTo(px, py - PPM*.08) : ctx.moveTo(px, py - PPM*.08)); ctx.lineWidth = PPM*.42; ctx.strokeStyle = '#62c43f'; ctx.stroke();
  ctx.beginPath(); xs.forEach(([px, py], i) => i ? ctx.lineTo(px, py - PPM*.2) : ctx.moveTo(px, py - PPM*.2)); ctx.lineWidth = PPM*.12; ctx.strokeStyle = '#a6ef74'; ctx.stroke();
  ctx.strokeStyle = '#3f9a2c'; ctx.lineWidth = 2;
  for(let wx = Math.floor(camX/1.3)*1.3; wx < camX + W/PPM; wx += 1.3){ const px = sx(wx), py = sy(terrain(wx)) - PPM*.18; if(hash(wx) < .4) continue;
    ctx.beginPath(); ctx.moveTo(px - 3, py); ctx.lineTo(px - 5, py - PPM*.35); ctx.moveTo(px, py); ctx.lineTo(px, py - PPM*.45); ctx.moveTo(px + 3, py); ctx.lineTo(px + 6, py - PPM*.32); ctx.stroke(); }
  // distance flags
  for(let m = Math.ceil(camX/50)*50; m < camX + W/PPM; m += 50){ if(m <= 0) continue; const x = sx(m), y = sy(terrain(m));
    const fl = ART('flag'); if(fl){ const h = PPM*2.8, w = h*fl.naturalWidth/fl.naturalHeight; ctx.drawImage(fl, x - w*.08, y - h, w, h);
      ctx.save(); ctx.font = `900 ${Math.round(PPM*.5)}px Vazirmatn, sans-serif`; ctx.textAlign = 'center'; ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.fillStyle = '#fff';
      ctx.strokeText(fa(m), x + w*.42, y - h*.66); ctx.fillText(fa(m), x + w*.42, y - h*.66); ctx.restore(); continue; }
    ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - PPM*2.4); ctx.stroke();
    ctx.fillStyle = m % 100 ? '#3b82c4' : '#e2574c'; ctx.beginPath(); ctx.moveTo(x, y - PPM*2.4); ctx.lineTo(x + PPM*1.5, y - PPM*2.05); ctx.lineTo(x, y - PPM*1.7); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = `900 ${Math.round(PPM*.42)}px Vazirmatn, sans-serif`; ctx.textAlign = 'center'; ctx.fillText(fa(m), x + PPM*.6, y - PPM*1.92); }
  const rk = ART('rock'); if(rk) for(let wx = Math.floor(camX/9)*9; wx < camX + W/PPM + 9; wx += 9){ if(hash(wx*1.7) < .55) continue;
    const rx = wx + hash(wx)*5, w = PPM*(.9 + hash(wx + 1)*.7), h = w*rk.naturalHeight/rk.naturalWidth; ctx.drawImage(rk, sx(rx) - w/2, sy(terrain(rx)) - h*.82, w, h); }
  if(HL.best > 20 && !HL.recDone){ const x = sx(HL.best); if(x > -60 && x < W + 60){ const y = sy(terrain(HL.best)), tr = ART('trophy');
      ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - PPM*3.6); ctx.stroke();
      ctx.fillStyle = '#ffc93c'; ctx.beginPath(); ctx.moveTo(x, y - PPM*3.6); ctx.lineTo(x + PPM*2.2, y - PPM*3.1); ctx.lineTo(x, y - PPM*2.6); ctx.closePath(); ctx.fill(); ctx.stroke();
      if(tr) ctx.drawImage(tr, x - PPM*.7, y - PPM*5.1, PPM*1.4, PPM*1.4);
      ctx.save(); ctx.font = `900 ${Math.round(PPM*.5)}px Vazirmatn, sans-serif`; ctx.textAlign = 'center'; ctx.direction = 'rtl'; ctx.lineWidth = 4; ctx.strokeStyle = '#fff'; ctx.fillStyle = INK;
      ctx.strokeText('رکورد', x + PPM*.9, y - PPM*3.05); ctx.fillText('رکورد', x + PPM*.9, y - PPM*3.05); ctx.restore(); } }
  HL.coinsAt.forEach(c => { if(c.got) return; const x = sx(c.x); if(x < -20 || x > W + 20) return; coin(x, sy(terrain(c.x) + 1.35 + .12*Math.sin(t*3 + c.x)), PPM*.48, t); });
  HL.cans.forEach(cx => { const x = sx(cx); if(x < -30 || x > W + 30) return; fuelCan(x, sy(terrain(cx)), PPM); });
  // dust from the back wheel while the engine pulls, and exhaust puffs from the pipe
  if(gas > .1 && !HL.air && Math.random() < .5 + gas*.5) DUST.push({x:HL.x - 1.4, y:HL.y + .3, vx:-1 - Math.random()*2 - HL.v*.15, vy:.6 + Math.random(), life:1, c:'190,150,110'});
  if(gas > .05 && Math.random() < .3 + gas*.5){ const c = Math.cos(HL.phi), s2 = Math.sin(HL.phi); DUST.push({x:HL.x - 2.0*c - .8*s2, y:HL.y + .8*c - 2.0*s2, vx:-1.5 - Math.random(), vy:.8 + Math.random()*.6, life:.8, c:'120,115,135'}); }
  for(let i = DUST.length - 1; i >= 0; i--){ const d = DUST[i]; d.x += d.vx*dt; d.y += d.vy*dt; d.life -= dt*1.5; if(d.life <= 0){ DUST.splice(i, 1); continue; }
    ctx.fillStyle = `rgba(${d.c},${d.life*.5})`; ctx.beginPath(); ctx.arc(sx(d.x), sy(d.y), PPM*(.22 + (1 - d.life)*.5), 0, 7); ctx.fill(); }
  // speed lines once the jeep is really moving
  if(HL.v > 9){ const k = Math.min(1, (HL.v - 9)/6 + (HL.turbo ? .4 : 0)); ctx.strokeStyle = `rgba(255,255,255,${.55*k})`; ctx.lineWidth = 3; ctx.lineCap = 'round';
    for(let i = 0; i < 9; i++){ const y = Hh*(.12 + hash(i)*.55), x = ((hash(i + 3)*W - t*HL.v*90) % W + W) % W, len = 40 + 70*k*hash(i + 7);
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + len, y); ctx.stroke(); } }
  // shadow under the jeep, then the jeep
  const gy = sy(terrain(HL.x)); ctx.fillStyle = 'rgba(43,33,64,.18)'; ctx.beginPath(); ctx.ellipse(sx(HL.x), gy + 2, PPM*1.8*Math.max(.4, 1 - (HL.y - terrain(HL.x))*.15), PPM*.22, 0, 0, 7); ctx.fill();
  HL.spin = (HL.spin || 0) + (HL.air ? HL.v*dt/.56*.3 : HL.v*dt/.56);
  ctx.save(); ctx.translate(sx(HL.x), sy(HL.y)); ctx.rotate(-HL.phi);
  if(HL.turbo){ for(let i = 0; i < 3; i++){ const L = PPM*(1 + Math.random()*.9), y0 = -.85*PPM;                       // a flame from the exhaust
      const fg = ctx.createLinearGradient(-2.1*PPM, 0, -2.1*PPM - L, 0); fg.addColorStop(0, 'rgba(255,240,140,.95)'); fg.addColorStop(.5, 'rgba(255,140,40,.8)'); fg.addColorStop(1, 'rgba(255,60,30,0)');
      ctx.fillStyle = fg; ctx.beginPath(); ctx.moveTo(-2.0*PPM, y0 - PPM*.18); ctx.quadraticCurveTo(-2.1*PPM - L*.6, y0 - PPM*.3*Math.random(), -2.1*PPM - L, y0); ctx.quadraticCurveTo(-2.1*PPM - L*.6, y0 + PPM*.3, -2.0*PPM, y0 + PPM*.18); ctx.fill(); } }
  jeep(PPM, HL.spin, gas, t); ctx.restore();
  drawFX(dt);
  if(HL.fuel < 20 && HL.fuel > 0 && Math.sin(t*8) > 0){ ctx.strokeStyle = 'rgba(226,87,76,.55)'; ctx.lineWidth = 14; ctx.strokeRect(0, 0, W, Hh); }   // low fuel: the edges blink red
  ctx.restore();
  // what the body is doing, so the player sees cause and effect
  const m = Math.round(HL.far), fuel = Math.round(HL.fuel/5)*5;
  hud(`<span>🚩 ${fa(m)} <b>متر</b></span><span><img src="img/obj/coin.webp" alt=""> ${fa(HL.coins)}</span>${best('hill', A.who) ? `<span><img src="img/obj/trophy.webp" alt=""> ${fa(best('hill', A.who))}</span>` : ''}`,
    `<span><img src="img/obj/jerrycan.webp" alt=""><i class="meter" style="background:linear-gradient(90deg,${fuel < 25 ? '#e2574c' : '#2fbf71'} ${fuel}%,#fff ${fuel}%)"></i></span>`
    + (HL.air ? `<span>${Math.abs(lean) > .3 ? (lean > 0 ? 'کج به راست ↘' : 'کج به چپ ↙') : 'بدنت را کج کن!'}</span>`
              : HL.turbo ? `<span style="background:#ffe1b8">🔥 توربو!</span>` : `<span>${gas > .05 ? `🏃 گاز <i class="meter" style="background:linear-gradient(90deg,#f3a530 ${Math.round(gas*10)*10}%,#fff ${Math.round(gas*10)*10}%)"></i>` : '🏃 درجا بدو!'}</span>`));
}

/* ================================================================ game 2: shape walls
   A wall comes with a hole in the shape of a pose, drawn from the player's own proportions. The pose must be
   held for a moment as the wall arrives. Faster walls as the score climbs; three hearts. */
const POSES = {
  up:    {n:'دست‌ها بالا', v:'osta-armU', arms:[-162, -172, 162, 172], legs:[0, 0, 0, 0],
          ok:(b) => b.wL.y < b.nose.y && b.wR.y < b.nose.y && Math.abs(b.wL.x - b.wR.x) < 1.7*b.sw},
  wings: {n:'بال', v:'osta-armS', arms:[-90, -90, 90, 90], legs:[0, 0, 0, 0], ok:(b) => X.PRED.armS(b)},
  star:  {n:'ستاره', arms:[-140, -140, 140, 140], legs:[-24, -24, 24, 24],
          ok:(b) => b.wL.y < b.sh.y && b.wR.y < b.sh.y && Math.abs(b.wL.x - b.wR.x) > 1.9*b.sw && b.feet && Math.abs(b.aL.x - b.aR.x) > 1.3*b.sw},
  squat: {n:'بنشین', arms:[-90, -90, 90, 90], legs:[-55, 10, 55, -10], drop:.32,
          ok:(b, c) => b.hip.y - c.hipY > .2*c.leg && b.legs && b.angL < 145 && b.angR < 145},
  half:  {n:'نیم‌نشسته', arms:[-90, -90, 90, 90], legs:[-30, 8, 30, -8], drop:.14,
          ok:(b, c) => b.hip.y - c.hipY > .09*c.leg},
  storkL:{n:'لک‌لک: پای چپ', v:'osta-legL', arms:[-90, -90, 90, 90], legs:[-120, 0, 0, 0], short:'L',
          ok:(b, c) => b.feet && liftedSide(b, c) === 'L' && X.PRED.armsOut(b)},
  storkR:{n:'لک‌لک: پای راست', v:'osta-legR', arms:[-90, -90, 90, 90], legs:[0, 0, 120, 0], short:'R',
          ok:(b, c) => b.feet && liftedSide(b, c) === 'R' && X.PRED.armsOut(b)},
  leanL: {n:'کج به چپ', arms:[-160, -170, -160, -170], legs:[0, 0, 0, 0], lean:-.42,
          ok:(b) => leanOf(b) < -.2 && Math.min(b.wL.y, b.wR.y) < b.nose.y},
  leanR: {n:'کج به راست', arms:[160, 170, 160, 170], legs:[0, 0, 0, 0], lean:.42,
          ok:(b) => leanOf(b) > .2 && Math.min(b.wL.y, b.wR.y) < b.nose.y}
};
/* which foot is lifted, as the player sees it on screen (a mirror: the child's left foot is on the left) */
function liftedSide(b, c){ if(Math.abs(b.aL.y - b.aR.y) < .2*c.leg) return null; const up = b.aL.y < b.aR.y ? b.aL : b.aR, down = up === b.aL ? b.aR : b.aL;
  return up.x > down.x ? 'L' : 'R'; }
const POOL = {kid:['up', 'wings', 'star', 'squat', 'storkL', 'storkR', 'leanL', 'leanR'], senior:['up', 'wings', 'half', 'leanL', 'leanR']};
const WL = {};
function wallReset(){ Object.assign(WL, {score:0, hearts:3, wall:null, gapT:0, flash:0, flashOk:false, combo:0, shake:0}); FX.length = 0; }
function newWall(now){
  const pool = SENIOR(A.who) ? POOL.senior : POOL.kid; let k;
  do { k = pool[Math.random()*pool.length|0]; } while(WL.last === k && pool.length > 1);
  // the first walls come slowly; they speed up a little with every wall passed
  WL.last = k; const dur = SENIOR(A.who) ? Math.max(4.5, 8 - .12*WL.score) : Math.max(3.2, 6.6 - .13*WL.score);
  WL.wall = {k, t0:now, dur:dur*1000, held:0, lastOk:0};
  sfx('wall', dur*.9);
  if(POSES[k].v) voice(POSES[k].v, 'step');
}
function wallFrame(dt, now, live){
  const c = B.cal;
  if(A.phase === 'run' && live){
    if(!WL.wall && now > WL.gapT) newWall(now);
    const w = WL.wall;
    if(w){
      /* the pose counts once it has been held a quarter of a second while the wall is on its way (the second
         half of its approach), and is still held, or was a moment ago, when it arrives */
      const p = (now - w.t0)/w.dur, okNow = !!(B.b && c && POSES[w.k].ok(B.b, c));
      w.okNow = okNow;
      if(p > .78 && now - (w.tickT || 0) > (p > .9 ? 160 : 300)){ w.tickT = now; sfx('tick'); }          // tick-tick-tick as it arrives
      if(p > .4 && okNow){ if(!w.held) sfx('tap', 3); w.held += dt*1000; w.lastOk = now; }
      if(p >= 1){
        const pass = w.held >= 250 && now - w.lastOk < 900;
        WL.flash = now; WL.flashOk = pass;
        if(pass){ WL.score++; WL.combo++; sfx('pass'); burst(W/2, Hh*.55, 30, CONF, 420, 1.2, 'star');
          const rb = best('wall', A.who); if(rb > 0 && WL.score === rb + 1){ sfx('cheer'); pop(W/2, Hh*.28, 'رکورد را شکستی! 🏆', '#ffd93d', 36); }
          else if(WL.score % 5 === 0){ sfx('fanfare'); pop(W/2, Hh*.28, 'تندتر! ⚡', '#7cd3ff', 42); }
          if(window.HKMusic) HKMusic.rate(1 + Math.min(.3, WL.score*.03));
          pop(W/2, Hh*.4, WL.combo >= 3 ? `عالی! ×${fa(WL.combo)}` : ['آفرین!', 'عالی!', 'رد شدی!'][WL.score % 3], '#ffd93d', 40); }
        else { WL.hearts--; WL.combo = 0; WL.shake = 16; sfx('smash'); vib([50, 30, 70]); burst(W/2, Hh*.5, 26, ['#d9774b', '#cf6a40', '#e0855a', '#f0d6b4'], 380, 1.4, 'brick');
          pop(W/2, Hh*.4, 'اوه! دیوار خورد', '#ff8a7a', 32); }
        WL.wall = null; WL.gapT = now + 1100;
        if(WL.hearts <= 0){ gameOver(WL.score, 'دیوار به تو خورد!'); }
      }
    }
  }
  drawWall(now, c);
}
/* the pose's stick figure, built from this player's own limb lengths */
function poseFigure(k, c, scale, cx, groundY){
  const P = POSES[k], s = scale, d2r = Math.PI/180;
  const dir = a => ({x:Math.sin(a*d2r), y:Math.cos(a*d2r)});      // 0 = straight down, 90 = to the right, 180 = up
  const legLen = c.th + c.sh, drop = (P.drop || 0)*legLen, lean = P.lean || 0;
  const pel = {x:cx, y:groundY - (legLen - drop)*s};
  const neck = {x:pel.x + Math.sin(lean)*c.torso*s, y:pel.y - Math.cos(lean)*c.torso*s};
  const perp = {x:Math.cos(lean), y:Math.sin(lean)};
  const shL = {x:neck.x - perp.x*c.sw*s/2, y:neck.y - perp.y*c.sw*s/2}, shR = {x:neck.x + perp.x*c.sw*s/2, y:neck.y + perp.y*c.sw*s/2};
  const hpL = {x:pel.x - c.hipW*s/2, y:pel.y}, hpR = {x:pel.x + c.hipW*s/2, y:pel.y};
  const limb = (o, a1, a2, l1, l2) => { const m = {x:o.x + dir(a1).x*l1*s, y:o.y + dir(a1).y*l1*s}; return [o, m, {x:m.x + dir(a2).x*l2*s, y:m.y + dir(a2).y*l2*s}]; };
  const [a1, a2, a3, a4] = P.arms, [l1, l2, l3, l4] = P.legs;
  const legL = limb(hpL, l1, l2, c.th*(P.short === 'L' ? .75 : 1), c.sh*(P.short === 'L' ? .7 : 1));
  const legR = limb(hpR, l3, l4, c.th*(P.short === 'R' ? .75 : 1), c.sh*(P.short === 'R' ? .7 : 1));
  // a squat from the front: the shins come back to the floor
  if(P.drop && P.drop > .2){ legL[2] = {x:legL[1].x + 4, y:groundY}; legR[2] = {x:legR[1].x - 4, y:groundY}; }
  const head = {x:neck.x + Math.sin(lean)*c.head*1.6*s, y:neck.y - Math.cos(lean)*c.head*1.6*s};
  return {head, r:c.head*s, segs:[[shL, shR], [neck, pel], [hpL, hpR], limb(shL, a1, a2, c.ua, c.fa), limb(shR, a3, a4, c.ua, c.fa), legL, legR], s};
}
let wallCv = null;
/* the stage: sky, distant hills, and a tiled track that rolls toward the player while a wall is coming */
function stage(now, moving){
  const hz = Hh*.56, cx = W/2;
  const sky = ctx.createLinearGradient(0, 0, 0, hz); sky.addColorStop(0, '#5ec0ff'); sky.addColorStop(1, '#d6f1ff'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, hz + 2);
  for(let i = 0; i < 4; i++) cloud(((i*W*.37 + now*.008*(1 + i*.3)) % (W + 160)) - 120, Hh*(.07 + .09*(i % 2)), .45 + .15*(i % 3));
  const hill = (base, amp, f, col) => { ctx.beginPath(); ctx.moveTo(0, hz + 2); for(let x = 0; x <= W + 8; x += 8) ctx.lineTo(x, base - amp*(.6 + .4*Math.sin(x/f + base))*Math.abs(Math.sin(x/(f*1.7) + 1)));
    ctx.lineTo(W, hz + 2); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = 'rgba(43,33,64,.35)'; ctx.lineWidth = 2.5; ctx.stroke(); };
  hill(hz, Hh*.1, 60, '#9fdc7c'); hill(hz + 1, Hh*.05, 37, '#6cc04f');
  // grass on both sides, the track in the middle
  ctx.fillStyle = '#5cb83f'; ctx.fillRect(0, hz, W, Hh - hz);
  const zOf = z => 1/(1 + z), X = (xw, z) => cx + xw*W*.5*zOf(z), Y = z => hz + (Hh - hz)*zOf(z);
  const lanes = [-1.3, -.78, -.26, .26, .78, 1.3], ph = moving ? (now/1000*1.6) % 1 : 0;
  for(let n = -1; n < 40; n++){ const z1 = Math.max(0, (n - ph)*.45), z2 = Math.max(0, (n + 1 - ph)*.45); if(z2 <= 0) continue;
    for(let m = 0; m < lanes.length - 1; m++){
      ctx.fillStyle = (n + m) % 2 ? '#f6b04a' : '#ffc866';
      ctx.beginPath(); ctx.moveTo(X(lanes[m], z1), Y(z1)); ctx.lineTo(X(lanes[m + 1], z1), Y(z1)); ctx.lineTo(X(lanes[m + 1], z2), Y(z2)); ctx.lineTo(X(lanes[m], z2), Y(z2)); ctx.closePath(); ctx.fill(); } }
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; [lanes[0], lanes[lanes.length - 1]].forEach(l => { ctx.beginPath(); ctx.moveTo(X(l, 0), Y(0)); ctx.lineTo(X(l, 60), Y(60)); ctx.stroke(); });
  const fog = ctx.createLinearGradient(0, hz, 0, hz + (Hh - hz)*.25); fog.addColorStop(0, 'rgba(214,241,255,.5)'); fog.addColorStop(1, 'rgba(214,241,255,0)'); ctx.fillStyle = fog; ctx.fillRect(0, hz, W, (Hh - hz)*.25);
  return hz;
}
const BRICK = ['#d9774b', '#cf6a40', '#e0855a', '#c96339', '#d77350'];
function drawWall(now, c){
  if(!ctx) return;
  const dt = Math.min(.05, (now - (WL.drawT || now))/1000); WL.drawT = now;
  ctx.save(); if(WL.shake > .4){ ctx.translate((Math.random() - .5)*WL.shake, (Math.random() - .5)*WL.shake); WL.shake *= Math.pow(.02, dt); } else WL.shake = 0;
  const floorY = Hh*.9, w = WL.wall, hz = stage(now, !!w);
  if(!c){ ctx.restore(); hud(''); return; }
  const k = (Hh*.62)/c.height, cx = W/2;
  // the player's own body, live, in the plane the wall arrives at — so they see whether they fit
  const drawSelf = () => { const b = B.b; if(!b || performance.now() - B.t > 900) return;
    const mx = p => cx + (b.hip.x - p.x)*k, my = p => floorY - (c.hipY - p.y)*k - (c.th + c.sh)*k;   // mirrored, anchored at the hips
    const ok = WL.wall && POSES[WL.wall.k].ok(b, c), segs = [[b.shL, b.shR], [b.sh, b.hip], [b.hipL, b.hipR], [b.shL, b.eL, b.wL], [b.shR, b.eR, b.wR], [b.hipL, b.kL, b.aL], [b.hipR, b.kR, b.aR]];
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    [[INK, 1.6], [ok ? '#2fbf71' : '#3b82c4', 1]].forEach(([col, f]) => { ctx.strokeStyle = col; ctx.lineWidth = Math.max(5, c.sw*k*.13)*f + (f > 1 ? 3 : 0);
      segs.forEach(seg => { ctx.beginPath(); seg.forEach((p, i) => i ? ctx.lineTo(mx(p), my(p)) : ctx.moveTo(mx(p), my(p))); ctx.stroke(); });
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(mx(b.nose), my(b.nose), c.head*k*.75 + (f > 1 ? 3 : 0), 0, 7); ctx.fill(); });
    ctx.restore(); };
  if(w){
    const p = Math.min(1, (now - w.t0)/w.dur), s = .2 + .8*Math.pow(p, 1.6);
    const ww = Math.max(W*1.15, Hh*.95)*s, wh = Hh*.86*s, bottom = hz + (floorY - hz)*(.06 + .94*Math.pow(p, 1.6)), wx = cx - ww/2, wy = bottom - wh;
    // shadow on the floor in front of the wall
    ctx.fillStyle = 'rgba(43,33,64,.22)'; ctx.beginPath(); ctx.moveTo(wx, bottom); ctx.lineTo(wx + ww, bottom); ctx.lineTo(wx + ww*1.04, bottom + 14*s); ctx.lineTo(wx - ww*.04, bottom + 14*s); ctx.closePath(); ctx.fill();
    if(!wallCv) wallCv = document.createElement('canvas');
    wallCv.width = Math.max(1, Math.round(ww*DPR)); wallCv.height = Math.max(1, Math.round(wh*DPR)); const x = wallCv.getContext('2d'); x.setTransform(DPR, 0, 0, DPR, 0, 0);
    // bricks, each its own shade, with mortar and a light top edge
    x.fillStyle = '#f0d6b4'; x.fillRect(0, 0, ww, wh);
    const bh = 30*s, bw = 66*s, gap = Math.max(1, 3*s), tile = ART('brick-tile');
    let pat = null; if(tile){ try { pat = x.createPattern(tile, 'repeat'); pat.setTransform(new DOMMatrix().scale(.62*s)); } catch(e){ pat = null; } }
    if(pat){ x.fillStyle = pat; x.fillRect(0, 0, ww, wh); }
    else for(let r = 0; r*bh < wh; r++) for(let q = (r % 2 ? -bw/2 : 0); q < ww; q += bw){
      const id = r*31 + Math.round(q/bw); x.fillStyle = BRICK[Math.floor(hash(id + w.t0 % 97)*BRICK.length)];
      x.fillRect(q + gap/2, r*bh + gap/2, bw - gap, bh - gap);
      x.fillStyle = 'rgba(255,255,255,.18)'; x.fillRect(q + gap/2, r*bh + gap/2, bw - gap, Math.max(1, 4*s));
      x.fillStyle = 'rgba(80,30,10,.18)'; x.fillRect(q + gap/2, r*bh + bh - gap/2 - Math.max(1, 4*s), bw - gap, Math.max(1, 4*s)); }
    // stone coping on top, and a dark plinth at the bottom
    x.fillStyle = '#b9b2c8'; x.fillRect(0, 0, ww, 16*s); x.fillStyle = '#d9d4e4'; x.fillRect(0, 0, ww, 6*s);
    x.fillStyle = '#8c4a2c'; x.fillRect(0, wh - 12*s, ww, 12*s);
    const f = poseFigure(w.k, c, k*s, ww/2, wh - 2);
    const cut = (extra, op, col) => { x.globalCompositeOperation = op; x.strokeStyle = x.fillStyle = col; x.lineCap = 'round'; x.lineJoin = 'round';
      x.lineWidth = c.sw*k*s*.62 + extra; f.segs.forEach(seg => { x.beginPath(); seg.forEach((pt, i) => i ? x.lineTo(pt.x, pt.y) : x.moveTo(pt.x, pt.y)); x.stroke(); });
      x.lineWidth = c.sw*k*s*.95 + extra; x.beginPath(); x.moveTo(f.segs[1][0].x, f.segs[1][0].y); x.lineTo(f.segs[1][1].x, f.segs[1][1].y); x.stroke();
      x.beginPath(); x.arc(f.head.x, f.head.y, f.r*1.35 + extra/2, 0, 7); x.fill(); };
    cut(Math.max(4, 16*s), 'source-over', '#6b3420');           // the broken edge around the hole
    cut(Math.max(2, 8*s), 'source-over', '#4a2414');
    cut(0, 'destination-out', '#000');
    x.globalCompositeOperation = 'source-over'; x.strokeStyle = INK; x.lineWidth = Math.max(2, 5*s); x.strokeRect(0, 0, ww, wh);
    if(p > .97) drawSelf();                     // the body passes through the hole on top of the wall
    ctx.drawImage(wallCv, wx, wy, ww, wh);
    if(p > .5 && p <= .97) drawSelf();          // once the wall is near: the outline next to the hole it must fit
    // the pose's name on a ribbon, below the camera picture
    const pip = $('#plCam').getBoundingClientRect(), ty = Math.max(Hh*.2, pip.bottom + 40), name = POSES[w.k].n + '!';
    ctx.save(); ctx.direction = 'rtl'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = `900 ${Math.round(Math.min(W, Hh)*.07)}px Vazirmatn, sans-serif`;
    const tw = ctx.measureText(name).width + 48, th = Math.min(W, Hh)*.11, pop = 1 + .12*Math.max(0, 1 - (now - w.t0)/250);
    ctx.translate(cx, ty); ctx.scale(pop, pop);
    const rib = ART('ribbon');
    if(rib){ const rw = tw*1.45, rh = rw*rib.naturalHeight/rib.naturalWidth; ctx.drawImage(rib, -rw/2, -rh*.42, rw, rh); }
    else { ctx.fillStyle = '#c8352a'; ctx.strokeStyle = INK; ctx.lineWidth = 3;
    [-1, 1].forEach(d => { ctx.beginPath(); ctx.moveTo(d*tw/2, -th*.32); ctx.lineTo(d*(tw/2 + th*.5), -th*.32); ctx.lineTo(d*(tw/2 + th*.3), th*.08); ctx.lineTo(d*(tw/2 + th*.5), th*.48); ctx.lineTo(d*tw/2, th*.48); ctx.closePath(); ctx.fill(); ctx.stroke(); });
    ctx.fillStyle = '#ff6f5e'; rr(-tw/2, -th/2, tw, th, th*.22); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.3)'; rr(-tw/2 + 6, -th/2 + 5, tw - 12, th*.22, th*.1); ctx.fill(); }
    ctx.fillStyle = '#fff'; ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(43,33,64,.6)'; ctx.strokeText(name, 0, 2); ctx.fillText(name, 0, 2); ctx.restore();
  } else drawSelf();
  if(w && w.okNow){ ctx.strokeStyle = `rgba(47,191,113,${.45 + .25*Math.sin(now/90)})`; ctx.lineWidth = 16; ctx.strokeRect(0, 0, W, Hh); }   // fitting: the edges glow green
  if(WL.flash && now - WL.flash < 700){ ctx.fillStyle = WL.flashOk ? 'rgba(47,191,113,.28)' : 'rgba(226,87,76,.32)'; ctx.fillRect(0, 0, W, Hh); }
  drawFX(dt);
  ctx.restore();
  hud(`<span>🧱 ${fa(WL.score)} <b>دیوار</b></span>${WL.combo >= 3 ? `<span style="background:#ffe1b8">🔥 ×${fa(WL.combo)}</span>` : ''}<span class="hearts">${[0,1,2].map(i => `<img src="img/obj/heart.webp" alt=""${i < WL.hearts ? '' : ' class="lost"'}>`).join('')}</span>${best('wall', A.who) ? `<span><img src="img/obj/trophy.webp" alt=""> ${fa(best('wall', A.who))}</span>` : ''}`);
}

/* ================================================================ hooks */
window.HKA = {
  enter(name){ if(name === 'arena') renderArena(); if(name === 'play') startPlay(); },
  leave(name){ if(name !== 'play' && A.phase !== 'off') stopPlay(); },
  _A: A, _B: B, _HL: HL, _WL: WL, POSES
};
addEventListener('resize', () => { if(A.phase !== 'off') size(); });
})();
