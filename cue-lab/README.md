# Cue Lab

A practice DJ controller for learning to mix, laid out like a standalone booth unit (inspired by the Denon DJ PRIME 4+). Two decks, a 2-channel mixer with FX, and a coach that teaches the core skills step by step.

Live app: https://claude.ai/artifact/BfKPfaChJD4oA7xYxpur12

## What's on it

- **Screen.** Both decks' waveforms are stacked so their beats line up by eye. Lows show red, mids green and highs blue. The beat grid is marked: bar lines, plus 8-bar phrase markers in amber. The screen also shows each deck's bar counter, 8-bar phrase lights, pitch, time left and BPM, plus a beat-alignment meter between the decks.
- **Decks.** Jog wheels: drag the centre to scratch in vinyl mode, drag the edge to nudge the tempo. Also on each deck:
  - PLAY, CUE (CDJ-style: set a cue while paused, hold to preview) and SYNC
  - a tempo fader (±8/16/50%, minus at the top like hardware)
  - 8 performance pads in three modes: hot cues, auto-loops (1/4 to 32 beats) and loop rolls
- **Mixer.** Each channel has TRIM, 3-band EQ (fully left kills the band) and a filter (left low-pass, right high-pass). Each channel also has a CUE button, a volume fader and a meter. The centre has a master level and a crossfader.
- **FX.** Echo synced to the beat (1/4, 1/2, 3/4 or 1 beat), reverb and flanger, with an amount knob and per-channel assign.
- **Split cue.** The master goes to your right ear and the CUE'd channel to your left, so you can preview the next track in headphones.
- **Your own music.** Load or drop an audio file onto a deck. Its tempo and beat grid are detected automatically.
- **Demo tracks.** Three tracks are generated in the browser: Golden Hour (122 BPM house), Night Bus (126 BPM tech house) and Slow Burn (118 BPM disco house). Each has a DJ-friendly arrangement in 8-bar phrases: a drum intro, then bass, the full groove, a breakdown, a drop and a drum outro.

## The coach

Twelve lessons that watch what you do and move on when you've done it:
1. Start a track
2. Hear it through the mixer
3. Read the phrases
4. Set a cue
5. Match the tempo by hand
6. Start on the one
7. Nudge into phase
8. Bring in the new track
9. Swap the basslines
10. Mix out
11. Loop a bar
12. Echo out

Live tips flag the common mistakes: a clipping master, two basslines at once, tempos that don't match, and trainwrecked beats.

Keyboard: `Q` `W` `E` are cue, play and sync on deck 1, and `A`/`S` nudge it. `I` `O` `P` and `K`/`L` do the same on deck 2. `←`/`→` move the crossfader.

The whole app is one file of plain HTML, CSS and JavaScript using the Web Audio API, with no build step.
