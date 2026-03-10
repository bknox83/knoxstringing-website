# Knox Racquet Stringing

Static website for **Knox Racquet Stringing** — professional tennis and racquetball stringing in Waukee, Des Moines, and the greater central Iowa area.

## What’s in this repo

- **index.html** — Single-page site (services, why restring, gauge & tension, overgrips, grips, process, contact).
- **assets/**
  - **css/** — `styles.css` (layout, components, responsive).
  - **js/** — `script.js` (mobile nav, scroll reveal, year in footer).
  - **images/** — Logos, hero/process backgrounds, content images (SVG, WebP, PNG).
- **sitemap.xml** — Sitemap for search engines.
- **robots.txt** — Crawler rules and sitemap URL.

Contact form submissions are handled by [Formspree](https://formspree.io); no backend in this repo.

## Run locally

Open `index.html` in a browser, or serve the folder with any static server, e.g.:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve
```

Then visit `http://localhost:8000` (or the port shown).

## Tech

- Plain HTML, CSS, and JavaScript (no frameworks).
- [Google Fonts](https://fonts.google.com): Outfit, Instrument Serif.
- Formspree for the contact form.

## License

© Knox Racquet Stringing. All rights reserved.
