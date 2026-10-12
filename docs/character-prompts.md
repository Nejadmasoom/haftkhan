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

### ۷. خروسِ سحر، نگهبانِ خوانِ ۱ «بیدارِ بدن» · نسبت ۳:۲

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

## حرکت‌های بقیهٔ درس‌ها

برای آن‌ها هنوز پرامپت ننوشته‌ام. اول باید تمرین‌های هر درس از کتاب استخراج شود، چون همهٔ درس‌ها سه حرکت بدنی ندارند. وقتی استخراج شد، با همان الگوی پرامپت ۴ نوشته می‌شوند.
