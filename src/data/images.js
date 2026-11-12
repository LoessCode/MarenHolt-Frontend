/**
 * Image registry.
 *
 * Every image lives in /public/images/<folder>/<name>.(jpg|png|webp).
 * Drop the Nano Banana renders into those folders with the names below and they
 * are picked up automatically — any slot whose file is missing falls back to the
 * Unsplash placeholder, cropped to the same aspect ratio.
 *
 * See IMAGE_PROMPTS.md for the prompt behind each slot.
 */

const unsplash = (id, w, h, crop = 'crop=entropy') =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&${crop}&auto=format&q=80`

const WIDE = [2200, 1238] // 16:9
const PORTRAIT = [1600, 2000] // 4:5
const PANORAMA = [2560, 1097] // 21:9

export const IMAGES = {
  // ── Hero slideshow (16:9) ────────────────────────────────────────────────
  hero01: {
    file: 'hero/hero-01-casa-sul',
    ph: unsplash('1781795485048-3d98b53632db', ...WIDE),
    alt: 'Casa Sul — a low lime-washed concrete house raised above the dunes',
  },
  hero02: {
    file: 'hero/hero-02-fjordhus',
    ph: unsplash('1758565811176-ccd94357a844', ...WIDE),
    alt: 'Fjordhus — oak-lined living room with a full-height window to the fjord',
  },
  hero03: {
    file: 'hero/hero-03-saltworks',
    ph: unsplash('1757524492552-d47a66a2b63e', ...WIDE),
    alt: 'The Saltworks — a lime-plastered hotel glowing at dusk',
  },
  hero04: {
    file: 'hero/hero-04-nine-walls',
    ph: unsplash('1782392455081-a09db8267afb', ...WIDE),
    alt: 'House of Nine Walls — a sandstone courtyard house among olive trees',
  },

  // ── Studio section ───────────────────────────────────────────────────────
  studio01: {
    file: 'studio/studio-01-material-table',
    ph: unsplash('1763076470404-23554ef26747', ...PORTRAIT),
    alt: 'Material samples — travertine, oiled oak, linen and patinated bronze',
  },
  studio02: {
    file: 'studio/studio-02-stair-light',
    ph: unsplash('1601993957728-1e56ab70c5a8', ...PORTRAIT),
    alt: 'A plaster stair washed by light from a skylight',
  },
  studio03: {
    file: 'studio/studio-03-pavilion-wide',
    ph: unsplash('1787088988806-7ec503692b85', ...PANORAMA, 'crop=focalpoint&fp-y=0.42'),
    alt: 'The Meadow Pavilion — a long, low pavilion in an Alentejo meadow',
  },

  // ── Selected work (4:5) ──────────────────────────────────────────────────
  work01: {
    file: 'works/work-01-casa-sul',
    ph: unsplash('1763046289892-857b83dc070f', ...PORTRAIT),
    alt: 'Casa Sul — lime-washed stair to the roof terrace',
  },
  work02: {
    file: 'works/work-02-fjordhus',
    ph: unsplash('1774311237295-a65a4c1ff38a', ...PORTRAIT),
    alt: 'Fjordhus — reading corner facing the water',
  },
  work03: {
    file: 'works/work-03-saltworks',
    ph: unsplash('1561065091-4908548ee638', ...PORTRAIT),
    alt: 'The Saltworks — a guest pavilion at the edge of the salt pans',
  },
  work04: {
    file: 'works/work-04-atelier-kanso',
    ph: unsplash('1764445274424-47bbc216073b', ...PORTRAIT),
    alt: 'Atelier Kanso — tatami room opening to a moss garden',
  },
  work05: {
    file: 'works/work-05-nine-walls',
    ph: unsplash('1759507058804-cc729b38d1ed', ...PORTRAIT),
    alt: 'House of Nine Walls — colonnade casting deep shadows',
  },
  work06: {
    file: 'works/work-06-reading-room',
    ph: unsplash('1758801304964-417e328be877', ...PORTRAIT),
    alt: 'Copenhagen Reading Room — sculpted oak spiral stair',
  },
}
