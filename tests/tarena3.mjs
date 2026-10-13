import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',`--use-file-for-fake-video-capture=${process.cwd()}/blank.y4m`]});
const p = await (await b.newContext({viewport:{width:390,height:844}, permissions:['camera']})).newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console', m=>{ if(m.type()==='error') errs.push(m.text()); }); p.setDefaultTimeout(20000);
await p.goto('file:///home/user/haftkhan/prototype/index.html'); await p.fill('#kidName','سارا'); await p.click('#helloGo'); await p.waitForTimeout(300);
await p.click('.nav button[data-go="arena"]'); await p.waitForTimeout(300); await p.screenshot({path:'ar-screen.png'});
const play = async (game, mode, secs) => {
  await p.evaluate(()=>HK.go('arena')); await p.click(`[data-game="${game}"]`); await p.waitForTimeout(4500);
  return await p.evaluate(async ({game, mode, secs}) => {
    const CAM = HK.CAM, keep = CAM.stream; CAM.stream = null; await new Promise(r=>setTimeout(r,100));
    const W = 640, H = 480, cv = {width:W, height:H}, ctx = new OffscreenCanvas(W,H).getContext('2d');
    const base = {0:[.5,.2],7:[.53,.19],8:[.47,.19],11:[.58,.3],12:[.42,.3],13:[.6,.42],14:[.4,.42],15:[.6,.52],16:[.4,.52],19:[.6,.54],20:[.4,.54],23:[.55,.55],24:[.45,.55],25:[.55,.72],26:[.45,.72],27:[.55,.9],28:[.45,.9],31:[.56,.93],32:[.44,.93]};
    const POSE = {
      up:{13:[.58,.18],14:[.42,.18],15:[.56,.06],16:[.44,.06],19:[.56,.05],20:[.44,.05]},
      wings:{13:[.68,.3],14:[.32,.3],15:[.8,.3],16:[.2,.3],19:[.82,.3],20:[.18,.3]},
      star:{13:[.68,.2],14:[.32,.2],15:[.78,.1],16:[.22,.1],19:[.79,.09],20:[.21,.09],25:[.6,.72],26:[.4,.72],27:[.66,.9],28:[.34,.9],31:[.67,.93],32:[.33,.93]},
      squat:{0:[.5,.33],7:[.53,.32],8:[.47,.32],11:[.58,.43],12:[.42,.43],13:[.68,.43],14:[.32,.43],15:[.8,.43],16:[.2,.43],23:[.55,.68],24:[.45,.68],25:[.64,.74],26:[.36,.74],27:[.56,.9],28:[.44,.9]},
      half:{0:[.5,.25],7:[.53,.24],8:[.47,.24],11:[.58,.35],12:[.42,.35],23:[.55,.61],24:[.45,.61],25:[.58,.75],26:[.42,.75]},
      storkL:{13:[.68,.3],14:[.32,.3],15:[.8,.3],16:[.2,.3],25:[.6,.6],27:[.6,.72],31:[.61,.74]},
      storkR:{13:[.68,.3],14:[.32,.3],15:[.8,.3],16:[.2,.3],26:[.4,.6],28:[.4,.72],32:[.39,.74]},
      leanL:{0:[.58,.2],7:[.61,.19],8:[.55,.19],11:[.66,.31],12:[.5,.29],13:[.68,.18],14:[.55,.16],15:[.66,.05],16:[.6,.04]},
      leanR:{0:[.42,.2],7:[.45,.19],8:[.39,.19],11:[.5,.29],12:[.34,.31],13:[.45,.16],14:[.32,.18],15:[.4,.04],16:[.34,.05]}
    };
    let seed = 5; const rnd = () => { seed = (seed*16807) % 2147483647; return seed/2147483647; }; const g = () => { let u=0; for(let i=0;i<6;i++) u+=rnd(); return (u-3)/1.2; }; const J = mode === 'still' ? .012 : .003; let vmax = 0;
    const t0 = performance.now(); let f = 0;
    while(performance.now() - t0 < secs*1000){
      let pose = JSON.parse(JSON.stringify(base));
      const A = HKA._A, run = A.phase === 'run';
      if(run && game === 'hill' && mode !== 'still'){ const per = mode === 'jog' ? 500 : 220, lift = mode === 'jog' ? .035 : .12, ph = Math.floor((performance.now()-t0)/per) % 2;
        if(ph){ pose[25] = [.56,.72-lift*.6]; pose[27] = [.56,.9-lift]; pose[31] = [.57,.93-lift]; } else { pose[26] = [.44,.72-lift*.6]; pose[28] = [.44,.9-lift]; pose[32] = [.43,.93-lift]; }
        const HL = HKA._HL; if(HL.air){ const th = Math.atan((0)); const lean = HL.phi > 0.05 ? .08 : HL.phi < -.05 ? -.08 : 0; for(const i of [0,7,8,11,12,13,14,15,16]) pose[i] = [pose[i][0] - lean, pose[i][1]]; } }
      if(run && game === 'wall' && mode === 'pose'){ const w = HKA._WL.wall; if(w && (performance.now() - w.t0)/w.dur > .45) Object.assign(pose, POSE[w.k]); }
      const lm = []; for(let i=0;i<33;i++){ const v = pose[i] || [.5,.5]; lm[i] = {x:v[0] + J*g(), y:v[1] + J*g(), visibility: pose[i] ? .95 : .1}; }
      CAM.onFrame && CAM.onFrame(ctx, lm, cv); f++; if(game === 'hill') vmax = Math.max(vmax, HKA._HL.v || 0);
      await new Promise(r => setTimeout(r, 33));
    }
    CAM.stream = keep;
    const A = HKA._A;
    return game === 'hill' ? `hill/${mode}: phase ${A.phase}, distance ${Math.round(HKA._HL.far)} m, top speed ${vmax.toFixed(1)} m/s, fuel ${Math.round(HKA._HL.fuel)}, coins ${HKA._HL.coins}`
                           : `wall/${mode}: phase ${A.phase}, walls ${HKA._WL.score}, hearts ${HKA._WL.hearts}`;
  }, {game, mode, secs});
};
for(const m of ['still', 'jog', 'run']){ const pr = play('hill', m, 22); await p.waitForTimeout(16000); await p.screenshot({path:`ar3-hill-${m}.png`}); console.log(await pr); }
{ const pr = play('wall', 'pose', 30); await p.waitForTimeout(17000); for(let q=0;q<3;q++){ await p.screenshot({path:`ar3-wall-${q}.png`}); await p.waitForTimeout(700); } console.log(await pr); }
console.log('errors', errs); await b.close();
