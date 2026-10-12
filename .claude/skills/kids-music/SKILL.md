---
name: kids-music
description: Compose or choose music for the Haftkhan children's movement game (ages 6–7) — happy, simple, singable, safe to use. Use when adding or changing any background tune, game music, jingle or fanfare in prototype/music.js, or when someone asks for "a famous song" in the game.
---

# Music for a 6–7-year-old's movement game

The game's music is generated in the browser by `prototype/music.js` (no audio files). A song is data: a melody, chords, a tempo and a groove. This skill says how to make one that children like and that we are allowed to use.

## 1. What makes it work for this age

From children's-music research summaries (see Sources) and the game's own needs:

| Rule | Value | Why |
|---|---|---|
| Key | **major** (C, G, D, F) | reads as happy and safe |
| Tempo | **105–135 BPM** for moving; up to ~200 for a gallop where the beat is felt in halves | 60–120 is typical for children's songs; exercise wants the top of that range |
| Beat | steady and predictable: march, bounce or gallop; claps on 2 and 4 | children move to a beat they can predict |
| Melody range | about **one octave** (C5–C6 or G4–G5), small steps, few leaps | a child can hum it back |
| Phrases | **2- and 4-bar** phrases, call-and-answer, the same motif repeated with a small change | repetition is how a tune becomes "theirs" |
| Form | A A′ B A (8 bars each at most); loopable with no gap | games loop music for unknown lengths |
| Rhythm | mostly quarters and eighths; a short "da-da-dum" motif helps | easy to step and clap to |
| Ending | land on the tonic (do) on a strong beat | a loop that "comes home" never feels cut off |
| Sound | bright lead (square + triangle, soft attack), plucky bass, light drums; no harsh distortion | toy-like, not arcade-aggressive |
| Loudness | normalise; no clipping (`tools/render_music.mjs` + check peak) | children's speakers are small and close |

Match the groove to what the body is doing:
- **walking / marching** (chairs, parade) → `march`, 100–115 BPM, strong left-right bass
- **jumping / bouncing** → `bounce`, 120–135 BPM, octave bass, claps on 2 and 4
- **running / racing / passing something round a circle** → `gallop`, the William Tell finale

## 2. "Can we use a famous song?"

Only if it is **public domain**. Check before writing a single note.

- ✅ Safe and famous: classical pieces whose composers died long ago — **Rossini's William Tell finale (1829, in the game as `galop`)**, Offenbach's Can-Can (1858), Beethoven's Ode to Joy, Mozart's Turkish March, Brahms' Hungarian Dance No. 5; old traditional nursery tunes (Twinkle Twinkle / "Ah vous dirai-je, maman", Frère Jacques, London Bridge).
- ⚠️ Check first: "Head, Shoulders, Knees and Toes" uses "There is a Tavern in the Town", whose 1883 copyright was renewed (Wikipedia); treat as not cleared.
- ❌ Never: Persian or international children's TV songs, film or cartoon theme songs, modern pop — even a short loop. They belong to their makers.

**Never write a famous melody from memory.** Take it note for note from a source you can read exactly — a MIDI file is best (`tools/` has a MIDI reader pattern in git history: parse note-on/off, divide ticks by the division to get beats). The William Tell theme here came from the MIDI on irish-folk-songs.com. If no exact source exists, compose an original instead.

## 3. Writing a song in music.js

```js
hop: { title:'پرشِ یوزی', bpm:126, key:'C', lead:'bright', groove:'bounce', beats:48,
  melody: parse(`E5:1 G5:1 A5:2 G5:2 E5:2  C5:1 D5:1 E5:2 D5:2 -:2 …`).notes,   // note:length in eighths, "-" = rest
  chords: bars(4, 'C G C G  F C G G  C G F C'.split(/\s+/)) }                   // one chord per 4-beat bar
```

- Lengths are in **eighth notes**; each 4/4 bar adds up to 8. `beats` must equal the melody's total.
- `chords` is `[beat, name]`; names come from the `CHORD` table (add a triad there if needed).
- Use `I – V – I`, `I – IV – V – I`, `vi` sparingly. Put V on the bar before the loop restarts so the loop pulls home.
- Pick `lead:'bright'` for jumping and racing, `'warm'` for walking.

Then:
1. `node tools/render_music.mjs OUT_DIR songname` → WAV of two passes; convert to mp3 with ffmpeg + `loudnorm`.
2. Check the peak is below full scale (no clipped samples).
3. **Send the file to the person to listen and approve.** Do not judge music quality with an AI model — a human listens.
4. Only then call it from a game: `HKMusic.play('hop', {ctx})` and `HKMusic.stop()` when the screen is left or the round ends. Respect the mute button.

## 4. Where each tune is used now

| Tune | Game | Why |
|---|---|---|
| `galop` (Rossini) | tissue game, khan 3 | passing round a circle fast |
| `march` | musical chairs, khan 1 | walking round the chairs |
| `hop` | "over the head with the feet", khan 2 | bouncy, on the floor |
| `theme` | background under the map and menus | quiet `stroll` groove, played at low volume; ducks while the narrator speaks; has its own on/off button (🎵) separate from the sound button |

Background music never plays during a story, an exercise or a game screen: there the child must hear the instructions. A game's own song (chairs, tissue, feet) is part of the game, so it plays even when background music is off — only the sound button silences it.

## Sources
- University of Sheffield commentary on what makes children's songs work (tempo 60–120 BPM, major key, narrow range, repetition), reported by [Staffordshire Live](https://www.staffordshire-live.co.uk/news/uk-world-news/beyonce-and-queen-children-songs-9463466)
- [There is a Tavern in the Town — Wikipedia](https://en.wikipedia.org/wiki/There_is_a_Tavern_in_the_Town) (copyright history)
- [William Tell Overture easy notes and MIDI — irish-folk-songs.com](https://www.irish-folk-songs.com/william-tell-overture-easy-sheet-music-notes-for-beginners.html)
