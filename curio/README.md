# Curio

A private, visual place to keep everything you want to remember, inspired by [mymind](https://mymind.com). Save notes, links, quotes and images to one masonry wall. Each item is tagged automatically, so you can find it later by topic, by where it came from, or by colour.

Live app: https://claude.ai/artifact/KhV8z3jdWnF8M5dhzf1vWe

## What it does

- **Add anything** from the "Add to Curio" card. You can also paste onto the page or drag images in. Curio works out what kind of item it is:
  - a URL becomes a **link** card
  - text in quotation marks, optionally followed by `— Author`, becomes a **quote**
  - lines starting with `[ ]` become a **checklist** you can tick from the card
  - anything else becomes a **note**. A short first line becomes its title.
- **Auto-tagging.** Claude reads each item, including the image itself, and adds a title, tags and a one-line summary. When Claude isn't available, tags are worked out on the device instead.
- **Colour search.** The main colours of each image are detected, so typing `blue` or `#red` finds them.
- **Search** covers titles, text, URLs, tags, summaries and colours. Use `#tag` to match a tag exactly.
- **Spaces** are saved searches, such as `#recipe` or `typography`. They act as smart folders that stay up to date on their own.
- **Rediscover** shuffles the wall so older things come back to the surface.
- **Detail sheet**: click any card to edit it, manage tags, add notes, re-tag, favourite it, open the link, or delete it.
- **Cards built for what they hold.** Links get a cover drawn for their kind: a play button for video, a record for music, an editor window for code, a magazine masthead for articles, a handle card for social posts, a price tag for shopping, and colour tiles for design tools. Notes that contain hex codes (`#f2381b`) become palette cards whose swatches copy on click. Checklists show their progress.
- **Favourites.** Star any card from its hover actions, then filter by Favourites.

## Look and feel

- **Glass:** a frosted search dock, translucent cards and a slow colour field underneath, tinted from your recent images.
- **Morphing glass:** the dock and the cards scrolling beneath it behave like liquid. As a card approaches, the glass reaches down for it, wraps its top edge as it passes under, and stretches and snaps away as it leaves. This works in every modern browser. The dock is the smooth union of signed distance fields (the dock plus the top edge of each nearby card), traced into a clip path each frame. Each card's pull runs on a spring, so the glass lags and wobbles. This is the same idea Apple uses when `GlassEffectContainer` merges nearby glass.
- **Refraction:** in Chrome and Edge, once the glass comes to rest, its edge bends what's behind it. The displacement map is drawn from the same distance field, with a slight colour fringe. While the glass is moving it falls back to plain frosted blur so scrolling stays smooth.
- **Make it yours:** the button at the top right opens a panel with four themes (Ember, Fynbos, Ultraviolet, Glacier), light, dark or system mode, three type pairings, a glass slider from clear to frosted, corner radius, card size, and the background source. Your choices sync to your account.
- **Type:** an expanded heavy grotesk (Archivo) for names, with a serif italic (Instrument Serif) for quotes, search and emphasis.

Keyboard shortcuts: `/` searches, `n` starts a new note, `⌘/Ctrl + Enter` saves, `Esc` closes.

## Storage

- **In the Claude artifact**, items are saved to your Claude account in a per-person private store. Images go to the artifact's asset store. Your Curio syncs across your devices, and anyone else who opens the link gets their own empty Curio.
- **Opened as a plain file** (`curio/index.html` in a browser), items are saved in that browser's IndexedDB, and tagging runs on the device.

The whole app is one self-contained file with no build step. It's plain HTML, CSS and JavaScript.
