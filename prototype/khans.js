/* هفت‌خوانِ حرکت — خوان‌های ۱ و ۲: درس‌های ۱ تا ۴ کتاب (ص ۹ تا ۳۱).
   این فایل بعد از index.html بار می‌شود و از window.HK استفاده می‌کند. هر درس داده است (LESSONS)
   و چند صفحهٔ مشترک آن را نشان می‌دهند: صفحهٔ خوان، انتخابِ بازیِ امروز، بازی، قصه، بازیِ خانوادگی
   و «بازی کن و ستاره بگیر». خوانِ ۳ (تعادل) همان صفحه‌های قدیمیِ index.html را دارد. */
(function(){
const H = window.HK; if(!H) return;
const {fa, secs, $, $$, sfx, voice, C} = H;
const S = () => H.state;
const LS = n => S().L[n];
const DAYW = ['اول','دوم','سوم'];
const esc = t => String(t).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ===================================================================== art
   Images that have arrived from the illustrator (prompts 19–28). Until a name is listed here, a simple
   figure drawn in code stands in for it, so every screen works before the art does. */
const READY = new Set([          // girl move frames, without the "girl-" prefix
  'm1-legL','m1-legR','m1-headR','m1-headL','m1-headD','m1-headU','m1-armU','m1-armF','m1-armS','m1-armD',
  'm1-hitHead','m1-hitHand','m1-hitKnee','m1-hitFoot','m1-hitAll','m1-squat','m1-nose','m2-stick','m2-stickBook','m2-stickKick',
  'm2-standOk', 'm2-standBad', 'm2-sitOk', 'm2-sitBad', 'm2-bagOk', 'm2-bagBad', 'm2-writeOk', 'm2-writeBad', 'm3-walkA', 'm3-walkB',
  'm3-runA', 'm3-runB', 'm3-roo-a', 'm3-roo-b', 'm3-frog-a', 'm3-frog-b', 'm3-hen-a', 'm3-hen-b', 'm3-gorilla-a', 'm3-gorilla-b',
  'm3-cat-a', 'm3-cat-b', 'm3-snake-a', 'm3-snake-b', 'm4-circle-a', 'm4-circle-b', 'm4-toe-a', 'm4-toe-b', 'm4-hug-a', 'm4-hug-b',
  'm4-lunge-a', 'm4-lunge-b', 'm4-plank-a', 'm4-plank-b', 'm4-crab-a', 'm4-crab-b', 'm4-spin-a', 'm4-spin-b', 'm4-feetStack', 'm4-feetUp']);
const READY_BOY = new Set([      // the same for the boy (prompts 19–23 so far; m1-armF is never shown)
  'm1-legR', 'm1-legL', 'm1-headL', 'm1-headR', 'm1-headD', 'm1-headU', 'm1-armU', 'm1-armS', 'm1-armD', 'm1-hitHead',
  'm1-hitHand', 'm1-hitKnee', 'm1-hitFoot', 'm1-hitAll', 'm1-squat', 'm1-nose', 'm2-stick', 'm2-stickBook', 'm2-stickKick', 'm2-standOk',
  'm2-standBad', 'm2-sitOk', 'm2-sitBad', 'm2-bagOk', 'm2-bagBad', 'm2-writeOk', 'm2-writeBad', 'm3-walkA', 'm3-walkB', 'm3-runA',
  'm3-runB', 'm3-roo-a', 'm3-roo-b', 'm3-frog-a', 'm3-frog-b', 'm3-hen-a', 'm3-hen-b', 'm3-gorilla-a', 'm3-gorilla-b', 'm3-cat-a',
  'm3-cat-b', 'm3-snake-a', 'm3-snake-b']);
const READY_ART = new Set([       // other img/ names: story characters, animals, Yuzi's new poses
  'story-mom','story-aunt','story-rabbit','story-frog','story-uncle','animal-gorilla','animal-hen','animal-kangaroo','animal-snake',
  'yuzi-1-careful','yuzi-1-rules','yuzi-1-drink','yuzi-1-listen','yuzi-1-warmup','yuzi-1-tidy']);

/* stand-in figures: a stick child in the hero's colours, one pose per frame name */
const B = {h:[60,22],n:[60,34],s1:[49,39],s2:[71,39],e1:[45,58],e2:[75,58],w1:[44,76],w2:[76,76],p1:[53,80],p2:[67,80],k1:[53,109],k2:[67,109],f1:[52,140],f2:[68,140]};
const SD = {side:1,h:[56,22],n:[59,34],s1:[59,39],s2:[61,39],e1:[56,58],e2:[62,58],w1:[55,76],w2:[63,76],p1:[59,80],p2:[61,80],k1:[57,109],k2:[62,109],f1:[54,140],f2:[59,140]};
const P = (base, o={}) => Object.assign({}, base, o);
const lift = (p, dy, keys) => { const q = {...p}; (keys || Object.keys(p)).forEach(k=>{ if(Array.isArray(q[k]) && typeof q[k][0]==='number') q[k] = [q[k][0], q[k][1]-dy]; }); return q; };
const ARMS_OUT = {e1:[38,52], w1:[28,60], e2:[82,52], w2:[92,60]};
const STICK = P(B, {e1:[40,30], w1:[34,38], e2:[80,30], w2:[86,38], props:[{t:'stick'}]});
const SIT = {side:1, h:[62,40], n:[64,52], s1:[64,57], s2:[66,57], e1:[62,74], e2:[64,74], w1:[52,90], w2:[54,90], p1:[66,96], p2:[67,96], k1:[42,96], k2:[44,96], f1:[40,140], f2:[44,140], props:[{t:'chair', x:62, y:100}]};
const SITBAD = {side:1, sad:1, h:[52,58], n:[60,63], s1:[62,67], s2:[64,67], e1:[58,82], e2:[60,82], w1:[50,94], w2:[52,94], p1:[72,102], p2:[73,102], k1:[46,98], k2:[48,98], f1:[42,140], f2:[46,140], props:[{t:'chair', x:62, y:104}]};
const GOR = {h:[60,34], n:[60,46], s1:[47,52], s2:[73,52], e1:[40,78], w1:[40,104], e2:[80,78], w2:[80,104], p1:[52,94], p2:[68,94], k1:[40,114], k2:[80,114], f1:[42,140], f2:[78,140]};
const CAT = {side:1, h:[30,96], n:[38,102], s1:[42,104], s2:[44,104], e1:[38,122], w1:[32,140], e2:[44,122], w2:[46,140], p1:[80,104], p2:[82,104], k1:[78,138], k2:[86,138], f1:[100,140], f2:[106,140]};
const SNAKE = {side:1, h:[20,128], n:[30,132], s1:[34,132], s2:[35,132], e1:[44,136], w1:[56,137], e2:[46,136], w2:[58,137], p1:[74,134], p2:[75,134], k1:[90,136], k2:[91,136], f1:[106,137], f2:[107,137]};
const HIPS = {e1:[40,64], w1:[52,79], e2:[80,64], w2:[68,79]};
const PLANK = {side:1, h:[24,100], n:[32,106], s1:[36,108], s2:[37,108], e1:[36,124], w1:[36,140], e2:[38,124], w2:[38,140], p1:[74,114], p2:[75,114], k1:[92,124], k2:[93,124], f1:[110,138], f2:[111,138], props:[{t:'cup', x:20, y:134}]};
const CRAB = {side:1, look:'u', h:[80,92], n:[74,100], s1:[71,104], s2:[72,104], e1:[78,122], w1:[84,140], e2:[79,122], w2:[85,140], p1:[46,104], p2:[47,104], k1:[30,108], k2:[31,108], f1:[30,140], f2:[34,140]};
const SPIN = {side:1, h:[28,124], n:[34,118], s1:[36,114], s2:[37,114], e1:[33,128], w1:[30,140], e2:[34,128], w2:[32,140], p1:[64,88], p2:[65,88], k1:[80,112], k2:[81,112], f1:[96,128], f2:[97,128], props:[{t:'cushion', x:96, y:134}]};
const POSES = {
  stand: B,
  'm1-legL': P(B, {k2:[69,86], f2:[71,113], w1:[40,74], w2:[80,74]}),
  'm1-legR': P(B, {k1:[51,86], f1:[49,113], w1:[40,74], w2:[80,74]}),
  'm1-headR': P(B, {h:[57,22], look:'l'}), 'm1-headL': P(B, {h:[63,22], look:'r'}),
  'm1-headD': P(B, {h:[60,26], look:'d'}), 'm1-headU': P(B, {h:[60,20], look:'u'}),
  'm1-armU': P(B, {e1:[47,22], w1:[49,6], e2:[73,22], w2:[71,6]}),
  'm1-armF': P(B, {e1:[46,47], w1:[52,47], e2:[74,47], w2:[68,47]}),
  'm1-armS': P(B, {e1:[33,39], w1:[17,39], e2:[87,39], w2:[103,39]}),
  'm1-armD': P(B, {e1:[48,59], w1:[48,79], e2:[72,59], w2:[72,79]}),
  'm1-hitHead': lift(P(B, {look:'u', ...ARMS_OUT}), 8),
  'm1-hitHand': P(B, {e2:[78,24], w2:[86,8]}),
  'm1-hitKnee': P(B, {k2:[70,84], f2:[72,110], ...ARMS_OUT}),
  'm1-hitFoot': P(B, {k2:[72,104], f2:[90,118], ...ARMS_OUT}),
  'm1-hitAll': lift(P(B, {e2:[78,26], w2:[86,12], k1:[50,88], f1:[46,112], e1:[38,52], w1:[30,62]}), 5),
  'm1-squat': {h:[60,52], n:[60,64], s1:[49,68], s2:[71,68], e1:[47,82], w1:[54,80], e2:[73,82], w2:[66,80], p1:[52,104], p2:[68,104], k1:[42,112], k2:[78,112], f1:[48,140], f2:[72,140]},
  'm1-nose': P(B, {e2:[76,46], w2:[62,25]}),
  'm2-stick': STICK,
  'm2-stickBook': {h:[60,34], n:[60,46], s1:[49,51], s2:[71,51], e1:[40,42], w1:[34,50], e2:[80,42], w2:[86,50], p1:[53,92], p2:[67,92], k1:[47,116], k2:[73,116], f1:[52,140], f2:[68,140], props:[{t:'stick'},{t:'book'}]},
  'm2-stickKick': P(STICK, {k2:[72,104], f2:[88,120]}),
  'm2-standOk': SD,
  'm2-standBad': P(SD, {sad:1, h:[48,32], n:[54,40], s1:[56,44], s2:[58,44], e1:[54,62], e2:[58,62], w1:[54,80], w2:[58,80], p1:[63,82], p2:[64,82]}),
  'm2-sitOk': SIT, 'm2-sitBad': SITBAD,
  'm2-bagOk': P(SD, {props:[{t:'bag', x:62, y:40, w:13, h:26}]}),
  'm2-bagBad': P(SD, {sad:1, h:[60,23], n:[62,35], s1:[62,40], s2:[63,40], e2:[67,58], w2:[69,72], props:[{t:'bag', x:66, y:72, w:13, h:24}]}),
  'm2-writeOk': P(SIT, {e1:[56,76], w1:[42,86], e2:[58,76], w2:[44,86], props:[{t:'chair', x:62, y:100},{t:'desk', x:12, y:88}]}),
  'm2-writeBad': P(SITBAD, {h:[42,78], n:[52,74], s1:[58,74], s2:[60,74], e1:[48,86], w1:[38,88], e2:[50,86], w2:[40,88], props:[{t:'chair', x:62, y:104},{t:'desk', x:12, y:90}]}),
  'm3-walkA': P(SD, {k1:[54,109], f1:[46,140], k2:[64,109], f2:[70,140], e1:[62,57], w1:[66,74], e2:[54,57], w2:[50,74]}),
  'm3-walkB': P(SD, {k1:[64,109], f1:[70,140], k2:[54,109], f2:[46,140], e1:[54,57], w1:[50,74], e2:[62,57], w2:[66,74]}),
  'm3-runA': {side:1, h:[52,24], n:[56,35], s1:[57,40], s2:[58,40], e1:[50,52], w1:[42,44], e2:[66,56], w2:[70,68], p1:[61,80], p2:[62,80], k1:[46,88], f1:[50,112], k2:[68,108], f2:[80,126]},
  'm3-runB': {side:1, h:[52,24], n:[56,35], s1:[57,40], s2:[58,40], e1:[66,56], w1:[70,68], e2:[50,52], w2:[42,44], p1:[61,80], p2:[62,80], k1:[68,108], f1:[80,126], k2:[46,88], f2:[50,112]},
  'm3-roo-a': {side:1, h:[50,50], n:[55,60], s1:[57,64], s2:[58,64], e1:[64,78], w1:[74,86], e2:[66,78], w2:[76,86], p1:[66,98], p2:[67,98], k1:[52,112], k2:[54,112], f1:[60,140], f2:[62,140]},
  'm3-roo-b': lift(P(SD, {h:[56,26], n:[59,38], s1:[59,43], s2:[61,43], e1:[54,26], w1:[50,12], e2:[58,26], w2:[54,12], f1:[58,138], f2:[60,138], k1:[58,110], k2:[60,110]}), 12),
  'm3-frog-a': {h:[60,70], n:[60,82], s1:[50,86], s2:[70,86], e1:[50,106], w1:[54,136], e2:[70,106], w2:[66,136], p1:[52,112], p2:[68,112], k1:[34,116], k2:[86,116], f1:[44,140], f2:[76,140]},
  'm3-frog-b': lift({h:[60,22], n:[60,34], s1:[49,39], s2:[71,39], e1:[36,26], w1:[26,12], e2:[84,26], w2:[94,12], p1:[53,80], p2:[67,80], k1:[38,96], k2:[82,96], f1:[30,116], f2:[90,116]}, 4),
  'm3-hen-a': P(B, {e1:[40,52], w1:[50,44], e2:[80,52], w2:[70,44]}),
  'm3-hen-b': P(B, {e1:[30,40], w1:[46,42], e2:[90,40], w2:[74,42], k2:[68,90], f2:[70,116]}),
  'm3-gorilla-a': GOR,
  'm3-gorilla-b': P(GOR, {h:[60,28], n:[60,40], s1:[47,46], s2:[73,46], e1:[40,64], w1:[55,56], e2:[80,64], w2:[65,56], look:'o'}),
  'm3-cat-a': CAT, 'm3-cat-b': P(CAT, {w1:[46,140], w2:[30,140], e1:[44,122], e2:[36,122], h:[28,92]}),
  'm3-snake-a': SNAKE, 'm3-snake-b': P(SNAKE, {h:[22,104], n:[28,114], s1:[32,118], s2:[33,118], e1:[34,130], w1:[30,138], e2:[36,130], w2:[33,138]}),
  'm4-circle-a': P(B, {e1:[33,37], w1:[17,32], e2:[87,37], w2:[103,32]}),
  'm4-circle-b': P(B, {e1:[33,41], w1:[17,46], e2:[87,41], w2:[103,46]}),
  'm4-toe-a': P(B, HIPS),
  'm4-toe-b': P(lift(P(B, HIPS), 7), {f1:[52,140], f2:[68,140], tiptoe:1}),
  'm4-hug-a': B,
  'm4-hug-b': P(B, {k2:[64,66], f2:[70,96], e1:[50,64], w1:[60,70], e2:[78,62], w2:[68,70]}),
  'm4-lunge-a': P(SD, {e1:[64,60], w1:[60,76], e2:[65,60], w2:[61,76]}),
  'm4-lunge-b': {side:1, h:[60,46], n:[62,58], s1:[62,62], s2:[63,62], e1:[66,80], w1:[62,96], e2:[67,80], w2:[63,96], p1:[63,104], p2:[64,104], k1:[42,104], f1:[40,140], k2:[74,134], f2:[96,140]},
  'm4-plank-a': PLANK, 'm4-plank-b': P(PLANK, {e1:[30,118], w1:[22,124], props:[{t:'cup', x:22, y:118}]}),
  'm4-crab-a': CRAB, 'm4-crab-b': P(CRAB, {w1:[76,140], f1:[22,140], k1:[24,108]}),
  'm4-spin-a': SPIN, 'm4-spin-b': P(SPIN, {w1:[22,140], e1:[27,128]}),
  'm4-feetStack': {side:1, h:[80,72], n:[78,84], s1:[78,88], s2:[79,88], e1:[86,106], w1:[92,124], e2:[87,106], w2:[93,124], p1:[70,124], p2:[71,124], k1:[52,104], k2:[53,104], f1:[34,110], f2:[35,112], props:[{t:'cushion', x:34, y:103, s:.7},{t:'cushion', x:28, y:134}]},
  'm4-feetUp': {side:1, h:[96,134], n:[86,134], s1:[82,134], s2:[83,134], e1:[92,140], w1:[100,140], e2:[93,140], w2:[101,140], p1:[56,134], p2:[57,134], k1:[48,110], k2:[49,110], f1:[44,84], f2:[45,84], props:[{t:'toy', x:44, y:76}]}
};
const svgURI = svg => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
function stickSVG(name){
  const p = POSES[name] || B, boy = H.kid() === 'boy';
  const jacket = boy ? C.saffron : C.fay, pants = C.lapis, skin = '#e8b48a', ink = C.ink, shoe = C.anar;
  const pl = (pts, col, w) => { const d = pts.map(q=>q.join(',')).join(' ');
    return `<polyline points="${d}" fill="none" stroke="${ink}" stroke-width="${w+4}" stroke-linecap="round" stroke-linejoin="round"/><polyline points="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const mid = (a,b) => [(a[0]+b[0])/2, (a[1]+b[1])/2];
  const sh = mid(p.s1, p.s2), hp = mid(p.p1, p.p2);
  const prop = (o, back) => {
    if(o.t==='stick' && !back) return `<line x1="${p.w1[0]-14}" y1="${p.w1[1]-2}" x2="${p.w2[0]+14}" y2="${p.w2[1]-2}" stroke="${ink}" stroke-width="6" stroke-linecap="round"/><line x1="${p.w1[0]-14}" y1="${p.w1[1]-2}" x2="${p.w2[0]+14}" y2="${p.w2[1]-2}" stroke="#b77a3d" stroke-width="3" stroke-linecap="round"/>`;
    if(o.t==='book' && !back) return `<rect x="${p.h[0]-13}" y="${p.h[1]-19}" width="26" height="6" rx="1.5" fill="#3b82c4" stroke="${ink}" stroke-width="1.8"/>`;
    if(o.t==='chair' && back) return `<g stroke="${ink}" stroke-width="2.5" stroke-linecap="round" fill="none"><path d="M${o.x-24} ${o.y}H${o.x+10}V${o.y-40}"/><path d="M${o.x-22} ${o.y}V140M${o.x+8} ${o.y}V140" stroke="#8a5a2b"/></g><rect x="${o.x-26}" y="${o.y-3}" width="38" height="6" rx="2" fill="#c9893f" stroke="${ink}" stroke-width="2"/>`;
    if(o.t==='desk' && !back) return `<rect x="${o.x}" y="${o.y}" width="34" height="6" rx="2" fill="#4fb35a" stroke="${ink}" stroke-width="2"/><path d="M${o.x+4} ${o.y+6}V140M${o.x+30} ${o.y+6}V140" stroke="${ink}" stroke-width="3"/><rect x="${o.x+8}" y="${o.y-3}" width="16" height="3" fill="#fff" stroke="${ink}" stroke-width="1"/>`;
    if(o.t==='bag' && back) return `<rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" rx="4" fill="${C.anar}" stroke="${ink}" stroke-width="2"/>`;
    if(o.t==='cushion' && !back){ const s = o.s || 1; return `<ellipse cx="${o.x}" cy="${o.y}" rx="${13*s}" ry="${5*s}" fill="#a35bc4" stroke="${ink}" stroke-width="2"/>`; }
    if(o.t==='cup' && !back) return `<path d="M${o.x-5} ${o.y-6}h10l-2 12h-6z" fill="${C.anar}" stroke="${ink}" stroke-width="1.6"/>`;
    if(o.t==='toy' && !back) return `<circle cx="${o.x}" cy="${o.y}" r="7" fill="#f2a6c8" stroke="${ink}" stroke-width="2"/><ellipse cx="${o.x-4}" cy="${o.y-9}" rx="2" ry="5" fill="#f2a6c8" stroke="${ink}" stroke-width="1.5"/><ellipse cx="${o.x+4}" cy="${o.y-9}" rx="2" ry="5" fill="#f2a6c8" stroke="${ink}" stroke-width="1.5"/>`;
    return '';
  };
  const props = p.props || [];
  const ground = Math.max(p.f1[1], p.f2[1], p.w1[1], p.w2[1]);
  const lookX = {l:-3, r:3}[p.look] || (p.side ? -4 : 0), lookY = {u:-3, d:3}[p.look] || 0;
  const [hx, hy] = p.h;
  const head = boy
    ? `<circle cx="${hx}" cy="${hy}" r="11.5" fill="${skin}" stroke="${ink}" stroke-width="2.5"/><path d="M${hx-11} ${hy-2} Q${hx-9} ${hy-14} ${hx} ${hy-13} Q${hx+10} ${hy-14} ${hx+11} ${hy-2} Q${hx+6} ${hy-8} ${hx} ${hy-8} Q${hx-6} ${hy-8} ${hx-11} ${hy-2}Z" fill="#4a2c1a" stroke="${ink}" stroke-width="2"/>`
    : `<circle cx="${hx}" cy="${hy+1}" r="13.5" fill="${jacket}" stroke="${ink}" stroke-width="2.5"/><circle cx="${hx+lookX*.6}" cy="${hy+1+lookY*.4}" r="8.6" fill="${skin}" stroke="${ink}" stroke-width="1.6"/>`;
  const ex = hx + lookX, ey = hy + 1 + lookY;
  const eyes = p.side ? `<circle cx="${ex-2}" cy="${ey-1}" r="1.5" fill="${ink}"/>` : `<circle cx="${ex-3.2}" cy="${ey-1}" r="1.5" fill="${ink}"/><circle cx="${ex+3.2}" cy="${ey-1}" r="1.5" fill="${ink}"/>`;
  const mouth = p.look==='o' ? `<ellipse cx="${ex}" cy="${ey+4}" rx="2.2" ry="2.6" fill="${ink}"/>`
    : `<path d="M${ex-3} ${ey+3.4} Q${ex} ${ey+(p.sad?2:6)} ${ex+3} ${ey+3.4}" fill="none" stroke="${ink}" stroke-width="1.5" stroke-linecap="round"/>`;
  const foot = f => p.tiptoe ? `<ellipse cx="${f[0]}" cy="${f[1]-3}" rx="3" ry="5" fill="${shoe}" stroke="${ink}" stroke-width="2"/>`
    : `<ellipse cx="${f[0] + (p.side ? -3 : 0)}" cy="${f[1]}" rx="6.5" ry="3.6" fill="${shoe}" stroke="${ink}" stroke-width="2"/>`;
  const hand = w => `<circle cx="${w[0]}" cy="${w[1]}" r="3.6" fill="${skin}" stroke="${ink}" stroke-width="1.8"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150" width="240" height="300">
    <ellipse cx="${(Math.min(p.f1[0],p.f2[0],p.w1[0])+Math.max(p.f1[0],p.f2[0],p.w2[0]))/2}" cy="${Math.min(146, ground+5)}" rx="26" ry="4" fill="#2b2140" opacity=".12"/>
    ${props.map(o=>prop(o,true)).join('')}
    ${pl([p.p2,p.k2,p.f2], pants, 8)}${pl([p.p1,p.k1,p.f1], pants, 8)}${foot(p.f2)}${foot(p.f1)}
    ${pl([sh, hp], jacket, p.side ? 15 : 19)}
    ${props.filter(o=>o.t==='stick').map(o=>prop(o,false)).join('')}
    ${pl([p.s2,p.e2,p.w2], jacket, 7)}${pl([p.s1,p.e1,p.w1], jacket, 7)}${hand(p.w2)}${hand(p.w1)}
    ${pl([sh, p.n], skin, 6)}${head}${eyes}${mouth}
    ${props.filter(o=>o.t!=='stick').map(o=>prop(o,false)).join('')}
  </svg>`;
  return svgURI(svg);
}
/* stand-ins for the new story characters and animals (prompts 26 and 27) */
const ART_FALLBACK = {'story-mom':'img/mom.webp', 'story-aunt':'img/grandma.webp', 'story-uncle':'img/grandpa.webp', 'animal-cat':'img/cat-greet.webp'};
function animalSVG(kind){
  const ink = C.ink, s = (b) => svgURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="240" height="240"><g stroke="${ink}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${b}</g></svg>`);
  const eyes = (x,y,d=10) => `<circle cx="${x-d/2}" cy="${y}" r="3" fill="${ink}" stroke="none"/><circle cx="${x+d/2}" cy="${y}" r="3" fill="${ink}" stroke="none"/>`;
  if(kind==='rabbit') return s(`<ellipse cx="48" cy="22" rx="7" ry="20" fill="#fff"/><ellipse cx="68" cy="22" rx="7" ry="20" fill="#fff"/><ellipse cx="58" cy="88" rx="26" ry="24" fill="#f6a8c8"/><circle cx="58" cy="50" r="20" fill="#fff"/>${eyes(58,48)}<path d="M54 57q4 4 8 0" fill="none"/><ellipse cx="40" cy="112" rx="10" ry="5" fill="#fff"/><ellipse cx="76" cy="112" rx="10" ry="5" fill="#fff"/>`);
  if(kind==='frog') return s(`<ellipse cx="60" cy="84" rx="32" ry="24" fill="#f3c230"/><ellipse cx="60" cy="56" rx="30" ry="20" fill="#5bbf4f"/><circle cx="44" cy="40" r="10" fill="#5bbf4f"/><circle cx="76" cy="40" r="10" fill="#5bbf4f"/>${eyes(44,40,0)}${eyes(76,40,0)}<path d="M46 62q14 10 28 0" fill="none"/><path d="M30 104l-12 8M90 104l12 8" />`);
  if(kind==='kangaroo') return s(`<path d="M86 96q20 4 28 -8" fill="none" stroke-width="8"/><ellipse cx="66" cy="78" rx="24" ry="30" fill="#d9965b"/><circle cx="52" cy="36" r="16" fill="#d9965b"/><ellipse cx="46" cy="18" rx="5" ry="11" fill="#d9965b"/><ellipse cx="60" cy="18" rx="5" ry="11" fill="#d9965b"/>${eyes(50,34,9)}<ellipse cx="70" cy="86" rx="10" ry="12" fill="#f1c99c"/><ellipse cx="54" cy="110" rx="14" ry="5" fill="#d9965b"/>`);
  if(kind==='gorilla') return s(`<ellipse cx="60" cy="80" rx="34" ry="30" fill="#4b4453"/><circle cx="60" cy="38" r="20" fill="#4b4453"/><ellipse cx="60" cy="44" rx="13" ry="10" fill="#b9a7a0"/>${eyes(60,34,12)}<circle cx="46" cy="70" r="9" fill="#6c6475"/><circle cx="74" cy="70" r="9" fill="#6c6475"/>`);
  if(kind==='hen') return s(`<ellipse cx="62" cy="76" rx="32" ry="26" fill="#fff"/><circle cx="44" cy="44" r="16" fill="#fff"/><path d="M38 28q4 -10 8 -2q4 -8 8 2" fill="${C.anar}"/><path d="M28 46l-10 4 10 4z" fill="${C.saffron}"/>${eyes(44,42,0)}<path d="M86 64q12 -8 14 6" fill="#fff"/><path d="M52 102v12M70 102v12" stroke="${C.saffron}" stroke-width="4"/>`);
  if(kind==='snake') return s(`<path d="M14 96q16 -22 32 0t32 0t28 -10" fill="none" stroke="#5bbf4f" stroke-width="16"/><circle cx="104" cy="82" r="12" fill="#5bbf4f"/>${eyes(104,78,8)}<path d="M114 88l8 4" stroke="${C.anar}"/>`);
  return null;
}
function artSrc(name){
  if(name.startsWith('kid:')) return figSrc(name.slice(4));
  if(READY_ART.has(name)) return `img/${name}.webp`;
  if(ART_FALLBACK[name]) return ART_FALLBACK[name];
  const a = name.startsWith('story-') || name.startsWith('animal-') ? animalSVG(name.split('-')[1]) : null;
  return a || `img/${name}.webp`;
}
function figSrc(name){
  const boy = H.kid() === 'boy';
  if(name === 'stand') return `img/${H.kid()}-idle.webp`;
  if(name === 'cheer') return `img/${H.kid()}-cheer.webp`;
  if(boy && READY_BOY.has(name)) return `img/boy-${name}.webp`;
  if(READY.has(name)) return `img/girl-${name}.webp`;   // as in khan 3, the boy sees the girl's frames until his own arrive
  return stickSVG(name);
}
const yuziArt = pose => READY_ART.has(`yuzi-1-${pose}`) ? `img/yuzi-1-${pose}.webp` : H.yz('talk');

/* ===================================================================== the book, lessons 1–4 */
const LESSONS = {
  1: {n:1, khan:0, title:'درکِ حرکت', pages:'۹ تا ۱۳', word:'حرکت', count:3,
    story:{name:'تاپ‌تاپو', src:'ص ۱۰', pages:[
      {who:'مامانِ تاپ‌تاپو', art:['story-mom','kid:stand'],
       t:'تاپ‌تاپو و مامانش به پارک رفتند. تاپ‌تاپو دوست داشت زودتر به زمین بازی برسد. مامان تاپ‌تاپو گفت: <q>عجله نکن. بیا تا وقتی به زمین بازی می‌رسیم، با هم بازی کنیم. اول نوبت <b>حرکت</b> پاهایمان است. بایست، پای چپ بالا – پایین، پای راست بالا – پایین، پای چپ جلو، پای راست جلو، حالا برو.</q>',
       task:{type:'seq', reps:5, title:'پاهایت را مثل تاپ‌تاپو حرکت بده', figs:['m1-legL','m1-legR'],
         steps:[['legL','پای چپ بالا'],['feet','پایین'],['legR','پای راست بالا'],['feet','پایین']],
         note:'«پای چپ جلو، پای راست جلو» را هم انجام بده؛ یوزی آن را از روبه‌رو نمی‌بیند.'}},
      {who:'مامانِ تاپ‌تاپو', art:['story-mom','kid:m1-headR'],
       t:'کمی که جلوتر رفتند، مامان تاپ‌تاپو گفت: <q>حالا نوبت <b>حرکت</b> سر و گردن است. بایست، گردن به راست، گردن به چپ، سر پایین، سر بالا، نگاه به جلو، حالا برو.</q>',
       task:{type:'seq', reps:5, title:'سر و گردنت را مثل تاپ‌تاپو حرکت بده', figs:['m1-headR','m1-headD'],
         steps:[['headR','گردن به راست'],['headL','گردن به چپ'],['headD','سر پایین'],['headU','سر بالا'],['headC','نگاه به جلو']],
         note:'آرام و آهسته؛ گردن را تند نچرخان.'}},
      {who:'مامانِ تاپ‌تاپو', art:['story-mom','kid:m1-armS'],
       t:'کمی که جلوتر رفتند، مامان تاپ‌تاپو گفت: <q>حالا نوبت <b>حرکت</b> دست‌هاست. بایست، دست‌ها بالا، دست‌ها جلو، دست‌ها پهلو، دست‌ها پایین، حالا برو.</q>',
       task:{type:'seq', reps:5, title:'دست‌هایت را مثل تاپ‌تاپو حرکت بده', figs:['m1-armU','m1-armS'],
         steps:[['armU','دست‌ها بالا'],['armF','دست‌ها جلو'],['armS','دست‌ها پهلو'],['armD','دست‌ها پایین']]}},
      {who:'پایانِ قصه', art:['story-mom','kid:cheer'],
       t:'کمی که جلوتر رفتند، تاپ‌تاپو زمین بازی را دید. فوری دوید. به تاب رسید. توی تاب نشست. مامان، تاپ‌تاپو را هل داد و گفت: <q>تاب، تاب، عباسی. خدا جانم! تاپ‌تاپو را نیندازی.</q>'}],
      asks:['مامان و تاپ‌تاپو تا وقتی که به زمین بازی برسند، چه کار کردند؟']},
    play:{src:'ص ۱۱', rule:'به شکل بازی‌ها نگاه کن. یک روز درمیان یکی از آن‌ها را انجام بده.', pick:1,
      need:'یک یا دو بادکنک', yuzi:['careful','من موقع بازی کردن، مواظب وسایل اطرافم هستم.'],
      games:[
        {name:'بادکنک با سر', t:'با سرت، پشت‌سرهم به یک بادکنک ضربه بزن.', kind:'balloon', parts:['head'], balls:1, goal:10, unit:'ضربه', figs:['m1-hitHead','stand']},
        {name:'بادکنک با دست و پا', t:'با دست‌ها و پاهایت، پشت‌سرهم به یک بادکنک ضربه بزن.', kind:'balloon', parts:['hand','foot','knee'], balls:1, goal:10, unit:'ضربه', figs:['m1-hitHand','m1-hitFoot']},
        {name:'دو بادکنک', t:'با همه اندام‌هایت، پشت‌سرهم به دو بادکنک ضربه بزن.', kind:'balloon', parts:['head','hand','knee','foot'], balls:2, goal:12, unit:'ضربه', figs:['m1-hitAll','m1-hitKnee']}]},
    family:{kind:'osta', title:'اوستا', src:'ص ۱۲', yuzi:['rules','من قانون بازی را رعایت می‌کنم.'],
      intro:'دایره بزنید. یک نفر <b>اوستا</b> می‌شود و با توپ وسط می‌ایستد. اوستا فرمان می‌دهد، مثلِ «بنشین‌وپاشو»، «دست روی بینی»، «پای چپ بالا»، و بقیه انجام می‌دهند. هر کس اشتباه کند، اوستا توپ را به طرفش می‌اندازد؛ اگر توپ به او نخورد، او اوستا می‌شود.',
      cmds:[{k:'squatUp', t:'بنشین‌وپاشو', fig:'m1-squat'}, {k:'nose', t:'دست روی بینی', fig:'m1-nose'}, {k:'legL', t:'پای چپ بالا', fig:'m1-legL'},
            {k:'legR', t:'پای راست بالا', fig:'m1-legR'}, {k:'armU', t:'دست‌ها بالا', fig:'m1-armU'}, {k:'armS', t:'دست‌ها پهلو', fig:'m1-armS'}]},
    star:{kind:'cards', title:'رفتارهای درست', src:'ص ۱۳',
      t:'به رفتارهای درست در شکل نگاه کن. در طول هفته، هر بار که یکی از آن‌ها را انجام دادی، یک ستاره را رنگ کن.',
      cards:[['turn','نوبت را رعایت کردم'],['water','آب خوردم'],['help','به دوستم کمک کردم'],['trash','زباله را در سطل انداختم'],['tidy','وسایل بازی را جمع کردم'],['outside','در هوای آزاد بازی کردم']]}
  },
  2: {n:2, khan:0, title:'وضعیت‌های بدنی درست', pages:'۱۵ تا ۱۹', word:'صاف', count:3,
    story:{name:'تاپ‌تاپک', src:'ص ۱۶', pages:[
      {who:'تاپ‌تاپک', art:['kid:m2-standBad','kid:m2-sitBad'],
       t:'تاپ‌تاپک توی خانه نشسته بود و غصّه می‌خورد. چرا غصّه می‌خورد؟ چون دوستش گفته بود: <q><b>صاف</b> راه نمی‌روی و کوله‌پشتی‌ات همیشه آویزان است.</q> آن‌یکی گفته بود: <q>روی صندلی درست نمی‌نشینی و مدادت را درست در دستت نمی‌گیری.</q>'},
      {who:'مامانِ تاپ‌تاپک', art:['story-mom','kid:m2-standOk'],
       t:'مامان تاپ‌تاپک به او گفت: <q>غصّه نخور تاپ‌تاپک‌جان! عزیز مامان! به این شکل‌ها نگاه کن. مثل این شکل <b>صاف</b> بایست.</q>',
       task:{type:'hold', check:'standStraight', sec:5, title:'مثل تاپ‌تاپک درست بایست', tip:'روبه‌روی دوربین صاف بایست: شانه‌ها هم‌سطح، سر بالا، پاها کنارِ هم.'}},
      {who:'مامانِ تاپ‌تاپک', art:['story-mom','kid:m2-sitOk'],
       t:'<q>مثل این شکل روی صندلی <b>صاف</b> بنشین.</q>',
       task:{type:'hold', check:'sitStraight', sec:5, title:'مثل تاپ‌تاپک درست بنشین', tip:'روی صندلی بنشین؛ کمر صاف، پاها روی زمین. اگر دوربین کنارت باشد بهتر می‌بیند.'}},
      {who:'مامانِ تاپ‌تاپک', art:['kid:m2-bagOk','kid:m2-bagBad'],
       t:'<q>مثل این شکل کوله‌ات را درست بر روی شانه‌ات بگذار.</q>',
       task:{type:'confirm', title:'کوله‌پشتی‌ات را درست حمل کن', tip:'هر دو بند روی دو شانه. بزرگترت ببیند و تأیید کند.'}},
      {who:'مامانِ تاپ‌تاپک', art:['kid:m2-writeOk','kid:m2-writeBad'],
       t:'<q>مثل این شکل مدادت را درست در دستت بگیر و بنویس.</q>',
       task:{type:'confirm', title:'مدادت را درست در دست بگیر و بنویس', tip:'صاف بنشین، مداد بین شست و انگشتِ اشاره. بزرگترت ببیند و تأیید کند.'}},
      {who:'پایانِ قصه', art:['story-mom','kid:cheer'],
       t:'تاپ‌تاپک سعی کرد همه‌ی کارها را درست انجام بدهد. مامان تاپ‌تاپک او را بغل کرد و گفت: <q>آفرین! خیلی خوب تلاش کردی!</q> تاپ‌تاپک خوشحال شد، خندید.'}],
      asks:['بگو تاپ‌تاپک و مامان درباره‌ی چه چیزی حرف زدند؟']},
    play:{src:'ص ۱۷', rule:'به شکل نگاه کن. یک روز در میان یکی از آن‌ها را انجام بده.', pick:1,
      need:'یک چوبِ سبک (مثلاً دستهٔ جارو)، یک کتاب و یک بادکنک', yuzi:['careful','من با وسایل بی‌خطر بازی می‌کنم.'],
      games:[
        {name:'چوب و حرکتِ دلخواه', t:'چوب سبکی را پشت شانه‌ات قرار بده، با دست‌هایت چوب را بگیر، حالا حرکاتی را که دوست داری انجام بده.', kind:'reps', det:'freeMove', need:'stick', goal:10, unit:'حرکت', figs:['m2-stick','m2-stickKick']},
        {name:'چوب و کتاب روی سر', t:'چوب سبکی را پشت شانه‌ات قرار بده، با دست‌هایت چوب را بگیر، کتابی روی سرت بگذار. حالا بنشین و پاشو. سعی کن کتاب نیفتد.', kind:'reps', det:'squat', need:'stick', goal:8, unit:'بار', figs:['m2-stick','m2-stickBook']},
        {name:'چوب و بادکنک', t:'چوب سبکی را پشت شانه‌ات قرار بده، با دست‌هایت چوب را بگیر، حالا با سر و پاها به بادکنک ضربه بزن.', kind:'balloon', parts:['head','knee','foot'], need:'stick', balls:1, goal:10, unit:'ضربه', figs:['m2-stickKick','m2-stick']}]},
    family:{kind:'chairs', title:'صندلی‌بازی', src:'ص ۱۸', yuzi:['listen','من در وقت مناسب بازی می‌کنم.'],
      intro:'صندلی‌ها را دایره‌وار بچینید و یکی را علامت بزنید. با شروعِ آهنگ، همه آرام دورِ صندلی‌ها راه می‌روند. آهنگ که قطع شد، همه باید <b>به‌درستی</b> روی صندلی‌ها بنشینند. هر کس روی صندلیِ علامت‌دار نشست، یک حرکتِ نمایشی یا شیرین‌کاری اجرا می‌کند.',
      tricks:['مثلِ خروس بانگ بزن و روی یک پا بایست','سه بار دست بزن و یک دور بچرخ','مثلِ گربه کش و قوس بیا','یک شعرِ کوتاه بخوان','مثلِ ربات چند قدم راه برو','با چشمِ بسته تا پنج بشمار']},
    star:{kind:'posture', title:'درست بایست، درست بنشین', src:'ص ۱۹',
      t:'به شکل‌ها نگاه کن. در طول هفته، هر روزی که مانند آن‌ها درست ایستادی، درست نشستی، درست کوله‌پشتی‌ات را حمل کردی و درست مداد در دست گرفتی و نوشتی، یکی از ستاره‌ها را رنگ کن.',
      checks:[['stand','درست ایستادم','m2-standOk','standStraight'],['sit','درست نشستم','m2-sitOk','sitStraight'],['bag','کوله‌پشتی‌ام را درست حمل کردم','m2-bagOk'],['write','مداد را درست گرفتم و نوشتم','m2-writeOk']]}
  },
  3: {n:3, khan:1, title:'راه رفتن، دویدن، پریدن', pages:'۲۱ تا ۲۵', word:'می‌روم', count:4,
    story:{name:'تاپ‌تاپو', src:'ص ۲۲', pages:[
      {who:'خاله خرگوشه', art:['story-rabbit','kid:m3-runA'],
       t:'تاپ‌تاپو می‌خواست به خانه‌ی خاله‌اش برود. خاله برای او آش پخته بود. تاپ‌تاپو راه افتاد. رفت و رفت و رفت. خاله خرگوشه او را دید. پرسید: <q>بگو از اینجا، می‌روی کجا؟</q> تاپ‌تاپو گفت: <q>به خانه‌ی خاله جانم <b>می‌روم</b>.</q> خاله خرگوشه گفت: <q>من هم با تو تا آنجا می‌آیم. من می‌دوم، تو هم بدو.</q> خاله خرگوشه دوید. تاپ‌تاپو هم کمی دوید، ولی به او نرسید. تاپ‌تاپو گفت: <q>من نمی‌دوم. راه <b>می‌روم</b>.</q>',
       task:{type:'reps', det:'run', goal:10, unit:'قدم', title:'تو هم مثل تاپ‌تاپو و خاله خرگوشه حرکت کن', figs:['m3-runA','m3-runB'], tip:'درجا بدو؛ زانوها بالا.'}},
      {who:'خاله قورباغه', art:['story-frog','kid:m3-frog-b'],
       t:'تاپ‌تاپو راه افتاد. رفت و رفت و رفت. خاله قورباغه او را دید. پرسید: <q>بگو از اینجا می‌روی کجا؟</q> تاپ‌تاپو گفت: <q>به خانه‌ی خاله جانم <b>می‌روم</b>.</q> خاله قورباغه گفت: <q>من هم با تو تا آنجا می‌آیم. من می‌پرم، تو هم بپر.</q> خاله قورباغه پرید و جلو رفت. تاپ‌تاپو هم چند بار پرید، ولی به خاله قورباغه نرسید.'},
      {who:'خاله‌جان', art:['story-aunt','kid:m3-walkA'],
       t:'تاپ‌تاپو با خودش گفت: <q>نه می‌دوم، نه بالا و پایین می‌پرم، تا خانه‌ی خاله، راه <b>می‌روم</b>.</q> تاپ‌تاپو راه رفت. یواش و یواش. رفت و رسید به خاله‌جان و ظرف آش.',
       task:{type:'race', title:'ابتدا از این طرف تا آن‌طرف اتاق راه برو، حالا بدو. با راه رفتن زودتر رسیدی یا با دویدن؟'}}],
      asks:['خاله خرگوشه به تاپ‌تاپو چه گفت؟','خاله قورباغه به تاپ‌تاپو چه گفت؟']},
    play:{src:'ص ۲۳', rule:'به شکل‌ها نگاه کن. یک روز درمیان مثل دو تا از آن‌ها حرکت کن. آن را ده بار انجام بده.', pick:2,
      need:'جای خلوت؛ برای مار و گربه یک زیرانداز', yuzi:['drink','من موقع بازی کردن، وقتی تشنه می‌شوم، حتماً آب می‌خورم.'],
      games:[
        {name:'مثل کانگورو', t:'جفت‌پا درجا بپر.', kind:'reps', det:'jump', goal:10, unit:'پرش', figs:['m3-roo-a','m3-roo-b'], art:'animal-kangaroo'},
        {name:'مثل قورباغه', t:'بنشین، دست‌ها روی زمین، بعد بپر.', kind:'reps', det:'frog', goal:10, unit:'پرش', figs:['m3-frog-a','m3-frog-b'], art:'story-frog'},
        {name:'مثل مرغ', t:'آرنج‌ها را مثل بال بالا و پایین ببر و راه برو.', kind:'reps', det:'hen', goal:10, unit:'بار', figs:['m3-hen-a','m3-hen-b'], art:'animal-hen'},
        {name:'مثل گوریل', t:'زانوها خم، با مشت به سینه‌ات بزن.', kind:'reps', det:'drum', goal:10, unit:'بار', figs:['m3-gorilla-a','m3-gorilla-b'], art:'animal-gorilla'},
        {name:'مثل گربه', t:'چهاردست‌وپا راه برو.', kind:'manual', goal:10, unit:'قدم', figs:['m3-cat-a','m3-cat-b'], art:'animal-cat'},
        {name:'مثل مار', t:'روی شکم بخز.', kind:'manual', goal:10, unit:'بار', figs:['m3-snake-a','m3-snake-b'], art:'animal-snake'}]},
    family:{kind:'charades', title:'حدسِ حیوان', src:'ص ۲۴', yuzi:['listen','من موقع صحبت کردن هم‌بازی‌ها، به حرف آن‌ها گوش می‌کنم.'],
      intro:'دانش‌آموز به‌عنوان شروع‌کننده‌ی بازی، حرکت یک حیوان را نشان می‌دهد و هم‌بازی‌ها باید نام حیوان را حدس بزنند. با مشخص شدن حیوان، همگی با تقلید صدای حیوان، حرکت را تکرار می‌کنند. فردی که قشنگ‌ترین نمایش را دارد، دور بعدی بازی را اجرا می‌کند.',
      animals:[['کانگورو','animal-kangaroo'],['قورباغه','story-frog'],['مرغ','animal-hen'],['گوریل','animal-gorilla'],['گربه','animal-cat'],['مار','animal-snake'],
               ['خروس','rooster-greet'],['آهو','gazelle-greet'],['لک‌لک','stork-greet'],['اسب','rakhsh-greet'],['بزِ کوهی','ibex-greet'],['خرگوش','story-rabbit']]},
    star:{kind:'jump', title:'پرشِ جفت', src:'ص ۲۵', fig:['m3-roo-a','m3-roo-b'], yuzi:['warmup','من قبل از اینکه بپرم، درجا می‌زنم تا بدنم را گرم کنم.'],
      t:'به شکل نگاه کن. در طول هفته، هرروز مثل او به جلو بپر، هر بار که بیشتر از دفعه‌ی قبل پریدی، یکی از ستاره‌ها را رنگ کن.'}
  },
  4: {n:4, khan:1, title:'بدنِ قوی', pages:'۲۷ تا ۳۱', word:'قوی', count:3,
    story:{name:'تاپ‌تاپو و تاپ‌تاپک', src:'ص ۲۸', pages:[
      {who:'عموجان', art:['story-uncle','kid:stand'],
       t:'تاپ‌تاپو و تاپ‌تاپک به باغ عموجان رفته بودند. عموجان با دست‌های <b>قوی</b> بیل را گرفته بود و خاک را زیر و رو می‌کرد تا درخت بکارد. تاپ‌تاپو گفت: <q>من هم می‌خواهم کمک کنم.</q> ولی نتوانست.'},
      {who:'عموجان', art:['story-uncle','kid:stand'],
       t:'عموجان یک سبد پر از میوه را برداشت و به انبار برد. تاپ‌تاپک گفت: <q>من هم می‌خواهم کمک کنم.</q> ولی نتوانست. تاپ‌تاپو و تاپ‌تاپک کمی خجالت کشیدند.'},
      {who:'عموجان', art:['story-uncle','kid:cheer'],
       t:'عموجان گفت: <q>برای اینکه بتوانید این کارها را انجام بدهید، باید بدنتان را <b>قوی</b> کنید.</q> تاپ‌تاپو گفت: <q>چطوری؟</q> عموجان گفت: <q>من به شما یاد می‌دهم که چه حرکت‌هایی را انجام بدهید تا <b>قوی</b> شوید.</q> تاپ‌تاپو و تاپ‌تاپک خوشحال شدند.'},
      {who:'حرکتِ اول', art:['kid:m4-circle-a','kid:m4-circle-b'], t:'مانند تاپ‌تاپک هر حرکت را انجام بده و تا هشت بار تکرار کن.',
       task:{type:'reps', det:'circle', goal:8, unit:'دور', title:'دست‌ها را باز کن و بچرخان', tip:'دست‌ها کنارِ بدن در ارتفاعِ شانه؛ دایره‌های کوچک بکش.'}},
      {who:'حرکتِ دوم', art:['kid:m4-toe-a','kid:m4-toe-b'], t:'مانند تاپ‌تاپک هر حرکت را انجام بده و تا هشت بار تکرار کن.',
       task:{type:'reps', det:'toe', goal:8, unit:'بار', title:'روی پنجه‌ها بلند شو', tip:'دست‌ها روی کمر؛ آرام روی پنجه برو بالا و برگرد.'}},
      {who:'حرکتِ سوم', art:['kid:m4-hug-a','kid:m4-hug-b'], t:'مانند تاپ‌تاپک هر حرکت را انجام بده و تا هشت بار تکرار کن.',
       task:{type:'reps', det:'hug', goal:8, unit:'بار', title:'زانو را بغل کن', tip:'یک زانو را بالا بیاور و با دو دست بغلش کن؛ یک بار این پا، یک بار آن پا.'}},
      {who:'حرکتِ چهارم', art:['kid:m4-lunge-a','kid:m4-lunge-b'], t:'مانند تاپ‌تاپک هر حرکت را انجام بده و تا هشت بار تکرار کن.',
       task:{type:'reps', det:'lunge', goal:8, unit:'بار', title:'یک قدمِ بلند جلو، زانو خم', tip:'یک پا جلو، زانوی جلو خم؛ بعد برگرد و پا را عوض کن.'}}],
      asks:['بگو در باغ عموجان چه اتّفاقی افتاد؟','عموجان به تاپ‌تاپو و تاپ‌تاپک چه گفت؟']},
    play:{src:'ص ۲۹', rule:'به شکل بازی‌ها نگاه کن. یک روز درمیان یکی از آن‌ها را انجام بده.', pick:1,
      need:'چند بالش یا کوسن، چند لیوانِ پلاستیکی و یک زیرانداز', yuzi:['tidy','من بعد از بازی، وسایل را جمع می‌کنم.'],
      games:[
        {name:'چیدن با پا', t:'با پاهایت وسایل سبکی را روی‌هم بچین.', kind:'manual', goal:5, unit:'وسیله', figs:['m4-feetStack','m4-feetStack'], prop:'cushions'},
        {name:'لیوان‌ها با یک دست', t:'با یک دست لیوان‌های پلاستیکی را روی‌هم بچین.', kind:'manual', goal:6, unit:'لیوان', figs:['m4-plank-a','m4-plank-b'], prop:'cups'},
        {name:'چرخیدن روی دست‌ها', t:'با دست‌هایت روی زمین، دور خودت بچرخ.', kind:'manual', goal:2, unit:'دور', figs:['m4-spin-a','m4-spin-b']}]},
    family:{kind:'feet', title:'بالای سر با پا', src:'ص ۳۰', yuzi:['careful','من موقع بازی کردن، مواظب هم‌بازی‌هایم هستم.'],
      intro:'اشیای سبک را کنار هم بگذارید: عروسک، توپ‌های پارچه‌ای، جوراب یا لباسِ گلوله‌شده. همه با تکیه بر دست‌ها و پاهای صاف روی زمین دورِ اشیا حلقه بزنید. با پخشِ آهنگ، هر کس با پاهایش اشیا را یکی‌یکی برمی‌دارد و با کمکِ دست‌ها بالای سرش می‌گذارد. آهنگ که تمام شد، کسی که بیشترین شیء را بالای سر گذاشته تشویق می‌شود.'},
    star:{kind:'timer', title:'خرچنگی راه برو', src:'ص ۳۱', fig:['m4-crab-a','m4-crab-b'],
      t:'به شکل نگاه کن. در طول هفته، هرروز مثل او خرچنگی راه برو، هر بار که بیشتر خرچنگی راه رفتی، یکی از ستاره‌ها را رنگ کن.'}
  }
};
const KHAN_INFO = [
  {lessons:[1,2], name:'بیدارِ بدن', ord:'اول', guard:'rooster', text:'من <b>خروسِ سحر</b>م! هر صبح همه را بیدار می‌کنم. بیا بدنت را بیدار کنیم و یاد بگیریم درست بایستیم و درست بنشینیم.'},
  {lessons:[3,4], name:'دشتِ تیزپاها', ord:'دوم', guard:'gazelle', text:'من <b>آهوی تیزپا</b>م! بیا راه رفتن، دویدن و پریدن را یاد بگیریم و بدنت را قوی کنیم.'}
];

/* ===================================================================== the body, measured
   Every threshold is in body units (shoulder width sw, torso height, leg length), so it works near or far
   from the camera. Anatomical sides: landmarks 11/13/15/23/25/27 are the child's LEFT. */
const dist = (a,b) => Math.hypot(a.x-b.x, a.y-b.y);
const mid = (a,b) => ({x:(a.x+b.x)/2, y:(a.y+b.y)/2});
const ang = (a,b,c) => { const v1 = {x:a.x-b.x, y:a.y-b.y}, v2 = {x:c.x-b.x, y:c.y-b.y};
  const d = Math.hypot(v1.x,v1.y)*Math.hypot(v2.x,v2.y) || 1; return Math.acos(Math.max(-1, Math.min(1, (v1.x*v2.x+v1.y*v2.y)/d))) * 57.3; };
function bodyOf(lm, W, Hh){
  const vis = i => lm[i] && (lm[i].visibility ?? 1) > .45;
  if(!(vis(11)&&vis(12)&&vis(23)&&vis(24))) return null;
  const p = i => ({x:lm[i].x*W, y:lm[i].y*Hh});
  const b = {nose:p(0), earL:p(7), earR:p(8), shL:p(11), shR:p(12), eL:p(13), eR:p(14), wL:p(15), wR:p(16), iL:p(19), iR:p(20),
    hipL:p(23), hipR:p(24), kL:p(25), kR:p(26), aL:p(27), aR:p(28), tL:p(31), tR:p(32)};
  b.sh = mid(b.shL, b.shR); b.hip = mid(b.hipL, b.hipR);
  b.sw = Math.max(1, dist(b.shL, b.shR)); b.torso = Math.max(1, b.hip.y - b.sh.y);
  b.feet = vis(27) && vis(28); b.legs = b.feet && vis(25) && vis(26);
  b.leg = b.feet ? Math.max(8, Math.max(b.aL.y, b.aR.y) - b.hip.y) : b.torso * 1.4;
  b.angL = b.legs ? ang(b.hipL, b.kL, b.aL) : 180; b.angR = b.legs ? ang(b.hipR, b.kR, b.aR) : 180;
  b.face = vis(0) && vis(7) && vis(8);
  return b;
}
/* state that needs a baseline: the floor under the feet, where the shoulders are when standing flat,
   and the head's resting angle */
const BASE = {};
function resetBase(){ for(const k in BASE) delete BASE[k]; }
function updateBase(b, now){
  if(b.feet){ const fy = Math.max(b.aL.y, b.aR.y);
    BASE.floorHist = (BASE.floorHist || []).filter(x => now - x[0] < 1500); BASE.floorHist.push([now, fy]);
    BASE.floor = Math.max(...BASE.floorHist.map(x=>x[1])); }
}
const airborne = b => b.feet && BASE.floor && Math.max(b.aL.y, b.aR.y) < BASE.floor - .07*b.leg;
function headAng(b){ const em = mid(b.earL, b.earR), ed = Math.max(1, dist(b.earL, b.earR)); return {yaw:(b.nose.x-em.x)/ed, pitch:(b.nose.y-em.y)/ed}; }
function headRel(b){
  const a = headAng(b);
  if(!BASE.head){ BASE.headN = (BASE.headN||0) + 1; BASE.headAcc = BASE.headAcc || {yaw:0, pitch:0};
    if(Math.abs(a.yaw) < .25){ BASE.headAcc.yaw += a.yaw; BASE.headAcc.pitch += a.pitch; BASE.headOk = (BASE.headOk||0)+1; }
    if(BASE.headOk >= 12) BASE.head = {yaw:BASE.headAcc.yaw/BASE.headOk, pitch:BASE.headAcc.pitch/BASE.headOk};
    return null; }
  return {yaw:a.yaw - BASE.head.yaw, pitch:a.pitch - BASE.head.pitch};
}
const near = (y, ref, tol) => Math.abs(y - ref) < tol;
const PRED = {
  feet: b => b.legs && Math.abs(b.aL.y - b.aR.y) < .08*b.leg && b.angL > 150 && b.angR > 150,
  legL: b => b.legs && (b.kL.y < b.hip.y + .3*b.leg || b.aR.y - b.aL.y > .22*b.leg),
  legR: b => b.legs && (b.kR.y < b.hip.y + .3*b.leg || b.aL.y - b.aR.y > .22*b.leg),
  armU: b => b.wL.y < b.nose.y && b.wR.y < b.nose.y,
  armS: b => Math.abs(b.wL.x - b.wR.x) > 2.1*b.sw && near(b.wL.y, b.sh.y, .8*b.sw) && near(b.wR.y, b.sh.y, .8*b.sw),
  armF: b => near(b.wL.y, b.sh.y, .7*b.sw) && near(b.wR.y, b.sh.y, .7*b.sw) && Math.abs(b.wL.x - b.wR.x) < 1.7*b.sw,
  armD: b => b.wL.y > b.hip.y - .3*b.torso && b.wR.y > b.hip.y - .3*b.torso,
  headR: b => { const h = b.face && headRel(b); return !!h && h.yaw < -.28; },   // the child's right is the image's left
  headL: b => { const h = b.face && headRel(b); return !!h && h.yaw > .28; },
  headD: b => { const h = b.face && headRel(b); return !!h && h.pitch > .3; },
  headU: b => { const h = b.face && headRel(b); return !!h && h.pitch < -.25; },
  headC: b => { const h = b.face && headRel(b); return !!h && Math.abs(h.yaw) < .12 && Math.abs(h.pitch) < .14; },
  stand: b => b.legs && b.angL > 152 && b.angR > 152,
  squat: b => b.legs && b.angL < 125 && b.angR < 125,
  deep: b => b.legs && b.angL < 108 && b.angR < 108,
  stick: b => Math.abs(b.wL.x - b.wR.x) > 1.35*b.sw && b.wL.y < b.sh.y + .5*b.sw && b.wR.y < b.sh.y + .5*b.sw && b.wL.y > b.sh.y - 1.1*b.sw && b.wR.y > b.sh.y - 1.1*b.sw,
  nose: b => Math.min(dist(b.wL,b.nose), dist(b.wR,b.nose), dist(b.iL,b.nose), dist(b.iR,b.nose)) < .5*b.sw,
  standStraight: b => PRED.feet(b) && Math.abs(b.shL.y - b.shR.y) < .12*b.sw && Math.abs(b.sh.x - b.hip.x) < .14*b.torso && Math.abs(b.nose.x - b.sh.x) < .28*b.sw && b.sw > .32*b.torso,
  sitting: b => b.legs && ((b.angL < 128 && b.angR < 128) || ((b.kL.y + b.kR.y)/2 - b.hip.y) < .5*((b.aL.y - b.kL.y + b.aR.y - b.kR.y)/2)),
  sitStraight: b => PRED.sitting(b) && Math.abs(b.sh.x - b.hip.x) < .2*b.torso && Math.abs(b.shL.y - b.shR.y) < .2*b.sw,
  hug: b => [b.kL, b.kR].some(k => k.y < b.hip.y + .22*b.leg && dist(b.wL,k) < .9*b.sw && dist(b.wR,k) < .9*b.sw),
  /* from the front the knee angles hide; what shows is the back knee sinking toward the floor while the knees part */
  lunge: b => b.legs && Math.abs(b.kL.y - b.kR.y) > .15*b.leg && Math.max(b.kL.y, b.kR.y) - b.hip.y > .7*b.leg,
  henUp: b => b.eL.y < b.sh.y + .35*b.sw && b.eR.y < b.sh.y + .35*b.sw && b.wL.y > b.nose.y && b.wR.y > b.nose.y,
  henDown: b => b.eL.y > b.sh.y + .45*b.sw && b.eR.y > b.sh.y + .45*b.sw,
  drum: b => [b.wL, b.wR].some(w => w.y > b.sh.y - .15*b.sw && w.y < b.sh.y + .7*b.torso && w.x > Math.min(b.shL.x, b.shR.x) - .1*b.sw && w.x < Math.max(b.shL.x, b.shR.x) + .1*b.sw),
  armsOut: b => Math.abs(b.wL.x - b.wR.x) > 1.8*b.sw && near(b.wL.y, b.sh.y, 1.1*b.sw) && near(b.wR.y, b.sh.y, 1.1*b.sw)
};
/* a repetition is "first this, then that", each held for a moment */
function runner(first, then, hold=180){
  return {first, then, armed:false, t0:0, cur:null,
    step(b, now){ const want = this.armed ? this.then : this.first;
      if(want(b)){ if(this.cur !== want){ this.cur = want; this.t0 = now; }
        if(now - this.t0 >= hold){ this.cur = null; if(!this.armed){ this.armed = true; return false; } this.armed = false; return true; } }
      else if(this.cur === want) this.cur = null;
      return false; } };
}
/* detectors for counted games: step(b, now) returns true once per repetition */
function detector(det){
  if(det === 'squat') return runner(PRED.squat, PRED.stand);
  if(det === 'jump') return runner(b => airborne(b), b => b.feet && !airborne(b), 60);
  if(det === 'frog') return runner(PRED.deep, b => airborne(b) || PRED.stand(b), 120);
  if(det === 'hen') return runner(PRED.henDown, PRED.henUp, 120);
  if(det === 'drum') return runner(b => !PRED.drum(b), PRED.drum, 80);
  if(det === 'hug') return runner(PRED.stand, PRED.hug, 250);
  if(det === 'lunge') return runner(b => PRED.stand(b) && !PRED.lunge(b), PRED.lunge, 250);
  if(det === 'run' || det === 'walk'){
    const thr = det === 'run' ? .13 : .05;
    return {last:null, step(b){ if(!b.feet || !BASE.floor) return false;
      const lL = (BASE.floor - b.aL.y)/b.leg, lR = (BASE.floor - b.aR.y)/b.leg;
      const side = lL > thr && lL > lR + .04 ? 'L' : lR > thr && lR > lL + .04 ? 'R' : null;
      if(side && side !== this.last){ this.last = side; return true; } return false; } };
  }
  if(det === 'toe') return {flat:null, up:false, t0:0, step(b, now){
      if(!b.feet || !BASE.floor) return false;
      const ankUp = (BASE.floor - Math.max(b.aL.y, b.aR.y))/b.leg;
      // the resting height follows the child only while they are flat, so a slow rise is not absorbed into it
      if(this.flat === null) this.flat = b.sh.y; else if(!this.up && ankUp < .03 && (this.flat - b.sh.y)/b.leg < .02) this.flat = this.flat*.92 + b.sh.y*.08;
      const rise = (this.flat - b.sh.y)/b.leg;
      if(!this.up && rise > .045 && ankUp < .1){ if(!this.t0) this.t0 = now; if(now - this.t0 > 200){ this.up = true; this.t0 = 0; return true; } }
      else if(this.up && rise < .02){ this.up = false; this.t0 = 0; }
      else if(!this.up) this.t0 = 0;
      return false; } };
  if(det === 'circle') return {m:null, low:false, step(b){
      if(!PRED.armsOut(b)) return false;
      const y = (b.wL.y + b.wR.y)/2; this.m = this.m === null ? y : this.m*.93 + y*.07;
      if(y > this.m + .1*b.sw) this.low = true;
      else if(this.low && y < this.m - .1*b.sw){ this.low = false; return true; }
      return false; } };
  if(det === 'freeMove'){
    const moved = b => PRED.legL(b) || PRED.legR(b) || PRED.squat(b) || Math.abs(b.shL.y - b.shR.y) > .35*b.sw || (BASE.sw0 && b.sw < .6*BASE.sw0);
    return Object.assign(runner(b => { if(PRED.stand(b) && !moved(b)) BASE.sw0 = BASE.sw0 ? BASE.sw0*.95 + b.sw*.05 : b.sw; return PRED.stand(b) && !moved(b); }, moved, 220), {});
  }
  return null;
}

/* ===================================================================== helpers */
const camIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h3l2-3h8l2 3h3v13H3z"/><circle cx="12" cy="13" r="4"/></svg>';
const camBtn = (id, on, labelOff='یوزی با دوربین ببیند', light=true) => `<button class="camtoggle" id="${id}" aria-pressed="${on?'true':'false'}" style="${on||!light?'':'background:var(--paper-2);color:var(--ink)'}">${camIcon}<span>${on ? 'خاموش کردنِ دوربین' : labelOff}</span></button>`;
const doneChip = '<span class="done-chip"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg></span>';
const practicedToday = n => LS(n).days.some(x => x && x.d === H.dayNum());
const restDay = n => !practicedToday(n) && LS(n).days.some(x => x && x.d === H.dayNum(-1));
const doneDays = n => LS(n).days.filter(Boolean).length;
const canPlay = n => doneDays(n) < 3 && !practicedToday(n) && !restDay(n);
function bumpCam(n, key, by=1){ const c = LS(n).cam; c[key] = (c[key]||0) + by; H.save(); }
let G = {n:1, khan:0};       // what is on screen now
let flipT = null;
function flipFigs(img, figs, ms=900){ clearInterval(flipT); if(!img || !figs) return; let k = 0; img.src = figSrc(figs[0]);
  if(figs.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  flipT = setInterval(()=>{ k = 1-k; img.src = figSrc(figs[k]); }, ms); }
function camOff(){ const CAM = H.CAM; CAM.onFrame = null; CAM.hint = null; CAM.chipOn = null; if(CAM.stream) H.camStop(); }
function vib(p){ try{ navigator.vibrate && navigator.vibrate(p); }catch(e){} }

/* ===================================================================== khan screen */
function openKhan(i){ G.khan = i; const first = KHAN_INFO[i].lessons.find(n => !H.lessonDone(n) && H.lessonOpen(n)) || KHAN_INFO[i].lessons[0];
  S().cur = first; H.save(); H.go('gkhan'); }
function renderKhan(){
  const K = KHAN_INFO[G.khan], passed = K.lessons.every(H.lessonDone);
  $('#gkTitle').innerHTML = `خوانِ ${K.ord}: ${K.name}<small>منزل ${K.lessons.map(fa).join(' و ')} کتاب · ${K.lessons.map(n=>LESSONS[n].title).join('، ')}</small>`;
  $('#gkGuard').src = `img/${K.guard}-${passed ? 'proud' : 'greet'}.webp`; $('#gkGuard').alt = H.GUARD_NAMES[K.guard];
  $('#gkBubble').innerHTML = passed ? `آفرین ${esc(H.kidName())}! از خوانِ <b>${K.name}</b> گذشتی. من به تو افتخار می‌کنم.` : K.text;
  $('#gkBody').innerHTML = K.lessons.map(n => manzilHTML(n)).join('');
  K.lessons.forEach(n => {
    const box = $(`#mz${n}`); if(!box) return;
    box.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
      const act = b.dataset.act; S().cur = n; G.n = n; H.save(); sfx('click');
      if(act === 'play'){ if(!canPlay(n)){ sfx('sleep'); voice('sleep'); b.style.animation = 'shake .35s'; setTimeout(()=>b.style.animation='', 400); return; } H.go('gchoose'); }
      else H.go(act);
    }));
  });
}
function manzilHTML(n){
  const Ld = LESSONS[n], st = LS(n), d = doneDays(n), open = H.lessonOpen(n);
  if(!open) return `<div class="manzil locked-manzil" id="mz${n}"><h3>منزل ${fa(n)} · ${Ld.title} <span class="tag">کتاب، ص ${Ld.pages}</span></h3>
    <div class="lock-note"><svg viewBox="0 0 24 24" fill="none" stroke="#5d4f72" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>وقتی سه مشعلِ «${LESSONS[n-1].title}» روشن شود، این منزل باز می‌شود.</div></div>`;
  const rest = !canPlay(n), today = practicedToday(n), resting = restDay(n);
  const title = d>=3 ? 'هر سه مشعل روشن است' : today ? 'بازیِ امروز تمام شد' : resting ? 'امروز روزِ استراحت است' : 'برویم بازی!';
  const sub = d>=3 ? 'این منزل را گذراندی. آفرین!' : today ? 'یوزی خوابید. کتاب می‌گوید یک روز در میان؛ پس‌فردا دوباره بیا.'
    : resting ? 'دیروز بازی کردی. بدن هم استراحت لازم دارد؛ فردا مشعلِ بعدی منتظرت است.'
    : `${Ld.play.pick===2 ? 'دو تا از شش حرکت را انتخاب کن' : 'یکی از سه بازی را انتخاب کن'} · روزِ ${DAYW[d]}`;
  const ic = rest ? `<img src="img/yuzi-1-sleep.webp" alt="">` : `<svg viewBox="0 0 40 40" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><circle cx="20" cy="7" r="4"/><path d="M20 12v13M20 25v12M20 25l9-5M10 18l10-3 10 3"/></svg>`;
  const starSub = LS(n).stars ? `ستاره ${fa(LS(n).stars)} از ۷` : starIntro(n);
  return `<div class="manzil" id="mz${n}"><h3>منزل ${fa(n)} · ${Ld.title} <span class="tag">کتاب، ص ${Ld.pages}</span></h3>
    <div class="tiles">
      <button class="tile t-play ${rest?'rest':''}" data-act="play" aria-disabled="${rest}"><span class="ic">${ic}</span><span class="grow"><b>${title}</b><small>${sub}</small>
        <span class="days">${[0,1,2].map(i=>`<span class="day ${st.days[i]?'lit':''} ${i===d&&canPlay(n)?'today':''}">${fa(i+1)}</span>`).join('')}</span></span></button>
      <button class="tile t-story" data-act="gstory">${st.story?doneChip:''}<span class="ic"><svg viewBox="0 0 40 40" fill="none" stroke="#5d4f72" stroke-width="3" stroke-linecap="round"><path d="M6 10c6-3 10-3 14 0v22c-4-3-8-3-14 0zM34 10c-6-3-10-3-14 0v22c4-3 8-3 14 0z"/></svg></span>
        <b>قصهٔ حرکت</b><small>${Ld.story.name} · کتاب، ${Ld.story.src}</small></button>
      <button class="tile t-family" data-act="gfam">${st.family?doneChip:''}<span class="ic"><svg viewBox="0 0 40 40" fill="none" stroke="#0c7a73" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="11" r="4"/><circle cx="28" cy="11" r="4"/><circle cx="20" cy="22" r="3"/><path d="M5 34c0-7 4-11 7-11s5 2 6 4M35 34c0-7-4-11-7-11s-5 2-6 4M15 36c0-4 2-7 5-7s5 3 5 7"/></svg></span>
        <b>بازی خانوادگی</b><small>${Ld.family.title} · کتاب، ${Ld.family.src}</small></button>
      <button class="tile t-stars" data-act="gstar" style="grid-column:span 2;min-height:0"><span style="display:flex;align-items:center;gap:12px">
        <span class="ic"><svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="#f3a530" stroke="#c87a0c" stroke-width="1.5" stroke-linejoin="round"/></svg></span>
        <span style="display:flex;flex-direction:column;gap:2px"><b>${Ld.star.title}</b><small>${starSub}</small></span></span></button>
    </div></div>`;
}
const starIntro = n => ({cards:'هر کارِ درست یک ستاره', posture:'هر روزی که همه را درست انجام دادی، یک ستاره', jump:'بیشتر از دفعهٔ قبل بپر، ستاره بگیر', timer:'بیشتر از دفعهٔ قبل خرچنگی برو، ستاره بگیر'})[LESSONS[n].star.kind];

/* ===================================================================== choose today's game */
let picked = [];
function renderChoose(){
  const n = G.n = S().cur, Ld = LESSONS[n], pl = Ld.play; picked = [];
  $('#gcTitle').innerHTML = `${pl.pick===2 ? 'دو حرکتِ امروز را انتخاب کن' : 'بازیِ امروز را انتخاب کن'}<small>برویم بازی! · منزل ${fa(n)} · کتاب، ${pl.src}</small>`;
  $('#gcRule').innerHTML = `کتاب می‌گوید: «${pl.rule}»<br><small style="color:var(--ink-soft)">وسیله: ${pl.need}</small>`;
  const did = gi => LS(n).days.findIndex(x => x && (x.moves||[]).includes(gi));
  $('#gcChoices').innerHTML = pl.games.map((g,i)=>{ const dd = did(i);
    return `<button class="choice" data-g="${i}"><img src="${figSrc(g.figs[0])}" alt=""><span><b>${g.name}</b><small>${g.t}</small></span>
      ${dd>=0?`<em class="did" style="font-style:normal">روزِ ${DAYW[dd]} بازی کردی</em>`:''}
      <em class="eye ${g.kind==='manual'?'hand':''}" style="font-style:normal">${g.kind==='manual' ? 'بزرگتر تأیید می‌کند' : 'یوزی با دوربین می‌شمارد'}</em></button>`; }).join('');
  $('#gcGo').innerHTML = pl.pick===2 ? `<button class="cta gold" id="gcStart" style="width:100%;margin-top:14px;opacity:.5" disabled>دو حرکت را انتخاب کن</button>` : '';
  $$('#gcChoices .choice').forEach(b => b.addEventListener('click', ()=>{
    const gi = +b.dataset.g; sfx('click');
    if(pl.pick === 1){ picked = [gi]; H.go('gex'); return; }
    picked = picked.includes(gi) ? picked.filter(x=>x!==gi) : picked.concat(gi).slice(-2);
    $$('#gcChoices .choice').forEach(c => { const on = picked.includes(+c.dataset.g); c.classList.toggle('picked', on);
      const m = c.querySelector('.pickmark'); if(m) m.remove(); if(on) c.insertAdjacentHTML('beforeend', `<em class="pickmark" style="font-style:normal">${fa(picked.indexOf(+c.dataset.g)+1)}</em>`); });
    const go = $('#gcStart'); const ok = picked.length === 2; go.disabled = !ok; go.style.opacity = ok ? '' : '.5'; go.textContent = ok ? 'شروع کن!' : picked.length ? 'یکی دیگر هم انتخاب کن' : 'دو حرکت را انتخاب کن';
  }));
  const go = $('#gcStart'); if(go) go.addEventListener('click', ()=>{ if(picked.length===2){ sfx('click'); H.go('gex'); } });
}

/* ===================================================================== the game itself */
const X = {q:[], qi:0, count:0, camOn:false, det:null, lastSeen:0, balls:[], feel:null};
const curGame = () => LESSONS[G.n].play.games[X.q[X.qi]];
function startGame(){
  G.n = S().cur; X.q = picked.length ? picked.slice() : [0]; X.qi = 0; X.feel = null;
  $('#gxReward').hidden = true; $('#gxFeel').hidden = true; $('#gxSeen').hidden = true; $('#gxComfort').hidden = true;
  startOne();
}
function startOne(){
  const g = curGame(), n = G.n; X.count = 0; X.balls = []; X.det = g.det ? detector(g.det) : null; resetBase();
  $('#gxTitle').innerHTML = `${g.name}<small>منزل ${fa(n)} · روزِ ${DAYW[Math.min(2, doneDays(n))]}${X.q.length>1 ? ` · حرکتِ ${fa(X.qi+1)} از ۲` : ''} · کتاب، ${LESSONS[n].play.src}</small>`;
  $('#gxInstr').innerHTML = `${g.t}${g.need==='stick' ? '<small>چوب پشتِ شانه‌ها بماند</small>' : g.kind==='manual' ? '<small>این حرکت روی زمین است و دوربین آن را خوب نمی‌بیند؛ هر بار دکمه را بزن و آخر بزرگترت تأیید کند</small>' : '<small>جای بازی را خلوت کن · با دوربین، یوزی خودش می‌شمارد</small>'}`;
  $('#gxCam').parentElement.hidden = g.kind === 'manual';
  if(g.kind === 'manual' && X.camOn) gxCamOff();
  flipFigs($('#gxFig'), g.figs);
  voice(`g${n}-${X.q[X.qi]+1}`);
  if(X.camOn) armCam();
  renderCount();
}
function sceneSVG(g, c){
  let props = '';
  if(g.kind === 'balloon'){
    const cols = [C.anar, '#3b82c4'];
    for(let k=0;k<(g.balls||1);k++){ const x = 70 + k*70, y = 60 + k*22;
      props += `<g class="sway" style="transform-origin:${x}px ${y+40}px"><path d="M${x} ${y+34} q-6 20 4 40" stroke="${C.ink}" stroke-width="1.5" fill="none"/><ellipse cx="${x}" cy="${y}" rx="24" ry="30" fill="${cols[k]}" stroke="${C.ink}" stroke-width="2.5"/><ellipse cx="${x-8}" cy="${y-10}" rx="5" ry="8" fill="#fff" opacity=".45"/><path d="M${x-4} ${y+30}h8l-4 6z" fill="${cols[k]}" stroke="${C.ink}" stroke-width="2"/></g>`; }
  }
  if(g.prop === 'cups') for(let i=0;i<g.goal;i++){ const row = [0,0,0,1,1,2][i], pos = [0,1,2,0,1,0][i], on = i < c;
    const x = on ? 22 + pos*26 + row*13 : 20 + i*22, y = on ? 186 - row*24 : 214;
    props += `<path d="M${x} ${y} h20 l-3 22 h-14z" fill="${['#e2574c','#3b82c4','#4fb35a','#f2c230','#a35bc4','#e2574c'][i]}" opacity="${on?1:.45}" stroke="${C.ink}" stroke-width="1.5"/>`; }
  if(g.prop === 'cushions') for(let i=0;i<g.goal;i++){ const on = i < c, x = on ? 60 : 24 + i*30, y = on ? 200 - i*16 : 220;
    props += `<ellipse cx="${x}" cy="${y}" rx="${on?30:13}" ry="${on?9:6}" fill="${['#a35bc4','#f2c230','#4fb35a','#3b82c4','#e2574c'][i]}" opacity="${on?1:.5}" stroke="${C.ink}" stroke-width="2"/>`; }
  return `<rect width="320" height="250" fill="${C.paper}"/><path d="M0 214 H320 V250 H0Z" fill="#efdcb0"/>
    <g opacity=".5" fill="none" stroke="#e8d3a3" stroke-width="2"><path d="M20 30 l10 10 l10 -10 l-10 -10z M280 40 l10 10 l10 -10 l-10 -10z"/></g>${props}`;
}
function renderCount(){
  const g = curGame();
  $('#gxSvg').innerHTML = sceneSVG(g, X.count);
  $('#gxNum').textContent = fa(X.count);
  $('#gxUnit').textContent = `از ${fa(g.goal)} ${g.unit}`;
  $('#gxArc').style.strokeDashoffset = 427 * (1 - X.count/g.goal);
  $('#gxHint').textContent = X.count >= g.goal ? 'تمام شد!' : X.camOn && g.kind !== 'manual' ? (g.kind==='balloon' ? 'با بدنت به بادکنک بزن تا نیفتد' : 'حرکت کن؛ یوزی می‌شمارد')
    : X.count === 0 ? 'هر بار یکی را انجام دادی، دکمه را بزن' : `${fa(g.goal - X.count)} تای دیگر`;
}
function addRep(byCam){
  const g = curGame(); if(X.count >= g.goal) return;
  if(byCam) bumpCam(G.n, g.kind==='balloon' ? 'balloon' : g.det);
  X.count++; renderCount(); sfx('tap', X.count); vib(12);
  const b = $('#gxTap'); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
  if(X.count >= g.goal){ setTimeout(()=>sfx('done'), 120); setTimeout(gameDone, 500); }
}
function gameDone(){
  const g = curGame();
  if(g.kind === 'manual'){ $('#gxSeenText').textContent = `${H.kidName()} «${g.name}» را ${fa(g.goal)} ${g.unit} انجام داد. یوزی این حرکت را با دوربین نمی‌بیند؛ بزرگترت تأیید کند.`; $('#gxSeen').hidden = false; $('#gxSeenYes').focus(); return; }
  nextOrFeel();
}
function nextOrFeel(){
  if(X.qi < X.q.length - 1){ X.qi++; sfx('fanfare'); startOne(); $('#gxHint').textContent = 'آفرین! حالا حرکتِ دوم'; return; }
  if(X.camOn) gxCamOff();
  clearInterval(flipT);
  $('#gxFeel').hidden = false; const f = $('#gxFeel button'); f && f.focus();
}
$('#gxSeenYes').addEventListener('click', ()=>{ $('#gxSeen').hidden = true; bumpCam(G.n, 'adult'); sfx('star'); nextOrFeel(); });
$('#gxSeenNo').addEventListener('click', ()=>{ $('#gxSeen').hidden = true; X.count = Math.max(0, curGame().goal - 1); renderCount(); $('#gxHint').textContent = 'یک بارِ دیگر انجام بده تا بزرگترت ببیند'; });
$('#gxTap').addEventListener('click', ()=>{
  const g = curGame();
  if(X.camOn && H.CAM.stream && g.kind !== 'manual'){ sfx('miss'); $('#gxHint').textContent = g.kind==='balloon' ? 'با دوربین، بادکنک را با بدنت بزن!' : 'یوزی خودش می‌شمارد؛ فقط حرکت کن!'; return; }
  addRep(false);
});
$$('#gxFeel [data-feel]').forEach(b => b.addEventListener('click', ()=>{
  X.feel = +b.dataset.feel; $('#gxFeel').hidden = true; sfx('click');
  if(X.feel === 0){ sfx('soft'); voice('comfort'); $('#gxComfortKid').src = `img/${H.kid()}-tired.webp`; $('#gxComfortYuzi').src = H.yz('comfort'); $('#gxComfort').hidden = false;
    setTimeout(()=>{ $('#gxComfort').hidden = true; finishDay(); }, 2200); }
  else finishDay();
}));
function finishDay(){
  const n = G.n, st = LS(n), d = doneDays(n);
  st.days[d] = {d:H.dayNum(), moves:X.q.slice(), feel:X.feel}; H.save();
  const lit = doneDays(n), doneL = lit >= 3, K = KHAN_INFO[LESSONS[n].khan], passed = K.lessons.every(H.lessonDone);
  $('#gxTorches').innerHTML = [0,1,2].map(i => H.torch(i<lit, i===lit-1 ? 'new' : '')).join('');
  $('#gxRewardImg').src = passed ? `img/${K.guard}-proud.webp` : H.yz('cheer');
  $('#gxRewardKid').src = `img/${H.kid()}-cheer.webp`;
  const nextN = n + 1, nextName = LESSONS[nextN] ? `«${LESSONS[nextN].title}»` : '«تعادل» در خوانِ سوم';
  $('#gxRewardTitle').textContent = passed ? `از خوانِ ${K.name} گذشتی!` : doneL ? `منزلِ ${LESSONS[n].title} تمام شد!` : 'آفرین پهلوان!';
  $('#gxRewardText').textContent = passed ? `${H.GUARD_NAMES[K.guard]} به تو افتخار می‌کند. حالا منزلِ ${nextName} منتظرت است.`
    : doneL ? `هر سه مشعل روشن شد. منزلِ ${nextName} باز شد!`
    : `مشعلِ روزِ ${DAYW[lit-1]} روشن شد. ${lit===2 ? 'یک روزِ دیگر' : 'دو روزِ دیگر'} تا تمام شدنِ این منزل. فردا روزِ استراحت است؛ پس‌فردا بیا!`;
  $('#gxReward').hidden = false; H.renderTop();
  sfx('fanfare', doneL); setTimeout(()=>voice('cheer'), 900);
  confettiOn($('#gxConfetti'));
}
function confettiOn(cv){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = cv.getContext('2d'), r = cv.getBoundingClientRect(); cv.width = r.width*devicePixelRatio; cv.height = r.height*devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio);
  const cols = [C.saffron, C.anar, C.fay, '#fff7e6', '#7c8be0'];
  const ps = Array.from({length:70}, ()=>({x:r.width/2, y:r.height*.35, vx:(Math.random()-.5)*9, vy:-Math.random()*9-3, s:4+Math.random()*6, c:cols[Math.random()*5|0], a:Math.random()*6}));
  let f = 0; (function tick(){ ctx.clearRect(0,0,r.width,r.height);
    ps.forEach(p=>{ p.vy += .25; p.x += p.vx; p.y += p.vy; p.a += .15; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2); ctx.restore(); });
    if(++f < 150) requestAnimationFrame(tick); else ctx.clearRect(0,0,r.width,r.height); })();
}

/* camera for the game: counts repetitions, or floats balloons the child bounces with head, hands, knees or feet */
function armCam(){
  const CAM = H.CAM, g = curGame();
  CAM.onFrame = (ctx, lm, cv) => gameFrame(ctx, lm, cv);
  CAM.hint = () => gameHint();
  CAM.chipOn = () => performance.now() - X.lastSeen < 600;
}
function gameHint(){
  const g = curGame(), CAM = H.CAM;
  if(CAM.state === 'nobody') return 'از سر تا پایت را در کادر بیاور';
  if(X.count >= g.goal) return 'آفرین! تمام شد';
  if(g.need === 'stick' && X.lastB && !PRED.stick(X.lastB)) return 'چوب را پشتِ شانه‌ها بگیر';
  if(g.kind === 'balloon') return X.dropped && performance.now() - X.dropped < 1500 ? 'بادکنک افتاد! دوباره' : `با ${g.parts.map(p=>({head:'سر',hand:'دست',knee:'زانو',foot:'پا'})[p]).join('، ')} بزن`;
  return performance.now() - X.lastSeen < 600 ? `${fa(X.count)} از ${fa(g.goal)}، آفرین!` : g.t;
}
function gameFrame(ctx, lm, cv){
  const g = curGame(), now = performance.now(); if(!g || X.count >= g.goal) return;
  const b = bodyOf(lm, cv.width, cv.height); X.lastB = b; if(!b) return;
  updateBase(b, now);
  const ready = g.need !== 'stick' || PRED.stick(b);
  if(g.kind === 'balloon'){ balloonFrame(ctx, b, cv, now, g, ready); return; }
  if(!ready) return;
  if(X.det && X.det.step(b, now)){ X.lastSeen = now; sfx('hit'); addRep(true); }
}
function balloonFrame(ctx, b, cv, now, g, ready=true){
  const W = cv.width, Hh = cv.height, T = b.torso, dt = Math.min(.05, (now - (X.lastT || now))/1000); X.lastT = now;
  const floor = BASE.floor || (b.hip.y + b.leg);
  const cols = [C.anar, '#3b82c4'];
  while(X.balls.length < (g.balls||1)){ const k = X.balls.length;
    X.balls.push({x: b.sh.x + (k ? .9 : -.9)*b.sw, y: Math.max(T*.6, b.nose.y - T*1.1), vx:0, vy:0, r:T*.32, col:cols[k], hit:0}); }
  const pts = [];
  if(g.parts.includes('head')) pts.push([b.nose, .7*b.sw]);
  if(g.parts.includes('hand')) [b.wL, b.wR, b.iL, b.iR].forEach(p => pts.push([p, .28*b.sw]));
  if(g.parts.includes('knee')) [b.kL, b.kR].forEach(p => pts.push([p, .35*b.sw]));
  if(g.parts.includes('foot')) [b.aL, b.aR, b.tL, b.tR].forEach(p => pts.push([p, .3*b.sw]));
  X.balls.forEach(o => {
    o.r = T*.32; o.vy = Math.min(o.vy + .9*T*dt, .65*T); o.vx *= .985; o.x += o.vx*dt; o.y += o.vy*dt;
    if(o.x < o.r){ o.x = o.r; o.vx = Math.abs(o.vx); } if(o.x > W - o.r){ o.x = W - o.r; o.vx = -Math.abs(o.vx); }
    if(o.y < o.r){ o.y = o.r; o.vy = Math.abs(o.vy)*.3; }
    if(ready && now - o.hit > 380) for(const [p, pr] of pts){ if(dist(p, o) < o.r + pr && o.vy > -.4*T){
      o.vy = -1.55*T; o.vx = (o.x - p.x)/o.r * .5*T; o.hit = now; X.lastSeen = now; sfx('hit'); addRep(true); break; } }
    if(o.y - o.r > floor){ X.dropped = now; sfx('miss'); o.y = Math.max(T*.6, b.nose.y - T*1.1); o.x = b.sh.x + (Math.random()-.5)*b.sw; o.vy = 0; o.vx = 0; }
    const pop = now - o.hit < 200 ? 1.12 : 1;
    ctx.save(); ctx.lineWidth = W/150; ctx.strokeStyle = C.ink;
    ctx.beginPath(); ctx.moveTo(o.x, o.y + o.r*1.1); ctx.quadraticCurveTo(o.x - o.r*.3, o.y + o.r*1.7, o.x + o.r*.1, o.y + o.r*2.4); ctx.stroke();
    ctx.fillStyle = o.col; ctx.beginPath(); ctx.ellipse(o.x, o.y, o.r*.85*pop, o.r*pop, 0, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.beginPath(); ctx.ellipse(o.x - o.r*.3, o.y - o.r*.35, o.r*.16, o.r*.28, 0, 0, 7); ctx.fill();
    ctx.restore();
  });
}
function gxCamOff(){ X.camOn = false; camOff(); $('#gxScene').classList.remove('cam');
  const b = $('#gxCam'); b.setAttribute('aria-pressed','false'); b.querySelector('span').textContent = 'یوزی با دوربین ببیند'; }
$('#gxCam').addEventListener('click', async ()=>{
  if(X.camOn){ gxCamOff(); renderCount(); return; }
  X.camOn = true; resetBase(); X.balls = []; armCam();
  const b = $('#gxCam'); b.setAttribute('aria-pressed','true'); b.querySelector('span').textContent = 'خاموش کردنِ دوربین';
  $('#gxScene').classList.add('cam'); renderCount();
  $('#gxHint').textContent = 'جلوی دوربین بایست؛ از سر تا پا باید دیده شوی.';
  const ok = await H.camStart($('#gxScene')); if(!ok){ X.camOn = false; }
});

/* ===================================================================== story */
const Y = {page:0, found:new Set(), camOn:false, task:null, t:null};
function renderStory(i){
  const n = G.n = S().cur, Ld = LESSONS[n], st = Ld.story; Y.page = i; clearInterval(Y.t); Y.task = null;
  const H2 = H.CAM; H2.onFrame = null; H2.hint = null; H2.chipOn = null;
  $('#gsTitle').innerHTML = `قصهٔ حرکت<small>${st.name} · منزل ${fa(n)} · کتاب، ${st.src}</small>`;
  const total = st.pages.length + 1;
  const steps = Array.from({length:total}, (_,k)=>`<i class="${k<i?'on':k===i?'cur':''}"></i>`).join('');
  const readNote = `<div class="read-note"><svg viewBox="0 0 24 24" fill="none" stroke="#5d4f72" stroke-width="2" stroke-linecap="round"><path d="M4 6c3-2 5-2 8 0v13c-3-2-5-2-8 0zM20 6c-3-2-5-2-8 0v13c3-2 5-2 8 0z"/></svg>این قصه را بزرگترت برایت بلند بخواند.</div>`;
  if(i < st.pages.length){
    const pg = st.pages[i];
    $('#gsBody').innerHTML = `<div class="st-steps">${steps}</div>${i===0?readNote:''}
      <div class="st-art"><span class="who-says">${pg.who}</span>${pg.art.map(a=>`<img src="${artSrc(a)}" alt="">`).join('')}</div>
      <p class="st-text">${pg.t}</p>${pg.task ? taskHTML(pg.task) : ''}
      <div class="st-nav">${i>0?'<button class="ghost" id="gsPrev">قبلی</button>':''}<button class="cta" id="gsNext" ${pg.task?'disabled style="opacity:.5"':''}>${pg.task ? 'اول انجامش بده' : 'بعدی'}</button></div>`;
    voice(`k${n}-s${i+1}`);
    if(pg.task) wireTask(pg.task);
    else if(Y.camOn && H.CAM.stream) H.camStop();
  } else {
    Y.found = new Set();
    const text = st.pages.map(p=>p.t).join(' ').replace(/<[^>]+>/g, '').replace(/\s+/g,' ').trim();
    const words = text.split(' ');
    const clean = w => w.replace(/[.،,:؛!؟?«»"()]/g, '');
    $('#gsBody').innerHTML = `<div class="st-steps">${steps}</div>
      <div class="ask"><b>واژهٔ «${Ld.word}» را پیدا کن</b>با کمکِ بزرگترت، هر جا «${Ld.word}» را دیدی رویش بزن.</div>
      <div class="find-bar"><img src="img/yuzi-1-wait.webp" alt="" style="width:44px;height:44px;object-fit:contain"><span>پیدا کردی:</span><b id="gsFound">۰</b><span>از ${fa(Ld.count)}</span></div>
      <p class="words">${words.map((w,k)=>`<button class="w" data-k="${k}">${w}</button>`).join(' ')}</p>
      <div class="ask" id="gsAsk" hidden><b>حالا با هم حرف بزنید</b><ul class="asks">${st.asks.map(a=>`<li>${a}</li>`).join('')}</ul></div>
      <div class="st-nav"><button class="ghost" id="gsPrev">قبلی</button><button class="cta" id="gsNext" disabled style="opacity:.5">پیدا کن تا تمام شود</button></div>`;
    $$('#gsBody .w').forEach(b => b.addEventListener('click', ()=>{
      if(clean(b.textContent) === Ld.word){  sfx(Y.found.has(b.dataset.k) ? 'click' : 'hit'); Y.found.add(b.dataset.k); b.classList.add('hit'); $('#gsFound').textContent = fa(Y.found.size);
        if(Y.found.size === Ld.count){ setTimeout(()=>sfx('fanfare'), 250); const nx = $('#gsNext'); nx.disabled = false; nx.style.opacity = ''; nx.textContent = 'تمام! برگرد به خوان'; $('#gsAsk').hidden = false; LS(n).story = true; H.save(); vib([20,40,20]); } }
      else { sfx('miss'); b.classList.remove('miss'); void b.offsetWidth; b.classList.add('miss'); }
    }));
    if(H.CAM.stream) H.camStop();
    voice(`find-${n}`);
  }
  const prev = $('#gsPrev'); if(prev) prev.addEventListener('click', ()=>renderStory(Y.page - 1));
  $('#gsNext').addEventListener('click', ()=>{ if(Y.page < st.pages.length) renderStory(Y.page + 1); else H.go('gkhan'); });
  $('#s-gstory').scrollTop = 0;
}
function taskHTML(t){
  const cam = t.type === 'seq' || t.type === 'hold' || t.type === 'reps';
  const figs = t.figs ? `<div class="figrow">${t.figs.map(f=>`<img src="${figSrc(f)}" alt="">`).join('')}</div>` : '';
  let body = '';
  if(t.type === 'seq') body = `<div class="chips" id="tkChips">${t.steps.map((s,k)=>`<span data-k="${k}">${s[1]}</span>`).join('')}</div>`;
  if(t.type === 'race') body = `<div class="watch" style="padding:4px 0"><div class="time" id="tkTime" style="font-size:44px">۰٫۰<small>ثانیه</small></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button class="cta gold" id="tkWalk">راه رفتن: شروع</button><button class="cta" id="tkRun" disabled style="opacity:.5">دویدن: شروع</button></div>
      <p id="tkRes" style="margin:0;font-size:14px;line-height:1.8;text-align:center">بزرگترت «شروع» را بزند؛ وقتی به آن طرفِ اتاق رسیدی، «رسیدم».</p></div>`;
  const cnt = t.type === 'race' ? '' : `<button class="cnt" id="tkCnt" aria-live="polite">${t.type==='confirm' ? '✓' : t.type==='hold' ? fa(t.sec) : '۰'}<small>${t.type==='seq' ? `از ${fa(t.reps)} دور` : t.type==='reps' ? `از ${fa(t.goal)}` : t.type==='hold' ? 'ثانیه' : ''}</small></button>`;
  const p = `<p><b>${t.title}</b>${t.type==='confirm' ? (t.tip||'') : Y.camOn && cam ? (t.tip || 'جلوی دوربین انجام بده؛ یوزی خودش می‌شمارد.') : t.type==='race' ? '' : t.type==='hold' ? `دکمه را بزن و تا ${fa(t.sec)} بشمارید. ${t.tip||''}` : `هر ${t.type==='seq'?'دور':'بار'} را که انجام دادی، دکمه را بزن.`}${t.note?`<br><small style="color:#c9cdf0">${t.note}</small>`:''}</p>`;
  return `<div class="task">${figs}<div class="row">${cnt}${p}</div>${body}${cam && Y.camOn ? '<div class="camslot" id="tkSlot"></div>' : ''}</div>
    ${cam ? `<div style="display:flex;justify-content:center">${camBtn('tkCam', Y.camOn, 'یوزی با دوربین بشمارد')}</div>` : ''}`;
}
function taskDone(){ const nx = $('#gsNext'); if(!nx) return; nx.disabled = false; nx.style.opacity = ''; nx.textContent = 'بعدی'; const c = $('#tkCnt'); if(c){ c.classList.add('done'); c.firstChild.nodeValue = '✓'; } sfx('done'); vib([15,30,15]); }
function wireTask(t){
  const n = G.n, cnt = $('#tkCnt'); let k = 0;
  const camBtnEl = $('#tkCam');
  if(camBtnEl) camBtnEl.addEventListener('click', ()=>{ Y.camOn = !Y.camOn; if(!Y.camOn) camOff(); renderStory(Y.page); });
  if(t.type === 'confirm'){ cnt.addEventListener('click', ()=>{ if(cnt.classList.contains('done')) return; bumpCam(n, 'adult'); taskDone(); }); return; }
  if(t.type === 'race'){
    let start = 0, which = null; const res = {};
    const tick = () => { $('#tkTime').innerHTML = `${secs((performance.now()-start)/1000)}<small>ثانیه</small>`; };
    const btn = (id, key, label) => $(id).addEventListener('click', e => {
      const b = e.currentTarget;
      if(which === key){ clearInterval(Y.t); res[key] = Math.round((performance.now()-start)/100)/10; which = null; b.textContent = `${label}: ${secs(res[key])} ثانیه`; b.disabled = true; sfx('done');
        if(key === 'walk'){ const r = $('#tkRun'); r.disabled = false; r.style.opacity = ''; $('#tkRes').textContent = 'حالا برگرد و همان راه را بدو.'; }
        else { const faster = res.run < res.walk;
          $('#tkRes').innerHTML = `راه رفتن ${secs(res.walk)} ثانیه، دویدن ${secs(res.run)} ثانیه. <b style="color:var(--saffron)">${faster ? 'با دویدن زودتر رسیدی!' : 'این بار با راه رفتن زودتر رسیدی!'}</b>`;
          LS(n).log.race = res; H.save(); taskDone(); }
        return; }
      if(which) return;
      which = key; start = performance.now(); b.textContent = 'رسیدم!'; sfx('start'); Y.t = setInterval(tick, 100);
    });
    btn('#tkWalk', 'walk', 'راه رفتن'); btn('#tkRun', 'run', 'دویدن'); return;
  }
  const goal = t.type === 'seq' ? t.reps : t.type === 'reps' ? t.goal : t.sec;
  const show = v => { cnt.firstChild.nodeValue = fa(v); };
  const add = byCam => { if(k >= goal) return; k++; show(t.type==='hold' ? goal - k : k); if(byCam) bumpCam(n, t.type==='seq' ? `seq:${t.steps[0][0]}` : t.type==='hold' ? t.check : t.det); sfx(k < goal ? 'tick' : 'hit'); if(k >= goal) taskDone(); };
  if(t.type === 'seq') markChip(t, 0);
  if(!Y.camOn){
    cnt.addEventListener('click', ()=>{
      if(t.type === 'hold'){ if(Y.t) return; cnt.classList.add('run'); sfx('tick'); Y.t = setInterval(()=>{ add(false); if(k >= goal){ clearInterval(Y.t); Y.t = null; cnt.classList.remove('run'); } }, 1000); return; }
      add(false); });
    return;
  }
  cnt.addEventListener('click', ()=>{ sfx('miss'); });
  // with the camera: Yuzi counts
  resetBase();
  const CAM = H.CAM, slot = $('#tkSlot'); let seqI = 0, seqT = 0, holdAcc = 0, last = performance.now(), seen = 0;
  const det = t.type === 'reps' ? detector(t.det) : null;
  CAM.chipOn = () => performance.now() - seen < 500;
  CAM.hint = () => {
    if(CAM.state === 'nobody') return 'از سر تا پایت را در کادر بیاور';
    if(k >= goal) return 'آفرین! تمام شد';
    if(t.type === 'seq') return `${t.steps[seqI][1]}${t.steps[0][0].startsWith('head') && !BASE.head ? ' · اول به دوربین نگاه کن' : ''}`;
    if(t.type === 'hold') return performance.now() - seen < 500 ? 'آفرین! همین‌طور بمان' : t.tip;
    return performance.now() - seen < 600 ? `${fa(k)} از ${fa(goal)}` : t.tip;
  };
  CAM.onFrame = (ctx, lm, cv) => {
    const b = bodyOf(lm, cv.width, cv.height), now = performance.now(), dt = now - last; last = now;
    if(!b || k >= goal) return; updateBase(b, now);
    if(t.type === 'seq'){ const key = t.steps[seqI][0];
      if(PRED[key](b)){ if(!seqT) seqT = now; if(now - seqT > 260){ seen = now; seqT = 0; seqI++; sfx('tap', seqI);
          if(seqI >= t.steps.length){ seqI = 0; add(true); } markChip(t, seqI); } } else seqT = 0; }
    if(t.type === 'hold'){ if(PRED[t.check](b)){ seen = now; holdAcc += dt; const s = Math.floor(holdAcc/1000); while(k < s && k < goal) add(true); } }
    if(t.type === 'reps' && det && det.step(b, now)){ seen = now; add(true); }
  };
  H.camStart(slot).then(ok => { if(!ok){ Y.camOn = false; } });
}
function markChip(t, i){ $$('#tkChips span').forEach(s => { const k = +s.dataset.k; s.classList.toggle('on', k === i); s.classList.toggle('ok', k < i); }); }

/* ===================================================================== family games */
const F = {t:null, t2:null, playing:false, camOn:false, round:0, performer:1, tally:null, osta:null};
function famStop(){ clearTimeout(F.t); clearInterval(F.t2); clearTimeout(F.t3); F.playing = false; stopTune(); }
let tuneT = null;
function playTune(){ stopTune(); if(!H.ac()) return; const notes = [523,659,784,659,587,698,880,698,523,659,784,1046,880,784,659,587]; let k = 0;
  const tick = () => { if(!H.muted) H.tone(notes[k++ % notes.length], 0, .26, 'triangle', .16); tuneT = setTimeout(tick, 280); }; tick(); }
function stopTune(){ clearTimeout(tuneT); tuneT = null; }
function renderFamily(){
  const n = G.n = S().cur, Ld = LESSONS[n], fm = Ld.family; famStop(); H.syncPlayers();
  $('#gfTitle').innerHTML = `${fm.title}<small>بازی خانوادگی منزل ${fa(n)} · کتاب، ${fm.src}</small>`;
  const say = `<div class="rec-say" style="padding:0 0 12px"><img src="${yuziArt(fm.yuzi[0])}" alt=""><div class="bubble">${fm.yuzi[1]}</div></div>`;
  const intro = `<p class="fam-intro">${fm.intro}</p>${say}`;
  if(fm.kind === 'osta') famOsta(fm, intro);
  if(fm.kind === 'chairs') famChairs(fm, intro);
  if(fm.kind === 'charades') famCharades(fm, intro);
  if(fm.kind === 'feet') famFeet(fm, intro);
}
const famDone = () => { const n = G.n; if(!LS(n).family){ LS(n).family = true; H.save(); } };
function famCam(slotSel, onLabel){
  return `${camBtn('fCam', F.camOn, onLabel, true)}<div class="famcam" id="fSlot" ${F.camOn?'':'hidden'}></div>`;
}
function wireFamCam(after){
  $('#fCam').addEventListener('click', async ()=>{
    if(F.camOn){ F.camOn = false; camOff(); renderFamily(); return; }
    F.camOn = true; renderFamily();
  });
  if(F.camOn){ const slot = $('#fSlot'); slot.hidden = false; resetBase(); H.camStart(slot).then(ok => { if(!ok) F.camOn = false; else after && after(); }); }
}
/* اوستا: the phone calls the commands; with the camera on, Yuzi checks the child */
function famOsta(fm, intro){
  $('#gfBody').innerHTML = `${intro}
    <div class="fam-ctrl">
      <div class="bigcmd" id="oCmd"><img src="img/rooster-challenge.webp" alt=""><b>گوشی اوستا می‌شود</b><small>«فرمان بده» را بزن؛ همه زود انجام بدهند!</small></div>
      ${famCam('#fSlot', `یوزی ${esc(H.kidName())} را داوری کند`)}
      <div class="callout" id="oCall"><b>فرمان‌ها</b>${fm.cmds.map(c=>c.t).join(' · ')}<small>اشتباه کنی، اوستا توپ را به طرفت می‌اندازد!</small></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="cta gold" id="oNext">فرمان بده</button><button class="ghost" id="oAuto" aria-pressed="false">خودکار</button></div>
    </div>`;
  let last = -1, auto = false;
  const CAM = H.CAM;
  const check = (c) => {
    if(!(F.camOn && CAM.stream)) return;
    const want = c.k === 'squatUp' ? null : PRED[c.k]; let sawSquat = false, ok = false; const t0 = performance.now(); let seen = 0;
    CAM.chipOn = () => ok;
    CAM.hint = () => ok ? `آفرین ${H.kidName()}! درست بود` : `${c.t}!`;
    CAM.onFrame = (ctx, lm, cv) => { if(ok) return; const b = bodyOf(lm, cv.width, cv.height); if(!b) return;
      if(c.k === 'squatUp'){ if(PRED.squat(b)) sawSquat = true; else if(sawSquat && PRED.stand(b)) ok = true; }
      else if(want(b)){ seen = seen || performance.now(); if(performance.now() - seen > 250) ok = true; } else seen = 0;
      if(ok){ sfx('star'); bumpCam(G.n, 'osta'); $('#oCall').innerHTML = `<b>آفرین ${esc(H.kidName())}!</b>«${c.t}» را درست انجام دادی؛ یوزی دید.`; } };
    clearTimeout(F.t3); F.t3 = setTimeout(()=>{ if(!ok){ sfx('miss'); $('#oCall').innerHTML = `<b>توپ! اوستا توپ را انداخت</b>${esc(H.kidName())}، «${c.t}» را یوزی ندید. دفعهٔ بعد زودتر!`; } CAM.onFrame = null; }, c.k === 'squatUp' ? 4500 : 3500);
  };
  const next = () => {
    let i; do{ i = Math.random()*fm.cmds.length|0; } while(i === last && fm.cmds.length > 1); last = i; const c = fm.cmds[i];
    $('#oCmd').innerHTML = `<img src="${figSrc(c.fig)}" alt=""><b>${c.t}!</b><small>اوستا می‌گوید</small>`;
    $('#oCall').innerHTML = `<b>${c.t}</b>همه با هم! هر کس اشتباه کند، اوستا توپ را به طرفش می‌اندازد.`;
    sfx('start'); voice(`osta-${c.k}`); vib(20); F.round++; if(F.round >= 3) famDone(); check(c);
  };
  $('#oNext').addEventListener('click', next);
  $('#oAuto').addEventListener('click', e => { auto = !auto; e.currentTarget.setAttribute('aria-pressed', auto); e.currentTarget.textContent = auto ? 'توقفِ خودکار' : 'خودکار'; clearInterval(F.t2); if(auto){ next(); F.t2 = setInterval(next, 5000); } });
  wireFamCam();
}
/* صندلی‌بازی: music, a surprise stop, and everyone sits properly; Yuzi checks the child */
function famChairs(fm, intro){
  $('#gfBody').innerHTML = `${intro}
    <div class="fam-ctrl">
      <div class="figrow" style="width:100%"><img src="${figSrc('m3-walkA')}" alt=""><img src="${figSrc('m2-sitOk')}" alt=""></div>
      ${famCam('#fSlot', `یوزی نشستنِ ${esc(H.kidName())} را ببیند`)}
      <div class="callout" id="cCall"><b>گوشی آهنگ پخش می‌کند</b><small>و یک جای غافلگیرکننده قطعش می‌کند</small></div>
      <button class="cta" id="cMusic">پخش آهنگ</button>
    </div>`;
  const CAM = H.CAM;
  $('#cMusic').addEventListener('click', ()=>{
    if(F.playing){ famStop(); $('#cMusic').textContent = 'پخش آهنگ'; return; }
    F.playing = true; playTune(); $('#cMusic').textContent = 'آهنگ در حال پخش…';
    $('#cCall').innerHTML = '<b>آرام دورِ صندلی‌ها راه بروید</b><small>گوش کنید؛ آهنگ هر لحظه ممکن است قطع شود!</small>';
    CAM.onFrame = null; CAM.chipOn = null; CAM.hint = () => 'با آهنگ راه برو';
    F.t = setTimeout(()=>{
      famStop(); $('#cMusic').textContent = 'دور بعد'; sfx('fanfare'); vib([30,40,30]);
      const tr = fm.tricks[Math.random()*fm.tricks.length|0];
      $('#cCall').innerHTML = `<b>بنشینید! درست و صاف</b>هر کس روی صندلیِ علامت‌دار نشست: ${tr}<small>پیشنهادِ گوشی است؛ خودتان هم شیرین‌کاری بسازید</small>`;
      famDone();
      if(F.camOn && CAM.stream){ let ok = false, t0 = 0;
        CAM.chipOn = () => ok; CAM.hint = () => ok ? 'آفرین! درست نشستی' : 'زود بنشین، کمر صاف!';
        CAM.onFrame = (ctx, lm, cv) => { if(ok) return; const b = bodyOf(lm, cv.width, cv.height); if(b && PRED.sitStraight(b)){ t0 = t0 || performance.now(); if(performance.now() - t0 > 600){ ok = true; sfx('star'); bumpCam(G.n, 'chairs'); } } else t0 = 0; };
        F.t3 = setTimeout(()=>{ CAM.onFrame = null; if(!ok){ CAM.hint = () => 'این بار یوزی ندید؛ دور بعد!'; } }, 5000); }
    }, 6000 + Math.random()*8000);
  });
  wireFamCam();
}
/* حدسِ حیوان: a secret animal card for the performer, then everyone copies it with the sound */
function famCharades(fm, intro){
  const P = H.PLAYERS;
  const faces = () => P.map((p,i)=>`<button class="player-pick" data-i="${i}" style="border:0;background:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:12px;font-weight:700;color:var(--ink)">
      <span style="width:52px;height:52px;border-radius:50%;overflow:hidden;background:#fff;box-shadow:0 3px 0 var(--paper-2);border:3px solid ${i===F.performer?'var(--anar)':'transparent'}"><img src="img/${p.img}.webp" alt="" style="width:100%;height:100%;object-fit:cover;object-position:50% 20%;${p.kid?'transform:scale(2.1);transform-origin:50% 8%':''}"></span>${p.n}</button>`).join('');
  let secret = null, shown = false, stage = 'pick';
  const draw = () => {
    const perf = P[F.performer];
    $('#gfBody').innerHTML = `${intro}
      <div class="fam-ctrl">
        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">${faces()}</div>
        <div class="bigcmd secret" id="chCard">${stage==='pick' ? `<b>نوبتِ ${esc(perf.n)}</b><small>فقط ${esc(perf.n)} کارت را ببیند؛ بقیه چشم‌ها را ببندند!</small>`
          : shown ? `<img src="${artSrc(secret[1])}" alt=""><b>${secret[0]}</b><small>حالا کارت را بپوشان و مثلِ ${secret[0]} حرکت کن</small>`
          : stage==='act' ? `<b>${esc(perf.n)} نمایش می‌دهد…</b><small>بقیه حدس بزنند: این چه حیوانی است؟</small>`
          : `<img src="${artSrc(secret[1])}" alt=""><b>${secret[0]} بود!</b><small>حالا همه با صدای ${secret[0]} همین حرکت را تکرار کنید. قشنگ‌ترین نمایش را انتخاب کنید تا نوبتِ او شود.</small>`}</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">${stage==='pick' ? '<button class="cta gold" id="chShow">کارتِ مخفی را ببین</button>'
          : shown ? '<button class="cta" id="chHide">دیدم، بپوشان</button>' : stage==='act' ? '<button class="cta gold" id="chGot">حدس زدند!</button><button class="ghost" id="chPeek">دوباره ببینم</button>'
          : '<button class="cta" id="chNext">دورِ بعد</button>'}</div>
      </div>`;
    $$('.player-pick').forEach(b => b.addEventListener('click', ()=>{ F.performer = +b.dataset.i; sfx('click'); if(stage==='reveal'){ stage = 'pick'; } draw(); }));
    const on = (id, f) => { const e = $(id); if(e) e.addEventListener('click', f); };
    on('#chShow', ()=>{ secret = fm.animals[Math.random()*fm.animals.length|0]; shown = true; stage = 'act'; sfx('click'); draw(); });
    on('#chHide', ()=>{ shown = false; sfx('click'); draw(); });
    on('#chPeek', ()=>{ shown = true; draw(); });
    on('#chGot', ()=>{ stage = 'reveal'; shown = false; sfx('fanfare'); famDone(); draw(); });
    on('#chNext', ()=>{ stage = 'pick'; F.performer = (F.performer + 1) % P.length; draw(); });
  };
  draw();
}
/* بالای سر با پا: music for a set time, then a tally of what each player lifted overhead */
function famFeet(fm, intro){
  const P = H.PLAYERS; F.tally = F.tally && F.tally.length === P.length ? F.tally : P.map(()=>0);
  const draw = (left) => {
    const best = Math.max(...F.tally);
    $('#gfBody').innerHTML = `${intro}
      <div class="fam-ctrl">
        <div class="figrow" style="width:100%"><img src="${figSrc('m4-feetUp')}" alt=""><img src="${figSrc('m4-feetStack')}" alt=""></div>
        <div class="callout" id="fCall">${left!=null ? `<b>${fa(left)} ثانیه</b>با پا بردار، با دست بالای سر بگذار!` : '<b>گوشی آهنگ پخش می‌کند</b><small>تا آهنگ تمام شود، هر کس هر چه می‌تواند بالای سرش بگذارد</small>'}</div>
        <button class="cta" id="fMusic">${F.playing ? 'توقف' : 'پخش آهنگ (۳۰ ثانیه)'}</button>
        <div class="tally">${P.map((p,i)=>`<div class="${best>0 && F.tally[i]===best ? 'lead' : ''}"><img src="img/${p.img}.webp" alt="" style="${p.kid?'transform:scale(2.1);transform-origin:50% 8%':''}"><b>${esc(p.n)}</b><button data-i="${i}" data-d="-1" aria-label="کم کن">−</button><output>${fa(F.tally[i])}</output><button data-i="${i}" data-d="1" aria-label="اضافه کن">+</button></div>`).join('')}</div>
      </div>`;
    $$('.tally button').forEach(b => b.addEventListener('click', ()=>{ const i = +b.dataset.i; F.tally[i] = Math.max(0, F.tally[i] + +b.dataset.d); sfx('tap', F.tally[i]); draw(F.playing ? F.left : null); }));
    $('#fMusic').addEventListener('click', ()=>{
      if(F.playing){ famStop(); draw(); return; }
      F.tally = P.map(()=>0); F.playing = true; F.left = 30; playTune(); draw(F.left);
      F.t2 = setInterval(()=>{ F.left--; const c = $('#fCall'); if(c) c.innerHTML = `<b>${fa(F.left)} ثانیه</b>با پا بردار، با دست بالای سر بگذار!`;
        if(F.left <= 0){ famStop(); sfx('fanfare'); famDone(); draw(); const best = Math.max(...F.tally), w = P.filter((p,i)=>F.tally[i]===best && best>0).map(p=>p.n);
          $('#fCall').innerHTML = w.length ? `<b>آفرین ${w.map(esc).join(' و ')}!</b>بیشترین شیء را بالای سر گذاشت. همه تشویقش کنید!` : '<b>آهنگ تمام شد!</b>شماره‌ها را وارد کنید و برنده را تشویق کنید.'; } }, 1000);
    });
  };
  draw();
}

/* ===================================================================== play and earn a star */
const R = {watchT:null, start:0, camOn:false, mode:'cam'};
function renderStar(){
  const n = G.n = S().cur, Ld = LESSONS[n], sk = Ld.star, st = LS(n);
  clearInterval(R.watchT); R.watchT = null;
  $('#grTitle').innerHTML = `${sk.title}<small>بازی کن و ستاره بگیر · منزل ${fa(n)} · کتاب، ${sk.src}</small>`;
  $('#grStars').innerHTML = Array.from({length:7}, (_,k)=>H.STAR(k < st.stars)).join('');
  $('#grStars').setAttribute('aria-label', `${fa(st.stars)} ستاره از هفت`);
  const book = `<p class="rec-msg" style="min-height:0">«${sk.t}»</p>`;
  if(sk.kind === 'cards') starCards(sk, book);
  if(sk.kind === 'posture') starPosture(sk, book);
  if(sk.kind === 'jump' || sk.kind === 'timer') starRecord(sk, book);
}
function giveStar(msg){ const st = LS(G.n); if(st.stars < 7){ st.stars++; H.save(); sfx('star'); vib([20,40,20]); }
  $('#grStars').innerHTML = Array.from({length:7}, (_,k)=>H.STAR(k < st.stars)).join(''); }
const CARD_ICONS = {
  turn:`<rect x="8" y="40" width="48" height="6" rx="3" fill="#d9c79f"/><circle cx="18" cy="24" r="7" fill="${C.fay}"/><rect x="12" y="31" width="12" height="9" rx="4" fill="${C.fay}"/><circle cx="34" cy="24" r="7" fill="${C.saffron}"/><rect x="28" y="31" width="12" height="9" rx="4" fill="${C.saffron}"/><circle cx="50" cy="24" r="7" fill="${C.anar}"/><rect x="44" y="31" width="12" height="9" rx="4" fill="${C.anar}"/>`,
  water:`<rect x="22" y="14" width="20" height="38" rx="8" fill="${C.fay}" stroke="${C.ink}" stroke-width="2.5"/><rect x="26" y="8" width="12" height="8" rx="2" fill="${C.anar}" stroke="${C.ink}" stroke-width="2.5"/><path d="M22 32h20" stroke="#fff" stroke-width="3"/>`,
  help:`<circle cx="20" cy="18" r="7" fill="${C.saffron}"/><circle cx="44" cy="30" r="7" fill="${C.fay}"/><path d="M20 26v14M20 30l16 4M44 38v14" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/><path d="M28 50q4-6 10-4" fill="none" stroke="${C.anar}" stroke-width="3"/>`,
  trash:`<path d="M18 22h28l-3 32H21z" fill="${C.lapis}" stroke="${C.ink}" stroke-width="2.5"/><rect x="15" y="16" width="34" height="6" rx="2" fill="${C.lapis}" stroke="${C.ink}" stroke-width="2.5"/><path d="M30 6l4 6" stroke="${C.ink}" stroke-width="3"/><circle cx="28" cy="8" r="4" fill="${C.anar}"/>`,
  tidy:`<path d="M12 30h40v22H12z" fill="#c9893f" stroke="${C.ink}" stroke-width="2.5"/><circle cx="24" cy="24" r="8" fill="${C.anar}" stroke="${C.ink}" stroke-width="2.5"/><rect x="34" y="16" width="12" height="14" rx="2" fill="${C.saffron}" stroke="${C.ink}" stroke-width="2.5"/>`,
  outside:`<circle cx="46" cy="16" r="8" fill="${C.saffron}"/><path d="M8 52q14-14 24 0t24 0" fill="#4fb35a"/><path d="M14 38l20-10-6 14z" fill="#fff" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`
};
function starCards(sk, book){
  const st = LS(G.n); st.log.cards = st.log.cards || {};
  $('#grBody').innerHTML = `${book}<div class="cards">${sk.cards.map(([k,t])=>`<button class="card" data-k="${k}">${st.log.cards[k]?`<span class="n">${fa(st.log.cards[k])}</span>`:''}<svg viewBox="0 0 64 60">${CARD_ICONS[k]}</svg>${t}</button>`).join('')}</div>
    <div class="callout" id="cdAsk" style="margin:0 16px;width:auto" hidden></div>
    <p class="rec-msg" id="cdMsg">هر کارِ درستی که امروز انجام دادی را بزن؛ بزرگترت تأیید کند و یک ستاره بگیر.</p>`;
  $$('.card').forEach(b => b.addEventListener('click', ()=>{
    const k = b.dataset.k, t = sk.cards.find(c=>c[0]===k)[1]; sfx('click');
    const ask = $('#cdAsk'); ask.hidden = false;
    ask.innerHTML = `<b>«${t}»</b>بزرگترت تأیید می‌کند؟<div style="display:flex;gap:10px;justify-content:center;margin-top:10px"><button class="cta gold" id="cdYes">بله</button><button class="ghost" id="cdNo">هنوز نه</button></div>`;
    $('#cdYes').addEventListener('click', ()=>{ st.log.cards[k] = (st.log.cards[k]||0) + 1; H.save();
      const had = st.stars; giveStar(); starCards(sk, book);
      $('#cdMsg').innerHTML = had < 7 ? `<b>یک ستارهٔ تازه!</b> «${t}» کارِ درستی بود.` : `<b>هر هفت ستاره را گرفتی!</b> باز هم کارِ درست انجام بده.`; });
    $('#cdNo').addEventListener('click', ()=>{ ask.hidden = true; });
  }));
}
function starPosture(sk, book){
  const st = LS(G.n), today = H.dayNum();
  st.log.posture = st.log.posture && st.log.posture.d === today ? st.log.posture : {d:today, on:{}, star:false};
  const P0 = st.log.posture;
  $('#grBody').innerHTML = `${book}<div class="checks">${sk.checks.map(([k,t,f,cam])=>`<button class="check ${P0.on[k]?'on':''}" data-k="${k}"><img src="${figSrc(f)}" alt=""><b>${t}${cam && !P0.on[k] ? '<br><small style="font-weight:500;color:var(--ink-soft)">یا یوزی با دوربین ببیند</small>' : ''}</b><i></i></button>`).join('')}</div>
    <div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap" id="psCams">${sk.checks.filter(c=>c[3] && !P0.on[c[0]]).map(c=>`<button class="camtoggle" data-cam="${c[0]}">${camIcon}<span>یوزی ببیند: ${c[0]==='stand' ? 'ایستادن' : 'نشستن'}</span></button>`).join('')}</div>
    <div class="rec-stage cam" id="psSlot" hidden style="margin:0 16px"></div>
    <p class="rec-msg" id="psMsg">${P0.star ? '<b>ستارهٔ امروز را گرفتی!</b> فردا دوباره.' : 'امروز هر چهار کار را درست انجام بده تا ستارهٔ امروز را بگیری.'}</p>`;
  const done = () => { if(!P0.star && sk.checks.every(c => P0.on[c[0]])){ P0.star = true; H.save(); giveStar(); $('#psMsg').innerHTML = '<b>ستارهٔ امروز!</b> هر چهار کار را درست انجام دادی.'; } };
  $$('.check').forEach(b => b.addEventListener('click', ()=>{ const k = b.dataset.k; P0.on[k] = !P0.on[k]; H.save(); sfx(P0.on[k] ? 'hit' : 'click'); b.classList.toggle('on', P0.on[k]); done(); }));
  $$('#psCams [data-cam]').forEach(b => b.addEventListener('click', async ()=>{
    const k = b.dataset.cam, c = sk.checks.find(x=>x[0]===k), slot = $('#psSlot'); slot.hidden = false; slot.scrollIntoView({block:'center', behavior:'smooth'});
    const CAM = H.CAM; let acc = 0, last = performance.now(), ok = false;
    CAM.chipOn = () => performance.now() - last < 300 && acc > 0;
    CAM.hint = () => ok ? 'آفرین! یوزی دید' : k === 'stand' ? 'روبه‌روی دوربین صاف بایست' : 'روی صندلی صاف بنشین';
    CAM.onFrame = (ctx, lm, cv) => { if(ok) return; const bd = bodyOf(lm, cv.width, cv.height), now = performance.now();
      if(bd && PRED[c[3]](bd)){ acc += now - last; } last = now;
      if(acc > 3000){ ok = true; P0.on[k] = true; bumpCam(G.n, c[3]); H.save(); sfx('star'); setTimeout(()=>{ camOff(); starPosture(sk, book); done(); }, 900); } };
    await H.camStart(slot);
  }));
}
function starRecord(sk, book){
  const st = LS(G.n), jump = sk.kind === 'jump';
  const recs = st.rec.filter(r => !jump || r.m === R.mode);
  const unit = jump ? 'سانتی‌متر' : 'ثانیه', show = v => jump ? fa(Math.round(v)) : secs(v);
  const off = Math.max(0, recs.length-7), last = recs.slice(off), top = Math.max(jump ? 20 : 10, ...last.map(r=>r.v));
  const bars = last.map((r,k)=>{ const prev = off+k>0 ? recs[off+k-1].v : null; return `<div>${show(r.v)}<i class="${prev!==null && r.v>prev ? 'up':''}" style="height:${Math.max(6, r.v/top*100)}%"></i></div>`; }).join('');
  const fig = `<div class="rec-stage" id="rsStage"><img id="rsFig" src="" alt=""><img src="img/${jump ? 'gazelle-challenge' : 'gazelle-challenge'}.webp" alt=""></div>`;
  const modes = jump ? `<div class="modes"><button data-m="cam" aria-pressed="${R.mode==='cam'}">بلندیِ پرش با دوربین</button><button data-m="tape" aria-pressed="${R.mode==='tape'}">طولِ پرش با متر</button></div>` : '';
  let ctrl;
  if(jump && R.mode === 'cam') ctrl = `<div style="display:flex;justify-content:center">${camBtn('rsCam', R.camOn, 'یوزی با دوربین اندازه بگیرد', false)}</div>
      <div class="watch"><div class="time" id="rsVal">${recs.length ? show(recs[recs.length-1].v) : '۰'}<small>${unit}</small></div></div>
      <p class="rec-msg" id="rsMsg">${R.camOn ? 'جفت‌پا درجا بپر؛ یوزی بلندیِ پرش را اندازه می‌گیرد.' : 'دوربین را روشن کن و از سر تا پا در کادر بایست. بعد جفت‌پا بپر!'}</p>`;
  else if(jump) ctrl = `<div class="watch"><div class="numin"><input id="rsIn" type="text" inputmode="decimal" autocomplete="off" placeholder="مثلاً ۸۵" aria-label="طولِ پرش به سانتی‌متر"><span style="color:#c9cdf0">سانتی‌متر</span></div><button class="cta gold" id="rsSave">ثبت</button></div>
      <p class="rec-msg" id="rsMsg">مثلِ شکل جفت‌پا به جلو بپر. بزرگترت از خطِ شروع تا پاشنه را با متر اندازه بگیرد و این‌جا بنویسد.</p>`;
  else ctrl = `<div class="watch"><div class="time" id="rsVal">۰٫۰<small>ثانیه</small></div><button class="cta gold" id="rsBtn">شروع</button></div>
      <p class="rec-msg" id="rsMsg">مثلِ شکل خرچنگی راه برو. بزرگترت «شروع» را بزند و وقتی نشستی یا ایستادی، «تمام».</p>`;
  $('#grBody').innerHTML = `${book}${modes}${fig}${ctrl}<div class="bars" aria-hidden="true">${bars}</div>
    ${sk.yuzi ? `<div class="rec-say"><img src="${yuziArt(sk.yuzi[0])}" alt=""><div class="bubble">${sk.yuzi[1]}</div></div>` : ''}`;
  flipFigs($('#rsFig'), sk.fig, 1000);
  $$('.modes [data-m]').forEach(b => b.addEventListener('click', ()=>{ R.mode = b.dataset.m; if(R.camOn){ R.camOn = false; camOff(); } sfx('click'); starRecord(sk, book); }));
  const record = v => {
    const prevList = st.rec.filter(r => !jump || r.m === R.mode), prev = prevList.length ? prevList[prevList.length-1].v : null;
    st.rec.push({v, m: jump ? R.mode : 't', d:H.dayNum()}); H.save();
    let msg;
    if(prev !== null && v > prev && st.stars < 7){ giveStar(); msg = `<b>بیشتر از دفعهٔ قبل!</b> ${show(v)} ${unit}؛ یک ستارهٔ تازه گرفتی.`; }
    else if(prev === null) { sfx('soft'); msg = `<b>${show(v)} ${unit}</b>. دفعهٔ بعد بیشتر تا ستاره بگیری.`; }
    else { sfx('soft'); msg = `<b>${show(v)} ${unit}</b>. دفعهٔ قبل ${show(prev)} بود. دوباره امتحان کن!`; }
    return msg;
  };
  if(jump && R.mode === 'tape'){
    $('#rsSave').addEventListener('click', ()=>{ const v = parseFloat(($('#rsIn').value||'').replace(/[۰-۹]/g, d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[٫,]/g,'.'));
      if(!(v > 0 && v < 400)){ sfx('miss'); $('#rsMsg').textContent = 'یک عدد بنویس، مثلاً ۸۵.'; return; }
      const m = record(v); starRecord(sk, book); $('#rsMsg').innerHTML = m; });
  }
  if(!jump){
    $('#rsBtn').addEventListener('click', e => {
      const b = e.currentTarget;
      if(R.watchT){ clearInterval(R.watchT); R.watchT = null; const v = Math.round((performance.now()-R.start)/100)/10; const m = record(v); starRecord(sk, book); $('#rsVal').innerHTML = `${secs(v)}<small>ثانیه</small>`; $('#rsMsg').innerHTML = m; return; }
      R.start = performance.now(); sfx('start'); b.textContent = 'تمام'; b.classList.add('stop'); $('#rsMsg').textContent = 'برو، خرچنگِ قوی!';
      R.watchT = setInterval(()=>{ $('#rsVal').innerHTML = `${secs((performance.now()-R.start)/1000)}<small>ثانیه</small>`; }, 100);
    });
  }
  if(jump && R.mode === 'cam'){
    $('#rsCam').addEventListener('click', ()=>{ R.camOn = !R.camOn; if(!R.camOn) camOff(); starRecord(sk, book); });
    if(R.camOn){
      const stage = $('#rsStage'); stage.classList.add('cam'); stage.querySelectorAll('img').forEach(i=>i.hidden = true); clearInterval(flipT);
      resetBase(); const CAM = H.CAM; let air = false, top = 0, hip0 = null, lastJump = 0;
      CAM.chipOn = () => air || performance.now() - lastJump < 800;
      CAM.hint = () => air ? 'پرواز!' : performance.now() - lastJump < 1500 ? 'آفرین!' : hip0 === null ? 'صاف بایست تا یوزی اندازه‌ات را بگیرد' : 'جفت‌پا بپر!';
      CAM.onFrame = (ctx, lm, cv) => { const b = bodyOf(lm, cv.width, cv.height), now = performance.now(); if(!b || !b.feet) return; updateBase(b, now);
        if(!air && PRED.stand(b) && !airborne(b)) hip0 = hip0 === null ? b.hip.y : hip0*.9 + b.hip.y*.1;
        if(!air && airborne(b) && hip0 !== null){ air = true; top = b.hip.y; }
        else if(air){ top = Math.min(top, b.hip.y);
          if(!airborne(b)){ air = false; lastJump = now;
            /* a 7-year-old's leg (hip to ankle) is about 55 cm; good enough to compare one jump with the next */
            const cm = Math.max(1, (hip0 - top)/b.leg * 55);
            bumpCam(G.n, 'jump'); const m = record(Math.round(cm));
            $('#rsVal').innerHTML = `${fa(Math.round(cm))}<small>سانتی‌متر</small>`; $('#rsMsg').innerHTML = m + '<br><small style="color:#c9cdf0">اندازه تقریبی است؛ هر پرش با پرشِ قبلیِ خودت مقایسه می‌شود.</small>';
            $('#grStars').innerHTML = Array.from({length:7}, (_,k)=>H.STAR(k < st.stars)).join(''); } } };
      H.camStart(stage).then(ok => { if(!ok) R.camOn = false; });
    }
  }
}

/* ===================================================================== parents */
let ptab = null;
const CAM_LABELS = {balloon:'ضربه به بادکنکِ مجازی', freeMove:'حرکت با چوب پشتِ شانه', squat:'بنشین‌وپاشو با چوب', jump:'پرشِ جفت', frog:'پرشِ قورباغه', hen:'بال زدنِ مرغ', drum:'مشت به سینه مثلِ گوریل',
  'seq:legL':'دورِ کاملِ حرکتِ پاها', 'seq:headR':'دورِ کاملِ حرکتِ سر و گردن', 'seq:armU':'دورِ کاملِ حرکتِ دست‌ها', standStraight:'ثانیهٔ درست ایستادن', sitStraight:'ثانیهٔ درست نشستن',
  run:'قدمِ دویدنِ درجا', circle:'چرخشِ دست‌ها', toe:'بالا رفتن روی پنجه', hug:'بغل کردنِ زانو', lunge:'قدمِ بلند با زانوی خم', osta:'فرمانِ درست در بازیِ اوستا', chairs:'نشستنِ درست در صندلی‌بازی',
  adult:'حرکتی که بزرگتر تأیید کرد'};
function renderParentsTabs(){
  const list = [1,2,3,4,5].filter(n => n === 5 ? true : H.lessonOpen(n));
  if(!ptab || !list.includes(ptab)) ptab = S().cur;
  $('#pTabs').innerHTML = list.map(n => `<button role="tab" data-n="${n}" aria-selected="${n===ptab}">منزل ${fa(n)}</button>`).join('');
  $$('#pTabs button').forEach(b => b.addEventListener('click', ()=>{ ptab = +b.dataset.n; sfx('click'); renderParentsTabs(); }));
  $('#p5').hidden = ptab !== 5; $('#pG').hidden = ptab === 5;
  if(ptab === 5){ $('#parentsTitle').innerHTML = `گزارشِ ${esc(H.kidName())}<small>هفتهٔ تعادل · منزل ۵</small>`; return; }
  const n = ptab, Ld = LESSONS[n], st = LS(n), d = doneDays(n);
  $('#parentsTitle').innerHTML = `گزارشِ ${esc(H.kidName())}<small>هفتهٔ «${Ld.title}» · منزل ${fa(n)}</small>`;
  const cal = Ld.play.games.map((g,gi)=>`<tr><td>${g.name}</td>${[0,1,2].map(k=>{ const x = st.days[k], v = x && (x.moves||[]).includes(gi) ? x.feel : null;
    return `<td>${v===null||v===undefined ? '<span class="empty" aria-label="هنوز نه"></span>' : `<svg viewBox="0 0 60 60" role="img" aria-label="${['سخت بود','معمولی بود','خیلی خوب بود'][v]}">${H.face(v)}</svg>`}</td>`; }).join('')}</tr>`).join('');
  const camRows = Object.entries(st.cam).filter(([k,v])=>v>0).map(([k,v])=>`<div><b>${fa(k==='standStraight'||k==='sitStraight' ? v : v)}</b><span>${CAM_LABELS[k]||k}</span></div>`).join('');
  let starLog = '';
  if(Ld.star.kind === 'cards'){ const c = st.log.cards || {}; starLog = Ld.star.cards.filter(([k])=>c[k]).map(([k,t])=>`<div class="beh"><p>${t}</p><b style="font-family:var(--f-display);font-size:20px;color:var(--lapis)">${fa(c[k])} بار</b></div>`).join('') || '<div class="beh"><p>هنوز ثبت نشده.</p></div>'; }
  else if(Ld.star.kind === 'posture') starLog = `<div class="beh"><p>${st.stars ? `${fa(st.stars)} روز هر چهار کار را درست انجام داد.` : 'هنوز روزی کامل نشده.'}</p></div>`;
  else { const u = Ld.star.kind === 'jump' ? '' : ' ثانیه'; const sh = r => Ld.star.kind === 'jump' ? `${fa(Math.round(r.v))} سانتی‌متر${r.m==='cam'?' (دوربین)':' (متر)'}` : `${secs(r.v)}${u}`;
    starLog = st.rec.length ? `<div class="beh"><p>${st.rec.map(sh).join(' ← ')}</p></div>` : '<div class="beh"><p>هنوز رکوردی ثبت نشده.</p></div>'; }
  $('#pG').innerHTML = `<div class="p-sum"><div><b>${fa(d)} از ۳</b><span>روزِ تمرینِ این هفته</span></div><div><b>${st.story ? '✓' : '—'}</b><span>قصه و پیدا کردنِ «${Ld.word}»</span></div><div><b>${fa(st.stars)} از ۷</b><span>ستاره</span></div></div>
    <div class="p-h">تقویم هفتگی</div>
    <table class="cal"><thead><tr><th scope="col" style="text-align:start">بازی</th><th scope="col">روز اول</th><th scope="col">روز دوم</th><th scope="col">روز سوم</th></tr></thead><tbody>${cal}</tbody></table>
    <p class="src">صورتک‌ها را خودِ کودک بعد از هر بازی انتخاب کرده است، مثلِ جدولِ کتاب (${Ld.play.src}).</p>
    <div class="p-h">آنچه دوربین دید <span class="cam-badge">${camIcon}اندازه‌گیری، نه حدس</span></div>
    <div class="verified">${camRows || '<div><b><small style="font-size:14px;color:var(--ink-soft)">هنوز نه</small></b><span>با دوربین بازی کنید تا این‌جا پر شود</span></div>'}</div>
    <p class="src">«حرکتی که بزرگتر تأیید کرد» برای حرکت‌های روی زمین است که دوربین خوب نمی‌بیند. تصویری ذخیره یا فرستاده نمی‌شود؛ فقط همین عددها می‌مانند.</p>
    <div class="p-h">${Ld.star.title}</div>${starLog}
    <p class="src">کتاب، ${Ld.star.src}: «${Ld.star.t}»</p>
    <div class="p-h">حالتِ آزمایشی</div>
    <div class="beh"><p>${S().openAll ? 'همهٔ خوان‌های ساخته‌شده باز هستند تا همه را امتحان کنید.' : 'خوان‌ها به ترتیب باز می‌شوند: هر منزل بعد از سه مشعلِ منزلِ قبلی.'}</p><button class="seal" id="pOpen">${S().openAll ? 'ترتیبِ واقعی' : 'همه باز'}</button></div>`;
  $('#pOpen').addEventListener('click', ()=>{ S().openAll = !S().openAll; H.save(); sfx('click'); renderParentsTabs(); });
}

/* ===================================================================== wiring into the page */
window.HKX = {
  openKhan,
  enter(name){
    if(name === 'gkhan'){ if(S().cur <= 4) G.khan = LESSONS[S().cur].khan; renderKhan();
      if(!['gchoose','gex','gstory','gfam','gstar'].includes(G.at)) voice(`guard-${KHAN_INFO[G.khan].guard}`); }
    G.at = name;
    if(name === 'gchoose') renderChoose();
    if(name === 'gex') startGame();
    if(name === 'gstory'){ Y.camOn = false; renderStory(0); }
    if(name === 'gfam'){ F.camOn = false; F.round = 0; renderFamily(); }
    if(name === 'gstar'){ R.camOn = false; renderStar(); }
    if(name === 'parents') renderParentsTabs();
  },
  leave(name){
    clearInterval(flipT); clearInterval(Y.t); clearInterval(R.watchT); R.watchT = null; famStop();
    if(name !== 'gex'){ X.camOn = false; $('#gxScene').classList.remove('cam'); const b = $('#gxCam'); b.setAttribute('aria-pressed','false'); b.querySelector('span').textContent = 'یوزی با دوربین ببیند'; }
    const CAM = H.CAM; CAM.onFrame = null; CAM.hint = null; CAM.chipOn = null;
  },
  LESSONS, POSES, figSrc, PRED, bodyOf, detector, updateBase, resetBase, airborne
};
$$('#gxFeel [data-face]').forEach(s => s.innerHTML = H.face(+s.dataset.face));
})();
