# cut a 3x3 pose sheet into square transparent images: one connected shape per cell (tiny stray bits such as
# motion marks are dropped), the ground shadow removed, every pose kept at the sheet's own scale with its feet
# (or the body part on the floor) on the same bottom margin, so a pair of frames animates without jumping
import sys, numpy as np
from PIL import Image
from collections import deque
src, outdir, prefix, names = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4].split(',')
import os
COLS, ROWS = (int(x) for x in os.environ.get('GRID', '3x3').split('x'))     # GRID=4x4 for the bigger sheets; a name of '-' skips a cell
im = Image.open(src).convert('RGB'); a = np.array(im).astype(int); H, W = a.shape[:2]
white = (a.min(2) > 232) & ((a.max(2) - a.min(2)) < 18)
bg = np.zeros((H, W), bool); q = deque()
for y in range(H):
    for x in (0, W-1):
        if white[y, x]: bg[y, x] = True; q.append((y, x))
for x in range(W):
    for y in (0, H-1):
        if white[y, x] and not bg[y, x]: bg[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
        ny, nx = y+dy, x+dx
        if 0 <= ny < H and 0 <= nx < W and white[ny, nx] and not bg[ny, nx]: bg[ny, nx] = True; q.append((ny, nx))
fg = ~bg
# the shadow: light, low-colour pixels that touch the outside (the ground oval); cut before labelling
lum = a.mean(2); chroma = a.max(2) - a.min(2); light = fg & (lum > 205) & (chroma < 45)
edge = np.zeros((H, W), bool); edge |= bg
seen = np.zeros((H, W), bool); q = deque()
for y, x in zip(*np.where(light)):
    if any(0 <= y+dy < H and 0 <= x+dx < W and bg[y+dy, x+dx] for dy, dx in ((1,0),(-1,0),(0,1),(0,-1))): seen[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
        ny, nx = y+dy, x+dx
        if 0 <= ny < H and 0 <= nx < W and light[ny, nx] and not seen[ny, nx]: seen[ny, nx] = True; q.append((ny, nx))
fg &= ~seen
lab = np.zeros((H, W), np.int32); n = 0; info = {}
for y0 in range(H):
    for x0 in np.where(fg[y0] & (lab[y0] == 0))[0]:
        if lab[y0, x0]: continue
        n += 1; lab[y0, x0] = n; q = deque([(y0, x0)]); cnt = 0; sy = sx = 0
        while q:
            y, x = q.popleft(); cnt += 1; sy += y; sx += x
            for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                ny, nx = y+dy, x+dx
                if 0 <= ny < H and 0 <= nx < W and fg[ny, nx] and not lab[ny, nx]: lab[ny, nx] = n; q.append((ny, nx))
        info[n] = (cnt, sy/cnt, sx/cnt)
def owner(v): return min(ROWS - 1, int(v[1]*ROWS/H))*COLS + min(COLS - 1, int(v[2]*COLS/W))
def shape_of(k):
    mine = [(i, v) for i, v in info.items() if v[0] > int(os.environ.get('MINPIX', 200)) and owner(v) == k]
    if not mine: return None
    big = max(v[0] for _, v in mine); return mine, [i for i, v in mine if v[0] >= float(os.environ.get('MINFRAC', .02))*big]   # MINFRAC=.002 MINPIX=40 keeps small props such as pebbles
# one square canvas for the whole sheet, so every pose keeps the sheet's own scale (a 3x3 sheet: one column wide;
# a bigger sheet: the largest pose plus a margin)
if (COLS, ROWS) == (3, 3): cell = W//3
else:
    ext = []
    for k in range(COLS*ROWS):
        r_ = shape_of(k)
        if r_: ys_, xs_ = np.where(np.isin(lab, r_[1])); ext.append(max(ys_.max()-ys_.min(), xs_.max()-xs_.min()))
    cell = int(os.environ.get('SIDE', int(max(ext)*1.12)))      # SIDE=300: the same canvas for every sheet of one set, so the scale matches across sheets
out = []
for k, name in enumerate(names):
    if name == '-': continue
    got = shape_of(k)
    if not got: print('EMPTY', name); continue
    mine, keep = got
    mask = np.isin(lab, keep); ys, xs = np.where(mask); cx = (xs.min()+xs.max())//2
    side = max(cell, int(max(ys.max()-ys.min(), xs.max()-xs.min())*1.08)); bottom = ys.max() + int(.04*side)   # a very wide pose (child + ball + hoop) gets a bigger canvas instead of being cut
    x0 = cx - side//2; y0 = bottom - side
    rgba = np.zeros((side, side, 4), np.uint8)
    for yy in range(side):
        sy_ = y0 + yy
        if not 0 <= sy_ < H: continue
        xa, xb = max(0, x0), min(W, x0 + side)
        rgba[yy, xa-x0:xb-x0, :3] = a[sy_, xa:xb]; rgba[yy, xa-x0:xb-x0, 3] = np.where(mask[sy_, xa:xb], 255, 0)
    # soft edge
    al = rgba[..., 3].astype(float)/255; blur = (al + np.roll(al, 1, 0) + np.roll(al, -1, 0) + np.roll(al, 1, 1) + np.roll(al, -1, 1))/5; rgba[..., 3] = np.where(al > 0, 255, (blur*255).astype(np.uint8)) if False else rgba[..., 3]
    img = Image.fromarray(rgba, 'RGBA'); out.append((name, img))
    img.resize((1024, 1024), Image.LANCZOS).save(f'{outdir}/png/{prefix}-{name}.png')
    img.resize((512, 512), Image.LANCZOS).save(f'{outdir}/webp/{prefix}-{name}.webp', 'WEBP', quality=90, method=6)
    print(prefix, name, 'kept', len(keep), 'of', len(mine), 'bbox', xs.max()-xs.min(), ys.max()-ys.min())
