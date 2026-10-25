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
- **Your crate.** Add music you own once and it's there on every visit. Use "Add music" in the crate, drop files on it, or drop a file on a deck to add it and load it straight away.
  - **Tempo and key from the file.** Title, artist, BPM and key are read from the file's tags: ID3 in MP3, AIFF and WAV; MP4 atoms in M4A; Vorbis comments in FLAC. Downloads from Beatport, Bandcamp, Traxsource and Juno usually carry them. When a file has no BPM, the tempo is detected from the audio, and the crate marks each track "Tagged" or "Detected".
  - **Keys on the Camelot wheel.** Each track gets a coloured key chip (8A, 9B…). The screen shows each deck's key, and the tempo tip says whether the two keys mix. Without key lock, the tempo fader moves the key too. Once you've pitched about a semitone (~6%), the key readout turns amber and shows the new key.
  - **Fits the deck you're playing.** Rows that are in key and within 8% of the tempo of the deck on air are marked "Fits deck 1/2". The "Best fit" sort puts them first. You can also sort by newest, BPM or key, and search by title, artist, BPM or key.
  - **Cues are saved per track.** The cue point and all eight hot cues come back the next time you load a track.
  - Formats: MP3, WAV, FLAC and M4A/AAC in every browser. AIFF only plays in Safari. Tracks downloaded inside streaming apps (Spotify, Apple Music, Tidal) are DRM-locked and won't open.
- **Demo tracks.** Three tracks are generated in the browser: Golden Hour (122 BPM house), Night Bus (126 BPM tech house) and Slow Burn (118 BPM disco house). Each has a DJ-friendly arrangement in 8-bar phrases: a drum intro, then bass, the full groove, a breakdown, a drop and a drum outro.

## Runway: a reimagined deck

Switch the top bar from **Classic** to **Runway**. Classic is laid out like club gear. Runway rebuilds the deck around the decisions left to a DJ once beatmatching is automatic: what to play next, when it comes in, and how the blend sounds. It uses the same audio engine, crate and keys, in its own deep-navy glass look.

- **Screen.** Now and Next sit in cards with their cover art (read from the file's tags, or a generated tile).
  - Between the cards, a bar runs from A to B: the countdown to the drop on one side, the mix's progress on the other.
  - Below, both waveforms scroll toward a fixed playhead on one grid of bars, with 8-bar phrase lines.
  - A queued track starts on its phrase line, tempo-matched and sample-locked to Now. Drag it to another line, or use the card's buttons to move it, hold it, or take it off.
- **Stem lanes.** Each track's drums, bass, melody and vocals are drawn as blocks per beat: Now on top of each row, Next underneath. Tap a stem's name on either side to mute it or bring it back.
- **Transition.** Choose a shape and a length (8, 16 or 32 bars), then slide the ribbon from Now to Next. The ribbon draws the shape itself: how loud Now and Next are at every point. A dashed **Guide** shows the pace of an even mix, and **Auto ride** follows it until you touch the ribbon. The shapes:
  - **Bass swap:** the basslines trade places at the centre line.
  - **Stem blend:** Next's drums come in first and Now's vocal leaves, then the basslines swap, then Next's melody and vocal take over.
  - **Filter wash**, **Echo out** (the echo keeps ringing after the cut) and **Hard cut**.
- **Map.** Tempo runs up the side and steps around the key wheel run across, with what's playing in the middle. The green band is in key, colour is energy, and good fits glow.
  - Beside it, a Camelot wheel shows the current key and the keys that mix with it.
  - Tap a dot, or use the picks list, which says why each track fits.
- **Stem faders.** Four faders (drums, bass, melody, vocals) for Now or Next. They set each stem's level on top of what the transition is doing.
- **DROP and tempo.**
  - **DROP** (or the D key) brings the queued track in on the very next bar.
  - The tempo strip speeds up or slows down the whole set, and both tracks stay locked.
  - The header shows the set's tempo and key.
- **Energy line.** It traces your set and shows where the next pick would take it. Choose **Ease off**, **Steady** or **Lift** to steer which picks rank first.
- **How a mix goes.** The four steps along the bottom light up as you go, with a live tip underneath.
- Keys: space plays or pauses Now, ← → move the ribbon, and D drops.

Nothing drops or mixes unless you set it up. The timing and the choice of track stay yours.

## Stems

Every track can play as four stems (drums, bass, melody and vocals) in lockstep. In Classic, the pads get a **Stems** mode:
- Pads 1–4 switch each part on or off.
- Pads 5–8 are acapella, instrumental, drums only and all on.

Stems come from three places:
- **Stem files: the real thing.**
  - NI Stems files (`.stem.mp4`), which some stores sell, are read directly.
  - You can also add a set of separate stem files, for example the four files a separator such as Demucs, Ultimate Vocal Remover or LALAL.AI exports. Name them like `Track (Drums).wav`, or keep the bare `drums.wav / bass.wav / other.wav / vocals.wav` and pick the full mix along with them. They're grouped into one track and saved in your crate together.
- **The demo tracks** render each part separately, including a synthesised vocal hook, so their stems are exact.
- **The quick split** handles any other track, in your browser, while it plays. It uses signal processing rather than an AI model:
  - Sustained sounds are separated from hits, then divided by frequency (bass) and by how centred they are in the stereo field (vocals).
  - The four stems always add back up to the original exactly.
  - It's rough. Tested against the demos' true stems, it separates vocals well (about 11 dB), drums fairly (about 7 dB), and melody and bass poorly (about 2 dB and 0 dB). For comparison, AI separators average roughly 7–9 dB on real music. So kick and bass bleed into each other.
  - It takes about 3 seconds per minute of audio and swaps in seamlessly when ready.

Stems are held at 32 kHz to keep memory down. A track with stems uses roughly 60 MB per minute while it's loaded.

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

## Where your music is kept

- **In the Claude artifact**, the crate is saved to your Claude account and is private to you; other people who open the link get their own crate.
  - The audio goes to the artifact's asset store. The store doesn't accept audio types, so each file is kept as base64 text in pieces of up to 14 MB.
  - The tags and cues go to a private per-person folder in the artifact's database.
  - The crate shows how much storage is used.
- **Opened as a plain file** (`cue-lab/index.html` in a browser), or by someone who can't edit the artifact, the crate is saved in that browser's IndexedDB.

Keyboard: `Q` `W` `E` are cue, play and sync on deck 1, and `A`/`S` nudge it. `I` `O` `P` and `K`/`L` do the same on deck 2. `←`/`→` move the crossfader.

The whole app is one file of plain HTML, CSS and JavaScript using the Web Audio API, with no build step.
