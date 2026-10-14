# cut a 4x3 object sheet by connected shapes: the white background is flooded from the image border, every
# remaining blob goes to the grid cell holding its centre, so an object that crosses a cell line stays whole
import sys, numpy as np
from PIL import Image
from collections import deque
src, out, names = sys.argv[1], sys.argv[2], sys.argv[3].split(',')
COLS, ROWS = (int(x) for x in (sys.argv[4] if len(sys.argv) > 4 else '4x3').split('x'))      # grid of the sheet, columns x rows
im = np.array(Image.open(src).convert('RGB')).astype(int); H, W = im.shape[:2]
white = (im.min(axis=2) > 232) & ((im.max(axis=2) - im.min(axis=2)) < 18)
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
fg = ~bg; lab = np.zeros((H, W), np.int32); n = 0; owner = {}
for y0 in range(H):
    for x0 in np.where(fg[y0] & (lab[y0] == 0))[0]:
        if lab[y0, x0]: continue
        n += 1; lab[y0, x0] = n; q = deque([(y0, x0)]); pts = []
        while q:
            y, x = q.popleft(); pts.append((y, x))
            for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                ny, nx = y+dy, x+dx
                if 0 <= ny < H and 0 <= nx < W and fg[ny, nx] and not lab[ny, nx]: lab[ny, nx] = n; q.append((ny, nx))
        if len(pts) < 12: owner[n] = -1; continue                       # specks
        cy = sum(p[0] for p in pts)/len(pts); cx = sum(p[1] for p in pts)/len(pts)
        owner[n] = min(ROWS - 1, int(cy*ROWS/H))*COLS + min(COLS - 1, int(cx*COLS/W))
lum = im.mean(axis=2)
for k, name in enumerate(names):
    ids = [i for i, o in owner.items() if o == k]
    mask = np.isin(lab, ids)
    # a soft edge: background pixels touching the object keep partial alpha by how dark they are
    edge = ~mask & (np.roll(mask, 1, 0) | np.roll(mask, -1, 0) | np.roll(mask, 1, 1) | np.roll(mask, -1, 1))
    a = np.where(mask, 255, 0).astype(np.uint8); a[edge] = np.clip((255 - lum[edge])*3, 0, 255).astype(np.uint8)
    ys, xs = np.where(a > 0); m = 6
    y0, y1, x0, x1 = max(0, ys.min()-m), min(H, ys.max()+m+1), max(0, xs.min()-m), min(W, xs.max()+m+1)
    img = Image.fromarray(np.dstack([im.astype(np.uint8), a])[y0:y1, x0:x1], 'RGBA'); s = 420/max(img.size)
    if s < 1: img = img.resize((round(img.width*s), round(img.height*s)), Image.LANCZOS)
    img.save(f'{out}/{name}.webp', 'WEBP', quality=88, method=6); print(name, img.size)
