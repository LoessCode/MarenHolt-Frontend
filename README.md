# Maren Holt Studio — portfolio concept

A proof-of-concept site for an architecture and interiors practice, built with React, GSAP
(ScrollTrigger) and Lenis.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLoessCode%2FMarenHolt-Frontend)

```bash
npm install
npm run dev        # http://localhost:5183
npm run build      # static build in dist/
npm run preview    # serve the production build locally
```

## Deploying to Vercel
Use the button above, or go to vercel.com → **Add New → Project** and import
`LoessCode/MarenHolt-Frontend`. Vercel reads `vercel.json` (Vite preset, `npm run build`, output
`dist/`), so you don't need to change any settings. Every push to `main` then redeploys.

## Images
Placeholders come from Unsplash. To use the Nano Banana renders, put them in `public/images/`
with the file names in **IMAGE_PROMPTS.md** (prompts and sizes are there too). They are picked up
automatically, with no code changes. All image slots are listed in `src/data/images.js`.

## Content
Studio facts, metrics, hero slides and projects are all in `src/data/content.js`.

## What happens on the page
- **Preloader**: a counter, with the logo (a plan-drawing door swing) drawing itself.
- **Hero**: a full-bleed slideshow that changes slides with a "louvre" strip wipe, plus mouse
  parallax. On scroll it pins and the photo breaks into six columns standing on a hatched ground
  line, labelled with structural grid bubbles A–F, like an elevation drawing.
- **Nav**: starts with no background and fades in as you scroll. It switches to a dark theme over
  dark sections.
- **Studio**: a statement whose words light up as you scroll, with inline images that open up. A
  floor plan draws itself stroke by stroke. Numbers roll into place like an odometer. Images
  reveal with a wipe and drift with parallax. A typology chart responds to hover.
- **Selected work**: an index list with a cursor-following preview that leans as you move.
  Thumbnails appear instead on touch screens.
- **Footer**: live studio clocks and a full-width wordmark.

All of this respects `prefers-reduced-motion`.
