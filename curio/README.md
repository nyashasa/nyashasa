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
- **Detail sheet**: click any card to edit it, manage tags, add notes, re-tag, open the link, or delete it.

Keyboard shortcuts: `/` searches, `n` starts a new note, `⌘/Ctrl + Enter` saves, `Esc` closes.

## Storage

- **In the Claude artifact**, items are saved to your Claude account in a per-person private store. Images go to the artifact's asset store. Your Curio syncs across your devices, and anyone else who opens the link gets their own empty Curio.
- **Opened as a plain file** (`curio/index.html` in a browser), items are saved in that browser's IndexedDB, and tagging runs on the device.

The whole app is one self-contained file with no build step. It's plain HTML, CSS and JavaScript.
