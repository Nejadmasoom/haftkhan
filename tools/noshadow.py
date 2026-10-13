# remove the soft ground shadow: light, low-colour pixels reachable from the transparent outside
import sys, numpy as np
from PIL import Image
from collections import deque
for f in sys.argv[1:]:
    im = np.array(Image.open(f).convert('RGBA')).astype(int); h, w = im.shape[:2]
    rgb = im[..., :3]; lum = rgb.mean(-1); chroma = rgb.max(-1) - rgb.min(-1)
    light = (lum > 205) & (chroma < 45) & (im[..., 3] > 0)
    out = im[..., 3] == 0; seen = np.zeros((h, w), bool); q = deque()
    for y in range(h):
        for x in range(w):
            if light[y, x] and any(0 <= y+dy < h and 0 <= x+dx < w and out[y+dy, x+dx] for dy, dx in ((1,0),(-1,0),(0,1),(0,-1))) or (light[y, x] and (y in (0, h-1) or x in (0, w-1))):
                seen[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y+dy, x+dx
            if 0 <= ny < h and 0 <= nx < w and light[ny, nx] and not seen[ny, nx]: seen[ny, nx] = True; q.append((ny, nx))
    im[seen, 3] = 0
    ys, xs = np.where(im[..., 3] > 0); m = 4
    im = im[max(0, ys.min()-m):ys.max()+m+1, max(0, xs.min()-m):xs.max()+m+1]
    Image.fromarray(im.astype(np.uint8), 'RGBA').save(f, 'WEBP', quality=88, method=6); print(f, int(seen.sum()))
