# Collegian interactives

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

In repository Settings → Pages, choose **Deploy from a branch**, then **main** and **/(root)**. Use the actual URL shown by GitHub after the deployment succeeds.

Add an iframe with that URL through SNO Story Element → Generic Embed. Start with a width of 100% and height of 450 pixels. Test the saved story preview on mobile and desktop; adjust height if the site adds spacing. Keep the article text in WordPress.

```html
<iframe
  src="REPLACE_WITH_PUBLISHED_URL"
  title="A little Halloween nostalgia: open the door"
  width="100%"
  height="450"
  style="border:0;"
  loading="lazy"
></iframe>
```

The iframe is a click-based component. It does not track scrolling in the parent article. This repository does not contain the reporter's unfinished movie feature or the private demo. Embedding in the live SNO story still needs verification in its saved preview.
