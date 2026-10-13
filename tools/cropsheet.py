# cut a 4x3 object sheet into transparent webp files: flood the white background from the edges of each cell
import sys, numpy as np
from PIL import Image
from collections import deque
src, out, names = sys.argv[1], sys.argv[2], sys.argv[3].split(',')
im = np.array(Image.open(src).convert('RGB')).astype(int); H, W = im.shape[:2]
for k, name in enumerate(names):
    r, c = divmod(k, 4); y0, y1, x0, x1 = r*H//3, (r+1)*H//3, c*W//4, (c+1)*W//4
    cell = im[y0:y1, x0:x1]; h, w = cell.shape[:2]
    white = (cell.min(axis=2) > 232) & ((cell.max(axis=2) - cell.min(axis=2)) < 18)
    bg = np.zeros((h, w), bool); q = deque()
    for y in range(h):
        for x in (0, w-1):
            if white[y, x] and not bg[y, x]: bg[y, x] = True; q.append((y, x))
    for x in range(w):
        for y in (0, h-1):
            if white[y, x] and not bg[y, x]: bg[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y+dy, x+dx
            if 0 <= ny < h and 0 <= nx < w and white[ny, nx] and not bg[ny, nx]: bg[ny, nx] = True; q.append((ny, nx))
    # soften: background pixels next to the object get partial alpha by their whiteness
    a = np.where(bg, 0, 255).astype(np.uint8)
    edge = bg & (np.roll(~bg, 1, 0) | np.roll(~bg, -1, 0) | np.roll(~bg, 1, 1) | np.roll(~bg, -1, 1))
    lum = cell.mean(axis=2); a[edge] = np.clip((255 - lum[edge])*3, 0, 255).astype(np.uint8)
    ys, xs = np.where(a > 0); m = 6
    yy0, yy1, xx0, xx1 = max(0, ys.min()-m), min(h, ys.max()+m+1), max(0, xs.min()-m), min(w, xs.max()+m+1)
    rgba = np.dstack([cell.astype(np.uint8), a])[yy0:yy1, xx0:xx1]
    img = Image.fromarray(rgba, 'RGBA'); s = 360/max(img.size)
    if s < 1: img = img.resize((round(img.width*s), round(img.height*s)), Image.LANCZOS)
    img.save(f'{out}/{name}.webp', 'WEBP', quality=88, method=6); print(name, img.size)
