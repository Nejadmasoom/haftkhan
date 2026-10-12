# پرامپت‌های ساختِ کاراکترها

هر پرامپت یک **برگهٔ کاراکتر** می‌سازد: همهٔ حالت‌های یک کاراکتر در یک تصویر.
پرامپت‌ها انگلیسی‌اند چون مدل‌های تصویرساز با انگلیسی دقیق‌تر کار می‌کنند. هر پرامپت کامل و مستقل است و می‌شود همان را کپی کرد.

## پیش از شروع

1. **اول یوزی را بسازید (پرامپت ۱).** وقتی نتیجه را پسندیدید، آن تصویر را به همهٔ پرامپت‌های بعدی **پیوست کنید**. جملهٔ «Use the attached image only as a style reference» در پرامپت‌ها برای همین است. بدون پیوست هم کار می‌کند، ولی سبک‌ها کمتر یکدست می‌شوند.
2. **برای حرکت‌های دختر (پرامپت ۴)** برگهٔ دختر (پرامپت ۲) را هم پیوست کنید تا همان دختر کشیده شود.
3. **در هیچ تصویری نوشته نیست.** نه فارسی، نه انگلیسی، نه عدد. همهٔ نوشته‌ها را برنامه خودش روی صفحه می‌گذارد. اگر مدل حرف یا عدد کشید، دوباره بسازید.
4. **زمینه سفید است** تا جدا کردنش آسان باشد. بعد از ساخت، هر حالت را جدا کنید، زمینه را بردارید (PNG شفاف) و با نام‌های جدول زیر در `assets/characters/` بگذارید.
5. **نسبت تصویر** کنار هر پرامپت نوشته شده. اگر ابزارتان تنظیمش را جدا دارد (مثل `--ar 2:1` در Midjourney)، همان را بزنید.

| # | کاراکتر | حالت‌ها | نسبت | نام فایل‌ها |
|---|---|---|---|---|
| ۱ | یوزی، توله | ۷ | ۲:۱ | `yuzi-1-idle` `-cheer` `-talk` `-wait` `-comfort` `-sleep` `-balance` |
| ۲ | دختر | ۳ | ۳:۲ | `girl-idle` `girl-cheer` `girl-tired` |
| ۳ | پسر | ۳ | ۳:۲ | `boy-idle` `boy-cheer` `boy-tired` |
| ۴ | حرکت‌های تعادل (دختر) | ۶ | ۲:۳ | `girl-m5-1a` `-1b` `-2a` `-2b` `-3a` `-3b` |
| ۵ | لک‌لک | ۳ | ۳:۲ | `stork-greet` `-challenge` `-proud` |
| ۶ | خانواده | ۵ | ۵:۲ | `dad` `mom` `grandma` `grandpa` `sibling` |
| ۷ تا ۱۲ | نگهبان‌های فاز ۲ | ۳ برای هر کدام | ۳:۲ | `<نام>-greet` `-challenge` `-proud` |
| ۱۳ | یوزیِ جوان | ۴ | ۲:۱ | `yuzi-2-idle` `-cheer` `-talk` `-comfort` |
| ۱۴ | یوزیِ تیزپا | ۴ | ۲:۱ | `yuzi-3-idle` `-cheer` `-talk` `-comfort` |

---

## فاز ۱

### ۱. یوزی، توله‌یوزِ همسفر · نسبت ۲:۱

```
Character model sheet for a children's mobile game made in Iran, for 6–7 year old kids.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, gentle and warm, a light touch of Persian miniature painting elegance but simple and modern. Color palette only: saffron gold #f3a530, cream #fbf1dc, dark plum #2b2140, pomegranate red #d6404c, turquoise #16a39a, lapis blue #22327a.

CHARACTER: "Yuzi", a cute Asiatic cheetah CUB, anthropomorphic, standing on two legs. Chibi proportions: the head is about 45% of the body height. Golden saffron fur with small dark round spots, a cream muzzle, chest and belly, small rounded ears, a long tail with dark rings and a white tip. The signature detail: two clear black "tear lines" running from the inner corner of each eye down to the corners of the mouth, like a real cheetah. No clothes, no accessories.

LAYOUT: 7 poses of the SAME character, top row 4 poses, bottom row 3 poses centered. Every pose full body, same scale, same proportions, same colors. Feet of all poses in a row rest on the same invisible horizontal baseline. Generous empty space between poses, nothing overlaps. Three-quarter view facing LEFT in every pose.

POSES, in order:
1. Standing relaxed, smiling, waving hello with one paw.
2. Cheering: jumping in the air, both arms up, mouth open with joy, tail swinging.
3. Talking: mouth open mid-sentence, one paw pointing forward-left as if explaining something.
4. Waiting: sitting on the ground, head slightly tilted, curious bright eyes, paws on knees.
5. Comforting: gentle soft smile, eyebrows kind, one paw on its own chest, head tilted, warm and caring.
6. Sleeping: curled up lying on the ground, eyes closed, peaceful smile, tail wrapped around the body, a tiny crescent moon floating above its head.
7. Balancing: standing on ONE leg, the other leg lifted with knee bent, both arms stretched out to the sides like wings, concentrating with the tongue slightly out.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each pose. No scenery, no frames, no borders, no color swatches.

DO NOT include any text, letters, numbers, "Z" sleep letters, labels, captions, logos, watermark or signature.
```

### ۲. دخترِ قهرمان · نسبت ۳:۲

```
Character model sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image only as a style reference (line, shading, colors); draw a new character.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, warm and joyful. Color palette only: turquoise #16a39a, lapis blue #22327a, saffron gold #f3a530, pomegranate red #d6404c, cream #fbf1dc, dark plum #2b2140, plus natural skin tones.

CHARACTER: a 7-year-old Iranian girl, round cheerful face, warm light-brown skin, dark brown eyes, rosy cheeks. She wears a turquoise children's sports hijab hood (a soft one-piece hood that covers the hair and neck, framing the face), a turquoise zip-up sports jacket with a saffron stripe on the sleeves, lapis blue sports trousers, and red sneakers with white soles. Child proportions: the head is about one quarter of the body height.

LAYOUT: 3 poses of the SAME girl in one row. Every pose full body, same scale, same outfit, same colors. All feet on the same invisible horizontal baseline. Generous empty space between poses, nothing overlaps. Three-quarter view facing LEFT in every pose.

POSES, in order:
1. Standing relaxed, friendly smile, arms down, ready to play.
2. Cheering: jumping with both arms up, big open-mouth smile, eyes closed with joy.
3. Tired but happy: bent forward with both hands on her knees, catching her breath, smiling, one small sweat drop on her forehead.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each pose. No scenery, no frames, no borders.

DO NOT include any text, letters, numbers, labels, captions, logos, watermark or signature.
```

### ۳. پسرِ قهرمان · نسبت ۳:۲

```
Character model sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image only as a style reference (line, shading, colors); draw a new character.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, warm and joyful. Color palette only: saffron gold #f3a530, lapis blue #22327a, turquoise #16a39a, pomegranate red #d6404c, cream #fbf1dc, dark plum #2b2140, plus natural skin tones.

CHARACTER: a 7-year-old Iranian boy, round cheerful face, warm light-brown skin, short dark brown hair with a small tuft on top, dark brown eyes, rosy cheeks. He wears a saffron zip-up sports jacket with a turquoise stripe on the sleeves, lapis blue sports trousers, and red sneakers with white soles. Child proportions: the head is about one quarter of the body height.

LAYOUT: 3 poses of the SAME boy in one row. Every pose full body, same scale, same outfit, same colors. All feet on the same invisible horizontal baseline. Generous empty space between poses, nothing overlaps. Three-quarter view facing LEFT in every pose.

POSES, in order:
1. Standing relaxed, friendly smile, arms down, ready to play.
2. Cheering: jumping with both arms up, big open-mouth smile, eyes closed with joy.
3. Tired but happy: bent forward with both hands on his knees, catching his breath, smiling, one small sweat drop on his forehead.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each pose. No scenery, no frames, no borders.

DO NOT include any text, letters, numbers, labels, captions, logos, watermark or signature.
```

### ۴. حرکت‌های خوانِ تعادل (دختر) · نسبت ۲:۳

برگهٔ دختر (پرامپت ۲) را پیوست کنید. هر ردیف یک حرکت است: سمت راست کادر شروع، سمت چپ اوج حرکت.

```
Animation keyframe sheet for a children's exercise game made in Iran. The character is the SAME girl as in the attached image: identical face, turquoise sports hijab hood, turquoise jacket with saffron stripes, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign her.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 3 rows × 2 columns = 6 frames. Each row is one balance exercise; the RIGHT frame is the starting pose and the LEFT frame is the peak of the movement. Every frame full body, same scale. In every frame she stands on her RIGHT leg, and the right foot stays in exactly the same spot on the same invisible baseline, so the two frames of a row can be swapped like an animation. Three-quarter view facing LEFT. Generous empty space between frames, nothing overlaps.

ROW 1 — "stand on one leg and put sandbags into a basket with the other foot":
  right frame: standing on the right leg, left knee lifted forward to hip height, toes pointing down as if gripping something small, arms stretched out to the sides for balance.
  left frame: standing on the right leg, left leg extended forward and slightly up, foot held at knee height as if dropping something into a basket in front of her, arms out for balance.
ROW 2 — "stand on one leg and touch colored circles on the floor with the other foot":
  right frame: standing on the right leg, left knee lifted, arms out to the sides.
  left frame: standing on the right leg, left leg stretched far forward-left with the toes just touching the floor, body leaning slightly back, arms out.
ROW 3 — "stand on one leg and stack plastic cups with one hand":
  right frame: standing on the right leg, left knee slightly lifted, bending forward at the hips, left hand low near the floor holding one small red plastic cup, right arm out for balance.
  left frame: standing tall on the right leg, left knee lifted, left hand raised to chest height placing the red cup on top of an invisible stack, right arm out for balance.

No other objects: no sandbags, no basket, no circles, no cup stack — only the single red cup in her hand in row 3.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under the standing foot. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۵. لک‌لک، نگهبانِ خوانِ تعادل · نسبت ۳:۲

```
Character model sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image only as a style reference (line, shading, colors); draw a new character.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, warm and funny. Color palette only: white, dark plum #2b2140, orange-red for beak and legs (#e0703a), pomegranate red #d6404c, turquoise #16a39a, saffron gold #f3a530.

CHARACTER: a friendly white stork, the guardian of a wooden bridge. Rounded white body, black wing tips, a long orange-red beak and long thin orange-red legs, big kind eyes with eyebrows, a small turquoise scarf around the neck. Wise, playful and proud, like a kind coach.

LAYOUT: 3 poses of the SAME stork in one row. Every pose full body, same scale. All feet on the same invisible horizontal baseline. Generous empty space between poses, nothing overlaps. Three-quarter view facing LEFT in every pose.

POSES, in order:
1. Greeting: standing calmly on ONE leg, the other leg tucked up, waving hello with one wing, warm smile.
2. Challenge: still standing on ONE leg, leaning forward, pointing one wingtip at the viewer, one eyebrow raised with a playful grin, as if saying "can you do it too?".
3. Proud: standing on both legs, chest out, both wings spread wide open, eyes closed, beaming with pride.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each pose. No scenery, no bridge, no frames, no borders.

DO NOT include any text, letters, numbers, labels, captions, logos, watermark or signature.
```

### ۶. خانواده · نسبت ۵:۲

این‌ها آواتارِ گرد می‌شوند، پس **رو به بیننده‌اند** نه رو به چپ.

```
Set of 5 avatar portraits for a children's family game made in Iran. Use the attached image only as a style reference (line, shading, colors); draw new characters.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big kind eyes, every face smiling warmly. Color palette: turquoise #16a39a, lapis blue #22327a, saffron gold #f3a530, pomegranate red #d6404c, cream #fbf1dc, plus natural skin and hair tones. Modest everyday Iranian family clothing.

LAYOUT: 5 head-and-shoulders portraits in one row, each centered in its own area, same size, facing the viewer (front view), each fitting comfortably inside an imaginary circle with space around it so it can be cropped into a round avatar. Nothing overlaps.

PORTRAITS, in order:
1. Dad: about 38, short dark hair, neat short beard, lapis blue shirt.
2. Mom: about 35, wearing a turquoise headscarf, saffron top, gentle smile.
3. Grandma: about 65, kind wrinkles, a cream headscarf with a small pomegranate-red flower pattern, round glasses.
4. Grandpa: about 68, white hair and white mustache, a dark flat cap, cream shirt with a brown vest.
5. Big brother: about 10, short messy dark hair, red t-shirt, cheeky grin.

BACKGROUND: plain flat pure white (#FFFFFF). No circles drawn, no frames, no borders, no scenery.

DO NOT include any text, letters, numbers, names, labels, captions, logos, watermark or signature.
```

---

## فاز ۲

برای پرامپت‌های ۷ تا ۱۲ فقط بخش **CHARACTER** و **POSES** فرق می‌کند. هر کدام کامل نوشته شده تا مستقیم کپی شود.

### ۷. خروسِ سحر، نگهبانِ خوانِ ۱ «حیاطِ خروس» · نسبت ۳:۲

```
Character model sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image only as a style reference (line, shading, colors); draw a new character.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, warm and funny. Color palette only: pomegranate red #d6404c, saffron gold #f3a530, turquoise #16a39a, lapis blue #22327a, cream #fbf1dc, dark plum #2b2140.

CHARACTER: a cheerful dawn rooster, guardian of the meadow of sunrise. Rounded body, a big pomegranate-red comb, saffron and red feathers, a long turquoise and lapis tail, yellow legs, big bright eyes. Energetic, upright, with perfect posture, like a morning exercise coach.

LAYOUT: 3 poses of the SAME rooster in one row. Every pose full body, same scale. All feet on the same invisible horizontal baseline. Generous empty space between poses, nothing overlaps. Three-quarter view facing LEFT in every pose.

POSES, in order:
1. Greeting: standing tall, waving one wing, friendly smile.
2. Challenge: stretching up very tall on tiptoes with a perfectly straight back, chest out, both wings raised high like a morning stretch, inviting the viewer to copy him.
3. Proud: crowing happily with beak open to the sky, wings spread, eyes closed with joy.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each pose. No sun, no scenery, no frames, no borders.

DO NOT include any text, letters, numbers, musical notes, labels, captions, logos, watermark or signature.
```

### ۸. آهو، نگهبانِ خوانِ ۲ «دشتِ تیزپاها» · نسبت ۳:۲

```
Character model sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image only as a style reference (line, shading, colors); draw a new character.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, warm and lively. Color palette only: sandy saffron #f3a530, cream #fbf1dc, dark plum #2b2140, turquoise #16a39a, pomegranate red #d6404c, lapis blue #22327a.

CHARACTER: a young Persian gazelle, guardian of the plain of fast runners. Slender sandy-gold body, cream belly, a dark side stripe, small curved horns, huge friendly eyes with long lashes, a small turquoise ribbon tied on one horn. Fast, light and playful. Stands on four legs.

LAYOUT: 3 poses of the SAME gazelle in one row. Every pose full body, same scale. All hooves on the same invisible horizontal baseline (the leaping pose floats above it). Generous empty space between poses, nothing overlaps. Three-quarter view facing LEFT in every pose.

POSES, in order:
1. Greeting: standing on four legs, head turned toward the viewer, one front hoof raised as a hello, big smile.
2. Challenge: mid-leap in the air, all four legs tucked, looking back at the viewer with a playful grin, as if saying "catch me!".
3. Proud: standing tall with chest out, head high, eyes closed, happy smile.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each pose. No scenery, no frames, no borders.

DO NOT include any text, letters, numbers, motion lines, labels, captions, logos, watermark or signature.
```

### ۹. گربهٔ ایرانی، نگهبانِ خوانِ ۴ «بیشهٔ بید» · نسبت ۳:۲

```
Character model sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image only as a style reference (line, shading, colors); draw a new character.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, calm and graceful. Color palette only: soft white and light grey fur, dark plum #2b2140, turquoise #16a39a, saffron gold #f3a530, pomegranate red #d6404c, lapis blue #22327a.

CHARACTER: a fluffy Persian cat, guardian of the willow grove, the master of flexibility and smooth movement. Long soft white-grey fur, a round flat face, big copper-gold eyes, a fluffy tail, a small turquoise collar. Calm, gentle and very bendy. Stands on four legs.

LAYOUT: 3 poses of the SAME cat in one row. Every pose full body, same scale. All paws on the same invisible horizontal baseline. Generous empty space between poses, nothing overlaps. Three-quarter view facing LEFT in every pose.

POSES, in order:
1. Greeting: sitting upright, one paw raised as a hello, soft smile.
2. Challenge: a deep full-body stretch, front legs stretched far forward on the ground, back high, tail up, looking at the viewer with a playful wink, as if saying "can you bend like me?".
3. Proud: sitting with eyes closed, content smile, tail curled around the paws.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each pose. No willow tree, no scenery, no frames, no borders.

DO NOT include any text, letters, numbers, labels, captions, logos, watermark or signature.
```

### ۱۰. بزِ کوهی، نگهبانِ خوانِ ۵ «درهٔ پرتاب» · نسبت ۳:۲

```
Character model sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image only as a style reference (line, shading, colors); draw a new character.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, sporty and confident. Color palette only: warm brown, cream #fbf1dc, dark plum #2b2140, saffron gold #f3a530, pomegranate red #d6404c, turquoise #16a39a, lapis blue #22327a.

CHARACTER: a young Persian wild goat (ibex), guardian of the valley of throwing, with very skillful feet. Warm brown body, cream belly, a small dark beard, big backward-curving ridged horns, bright friendly eyes, a pomegranate-red sweatband around one front leg. Agile and sporty. Stands on four legs.

LAYOUT: 3 poses of the SAME goat in one row. Every pose full body, same scale. All hooves on the same invisible horizontal baseline. Generous empty space between poses, nothing overlaps. Three-quarter view facing LEFT in every pose.

POSES, in order:
1. Greeting: standing on four legs, one front hoof raised as a hello, confident smile.
2. Challenge: standing on hind legs, kicking a small red ball upward with one front hoof, looking at the viewer with a grin, as if saying "your turn!".
3. Proud: standing on four legs, chest out, head high showing off the horns, eyes closed, happy.

The only object allowed is the small red ball in pose 2.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each pose. No rocks, no scenery, no frames, no borders.

DO NOT include any text, letters, numbers, motion lines, labels, captions, logos, watermark or signature.
```

### ۱۱. رخش، نگهبانِ خوانِ ۶ «چشمهٔ دل» · نسبت ۳:۲

```
Character model sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image only as a style reference (line, shading, colors); draw a new character.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, heroic but cute. Color palette only: rosy chestnut, cream #fbf1dc, dark plum #2b2140, saffron gold #f3a530, pomegranate red #d6404c, turquoise #16a39a, lapis blue #22327a.

CHARACTER: "Rakhsh", the legendary horse from the Shahnameh, drawn as a friendly young foal for small children. Rosy-chestnut coat with small light dapples, a flowing dark mane and tail, big kind eyes, a small saffron-gold headband with a turquoise stone. Strong, brave and full of energy, a running and stamina coach. Stands on four legs. No saddle, no rider, no weapons.

LAYOUT: 3 poses of the SAME horse in one row. Every pose full body, same scale. All hooves on the same invisible horizontal baseline. Generous empty space between poses, nothing overlaps. Three-quarter view facing LEFT in every pose.

POSES, in order:
1. Greeting: standing, head bowed slightly toward the viewer, one front hoof raised, warm smile.
2. Challenge: galloping happily, mane flying, looking at the viewer, as if inviting them to run along.
3. Proud: rearing gently on hind legs, front hooves in the air, eyes closed, joyful.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each pose. No scenery, no frames, no borders.

DO NOT include any text, letters, numbers, motion lines, labels, captions, logos, watermark or signature.
```

### ۱۲. سیمرغ، میزبانِ خوانِ ۷ «جشنِ سرزمین» · نسبت ۳:۲

```
Character model sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image only as a style reference (line, shading, colors); draw a new character.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, magical and festive, inspired by the Simorgh in Persian miniature painting but cute and simple for small children. Color palette only: turquoise #16a39a, lapis blue #22327a, saffron gold #f3a530, pomegranate red #d6404c, cream #fbf1dc, dark plum #2b2140.

CHARACTER: the Simorgh, the wise and kind magical bird from Persian legend, host of the final festival. A rounded body, a long flowing tail of curling turquoise, lapis and gold feathers like a peacock's, a small crest of three golden feathers on the head, big warm wise eyes, a gentle smile. Majestic but friendly, like a loving grandmother.

LAYOUT: 3 poses of the SAME bird in one row. Every pose full body including the whole tail, same scale. All feet on the same invisible horizontal baseline (the flying pose floats above it). Generous empty space between poses, nothing overlaps. Three-quarter view facing LEFT in every pose.

POSES, in order:
1. Greeting: standing, wings slightly open in a welcoming gesture, warm smile.
2. Challenge: dancing on one foot, wings spread and tail swirling, inviting the viewer to join a traditional game.
3. Proud: flying with wings fully spread, tail flowing, eyes closed, radiant joy, a few small golden sparkles around.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under the standing poses. No scenery, no frames, no borders.

DO NOT include any text, letters, numbers, labels, captions, logos, watermark or signature.
```

### ۱۳. یوزیِ جوان (مرحلهٔ ۲) · نسبت ۲:۱

برگهٔ یوزیِ توله (پرامپت ۱) را پیوست کنید.

```
Character model sheet for a children's mobile game made in Iran, for 6–7 year old kids. This is the SAME cheetah "Yuzi" as in the attached image, now grown into a YOUNG cheetah. Keep the same face, fur color, spots, black tear lines from the eyes to the mouth, outline and style.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes. Color palette only: saffron gold #f3a530, cream #fbf1dc, dark plum #2b2140, pomegranate red #d6404c, turquoise #16a39a, lapis blue #22327a.

CHARACTER CHANGES: taller and more athletic than the cub, the head now about 35% of the body height, longer legs, confident expression. New accessory: a pomegranate-red scarf tied around the neck with the ends flowing. Still anthropomorphic, standing on two legs.

LAYOUT: 4 poses of the SAME character in one row. Every pose full body, same scale. All feet on the same invisible horizontal baseline. Generous empty space between poses, nothing overlaps. Three-quarter view facing LEFT in every pose.

POSES, in order:
1. Standing relaxed, smiling, waving hello with one paw.
2. Cheering: jumping in the air, both arms up, scarf flying, mouth open with joy.
3. Talking: mouth open mid-sentence, one paw pointing forward-left as if explaining something.
4. Comforting: gentle soft smile, kind eyebrows, one paw on its own chest, head tilted.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each pose. No scenery, no frames, no borders.

DO NOT include any text, letters, numbers, labels, captions, logos, watermark or signature.
```

### ۱۴. یوزیِ تیزپا (مرحلهٔ ۳) · نسبت ۲:۱

برگهٔ یوزیِ جوان (پرامپت ۱۳) را پیوست کنید.

```
Character model sheet for a children's mobile game made in Iran, for 6–7 year old kids. This is the SAME cheetah "Yuzi" as in the attached image, now fully grown into a swift hero cheetah. Keep the same face, fur color, spots, black tear lines from the eyes to the mouth, the pomegranate-red scarf, outline and style.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes. Color palette only: saffron gold #f3a530, cream #fbf1dc, dark plum #2b2140, pomegranate red #d6404c, turquoise #16a39a, lapis blue #22327a.

CHARACTER CHANGES: a grown, slim, athletic and heroic cheetah, the head now about 28% of the body height, long legs, a proud kind expression. Keeps the pomegranate-red scarf. New accessory: a small golden crown-shaped headband with three points and a turquoise stone in the middle. Still friendly and cute for small children, anthropomorphic, standing on two legs.

LAYOUT: 4 poses of the SAME character in one row. Every pose full body, same scale. All feet on the same invisible horizontal baseline. Generous empty space between poses, nothing overlaps. Three-quarter view facing LEFT in every pose.

POSES, in order:
1. Standing tall and proud, smiling, waving hello with one paw.
2. Cheering: jumping high in the air, both arms up, scarf flying, mouth open with joy.
3. Talking: mouth open mid-sentence, one paw pointing forward-left as if explaining something.
4. Comforting: gentle soft smile, kind eyebrows, one paw on its own chest, head tilted.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each pose. No scenery, no frames, no borders.

DO NOT include any text, letters, numbers, labels, captions, logos, watermark or signature.
```

---

## منزل ۵ — تصویرهای قصه

قصهٔ کتاب (ص ۳۴) سه حالتِ تعادل دارد. حالتِ لک‌لک را از قبل داریم (`girl-m5-2a`)؛ این دو برگه بقیه را می‌سازند.
تا وقتی برسند، در پیش‌نمایش جایشان آدمکِ ساده است.

### ۱۵. دختر در حالت‌های درخت و فرشته · نسبت ۳:۲

برگهٔ دختر (پرامپت ۲) را پیوست کنید. نام فایل‌ها: `girl-tree`، `girl-angel`.

```
Character pose sheet for a children's exercise game made in Iran. The character is the SAME girl as in the attached image: identical face, turquoise sports hijab hood, turquoise jacket with saffron stripes, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign her.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, calm focused smile.

LAYOUT: 2 poses in one row. Every pose full body, same scale. The standing foot of both poses on the same invisible horizontal baseline. Generous empty space between poses, nothing overlaps.

POSES, in order:
1. TREE POSE: standing tall on her RIGHT leg, facing the viewer (front view); the left knee bent out to the side with the sole of the left foot resting against the inside of the right calf; both arms raised straight above the head with the palms touching, like the branches of a tree. Calm, proud expression.
2. ANGEL POSE (arabesque), three-quarter view facing LEFT: standing on her RIGHT leg; the left leg stretched straight backward and up to hip height; the upper body leaning forward almost level with the floor; both arms stretched out wide to the sides like wings. Concentrating, tongue slightly out.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under the standing foot. No scenery, no frames, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۱۶. شخصیت‌های قصه: درخت، کلاغ، گنجشک · نسبت ۳:۲

یک برگه از یوزی (پرامپت ۱) را پیوست کنید. نام فایل‌ها: `story-tree`، `story-crow`، `story-sparrow`.

```
Character sheet of three talking characters for a children's story in a mobile game made in Iran, for 6–7 year old kids. Use the attached image only as a style reference (line, shading, colors); draw new characters.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive kind eyes, warm and funny. Color palette only: turquoise #16a39a, lapis blue #22327a, saffron gold #f3a530, pomegranate red #d6404c, cream #fbf1dc, dark plum #2b2140, plus natural greens and browns.

LAYOUT: 3 characters in one row, same overall height, each one standing on the same invisible horizontal baseline. Generous empty space between them, nothing overlaps. Each one is TALKING: mouth open mid-sentence, friendly.

CHARACTERS, in order:
1. A young friendly tree with a face on its trunk (big kind eyes, smiling mouth), a round green crown of leaves, standing on its roots like feet; two branches raised above the crown like arms reaching up.
2. A clever black-and-grey crow, standing on one leg, one wing lifted as if teaching, a small turquoise scarf.
3. A tiny round house sparrow with brown and cream feathers, both wings spread wide open to the sides, hovering just above the baseline.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each character. No rooftop, no garden, no scenery, no frames, no borders.

DO NOT include any text, letters, numbers, speech bubbles, labels, captions, logos, watermark or signature.
```

---

## پسر — همان حرکت‌ها و حالت‌ها

اگر کودک پسر را انتخاب کند، این تصویرها جای دختر را می‌گیرند. تا وقتی نرسیده‌اند، برنامه همان تصویرهای دختر را نشان می‌دهد.

### ۱۷. حرکت‌های خوانِ تعادل (پسر) · نسبت ۲:۳

برگهٔ پسر (پرامپت ۳) را پیوست کنید. نام فایل‌ها مثلِ دختر است با `boy` به‌جای `girl`:
ردیف ۱ `boy-m5-1a` (کادرِ راست) و `boy-m5-1b` (کادرِ چپ)، ردیف ۲ `boy-m5-2a` و `boy-m5-2b`، ردیف ۳ `boy-m5-3a` و `boy-m5-3b`.

```
Animation keyframe sheet for a children's exercise game made in Iran. The character is the SAME boy as in the attached image: identical face, short dark brown hair, saffron zip-up sports jacket with turquoise stripes on the sleeves, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign him.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 3 rows × 2 columns = 6 frames. Each row is one balance exercise; the RIGHT frame is the starting pose and the LEFT frame is the peak of the movement. Every frame full body, same scale. In every frame he stands on his RIGHT leg, and the right foot stays in exactly the same spot on the same invisible baseline, so the two frames of a row can be swapped like an animation. Three-quarter view facing LEFT. Generous empty space between frames, nothing overlaps.

ROW 1 — "stand on one leg and put sandbags into a basket with the other foot":
  right frame: standing on the right leg, left knee lifted forward to hip height, toes pointing down as if gripping something small, arms stretched out to the sides for balance.
  left frame: standing on the right leg, left leg extended forward and slightly up, foot held at knee height as if dropping something into a basket in front of him, arms out for balance.
ROW 2 — "stand on one leg and touch colored circles on the floor with the other foot":
  right frame: standing on the right leg, left knee lifted, arms out to the sides.
  left frame: standing on the right leg, left leg stretched far forward-left with the toes just touching the floor, body leaning slightly back, arms out.
ROW 3 — "stand on one leg and stack plastic cups with one hand":
  right frame: standing on the right leg, left knee slightly lifted, bending forward at the hips, left hand low near the floor holding one small red plastic cup, right arm out for balance.
  left frame: standing tall on the right leg, left knee lifted, left hand raised to chest height placing the red cup on top of an invisible stack, right arm out for balance.

IMPORTANT: keep this exact order — in every row the RIGHT frame is the start and the LEFT frame is the peak.

No other objects: no sandbags, no basket, no circles, no cup stack — only the single red cup in his hand in row 3.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under the standing foot. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۱۸. پسر در حالت‌های درخت و فرشته · نسبت ۳:۲

برگهٔ پسر (پرامپت ۳) را پیوست کنید. نام فایل‌ها: `boy-tree`، `boy-angel`. (حالتِ لک‌لکِ قصه همان `boy-m5-2a` است.)

```
Character pose sheet for a children's exercise game made in Iran. The character is the SAME boy as in the attached image: identical face, short dark brown hair, saffron zip-up sports jacket with turquoise stripes on the sleeves, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign him.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, calm focused smile.

LAYOUT: 2 poses in one row. Every pose full body, same scale. The standing foot of both poses on the same invisible horizontal baseline. Generous empty space between poses, nothing overlaps.

POSES, in order:
1. TREE POSE: standing tall on his RIGHT leg, facing the viewer (front view); the left knee bent out to the side with the sole of the left foot resting against the inside of the right calf; both arms raised straight above the head with the palms touching, like the branches of a tree. Calm, proud expression.
2. ANGEL POSE (arabesque), three-quarter view facing LEFT: standing on his RIGHT leg; the left leg stretched straight backward and up to hip height; the upper body leaning forward almost level with the floor; both arms stretched out wide to the sides like wings. Concentrating, tongue slightly out.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under the standing foot. No scenery, no frames, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

**بعد از ساخت:** برگه‌ها را بفرستید. من می‌بُرم، کادرها را هم‌تراز می‌کنم و نامشان را در `BOY_READY` داخلِ `prototype/index.html` می‌گذارم تا برای پسر نشان داده شوند.

---

## خوان‌های ۱ و ۲ — درس‌های ۱ تا ۴ (کتاب، ص ۹ تا ۳۱)

برای همهٔ برگه‌های دختر، **برگهٔ دختر (پرامپت ۲) را پیوست کنید.** برای برگه‌های ۲۶ تا ۲۸، برگهٔ یوزی (پرامپت ۱) را پیوست کنید.
اول برگه‌های دختر را بسازید. نسخهٔ پسر بعداً می‌آید: همان پرامپت‌ها، با جملهٔ پسر از پرامپت ۱۷ به‌جای جملهٔ دختر. تا آن موقع، پسر کادرهای دختر را می‌بیند.

برگه‌ها به ترتیبِ اهمیت آمده‌اند. با ۱۹، ۲۰، ۲۲ و ۲۴ هر چهار منزل بازی‌شدنی می‌شوند و بقیه کامل‌ترش می‌کنند.

| # | برگه | منزل | تعداد | نسبت |
|---|---|---|---|---|
| ۱۹ | حرکت‌های قصهٔ «درکِ حرکت» | ۱ | ۱۰ | ۵:۳ |
| ۲۰ | ضربه به بادکنک و فرمان‌های اوستا | ۱ و ۲ | ۱۰ | ۵:۳ |
| ۲۱ | وضعیتِ درست و نادرست | ۲ | ۸ | ۲:۱ |
| ۲۲ | راه رفتن، دویدن، کانگورو، قورباغه | ۳ | ۸ | ۲:۳ |
| ۲۳ | مرغ، گوریل، گربه، مار | ۳ | ۸ | ۲:۳ |
| ۲۴ | حرکت‌های قصهٔ «بدنِ قوی» | ۴ | ۸ | ۲:۳ |
| ۲۵ | حرکت‌های روی زمین | ۴ | ۸ | ۲:۳ |
| ۲۶ | شخصیت‌های قصه‌ها | ۱ تا ۴ | ۵ | ۵:۲ |
| ۲۷ | حیوان‌هایی که کودک ادایشان را درمی‌آورد | ۳ | ۴ | ۲:۱ |
| ۲۸ | یوزی در حالت‌های تازه | همه | ۶ | ۳:۲ |

### ۱۹. حرکت‌های قصهٔ «درکِ حرکت» (دختر) · نسبت ۵:۳

کتاب ص ۱۰: پاها بالا، سر به چهار طرف، دست‌ها به چهار طرف، هر کدام پنج بار.
نام‌ها، به ترتیب: `girl-m1-legL` `girl-m1-legR` `girl-m1-headR` `girl-m1-headL` `girl-m1-headD` · `girl-m1-headU` `girl-m1-armU` `girl-m1-armF` `girl-m1-armS` `girl-m1-armD`

```
Character pose sheet for a children's exercise game made in Iran. The character is the SAME girl as in the attached image: identical face, turquoise sports hijab hood, turquoise jacket with saffron stripes, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign her.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 2 rows × 5 columns = 10 poses, read like a book from top-left. Every pose full body, FRONT VIEW (facing the viewer), same scale, all feet on the same invisible baseline in each row. Generous empty space between poses, nothing overlaps.

POSES, in order:
1. Standing on the right leg, LEFT knee lifted high in front to hip height, arms relaxed at the sides.
2. Standing on the left leg, RIGHT knee lifted high in front to hip height, arms relaxed at the sides.
3. Standing straight, head turned to HER RIGHT (we see her face in profile looking toward the left edge of the picture), shoulders still facing us.
4. Standing straight, head turned to HER LEFT (face in profile looking toward the right edge), shoulders still facing us.
5. Standing straight, head bent DOWN, chin close to the chest, looking at her feet.
6. Standing straight, head tilted UP, looking at the sky, smiling.
7. Standing straight, both arms raised STRAIGHT UP above the head, palms facing forward.
8. Standing straight, both arms stretched STRAIGHT FORWARD toward the viewer at shoulder height, palms down (draw the foreshortening clearly: we see her palms and short forearms).
9. Standing straight, both arms stretched STRAIGHT OUT to the sides at shoulder height, like the letter T.
10. Standing straight like a soldier, arms straight down along the body, proud smile.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۰. ضربه به بادکنک و فرمان‌های اوستا (دختر) · نسبت ۵:۳

کتاب ص ۱۱، ۱۲ و ۱۷: ضربه به بادکنک با سر، دست، پا و همهٔ بدن؛ «بنشین‌وپاشو» و «دست روی بینی»؛ چوب پشتِ شانه.
**بادکنک نکشید.** برنامه خودش بادکنک را روی تصویرِ دوربین می‌گذارد.
نام‌ها: `girl-m1-hitHead` `girl-m1-hitHand` `girl-m1-hitKnee` `girl-m1-hitFoot` `girl-m1-hitAll` · `girl-m1-squat` `girl-m1-nose` `girl-m2-stick` `girl-m2-stickBook` `girl-m2-stickKick`

```
Character pose sheet for a children's exercise game made in Iran. The character is the SAME girl as in the attached image: identical face, turquoise sports hijab hood, turquoise jacket with saffron stripes, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign her.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 2 rows × 5 columns = 10 poses, read like a book from top-left. Every pose full body, three-quarter view facing LEFT, same scale, feet on the same invisible baseline in each row. Generous empty space between poses, nothing overlaps.

POSES, in order (there is NO balloon in the picture; she hits an imaginary balloon above-left of her):
1. HEAD HIT: a small hop, both feet just off the ground, looking up, forehead pushing up and forward as if bouncing a balloon with her head, arms out for balance.
2. HAND HIT: one arm swinging up above the head with an open palm, as if tapping a balloon up, the other arm low.
3. KNEE HIT: standing on one leg, the other knee popping up high in front as if bouncing a balloon with the knee, arms out.
4. FOOT HIT: standing on one leg, the other leg kicking gently forward at knee height with the foot flexed, arms out.
5. WHOLE BODY: jumping joyfully, one hand up and one knee up at the same time, big smile.
6. SQUAT: deep squat with thighs level, heels on the ground, back straight, both arms stretched forward for balance.
7. HAND ON NOSE: standing straight, the tip of one index finger touching the tip of her own nose, eyes crossed playfully, giggling.
8. STICK BEHIND SHOULDERS: standing straight, a light thin wooden stick (like a broom handle) lying across the back of her shoulders behind the neck, both hands holding the stick near the ends, elbows bent, chest proud.
9. STICK AND BOOK: the same stick behind the shoulders, a closed blue book balanced flat on top of her head, knees half bent in a slow careful squat, back very straight, concentrating.
10. STICK AND KICK: the same stick behind the shoulders, standing on one leg and kicking the other foot forward at knee height.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۱. وضعیتِ درست و نادرست (دختر) · نسبت ۲:۱

کتاب ص ۱۶ و ۱۹: درست ایستادن، درست نشستن، کوله روی دو شانه، درست نوشتن. هر حالت یک نسخهٔ «درست» و یک نسخهٔ «نادرست» دارد تا برنامه مقایسه نشان دهد.
نام‌ها: `girl-m2-standOk` `girl-m2-standBad` `girl-m2-sitOk` `girl-m2-sitBad` · `girl-m2-bagOk` `girl-m2-bagBad` `girl-m2-writeOk` `girl-m2-writeBad`

```
Character pose sheet for a children's exercise game made in Iran, teaching good posture. The character is the SAME girl as in the attached image: identical face, turquoise sports hijab hood, turquoise jacket with saffron stripes, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign her.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 2 rows × 4 columns = 8 poses, read like a book from top-left, in pairs: each GOOD pose is followed by the SAME situation done BADLY. Every pose full body, same scale, feet on the same invisible baseline in each row. Generous empty space between poses, nothing overlaps.

POSES, in order:
1. GOOD STANDING, exact SIDE VIEW facing LEFT: standing tall, ear, shoulder, hip and ankle in one straight vertical line, chin level, relaxed arms, proud smile.
2. BAD STANDING, exact SIDE VIEW facing LEFT: slouching, rounded shoulders, head pushed forward, belly out, bored face.
3. GOOD SITTING, SIDE VIEW facing LEFT, on a simple wooden school chair: back straight against the backrest, feet flat on the floor, knees at a right angle, hands on the thighs, smile.
4. BAD SITTING, same chair, SIDE VIEW: slumped down, back curved, one leg tucked under, head hanging, sleepy face.
5. GOOD BACKPACK, three-quarter BACK view: a red school backpack worn on BOTH shoulders, straps snug, the bag high on the back, walking tall.
6. BAD BACKPACK, three-quarter BACK view: the same red backpack hanging from ONE shoulder only, low near the hip, the body leaning sideways to carry it.
7. GOOD WRITING, SIDE VIEW facing LEFT: sitting straight at a small school desk, writing in an open notebook with a pencil held correctly between thumb and index finger, eyes a good distance from the page.
8. BAD WRITING, same desk, SIDE VIEW: bent over the desk with the face almost touching the notebook, pencil gripped in a fist.

Allowed objects only: the chair, the desk, the notebook, the pencil and the red backpack.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۲. راه رفتن، دویدن، کانگورو، قورباغه (دختر) · نسبت ۲:۳

کتاب ص ۲۲، ۲۳ و ۲۵. هر ردیف یک حرکت است: کادرِ راست شروع، کادرِ چپ اوج.
نام‌ها: ردیف ۱ `girl-m3-walkA` (راست) `girl-m3-walkB` (چپ)، ردیف ۲ `girl-m3-runA` `girl-m3-runB`، ردیف ۳ `girl-m3-roo-a` `girl-m3-roo-b`، ردیف ۴ `girl-m3-frog-a` `girl-m3-frog-b`

```
Animation keyframe sheet for a children's exercise game made in Iran. The character is the SAME girl as in the attached image: identical face, turquoise sports hijab hood, turquoise jacket with saffron stripes, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign her.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 4 rows × 2 columns = 8 frames. Each row is one movement: the RIGHT frame is the starting pose and the LEFT frame is the peak of the movement. Every frame full body, same scale. In each row the feet (or the hands and feet, for floor moves) stay on the same invisible baseline, so the two frames of a row can be swapped like an animation. Generous empty space between frames, nothing overlaps. Three-quarter view facing LEFT.

ROW 1 — WALKING calmly (in place): right frame: left foot stepping forward, right arm swinging forward; left frame: right foot stepping forward, left arm swinging forward. Relaxed, calm smile.
ROW 2 — RUNNING (in place): right frame: left knee high, right arm forward, elbows bent at a right angle, leaning slightly forward; left frame: right knee high, left arm forward. Energetic, determined face.
ROW 3 — KANGAROO JUMP (two feet together, straight up): right frame: crouching with knees bent, both arms swung back behind her; left frame: in the air high above the baseline, both feet together, legs straight, both arms swung up above the head. A soft shadow stays on the baseline under her.
ROW 4 — FROG JUMP: right frame: deep frog squat, knees wide apart, both hands flat on the floor between the feet, looking forward; left frame: leaping up and forward from the squat, arms and legs spread wide like a jumping frog, joyful laugh.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۳. مرغ، گوریل، گربه، مار (دختر) · نسبت ۲:۳

کتاب ص ۲۳: «مثل دو تا از آن‌ها حرکت کن، ده بار.» کادرِ راست شروع، کادرِ چپ اوج.
نام‌ها: ردیف ۱ `girl-m3-hen-a` `girl-m3-hen-b`، ردیف ۲ `girl-m3-gorilla-a` `girl-m3-gorilla-b`، ردیف ۳ `girl-m3-cat-a` `girl-m3-cat-b`، ردیف ۴ `girl-m3-snake-a` `girl-m3-snake-b`

```
Animation keyframe sheet for a children's exercise game made in Iran: the girl pretends to be animals. The character is the SAME girl as in the attached image: identical face, turquoise sports hijab hood, turquoise jacket with saffron stripes, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign her.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression. Playful, funny faces that match each animal.

LAYOUT: 4 rows × 2 columns = 8 frames. Each row is one movement: the RIGHT frame is the starting pose and the LEFT frame is the peak of the movement. Every frame full body, same scale. In each row the feet (or the hands and feet, for floor moves) stay on the same invisible baseline, so the two frames of a row can be swapped like an animation. Generous empty space between frames, nothing overlaps. Three-quarter view facing LEFT for rows 1–2, SIDE VIEW facing LEFT for rows 3–4.

ROW 1 — HEN: right frame: standing, knees slightly bent, hands tucked into the armpits so the elbows are folded like small wings held close to the body, lips pushed out like a beak; left frame: the same, but the folded elbows flapped up and out like wings, one knee lifted in a strutting step.
ROW 2 — GORILLA: right frame: wide stance, knees bent, body leaning forward, long arms hanging down with the knuckles near the floor; left frame: standing up a little in the same wide stance, both fists drumming on her chest, mouth open in a funny roar.
ROW 3 — CAT CRAWL on hands and knees: right frame: on all fours, back flat, the left hand stepping forward; left frame: on all fours, the right hand stepping forward, back gently arched, looking forward like a curious cat.
ROW 4 — SNAKE: right frame: lying flat on her tummy on the floor, arms along the body, chin on the floor; left frame: still lying on her tummy, chest and head lifted, hands flat under the shoulders, body making a small S-curve, tongue out playfully.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۴. حرکت‌های قصهٔ «بدنِ قوی» (دختر) · نسبت ۲:۳

کتاب ص ۲۸: چهار حرکت، هر کدام تا هشت بار. کادرِ راست شروع، کادرِ چپ اوج.
نام‌ها: ردیف ۱ `girl-m4-circle-a` `girl-m4-circle-b`، ردیف ۲ `girl-m4-toe-a` `girl-m4-toe-b`، ردیف ۳ `girl-m4-hug-a` `girl-m4-hug-b`، ردیف ۴ `girl-m4-lunge-a` `girl-m4-lunge-b`

```
Animation keyframe sheet for a children's strength exercise game made in Iran. The character is the SAME girl as in the attached image: identical face, turquoise sports hijab hood, turquoise jacket with saffron stripes, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign her.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 4 rows × 2 columns = 8 frames. Each row is one movement: the RIGHT frame is the starting pose and the LEFT frame is the peak of the movement. Every frame full body, same scale. In each row the feet (or the hands and feet, for floor moves) stay on the same invisible baseline, so the two frames of a row can be swapped like an animation. Generous empty space between frames, nothing overlaps. FRONT VIEW for rows 1–3, SIDE VIEW facing LEFT for row 4.

ROW 1 — ARM CIRCLES: right frame: standing, both arms stretched out to the sides at shoulder height, hands in loose fists slightly raised; left frame: the same, hands slightly lowered and turned, as if drawing small circles in the air (show the change only by the position of the hands, no motion lines).
ROW 2 — TIPTOES: right frame: standing straight with feet flat, hands on the hips; left frame: risen high on her tiptoes, heels lifted off the ground, hands on the hips, standing tall and proud.
ROW 3 — KNEE HUG: right frame: standing straight, arms at the sides; left frame: standing on the left leg, the right knee pulled up to the chest and hugged with both arms, balanced, smiling.
ROW 4 — LUNGE: right frame: standing straight, hands on the hips; left frame: a big step forward with the left foot, front knee bent at a right angle above the ankle, back knee lowered close to the floor, back straight, hands on the hips.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۵. حرکت‌های روی زمین (دختر) · نسبت ۲:۳

کتاب ص ۲۹، ۳۰ و ۳۱: پلانک و چیدن لیوان، خرچنگی، «با دست‌هایت روی زمین دور خودت بچرخ»، چیدن با پا، بازیِ خانوادگی.
نام‌ها: ردیف ۱ `girl-m4-plank-a` `girl-m4-plank-b`، ردیف ۲ `girl-m4-crab-a` `girl-m4-crab-b`، ردیف ۳ `girl-m4-spin-a` `girl-m4-spin-b`، ردیف ۴ `girl-m4-feetStack` `girl-m4-feetUp`

```
Animation keyframe sheet for a children's strength exercise game made in Iran: exercises on the floor. The character is the SAME girl as in the attached image: identical face, turquoise sports hijab hood, turquoise jacket with saffron stripes, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign her.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 4 rows × 2 columns = 8 frames. Each row is one movement: the RIGHT frame is the starting pose and the LEFT frame is the peak of the movement. Every frame full body, same scale. In each row the feet (or the hands and feet, for floor moves) stay on the same invisible baseline, so the two frames of a row can be swapped like an animation. Generous empty space between frames, nothing overlaps. SIDE VIEW facing LEFT in every frame, all figures resting on the same floor baseline in each row.

ROW 1 — PLANK AND CUPS: right frame: a straight plank on straight arms, body in one straight line from head to heels, one small red plastic cup on the floor beside the hands; left frame: the same plank on ONE arm, the other hand lifting the red cup up, body still straight, concentrating.
ROW 2 — CRAB WALK: right frame: sitting on the floor then lifted into crab position — facing up, hands on the floor behind the shoulders with fingers pointing toward the feet, feet flat, hips lifted level; left frame: the same crab position taking one step, one hand and the opposite foot moved forward.
ROW 3 — SPIN ON HANDS: right frame: both feet resting on a small round purple floor cushion, hands on the floor, hips high like an upside-down letter V; left frame: the same, the hands walked a step sideways around the cushion, looking at the hands, giggling.
ROW 4 — FEET WORK (two single poses):
  right frame: sitting on the floor, leaning back on both hands, holding a small soft colorful cushion between her feet and lifting it to stack it on another cushion.
  left frame: lying on her back, legs lifted straight up, holding a soft toy rabbit between her feet and bringing it over her head toward the floor behind her.

Allowed objects only: the red cup, the purple floor cushion, the small cushions and the soft toy rabbit.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۶. شخصیت‌های قصه‌ها · نسبت ۵:۲

قهرمانِ قصه‌ها (تاپ‌تاپو و تاپ‌تاپک) همان دختر یا پسری است که کودک انتخاب کرده، مثلِ قصهٔ تعادل. این برگه بقیهٔ شخصیت‌هاست، **طراحیِ خودمان**، نه کپیِ کتاب.
نام‌ها: `story-mom` `story-aunt` `story-rabbit` `story-frog` `story-uncle`

```
Character sheet of five talking characters for children's stories in a mobile game made in Iran, for 6–7 year old kids. Use the attached image only as a style reference (line, shading, colors); draw new characters.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive kind eyes, warm and funny. Color palette only: turquoise #16a39a, lapis blue #22327a, saffron gold #f3a530, pomegranate red #d6404c, cream #fbf1dc, dark plum #2b2140, plus natural skin tones, greens and browns.

LAYOUT: 5 characters in one row, each full body, standing on the same invisible horizontal baseline, the humans and animals at a friendly similar height. Generous empty space between them, nothing overlaps. Each one is TALKING: mouth open mid-sentence, one hand or paw gesturing. Three-quarter view facing LEFT.

CHARACTERS, in order:
1. MOM: a kind young Iranian mother, a pomegranate-red headscarf, a long turquoise manteau and lapis trousers, holding out one hand as if showing how to stand straight.
2. AUNT: a sweet chubby Iranian grandmother-aunt with a cream floral headscarf and a saffron apron, holding a steaming round pot of thick soup with both hands, rosy cheeks.
3. AUNT RABBIT: a white rabbit standing on two legs in a pink dress with tiny flowers, caught mid-run, long ears flying back, laughing.
4. AUNT FROG: a round green frog standing on two legs in a saffron-yellow dress, caught mid-hop with both feet off the baseline, arms open, cheerful.
5. UNCLE: a strong friendly Iranian uncle with a short dark beard, a lapis work shirt with rolled sleeves and a cream cap, leaning on a garden shovel with one hand, a basket full of red apples at his feet.

Allowed objects only: the soup pot, the shovel and the apple basket.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each character. No garden, no kitchen, no scenery, no frames, no borders.

DO NOT include any text, letters, numbers, speech bubbles, labels, captions, logos, watermark or signature.
```

### ۲۷. حیوان‌هایی که کودک ادایشان را درمی‌آورد · نسبت ۲:۱

کتاب ص ۲۳. قورباغه همان خاله‌قورباغه است و گربه همان نگهبانِ خوانِ ۴؛ این چهار تا تازه‌اند.
نام‌ها: `animal-gorilla` `animal-hen` `animal-kangaroo` `animal-snake`

```
Character sheet of four cute animals for a children's movement game made in Iran, for 6–7 year old kids. Each animal shows the movement the child will copy. Use the attached image only as a style reference (line, shading, colors); draw new characters.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly chibi shapes, big expressive eyes, funny and warm. Natural animal colors, softened toward this palette: saffron #f3a530, cream #fbf1dc, turquoise #16a39a, pomegranate red #d6404c, dark plum #2b2140.

LAYOUT: 2 rows × 2 columns, each animal full body, similar overall size, resting on its own invisible baseline. Generous empty space, nothing overlaps. Three-quarter view facing LEFT.

ANIMALS, in order:
1. A friendly young GORILLA in a wide stance, knees bent, drumming on its chest with both fists, mouth open in a happy roar.
2. A plump HEN strutting with one foot lifted, wings flapped out, beak open in a cluck.
3. A young KANGAROO in mid-jump, both feet together off the ground, small arms tucked, tail straight out, delighted.
4. A cheerful green SNAKE slithering in an S-curve along the baseline, head raised, tongue out, friendly eyes.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each animal. No scenery, no frames, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۸. یوزی در حالت‌های تازه · نسبت ۳:۲

جمله‌های یوزی در پایینِ صفحه‌های کتاب (درس‌های ۱ تا ۴): مواظبِ وسایل، قانونِ بازی، آب خوردن، گوش دادن، درجا زدن پیش از پرش، جمع کردنِ وسایل.
نام‌ها: `yuzi-1-careful` `yuzi-1-rules` `yuzi-1-drink` · `yuzi-1-listen` `yuzi-1-warmup` `yuzi-1-tidy`

```
Character pose sheet for a children's mobile game made in Iran. The character is the SAME cheetah cub "Yuzi" as in the attached image: identical face, black tear lines from the eyes to the mouth, golden spotted fur, cream belly, ringed tail with a white tip, chibi proportions, no clothes. Do not redesign it.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes.

LAYOUT: 2 rows × 3 columns = 6 poses, read like a book from top-left. Every pose full body, same scale, feet on the same invisible baseline in each row. Three-quarter view facing LEFT. Generous empty space between poses, nothing overlaps.

POSES, in order:
1. CAREFUL: walking on tiptoe, looking around wide-eyed, both paws held up carefully beside a small stack of three toy blocks at its feet.
2. RULES: holding a red ball under one arm, the other paw raised with one finger up as if saying "rule number one", serious but kind face.
3. DRINKING: drinking from a turquoise water bottle with both paws, eyes closed happily, a tiny drop on the chin.
4. LISTENING: sitting, one paw cupped behind its ear, head tilted, attentive smile.
5. WARM-UP: jogging in place, one knee high, arms bent and swinging, energetic.
6. TIDYING: bending down to drop a toy block into an open wooden toy box, proud smile.

Allowed objects only: the toy blocks, the red ball, the water bottle and the toy box.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each pose. No scenery, no frames, no borders.

DO NOT include any text, letters, numbers, "Z" letters, labels, captions, logos, watermark or signature.
```

**بعد از ساخت:** برگه‌ها را بفرستید. می‌بُرم، کادرهای هر ردیف را هم‌تراز می‌کنم و جای تصویرهای موقت می‌گذارم.

## پسر — خوان‌های ۱ و ۲ (پرامپت‌های ۱۹ تا ۲۵)

برگهٔ پسر (پرامپت ۳) را پیوست کنید. نام‌ها مثلِ دختر است با `boy` به‌جای `girl`.
نسبت به نسخهٔ دختر سه چیز روشن‌تر گفته شده، چون تصویرساز در برگه‌های دختر اشتباه کرد: در ۱۹ دو پای متفاوت، در ۲۱ فقط هشت حالت و کیف روی یک شانه، و در ۲۵ کادرِ دومِ خرچنگی هم خرچنگی. در برگه‌های حرکتی هم کادرِ **چپ** شروع است، چون تصویرساز همیشه همین‌طور می‌کشید.

### ۱۹. حرکت‌های قصهٔ «درکِ حرکت» (پسر) · نسبت ۵:۳

```
Character pose sheet for a children's exercise game made in Iran. The character is the SAME boy as in the attached image: identical face, short dark brown hair, saffron zip-up sports jacket with turquoise stripes on the sleeves, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign him.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 2 rows × 5 columns = 10 poses, read like a book from top-left. Every pose full body, FRONT VIEW (facing the viewer), same scale, all feet on the same invisible baseline in each row. Generous empty space between poses, nothing overlaps.

POSES, in order:
1. Standing on his right leg, his LEFT knee lifted high in front to hip height (the lifted leg is on the RIGHT side of the picture, since he faces us), arms relaxed at the sides.
2. Standing on his left leg, his RIGHT knee lifted high in front to hip height (the lifted leg is on the LEFT side of the picture — the OTHER leg from pose 1), arms relaxed at the sides.
3. Standing straight, head turned to HIS RIGHT (we see his face in profile looking toward the left edge of the picture), shoulders still facing us.
4. Standing straight, head turned to HIS LEFT (face in profile looking toward the right edge), shoulders still facing us.
5. Standing straight, head bent DOWN, chin close to the chest, looking at his feet.
6. Standing straight, head tilted UP, looking at the sky, smiling.
7. Standing straight, both arms raised STRAIGHT UP above the head, palms facing forward.
8. Standing straight, both arms stretched STRAIGHT FORWARD toward the viewer at shoulder height, palms down (draw the foreshortening clearly: we see his palms and short forearms).
9. Standing straight, both arms stretched STRAIGHT OUT to the sides at shoulder height, like the letter T.
10. Standing straight like a soldier, arms straight down along the body, proud smile.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۰. ضربه به بادکنک و فرمان‌های اوستا (پسر) · نسبت ۵:۳

```
Character pose sheet for a children's exercise game made in Iran. The character is the SAME boy as in the attached image: identical face, short dark brown hair, saffron zip-up sports jacket with turquoise stripes on the sleeves, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign him.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 2 rows × 5 columns = 10 poses, read like a book from top-left. Every pose full body, three-quarter view facing LEFT, same scale, feet on the same invisible baseline in each row. Generous empty space between poses, nothing overlaps.

POSES, in order (there is NO balloon in the picture; he hits an imaginary balloon above-left of him):
1. HEAD HIT: a small hop, both feet just off the ground, looking up, forehead pushing up and forward as if bouncing a balloon with his head, arms out for balance.
2. HAND HIT: one arm swinging up above the head with an open palm, as if tapping a balloon up, the other arm low.
3. KNEE HIT: standing on one leg, the other knee popping up high in front as if bouncing a balloon with the knee, arms out.
4. FOOT HIT: standing on one leg, the other leg kicking gently forward at knee height with the foot flexed, arms out.
5. WHOLE BODY: jumping joyfully, one hand up and one knee up at the same time, big smile.
6. SQUAT: deep squat with thighs level, heels on the ground, back straight, both arms stretched forward for balance.
7. HAND ON NOSE: standing straight, the tip of one index finger touching the tip of his own nose, eyes crossed playfully, giggling.
8. STICK BEHIND SHOULDERS: standing straight, a light thin wooden stick (like a broom handle) lying across the back of his shoulders behind the neck, both hands holding the stick near the ends, elbows bent, chest proud.
9. STICK AND BOOK: the same stick behind the shoulders, a closed blue book balanced flat on top of his head, knees half bent in a slow careful squat, back very straight, concentrating.
10. STICK AND KICK: the same stick behind the shoulders, standing on one leg and kicking the other foot forward at knee height.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۱. وضعیتِ درست و نادرست (پسر) · نسبت ۲:۱

```
Character pose sheet for a children's exercise game made in Iran, teaching good posture. The character is the SAME boy as in the attached image: identical face, short dark brown hair, saffron zip-up sports jacket with turquoise stripes on the sleeves, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign him.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: exactly 2 rows × 4 columns = 8 poses, no more, read like a book from top-left, in pairs: each GOOD pose is followed by the SAME situation done BADLY. Every pose full body, same scale, feet on the same invisible baseline in each row. Generous empty space between poses, nothing overlaps.

POSES, in order:
1. GOOD STANDING, exact SIDE VIEW facing LEFT: standing tall, ear, shoulder, hip and ankle in one straight vertical line, chin level, relaxed arms, proud smile.
2. BAD STANDING, exact SIDE VIEW facing LEFT: slouching, rounded shoulders, head pushed forward, belly out, bored face.
3. GOOD SITTING, SIDE VIEW facing LEFT, on a simple wooden school chair: back straight against the backrest, feet flat on the floor, knees at a right angle, hands on the thighs, smile.
4. BAD SITTING, same chair, SIDE VIEW: slumped down, back curved, one leg tucked under, head hanging, sleepy face.
5. GOOD BACKPACK, three-quarter BACK view: a red school backpack worn on BOTH shoulders, straps snug, the bag high on the back, walking tall.
6. BAD BACKPACK, three-quarter BACK view: the same red backpack hanging from ONE shoulder only (the other shoulder strap clearly empty), low near the hip, the body leaning sideways to carry it.
7. GOOD WRITING, SIDE VIEW facing LEFT: sitting straight at a small school desk, writing in an open notebook with a pencil held correctly between thumb and index finger, eyes a good distance from the page.
8. BAD WRITING, same desk, SIDE VIEW: bent over the desk with the face almost touching the notebook, pencil gripped in a fist.

Allowed objects only: the chair, the desk, the notebook, the pencil and the red backpack.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۲. راه رفتن، دویدن، کانگورو، قورباغه (پسر) · نسبت ۲:۳

```
Animation keyframe sheet for a children's exercise game made in Iran. The character is the SAME boy as in the attached image: identical face, short dark brown hair, saffron zip-up sports jacket with turquoise stripes on the sleeves, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign him.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 4 rows × 2 columns = 8 frames. Each row is one movement: the LEFT frame is the starting pose and the RIGHT frame is the peak of the movement. Every frame full body, same scale. In each row the feet (or the hands and feet, for floor moves) stay on the same invisible baseline, so the two frames of a row can be swapped like an animation. Generous empty space between frames, nothing overlaps. Three-quarter view facing LEFT.

ROW 1 — WALKING calmly (in place): left frame: left foot stepping forward, right arm swinging forward; right frame: right foot stepping forward, left arm swinging forward. Relaxed, calm smile.
ROW 2 — RUNNING (in place): left frame: left knee high, right arm forward, elbows bent at a right angle, leaning slightly forward; right frame: right knee high, left arm forward. Energetic, determined face.
ROW 3 — KANGAROO JUMP (two feet together, straight up): left frame: crouching with knees bent, both arms swung back behind him; right frame: in the air high above the baseline, both feet together, legs straight, both arms swung up above the head. A soft shadow stays on the baseline under him.
ROW 4 — FROG JUMP: left frame: deep frog squat, knees wide apart, both hands flat on the floor between the feet, looking forward; right frame: leaping up and forward from the squat, arms and legs spread wide like a jumping frog, joyful laugh.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۳. مرغ، گوریل، گربه، مار (پسر) · نسبت ۲:۳

```
Animation keyframe sheet for a children's exercise game made in Iran: the boy pretends to be animals. The character is the SAME boy as in the attached image: identical face, short dark brown hair, saffron zip-up sports jacket with turquoise stripes on the sleeves, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign him.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression. Playful, funny faces that match each animal.

LAYOUT: 4 rows × 2 columns = 8 frames. Each row is one movement: the LEFT frame is the starting pose and the RIGHT frame is the peak of the movement. Every frame full body, same scale. In each row the feet (or the hands and feet, for floor moves) stay on the same invisible baseline, so the two frames of a row can be swapped like an animation. Generous empty space between frames, nothing overlaps. Three-quarter view facing LEFT for rows 1–2, SIDE VIEW facing LEFT for rows 3–4.

ROW 1 — HEN: left frame: standing, knees slightly bent, hands tucked into the armpits so the elbows are folded like small wings held close to the body, lips pushed out like a beak; right frame: the same, but the folded elbows flapped up and out like wings, one knee lifted in a strutting step.
ROW 2 — GORILLA: left frame: wide stance, knees bent, body leaning forward, long arms hanging down with the knuckles near the floor; right frame: standing up a little in the same wide stance, both fists drumming on his chest, mouth open in a funny roar.
ROW 3 — CAT CRAWL on hands and knees: left frame: on all fours, back flat, the left hand stepping forward; right frame: on all fours, the right hand stepping forward, back gently arched, looking forward like a curious cat.
ROW 4 — SNAKE: left frame: lying flat on his tummy on the floor, arms along the body, chin on the floor; right frame: still lying on his tummy, chest and head lifted, hands flat under the shoulders, body making a small S-curve, tongue out playfully.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۴. حرکت‌های قصهٔ «بدنِ قوی» (پسر) · نسبت ۲:۳

```
Animation keyframe sheet for a children's strength exercise game made in Iran. The character is the SAME boy as in the attached image: identical face, short dark brown hair, saffron zip-up sports jacket with turquoise stripes on the sleeves, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign him.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 4 rows × 2 columns = 8 frames. Each row is one movement: the LEFT frame is the starting pose and the RIGHT frame is the peak of the movement. Every frame full body, same scale. In each row the feet (or the hands and feet, for floor moves) stay on the same invisible baseline, so the two frames of a row can be swapped like an animation. Generous empty space between frames, nothing overlaps. FRONT VIEW for rows 1–3, SIDE VIEW facing LEFT for row 4.

ROW 1 — ARM CIRCLES: left frame: standing, both arms stretched out to the sides at shoulder height, hands in loose fists slightly raised; right frame: the same, hands slightly lowered and turned, as if drawing small circles in the air (show the change only by the position of the hands, no motion lines).
ROW 2 — TIPTOES: left frame: standing straight with feet flat, hands on the hips; right frame: risen high on his tiptoes, heels lifted off the ground, hands on the hips, standing tall and proud.
ROW 3 — KNEE HUG: left frame: standing straight, arms at the sides; right frame: standing on the left leg, the right knee pulled up to the chest and hugged with both arms, balanced, smiling.
ROW 4 — LUNGE: left frame: standing straight, hands on the hips; right frame: a big step forward with the left foot, front knee bent at a right angle above the ankle, back knee lowered close to the floor, back straight, hands on the hips.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```

### ۲۵. حرکت‌های روی زمین (پسر) · نسبت ۲:۳

```
Animation keyframe sheet for a children's strength exercise game made in Iran: exercises on the floor. The character is the SAME boy as in the attached image: identical face, short dark brown hair, saffron zip-up sports jacket with turquoise stripes on the sleeves, lapis blue trousers, red sneakers, identical style, outline and colors. Do not redesign him.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, cheerful focused expression.

LAYOUT: 4 rows × 2 columns = 8 frames. Each row is one movement: the LEFT frame is the starting pose and the RIGHT frame is the peak of the movement. Every frame full body, same scale. In each row the feet (or the hands and feet, for floor moves) stay on the same invisible baseline, so the two frames of a row can be swapped like an animation. Generous empty space between frames, nothing overlaps. SIDE VIEW facing LEFT in every frame, all figures resting on the same floor baseline in each row.

ROW 1 — PLANK AND CUPS: left frame: a straight plank on straight arms, body in one straight line from head to heels, one small red plastic cup on the floor beside the hands; right frame: the same plank on ONE arm, the other hand lifting the red cup up, body still straight, concentrating.
ROW 2 — CRAB WALK: left frame: sitting on the floor then lifted into crab position — facing up, hands on the floor behind the shoulders with fingers pointing toward the feet, feet flat, hips lifted level; right frame: STILL in the same crab position (facing up, hips lifted, NOT standing), taking one step, one hand and the opposite foot moved forward.
ROW 3 — SPIN ON HANDS: left frame: both feet resting on a small round purple floor cushion, hands on the floor, hips high like an upside-down letter V; right frame: the same, the hands walked a step sideways around the cushion, looking at the hands, giggling.
ROW 4 — FEET WORK (two single poses):
  left frame: sitting on the floor, leaning back on both hands, holding a small soft colorful cushion between his feet and lifting it to stack it on another cushion.
  right frame: lying on his back, legs lifted straight up, holding a soft toy rabbit between his feet and bringing it over his head toward the floor behind him.

Allowed objects only: the red cup, the purple floor cushion, the small cushions and the soft toy rabbit.

BACKGROUND: plain flat pure white (#FFFFFF). Only a small soft oval shadow under each figure. No scenery, no frames, no grid lines, no borders.

DO NOT include any text, letters, numbers, arrows, motion lines, labels, captions, logos, watermark or signature.
```
