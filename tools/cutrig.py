# cut a cut-out-puppet sheet (a grid of separate body parts) into tight transparent pieces.
#   python3 tools/cutrig.py SHEET OUTDIR name1,name2,...   (GRID=4x4; a name of '-' skips a cell)
# Each cell: the white around the part is flood-filled away from the cell's edges (inner whites such as the eyes
# stay), small stray specks are dropped, and the piece is trimmed to its own outline.
import sys, os, numpy as np
from PIL import Image
from collections import deque
src, out, names = sys.argv[1], sys.argv[2], sys.argv[3].split(',')
COLS, ROWS = (int(x) for x in os.environ.get('GRID', '4x4').split('x'))
INSET = int(os.environ.get('INSET', '7'))
im = np.array(Image.open(src).convert('RGB')).astype(int); H, W = im.shape[:2]
os.makedirs(out, exist_ok=True)
def cut(a):
    h, w = a.shape[:2]; white = (a.min(2) > 225) & ((a.max(2) - a.min(2)) < 22)
    bg = np.zeros((h, w), bool); q = deque()
    for y in range(h):
        for x in (0, w - 1):
            if white[y, x] and not bg[y, x]: bg[y, x] = True; q.append((y, x))
    for x in range(w):
        for y in (0, h - 1):
            if white[y, x] and not bg[y, x]: bg[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and white[ny, nx] and not bg[ny, nx]: bg[ny, nx] = True; q.append((ny, nx))
    fg = ~bg
    # keep components larger than a speck
    lab = np.zeros((h, w), np.int32); n = 0; keep = np.zeros((h, w), bool)
    for y0, x0 in zip(*np.where(fg)):
        if lab[y0, x0]: continue
        n += 1; lab[y0, x0] = n; q = deque([(y0, x0)]); pts = []
        while q:
            y, x = q.popleft(); pts.append((y, x))
            for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and fg[ny, nx] and not lab[ny, nx]: lab[ny, nx] = n; q.append((ny, nx))
        if len(pts) > 120:
            ys, xs = zip(*pts); keep[list(ys), list(xs)] = True
    return keep
cw, ch = W // COLS, H // ROWS
for i, name in enumerate(names):
    if name == '-' or i >= COLS*ROWS: continue
    r, c = divmod(i, COLS); a = im[r*ch + INSET:(r + 1)*ch - INSET, c*cw + INSET:(c + 1)*cw - INSET]
    m = cut(a); ys, xs = np.where(m)
    if not len(ys): print('empty', name); continue
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    rgba = np.dstack([a, (m*255)]).astype(np.uint8)[y0:y1, x0:x1]
    Image.fromarray(rgba, 'RGBA').save(os.path.join(out, name + '.png'))
    print(name, x1 - x0, y1 - y0)
