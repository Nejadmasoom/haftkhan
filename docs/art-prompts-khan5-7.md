# پرامپت‌های نقاشی برای خوانِ ۵ تا ۷ (درس‌های ۹ تا ۱۲): ۴۵ ژست در ۳ صفحه

هر پرامپت **یک صفحهٔ مربع با ۱۶ ژست** (جدولِ ۴×۴) می‌سازد؛ برگهٔ سوم ۱۳ ژست دارد و سه خانهٔ آخرش خالی است. برای هر صفحه دو پرامپت هست: دختر و پسر. جمعاً **۶ تصویر**.

**پیش از ساختن:** تصویرِ `girl-idle` یا `boy-idle` را پیوست کنید؛ نسبت ۱:۱؛ بالاترین کیفیت/اندازه‌ای که ابزار می‌دهد. بعد از ساخت ببینید: همهٔ ژست‌ها هست، بدونِ نوشته و عدد، بدونِ دست و پای اضافه، و بچه در همه یکی است. **اگر ابزارتان با ۱۶ خانه اشتباه کرد** (دست و پای اضافه، خانه‌ها قاطی)، همان پرامپت را بدهید ولی `4x4` را به `3x3` و ژست‌ها را به ۹ تا تقسیم کنید؛ یا فقط یکی دو خانهٔ خراب را با پرامپتِ «درست کردنِ یک حالت» (آخرِ `art-prompts-khan3-4.md`) دوباره بسازید.

---

## صفحهٔ 1 (16 ژست)

| خانه | کد | حالت |
|---|---|---|
| 1 | `m9-over-a` | پرتابِ دودستی، آماده: توپ پشتِ سر |
| 2 | `m9-over-b` | پرتابِ دودستی، رها کردن |
| 3 | `m9-arm-a` | پرتابِ یک‌دستی، عقب بردنِ دست |
| 4 | `m9-arm-b` | پرتابِ یک‌دستی، رها کردن |
| 5 | `m9-toss` | توپ را بالا انداختن |
| 6 | `m9-clap` | کف زدن زیرِ توپ |
| 7 | `m9-catch` | گرفتنِ توپ |
| 8 | `m9-chest` | گرفتنِ توپِ برگشتی جلوی سینه |
| 9 | `m9-pass` | نشسته، دادنِ توپ به نفرِ کناری |
| 10 | `m10-tapR` | پای راست روی توپ |
| 11 | `m10-tapL` | پای چپ روی توپ |
| 12 | `m10-str-a` | بادکنکِ نخ‌دار، آماده |
| 13 | `m10-str-b` | بادکنکِ نخ‌دار، ضربه با رویِ پا |
| 14 | `m10-keep-a` | روپایی با بادکنک، پا بالا |
| 15 | `m10-keep-b` | روپایی با بادکنک، نگاه به بالا |
| 16 | `m10-dribble` | هل دادنِ توپ با پا به طرفِ حلقه |

### صفحهٔ 1، دختر

```
Pose sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image as the exact character reference: draw THIS same girl, keep everything identical, only change the pose.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, warm and joyful. Color palette only: turquoise #16a39a, lapis blue #22327a, saffron gold #f3a530, pomegranate red #d6404c, cream #fbf1dc, dark plum #2b2140, plus natural skin tones.

CHARACTER: a 7-year-old Iranian girl, round cheerful face, warm light-brown skin, dark brown eyes, rosy cheeks. She wears a turquoise children's sports hijab hood (a soft one-piece hood that covers the hair and neck, framing the face), a turquoise zip-up sports jacket with a saffron stripe on the sleeves, lapis blue sports trousers, and red sneakers with white soles. Child proportions: the head is about one quarter of the body height.

LAYOUT: one square, very high-resolution image, a clean invisible 4x4 grid = exactly 16 occupied cells, read left to right, top to bottom. Exactly ONE full-body child per cell, centred, the same size in every cell, with wide empty white margin around each pose; no pose touches, overlaps or crosses into another cell. Feet (or the body part on the floor) rest on the same invisible floor line within each row.

STRICT RULES:
- The SAME child in every cell: identical face, hood/clothes, colours and proportions as the attached reference.
- Correct anatomy in every cell: exactly two arms, two legs, two hands with five fingers each, two feet; no extra or missing limbs, no twisted joints.
- Draw each pose exactly as described, nothing added. "Front view" = the child faces the viewer. "Side view" = the child faces to the RIGHT of the image.
- Only the props named in a cell; no furniture, floor, mats or scenery unless named. A ball is a plain round ball with no pattern or text.
- Background pure flat white (#FFFFFF); only a small soft oval shadow under each pose.
- NO text, letters, numbers, arrows, motion lines, grid lines, frames, labels, captions, logo or watermark anywhere.

POSES, cell by cell:
1. Side view: two-hand overhead throw, ready — standing, one foot forward, both hands holding a red ball behind the head, elbows bent.
2. Side view: two-hand overhead throw, release — both arms stretched forward and up, the red ball just leaving the hands in front of the face.
3. Side view: one-hand overarm throw, wind-up — the throwing arm bent back high behind the head holding a small red ball, the other arm pointing forward, front foot forward.
4. Side view: one-hand overarm throw, release — the throwing arm swung forward and straight, the small red ball just leaving the hand, body leaning forward.
5. Front view: tossing a ball up — both arms raised straight up, hands open, a red ball a little above the hands, looking up.
6. Front view: clapping — hands clapped together in front of the chest, looking up at a red ball floating above the head.
7. Front view: catching — both hands cupped together in front of the chest holding a red ball, happy face.
8. Front view: catching a bouncing ball at chest height — knees slightly bent, both arms forward, hands open around a red ball in front of the chest.
9. Front view: sitting cross-legged on the floor, holding a red ball with both hands and passing it to the side, toward the viewer's right, looking that way.
10. Front view: standing, the right foot's sole resting lightly on top of a red ball on the floor in front, arms slightly out for balance.
11. Front view: the same, but now the LEFT foot's sole on top of the red ball, the right foot on the floor.
12. Side view: standing, one hand holding the string of a red balloon that floats at knee height in front, ready to kick.
13. Side view: holding the balloon's string, kicking the balloon with the top of the foot, the kicking leg swung forward.
14. Front view: standing on one leg, the other knee raised, a red balloon just above the raised foot, arms out to the sides for balance.
15. Front view: standing on both feet, looking up at a red balloon floating above, arms slightly out, ready.
16. Side view: walking, gently pushing a small red ball forward with the inside of the foot, a gold hoop lying flat on the floor ahead.
```

### صفحهٔ 1، پسر

```
Pose sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image as the exact character reference: draw THIS same boy, keep everything identical, only change the pose.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, warm and joyful. Color palette only: turquoise #16a39a, lapis blue #22327a, saffron gold #f3a530, pomegranate red #d6404c, cream #fbf1dc, dark plum #2b2140, plus natural skin tones.

CHARACTER: a 7-year-old Iranian boy, round cheerful face, warm light-brown skin, short dark brown hair with a small tuft on top, dark brown eyes, rosy cheeks. He wears a saffron zip-up sports jacket with a turquoise stripe on the sleeves, lapis blue sports trousers, and red sneakers with white soles. Child proportions: the head is about one quarter of the body height.

LAYOUT: one square, very high-resolution image, a clean invisible 4x4 grid = exactly 16 occupied cells, read left to right, top to bottom. Exactly ONE full-body child per cell, centred, the same size in every cell, with wide empty white margin around each pose; no pose touches, overlaps or crosses into another cell. Feet (or the body part on the floor) rest on the same invisible floor line within each row.

STRICT RULES:
- The SAME child in every cell: identical face, hair, clothes, colours and proportions as the attached reference.
- Correct anatomy in every cell: exactly two arms, two legs, two hands with five fingers each, two feet; no extra or missing limbs, no twisted joints.
- Draw each pose exactly as described, nothing added. "Front view" = the child faces the viewer. "Side view" = the child faces to the RIGHT of the image.
- Only the props named in a cell; no furniture, floor, mats or scenery unless named. A ball is a plain round ball with no pattern or text.
- Background pure flat white (#FFFFFF); only a small soft oval shadow under each pose.
- NO text, letters, numbers, arrows, motion lines, grid lines, frames, labels, captions, logo or watermark anywhere.

POSES, cell by cell:
1. Side view: two-hand overhead throw, ready — standing, one foot forward, both hands holding a red ball behind the head, elbows bent.
2. Side view: two-hand overhead throw, release — both arms stretched forward and up, the red ball just leaving the hands in front of the face.
3. Side view: one-hand overarm throw, wind-up — the throwing arm bent back high behind the head holding a small red ball, the other arm pointing forward, front foot forward.
4. Side view: one-hand overarm throw, release — the throwing arm swung forward and straight, the small red ball just leaving the hand, body leaning forward.
5. Front view: tossing a ball up — both arms raised straight up, hands open, a red ball a little above the hands, looking up.
6. Front view: clapping — hands clapped together in front of the chest, looking up at a red ball floating above the head.
7. Front view: catching — both hands cupped together in front of the chest holding a red ball, happy face.
8. Front view: catching a bouncing ball at chest height — knees slightly bent, both arms forward, hands open around a red ball in front of the chest.
9. Front view: sitting cross-legged on the floor, holding a red ball with both hands and passing it to the side, toward the viewer's right, looking that way.
10. Front view: standing, the right foot's sole resting lightly on top of a red ball on the floor in front, arms slightly out for balance.
11. Front view: the same, but now the LEFT foot's sole on top of the red ball, the right foot on the floor.
12. Side view: standing, one hand holding the string of a red balloon that floats at knee height in front, ready to kick.
13. Side view: holding the balloon's string, kicking the balloon with the top of the foot, the kicking leg swung forward.
14. Front view: standing on one leg, the other knee raised, a red balloon just above the raised foot, arms out to the sides for balance.
15. Front view: standing on both feet, looking up at a red balloon floating above, arms slightly out, ready.
16. Side view: walking, gently pushing a small red ball forward with the inside of the foot, a gold hoop lying flat on the floor ahead.
```

---

## صفحهٔ 2 (16 ژست)

| خانه | کد | حالت |
|---|---|---|
| 1 | `m10-kick-a` | شوتِ رویِ پا، عقب بردنِ پا |
| 2 | `m10-kick-b` | شوتِ رویِ پا، ضربه |
| 3 | `m11-march-a` | درجا زدن، زانوی چپ بالا |
| 4 | `m11-march-b` | درجا زدن، زانوی راست بالا |
| 5 | `m11-step-a` | بالا رفتن از پله: یک پا روی پله |
| 6 | `m11-step-b` | بالا رفتن از پله: هر دو پا روی پله |
| 7 | `m11-step-c` | پایین آمدن از پله |
| 8 | `m11-in` | پرشِ باز و بسته: پاها جمع |
| 9 | `m11-out` | پرشِ باز و بسته: پاها باز |
| 10 | `m11-carry` | دویدن با یک عروسک در دست |
| 11 | `m11-drop` | خم شدن و انداختنِ شیء در سبد |
| 12 | `m12-toss` | زانو زده، بالا انداختنِ سنگ‌ریزه |
| 13 | `m12-catch` | زانو زده، گرفتنِ سنگ‌ریزه |
| 14 | `m12-back-a` | سنگ‌ریزه‌ها روی پشتِ دست |
| 15 | `m12-back-b` | برگرداندن و گرفتنِ سنگ‌ریزه‌ها |
| 16 | `m12-fists` | گل یا پوچ: دو مشتِ بسته جلو |

### صفحهٔ 2، دختر

```
Pose sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image as the exact character reference: draw THIS same girl, keep everything identical, only change the pose.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, warm and joyful. Color palette only: turquoise #16a39a, lapis blue #22327a, saffron gold #f3a530, pomegranate red #d6404c, cream #fbf1dc, dark plum #2b2140, plus natural skin tones.

CHARACTER: a 7-year-old Iranian girl, round cheerful face, warm light-brown skin, dark brown eyes, rosy cheeks. She wears a turquoise children's sports hijab hood (a soft one-piece hood that covers the hair and neck, framing the face), a turquoise zip-up sports jacket with a saffron stripe on the sleeves, lapis blue sports trousers, and red sneakers with white soles. Child proportions: the head is about one quarter of the body height.

LAYOUT: one square, very high-resolution image, a clean invisible 4x4 grid = exactly 16 occupied cells, read left to right, top to bottom. Exactly ONE full-body child per cell, centred, the same size in every cell, with wide empty white margin around each pose; no pose touches, overlaps or crosses into another cell. Feet (or the body part on the floor) rest on the same invisible floor line within each row.

STRICT RULES:
- The SAME child in every cell: identical face, hood/clothes, colours and proportions as the attached reference.
- Correct anatomy in every cell: exactly two arms, two legs, two hands with five fingers each, two feet; no extra or missing limbs, no twisted joints.
- Draw each pose exactly as described, nothing added. "Front view" = the child faces the viewer. "Side view" = the child faces to the RIGHT of the image.
- Only the props named in a cell; no furniture, floor, mats or scenery unless named. A ball is a plain round ball with no pattern or text.
- Background pure flat white (#FFFFFF); only a small soft oval shadow under each pose.
- NO text, letters, numbers, arrows, motion lines, grid lines, frames, labels, captions, logo or watermark anywhere.

POSES, cell by cell:
1. Side view: instep kick, back-swing — the kicking leg swung back, a red ball on the floor in front, arms out.
2. Side view: instep kick, contact — the kicking leg swung forward, the top of the foot touching the red ball, arms out for balance.
3. Front view: marching in place, the left knee lifted high, the opposite arm swinging forward, smiling.
4. Front view: marching in place, the right knee lifted high, the opposite arm swinging forward.
5. Side view: stepping up — one foot on top of a low wooden step box, the other on the floor, arms swinging.
6. Side view: standing tall with both feet on top of the low wooden step box, arms at the sides.
7. Side view: stepping down backward — one foot back on the floor, the other still on the low wooden step box.
8. Front view: in-out jump, feet together — standing on tiptoe, feet together, arms at the sides, slightly in the air.
9. Front view: in-out jump, feet apart — landing with feet wide apart, arms raised out to the sides, happy.
10. Side view: running, holding a small soft toy doll in one hand, the other arm swinging.
11. Side view: bending forward at the hips, dropping a small red ball into a woven basket on the floor.
12. Front view: kneeling on the floor, one hand tossing a small grey pebble a little up in the air, four pebbles on the floor in front, looking up at it.
13. Front view: kneeling, the hand closing to catch the falling pebble, four pebbles on the floor in front.
14. Front view: kneeling, holding one hand flat palm-down in front, three small pebbles balanced on the back of the hand, concentrating.
15. Front view: kneeling, the same hand flipped palm-up catching three small pebbles in the air above it.
16. Front view: kneeling, both closed fists held out in front, a playful secret smile.
```

### صفحهٔ 2، پسر

```
Pose sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image as the exact character reference: draw THIS same boy, keep everything identical, only change the pose.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, warm and joyful. Color palette only: turquoise #16a39a, lapis blue #22327a, saffron gold #f3a530, pomegranate red #d6404c, cream #fbf1dc, dark plum #2b2140, plus natural skin tones.

CHARACTER: a 7-year-old Iranian boy, round cheerful face, warm light-brown skin, short dark brown hair with a small tuft on top, dark brown eyes, rosy cheeks. He wears a saffron zip-up sports jacket with a turquoise stripe on the sleeves, lapis blue sports trousers, and red sneakers with white soles. Child proportions: the head is about one quarter of the body height.

LAYOUT: one square, very high-resolution image, a clean invisible 4x4 grid = exactly 16 occupied cells, read left to right, top to bottom. Exactly ONE full-body child per cell, centred, the same size in every cell, with wide empty white margin around each pose; no pose touches, overlaps or crosses into another cell. Feet (or the body part on the floor) rest on the same invisible floor line within each row.

STRICT RULES:
- The SAME child in every cell: identical face, hair, clothes, colours and proportions as the attached reference.
- Correct anatomy in every cell: exactly two arms, two legs, two hands with five fingers each, two feet; no extra or missing limbs, no twisted joints.
- Draw each pose exactly as described, nothing added. "Front view" = the child faces the viewer. "Side view" = the child faces to the RIGHT of the image.
- Only the props named in a cell; no furniture, floor, mats or scenery unless named. A ball is a plain round ball with no pattern or text.
- Background pure flat white (#FFFFFF); only a small soft oval shadow under each pose.
- NO text, letters, numbers, arrows, motion lines, grid lines, frames, labels, captions, logo or watermark anywhere.

POSES, cell by cell:
1. Side view: instep kick, back-swing — the kicking leg swung back, a red ball on the floor in front, arms out.
2. Side view: instep kick, contact — the kicking leg swung forward, the top of the foot touching the red ball, arms out for balance.
3. Front view: marching in place, the left knee lifted high, the opposite arm swinging forward, smiling.
4. Front view: marching in place, the right knee lifted high, the opposite arm swinging forward.
5. Side view: stepping up — one foot on top of a low wooden step box, the other on the floor, arms swinging.
6. Side view: standing tall with both feet on top of the low wooden step box, arms at the sides.
7. Side view: stepping down backward — one foot back on the floor, the other still on the low wooden step box.
8. Front view: in-out jump, feet together — standing on tiptoe, feet together, arms at the sides, slightly in the air.
9. Front view: in-out jump, feet apart — landing with feet wide apart, arms raised out to the sides, happy.
10. Side view: running, holding a small soft toy doll in one hand, the other arm swinging.
11. Side view: bending forward at the hips, dropping a small red ball into a woven basket on the floor.
12. Front view: kneeling on the floor, one hand tossing a small grey pebble a little up in the air, four pebbles on the floor in front, looking up at it.
13. Front view: kneeling, the hand closing to catch the falling pebble, four pebbles on the floor in front.
14. Front view: kneeling, holding one hand flat palm-down in front, three small pebbles balanced on the back of the hand, concentrating.
15. Front view: kneeling, the same hand flipped palm-up catching three small pebbles in the air above it.
16. Front view: kneeling, both closed fists held out in front, a playful secret smile.
```

---

## صفحهٔ 3 (13 ژست)

| خانه | کد | حالت |
|---|---|---|
| 1 | `m12-think` | فکر کردن: انگشت روی چانه |
| 2 | `m12-hide` | سر پایین، دست روی چشم‌ها |
| 3 | `m12-pat` | زانو زده، یک دستِ بالا |
| 4 | `m12-cheer` | شادی، دست‌ها باز |
| 5 | `m10-lie-a` | نیمه‌دراز، پاها بالا |
| 6 | `m10-lie-b` | نیمه‌دراز، ضربه با پا به بادکنک |
| 7 | `m11-tap` | ضربه به بادکنک با یک دست |
| 8 | `m11-basket` | پرش با سبدی بسته به کمر |
| 9 | `m12-slap-a` | دست‌بازی: دست‌ها روی هم |
| 10 | `m12-slap-b` | دست‌بازی: کشیدنِ دست‌ها |
| 11 | `m9-roll` | نشسته، غلتاندنِ توپ روی زمین |
| 12 | `m9-throw-low` | پرتابِ زیرِ دست به سبد |
| 13 | `m12-sit` | نشسته چهارزانو، دست‌ها روی زانو |

### صفحهٔ 3، دختر

```
Pose sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image as the exact character reference: draw THIS same girl, keep everything identical, only change the pose.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, warm and joyful. Color palette only: turquoise #16a39a, lapis blue #22327a, saffron gold #f3a530, pomegranate red #d6404c, cream #fbf1dc, dark plum #2b2140, plus natural skin tones.

CHARACTER: a 7-year-old Iranian girl, round cheerful face, warm light-brown skin, dark brown eyes, rosy cheeks. She wears a turquoise children's sports hijab hood (a soft one-piece hood that covers the hair and neck, framing the face), a turquoise zip-up sports jacket with a saffron stripe on the sleeves, lapis blue sports trousers, and red sneakers with white soles. Child proportions: the head is about one quarter of the body height.

LAYOUT: one square, very high-resolution image, a clean invisible 4x4 grid = exactly 13 occupied cells, read left to right, top to bottom, the last 3 cells stay completely empty white. Exactly ONE full-body child per cell, centred, the same size in every cell, with wide empty white margin around each pose; no pose touches, overlaps or crosses into another cell. Feet (or the body part on the floor) rest on the same invisible floor line within each row.

STRICT RULES:
- The SAME child in every cell: identical face, hood/clothes, colours and proportions as the attached reference.
- Correct anatomy in every cell: exactly two arms, two legs, two hands with five fingers each, two feet; no extra or missing limbs, no twisted joints.
- Draw each pose exactly as described, nothing added. "Front view" = the child faces the viewer. "Side view" = the child faces to the RIGHT of the image.
- Only the props named in a cell; no furniture, floor, mats or scenery unless named. A ball is a plain round ball with no pattern or text.
- Background pure flat white (#FFFFFF); only a small soft oval shadow under each pose.
- NO text, letters, numbers, arrows, motion lines, grid lines, frames, labels, captions, logo or watermark anywhere.

POSES, cell by cell:
1. Front view: kneeling, one finger on the chin, eyes looking up, thinking.
2. Side view: child's pose — kneeling, sitting back on the heels, forehead close to the floor, both hands covering the eyes.
3. Front view: kneeling upright, one hand raised high in the air, the other hand on the knee, excited face.
4. Front view: standing with both arms wide open, a big happy smile.
5. Side view: half lying on the back, leaning on both elbows, both legs lifted up together in the air.
6. Side view: half lying on the elbows, one leg kicking a red balloon floating above, the other leg up.
7. Front view: standing, one hand reaching up tapping a red balloon above the head, looking up.
8. Front view: jumping with both feet off the ground, a small woven basket tied at the waist with a cord, arms up, laughing.
9. Side view: kneeling, both hands held out flat in front, palms down, as if stacked on a partner's hands (no partner drawn).
10. Side view: kneeling, both hands pulled quickly back toward the chest, a playful surprised face.
11. Side view: sitting with legs apart, rolling a red ball forward along the floor with both hands.
12. Side view: underhand throw — one arm swinging forward low, a small red ball leaving the hand toward a woven basket on the floor ahead.
13. Front view: sitting cross-legged on the floor, hands resting on the knees, listening and smiling.
```

### صفحهٔ 3، پسر

```
Pose sheet for a children's mobile game made in Iran, for 6–7 year old kids. Use the attached image as the exact character reference: draw THIS same boy, keep everything identical, only change the pose.

STYLE: flat 2D vector illustration with soft cel shading, thick clean outline in dark plum (#2b2140), rounded friendly shapes, big expressive eyes, warm and joyful. Color palette only: turquoise #16a39a, lapis blue #22327a, saffron gold #f3a530, pomegranate red #d6404c, cream #fbf1dc, dark plum #2b2140, plus natural skin tones.

CHARACTER: a 7-year-old Iranian boy, round cheerful face, warm light-brown skin, short dark brown hair with a small tuft on top, dark brown eyes, rosy cheeks. He wears a saffron zip-up sports jacket with a turquoise stripe on the sleeves, lapis blue sports trousers, and red sneakers with white soles. Child proportions: the head is about one quarter of the body height.

LAYOUT: one square, very high-resolution image, a clean invisible 4x4 grid = exactly 13 occupied cells, read left to right, top to bottom, the last 3 cells stay completely empty white. Exactly ONE full-body child per cell, centred, the same size in every cell, with wide empty white margin around each pose; no pose touches, overlaps or crosses into another cell. Feet (or the body part on the floor) rest on the same invisible floor line within each row.

STRICT RULES:
- The SAME child in every cell: identical face, hair, clothes, colours and proportions as the attached reference.
- Correct anatomy in every cell: exactly two arms, two legs, two hands with five fingers each, two feet; no extra or missing limbs, no twisted joints.
- Draw each pose exactly as described, nothing added. "Front view" = the child faces the viewer. "Side view" = the child faces to the RIGHT of the image.
- Only the props named in a cell; no furniture, floor, mats or scenery unless named. A ball is a plain round ball with no pattern or text.
- Background pure flat white (#FFFFFF); only a small soft oval shadow under each pose.
- NO text, letters, numbers, arrows, motion lines, grid lines, frames, labels, captions, logo or watermark anywhere.

POSES, cell by cell:
1. Front view: kneeling, one finger on the chin, eyes looking up, thinking.
2. Side view: child's pose — kneeling, sitting back on the heels, forehead close to the floor, both hands covering the eyes.
3. Front view: kneeling upright, one hand raised high in the air, the other hand on the knee, excited face.
4. Front view: standing with both arms wide open, a big happy smile.
5. Side view: half lying on the back, leaning on both elbows, both legs lifted up together in the air.
6. Side view: half lying on the elbows, one leg kicking a red balloon floating above, the other leg up.
7. Front view: standing, one hand reaching up tapping a red balloon above the head, looking up.
8. Front view: jumping with both feet off the ground, a small woven basket tied at the waist with a cord, arms up, laughing.
9. Side view: kneeling, both hands held out flat in front, palms down, as if stacked on a partner's hands (no partner drawn).
10. Side view: kneeling, both hands pulled quickly back toward the chest, a playful surprised face.
11. Side view: sitting with legs apart, rolling a red ball forward along the floor with both hands.
12. Side view: underhand throw — one arm swinging forward low, a small red ball leaving the hand toward a woven basket on the floor ahead.
13. Front view: sitting cross-legged on the floor, hands resting on the knees, listening and smiling.
```
