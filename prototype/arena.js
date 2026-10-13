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
function terrain(x){ const amp = 1.5 + Math.min(5.5, Math.max(0, x)/150);
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
      ctx.strokeStyle = INK; ctx.lineWidth = 2;
      if(hash(wx + 11) < .5){ ctx.fillStyle = '#2f8a3a'; ctx.beginPath(); ctx.moveTo(px, y - h*1.25); ctx.lineTo(px + h*.36, y - h*.35); ctx.lineTo(px - h*.36, y - h*.35); ctx.closePath(); ctx.fill(); ctx.stroke(); }  // pine
      else { ctx.fillStyle = hash(wx + 7) < .5 ? '#4fae3a' : '#3f9a35'; ctx.beginPath(); ctx.arc(px, y - h*.6, h*.42, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.arc(px - h*.14, y - h*.74, h*.15, 0, 7); ctx.fill(); } } }
}
function coin(x, y, r, t){
  const sq = Math.abs(Math.cos(t*3 + x*.01)); ctx.save(); ctx.translate(x, y); ctx.scale(.35 + .65*sq, 1);
  const g = ctx.createRadialGradient(-r*.3, -r*.3, r*.1, 0, 0, r); g.addColorStop(0, '#fff3a8'); g.addColorStop(.5, '#ffc93c'); g.addColorStop(1, '#e09a12');
  ctx.fillStyle = g; ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = '#c47d0a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, r*.68, 0, 7); ctx.stroke();
  ctx.fillStyle = '#c47d0a'; ctx.beginPath(); for(let i = 0; i < 10; i++){ const a = -Math.PI/2 + i*Math.PI/5, rr2 = i % 2 ? r*.22 : r*.48; ctx.lineTo(Math.cos(a)*rr2, Math.sin(a)*rr2); } ctx.closePath(); ctx.fill();
  ctx.restore();
}
function fuelCan(x, y, u){
  ctx.save(); ctx.translate(x, y); ctx.lineJoin = 'round';
  const g = ctx.createLinearGradient(-.45*u, 0, .45*u, 0); g.addColorStop(0, '#ff7a6b'); g.addColorStop(1, '#c9372b');
  ctx.fillStyle = g; ctx.strokeStyle = INK; ctx.lineWidth = 3; rr(-.42*u, -1.25*u, .84*u, 1.2*u, .12*u); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#3d3550'; rr(-.3*u, -1.42*u, .32*u, .22*u, .06*u); ctx.fill(); ctx.stroke();               // handle
  ctx.fillStyle = '#ffc93c'; rr(.12*u, -1.48*u, .16*u, .26*u, .05*u); ctx.fill(); ctx.stroke();              // cap
  ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-.25*u, -.35*u); ctx.lineTo(.25*u, -1.0*u); ctx.moveTo(-.25*u, -1.0*u); ctx.lineTo(.25*u, -.35*u); ctx.stroke();
  ctx.restore();
}
function wheel(x, y, r, spin){
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
  const bob = Math.sin(t*18)*u*.03*(gas > .05 ? 1 : 0);
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
  const yz = A.yz || (A.yz = Object.assign(new Image(), {src:'img/yuzi-1-cheer.webp'}));
  if(yz.complete && yz.naturalWidth){ ctx.save(); ctx.beginPath(); ctx.rect(-1.6*u, -3.4*u, 2.3*u, 2.05*u); ctx.clip(); ctx.drawImage(yz, -1.25*u, -3.25*u, 1.75*u, 1.75*u); ctx.restore(); }
  ctx.fillStyle = '#3d3550'; rr(-1.0*u, -1.5*u, .9*u, .14*u, .06*u); ctx.fill();                          // seat edge
  ctx.restore();
  wheel(-1.05*u, -.42*u, .5*u, spin); wheel(1.1*u, -.42*u, .5*u, spin);
}
const DUST = [];
function drawHill(gas, lean, cadence){
  if(!ctx) return;
  const t = performance.now()/1000;
  const PPM = Math.max(16, Math.min(W/13, Hh/17)), camX = HL.x - (W*.3)/PPM;     // wide enough to see the next hill coming
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
    ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - PPM*2.4); ctx.stroke();
    ctx.fillStyle = m % 100 ? '#3b82c4' : '#e2574c'; ctx.beginPath(); ctx.moveTo(x, y - PPM*2.4); ctx.lineTo(x + PPM*1.5, y - PPM*2.05); ctx.lineTo(x, y - PPM*1.7); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = `900 ${Math.round(PPM*.42)}px Vazirmatn, sans-serif`; ctx.textAlign = 'center'; ctx.fillText(fa(m), x + PPM*.6, y - PPM*1.92); }
  HL.coinsAt.forEach(c => { if(c.got) return; const x = sx(c.x); if(x < -20 || x > W + 20) return; coin(x, sy(terrain(c.x) + 1.35 + .12*Math.sin(t*3 + c.x)), PPM*.48, t); });
  HL.cans.forEach(cx => { const x = sx(cx); if(x < -30 || x > W + 30) return; fuelCan(x, sy(terrain(cx)), PPM); });
  // dust from the back wheel while the engine pulls on the ground
  if(gas > .1 && !HL.air && Math.random() < .5 + gas*.5) DUST.push({x:HL.x - 1.4, y:HL.y + .3, vx:-1 - Math.random()*2, vy:.6 + Math.random(), life:1});
  for(let i = DUST.length - 1; i >= 0; i--){ const d = DUST[i]; d.x += d.vx*.016; d.y += d.vy*.016; d.life -= .025; if(d.life <= 0){ DUST.splice(i, 1); continue; }
    ctx.fillStyle = `rgba(190,150,110,${d.life*.5})`; ctx.beginPath(); ctx.arc(sx(d.x), sy(d.y), PPM*(.25 + (1 - d.life)*.5), 0, 7); ctx.fill(); }
  // shadow under the jeep, then the jeep
  const gy = sy(terrain(HL.x)); ctx.fillStyle = 'rgba(43,33,64,.18)'; ctx.beginPath(); ctx.ellipse(sx(HL.x), gy + 2, PPM*1.8*Math.max(.4, 1 - (HL.y - terrain(HL.x))*.15), PPM*.22, 0, 0, 7); ctx.fill();
  HL.spin = (HL.spin || 0) + (HL.air ? 0 : HL.v*.016/.5);
  ctx.save(); ctx.translate(sx(HL.x), sy(HL.y)); ctx.rotate(-HL.phi); jeep(PPM, HL.spin, gas, t); ctx.restore();
  // what the body is doing, so the player sees cause and effect
  const m = Math.round(HL.far), fuel = Math.round(HL.fuel/5)*5;
  hud(`<span>🚩 ${fa(m)} <b>متر</b></span><span>🪙 ${fa(HL.coins)}</span>${best('hill', A.who) ? `<span>🏆 ${fa(best('hill', A.who))}</span>` : ''}`,
    `<span>⛽<i class="meter" style="background:linear-gradient(90deg,${fuel < 25 ? '#e2574c' : '#2fbf71'} ${fuel}%,#fff ${fuel}%)"></i></span>`
    + (HL.air ? `<span>${Math.abs(lean) > .3 ? (lean > 0 ? 'کج به راست ↘' : 'کج به چپ ↙') : 'بدنت را کج کن!'}</span>`
              : `<span>${gas > .05 ? `🏃 گاز <i class="meter" style="background:linear-gradient(90deg,#f3a530 ${Math.round(gas*10)*10}%,#fff ${Math.round(gas*10)*10}%)"></i>` : '🏃 درجا بدو!'}</span>`));
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
  const floorY = Hh*.9, w = WL.wall, hz = stage(now, !!w);
  if(!c){ hud(''); return; }
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
    const bh = 30*s, bw = 66*s, gap = Math.max(1, 3*s);
    for(let r = 0; r*bh < wh; r++) for(let q = (r % 2 ? -bw/2 : 0); q < ww; q += bw){
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
    ctx.fillStyle = '#c8352a'; ctx.strokeStyle = INK; ctx.lineWidth = 3;
    [-1, 1].forEach(d => { ctx.beginPath(); ctx.moveTo(d*tw/2, -th*.32); ctx.lineTo(d*(tw/2 + th*.5), -th*.32); ctx.lineTo(d*(tw/2 + th*.3), th*.08); ctx.lineTo(d*(tw/2 + th*.5), th*.48); ctx.lineTo(d*tw/2, th*.48); ctx.closePath(); ctx.fill(); ctx.stroke(); });
    ctx.fillStyle = '#ff6f5e'; rr(-tw/2, -th/2, tw, th, th*.22); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.3)'; rr(-tw/2 + 6, -th/2 + 5, tw - 12, th*.22, th*.1); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(43,33,64,.6)'; ctx.strokeText(name, 0, 2); ctx.fillText(name, 0, 2); ctx.restore();
  } else drawSelf();
  if(WL.flash && now - WL.flash < 700){ ctx.fillStyle = WL.flashOk ? 'rgba(47,191,113,.28)' : 'rgba(226,87,76,.32)'; ctx.fillRect(0, 0, W, Hh); }
  hud(`<span>🧱 ${fa(WL.score)} <b>دیوار</b></span><span>${'❤️'.repeat(Math.max(0, WL.hearts))}${'🤍'.repeat(Math.max(0, 3 - WL.hearts))}</span>${best('wall', A.who) ? `<span>🏆 ${fa(best('wall', A.who))}</span>` : ''}`);
}

/* ================================================================ hooks */
window.HKA = {
  enter(name){ if(name === 'arena') renderArena(); if(name === 'play') startPlay(); },
  leave(name){ if(name !== 'play' && A.phase !== 'off') stopPlay(); },
  _A: A, _B: B, _HL: HL, _WL: WL, POSES
};
addEventListener('resize', () => { if(A.phase !== 'off') size(); });
})();
