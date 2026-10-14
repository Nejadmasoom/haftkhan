# the archer's cut-out pieces from a 4x4 rig sheet (see docs/art-prompts for the sheet's layout):
#   python3 tools/rigparts.py SHEET girl|boy
# writes prototype/img/rig/<who>-<part>.webp. The bow loses its painted straight string (the game draws a string
# that bends), the upper arm is made from the sleeve of the forearm piece and lengthened to an upper arm's length.
import sys, os, subprocess, numpy as np
from PIL import Image
sheet, who = sys.argv[1], sys.argv[2]
here = os.path.dirname(os.path.abspath(__file__)); tmp = '/tmp/rigparts-' + who
subprocess.run([sys.executable, os.path.join(here, 'cutrig.py'), sheet, tmp,
  'head,head-aim,head-happy,torso,-,fa-fist,fa-pinch,-,legs,bow,-,arrow,-,hand-open,cap,-'], check=True, stdout=subprocess.DEVNULL)
out = os.path.join(here, '..', 'prototype', 'img', 'rig'); os.makedirs(out, exist_ok=True)
L = lambda n: np.array(Image.open(os.path.join(tmp, n + '.png'))).astype(int)
def trim(a):
    ys, xs = np.where(a[..., 3] > 0); return a[ys.min():ys.max()+1, xs.min():xs.max()+1]
def save(a, n, scale):
    im = Image.fromarray(a.astype(np.uint8), 'RGBA'); im = im.resize((max(1, round(im.width*scale)), max(1, round(im.height*scale))), Image.LANCZOS)
    im.save(os.path.join(out, f'{who}-{n}.webp'), quality=90, method=6)
S = 1024/Image.open(sheet).width                     # every sheet is brought to the 1024-pixel scale the rig numbers use
# bow: no near-white anywhere, no straight string
b = L('bow'); wh = (b[..., :3].min(2) > 215) & ((b[..., :3].max(2) - b[..., :3].min(2)) < 30); b[..., 3][wh] = 0
# the painted string sits to the left of the limb: in every row away from the tips keep only the rightmost run
h = b.shape[0]
for y in range(int(h*.08), int(h*.92)):
    op = np.where(b[y, :, 3] > 0)[0]
    if len(op) < 2: continue
    gaps = np.where(np.diff(op) > 1)[0]
    if len(gaps): b[y, :op[gaps[-1] + 1], 3] = 0
b = trim(b)
# upper arm: the sleeve of the pinching forearm up to the cuff, lengthened, closed with a mirrored rounded end
f = L('fa-pinch'); r, g, bl = f[..., 0], f[..., 1], f[..., 2]
skin = (r > 200) & (g > 150) & (bl > 125) & (r - bl > 40) & (g - bl < 50) & (f[..., 3] > 0)
colop = (f[..., 3] > 0).sum(0) + 1; frac = skin.sum(0)/colop; sx = next(x for x in range(int(f.shape[1]*.4), f.shape[1]) if frac[x] > .25); u = trim(f[:, :sx - 2]); hh = u.shape[0]; cap = min(hh, u.shape[1]//2 - 2)
left, mid = u[:, :cap], u[:, cap:cap + 6]
length = int(sx*1.22); body = np.repeat(mid[:, 2:3], length - 2*cap, axis=1)
u2 = np.concatenate([left, body, left[:, ::-1]], axis=1)
for n in ['head', 'head-aim', 'head-happy', 'torso', 'fa-fist', 'fa-pinch', 'legs', 'arrow', 'hand-open', 'cap']: save(L(n), n, S)
save(b, 'bow', S); save(u2, 'upper', S)
bb = np.array(Image.open(os.path.join(out, f'{who}-bow.webp')))[..., 3] > 40; ys, xs = np.where(bb)
gx = xs.max(); gy = int(ys[xs >= gx - 2].mean()); top = (int(xs[ys == ys.min()].mean()), int(ys.min())); bot = (int(xs[ys == ys.max()].mean()), int(ys.max()))
print('ok', who, 'bow grip', (int(gx) - 8, gy), 'top', top, 'bottom', bot)
