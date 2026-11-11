# nyashasa website

A single-page personal site: plain HTML, CSS and JavaScript, with no build step. The one library, Motion, is saved in `vendor/` so the site makes no third-party script requests.

| File | What it holds |
|---|---|
| `index.html` | All page content and the meta tags for search and link previews |
| `styles.css` | Colour and type tokens at the top (light and dark), then the layout and motion |
| `main.js` | Spring reveals and scroll-linked motion, counters, the Hello greeting, theme toggle, mobile menu, nav highlight, logo strip, portrait tilt, magnetic buttons and the copy-email button |
| `vendor/motion-14.6.0.js` | [Motion](https://motion.dev) 14.6.0, MIT licence in `vendor/motion-LICENSE.md` |
| `fonts/wine.woff2` | Nyasha's name font (Wine), subset to the letters of "Nyasha Samhembere" (9 KB) |
| `favicon.svg` | Tab icon: the "N" from the logo on orange |
| `assets/brand/` | Nyasha's logo: the one-line version in the header, the stacked version in the footer |
| `assets/nyasha.jpg` | Portrait (400 × 400), stored here because LinkedIn image links expire |
| `assets/logos/` | Employer and venture logos, cleaned of scripts and external links |
| `assets/stack/` | Technology icons for the Stack section |

## Positioning

The page presents Nyasha as a founder and product leader who builds companies with teams and partners: ventures first, then community work, leadership areas, approach, stack and career. Every figure comes from the 2024 and 2025 resumes or the ventures' own sites.

The Community section is deliberately different from the rest: Hello, Zimbabwe appears in its own colours (deep green and cream) with a serif greeting that cycles through Shona, Ndebele and English.

## Colour

- Orange `#FF522B` for fills, with Cloudflare's tangerine `#FCAD32` in gradients.
- Small orange text uses `#C92500` in light mode so it passes WCAG AA; dark mode uses `#FF522B`.
- Buttons carry black text on orange (6.1 : 1). White text on this orange would only reach 3.2 : 1.
- Logos and stack icons are drawn in the ink colour through a CSS mask, so they follow the theme and never turn orange.

## Type

- Manrope for display and reading, JetBrains Mono for labels and data, Instrument Serif for the Hello panel.
- The logo (`assets/brand/`) sets the name in the header and footer. It is drawn in the text colour through a CSS mask, so it follows the theme.
- The name font, Wine, is used only for the signature in Contact. It is subset to those letters, so other text set in it would fall back to Manrope. To widen it, regenerate the file from the original OTF with fontTools: `pyftsubset Wine.otf --unicodes=U+20-7E --flavor=woff2 --output-file=fonts/wine.woff2`.

## Motion

Modelled on America.gov, which uses the same library:

- Blocks rise in on a soft spring as they enter the viewport, staggered within groups.
- Scroll-linked movement: the hero title drifts up and fades, the portrait recedes, the background glow moves at its own pace, product screens drift against the page, the About statement brightens word by word, the Hello panel opens out as it arrives and the contact glow swells at the end.
- The Hello greeting cycles through "Mhoroi", "Salibonani" and "Hello" while the panel is on screen, and the signature in Contact is written in from left to right.
- Smaller touches: counters, a scroll progress bar, the nav highlight, a back-to-top ring, a drawn underline, magnetic buttons and a circular theme switch.

All of it switches off when the visitor's system asks for reduced motion. If Motion fails to load, the page falls back to plain CSS reveals; if `main.js` fails to start within three seconds, everything is shown anyway.

## Logos and icons

Logos are trademarks of their owners and appear only to show where the work was done.

- Toyota, MultiChoice and Afreximbank come from Wikimedia, Old Mutual from oldmutual.co.za, FCB from Wikimedia (white background removed), and Noeva and UbuntuNet from their own sites. The Hellocomputer, Easy Chef and Fooba logos are the files Nyasha supplied. Easy Chef's was 61 × 54 pixels and has been upscaled; a larger original would sharpen it.
- Passport 360 has no logo file, so it appears as a text wordmark. To swap in a logo, add a file with a transparent background to `assets/logos/` and use `<span class="logo-mark" style="--logo: url(assets/logos/name.svg); --ratio: width ÷ height">`.
- Stack icons are from [Simple Icons](https://simpleicons.org) (CC0), plus [Devicon](https://devicon.dev) (MIT) for Java and Azure. Cursor has no openly licensed icon, so its chip has none.

## Preview locally

```sh
cd website
python3 -m http.server 8000
# open http://localhost:8000
```

Open it through a local server, not as a file: browsers block the logo masks on `file://` pages.

## Deploy

- **Vercel:** import the repository, set **Root Directory** to `website`, choose the **Other** framework preset and leave the build command empty.
- **GitHub Pages:** copy these files to the root of a `nyashasa.github.io` repository, or publish this folder from a branch.
- **Netlify or Cloudflare Pages:** drag the `website` folder into the dashboard, or point a new site at it with no build command.

## Before going live

- Once you have a domain, add `<link rel="canonical">` and `og:url` tags to `index.html`, and an absolute `og:image` (the portrait works).
- The product screens in the Ventures section use clearly labelled sample data. Swap in real screenshots if you prefer.
