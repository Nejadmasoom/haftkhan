# colour variants of a red object: only saturated red pixels change hue; outline, shine and white stay
import sys, numpy as np
from PIL import Image
src, out, mode = sys.argv[1], sys.argv[2], sys.argv[3]
im = np.array(Image.open(src).convert('RGBA')).astype(float)/255
rgb, a = im[..., :3], im[..., 3:]
mx, mn = rgb.max(-1), rgb.min(-1); d = mx - mn + 1e-9
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
h = np.where(mx == r, ((g - b)/d) % 6, np.where(mx == g, (b - r)/d + 2, (r - g)/d + 4))*60
s = np.where(mx > 0, d/(mx + 1e-9), 0); v = mx
def hsv2rgb(h, s, v):
    c = v*s; x = c*(1 - np.abs((h/60) % 2 - 1)); m = v - c; z = np.zeros_like(h); i = (h//60).astype(int) % 6
    sel = [np.stack(t, -1) for t in ((c,x,z),(x,c,z),(z,c,x),(z,x,c),(x,z,c),(c,z,x))]
    o = np.zeros(h.shape + (3,))
    for k in range(6): o[i == k] = sel[k][i == k]
    return o + m[..., None]
if mode.startswith('rot'):                     # rotate every saturated colour (patterned objects)
    deg = float(mode[3:]); mask = s > .25; h2 = np.where(mask, (h + deg) % 360, h); s2, v2 = s, v
else:                                          # red -> target hue
    th, tv = {'y': (46, 1.12), 'g': (125, .9), 'b': (208, .95), 'p': (282, .95)}[mode]
    red = (s > .35) & ((h < 25) | (h > 335)) & (v > .3)
    h2 = np.where(red, th, h); v2 = np.where(red, np.clip(v*tv, 0, 1), v); s2 = np.where(red & (mode == 'y'), s*.9, s)
out_rgb = hsv2rgb(h2, s2, v2)
Image.fromarray((np.dstack([out_rgb, a])*255).round().astype(np.uint8), 'RGBA').save(out, 'WEBP', quality=88, method=6)
