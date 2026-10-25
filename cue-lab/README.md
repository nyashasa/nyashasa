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

Switch the top bar from **Classic** to **Runway**. Classic is laid out like club gear. Runway rebuilds the deck around the three decisions left to a DJ once beatmatching is automatic: what to play next, when it comes in, and how the blend sounds. It uses the same audio engine, crate and keys.

- **The runway.** Now and Next scroll toward a fixed playhead on one shared grid of bars, with 8-bar phrase lines in amber.
  - A queued track sits on a phrase line with a **DROP** flag. When the playhead reaches it, it starts on the one, tempo-matched and sample-locked to Now.
  - Drag it along the runway, or use **Earlier** and **Later**, to choose the line. Snap is 8 bars or 1 bar. **Hold** keeps it floating a few bars ahead until you're ready.
- **One ribbon for the whole transition.** Choose a shape, then perform it by sliding from Now to Next. Each shape moves the levels, EQ, filters and echo together:
  - **Bass swap:** Next comes up, the basslines swap at the centre line, then Now fades.
  - **Filter wash:** Next opens from a low-pass while Now thins to a high-pass.
  - **Echo out:** Now is cut at the centre line and its echo keeps ringing.
  - **Cut:** a hard switch.
  - Pick 8, 16 or 32 bars. **Guide** shows where an even mix would be, and **Auto ride** follows it until you touch the ribbon. When the ribbon reaches Next, Now stops and Next becomes Now.
- **Lanes.** Low, Mid and High lanes per track (bass and kick, vocals and keys, hats and air) let you shape what's audible, or mute a lane outright. They're frequency bands standing in for true stems, which need a separation model a browser can't run comfortably.
- **The map.** What's playing sits in the centre, with its key at the top of the Camelot wheel.
  - Each track's angle is its key once it's pitched to the current tempo. Its distance from the centre is how far its tempo is changed.
  - Filled dots are minor keys and rings are major; dot size is energy. The green wedge is in key.
  - Tap a dot to select it. The list underneath ranks the best next picks and says why: key fit, tempo change, and energy.
- **Energy.** A strip along the top steps through your set, one track at a time, with the room's loudness drawn over it.
  - Choose **Ease off**, **Steady** or **Lift**, and the picks favour tracks that take the energy that way.
  - Energy is a rough 1–10 estimate from how dense, bright and fast a track is. It's for comparing tracks, not a measurement.
- Keys: space plays or pauses Now, and ← → move the ribbon.

Nothing drops or mixes unless you set it up. The timing and the choice of track stay yours.

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
