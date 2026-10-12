"""کادرِ دومِ یک حرکت را افقی جابه‌جا می‌کند تا پای ایستاده‌اش روی پای کادرِ اول بیفتد.

    python3 tools/align_frames.py FRAME_A.png FRAME_B.png

پای ایستاده = پایین‌ترین بخشِ تصویر (۲۵ پیکسلِ آخر). کادرِ B بازنویسی می‌شود.
"""
import sys
import numpy as np
from PIL import Image

def foot_center(alpha):
    rows = np.nonzero(alpha.any(axis=1))[0]
    band = alpha[rows[-1] - 25:rows[-1] + 1]
    xs = np.nonzero(band.any(axis=0))[0]
    return (xs.min() + xs.max()) / 2

a = np.array(Image.open(sys.argv[1]))
b_img = Image.open(sys.argv[2])
b = np.array(b_img)
dx = round(foot_center(a[..., 3] > 0) - foot_center(b[..., 3] > 0))
shifted = Image.new("RGBA", b_img.size, (0, 0, 0, 0))
shifted.paste(b_img, (dx, 0), b_img)
shifted.save(sys.argv[2], optimize=True)
print(f"{sys.argv[2]}: {dx:+d}px")
