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
  hill: {name:'تپه‌نوردیِ یوزی', unit:'متر', how:'درجا بدو تا ماشین برود؛ هر چه تندتر، تندتر! روی تپه که پرید، بدنت را کج کن تا صاف فرود بیاید.',
         howSenior:'درجا قدم بزن تا ماشین برود؛ روی تپه که پرید، بدنت را آرام کج کن تا صاف فرود بیاید.'},
  wall: {name:'دیوارِ شکل‌ها', unit:'دیوار', how:'دیوار با سوراخی به شکلِ یک حالت می‌آید. تا برسد، همان شکل را با بدنت بساز تا از آن رد شوی!',
         howSenior:'دیوار با سوراخی به شکلِ یک حالت می‌آید؛ آرام همان شکل را بساز. حالت‌های پرشی و نشستنِ عمیق برای شما نیست.'}
};
const A = {game:'hill', who:'kid', raf:0, phase:'off'};
const rec = () => { const s = S(); s.arena = s.arena || {}; s.arena.hill = s.arena.hill || {}; s.arena.wall = s.arena.wall || {}; return s.arena; };
const best = (g, who) => rec()[g][who] || 0;

/* ================================================================ the arena screen */
function icon(g){
  return g === 'hill'
    ? `<svg viewBox="0 0 96 96" aria-hidden="true"><rect width="96" height="96" rx="20" fill="#bfe8ff"/><path d="M0 70 Q24 40 48 58 T96 50 V96 H0Z" fill="#6cc04a" stroke="#2b2140" stroke-width="3"/><g transform="translate(30 36) rotate(-12)"><rect x="0" y="6" width="34" height="14" rx="5" fill="#e2574c" stroke="#2b2140" stroke-width="3"/><path d="M8 6 l4-8 h12 l4 8" fill="#ffc93c" stroke="#2b2140" stroke-width="3" stroke-linejoin="round"/><circle cx="8" cy="22" r="6" fill="#3d3550" stroke="#2b2140" stroke-width="3"/><circle cx="27" cy="22" r="6" fill="#3d3550" stroke="#2b2140" stroke-width="3"/></g></svg>`
    : `<svg viewBox="0 0 96 96" aria-hidden="true"><rect width="96" height="96" rx="20" fill="#ffe9c2"/><rect x="12" y="10" width="72" height="76" rx="6" fill="#d9774b" stroke="#2b2140" stroke-width="3"/><g stroke="#b85c34" stroke-width="2"><path d="M12 28h72M12 46h72M12 64h72M36 10v18M60 28v18M36 46v18M60 64v22"/></g><g fill="#ffe9c2" stroke="#2b2140" stroke-width="2.5"><circle cx="48" cy="24" r="7"/><path d="M48 31v22M48 36l-16-12M48 36l16-12M48 53l-10 22M48 53l10 22" stroke-width="9" stroke-linecap="round" fill="none"/></g></svg>`;
}
function renderArena(){
  H.syncPlayers(); if(!H.PLAYERS.some(p => p.k === A.who)) A.who = 'kid';
  const P = H.PLAYERS, who = P.find(p => p.k === A.who), senior = SENIOR(A.who);
  const card = g => `<button class="ar-card" data-game="${g}">${icon(g)}<span><b>${GAMES[g].name}</b><small>${senior ? GAMES[g].howSenior : GAMES[g].how}</small>
    <span class="rec">رکوردِ ${who.n}: ${best(g, A.who) ? fa(best(g, A.who)) + ' ' + GAMES[g].unit : 'هنوز نه'}</span></span></button>`;
  const board = P.length > 1 ? `<div class="ar-board"><h4>تابلوی رکوردهای خانواده</h4><table>${P.map(p => `<tr><td>${p.n}</td><td>${best('hill', p.k) ? fa(best('hill', p.k)) + ' متر' : '–'}</td><td>${best('wall', p.k) ? fa(best('wall', p.k)) + ' دیوار' : '–'}</td></tr>`).join('')}</table></div>` : '';
  $('#arBody').innerHTML = `<div class="who" style="margin:0 0 12px"><b>کی بازی می‌کند؟</b><div class="tms">${P.map(p => `<button class="tm ${p.k===A.who?'on':''}" data-who="${p.k}" aria-pressed="${p.k===A.who}"><span class="tav"><img src="img/${p.img}.webp" alt="" style="${p.kid?'transform:scale(2.1);transform-origin:50% 8%':''}"></span><small>${p.n}</small></button>`).join('')}</div></div>
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
  B.det = X.detector(SENIOR(A.who) ? 'walk' : 'run');
  const g = GAMES[A.game];
  msg(`<h3>${g.name}</h3><p>${SENIOR(A.who) ? g.howSenior : g.how}</p><p style="color:var(--ink-soft)">اول صاف بایست تا یوزی اندازه‌ات را بگیرد…</p>`);
  hud('');
  const CAM = H.CAM; CAM.onFrame = onFrame; CAM.hint = null; CAM.chipOn = null; CAM.count = null; CAM.headroom = false;
  const ok = await H.camStart($('#plCam'), {solo:true});
  if(!ok){ msg(`<h3>دوربین در دسترس نیست</h3><p>این بازی‌ها فقط با دوربین بازی می‌شوند، تا یوزی ببیند واقعاً حرکت کردی.</p><div class="row"><button class="cta gold" data-go="arena">برگشت</button></div>`); A.phase = 'off'; return; }
  if(A.game === 'hill') hillReset(); else wallReset();
  cancelAnimationFrame(A.raf); A.last = performance.now(); A.raf = requestAnimationFrame(tick);
}
function stopPlay(){ cancelAnimationFrame(A.raf); A.raf = 0; A.phase = 'off'; const CAM = H.CAM; CAM.onFrame = null; msg(''); }
function tick(now){
  const dt = Math.min(.05, (now - A.last)/1000); A.last = now;
  if(cv().clientWidth !== W || cv().clientHeight !== Hh) size();
  const seen = B.b && now - B.t < 900;
  if(A.phase === 'count'){
    const left = 3 - Math.floor((now - A.countT)/1000);
    if(left !== A.lastLeft){ A.lastLeft = left; if(left > 0) sfx('tick'); }
    msg(left > 0 ? `<h3 style="font-size:64px">${fa(left)}</h3><p>آماده!</p>` : '');
    if(left <= 0){ A.phase = 'run'; A.runT = now; sfx('start'); }
  }
  if(A.phase === 'run' && !seen){ A.paused = true; msg('<h3>یوزی تو را نمی‌بیند</h3><p>جلوی گوشی بایست؛ بازی منتظرت است.</p>'); }
  else if(A.phase === 'run' && A.paused){ A.paused = false; msg(''); }
  if(A.game === 'hill') hillFrame(dt, now, A.phase === 'run' && !A.paused); else wallFrame(dt, now, A.phase === 'run' && !A.paused);
  if(A.phase !== 'off') A.raf = requestAnimationFrame(tick);
}
function gameOver(score, why){
  A.phase = 'over'; const g = GAMES[A.game], prev = best(A.game, A.who), isRec = score > prev;
  if(isRec){ rec()[A.game][A.who] = score; H.save(); }
  sfx(isRec ? 'fanfare' : 'soft', isRec); if(isRec) H.voiceLater('record', 600);
  const who = H.PLAYERS.find(p => p.k === A.who) || {n:''};
  msg(`<h3>${why}</h3><p style="font-size:22px"><b>${fa(score)} ${g.unit}</b>${isRec ? `<br>رکوردِ تازهٔ ${who.n}! 🎉` : prev ? `<br>رکوردِ ${who.n}: ${fa(prev)} ${g.unit}` : ''}</p>
    <div class="row"><button class="cta gold" id="plAgain">دوباره</button><button class="ghost" data-go="arena">برگشت</button></div>`);
  $('#plAgain').addEventListener('click', () => { sfx('start'); if(A.game === 'hill') hillReset(); else wallReset(); msg(''); A.phase = 'count'; A.countT = performance.now(); A.lastLeft = null; });
}

/* ================================================================ game 1: hill climb
   Gas is running in place: the step rate over the last two seconds. Uphill, gravity pulls back, so a steep
   hill needs fast running or momentum. Over a crest the jeep leaves the ground; in the air the player's
   side lean turns it, and a landing more than ~60° off the slope rolls it over. Fuel runs down; cans keep
   the run going. Units: metres and seconds. */
const HL = {};
function terrain(x){ const amp = 1 + Math.min(6, Math.max(0, x)/140);
  return amp*(.55*Math.sin(x/9) + .3*Math.sin(x/4.3 + 1.3) + .25*Math.sin(x/17 + 2.1)) + .4*Math.sin(x/37); }
const slope = x => (terrain(x + .05) - terrain(x - .05))/.1;
const curv = x => (terrain(x + .1) - 2*terrain(x) + terrain(x - .1))/.01;
function hillReset(){
  Object.assign(HL, {camY:null, x:2, v:0, y:terrain(2), vy:0, vx:0, phi:Math.atan(slope(2)), air:false, fuel:100, coins:0, far:2, emptyT:0,
    cans:[], coinsAt:[], next:30, dead:false});
  for(let k = 0; k < 8; k++) HL.cans.push(70 + k*150 + Math.random()*40);
  for(let x = 12; x < 2000; x += 11 + Math.random()*8) HL.coinsAt.push({x, got:false});
  B.steps = [];
}
function hillFrame(dt, now, live){
  const senior = SENIOR(A.who);
  B.steps = B.steps.filter(t => now - t < 2000);
  const cadence = B.steps.length/2;                               // steps per second
  const gas = live && HL.fuel > 0 ? Math.max(0, Math.min(1, (cadence - (senior ? .3 : .6))/(senior ? 1.4 : 2.2))) : 0;
  const lean = live && B.b ? Math.max(-1, Math.min(1, leanOf(B.b)/.22)) : 0;
  if(A.phase === 'run' && !HL.dead){
    const G = 9.8, steps = 3, h = dt/steps;
    for(let i = 0; i < steps; i++){
      if(!HL.air){
        const th = Math.atan(slope(HL.x)), engine = gas*(senior ? 5.5 : 6.5);
        const a = engine - G*Math.sin(th) - .25*HL.v - (Math.abs(HL.v) > .05 ? .6*Math.sign(HL.v) : 0);
        HL.v = Math.max(-6, Math.min(14, HL.v + a*h));          // ~50 km/h at most
        if(gas === 0 && Math.abs(HL.v) < .08 && Math.abs(Math.sin(th)) < .06) HL.v = 0;
        HL.x += HL.v*Math.cos(th)*h; HL.y = terrain(HL.x); HL.phi += (th - HL.phi)*Math.min(1, 12*h);
        const k = -curv(HL.x)/Math.pow(1 + slope(HL.x)**2, 1.5);           // convex crest
        if(HL.v > 4 && k*HL.v*HL.v > G*Math.cos(th)*1.05){ HL.air = true; HL.vx = HL.v*Math.cos(th); HL.vy = HL.v*Math.sin(th); HL.w = 0; }
      } else {
        HL.vy -= G*h; HL.x += HL.vx*h; HL.y += HL.vy*h;
        HL.w = -lean*(senior ? 1.6 : 2.4) + .35;                         // a little nose-up drift: the player must act
        HL.phi += HL.w*h;
        const ground = terrain(HL.x);
        if(HL.y <= ground){ const th = Math.atan(slope(HL.x)); let d = HL.phi - th; d = Math.atan2(Math.sin(d), Math.cos(d));
          HL.y = ground; HL.air = false;
          if(Math.abs(d) > 1.05){ HL.dead = true; sfx('miss'); gameOver(Math.round(HL.far), 'ماشین وارونه شد!'); return; }
          HL.v = Math.hypot(HL.vx, HL.vy)*Math.max(.4, Math.cos(d))*(HL.vx >= 0 ? 1 : -1); HL.phi = th; sfx(Math.abs(d) < .3 ? 'hit' : 'tap', 2); }
      }
    }
    HL.far = Math.max(HL.far, HL.x);
    HL.fuel = Math.max(0, HL.fuel - dt*(senior ? 3 : 4)*(gas > 0 ? 1 : .5));
    HL.cans = HL.cans.filter(cx => { if(Math.abs(cx - HL.x) < 1.6 && Math.abs(terrain(cx) - HL.y) < 2.5){ HL.fuel = 100; sfx('star'); return false; } return true; });
    if(HL.cans.length < 6){ const last = Math.max(...HL.cans, HL.x); HL.cans.push(last + 140 + Math.random()*60); }
    HL.coinsAt.forEach(c => { if(!c.got && Math.abs(c.x - HL.x) < 1.2 && HL.y + 1.4 > terrain(c.x) + .6){ c.got = true; HL.coins++; sfx('hit'); } });
    if(HL.coinsAt.length && HL.coinsAt[HL.coinsAt.length - 1].x < HL.x + 200){ const lx = HL.coinsAt[HL.coinsAt.length - 1].x; for(let x = lx + 12; x < lx + 400; x += 11 + Math.random()*8) HL.coinsAt.push({x, got:false}); }
    if(HL.fuel <= 0 && Math.abs(HL.v) < .3 && !HL.air){ HL.emptyT = HL.emptyT || now; if(now - HL.emptyT > 1500){ HL.dead = true; gameOver(Math.round(HL.far), 'بنزین تمام شد!'); return; } } else HL.emptyT = 0;
  }
  drawHill(gas, lean, cadence);
}
function drawHill(gas, lean, cadence){
  if(!ctx) return;
  const PPM = Math.max(16, Math.min(W/13, Hh/17)), camX = HL.x - (W*.3)/PPM;     // wide enough to see the next hill coming
  HL.camY = HL.camY == null ? HL.y : HL.camY + (HL.y - HL.camY)*.15;
  const span = (Hh*.3)/PPM; HL.camY = Math.max(HL.y - span, Math.min(HL.y + span, HL.camY));   // the jeep never leaves the screen
  const sx = x => (x - camX)*PPM, sy = y => Hh*.66 - (y - HL.camY)*PPM;
  const sky = ctx.createLinearGradient(0, 0, 0, Hh); sky.addColorStop(0, '#8fd6ff'); sky.addColorStop(1, '#e4f7ff'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, Hh);
  ctx.fillStyle = '#ffd34d'; ctx.beginPath(); ctx.arc(W*.82, Hh*.18, Math.min(W, Hh)*.07, 0, 7); ctx.fill();
  ctx.fillStyle = '#b6e3a1'; ctx.beginPath(); ctx.moveTo(0, Hh);                    // far hills, slow parallax
  for(let px = 0; px <= W + 20; px += 20){ const wx = camX*.3 + px/PPM; ctx.lineTo(px, Hh*.55 - 40*Math.sin(wx/14) - 25*Math.sin(wx/5.3)); } ctx.lineTo(W, Hh); ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, Hh);
  for(let px = -10; px <= W + 10; px += 6) ctx.lineTo(px, sy(terrain(camX + px/PPM)));
  ctx.lineTo(W + 10, Hh); ctx.closePath(); ctx.fillStyle = '#a8703f'; ctx.fill();
  ctx.lineWidth = Math.max(6, PPM*.35); ctx.strokeStyle = '#6cc04a'; ctx.beginPath();
  for(let px = -10; px <= W + 10; px += 6){ const y = sy(terrain(camX + px/PPM)); px < -5 ? ctx.moveTo(px, y) : ctx.lineTo(px, y); } ctx.stroke();
  for(let m = Math.ceil(camX/50)*50; m < camX + W/PPM; m += 50){ const x = sx(m), y = sy(terrain(m)); ctx.fillStyle = '#fff'; ctx.strokeStyle = C.ink; ctx.lineWidth = 2;
    ctx.fillRect(x - 1.5, y - PPM*1.6, 3, PPM*1.6); ctx.font = `800 ${Math.round(PPM*.55)}px Vazirmatn, sans-serif`; ctx.textAlign = 'center'; ctx.fillStyle = C.ink; ctx.fillText(fa(m) + 'm', x, y - PPM*1.75); }
  HL.coinsAt.forEach(c => { if(c.got) return; const x = sx(c.x); if(x < -20 || x > W + 20) return; const y = sy(terrain(c.x) + 1.2);
    ctx.fillStyle = '#ffc93c'; ctx.strokeStyle = C.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, PPM*.32, 0, 7); ctx.fill(); ctx.stroke(); });
  HL.cans.forEach(cx => { const x = sx(cx); if(x < -30 || x > W + 30) return; const y = sy(terrain(cx));
    ctx.fillStyle = '#e2574c'; ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x - PPM*.4, y - PPM*1.2, PPM*.8, PPM*1.1, 5) : ctx.rect(x - PPM*.4, y - PPM*1.2, PPM*.8, PPM*1.1); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = `900 ${Math.round(PPM*.5)}px sans-serif`; ctx.textAlign = 'center'; ctx.fillText('⛽', x, y - PPM*.45); });
  // the jeep, with Yuzi at the wheel
  ctx.save(); ctx.translate(sx(HL.x), sy(HL.y)); ctx.rotate(-HL.phi); const u = PPM;
  ctx.lineWidth = 3; ctx.strokeStyle = C.ink;
  ctx.fillStyle = '#3d3550'; [[-1.05, -.45], [1.05, -.45]].forEach(([wx, wy]) => { ctx.beginPath(); ctx.arc(wx*u, wy*u, .48*u, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#bbb'; ctx.beginPath(); ctx.arc(wx*u, wy*u, .18*u, 0, 7); ctx.fill(); ctx.fillStyle = '#3d3550'; });
  ctx.fillStyle = '#e2574c'; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-1.55*u, -1.35*u, 3.1*u, .8*u, .25*u) : ctx.rect(-1.55*u, -1.35*u, 3.1*u, .8*u); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#ffc93c'; ctx.beginPath(); ctx.moveTo(-.9*u, -1.35*u); ctx.lineTo(-.6*u, -2.1*u); ctx.lineTo(.5*u, -2.1*u); ctx.lineTo(.8*u, -1.35*u); ctx.closePath(); ctx.fill(); ctx.stroke();
  const yz = A.yz || (A.yz = Object.assign(new Image(), {src:'img/yuzi-1-cheer.webp'})); if(yz.complete) ctx.drawImage(yz, -.75*u, -3.05*u, 1.5*u, 1.5*u);
  ctx.restore();
  // what the body is doing, so the player sees cause and effect
  const m = Math.round(HL.far);
  const fuel = Math.round(HL.fuel/5)*5;
  hud(`<span>${fa(m)} <b>متر</b></span><span>🪙 ${fa(HL.coins)}</span>${best('hill', A.who) ? `<span>رکورد ${fa(best('hill', A.who))}</span>` : ''}`,
    `<span>⛽<i class="meter" style="background:linear-gradient(90deg,${fuel < 25 ? '#e2574c' : '#2fbf71'} ${fuel}%,#fff ${fuel}%)"></i></span>`
    + (HL.air ? `<span>${Math.abs(lean) > .3 ? (lean > 0 ? 'کج به راست ↘' : 'کج به چپ ↙') : 'بدنت را کج کن!'}</span>`
              : `<span>${gas > .05 ? `گاز <i class="meter" style="background:linear-gradient(90deg,#f3a530 ${Math.round(gas*10)*10}%,#fff ${Math.round(gas*10)*10}%)"></i>` : 'درجا بدو!'}</span>`));
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
function wallReset(){ Object.assign(WL, {score:0, hearts:3, wall:null, gapT:0, flash:0, flashOk:false}); }
function newWall(now){
  const pool = SENIOR(A.who) ? POOL.senior : POOL.kid; let k;
  do { k = pool[Math.random()*pool.length|0]; } while(WL.last === k && pool.length > 1);
  WL.last = k; const dur = SENIOR(A.who) ? Math.max(3.6, 7 - .12*WL.score) : Math.max(2.3, 5.6 - .16*WL.score);
  WL.wall = {k, t0:now, dur:dur*1000, held:0, lastOk:0};
  if(POSES[k].v) voice(POSES[k].v, 'step');
}
function wallFrame(dt, now, live){
  const c = B.cal;
  if(A.phase === 'run' && live){
    if(!WL.wall && now > WL.gapT) newWall(now);
    const w = WL.wall;
    if(w){
      const p = (now - w.t0)/w.dur, okNow = !!(B.b && c && POSES[w.k].ok(B.b, c));
      if(p > .55 && okNow){ w.held += dt*1000; w.lastOk = now; }
      if(p >= 1){
        const pass = w.held >= 300 && now - w.lastOk < 700;
        WL.flash = now; WL.flashOk = pass;
        if(pass){ WL.score++; sfx('hit'); } else { WL.hearts--; sfx('miss'); }
        WL.wall = null; WL.gapT = now + 900;
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
function drawWall(now, c){
  if(!ctx) return;
  const floorY = Hh*.9, g = ctx.createLinearGradient(0, 0, 0, Hh);
  g.addColorStop(0, '#bfe8ff'); g.addColorStop(.62, '#e9f6ff'); g.addColorStop(.62, '#e8c88f'); g.addColorStop(1, '#c99a5b'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, Hh);
  ctx.strokeStyle = 'rgba(120,80,40,.35)'; ctx.lineWidth = 2; for(let i = -6; i <= 6; i++){ ctx.beginPath(); ctx.moveTo(W/2 + i*W*.02, Hh*.62); ctx.lineTo(W/2 + i*W*.16, Hh); ctx.stroke(); }
  if(!c){ hud(''); return; }
  const k = (Hh*.62)/c.height, cx = W/2;
  const w = WL.wall;
  // the player's own body, live, in the plane the wall arrives at — so they see whether they fit
  const drawSelf = () => { const b = B.b; if(!b || performance.now() - B.t > 900) return;
    const mx = p => cx + (b.hip.x - p.x)*k, my = p => floorY - (c.hipY - p.y)*k - (c.th + c.sh)*k;   // mirrored, anchored at the hips
    ctx.save(); ctx.globalAlpha = .8; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = WL.wall && POSES[WL.wall.k].ok(b, c) ? '#2fbf71' : '#3b82c4'; ctx.lineWidth = Math.max(5, c.sw*k*.13);
    [[b.shL, b.shR], [b.sh, b.hip], [b.hipL, b.hipR], [b.shL, b.eL, b.wL], [b.shR, b.eR, b.wR], [b.hipL, b.kL, b.aL], [b.hipR, b.kR, b.aR]].forEach(seg => {
      ctx.beginPath(); seg.forEach((p, i) => i ? ctx.lineTo(mx(p), my(p)) : ctx.moveTo(mx(p), my(p))); ctx.stroke(); });
    ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.arc(mx(b.nose), my(b.nose), c.head*k*.75, 0, 7); ctx.fill(); ctx.restore(); };
  if(w){
    const p = Math.min(1, (now - w.t0)/w.dur), s = .22 + .78*Math.pow(p, 1.6);
    const ww = W*1.15*s, wh = Hh*.86*s, wx = cx - ww/2, wy = floorY - wh;
    if(!wallCv) wallCv = document.createElement('canvas');
    wallCv.width = Math.max(1, Math.round(ww)); wallCv.height = Math.max(1, Math.round(wh)); const x = wallCv.getContext('2d');
    x.fillStyle = '#d9774b'; x.fillRect(0, 0, ww, wh);
    x.strokeStyle = '#b85c34'; x.lineWidth = Math.max(1, 3*s); const bh = 34*s, bw = 76*s;
    for(let r = 0; r*bh < wh; r++){ x.beginPath(); x.moveTo(0, r*bh); x.lineTo(ww, r*bh); x.stroke(); for(let q = (r % 2 ? bw/2 : 0); q < ww; q += bw){ x.beginPath(); x.moveTo(q, r*bh); x.lineTo(q, r*bh + bh); x.stroke(); } }
    const f = poseFigure(w.k, c, k*s, ww/2, wh - (Hh - floorY)*0 - 2);
    x.globalCompositeOperation = 'destination-out'; x.lineCap = 'round'; x.lineJoin = 'round'; x.lineWidth = c.sw*k*s*.62;
    f.segs.forEach(seg => { x.beginPath(); seg.forEach((pt, i) => i ? x.lineTo(pt.x, pt.y) : x.moveTo(pt.x, pt.y)); x.stroke(); });
    x.lineWidth = c.sw*k*s*.95; x.beginPath(); x.moveTo(f.segs[1][0].x, f.segs[1][0].y); x.lineTo(f.segs[1][1].x, f.segs[1][1].y); x.stroke();
    x.beginPath(); x.arc(f.head.x, f.head.y, f.r*1.35, 0, 7); x.fill();
    x.globalCompositeOperation = 'source-over'; x.strokeStyle = '#2b2140'; x.lineWidth = Math.max(2, 5*s); x.strokeRect(0, 0, ww, wh);
    if(p > .97) drawSelf();                     // the body passes through the hole on top of the wall
    ctx.drawImage(wallCv, wx, wy);
    if(p > .5 && p <= .97) drawSelf();          // once the wall is near: the outline next to the hole it must fit
    ctx.save(); ctx.direction = 'rtl'; ctx.textAlign = 'center'; ctx.font = `900 ${Math.round(Math.min(W, Hh)*.075)}px Vazirmatn, sans-serif`; ctx.lineWidth = 6; ctx.strokeStyle = '#fff'; ctx.fillStyle = C.ink;
    const pip = $('#plCam').getBoundingClientRect(), ty = Math.max(Hh*.2, pip.bottom + 44);   // below the camera picture
    ctx.strokeText(POSES[w.k].n + '!', cx, ty); ctx.fillText(POSES[w.k].n + '!', cx, ty); ctx.restore();
  } else drawSelf();
  if(WL.flash && now - WL.flash < 700){ ctx.fillStyle = WL.flashOk ? 'rgba(47,191,113,.28)' : 'rgba(226,87,76,.32)'; ctx.fillRect(0, 0, W, Hh); }
  hud(`<span>${fa(WL.score)} <b>دیوار</b></span><span>${'❤️'.repeat(Math.max(0, WL.hearts))}${'🤍'.repeat(Math.max(0, 3 - WL.hearts))}</span>${best('wall', A.who) ? `<span>رکورد ${fa(best('wall', A.who))}</span>` : ''}`);
}

/* ================================================================ hooks */
window.HKA = {
  enter(name){ if(name === 'arena') renderArena(); if(name === 'play') startPlay(); },
  leave(name){ if(name !== 'play' && A.phase !== 'off') stopPlay(); },
  _A: A, _B: B, _HL: HL, _WL: WL, POSES
};
addEventListener('resize', () => { if(A.phase !== 'off') size(); });
})();
