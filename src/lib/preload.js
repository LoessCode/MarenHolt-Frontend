const BASE = import.meta.env.BASE_URL
const EXTENSIONS = ['jpg', 'png', 'webp', 'jpeg']

function load(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => (img.naturalWidth > 0 ? resolve(src) : reject(new Error('empty')))
    img.onerror = () => reject(new Error(`failed: ${src}`))
    img.src = src
  })
}

/**
 * Try the local render in each extension, then the placeholder.
 * Non-critical slots don't wait for the placeholder download — they only
 * check whether a local file exists, then warm the cache in the background.
 */
async function resolveOne({ file, ph }, critical) {
  for (const ext of EXTENSIONS) {
    try {
      return { src: await load(`${BASE}images/${file}.${ext}`), local: true }
    } catch {
      /* try next */
    }
  }
  if (!critical) {
    const warm = new Image()
    warm.decoding = 'async'
    warm.src = ph
    return { src: ph, local: false }
  }
  try {
    return { src: await load(ph), local: false }
  } catch {
    return { src: ph, local: false }
  }
}

/**
 * Resolve every image slot. The preloader only waits on `critical` keys
 * (what is visible on first paint); onProgress(0..1) tracks those.
 * Returns { [key]: src }.
 */
export async function resolveImages(images, critical = [], onProgress = () => {}) {
  const keys = Object.keys(images)
  const total = Math.max(1, critical.length)
  let done = 0
  const out = {}
  const report = { local: [], placeholder: [] }
  await Promise.all(
    keys.map(async (key) => {
      const isCritical = critical.includes(key)
      const { src, local } = await resolveOne(images[key], isCritical)
      out[key] = src
      report[local ? 'local' : 'placeholder'].push(key)
      if (isCritical) {
        done += 1
        onProgress(done / total)
      }
    }),
  )
  onProgress(1)
  if (report.placeholder.length) {
    console.info(
      `[images] ${report.local.length} local, ${report.placeholder.length} using placeholders:`,
      report.placeholder.join(', '),
    )
  }
  return out
}
