# Image prompts — Nano Banana

13 images. Save each one into `public/images/` under the exact path below. The site checks for
`.jpg`, then `.png`, `.webp` and `.jpeg`, so the PNG Nano Banana gives you works without renaming
the extension. Any slot without a file falls back to its Unsplash placeholder, so you can add images
one at a time.

```
public/images/
├── hero/
│   ├── hero-01-casa-sul.jpg          16:9  · 2560 × 1440
│   ├── hero-02-fjordhus.jpg          16:9  · 2560 × 1440
│   ├── hero-03-saltworks.jpg         16:9  · 2560 × 1440
│   └── hero-04-nine-walls.jpg        16:9  · 2560 × 1440
├── studio/
│   ├── studio-01-material-table.jpg   4:5  · 1600 × 2000
│   ├── studio-02-stair-light.jpg      4:5  · 1600 × 2000
│   └── studio-03-pavilion-wide.jpg   21:9  · 2560 × 1097
└── works/
    ├── work-01-casa-sul.jpg           4:5  · 1600 × 2000
    ├── work-02-fjordhus.jpg           4:5  · 1600 × 2000
    ├── work-03-saltworks.jpg          4:5  · 1600 × 2000
    ├── work-04-atelier-kanso.jpg      4:5  · 1600 × 2000
    ├── work-05-nine-walls.jpg         4:5  · 1600 × 2000
    └── work-06-reading-room.jpg       4:5  · 1600 × 2000
```

Set the aspect ratio in Nano Banana's settings, and also leave it in the prompt. If the output comes
out smaller than the size listed, upscale it. The hero images are shown full-screen, so they need
the most resolution.

## Shared style block

Add this to the end of every prompt so the set looks like one photographer shot it:

> Editorial architectural photography for a high-end design monograph. Shot on a medium-format
> camera with a 45mm lens, natural light only, true verticals. Muted, warm palette: lime plaster,
> sand, travertine, oiled oak, patinated bronze, sage. Soft highlight roll-off, deep but open
> shadows, subtle film grain. Photorealistic and quiet, with no people, text, logos, watermarks,
> HDR halos or CGI gloss.

---

## Hero slideshow (16:9)

Large type covers the **lower-left third** of these images and a caption sits bottom-right. Each
prompt asks for a calm, darker lower-left and a strong subject in the centre or right.

### `hero/hero-01-casa-sul.jpg`
> 16:9 landscape. Exterior of a long, low single-storey house in the coastal dunes of Comporta,
> Portugal. Lime-washed board-formed concrete walls, a thin cantilevered flat roof with a deep
> overhang, and full-height frameless glazing. The house is lifted slightly off the sand on a
> recessed plinth. Umbrella pines and wild dune grasses surround it. Late golden-hour sun rakes
> across the facade and throws long, soft shadows. Eye-level three-quarter view with the building
> on the right two-thirds of the frame and the horizon in the lower third. The lower-left
> foreground is calm, shadowed dune with negative space for text. [shared style block]

### `hero/hero-02-fjordhus.jpg`
> 16:9 landscape. Interior of a timber retreat above a Norwegian fjord in Hardanger. Walls and
> ceiling are vertical oiled-oak boards, and one full-height window frames the fjord, steep
> mountains and drifting low cloud. A low linen sofa, a sheepskin, a hand-thrown ceramic lamp and
> a raised dark-stone hearth. Soft, overcast Nordic daylight with the window as the main light
> source and the room falling gently into shadow toward the lower-left. Calm, symmetrical,
> one-point perspective toward the window. [shared style block]

### `hero/hero-03-saltworks.jpg`
> 16:9 landscape. Blue-hour exterior of a small boutique hotel at the edge of the salt pans in
> Aveiro, Portugal. A cluster of low, white lime-plastered pavilions with flat roofs and slatted
> timber shutters, with warm light glowing from inside. Their reflections lie in the perfectly
> still, shallow salt-pan water in the foreground, and a raised timber boardwalk links the
> pavilions. Deep blue sky fading to apricot at the horizon. Wide, low viewpoint with the
> buildings across the middle of the frame. The water in the lower-left is dark and mirror-calm.
> [shared style block]

### `hero/hero-04-nine-walls.jpg`
> 16:9 landscape. A courtyard house in rural Mallorca made of freestanding walls of honey-coloured
> marès sandstone, set at different heights like a sculpture. An ancient olive tree grows from a
> pale gravel courtyard, with a long, narrow dark-water pool beside it. Hard late-morning
> Mediterranean light casts crisp, graphic shadows of the walls across the gravel. Dry-stone
> terraces and almond trees sit in the background. Elevated eye-level view with the olive tree
> right of centre, and the lower-left of the frame in wall shadow. [shared style block]

---

## Studio section

### `studio/studio-01-material-table.jpg` (4:5)
> 4:5 portrait. A still life seen from a high three-quarter angle: architect's material samples
> on a large, worn oak table. Offcuts of honed travertine, small lime-plaster test tiles in three
> warm whites, oiled-oak and smoked-oak sample blocks, folded natural linen swatches, a small
> patinated bronze door pull, a soft pencil and a loose graphite sketch of a floor plan.
> Composed with generous negative space. Soft north-window light from the left with gentle
> shadows. [shared style block]

### `studio/studio-02-stair-light.jpg` (4:5)
> 4:5 portrait. A sculptural stair of hand-trowelled lime plaster rises between two thick walls,
> lit from above by a hidden skylight so a wash of warm daylight falls down the treads. Bone and
> sand tones, softly rounded edges and no handrail. A single matte ceramic vessel stands on the
> third step. Looking straight up the stair, centred and symmetrical, with a gentle gradient from
> bright top to dim bottom. [shared style block]

### `studio/studio-03-pavilion-wide.jpg` (21:9)
> Ultra-wide 21:9 panorama. A long, very low pavilion in an Alentejo meadow in Portugal. A
> slender flat roof floats over a continuous ribbon of glazing and pale rammed-earth walls. Cork
> oaks are scattered behind it, and wildflowers and tall grasses fill the foreground. Early-morning
> light with thin mist lying in the field. The building sits in the middle horizontal band and
> spans about two-thirds of the width. The bottom fifth is soft meadow, kept calm for a caption.
> [shared style block]

---

## Selected work (4:5)

These appear as small cursor-follow previews and mobile thumbnails, so each one needs a single
bold, readable subject.

### `works/work-01-casa-sul.jpg`
> 4:5 portrait. Detail of Casa Sul in Comporta: an exterior stair of lime-washed concrete climbs
> along a white wall to a roof terrace, against a clear deep-blue sky. Hard sun casts a sharp
> diagonal shadow of the stair across the wall. A dune-grass tuft sits at the base. Minimal and
> graphic. [shared style block]

### `works/work-02-fjordhus.jpg`
> 4:5 portrait. A built-in oak window seat in a Norwegian timber retreat, with a deep window
> reveal framing a misty fjord. A wool blanket, an open book and a ceramic cup sit on the seat.
> Soft overcast light. [shared style block]

### `works/work-03-saltworks.jpg`
> 4:5 portrait. At dusk, a white lime-plastered guest pavilion at the edge of still salt-pan
> water in Aveiro. Slatted timber shutters are half open and warm light spills out onto a timber
> boardwalk. Mirror reflection below, pale lilac sky above. [shared style block]

### `works/work-04-atelier-kanso.jpg`
> 4:5 portrait. Interior of a refined Kyoto townhouse renovation: tatami floor, pale hinoki
> cedar, shoji screens slid open to a small moss and stone garden. A single low ash bench. Soft,
> diffuse garden light, very calm and minimal. [shared style block]

### `works/work-05-nine-walls.jpg`
> 4:5 portrait. A rhythmic row of thick marès sandstone walls and piers in a Mallorcan courtyard
> house. Strong late sun cuts deep parallel bands of light and shadow across a pale gravel floor.
> Abstract and architectural. [shared style block]

### `works/work-06-reading-room.jpg`
> 4:5 portrait. Inside a small public reading room in Copenhagen, a sculptural spiral stair of
> laminated oak curls up through a round opening in the ceiling. Pale brick walls, soft top-light
> from a skylight and warm wood tones. Looking up at an angle into the spiral. [shared style block]
