# برگه‌های اشیا: فهرست و پرامپت

این‌ها همهٔ اشیایی‌اند که بازی الان خودش با کد می‌کشد و کیفیتشان پایین است. سه برگه است، هر برگه ۱۲ شیء در یک جدولِ ۴ ستون در ۳ ردیف.

**یک بار بسازید و تصویر را بفرستید.** من هر خانه را جدا می‌برم، پس‌زمینه را برمی‌دارم و جای شکل‌های فعلی می‌گذارم.

نکته‌ها، برای اینکه بریدن تمیز شود:
- تصویر مربعی باشد، و هر شیء کاملاً داخلِ خانهٔ خودش و با فاصله از لبه‌ها.
- پس‌زمینه سفیدِ یکدست، بدونِ خطِ جدول، بدونِ نوشته و بدونِ سایه‌ای که به خانهٔ کناری برسد.
- برای اشیای چندرنگ (کیسه، لیوان، دایره) فقط یک رنگ کافی است؛ رنگ‌های دیگر را خودم می‌سازم.

---

## برگهٔ ۱: بازی‌های تعادل و بادکنک

**ساخته و جاگذاری شد.** فایل‌ها در `prototype/img/obj/` هستند. کیسه، لیوان، دایره و بادکنک هر کدام چهار رنگِ دیگر هم دارند (زرد، سبز، آبی، بنفش) که از رویِ نسخهٔ قرمز ساخته شده‌اند؛ کوسن چهار نقشِ رنگیِ دیگر دارد. جاهایی که الان استفاده می‌شوند:
- منزلِ ۵ با دوربین: کیسه، سبد، دایرهٔ زمین، لیوان.
- بازی‌های بادکنک: بادکنکِ روی تصویرِ دوربین (لحظهٔ ضربه همان بادکنکِ پهن‌شده) و بادکنکِ روی کارتونِ راهنما.
- شمارندهٔ بازی‌های لیوان و کوسن.
- دستمال‌بازی: فرشِ وسطِ حلقه و دستمال.

چوب، کتاب و توپ آماده‌اند ولی هنوز جایی ندارند: چوب و کتاب داخلِ خودِ نقاشی‌های بچه کشیده شده‌اند، و بازیِ توپ (خوانِ پرتاب) هنوز ساخته نشده.

| # | شیء | کجای بازی |
|---|---|---|
| 1 | کیسهٔ شنِ پارچه‌ای کوچک، قرمز | منزلِ ۵: با پا بردار، توی سبد بگذار |
| 2 | سبدِ حصیریِ خالی، از روبه‌رو، کمی از بالا | همان بازی |
| 3 | دایرهٔ رنگیِ تخت روی زمین، قرمز، با پرسپکتیو (بیضی) | منزلِ ۵: با نوکِ پا لمس کن |
| 4 | لیوانِ پلاستیکیِ بی‌دسته، قرمز، از پهلو | منزلِ ۵ و منزلِ ۴: روی‌هم چیدن |
| 5 | بادکنکِ قرمز با نخ | بازی‌های بادکنک |
| 6 | همان بادکنک در حالِ ضربه خوردن: کمی پهن‌شده، با چند خطِ کوچکِ حرکت | لحظهٔ ضربه |
| 7 | کوسن یا بالشِ مربعیِ رنگی | منزلِ ۴: چیدن با پا |
| 8 | چوبِ سبکِ چوبی (مثلِ دستهٔ جارو)، افقی | منزلِ ۲ |
| 9 | کتابِ کوچکِ بسته | منزلِ ۲: کتاب روی سر |
| 10 | دستمال‌کاغذیِ سفیدِ تاشده روی زمین | دستمال‌بازی |
| 11 | فرشِ گردِ کوچک از بالا | وسطِ حلقهٔ دستمال‌بازی |
| 12 | توپِ پلاستیکیِ کوچکِ رنگی | بازیِ اوستا |

**پرامپت:**
```
A single square image, pure white background, a clean 4-column by 3-row grid of 12 separate objects, each object centered in its own cell with generous empty margin, no grid lines, no text, no labels. Cute children's-game cartoon style matching friendly Iranian kids' illustrations: flat bright colors, soft simple shading, bold dark-purple outline (#2b2140), rounded shapes. Objects, left to right, top to bottom:
1 a small red cloth bean bag (sandbag), 2 an empty woven wicker basket seen from the front slightly above, 3 a flat red circle sticker lying on the floor shown in perspective as an ellipse, 4 a red plastic cup without handle seen from the side, 5 a red party balloon with a curly string, 6 the same red balloon squashed slightly as if just hit, with three small motion lines, 7 a soft square cushion (teal with a yellow pattern), 8 a light wooden stick like a broom handle lying horizontally, 9 a small closed hardcover book, 10 a folded white paper tissue lying flat, 11 a small round patterned rug seen from above, 12 a small colorful plastic ball.
```

---

## برگهٔ ۲: صندلی‌بازی، بازیِ پا و جایزه‌ها

**ساخته و جاگذاری شد.** جاهایی که الان استفاده می‌شوند:
- مشعل‌ها: نوارِ بالای نقشه، صفحهٔ جایزه و پایانِ بازی (خاموش کم‌رنگ، روشن با شعله).
- ستاره: همهٔ ستاره‌های جمع‌کردنی و آیکونِ ستاره؛ ستارهٔ نگرفته کم‌رنگ است.
- صندوقِ گنج: آیکونِ «گنجینه» در نوارِ پایین.
- مدال: پیغامِ رکوردِ تازه در بازی‌های متفرقه.
- سطلِ بازیافت: کارتِ «زباله را در سطل انداختم».
- صندلی و صندلیِ ستاره‌دار: ردیفِ صندلی‌ها در صندلی‌بازی.
- عروسک، جوراب، توپِ پارچه‌ای (و یک کوسن): ردیفِ وسایل در بازیِ «بالای سر با پا».

بطریِ آب آماده است ولی کارتِ «آب خوردم» همان یوزیِ در حالِ آب خوردن را نشان می‌دهد که گویاتر است.

| # | شیء | کجای بازی |
|---|---|---|
| 1 | صندلیِ چوبیِ سادهٔ بچه، از پهلو | صندلی‌بازی |
| 2 | همان صندلی با یک ستارهٔ طلایی روی پشتی | صندلیِ علامت‌دار |
| 3 | عروسکِ پارچه‌ایِ کوچک | بازیِ «بالای سر با پا» |
| 4 | جورابِ گلوله‌شده | همان بازی |
| 5 | توپِ پارچه‌ای | همان بازی |
| 6 | مشعلِ خاموش (چوب و کاسهٔ فلزی، بی‌شعله) | مشعل‌های روزانه |
| 7 | همان مشعل، روشن با شعلهٔ زیبا | مشعلِ روشن |
| 8 | ستارهٔ طلاییِ براق | ستاره‌ها |
| 9 | صندوقِ گنجِ باز با سکه و ستاره | گنجینه |
| 10 | مدالِ طلا با روبان | رکوردِ تازه |
| 11 | سطلِ زبالهٔ کوچک با نشانِ بازیافت | کارتِ «زباله را در سطل انداختم» |
| 12 | بطریِ آبِ بچه‌گانه | کارتِ «آب خوردم» |

**پرامپت:**
```
A single square image, pure white background, a clean 4-column by 3-row grid of 12 separate objects, each centered in its own cell with generous empty margin, no grid lines, no text. Same cute children's-game cartoon style: flat bright colors, soft simple shading, bold dark-purple outline (#2b2140). Objects:
1 a simple small wooden child's chair seen from the side, 2 the same chair with a shiny golden star painted on its backrest, 3 a small soft rag doll, 4 a rolled-up sock ball, 5 a soft fabric ball, 6 an unlit torch (wooden handle with a metal bowl, no flame), 7 the same torch lit with a lively friendly flame, 8 a shiny golden five-pointed star, 9 an open treasure chest with gold coins and little stars, 10 a gold medal on a blue ribbon, 11 a small trash bin with a green recycling symbol, 12 a child's water bottle.
```

---

## برگهٔ ۳: کارت‌های رفتار و نقشه

| # | شیء | کجای بازی |
|---|---|---|
| 1 | دو بچه در صف، پشتِ سرِ هم، منتظرِ سرسره | کارتِ «نوبت را رعایت کردم» |
| 2 | یک بچه دستِ دوستِ زمین‌خورده‌اش را می‌گیرد | کارتِ «به دوستم کمک کردم» |
| 3 | درخت و خورشید و توپ روی چمن | کارتِ «در هوای آزاد بازی کردم» |
| 4 | جعبهٔ اسباب‌بازیِ مرتب با چند اسباب‌بازی | کارتِ «وسایل بازی را جمع کردم» |
| 5 | درختِ گردِ سرسبز | تزئینِ نقشه |
| 6 | ابرِ سفیدِ پف‌دار | تزئینِ نقشه |
| 7 | کوهِ کوچک با نوکِ برفی | تزئینِ نقشه |
| 8 | بوتهٔ گلِ رنگی | تزئینِ نقشه |
| 9 | خورشیدِ خندان | تزئینِ نقشه |
| 10 | تابلوی چوبیِ کوچکِ راهنما (خالی، بی‌نوشته) | سرِ هر خوان روی نقشه |
| 11 | پلِ چوبیِ کوچک | خوانِ پلِ لرزان |
| 12 | قفلِ طلاییِ بسته | خوان‌های قفل |

**پرامپت:**
```
A single square image, pure white background, a clean 4-column by 3-row grid of 12 separate small illustrations, each centered in its own cell with generous empty margin, no grid lines, no text anywhere. Same cute children's-game cartoon style: flat bright colors, soft simple shading, bold dark-purple outline (#2b2140). Items:
1 two small children standing one behind the other in a queue waiting for a slide, 2 a child helping a friend who fell get up by holding hands, 3 a small tree, a smiling sun and a ball on grass, 4 a tidy toy box with a few toys neatly inside, 5 a round leafy green tree, 6 a fluffy white cloud, 7 a small mountain with a snowy peak, 8 a colorful flower bush, 9 a smiling sun, 10 a small blank wooden signpost (no writing), 11 a small wooden footbridge, 12 a closed golden padlock.
```

برای بچه‌های کارت‌های ۱ و ۲ در برگهٔ ۳، اگر بخواهید با شخصیت‌های خودِ بازی یکی باشند، همان دختر و پسرِ بازی را در پرامپت توصیف کنید: دختر با روسریِ فیروزه‌ای و گرمکنِ فیروزه‌ای، پسر با گرمکنِ زرد.

---

## برگهٔ ۴: بازی‌های متفرقه (ماشینِ تپه و دیوارِ شکل)

**ساخته و جاگذاری شد.** تکه‌ها بر اساسِ شکل بریده شدند، نه خطوطِ جدول، چون جیپ از خانهٔ خودش بیرون زده بود. سوراخ‌های سفیدِ داخلی (شیشه‌های جیپ، دستهٔ دبه و دسته‌های جام) شفاف شدند.
- **تپه‌نوردی:** جیپ از روی جای چرخ‌هایش اندازه گرفته شد تا قوس‌ها دقیقاً روی چرخ‌های بازی بنشینند؛ چرخ‌ها جدا می‌چرخند و یوزی پشتِ در می‌نشیند. سکه، دبهٔ بنزین، پرچمِ هر ۵۰ متر (عدد روی پارچه‌اش)، درخت و کاجِ تپه‌های پشت، و گاهی سنگ روی چمن.
- **دیوارِ شکل‌ها:** از آجرهای همین برگه یک کاشیِ بی‌درز ساخته شد (`brick-tile.webp`) و دیوار با آن پر می‌شود. اسمِ حالت روی روبانِ همین برگه می‌آید.
- **بالای صفحه:** قلب‌ها، سکه، دبه و جام به‌جای شکلک‌ها.
- **آیکون‌ها:** کارت‌های دو بازی در صفحهٔ میدان از همین اشیا ساخته شدند (جیپ روی تپه، دیوار با سوراخِ ستاره‌ای و بچه پشتش)، و آیکونِ «میدان» در نوارِ پایین جام است.

این دو بازی الان کاملاً با کد کشیده می‌شوند و قابلِ‌قبول‌اند؛ اگر این برگه را بسازید، جای شکل‌های کدی می‌نشیند و یک‌دست‌تر می‌شود. ماشین را **از پهلو، رو به راست** و **بی‌چرخ** بخواهید، چون چرخ‌ها جدا می‌چرخند.

| # | شیء | کجای بازی |
|---|---|---|
| 1 | بدنهٔ جیپِ کوچکِ قرمز، از پهلو رو به راست، بی‌چرخ، بی‌راننده، با میله‌های محافظ | ماشینِ تپه |
| 2 | چرخِ ماشین از روبه‌رو (دایرهٔ کامل) با رینگِ ساده | همان |
| 3 | سکهٔ طلاییِ براق با ستاره در وسط | سکه‌ها |
| 4 | گالنِ بنزینِ قرمز (جری‌کن) | سوخت |
| 5 | پرچمِ کوچکِ آبی روی میله، بی‌نوشته | نشانِ هر ۵۰ متر |
| 6 | درختِ گردِ سرسبز کوچک | تپه‌های پشت |
| 7 | درختِ کاجِ کوچک | تپه‌های پشت |
| 8 | سنگِ کوچکِ خاکستری | خاکِ جاده |
| 9 | یک تکه دیوارِ آجریِ صاف، فقط آجر (بافتِ مربعی که بشود تکرارش کرد) | دیوارِ شکل |
| 10 | روبانِ قرمزِ پهن و خالی (بنر)، بی‌نوشته | اسمِ هر حالت |
| 11 | قلبِ قرمزِ براق | جان‌ها |
| 12 | جامِ طلاییِ کوچک | رکورد |

**پرامپت:**
```
A single square image, pure white background, a clean 4-column by 3-row grid of 12 separate objects, each centered in its own cell with generous empty margin, no grid lines, no text, no labels. Bright mobile-game cartoon style like Hill Climb Racing: saturated colors, soft gradient shading with a small white shine, bold dark-purple outline (#2b2140), rounded shapes. Objects:
1 the body of a small red off-road jeep seen exactly from the side facing right, WITHOUT wheels and without a driver, open top with a dark roll cage and a small windshield, 2 a single car wheel seen straight from the side (perfect circle) with a dark knobby tire and a simple grey rim, 3 a shiny gold coin with an embossed star in the middle, 4 a red metal fuel jerrycan, 5 a small blue pennant flag on a thin pole, blank, 6 a small round leafy green tree, 7 a small green pine tree, 8 a small grey rock, 9 a flat square patch of red-orange brick wall texture, front view, bricks only, 10 a wide blank red ribbon banner with folded ends, no text, 11 a shiny red heart, 12 a small golden trophy cup.
```

---

## برگهٔ ۶: خوراکی‌ها و وسایلِ خانه (درس ۶)

برای دو بازیِ لمسیِ درس ۶ که الان شکلک (ایموجی) دارند. صحنه‌های «بازیِ پرخطر» را خودم از همین اشیا و ژست‌های قهرمان می‌سازم (مثلاً بچهٔ در حالِ دویدن + چوب، توپ + ساعت).

| # | شیء | کجای بازی |
|---|---|---|
| 1 | ساندویچ | خوراکیِ مفید |
| 2 | لیوانِ شیر | خوراکیِ مفید |
| 3 | کاسهٔ کوچکِ گردو و بادام | خوراکیِ مفید |
| 4 | سیب و موز و پرتقال کنارِ هم | خوراکیِ مفید |
| 5 | قوطیِ نوشابه، بی‌مارک | خوراکیِ کم‌فایده |
| 6 | شکلاتِ تخته‌ای، بی‌مارک | خوراکیِ کم‌فایده |
| 7 | پاکتِ چیپس، بی‌مارک | خوراکیِ کم‌فایده |
| 8 | آب‌نبات‌های رنگی | خوراکیِ کم‌فایده |
| 9 | یک برشِ پیتزا | خوراکیِ کم‌فایده |
| 10 | ساعتِ دیواریِ گرد | صحنهٔ توپ‌بازی کنارِ ساعت |
| 11 | گلدانِ گیاهِ سبز | صحنهٔ توپ‌بازی کنارِ گلدان |
| 12 | جعبهٔ اسباب‌بازیِ باز با چند توپِ رنگی | صحنهٔ جمع کردنِ وسایل |

**پرامپت:**
```
A single square image, pure white background, a clean invisible 4-column by 3-row grid = exactly 12 separate objects, each object centered in its own cell with generous empty white margin, nothing touching or crossing into another cell. Cute children's-game cartoon style: flat bright colors, soft simple shading, bold dark-purple outline (#2b2140), rounded friendly shapes. Every object is a plain generic object: NO brand names, NO logos, NO letters, NO numbers, NO text anywhere, NO grid lines, NO labels, NO faces on the food. Only a tiny soft shadow under each object, inside its own cell.
Objects, left to right, top to bottom:
1 a simple sandwich of bread with lettuce, cheese and tomato,
2 a clear glass full of white milk,
3 a small wooden bowl of walnuts and almonds,
4 a red apple, a yellow banana and an orange side by side,
5 a plain red soda can with no writing,
6 a chocolate bar half unwrapped, plain wrapper with no writing,
7 a plain yellow bag of potato chips with no writing, a few chips beside it,
8 three colorful wrapped hard candies,
9 one triangle slice of pizza,
10 a round wall clock with a white face and simple hands, no numbers,
11 a green leafy plant in a terracotta pot,
12 an open wooden toy box with three colorful balls inside.
```

---

## برگهٔ ۷: کارت‌های رفتارِ درس ۶ و وسایلِ درس‌های ۹ تا ۱۲

| # | شیء | کجای بازی |
|---|---|---|
| 1 | جاروبرقیِ کوچک | کارتِ «در کارهای خانه کمک کردم» |
| 2 | تختِ بچه با پتو و بالش | کارتِ «وقتی بیمار بودم، استراحت کردم» |
| 3 | کاسهٔ سوپِ گرم با قاشق | همان کارت |
| 4 | پله‌های کوتاه (چهار پله) | کارتِ «از پله رفتم» |
| 5 | پله‌برقی | همان کارت (خط‌خورده) |
| 6 | دوچرخهٔ کوچک با کلاه‌ایمنی | قصهٔ درس ۶ |
| 7 | دروازهٔ کوچکِ فوتبال با تور | بازی‌های پای درس ۱۰ |
| 8 | مخروطِ نارنجیِ تمرین | مسیرِ دویدنِ درس ۱۱ |
| 9 | دو بچه‌گربهٔ پشمالو کنارِ هم | قصهٔ «گربهٔ پشمالو»، درس ۱۱ |
| 10 | کنارِ رودخانه: آبِ آبی و چند سنگِ گرد | قصهٔ «یک قل دو قل»، درس ۱۲ |
| 11 | نیمکتِ پارک | قصهٔ درس ۶ |
| 12 | بلندگوی کوچک با نُت‌های موسیقی | دکمهٔ آهنگِ بازی‌های خانوادگی |

**پرامپت:**
```
A single square image, pure white background, a clean invisible 4-column by 3-row grid = exactly 12 separate objects, each object centered in its own cell with generous empty white margin, nothing touching or crossing into another cell. Cute children's-game cartoon style: flat bright colors, soft simple shading, bold dark-purple outline (#2b2140), rounded friendly shapes. NO people, NO text, NO letters, NO numbers, NO logos, NO grid lines, NO labels. Only a tiny soft shadow under each object, inside its own cell.
Objects, left to right, top to bottom:
1 a small cute upright vacuum cleaner,
2 a child's bed with a puffy blanket and a pillow, seen from the side,
3 a bowl of warm soup with a spoon and a little steam,
4 a short staircase of four steps seen from the side,
5 a short escalator seen from the side,
6 a small bicycle with a helmet hanging on the handlebar,
7 a small football goal with a white net,
8 an orange training cone,
9 two fluffy cute kittens sitting side by side, one grey and one ginger,
10 a small piece of riverbank: blue water on one side and a few round grey pebbles on sandy ground,
11 a wooden park bench,
12 a small round speaker with three musical notes floating above it.
```
