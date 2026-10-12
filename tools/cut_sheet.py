"""یک برگهٔ کاراکتر (زمینهٔ سفید) را به حالت‌های جدا با زمینهٔ شفاف می‌بُرد.

    python3 tools/cut_sheet.py [--cells] SHEET OUT_DIR ROWS name ...

ROWS تعداد ردیف‌های برگه است. نام‌ها به ترتیبِ خواندنِ برگه داده می‌شوند:
ردیف به ردیف از بالا، و در هر ردیف از چپ به راست. نامِ «-» یعنی آن حالت ذخیره نشود.

هر حالت یک تکهٔ پیوسته از تصویر است؛ تکه‌های کوچکِ جدا (ستاره، ماه، توپ)
به نزدیک‌ترین حالت می‌چسبند. همهٔ حالت‌های یک ردیف با یک مقیاس و یک بازهٔ عمودی
بریده می‌شوند تا خطِ پاها بینشان ثابت بماند.

با --cells هر حالت با خانهٔ خودش در جدولِ برگه بریده می‌شود، نه با جعبهٔ دورش؛
جای افقیِ کاراکتر در خانه حفظ می‌شود. برای کادرهای یک حرکت لازم است که
پای ایستاده در هر دو کادر باید یک‌جا بماند.
"""
import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

CANVAS = 1024


def background(rgb):
    """زمینه = سفیدِ تقریباً خالص یا سایهٔ بنفش‌فام، به شرطِ وصل بودن به لبهٔ تصویر.

    رنگ‌های کرم و گرم (روسری، شکم یوز) زمینه نیستند، حتی اگر روشن باشند:
    در سایهٔ زمینه آبی از قرمز کم‌تر نیست، در کرم هست.
    """
    rgb = rgb.astype(np.int16)
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    lo, sat = rgb.min(axis=2), rgb.max(axis=2) - rgb.min(axis=2)
    light = ((lo > 235) & (sat < 15)) | ((lo > 190) & (sat < 40) & (b >= r - 2) & (b >= g - 2))
    h, w = light.shape
    bg = np.zeros_like(light)
    q = deque()
    for y in range(h):
        for x in (0, w - 1):
            if light[y, x] and not bg[y, x]: bg[y, x] = True; q.append((y, x))
    for x in range(w):
        for y in (0, h - 1):
            if light[y, x] and not bg[y, x]: bg[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
            if 0 <= ny < h and 0 <= nx < w and light[ny, nx] and not bg[ny, nx]:
                bg[ny, nx] = True; q.append((ny, nx))
    return bg


def components(fg):
    """تکه‌های پیوستهٔ پیش‌زمینه: [(تعداد پیکسل، y0, x0, y1, x1, برچسب)]."""
    h, w = fg.shape
    lab = np.zeros((h, w), np.int32)
    out, n = [], 0
    for sy, sx in zip(*np.nonzero(fg)):
        if lab[sy, sx]: continue
        n += 1; lab[sy, sx] = n
        q = deque([(sy, sx)]); cnt = 0; y0 = y1 = sy; x0 = x1 = sx
        while q:
            y, x = q.popleft(); cnt += 1
            y0, y1, x0, x1 = min(y0, y), max(y1, y), min(x0, x), max(x1, x)
            for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= ny < h and 0 <= nx < w and fg[ny, nx] and not lab[ny, nx]:
                    lab[ny, nx] = n; q.append((ny, nx))
        out.append((cnt, y0, x0, y1 + 1, x1 + 1, n))
    return out, lab


def main():
    args = sys.argv[1:]
    cells = args[0] == "--cells"
    if cells: args = args[1:]
    sheet, out, rows, names = args[0], Path(args[1]), int(args[2]), args[3:]
    img = np.array(Image.open(sheet).convert("RGBA"))
    bg = background(img[..., :3])
    img[bg] = (0, 0, 0, 0)
    comps, lab = components(~bg)
    comps.sort(reverse=True)
    poses = [list(c[1:5]) + [[c[5]]] for c in comps[:len(names)]]
    # تکه‌های کوچک به نزدیک‌ترین حالت (فاصلهٔ مرکز تا جعبهٔ حالت)
    for cnt, y0, x0, y1, x1, n in comps[len(names):]:
        piece = img[y0:y1, x0:x1][lab[y0:y1, x0:x1] == n][:, :3].astype(int)
        # تکه‌های ریز یا خاکستریِ روشن، باقی‌ماندهٔ سایه‌اند نه بخشی از کاراکتر
        if cnt < 60 or (piece.min(axis=1).mean() > 150 and (piece.max(axis=1) - piece.min(axis=1)).mean() < 45):
            img[lab == n] = (0, 0, 0, 0); continue
        cy, cx = (y0 + y1) / 2, (x0 + x1) / 2
        def dist(p):
            dy = max(p[0] - cy, 0, cy - p[2]); dx = max(p[1] - cx, 0, cx - p[3])
            return dx * dx + dy * dy
        p = min(poses, key=dist)
        p[0], p[1], p[2], p[3] = min(p[0], y0), min(p[1], x0), max(p[2], y1), max(p[3], x1)
        p[4].append(n)
    # ترتیبِ خواندن: ردیف‌ها بر اساس مرکزِ عمودی، بعد چپ به راست
    poses.sort(key=lambda p: (p[0] + p[2]) / 2)
    per = len(poses) // rows
    grid, i = [], 0
    for r in range(rows):
        take = per + (1 if r < len(poses) % rows else 0)
        grid.append(sorted(poses[i:i + take], key=lambda p: p[1])); i += take
    pad = 14
    cols = max(len(row) for row in grid)
    cell_w = img.shape[1] / cols
    widest = cell_w if cells else max(p[3] - p[1] for row in grid for p in row) + 2 * pad
    tallest = max(max(q[2] for q in row) - min(q[0] for q in row) for row in grid) + 2 * pad
    biggest = max(widest, tallest)
    scale = CANVAS * 0.9 / biggest
    out.mkdir(parents=True, exist_ok=True)
    flat = [(p, row, c) for row in grid for c, p in enumerate(row)]
    for (p, row, c), name in zip(flat, names):
        if name == "-": continue
        top, bottom = min(q[0] for q in row), max(q[2] for q in row)
        mine = np.isin(lab, p[4])
        piece = img.copy(); piece[~mine] = (0, 0, 0, 0)
        x0, x1 = (round(c * cell_w), round((c + 1) * cell_w)) if cells else (max(p[1] - pad, 0), p[3] + pad)
        crop = Image.fromarray(piece[max(top - pad, 0):bottom + pad, x0:x1])
        crop = crop.resize((round(crop.width * scale), round(crop.height * scale)), Image.LANCZOS)
        canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
        # پایینِ ردیف روی ۹۵٪ ارتفاع: پاهای همهٔ حالت‌های یک ردیف روی یک خط
        canvas.paste(crop, ((CANVAS - crop.width) // 2, round(CANVAS * 0.95) - crop.height), crop)
        canvas.save(out / f"{name}.png", optimize=True)
        print(out / f"{name}.png")


main()
