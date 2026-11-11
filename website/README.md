# nyashasa website

A single-page personal site: plain HTML, CSS and JavaScript, with no build step. The one library, Motion, is saved in `vendor/` so the site makes no third-party script requests.

| File | What it holds |
|---|---|
| `index.html` | All page content and the meta tags for search and link previews |
| `styles.css` | Colour and type tokens at the top (light and dark), then the layout and motion |
| `main.js` | Spring reveals and scroll-linked motion, counters, theme toggle, mobile menu, nav highlight, logo strip, portrait tilt, magnetic buttons, copy-email button and the sample event stream |
| `vendor/motion-14.6.0.js` | [Motion](https://motion.dev) 14.6.0, MIT licence in `vendor/motion-LICENSE.md` |
| `favicon.svg` | Pixel "N" icon |
| `assets/nyasha.jpg` | Portrait (400 × 400), stored here because LinkedIn image links expire |
| `assets/logos/` | Employer and venture logos, cleaned of scripts and external links |
| `assets/stack/` | Technology icons for the Stack section |

## Positioning

The page presents Nyasha as a founder and product leader who builds companies with teams and partners: ventures first, then community work (Hello, Zimbabwe), leadership areas, approach, stack and career. Every figure comes from the 2024 and 2025 resumes or the ventures' own sites.

## Colour

- Orange `#FF522B` for fills, with Cloudflare's tangerine `#FCAD32` in gradients.
- Small orange text uses `#C92500` in light mode so it passes WCAG AA; dark mode uses `#FF522B`.
- Buttons carry black text on orange (6.1 : 1). White text on this orange would only reach 3.2 : 1.
- Logos and stack icons are drawn in the ink colour through a CSS mask, so they follow the theme and never turn orange.

## Motion

Modelled on America.gov, which uses the same library:

- Blocks rise in on a soft spring as they enter the viewport, staggered within groups.
- Scroll-linked movement: the hero title drifts up and fades, the portrait recedes, the background glow moves at its own pace, product screens drift against the page, the About statement brightens word by word and the contact glow swells at the end.
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
- The product screens in the Ventures and Community sections and the event stream in the hero use clearly labelled sample data. Swap in real screenshots if you prefer.
