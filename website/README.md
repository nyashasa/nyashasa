# nyashasa website

A single-page personal site: plain HTML, CSS and a little JavaScript, with no build step and no dependencies.

| File | What it holds |
|---|---|
| `index.html` | All page content and the meta tags for search and link previews |
| `styles.css` | Colour and type tokens at the top (light and dark), then the layout |
| `main.js` | Theme toggle, mobile menu, copy-email button, and the sample event stream in the hero |
| `favicon.svg` | Pixel "N" icon |

## Preview locally

```sh
cd website
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

- **Vercel:** import the repository, set **Root Directory** to `website`, choose the **Other** framework preset and leave the build command empty.
- **GitHub Pages:** copy these files to the root of a `nyashasa.github.io` repository, or publish this folder from a branch.
- **Netlify or Cloudflare Pages:** drag the `website` folder into the dashboard, or point a new site at it with no build command.

## Before going live

- Once you have a domain, add `<link rel="canonical">` and `og:url` tags to `index.html`.
- Optionally add a 1200×630 `og:image` so links shared on LinkedIn and WhatsApp show a picture.
- The product screens in the Work section and the event stream in the hero use clearly labelled sample data. Swap in real screenshots if you prefer.
