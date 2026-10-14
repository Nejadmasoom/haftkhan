"""Yuzi's spoken coaching for the arena's two newer games. Needs the OpenRouter key in the OR_KEY environment
variable (never in a file). Writes prototype/audio/<id>.mp3 and adds the ids to prototype/audio/list.js.
    OR_KEY=... python3 tools/voice/arena_lines.py           (or with ids to make only some)
The game already uses each line the moment its file exists; until then it falls back to existing lines."""
import os, sys, re
sys.path.insert(0, os.path.dirname(__file__))
from tts import speak
YUZI = ("You are Yuzi, a playful young Asiatic cheetah cub in a children's game. Speak native colloquial Tehrani Persian with natural "
        "Tehrani intonation: warm, bright and excited like an animated cartoon character talking to a 7-year-old, smiling while speaking, "
        "clear articulation, medium-fast pace.")
HOST = YUZI.replace('medium-fast pace', 'a short, loud, playful command like a game host')
LINES = [
  ('ar-flap',       'Laomedeia', HOST, 'پروانه بزن! دست‌ها بالا… محکم پایین!'),
  ('ar-flap-more',  'Laomedeia', YUZI, 'تندتر پروانه بزن تا سیمرغ بالا بره!'),
  ('ar-bow-stand',  'Laomedeia', YUZI, 'روبه‌روی گوشی وایسا. یه دستت رو صاف کنارِ بدنت ببر؛ این کمانه!'),
  ('ar-bow-draw',   'Laomedeia', YUZI, 'حالا با اون یکی دستت زه رو تا شونه‌ت بکش… و نگه دار!'),
  ('ar-bow-shoot',  'Laomedeia', HOST, 'حالا رها کن!'),
]
here = os.path.join(os.path.dirname(__file__), '..', '..', 'prototype', 'audio')
want = sys.argv[1:] or [l[0] for l in LINES]
for k, v, style, text in LINES:
    if k in want: speak(text, v, style, os.path.join(here, k + '.mp3')); print('made', k)
lst = os.path.join(here, 'list.js'); s = open(lst, encoding='utf-8').read()
have = set(re.findall(r"'([^']+)'", s)); new = [k for k, *_ in LINES if k not in have and os.path.exists(os.path.join(here, k + '.mp3'))]
if new: s = s.rstrip().rstrip('];').rstrip().rstrip(',') + ',\n  ' + ', '.join(f"'{k}'" for k in new) + '\n];\n'; open(lst, 'w', encoding='utf-8').write(s); print('listed', new)
