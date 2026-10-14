/* هفت‌خوانِ حرکت — میدان: «پرواز سیمرغ».
   مثل فلاپی‌برد، ولی پرنده را بازوهای خودِ بچه می‌پرانند: هر بار که دست‌ها را مثل بال از بالا به پایین می‌آوری،
   سیمرغ بالا می‌رود؛ دست‌ها را باز و صاف نگه داری، آرام سُر می‌خورد؛ بی‌حرکت بایستی، پایین می‌افتد.
   از میانِ ستون‌های تخت‌جمشید بگذر. هر ستون یک امتیاز، هر پرِ طلایی یک امتیاز. سه قلب؛ برخورد یک قلب می‌برد
   و چند لحظه سیمرغ نامرئی‌وار می‌پرد تا خودش را پیدا کند. با هر ده امتیاز آسمان عوض می‌شود: صبح، ظهر، غروب، شب. */
(function(){
const H = window.HK, A_ = window.HKA; if(!H || !A_ || !A_.api) return;
const {fa, sfx} = H, api = A_.api, {A, B, burst, pop, drawFX, hud, INK} = api, FX = api.FX, best = api.best;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a)*t, rnd = (a, b) => a + Math.random()*(b - a);

/* the sound of the wings lives in sfxkit.js (HKS.WING) */
const FAUD = {wing:p => HKS.WING.beat(p), chime:n => HKS.WING.chime(n), hurt:() => HKS.WING.hurt(), feather:n => sfx('coin', n)};

const F = {}, BIRD_X = .42;       // clear of the camera picture in the top-left corner
const PAL = [[['#4aa8f0', '#a8dcfa', '#ffe9c4'], 0],                      // dawn → morning
             [['#2e8be8', '#7ccaf7', '#d9f3ff'], 0],                      // noon
             [['#6a4fb8', '#f08a6a', '#ffd08a'], 0],                      // sunset
             [['#0d1a4f', '#26357f', '#5b6bb8'], 1]];                     // night
const mix = (a, b, t) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)), pa = p(a), pb = p(b); return 'rgb(' + pa.map((v, i) => Math.round(lerp(v, pb[i], t))).join(',') + ')'; };

function geoF(){ const W = api.W, Hh = api.Hh, k = Math.max(.5, Hh/700), kw = W/390; return {W, Hh, k, kw, gy:Hh*.90}; }

function fReset(){
  const g = geoF();
  Object.assign(F, {score:0, hearts:3, started:false, y:g.Hh*.42, vy:0, u:0, uS:0, prevU:null, prevT:0, lastT:0, pend:0, cols:[], nextX:g.W*1.15, dist:0, inv:0, over:false, overAt:0,
    beat:0, flapCd:0, t:0, shake:0, tilt:0, spawnN:0, lastGap:g.Hh*.42, combo:0, glide:0, bestRec:best('flap', A.who), recDone:false, wingA:0, hintT:0, idle:0, sky:0, skyN:0, flash:0});
  FX.length = 0; }

function control(dt, now, live){
  const b = B.b, c = B.cal; let fl = 0;
  if(live && b && c && now - B.t < 400 && B.t !== F.lastT){
    const dtc = clamp((B.t - F.lastT)/1000, .012, .12); F.lastT = B.t; const A_len = c.ua + c.fa, u = (b.sh.y - (b.wL.y + b.wR.y)/2)/A_len;
    F.u = u; F.spread = Math.abs(b.wL.x - b.wR.x)/(2*A_len);
    // a flap is a fast downstroke: the hands must fall faster than the camera's own wobble (about 1.5 body-arms a second)
    F.ue = F.ue == null ? u : F.ue + (u - F.ue)*.55;
    F.h = (F.h || []).concat(F.ue).slice(-4);                                        // the last four smoothed readings
    if(F.prevU != null){ const dd = F.prevU - F.ue, drop = F.h[0] - F.ue; if(dd > .01 && drop > .13 && dd/dtc > 1.2) fl = Math.min(.5, dd); }
    F.prevU = F.ue; }
  else if(!live || !b || now - B.t > 400){ F.prevU = null; F.ue = null; F.h = []; }
  if(fl > 0){ const k = geoF().k; F.vy -= fl*720*k; F.since = 0; F.pend += fl; F.idle = 0;
    if(!F.started){ F.started = true; F.vy = Math.min(F.vy, -260*k); }
    if(F.flapCd <= 0 && fl > .03){ F.flapCd = .16; FAUD.wing(clamp(fl*3, .2, 1)); burst(geoF().W*BIRD_X - 20, F.y + 6, 3, ['#ffd93d', '#8ff0e0', '#fff'], 90, .45); } }
  F.uS += (clamp(F.u, -1.2, 1.2) - F.uS)*Math.min(1, dt*14); }

function newColumn(g){
  const n = F.spawnN++, gap = Math.max(.215, .345 - n*.0065)*g.Hh, lo = gap/2 + g.Hh*.1, hi = g.gy - gap/2 - g.Hh*.1;
  let gy = clamp(F.lastGap + rnd(-.27, .27)*g.Hh, lo, hi); F.lastGap = gy;
  const cw = clamp(g.W*.16, 52, 82);
  F.cols.push({x:F.nextX, w:cw, gy, gap, passed:false, ft:n >= 1 ? {y:gy + rnd(-.18, .18)*gap, got:false, ph:Math.random()*6} : null});
  const spacing = Math.max(.5, .68 - n*.012)*g.W + cw;
  F.nextX += spacing; }

function fFrame(dt, now, live){
  const g = geoF(), ctx = api.ctx; if(!ctx || !g.W) return; F.t += dt; const {W, Hh, k, kw, gy} = g;
  F.flapCd -= dt; F.inv = Math.max(0, F.inv - dt); F.shake = Math.max(0, F.shake - dt*20); F.flash = Math.max(0, F.flash - dt*2);
  const bx = W*BIRD_X, br = 17*k;
  if(A.phase === 'run' && live){
    control(dt, now, true);
    if(!F.over){
      F.since = (F.since == null ? 9 : F.since) + dt;
      const glide = F.started && F.spread > .65 && Math.abs(F.uS) < .3 && F.since > .4;           // arms held out straight, like a glider
      F.glide += ((glide ? 1 : 0) - F.glide)*Math.min(1, dt*6);
      if(F.started){ F.vy += 1000*k*(1 - .5*F.glide)*dt; F.vy *= 1 - Math.min(.5, 2.3*dt); F.vy = clamp(F.vy, -680*k, lerp(720, 250, F.glide)*k);
        F.idle += dt; }
      else F.vy = Math.sin(F.t*2.4)*18*k;
      F.y += F.vy*dt;
      const ceil = Math.max(br, Hh*.13);                                   // never up under the score and the camera picture
      if(F.y < ceil){ F.y = ceil; F.vy = Math.max(F.vy, 0); }
      F.tilt += (clamp(F.vy/(780*k), -.55, .7) - F.tilt)*Math.min(1, dt*9);
      const speed = F.started ? (140 + Math.min(120, F.score*4.2))*kw : 0; F.speed = speed;
      F.dist += speed*dt;
      F.cols.forEach(c => c.x -= speed*dt);
      if(F.started){ if(!F.cols.length || F.nextX - F.dist < W*1.2){ if(!F.cols.length && F.spawnN === 0) F.nextX = F.dist + W*1.05; newColumn(g); } }
      while(F.cols.length && F.cols[0].x + F.cols[0].w < -20) F.cols.shift();
      F.cols.forEach(c => {
        if(!c.passed && c.x + c.w < bx - br){ c.passed = true; F.score++; F.combo++; FAUD.chime(F.score); pop(bx + 40, F.y - 40, '+۱', '#fff', 28);
          burst(c.x + c.w, c.gy, 8, ['#ffd93d', '#fff'], 160, .6, 'star');
          if(F.bestRec > 0 && !F.recDone && F.score > F.bestRec){ F.recDone = true; sfx('cheer'); pop(W/2, Hh*.2, 'رکورد را شکستی! 🏆', '#ffd93d', 36); }
          if(F.score % 10 === 0){ sfx('fanfare'); F.flash = 1; pop(W/2, Hh*.3, ['ظهر شد! ☀️', 'غروب شد! 🌇', 'شب شد! 🌙', 'صبحِ تازه! 🌅'][(F.score/10 - 1) % 4], '#ffd93d', 38);
            if(F.hearts < 3){ F.hearts++; pop(W/2, Hh*.38, 'یک قلب برگشت! 💛', '#ff9eb5', 30); sfx('fuel'); } } }
        if(c.ft && !c.ft.got && Math.hypot(c.x + c.w/2 - bx, c.ft.y - F.y) < br + 20*k){ c.ft.got = true; F.score++; FAUD.feather(F.score); pop(bx + 30, c.ft.y - 24, '+۱ پر', '#ffd93d', 26); burst(bx, c.ft.y, 14, ['#ffd93d', '#fff6b0'], 220, .7, 'star'); }
        // collision with the pillars: a circle against the two rectangles
        if(F.inv <= 0){ const hit = (rx, ry, rw, rh) => { const cx = clamp(bx, rx, rx + rw), cy = clamp(F.y, ry, ry + rh); return Math.hypot(bx - cx, F.y - cy) < br*.82; };
          if(hit(c.x, -10, c.w, c.gy - c.gap/2 + 10) || hit(c.x, c.gy + c.gap/2, c.w, gy - c.gy - c.gap/2)) hurt(g, 'column'); } });
      if(F.y > gy - br){ F.y = gy - br; if(F.started && F.inv <= 0) hurt(g, 'ground'); else F.vy = Math.min(F.vy, 0); }
      if(F.started && F.idle > 5 && F.cols.length === 0) F.idle = 0;
      if(window.HKMusic && HKMusic.current() === 'flap') HKMusic.rate(1 + Math.min(.22, F.score*.006));
    } else if(F.t >= F.overAt){ F.over = false; api.gameOver(F.score, F.score ? `${fa(F.score)} امتیاز پرواز کردی!` : 'دفعهٔ بعد بال بزن!'); }
  } else { control(dt, now, false); }
  // the sky follows the score
  const phase = (F.score/10) % 4; F.sky += (phase - F.sky)*Math.min(1, dt*(Math.abs(phase - F.sky) > 2 ? 40 : 1.2));
  draw(g, ctx, bx, br, dt);
  /* —— HUD —— */
  const hint = A.phase !== 'run' ? '' : F.over ? '' : !F.started ? 'بازوهایت را مثل بال، از بالا به پایین بیاور!' : (F.score === 0 && F.cols.length && F.t < 12) ? 'هر بار که دست‌ها پایین می‌آیند، بالا می‌روی' : '';
  hud(`<span>🪶 ${fa(F.score)} <b>امتیاز</b></span>${F.combo >= 4 ? `<span style="background:#ffe1b8">🔥 ×${fa(F.combo)}</span>` : ''}<span class="hearts">${[0,1,2].map(i => `<img src="img/obj/heart.webp" alt=""${i < F.hearts ? '' : ' class="lost"'}>`).join('')}</span>${best('flap', A.who) ? `<span><img src="img/obj/trophy.webp" alt=""> ${fa(best('flap', A.who))}</span>` : ''}`,
    hint ? `<span>${hint}</span>` : ''); }

function hurt(g, why){
  F.hearts--; F.combo = 0; F.inv = 1.6; F.shake = 9; F.vy = -330*g.k; FAUD.hurt(); sfx('miss'); api.vib && api.vib([30, 40, 30]);
  burst(g.W*BIRD_X, F.y, 22, ['#1fc7b6', '#ffd93d', '#0e8f9c', '#fff'], 280, 1, 'star');
  pop(g.W*BIRD_X + 20, F.y - 44, why === 'ground' ? 'آخ! زمین' : 'آخ! ستون', '#ffb86b', 28);
  if(F.hearts <= 0){ F.over = true; F.overAt = F.t + 1.1; F.inv = 99; } }

/* ================================================================ drawing */
function skyGrad(ctx, g){
  const i = Math.floor(F.sky) % 4, j = (i + 1) % 4, t = F.sky - Math.floor(F.sky), e = t*t*(3 - 2*t);
  const A_ = PAL[i][0], B_ = PAL[j][0]; const gr = ctx.createLinearGradient(0, 0, 0, g.gy);
  gr.addColorStop(0, mix(A_[0], B_[0], e)); gr.addColorStop(.6, mix(A_[1], B_[1], e)); gr.addColorStop(1, mix(A_[2], B_[2], e));
  ctx.fillStyle = gr; ctx.fillRect(0, 0, g.W, g.Hh); return lerp(PAL[i][1], PAL[j][1], e); }

function draw(g, ctx, bx, br, dt){
  const {W, Hh, k, kw, gy} = g, t = F.t, d = F.dist;
  ctx.save(); if(F.shake > .2) ctx.translate((Math.random() - .5)*F.shake, (Math.random() - .5)*F.shake);
  const night = skyGrad(ctx, g);
  // stars and moon at night, sun otherwise
  if(night > .02){ ctx.fillStyle = '#fff'; for(let i = 0; i < 40; i++){ const sx = (i*83.3)%W, sy = (i*47.9)%(gy*.7); ctx.globalAlpha = night*(.4 + .6*Math.abs(Math.sin(t*1.6 + i))); ctx.beginPath(); ctx.arc(sx, sy, 1.2 + (i%3)*.5, 0, 7); ctx.fill(); }
    ctx.globalAlpha = night; ctx.fillStyle = '#fff6d0'; ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(W*.78, gy*.2, 24*k, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(200,190,150,.55)'; [[-7, -4, 5], [6, 5, 4], [-2, 9, 3]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(W*.78 + dx*k, gy*.2 + dy*k, r*k, 0, 7); ctx.fill(); }); ctx.globalAlpha = 1; }
  else { const sun = (1 - night)*.95; ctx.globalAlpha = sun; const sx = W*.78, sy = gy*(.2 + Math.max(0, (F.sky % 4 - 1.6))*.3); const sg = ctx.createRadialGradient(sx, sy, 4, sx, sy, 120*k); sg.addColorStop(0, 'rgba(255,240,170,.9)'); sg.addColorStop(1, 'rgba(255,240,170,0)'); ctx.fillStyle = sg; ctx.fillRect(sx - 130*k, sy - 130*k, 260*k, 260*k);
    ctx.fillStyle = '#ffe27a'; ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(sx, sy, 24*k, 0, 7); ctx.fill(); ctx.stroke(); ctx.globalAlpha = 1; }
  // clouds drift slowly, mountains parallax
  const cl = (i, fx, fy, sc) => { const cx = (((fx*W - d*.18*kw*1.0 - t*6*(1 + i*.3)) % (W + 200)) + W + 200) % (W + 200) - 100, cy = gy*fy, r = 22*k*sc;
    const cim = sim('cloud'); if(cim){ const cw = r*4.4, ch = cw*cim.naturalHeight/cim.naturalWidth; ctx.globalAlpha = 1 - night*.45; ctx.drawImage(cim, cx - r*.6, cy - ch*.6, cw, ch); ctx.globalAlpha = 1; return; }
    ctx.fillStyle = mix('#ffffff', '#6270b8', night*.8); ctx.strokeStyle = 'rgba(43,33,64,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.arc(cx + r*1.1, cy - r*.45, r*1.15, 0, 7); ctx.arc(cx + r*2.3, cy, r*.9, 0, 7); ctx.rect(cx, cy, r*2.3, r*.9); ctx.fill(); };
  cl(0, .1, .16, 1); cl(1, .55, .3, .8); cl(2, .85, .1, .7);
  const mt = (off, col, hgt, sp, pk) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, gy); const sh = (d*sp) % pk; for(let x = -pk; x <= W + pk; x += pk/2){ const i = Math.round((x + sh)/(pk/2)); ctx.lineTo(x - sh + pk/2, gy - hgt*(i % 2 ? .55 : 1)*(0.8 + .2*Math.sin(i*1.7))); } ctx.lineTo(W + pk, gy); ctx.closePath(); ctx.fill(); };
  mt(0, mix('#b7c8e6', '#2c3478', night), 170*k, .08, 180*kw); mt(0, mix('#8fb7a1', '#233063', night), 110*k, .16, 140*kw);
  // ground that slides past
  const gg = ctx.createLinearGradient(0, gy, 0, Hh); gg.addColorStop(0, mix('#6fc45a', '#2c5a3d', night*.8)); gg.addColorStop(1, mix('#3f9a44', '#1c3d2c', night*.8)); ctx.fillStyle = gg; ctx.fillRect(0, gy, W, Hh - gy);
  ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.08)'; const st = 46*kw; for(let x = -((d*1.0)%(st*2)); x < W; x += st*2) ctx.fillRect(x, gy, st, Hh - gy);
  // the pillars
  F.cols.forEach(c => drawColumn(ctx, g, c, night));
  // golden feathers waiting in the gaps
  F.cols.forEach(c => { if(c.ft && !c.ft.got){ const fx = c.x + c.w/2, fy = c.ft.y + Math.sin(t*3 + c.ft.ph)*5*k; ctx.save(); ctx.translate(fx, fy); ctx.rotate(Math.sin(t*2 + c.ft.ph)*.3 - .5);
      const gl = ctx.createRadialGradient(0, 0, 2, 0, 0, 26*k); gl.addColorStop(0, 'rgba(255,230,120,.6)'); gl.addColorStop(1, 'rgba(255,230,120,0)'); ctx.fillStyle = gl; ctx.fillRect(-28*k, -28*k, 56*k, 56*k);
      const fim = sim('feather'); if(fim){ const fh = 40*k, fw = fh*fim.naturalWidth/fim.naturalHeight; ctx.rotate(.5); ctx.drawImage(fim, -fw/2, -fh/2, fw, fh); ctx.restore(); return; }
      ctx.fillStyle = '#ffd93d'; ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 14*k); ctx.bezierCurveTo(-11*k, 4*k, -9*k, -10*k, 0, -16*k); ctx.bezierCurveTo(9*k, -10*k, 11*k, 4*k, 0, 14*k); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 16*k); ctx.lineTo(0, -12*k); ctx.stroke(); ctx.restore(); } });
  drawBird(ctx, g, bx, F.y, t);
  drawFX(dt);
  ctx.restore();
  if(F.flash > 0){ ctx.fillStyle = `rgba(255,255,255,${F.flash*.35})`; ctx.fillRect(0, 0, W, Hh); } }

function drawColumnImg(ctx, g, c, night){
  const top = sim('col-top'), bot = sim('col-bot'); if(!top || !bot) return false;
  const {gy} = g, w = c.w*1.3, x = c.x + c.w/2 - w/2, s = w/top.naturalWidth, gT = c.gy - c.gap/2, gB = c.gy + c.gap/2;
  if(night > .02) ctx.filter = `brightness(${(1 - night*.45).toFixed(2)}) saturate(${(1 - night*.3).toFixed(2)})`;
  // three slices: [y0, y1) of the piece drawn into [d0, d1) on the screen
  const slice = (im, y0, y1, d0, d1) => { if(d1 - d0 < 1) return; ctx.drawImage(im, 0, y0, im.naturalWidth, y1 - y0, x, d0, w, d1 - d0); };
  const th = top.naturalHeight, capT = th*.37, slabT = th*.1;          // hanging pillar: plain slab on top, shaft, scrolled capital facing the gap
  slice(top, th - capT, th, gT - capT*s, gT); slice(top, slabT, th - capT, -4, gT - capT*s); 
  const bh = bot.naturalHeight, capB = bh*.37, baseB = bh*.16;         // standing pillar: capital facing the gap, shaft, base on the ground
  slice(bot, 0, capB, gB, gB + capB*s); slice(bot, capB, bh - baseB, gB + capB*s, gy - baseB*s); slice(bot, bh - baseB, bh, gy - baseB*s, gy);
  ctx.filter = 'none'; return true; }
/* a Persepolis column: fluted sandstone shaft, a stepped capital with scrolls, a square base */
function drawColumn(ctx, g, c, night){
  if(drawColumnImg(ctx, g, c, night)) return;
  const {gy, k} = g, x = c.x, w = c.w, top = c.gy - c.gap/2, bot = c.gy + c.gap/2, capH = 30*k;
  const sand = ctx.createLinearGradient(x, 0, x + w, 0); sand.addColorStop(0, mix('#d8b878', '#4b4f86', night*.7)); sand.addColorStop(.35, mix('#f3dfb0', '#7378b4', night*.7)); sand.addColorStop(1, mix('#c4a062', '#3a3e74', night*.7));
  const shaft = (y0, y1) => { const sw = w*.74, sx = x + (w - sw)/2; ctx.fillStyle = sand; ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.fillRect(sx, y0, sw, y1 - y0); ctx.strokeRect(sx, y0, sw, y1 - y0);
    ctx.strokeStyle = 'rgba(43,33,64,.28)'; ctx.lineWidth = 1.6; for(let i = 1; i < 5; i++){ ctx.beginPath(); ctx.moveTo(sx + sw*i/5, y0); ctx.lineTo(sx + sw*i/5, y1); ctx.stroke(); } };
  const block = (bx, by, bw, bh, col) => { ctx.fillStyle = col || sand; ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.fillRect(bx, by, bw, bh); ctx.strokeRect(bx, by, bw, bh); };
  const scroll = (cx, cy, r) => { ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); for(let a = 0; a < 9; a += .3){ const rr = r*(1 - a/11); ctx.lineTo(cx + Math.cos(a)*rr, cy + Math.sin(a)*rr); } ctx.stroke(); };
  // upper pillar hangs from the sky: shaft, then its capital faces the gap
  shaft(-10, top - capH); block(x - w*.1, top - capH, w*1.2, capH*.45); block(x - w*.2, top - capH*.55, w*1.4, capH*.55, mix('#f1c75a', '#6b6a9a', night*.6));
  scroll(x - w*.02, top - capH*.28, 6*k); scroll(x + w*1.02, top - capH*.28, 6*k);
  // lower pillar stands on the earth
  block(x - w*.2, bot, w*1.4, capH*.55, mix('#f1c75a', '#6b6a9a', night*.6)); block(x - w*.1, bot + capH*.55, w*1.2, capH*.45); shaft(bot + capH, gy);
  scroll(x - w*.02, bot + capH*.28, 6*k); scroll(x + w*1.02, bot + capH*.28, 6*k);
  block(x - w*.12, gy - capH*.45, w*1.24, capH*.45);
  ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(x + w*.18, -10, 4, top - capH + 10); ctx.fillRect(x + w*.18, bot + capH, 4, gy - bot - capH); }

/* hand-painted pieces (img/sim/*.webp). Each drawing below falls back to the code-drawn version until they load. */
const SIMG = {};
const sim = n => { let im = SIMG[n]; if(!im){ im = SIMG[n] = new Image(); im.src = `img/sim/${n}.webp`; } return im.complete && im.naturalWidth ? im : null; };
['head', 'body', 'tail1', 'tail2', 'wing-near', 'wing-far', 'col-top', 'col-bot', 'feather', 'cloud'].forEach(sim);
/* joints on the pieces, in their own pixels */
const SJ = {body:[109, 92], neck:[178, 30], headNeck:[80, 196], tail:[14, 108], shoulder:[118, 74], farShoulder:[132, 70],
  wingNear:[14, 66], wingFar:[14, 60], tail1:[12, 34], tail2:[10, 26]};
function drawBirdImg(ctx, g, x, y, t){
  const P = ['head', 'body', 'tail1', 'tail2', 'wing-near', 'wing-far'].map(sim); if(P.some(p => !p)) return false;
  const [hd, bd, t1, t2, wn, wf] = P, sc = .27*g.k, wingA = clamp(F.uS, -1, 1);
  const B = (px, py) => ({x:(px - SJ.body[0])*sc, y:(py - SJ.body[1])*sc});          // a point on the body, in the bird's own frame
  const put = (im, jx, jy, at, ang, flip) => { ctx.save(); ctx.translate(at.x, at.y); ctx.rotate(ang); if(flip) ctx.scale(-1, 1); ctx.drawImage(im, -jx*sc, -jy*sc, im.naturalWidth*sc, im.naturalHeight*sc); ctx.restore(); };
  ctx.save(); ctx.translate(x, y); ctx.rotate(F.tilt*.55);
  const gl = ctx.createRadialGradient(0, 0, 4, 0, 0, 60*g.k); gl.addColorStop(0, 'rgba(255,238,150,.42)'); gl.addColorStop(1, 'rgba(255,238,150,0)'); ctx.fillStyle = gl; ctx.fillRect(-70*g.k, -70*g.k, 140*g.k, 140*g.k);
  // far wing a beat behind the near one, then the two long plumes, the body, the head, the near wing
  put(wf, SJ.wingFar[0], SJ.wingFar[1], B(...SJ.farShoulder), wingA*.85 + .15, true);
  const tw = Math.sin(t*5)*.12 - F.tilt*.3;
  put(t2, SJ.tail2[0], SJ.tail2[1], B(SJ.tail[0] + 6, SJ.tail[1] - 6), -.25 + tw*.8, true);
  put(t1, SJ.tail1[0], SJ.tail1[1], B(...SJ.tail), .12 + tw, true);
  put(bd, SJ.body[0], SJ.body[1], {x:0, y:0}, 0);
  put(hd, SJ.headNeck[0], SJ.headNeck[1], B(...SJ.neck), Math.sin(t*2.2)*.04 + F.tilt*-.25);
  put(wn, SJ.wingNear[0], SJ.wingNear[1], B(...SJ.shoulder), wingA*.95 + .08, true);
  ctx.restore(); return true; }
/* the Simorgh: turquoise body, a golden crest, long tail plumes, and wings that copy the child's arms */
function drawBird(ctx, g, x, y, t){
  const {k} = g, s = k*1.0; if(F.inv > 0 && F.hearts > 0 && Math.floor(t*14) % 2) return;
  if(drawBirdImg(ctx, g, x, y, t)) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(F.tilt*.55); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const gl = ctx.createRadialGradient(0, 0, 4, 0, 0, 52*s); gl.addColorStop(0, 'rgba(255,238,150,.45)'); gl.addColorStop(1, 'rgba(255,238,150,0)'); ctx.fillStyle = gl; ctx.fillRect(-60*s, -60*s, 120*s, 120*s);
  const wingA = clamp(F.uS, -1, 1), fly = F.started ? 1 : .6;
  // tail plumes
  [['#1fc7b6', -14, 0], ['#14a3c9', -4, 10], ['#ffc83d', 8, -8]].forEach(([col, off, dl], i) => {
    ctx.strokeStyle = INK; ctx.lineWidth = 7*s + 3; ctx.beginPath(); const sway = Math.sin(t*5 + i*1.4)*6*s + F.tilt*-20*s, tx = -66*s - dl*s;
    ctx.moveTo(-14*s, 4*s); ctx.bezierCurveTo(-34*s, off*s + sway*.6, tx + 14*s, off*s*1.4 + sway, tx, off*s*1.6 + sway*1.3); ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = 7*s; ctx.stroke();
    ctx.fillStyle = '#ffd93d'; ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(tx, off*s*1.6 + sway*1.3, 6*s, 4.4*s, 0, 0, 7); ctx.fill(); ctx.stroke(); });
  // the far wing, darker, a step behind
  wing(ctx, s, wingA*.9 - .08, '#0d8794', '#ffc83d', -6*s, -2*s, .75);
  // body
  const bg = ctx.createLinearGradient(0, -18*s, 0, 20*s); bg.addColorStop(0, '#26d3c1'); bg.addColorStop(1, '#0e8f9c');
  ctx.fillStyle = bg; ctx.strokeStyle = INK; ctx.lineWidth = 2.8; ctx.beginPath(); ctx.ellipse(0, 2*s, 25*s, 17*s, -.08, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#c7f7ea'; ctx.beginPath(); ctx.ellipse(3*s, 9*s, 17*s, 8*s, -.05, 0, 7); ctx.fill();
  // head, crest, beak, eye
  ctx.fillStyle = '#26d3c1'; ctx.beginPath(); ctx.arc(20*s, -9*s, 11*s, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#ffc83d'; [[-12, -8, 1.3], [-6, -6, 1], [-17, -2, 1.5]].forEach(([dx, dy, l], i) => { ctx.beginPath(); ctx.moveTo(15*s, -17*s); ctx.quadraticCurveTo((dx - 2)*s + 14*s, (dy - 20 - i)*s, (dx*l - 4)*s + 12*s, (dy - 12)*s - 6*s + Math.sin(t*6 + i)*1.5*s); ctx.quadraticCurveTo((dx + 3)*s + 14*s, (dy - 10)*s - 6*s, 19*s, -17*s); ctx.fill(); ctx.stroke(); });
  ctx.fillStyle = '#ff9d2e'; ctx.beginPath(); ctx.moveTo(29*s, -11*s); ctx.lineTo(41*s, -7*s); ctx.lineTo(29*s, -3*s); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(24*s, -12*s, 4.2*s, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(25.2*s, -11.6*s, 2*s, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,120,140,.5)'; ctx.beginPath(); ctx.arc(21*s, -4*s, 3*s, 0, 7); ctx.fill();
  // the near wing in front
  wing(ctx, s, wingA, '#19b9a8', '#ffc83d', -2*s, -5*s, 1);
  ctx.restore(); }

/* a fan of six feathers hinged at the shoulder; wingA −1 = hands low … +1 = hands high (wing up) */
function wing(ctx, s, a, col, tip, sx, sy, sc){
  ctx.save(); ctx.translate(sx, sy); const base = Math.PI + a*1.1 + .12;              // pointing back; swings up when the hands are up
  for(let i = 5; i >= 0; i--){
    const spread = (i - 2.5)*.15, len = (44 - i*2.2)*s*sc, wd = (11 - i*.5)*s*sc, bend = a*.12*(i + 1);
    ctx.save(); ctx.rotate(base + spread + bend); ctx.fillStyle = i % 2 ? col : tip; ctx.strokeStyle = INK; ctx.lineWidth = 2.3;
    ctx.beginPath(); ctx.moveTo(0, -wd*.35); ctx.quadraticCurveTo(len*.55, -wd*1.1, len, -wd*.3); ctx.quadraticCurveTo(len*1.04, 0, len, wd*.3); ctx.quadraticCurveTo(len*.55, wd*.9, 0, wd*.35); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(4*s, 0); ctx.lineTo(len*.9, 0); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

function fIcon(){
  return `<svg viewBox="0 0 96 96" aria-hidden="true"><defs><linearGradient id="sky-fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4aa8f0"/><stop offset="1" stop-color="#ffe9c4"/></linearGradient><clipPath id="cl-fl"><rect width="96" height="96" rx="20"/></clipPath></defs>
    <g clip-path="url(#cl-fl)"><rect width="96" height="96" fill="url(#sky-fl)"/><circle cx="76" cy="18" r="8" fill="#ffe27a" stroke="#2b2140" stroke-width="2"/>
    <g stroke="#2b2140" stroke-width="2.2" stroke-linejoin="round"><rect x="62" y="-4" width="16" height="30" fill="#e8cf9c"/><rect x="58" y="22" width="24" height="9" fill="#f1c75a"/><rect x="58" y="62" width="24" height="9" fill="#f1c75a"/><rect x="62" y="71" width="16" height="30" fill="#e8cf9c"/><rect x="12" y="70" width="16" height="30" fill="#e8cf9c"/><rect x="8" y="62" width="24" height="9" fill="#f1c75a"/></g>
    <rect y="84" width="96" height="14" fill="#5fb85a"/><path d="M0 84H96" stroke="#2b2140" stroke-width="2.5"/>
    <path d="M12 46 Q22 36 34 44 Q24 46 12 46Z" fill="#14a3c9" stroke="#2b2140" stroke-width="2"/><path d="M8 54 Q20 44 36 50 Q22 56 8 54Z" fill="#ffc83d" stroke="#2b2140" stroke-width="2"/>
    <ellipse cx="44" cy="52" rx="15" ry="10.5" transform="rotate(-8 44 52)" fill="#1fc7b6" stroke="#2b2140" stroke-width="2.6"/><ellipse cx="46" cy="57" rx="10" ry="5" fill="#c7f7ea"/>
    <path d="M40 48 Q26 22 14 30 Q24 30 28 38 Q18 30 12 40 Q26 36 38 52Z" fill="#19b9a8" stroke="#2b2140" stroke-width="2.4" stroke-linejoin="round"/><path d="M26 38 Q34 36 40 49" fill="none" stroke="#ffc83d" stroke-width="2.5"/>
    <circle cx="60" cy="44" r="7" fill="#26d3c1" stroke="#2b2140" stroke-width="2.4"/><path d="M66 43 L74 46 L66 49Z" fill="#ff9d2e" stroke="#2b2140" stroke-width="1.8" stroke-linejoin="round"/><path d="M57 38 Q52 30 48 33 M59 38 Q58 28 53 28" fill="none" stroke="#ffc83d" stroke-width="3" stroke-linecap="round"/>
    <circle cx="62" cy="42.5" r="2.6" fill="#fff" stroke="#2b2140" stroke-width="1.4"/><circle cx="62.8" cy="42.8" r="1.2" fill="#2b2140"/></g>
    <rect x="1.5" y="1.5" width="93" height="93" rx="20" fill="none" stroke="#2b2140" stroke-width="3"/></svg>`; }

A_.register('flap', {
  name:'پرواز سیمرغ', short:'پرواز', unit:'امتیاز', music:'flap', icon:fIcon,
  how:'بازوهایت را مثل بال از بالا به پایین بیاور تا سیمرغ بالا برود. از میانِ ستون‌ها بگذر و پرهای طلایی را بردار!',
  howSenior:'بازوها را آرام مثل بال بالا و پایین ببرید تا سیمرغ بالا برود. دست‌ها را باز نگه دارید تا آرام پایین بیاید.',
  reset:fReset, frame:fFrame });
window.HKA_FL = {F, FAUD, geoF};
})();
