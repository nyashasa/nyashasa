# nyashasa website

A single-page personal site: plain HTML, CSS and a little JavaScript, with no build step and no dependencies.

| File | What it holds |
|---|---|
| `index.html` | All page content and the meta tags for search and link previews |
| `styles.css` | Colour and type tokens at the top (light and dark), then the layout and motion |
| `main.js` | Theme toggle, mobile menu, scroll reveals, counters, nav highlight, logo strip, pointer effects, copy-email button and the sample event stream |
| `favicon.svg` | Pixel "N" icon |
| `assets/nyasha.jpg` | Portrait (400 × 400), stored here because LinkedIn image links expire |
| `assets/logos/` | Employer and venture logos, cleaned of scripts and external links |

## Colour

- Orange `#FF522B` for fills, with Cloudflare's tangerine `#FCAD32` in gradients.
- Small orange text uses `#C92500` in light mode so it passes WCAG AA; dark mode uses `#FF522B`.
- Buttons carry black text on orange (6.1 : 1). White text on this orange would only reach 3.2 : 1.
- Brand logos are drawn in the ink colour through a CSS mask, so they follow the theme and never turn orange.

## Logos

Logos are trademarks of their owners and appear only to show where the work was done.

- Toyota, MultiChoice and Afreximbank come from Wikimedia, Old Mutual from oldmutual.co.za, FCB from Wikimedia (white background removed), and Noeva, UbuntuNet and Fooba from their own sites.
- Easy Chef and Hellocomputer have no public logo file, so they appear as text wordmarks. To swap in a real logo, add an SVG with a transparent background to `assets/logos/` and replace the text `<span class="… wordmark">` with `<span class="… logo-mark" style="--logo: url(assets/logos/name.svg); --ratio: width ÷ height">`.

## Motion

Scroll reveals, counters, the logo strip, the portrait tilt, spotlight and magnetic buttons, the hero glow and the theme-switch circle all switch off when the visitor's system asks for reduced motion. Content never depends on them. If `main.js` fails to start within three seconds, everything is shown anyway.

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
- The product screens in the Work section and the event stream in the hero use clearly labelled sample data. Swap in real screenshots if you prefer.
