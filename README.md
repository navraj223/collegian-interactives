# Collegian interactives

Live demo: https://navrajd.com/collegian-interactives/

Repository: https://github.com/navraj223/collegian-interactives

Small static interactives for embedding in Collegian stories. The first demo is a click-to-open Halloween doorway adapted from the supplied story prototype.

## Preview locally

From this folder, run:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. No package installation or build step is needed.

## Files

- `index.html`: standalone doorway component, without the full article.
- `style.css`: scoped navy/cream styling, mobile layout, reduced-motion support.
- `app.js`: optional doorbell sound, off by default and triggered by a reader click.
- `.nojekyll`: serves the static files directly on GitHub Pages.

The door also works without JavaScript using native HTML details/summary. Fonts use Open Sans if available, then Arial/system fallbacks. There are no external scripts, images, fonts, tracking, or form submissions.

## Publish on GitHub Pages

GitHub Pages is configured to deploy from **main** and **/(root)** with HTTPS enforced. Pushing changes republishes the same URL. The site inherits the account’s existing `navrajd.com` domain.

Add an iframe with that URL through SNO Story Element → Generic Embed. Start with a width of 100% and height of 450 pixels. Test the saved story preview on mobile and desktop; adjust height if the site adds spacing. Keep the article text in WordPress.

```html
<iframe
  src="https://navrajd.com/collegian-interactives/"
  title="A little Halloween nostalgia: open the door"
  width="100%"
  height="450"
  style="border:0;"
  loading="lazy"
></iframe>
```

The iframe is a click-based component. It does not track scrolling in the parent article. Embedding in the live SNO story still needs verification in its saved preview.

## Halloween movie watchlist

Live feature: https://navrajd.com/collegian-interactives/halloween-watchlist/

`halloween-watchlist/` contains the approved **From Grim to Grin: 31 Movies for Your Halloween Watchlist** interactive by Raul Ramirez, Reporter. All 31 original reviews, years, quality scores, and CSS illustrations are preserved. It uses plain HTML/CSS/JavaScript and Google Fonts with local fallbacks; there is no build step.

For SNO, select **Full Screen Embed** and paste the entire contents of `halloween-watchlist/SNO-embed.html` into **Video/Embed → Add Video or Embed Code**. The `watchlist-parent.js` script must run on the outer SNO page. Keep it paired with `watchlist-child.js`; their independent `collegian-movie-watchlist:v1` channel does not affect Trunk or Treat.

The iframe follows natural content height in both directions, including font loading, responsive shelf changes, and shorter reviews. The outer document handles scrolling; reading keys inside the connected iframe are forwarded to the parent. No navigation styles or guessed header offsets are applied. Verify the saved SNO preview after pasting, because WordPress may filter scripts.
