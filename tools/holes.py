# make enclosed pure-white holes transparent (window gaps, handle holes); small white shines stay
import sys, numpy as np
from PIL import Image
from collections import deque
for f in sys.argv[1:]:
    im = np.array(Image.open(f).convert('RGBA')).astype(int); h, w = im.shape[:2]
    wt = (im[...,:3].min(-1) > 228) & ((im[...,:3].max(-1) - im[...,:3].min(-1)) < 20) & (im[...,3] > 0)
    seen = np.zeros((h, w), bool); cleared = 0
    for y0, x0 in zip(*np.where(wt)):
        if seen[y0, x0]: continue
        q = deque([(y0, x0)]); seen[y0, x0] = True; pts = []
        while q:
            y, x = q.popleft(); pts.append((y, x))
            for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                ny, nx = y+dy, x+dx
                if 0 <= ny < h and 0 <= nx < w and wt[ny, nx] and not seen[ny, nx]: seen[ny, nx] = True; q.append((ny, nx))
        if len(pts) > h*w*.004:
            ys, xs = zip(*pts); im[ys, xs, 3] = 0; cleared += len(pts)
    Image.fromarray(im.astype(np.uint8), 'RGBA').save(f, 'WEBP', quality=88, method=6); print(f, cleared)
